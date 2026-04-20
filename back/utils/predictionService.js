import axios from 'axios';

export const getSolarData = async (lat, lon, formUser) => {
    try {
        // 1. Llamada a OpenWeather usando tu API KEY del .env
        const weatherRes = await axios.get(
            `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${process.env.OPENWEATHER_API_KEY}&units=metric`
        );
        
        const tempReal = weatherRes.data.main.temp;
        const clouds = weatherRes.data.clouds.all;
        const wind = weatherRes.data.wind.speed;
        
        // 2. Llamada a tu IA de Python (URL: http://127.0.0.1:8000/api/calcular-solar)
        // Usamos la variable del .env que configuraste
        const mlRes = await axios.post(process.env.PYTHON_ML_URL, {
            radiacion: Math.max(50, 1000 - (clouds * 9)),
            temp: tempReal,
            viento: wind
        });

        // Rendimiento base que devuelve tu modelo de IA
        const rendimientoIA = mlRes.data.potencia_base; 
        
        // 3. Datos que vienen del Frontend (formUser)
        const nPaneles = parseInt(formUser.cantidadPaneles) || 0;
        const wattsPanel = parseFloat(formUser.wattsPanel) || 0;
        const facturaUsuario = parseFloat(formUser.gastoMensual) || 0;
        
        // Pasamos Watts a kWp (ej: 450W -> 0.45kWp)
        const potenciaInstaladaKWp = nPaneles * (wattsPanel / 1000);
        const precioKwh = 0.22; // Precio promedio España

        // Función para calcular ahorro sin pasarse de la factura (El "Freno")
        const calcularMetricas = (hsp) => {
            const factorEficiencia = 0.8;
            const kwhMensuales = rendimientoIA * potenciaInstaladaKWp * hsp * 30 * factorEficiencia;
            
            // Limitamos el ahorro para que no sea mayor que lo que el usuario gasta
            const ahorroReal = Math.min(kwhMensuales * precioKwh, facturaUsuario);
            
            return { 
                kwh: kwhMensuales.toFixed(2), 
                ahorro: ahorroReal.toFixed(2), 
                pagoFinal: (facturaUsuario - ahorroReal).toFixed(2) 
            };
        };

        return {
            potenciaTotalW: (potenciaInstaladaKWp * 1000).toFixed(0),
            comparativa: {
                invierno: calcularMetricas(2.5),
                primavera: calcularMetricas(4.5),
                verano: calcularMetricas(6.5)
            }
        };

    } catch (error) {
        // Log para ver en la terminal qué falló exactamente
        console.error("Error detallado en getSolarData:", error.response?.data || error.message);
        throw error; 
    }
};