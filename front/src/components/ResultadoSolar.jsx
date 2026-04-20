import React from 'react';
import { Zap, Maximize, ThermometerSun, Snowflake, CloudSun, Sun, Award, Target } from 'lucide-react';

const ResultadoSolar = ({ data, reset }) => {
  if (!data) return <div className="form-container" style={{background: '#1e293b', textAlign: 'center'}}>Conectando con IA Solar...</div>;

  const estacionales = {
    invierno: { icono: Snowflake, color: "#60a5fa" },
    primavera: { icono: CloudSun, color: "#4ade80" },
    verano: { icono: Sun, color: "#fbbf24" },
    otoño: { icono: Target, color: "#f97316" }
  };

  return (
    // He quitado el límite de ancho de 700px para que se vea más imponente
    <div className="resultado-container" style={{ animation: 'slideUp 0.5s ease', width: '100%', maxWidth: '900px', margin: '0 auto' }}>
      <div className="form-container" style={{ background: '#1e293b', border: '1px solid #334155', padding: '40px' }}>
        
        {/* TITULO Y PANEL */}
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
            <Award size={40} color="#fbbf24" style={{margin: '0 auto 15px'}} />
            <h2 style={{ color: '#fbbf24', fontSize: '2.2rem', fontWeight: '800', margin: '0 0 10px 0', textTransform: 'uppercase' }}>
                {data.panelNombre || "LONGi HI-MO 7"} ({data.wattsPanel || '560'}W)
            </h2>
            <p style={{ opacity: 0.7, fontSize: '1.1rem', margin: 0 }}>
                Configuración recomendada: <span style={{color: '#fbbf24', fontWeight: '700'}}>{data.cantidad || 0} unidades</span>
            </p>
        </div>

        {/* STATS PRINCIPALES (Más grandes) */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '45px' }}>
          <div style={{ background: '#0f172a', padding: '25px', borderRadius: '20px', textAlign: 'center', border: '1px solid #334155' }}>
            <Zap size={28} color="#fbbf24" style={{ margin: '0 auto 10px' }} />
            <div style={{ fontSize: '1.8rem', fontWeight: '800', color: 'white' }}>{data?.potenciaTotalW || 0} W</div>
            <small style={{ color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Capacidad Instalada</small>
          </div>
          <div style={{ background: '#0f172a', padding: '25px', borderRadius: '20px', textAlign: 'center', border: '1px solid #334155' }}>
            <Maximize size={28} color="#fbbf24" style={{ margin: '0 auto 10px' }} />
            <div style={{ fontSize: '1.8rem', fontWeight: '800', color: 'white' }}>{data?.areaOcupada || 0} m²</div>
            <small style={{ color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Espacio Necesario</small>
          </div>
        </div>

        {/* COMPARATIVA ESTACIONAL */}
        <h4 style={{ marginBottom: '25px', color: '#f1f5f9', fontSize: '1.1rem', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <ThermometerSun size={20} color="#fbbf24" />
            Producción Energética y Ahorro Estimado
        </h4>
        
        {data?.comparativa ? Object.entries(data.comparativa).map(([key, val]) => {
            const config = estacionales[key] || { icono: Sun, color: "#fff" };
            const IconoEstacion = config.icono;
            
            return (
                <div key={key} style={{ marginBottom: '25px', background: 'rgba(15, 23, 42, 0.3)', padding: '15px', borderRadius: '15px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px', alignItems: 'flex-end' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                            <IconoEstacion size={20} color={config.color} />
                            <span style={{ textTransform: 'capitalize', fontWeight: '600', color: '#f1f5f9' }}>{key}</span>
                        </div>
                        {/* AÑADIDO: Watts/kWh producidos */}
                        <div style={{ textAlign: 'right' }}>
                            <div style={{ color: '#94a3b8', fontSize: '0.85rem' }}>Generación: {val?.kwh || 0} kWh</div>
                            <div style={{ color: config.color, fontWeight: '800', fontSize: '1.2rem' }}>
                                +{val?.ahorro || 0}€ <span style={{fontSize: '0.75rem', fontWeight: '400'}}>ahorro/mes</span>
                            </div>
                        </div>
                    </div>
                    
                    <div style={{ background: '#0f172a', height: '12px', borderRadius: '20px', overflow: 'hidden' }}>
                        <div style={{ 
                            width: `${Math.min((parseFloat(val?.ahorro) / (parseFloat(data?.gastoOriginal) || 100)) * 100, 100)}%`, 
                            height: '100%', 
                            backgroundColor: config.color,
                            borderRadius: '20px',
                            transition: 'width 1.5s cubic-bezier(0.17, 0.55, 0.55, 1)',
                            boxShadow: `0 0 15px ${config.color}30`
                        }}></div>
                    </div>
                </div>
            );
        }) : null}

        <button onClick={reset} className="btn-submit" style={{ marginTop: '20px', background: 'rgba(251, 191, 36, 0.1)', border: '1px solid #fbbf24', color: '#fbbf24' }}>
          REALIZAR OTRO ANÁLISIS
        </button>
      </div>
    </div>
  );
};

export default ResultadoSolar;