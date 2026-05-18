from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
import joblib
import pandas as pd
import numpy as np
import pvlib
import requests
from datetime import datetime

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# 1. Cargar modelo
try:
    modelo = joblib.load('modelo_solar_universal.pkl')
    print("✅ Modelo Universal cargado")
except:
    print("❌ Error al cargar modelo")

class DatosEntrada(BaseModel):
    lat: float
    lon: float
    slope: float
    azimuth: float

@app.post("/api/calcular-solar")
async def predecir(input: DatosEntrada):
    try:
        # 2. CONSULTA A OPEN-METEO
        url_om = (
            f"https://api.open-meteo.com/v1/forecast?"
            f"latitude={input.lat}&longitude={input.lon}&"
            f"current=temperature_2m,wind_speed_10m&"
            f"hourly=shortwave_radiation,direct_radiation,diffuse_radiation&"
            f"timezone=auto&forecast_days=1"
        )
        
        res = requests.get(url_om).json()
        
        # 3. ENCONTRAR LA HORA ACTUAL EN LA LISTA HOURLY
        # Buscamos el índice que coincide con la hora actual del sistema
        hora_actual = datetime.now().strftime("%Y-%m-%dT%H:00")
        try:
            idx = res['hourly']['time'].index(hora_actual)
        except ValueError:
            idx = datetime.now().hour # Fallback simple si falla el string match

        # Extraemos los datos de esa hora específica
        temp = float(res['current']['temperature_2m'])
        viento = float(res['current']['wind_speed_10m'])
        ghi = float(res['hourly']['shortwave_radiation'][idx])
        direct_h = float(res['hourly']['direct_radiation'][idx])
        diffuse_h = float(res['hourly']['diffuse_radiation'][idx])

        # 4. PVLIB (Geometría Solar)
        site = pvlib.location.Location(input.lat, input.lon)
        solpos = site.get_solarposition(pd.Timestamp.now(tz='UTC'))
        zenith = float(solpos['zenith'].iloc[0])
        azimuth_sol = float(solpos['azimuth'].iloc[0])

        # Cálculo de DNI (Direct Normal)
        cos_zenith = np.cos(np.radians(zenith))
        dni = direct_h / cos_zenith if zenith < 87 else 0

        # POA (Radiación que recibe el panel inclinado)
        poa = pvlib.irradiance.get_total_irradiance(
            surface_tilt=input.slope,
            surface_azimuth=input.azimuth,
            dni=max(0, dni),
            ghi=ghi,
            dhi=diffuse_h,
            solar_zenith=zenith,
            solar_azimuth=azimuth_sol
        )

        # 5. DATAFRAME PARA EL MODELO
        df_input = pd.DataFrame([{
            'lat': input.lat, 'lon': input.lon, 
            'slope': input.slope, 'azimuth': input.azimuth,
            'Gb(i)': float(poa['poa_direct']), 
            'Gd(i)': float(poa['poa_diffuse']), 
            'Gr(i)': float(poa['poa_ground_diffuse']),
            'T2m': temp, 
            'WS10m': viento
        }])

        pred_watts = modelo.predict(df_input)[0]

        return {
            "status": "success",
            "hora_local": hora_actual,
            "watts": round(max(0, float(pred_watts)), 2),
            "clima_debug": {
                "temp": temp,
                "ghi_suelo": ghi,
                "directa_panel": round(float(poa['poa_direct']), 2)
            }
        }

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="127.0.0.1", port=8000)