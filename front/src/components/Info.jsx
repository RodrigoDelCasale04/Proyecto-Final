import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Cpu, ShoppingCart } from 'lucide-react';

const InfoCard = ({ icon: Icon, title, text, delay }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.6, delay }}
    whileHover={{ scale: 1.05 }}
    style={{
      flex: 1,
      padding: '2rem',
      borderRadius: '20px',
      backgroundColor: 'rgba(255, 255, 255, 0.05)',
      border: '1px solid rgba(255, 255, 255, 0.1)',
      backdropFilter: 'blur(10px)',
      textAlign: 'center',
      minWidth: '280px'
    }}
  >
    <div style={{ color: '#fbbf24', marginBottom: '1rem', display: 'flex', justifyContent: 'center' }}>
      <Icon size={40} />
    </div>
    <h3 style={{ color: '#fbbf24', fontWeight: 'bold', fontSize: '1.2rem', marginBottom: '0.5rem', textTransform: 'uppercase' }}>
      {title}
    </h3>
    <p style={{ color: '#94a3b8', fontSize: '0.9rem', lineHeight: '1.6' }}>
      {text}
    </p>
  </motion.div>
);

function Info() {
  return (
    <div style={{ 
      width: '100%', 
      maxWidth: '1100px', 
      margin: '0 auto', 
      padding: '40px 20px',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center' 
    }}>
      <div style={{ 
        display: 'flex', 
        flexWrap: 'wrap', 
        gap: '20px', 
        width: '100%',
        justifyContent: 'center' 
      }}>
        <InfoCard 
          icon={ShieldCheck}
          title="Visión Solaris"
          text="Democratizando la Ingeniería Solar con IA Avanzada. Precisión técnica y transparencia total para tu hogar."
          delay={0.1}
        />

        <InfoCard 
          icon={Cpu}
          title="Precisión IA"
          text="<5% de margen de error vs 20% de la industria. Entrenada con 20 años de datos climáticos de la NASA."
          delay={0.3}
        />

        <InfoCard 
          icon={ShoppingCart}
          title="Marketplace"
          text="Conectamos usuarios con instaladoras certificadas. Sin sesgos comerciales ni sobredimensionamiento."
          delay={0.5}
        />
      </div>
    </div>
  );
}

export default Info; // <--- ESTO ARREGLA EL ERROR DE VITE