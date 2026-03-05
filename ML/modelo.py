import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestRegressor
from sklearn.metrics import mean_absolute_error, r2_score

# 1. Imaginemos que tus datos tienen este formato:
# 'radiacion_global': kWh/m2
# 'horas_sol': Horas promedio al día
# 'temp_ambiente': Temperatura media (afecta la eficiencia)
# 'nubosidad': % de días nublados
# 'score_aptitud': El objetivo (0 a 100)

def entrenar_modelo_solar(archivo_csv):
    # Cargar tus datos
    df = pd.read_csv(archivo_csv)
    
    # Seleccionamos las variables útiles (X) y lo que queremos predecir (y)
    features = ['radiacion_global', 'horas_sol', 'temp_ambiente', 'nubosidad']
    X = df[features]
    y = df['score_aptitud']
    
    # Dividimos los datos: 80% para entrenar, 20% para probar que funciona
    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)
    
    # Usamos Random Forest: es muy robusto y moderno para estos datos
    modelo = RandomForestRegressor(n_estimators=100, random_state=42)
    
    # ¡A entrenar!
    print("Entrenando modelo fotovoltaico...")
    modelo.fit(X_train, y_train)
    
    # Verificamos qué tan bueno es
    predicciones = modelo.predict(X_test)
    error = mean_absolute_error(y_test, predicciones)
    r2 = r2_score(y_test, predicciones)
    
    print(f"Modelo listo.")
    print(f"Error promedio: {error:.2f} puntos sobre 100")
    print(f"Precisión (R2): {r2:.2f}")
    
    return modelo

# --- EJEMPLO DE USO ---
# Si quisieras predecir un lugar nuevo después de entrenar:
# datos_lugar = [[5.2, 8.5, 25, 10]] # [radiacion, horas, temp, nubes]
# aptitud = modelo.predict(datos_lugar)