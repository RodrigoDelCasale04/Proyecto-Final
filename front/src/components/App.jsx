import "../../src/css/App.css";
import { Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

// Componentes
import PaginaPrincipal from "./PaginaPrincipal"; 
import Home from "./Home";                       
import Info from "./Info";                       
import Formulario from "./Formulario";           
import ResultadoSolar from "./ResultadoSolar";   
import Login from "./Login";
import Register from "./Register";

// Lógica de ingeniería
import { procesarSimulacion } from "../utils/engine";

function App() {
  const [coords, setCoords] = useState({ lat: 40.4167, lon: -3.7033 });
  const [resultadoIA, setResultadoIA] = useState(null);
  const [cargando, setCargando] = useState(false);

  // GPS
  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (pos) => setCoords({ lat: pos.coords.latitude, lon: pos.coords.longitude }),
        (err) => console.warn("GPS denegado, usando Madrid."),
        { enableHighAccuracy: true, timeout: 5000 }
      );
    }
  }, []);

  // FUNCIÓN PRINCIPAL DE CONEXIÓN
 const handleFinalData = async (formData) => {
    setCargando(true);
    try {
      const resIngenieria = procesarSimulacion(formData);

      // Enviamos el objeto con las claves exactas que el Backend desestructura
      const response = await axios.post("http://localhost:3000/api/calcular-solar", {
        lat: coords.lat,
        lon: coords.lon,
        formUser: {
          gastoMensual: formData.gasto,
          cantidadPaneles: resIngenieria.cantidad, // Coincide con el Backend
          wattsPanel: resIngenieria.panel.watts     // Coincide con el Backend
        }
      });

      const dataFinal = {
        ...response.data,
        areaOcupada: resIngenieria.areaOcupada,
        panelNombre: resIngenieria.panel.nombre,
        cantidad: resIngenieria.cantidad
      };

      setResultadoIA(dataFinal);
    } catch (error) {
      console.error("Error detallado:", error.response?.data || error.message);
      alert("Error en el servidor de IA. Revisa la consola del Backend.");
    } finally {
      setCargando(false);
    }
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#0f172a', color: 'white' }}>
      <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700;800&display=swap" rel="stylesheet" />
      
      <PaginaPrincipal />

      <Routes>
        <Route path="/" element={
          <div style={{ paddingTop: '100px' }}>
            <Home /> 
            <Info /> 
          </div>
        } />

        <Route path="/calculadora" element={
          <div className="main-content" style={{ paddingTop: '110px', paddingBottom: '50px' }}>
            <div style={{ maxWidth: '700px', margin: '0 auto', padding: '20px' }}>
              
              {cargando ? (
                <div style={{ textAlign: 'center', padding: '50px' }}>
                  <div className="spinner"></div>
                  <p style={{ marginTop: '20px', color: '#fbbf24' }}>Consultando Clima e IA de Producción...</p>
                </div>
              ) : !resultadoIA ? (
                <div style={{ animation: 'fadeIn 0.8s' }}>
                  <h2 style={{ textAlign: 'center', color: '#fbbf24', marginBottom: '30px', fontWeight: '800' }}>
                    SIMULADOR SOLAR IA
                  </h2>
                  <Formulario onDataReceived={handleFinalData} />
                </div>
              ) : (
                <div style={{ animation: 'slideUp 0.6s' }}>
                  <div style={{ textAlign: 'center', marginBottom: '20px' }}>
                    <button 
                      onClick={() => setResultadoIA(null)} 
                      style={{ background: 'none', border: '1px solid #fbbf24', color: '#fbbf24', padding: '8px 20px', borderRadius: '8px', cursor: 'pointer' }}
                    >
                      ↺ Nuevo cálculo
                    </button>
                  </div>
                  <ResultadoSolar data={resultadoIA} reset={() => setResultadoIA(null)} />
                </div>
              )}
            </div>
          </div>
        } />
        
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </div>
  );
}

export default App;