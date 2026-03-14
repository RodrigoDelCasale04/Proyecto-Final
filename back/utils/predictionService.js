import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

export const getSolarData = async (lat, lon, formUser) => {
    try {
        // 1. Clima
        const weatherRes = await axios.get(
            `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${process.env.OPENWEATHER_API_KEY}&units=metric`
        );
        
        const tempReal = weatherRes.data.main.temp;
        const clouds = weatherRes.data.clouds.all;
        const wind = weatherRes.data.wind.speed;

        // 2. Radiación según nubes
        const radiacionEstimada = Math.max(10, 1000 - (clouds * 9));

        // 3. IA - Mandamos los nombres exactos de las columnas
        const mlRes = await axios.post(process.env.PYTHON_ML_URL, {
            radiacion: radiacionEstimada,
            temp: tempReal,
            viento: wind
        });

        // IMPORTANTE: Aquí corregimos la escala de la IA
        const potenciaBaseKW = mlRes.data.potencia_base; 
        const nPaneles = parseInt(formUser.numPaneles) || 1;
        const potenciaFinalKW = potenciaBaseKW * (nPaneles * 0.4);

        const facturaUsuario = parseFloat(formUser.gastoMensual) || 0;
        const precioKwh = 0.22;

        const calcularMetricas = (hsp) => {
            const kwh = parseFloat((potenciaFinalKW * hsp * 30).toFixed(2));
            const ahorro = parseFloat((kwh * precioKwh).toFixed(2));
            const pagoFinal = Math.max(0, facturaUsuario - ahorro).toFixed(2);
            return { kwh, ahorro, pagoFinal };
        };

        // ESTA ESTRUCTURA ES LA QUE BUSCA EL FRONT (ResultadoSolar.jsx)
        return {
            pagoFinalActual: calcularMetricas(formUser.estacion === 'Verano' ? 7 : formUser.estacion === 'Invierno' ? 3 : 5).pagoFinal,
            comparativa: {
                invierno: calcularMetricas(3),
                primavera: calcularMetricas(5),
                verano: calcularMetricas(7)
            },
            detalles: {
                ubicacion: weatherRes.data.name || "Madrid"
            }
        };

    } catch (error) {
        console.error("Error detallado:", error.response?.data || error.message);
        throw new Error("Fallo en el cálculo solar");
    }
};