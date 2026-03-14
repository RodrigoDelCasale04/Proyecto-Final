import React, { useState } from 'react';

function Formulario({ lat, lon, onDataReceived }) {
  const [datos, setDatos] = useState({
    orientacion: 'Sur',
    inclinacion: '30',
    gastoMensual: '',
    estacion: 'Primavera',
    numPaneles: '6'
  });

  const [cargando, setCargando] = useState(false);

  const handleChange = (e) => {
    setDatos({ ...datos, [e.target.name]: e.target.value });
  };

  const enviarAlBack = async (e) => {
    e.preventDefault();
    setCargando(true);

    try {
      const response = await fetch('http://localhost:3000/api/calcular-solar', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          lat, 
          lon, 
          formUser: datos 
        })
      });

      if (!response.ok) throw new Error("Error en el servidor");

      const resData = await response.json();
      onDataReceived(resData, datos.gastoMensual);

    } catch (err) {
      alert("Error al conectar con la IA de predicción");
    } finally {
      setCargando(false);
    }
  };

  return (
    <div style={{ background: '#1e293b', padding: '30px', borderRadius: '20px', border: '1px solid #334155' }}>
      <form onSubmit={enviarAlBack}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
          <div className="input-group">
            <label style={{ color: '#94a3b8', fontSize: '0.8rem' }}>Num. de Paneles</label>
            <input type="number" name="numPaneles" value={datos.numPaneles} onChange={handleChange} style={inputStyle} />
          </div>
          <div className="input-group">
            <label style={{ color: '#94a3b8', fontSize: '0.8rem' }}>Inclinación (°)</label>
            <input type="number" name="inclinacion" value={datos.inclinacion} onChange={handleChange} style={inputStyle} />
          </div>
          <div className="input-group">
            <label style={{ color: '#94a3b8', fontSize: '0.8rem' }}>Orientación</label>
            <select name="orientacion" value={datos.orientacion} onChange={handleChange} style={inputStyle}>
              <option value="Sur">Sur</option>
              <option value="Este">Este</option>
              <option value="Oeste">Oeste</option>
            </select>
          </div>
          <div className="input-group">
            <label style={{ color: '#fbbf24', fontSize: '0.8rem', fontWeight: 'bold' }}>Gasto Luz (€)</label>
            <input type="number" name="gastoMensual" value={datos.gastoMensual} onChange={handleChange} required style={{...inputStyle, border: '1px solid #fbbf24'}} />
          </div>
        </div>
        <button type="submit" disabled={cargando} style={buttonStyle}>
          {cargando ? '⌛ CALCULANDO...' : '🚀 OBTENER RESULTADO'}
        </button>
      </form>
    </div>
  );
}

const inputStyle = { width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #334155', background: '#0f172a', color: 'white', marginTop: '5px' };
const buttonStyle = { width: '100%', marginTop: '30px', padding: '15px', borderRadius: '10px', background: '#fbbf24', color: '#0f172a', fontWeight: 'bold', border: 'none', cursor: 'pointer' };

export default Formulario;