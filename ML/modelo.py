import pandas as pd
import numpy as np
from sklearn.ensemble import RandomForestRegressor
from sklearn.model_selection import train_test_split
from sklearn.metrics import mean_absolute_error, r2_score
import joblib

ruta_csv = r"C:\Users\rdelc\Desktop\dataset_solar_final.csv"

print(f"Cargando y limpiando dataset gigante...")

try:
    df = pd.read_csv(ruta_csv)
    
  
    # Esto elimina cualquier fila que tenga un error en 'P' o en el clima
    df = df.dropna() 
    

    
    features = ['lat', 'lon', 'slope', 'azimuth', 'Gb(i)', 'Gd(i)', 'Gr(i)', 'T2m', 'WS10m']
    target = 'P'
    
    X = df[features]
    y = df[target]
    
    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)
    
    print(f"Iniciando entrenamiento con {len(X_train)} filas limpias...")
    
    modelo = RandomForestRegressor(
        n_estimators=100, 
        max_depth=20, 
        n_jobs=-1, 
        random_state=42,
        verbose=1
    )
    
    modelo.fit(X_train, y_train)
    
    # Guardar y evaluar
    joblib.dump(modelo, 'modelo_solar_universal.pkl')
    
    y_pred = modelo.predict(X_test)
    print(f"\nNota del modelo (R2 Score): {r2_score(y_test, y_pred):.4f}")
    print(f"Error promedio (MAE): {mean_absolute_error(y_test, y_pred):.2f} Watts")

except Exception as e:
    print(f"\nOcurrió un error: {e}")