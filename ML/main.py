from fastapi import FastAPI
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
import joblib
import pandas as pd
import os

app = FastAPI()

# 1. Configurar CORS para que Node y el Front puedan hablar con Python
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# 2. Cargar el modelo .pkl
modelo = joblib.load('modelo_solar.pkl')

# 3. ESTA ES LA ESTRUCTURA QUE MANDA TU UTILS.JS
class DatosEntrada(BaseModel):
    radiacion: float
    temp: float
    viento: float

@app.post("/api/calcular-solar")
async def predecir(input: DatosEntrada):
    try:
        # 4. Crear el DataFrame con los nombres de columna del entrenamiento
        df = pd.DataFrame(
            [[input.radiacion, input.temp, input.viento]], 
            columns=['G_total', 'T2m', 'WS10m']
        )
        
        # 5. Predicción
        prediccion_watts = modelo.predict(df)[0]
        
        # 6. Devolver el dato (dividido por 1000 para kW)
        return {"potencia_base": float(prediccion_watts / 1000)}
        
    except Exception as e:
        return {"error": str(e)}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="127.0.0.1", port=8000)