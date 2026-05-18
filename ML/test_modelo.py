""" import joblib
import pandas as pd
import numpy as np

# 1. Cargamos el modelo
modelo = joblib.load('modelo_solar_universal.pkl')

# 2. Definimos los nombres de las columnas (el orden del entrenamiento)
columnas = ['lat', 'lon', 'slope', 'azimuth', 'Gb(i)', 'Gd(i)', 'Gr(i)', 'T2m', 'WS10m']

# 3. Creamos el "Super Array" con todos los casos
# [lat, lon, slope, azimuth, Gb(i), Gd(i), Gr(i), T2m, WS10m]
casos_prueba = np.array([
    [37.38, -5.99, 30, 0, 850, 100, 10, 35, 2],    # 0. Verano Sevilla (Mucho calor)
    [43.26, -2.93, 30, 0, 50, 250, 5, 18, 4],     # 1. Nublado Bilbao (Mucha difusa)
    [39.46, -0.37, 20, 90, 400, 80, 5, 22, 3],    # 2. Tarde Valencia (Oeste)
    [40.41, -3.70, 45, 0, 500, 50, 5, 5, 1],      # 3. Invierno Madrid (Frio optimizador)
    [40.41, -3.70, 90, 0, 500, 50, 5, 5, 1]       # 4. Fachada Vertical Madrid (Mismo clima que el anterior)
])

# 4. Convertimos a DataFrame para que el modelo esté feliz
df_test = pd.DataFrame(casos_prueba, columns=columnas)

# 5. Predicción en bloque
predicciones = modelo.predict(df_test)

# 6. Mostrar resultados con nombres descriptivos
nombres_casos = [
    "VERANO SEVILLA (Calor)",
    "NUBLADO BILBAO (Difusa)",
    "TARDE VALENCIA (Oeste)",
    "INVIERNO MADRID (Frio)",
    "FACHADA VERTICAL MADRID"
]

print(f"{'ESCENARIO':<30} | {'PREDICCIÓN (Watts)':<20}")
print("-" * 55)

for nombre, valor in zip(nombres_casos, predicciones):
    print(f"{nombre:<30} | {valor:>10.2f} W") """ 

import joblib
import pandas as pd
import numpy as np

modelo = joblib.load('modelo_solar_universal.pkl')

# Simulamos que es MEDIODÍA (Sol en el Sur)
# Un panel al Sur recibe el 100%, uno al Este/Oeste recibe mucho menos directa.
lat, lon = 40.41, -3.7
temp, viento = 25, 2

casos_reales = pd.DataFrame([
    # [lat, lon, slope, azimuth, Gb(i), Gd(i), Gr(i), T2m, WS10m]
    [lat, lon, 35, 0,   800, 100, 10, temp, viento], # OPTIMO: Recibe todo el sol
    [lat, lon, 35, 90,  150, 100, 5,  temp, viento], # OESTE: A mediodía le llega de lado (poca directa)
    [lat, lon, 90, 0,   400, 100, 20, temp, viento], # VERTICAL: El sol está alto, le da "de techo"
    [lat, lon, 10, 180, 50,  100, 2,  temp, viento]  # NORTE: Solo recibe sombra y difusa
], columns=['lat', 'lon', 'slope', 'azimuth', 'Gb(i)', 'Gd(i)', 'Gr(i)', 'T2m', 'WS10m'])

preds = modelo.predict(casos_reales)

nombres = ["Sur 35° (Pleno Sol)", "Oeste 35° (Sombra parcial)", "Vertical 90° (Ángulo agudo)", "Norte 10° (Sombra total)"]

print("TEST REALISTA (Variando Radiación según Ángulo)")
print("-" * 60)
for nom, p in zip(nombres, preds):
    print(f"{nom:<30} -> {p:.2f} Watts")