import "../../src/css/App.css";
import { Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import PaginaPrincipal from "./PaginaPrincipal";
import Formulario from "./Formulario";
import ResultadoSolar from "./ResultadoSolar";
import Login from "./Login";
import Register from "./Register";

function App() {
  // Estado para coordenadas (Default Madrid por si falla el GPS)
  const [coords, setCoords] = useState({ lat: 40.4167, lon: -3.7033 });
  const [resultadoIA, setResultadoIA] = useState(null);
  const [gastoOriginal, setGastoOriginal] = useState(0);

  // Obtener ubicación automáticamente al cargar la app
  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          setCoords({ lat: pos.coords.latitude, lon: pos.coords.longitude });
          console.log("📍 Ubicación obtenida:", pos.coords.latitude, pos.coords.longitude);
        },
        (err) => {
          console.warn("⚠️ GPS denegado, usando ubicación por defecto (Madrid).");
        },
        { enableHighAccuracy: true, timeout: 5000 }
      );
    }
  }, []);

  const handleFinalData = (data, gasto) => {
    setResultadoIA(data);
    setGastoOriginal(gasto);
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#0f172a', minHeight: '100vh', color: 'white' }}>
      <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700;800&display=swap" rel="stylesheet"></link>
      
      <Routes>
        <Route path="/" element={
          <div className="main-content" style={{ paddingTop: '80px' }}>
            {/* Header / Banner Principal */}
            <PaginaPrincipal />
            
            <div style={{ maxWidth: '700px', margin: '0 auto', padding: '20px' }}>
              
              {/* Formulario Directo (Ya tiene la lat/lon por props) */}
              {!resultadoIA ? (
                <div style={{ animation: 'fadeIn 0.8s' }}>
                  <h2 style={{ textAlign: 'center', color: '#fbbf24', marginBottom: '30px' }}>
                    Calcula tu ahorro energético
                  </h2>
                  <Formulario 
                    lat={coords.lat} 
                    lon={coords.lon} 
                    panelesSugeridos={6} // Valor base por defecto
                    onDataReceived={handleFinalData} 
                  />
                </div>
              ) : (
                /* Sección de Resultados */
                <div style={{ animation: 'slideUp 0.6s' }}>
                  <div style={{ textAlign: 'center', marginBottom: '20px' }}>
                    <button 
                      onClick={() => setResultadoIA(null)} 
                      style={{ background: 'none', border: '1px solid #fbbf24', color: '#fbbf24', padding: '8px 20px', borderRadius: '8px', cursor: 'pointer' }}
                    >
                      ↺ Realizar otro cálculo
                    </button>
                  </div>
                  <ResultadoSolar data={resultadoIA} gastoOriginal={gastoOriginal} />
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