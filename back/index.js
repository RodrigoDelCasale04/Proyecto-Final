import express from 'express';
import cors from 'cors';
import { getSolarData } from './utils/predictionService.js';
import dotenv from 'dotenv';
dotenv.config()

const app = express();
app.use(cors());
app.use(express.json());


app.post('/api/calcular-solar', async (req, res) => {
    const { lat, lon, formUser } = req.body;
    
    try {
        const resultado = await getSolarData(lat, lon, formUser);
        res.json(resultado);
    } catch (error) {
        // ESTO TE VA A DECIR EL ERROR REAL EN LA TERMINAL
        console.error("DETALLE DEL ERROR:", error.response?.data || error.message);
        res.status(500).json({ 
            error: "Error al calcular", 
            mensaje: error.response?.data?.message || error.message 
        });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor Backend corriendo en puerto ${PORT}`);
});