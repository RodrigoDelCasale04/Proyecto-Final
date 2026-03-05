import React from 'react'
import { useState } from 'react'


function Formulario() {
 const [datos, setDatos] = useState({
    orientacion: 'Sur',
    inclinacion: '30',
    gastoMensual: '',
    prioridad: 'N-Type'
  });

  const handleChange = (e) => {
    setDatos({
      ...datos,
      [e.target.name]: e.target.value
    });
  };

  const manejarCalculo = (e) => {
    e.preventDefault();
    
    console.log("Enviando datos al modelo:", datos);
  };

  return (
    <div className="asesoramiento-container">
      <h2>Configura tu Instalación</h2>
      <form onSubmit={manejarCalculo} className="asesoramiento">
        
       
        <div className="input-group">
          <label>¿Hacia dónde apunta tu tejado?</label>
          <select name="orientacion" value={datos.orientacion} onChange={handleChange}>
            <option value="Sur">Sur (Máxima producción)</option>
            <option value="Sureste">Sureste (-45°)</option>
            <option value="Suroeste">Suroeste (+45°)</option>
            <option value="Este">Este (-90°)</option>
            <option value="Oeste">Oeste (+90°)</option>
          </select>
        </div>

        
        <div className="input-group">
          <label>Inclinación del tejado</label>
          <select name="inclinacion" value={datos.inclinacion} onChange={handleChange}>
            <option value="0">Plano (0°)</option>
            <option value="15">Poca inclinación (15°)</option>
            <option value="30">Estándar (30°)</option>
            <option value="45">Mucha inclinación (45°)</option>
          </select>
        </div>

        
        <div className="input-group">
          <label>Gasto promedio mensual de luz (€)</label>
          <input 
            type="number" 
            name="gastoMensual" 
            placeholder="Ej: 120" 
            value={datos.gastoMensual} 
            onChange={handleChange}
            required 
          />
        </div>

        
        <div className="input-group">
          <label>Tipo de tecnología preferida</label>
          <div className="radio-group">
            <label>
              <input type="radio" name="prioridad" value="PERC" onChange={handleChange} /> 
              Económica (PERC)
            </label>
            <label>
              <input type="radio" name="prioridad" value="N-Type" defaultChecked onChange={handleChange} /> 
              Equilibrada (N-Type)
            </label>
            <label>
              <input type="radio" name="prioridad" value="HJT" onChange={handleChange} /> 
              Alta Eficiencia (HJT)
            </label>
          </div>
        </div>

        <button type="submit" className="btn-calcular">Realizar Diagnóstico</button>
      </form>
    </div>
  );
};

export default Formulario;