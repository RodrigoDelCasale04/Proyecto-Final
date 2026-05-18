import pandas as pd
import glob
import os
import re

def crear_super_dataset(directorio_entrada, archivo_salida):
    archivos = glob.glob(os.path.join(directorio_entrada, "*.csv"))
    lista_df = []
    
    print(f"Detectados {len(archivos)} archivos. Iniciando procesamiento técnico...")

    for path in archivos:
        nombre_archivo = os.path.basename(path)
        
        # 1. Extraer Metadatos del encabezado (Las primeras 10 líneas)
        with open(path, 'r') as f:
            header_content = "".join([f.readline() for _ in range(12)])
        
        try:
            # Buscamos los valores usando expresiones regulares
            lat = float(re.search(r"Latitude \(decimal degrees\):\s+([-?\d.]+)", header_content).group(1))
            lon = float(re.search(r"Longitude \(decimal degrees\):\s+([-?\d.]+)", header_content).group(1))
            slope = float(re.search(r"Slope:\s+([\d.]+)", header_content).group(1))
            # El Azimuth puede no estar si slope es 0, manejamos eso:
            azimuth_match = re.search(r"Azimuth:\s+([-?\d.]+)", header_content)
            azimuth = float(azimuth_match.group(1)) if azimuth_match else 0.0
            
            # 2. Cargar los datos (Saltamos las líneas de texto hasta llegar a la tabla)
            # Buscamos la línea que empieza con 'time'
            df = pd.read_csv(path, skiprows=10, skipfooter=10, engine='python')
            
            # 3. Inyectar metadatos como columnas
            df['lat'] = lat
            df['lon'] = lon
            df['slope'] = slope
            df['azimuth'] = azimuth
            
            lista_df.append(df)
            print(f"Procesado: {nombre_archivo} -> Lat: {lat}, Slope: {slope}, Az: {azimuth}")
            
        except Exception as e:
            print(f"Error en archivo {nombre_archivo}: {e}")

    # 4. Consolidar y Guardar
    if lista_df:
        df_final = pd.concat(lista_df, ignore_index=True)
        # Seleccionamos y ordenamos las columnas para el entrenamiento
        columnas_ordenadas = [
            'lat', 'lon', 'slope', 'azimuth', 
            'Gb(i)', 'Gd(i)', 'Gr(i)', 'T2m', 'WS10m', 'P'
        ]
        df_final = df_final[columnas_ordenadas]
        
        df_final.to_csv(archivo_salida, index=False)
        print(f"\n¡Éxito! Dataset universal creado en: {archivo_salida}")
        print(f"Total de registros para entrenar: {len(df_final)}")
    else:
        print("No se pudo procesar ningún archivo.")

# --- EJECUCIÓN ---
ruta_carpeta = r"C:\Users\rdelc\Desktop\dataEntrenamiento"
nombre_csv_final = r"C:\Users\rdelc\Desktop\dataset_solar_final.csv"

crear_super_dataset(ruta_carpeta, nombre_csv_final)