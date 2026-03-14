import React from 'react';

const BarraAnimada = ({ label, datos, color, max, delay }) => {
  const diaria = (datos.kwh / 30).toFixed(2);
  return (
    <div style={{ marginBottom: '20px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem', marginBottom: '8px', color: '#f8fafc' }}>
        <span style={{ fontWeight: 'bold' }}>{label}</span>
        <span>
          <b style={{ color: '#fbbf24' }}>{datos.kwh} kWh/mes</b> 
          <span style={{ color: '#94a3b8', marginLeft: '8px', fontSize: '0.8rem' }}>(~{diaria} kWh/día)</span>
        </span>
      </div>
      <div style={{ backgroundColor: '#020617', borderRadius: '10px', height: '12px', width: '100%', overflow: 'hidden' }}>
        <div style={{ 
          backgroundColor: color, height: '100%', width: `${(datos.kwh / max) * 100}%`,
          transition: `width 1.5s ease-out ${delay}s`, boxShadow: `0 0 10px ${color}66`
        }}></div>
      </div>
      <p style={{ margin: '4px 0 0 0', fontSize: '0.75rem', color: '#22c55e', textAlign: 'right' }}>Ahorro: -{datos.ahorro}€</p>
    </div>
  );
};

const ResultadoSolar = ({ data, gastoOriginal }) => {
  const maxVal = Math.max(data.comparativa.verano.kwh, 1);
  return (
    <div style={{ marginTop: '30px', padding: '25px', borderRadius: '20px', backgroundColor: '#1e293b', color: '#f8fafc' }}>
      <h3 style={{ textAlign: 'center', color: '#fbbf24', marginBottom: '20px' }}>💰 BALANCE ESTIMADO</h3>
      <div style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center', backgroundColor: '#0f172a', padding: '20px', borderRadius: '15px', marginBottom: '25px' }}>
        <div style={{ textAlign: 'center' }}>
          <p style={{ fontSize: '0.7rem', color: '#94a3b8' }}>PAGO ACTUAL</p>
          <p style={{ fontSize: '1.4rem', color: '#ef4444', textDecoration: 'line-through' }}>{gastoOriginal}€</p>
        </div>
        <div style={{ fontSize: '1.5rem', color: '#fbbf24' }}>➔</div>
        <div style={{ textAlign: 'center' }}>
          <p style={{ fontSize: '0.7rem', color: '#94a3b8' }}>NUEVO PAGO</p>
          <p style={{ fontSize: '2rem', fontWeight: 'bold', color: '#22c55e' }}>{data.pagoFinalActual}€</p>
        </div>
      </div>
      <BarraAnimada label="Invierno" datos={data.comparativa.invierno} color="#38bdf8" max={maxVal} delay={0.1} />
      <BarraAnimada label="Primavera / Otoño" datos={data.comparativa.primavera} color="#22c55e" max={maxVal} delay={0.3} />
      <BarraAnimada label="Verano" datos={data.comparativa.verano} color="#fbbf24" max={maxVal} delay={0.5} />
    </div>
  );
};

export default ResultadoSolar;