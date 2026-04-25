import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  User, Mail, Shield, Zap, Rocket, Crown, 
  LogOut, Edit2, Save, X, Lock 
} from 'lucide-react';
import { Link } from 'react-router-dom';


const Perfil = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [user, setUser] = useState({
    nombre: "Usuario Solaris",
    email: "usuario@ejemplo.com", // Solo lectura por seguridad
    password: "••••••••",
    plan: "Particular",
    fechaRegistro: "12 de Marzo, 2024"
  });

  const [tempUser, setTempUser] = useState({ ...user });

  const planConfig = {
    "Básico": { icono: Zap, color: "#94a3b8", desc: "Simulaciones ilimitadas" },
    "Particular": { icono: Rocket, color: "#fbbf24", desc: "Dashboard & Seguimiento ROI" },
    "Empresa": { icono: Crown, color: "#a855f7", desc: "Multi-sede & Informes Corporativos" }
  };

  const configActual = planConfig[user.plan] || planConfig["Básico"];
  const IconoPlan = configActual.icono;

  const handleSave = () => {
    setUser({ ...tempUser });
    setIsEditing(false);
  };

  const handleCancel = () => {
    setTempUser({ ...user });
    setIsEditing(false);
  };

  return (
    <div className="main-content" style={{ paddingTop: '110px', paddingBottom: '50px', display: 'flex', justifyContent: 'center', paddingInline: '20px' }}>
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        style={{
          width: '100%', maxWidth: '550px', background: '#1e293b',
          borderRadius: '24px', border: '1px solid #334155', overflow: 'hidden'
        }}
      >
        {/* HEADER DEL PERFIL */}
        <div style={{ background: 'linear-gradient(45deg, #0f172a, #1e293b)', padding: '40px 30px', textAlign: 'center', borderBottom: '1px solid #334155', position: 'relative' }}>
          
          <button 
            onClick={() => isEditing ? handleCancel() : setIsEditing(true)}
            style={{ position: 'absolute', top: '20px', right: '20px', background: 'rgba(255,255,255,0.05)', border: 'none', padding: '10px', borderRadius: '50%', cursor: 'pointer', color: '#fbbf24' }}
          >
            {isEditing ? <X size={20} /> : <Edit2 size={20} />}
          </button>

          <div style={{ 
            width: '100px', height: '100px', borderRadius: '50%', background: '#fbbf24', 
            margin: '0 auto 15px', display: 'flex', alignItems: 'center', justifyContent: 'center',
            boxShadow: '0 0 20px rgba(251, 191, 36, 0.3)'
          }}>
            <User size={50} color="#1e293b" />
          </div>

          {isEditing ? (
            <input 
              value={tempUser.nombre}
              onChange={(e) => setTempUser({...tempUser, nombre: e.target.value})}
              style={{ background: '#0f172a', border: '1px solid #fbbf24', color: 'white', fontSize: '1.5rem', fontWeight: '800', textAlign: 'center', borderRadius: '8px', padding: '5px', width: '80%', outline: 'none' }}
              placeholder="Nombre de usuario"
            />
          ) : (
            <h2 style={{ color: 'white', fontSize: '1.8rem', fontWeight: '800', margin: 0 }}>{user.nombre}</h2>
          )}
          <p style={{ color: '#94a3b8', margin: '10px 0 0 0', fontSize: '0.9rem' }}>Miembro desde {user.fechaRegistro}</p>
        </div>

        <div style={{ padding: '30px' }}>
          
          {/* SECCIÓN DE PLAN ACTUAL */}
          <div style={{ background: 'rgba(251, 191, 36, 0.05)', borderRadius: '16px', padding: '20px', border: `1px solid ${configActual.color}40`, marginBottom: '25px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                <div style={{ background: configActual.color, padding: '10px', borderRadius: '12px' }}>
                  <IconoPlan size={24} color="#1e293b" />
                </div>
                <div>
                  <small style={{ color: '#94a3b8', textTransform: 'uppercase', fontWeight: '700', fontSize: '0.7rem' }}>Plan Actual</small>
                  <h4 style={{ color: 'white', margin: 0, fontSize: '1.2rem', fontWeight: '800' }}>Plan {user.plan}</h4>
                </div>
              </div>
            </div>
            <p style={{ color: '#94a3b8', fontSize: '0.85rem', marginTop: '12px', display: 'flex', alignItems: 'center', gap: '5px' }}>
              <Shield size={14} color="#4ade80" /> {configActual.desc}
            </p>
          </div>

          {/* DATOS DE LA CUENTA */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
            
            {/* EMAIL (FIJO) */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '15px', padding: '15px', background: '#0f172a', borderRadius: '12px', opacity: 0.7 }}>
              <Mail size={20} color="#94a3b8" />
              <div style={{ flex: 1 }}>
                <small style={{ color: '#94a3b8', display: 'block', fontSize: '0.75rem' }}>Email de acceso</small>
                <span style={{ color: 'white', fontWeight: '600' }}>{user.email}</span>
              </div>
            </div>

            {/* CONTRASEÑA (EDITABLE) */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '15px', padding: '15px', background: '#0f172a', borderRadius: '12px', border: isEditing ? '1px solid #fbbf24' : '1px solid transparent' }}>
              <Lock size={20} color="#fbbf24" />
              <div style={{ flex: 1 }}>
                <small style={{ color: '#94a3b8', display: 'block', fontSize: '0.75rem' }}>Contraseña</small>
                {isEditing ? (
                  <input 
                    type="password"
                    value={tempUser.password}
                    onChange={(e) => setTempUser({...tempUser, password: e.target.value})}
                    style={{ background: 'transparent', border: 'none', color: 'white', fontWeight: '600', width: '100%', outline: 'none' }}
                  />
                ) : (
                  <span style={{ color: 'white', fontWeight: '600' }}>{user.password}</span>
                )}
              </div>
            </div>

            {/* BOTÓN GUARDAR (SOLO EN MODO EDICIÓN) */}
            {isEditing && (
              <motion.button 
                whileTap={{ scale: 0.95 }}
                onClick={handleSave}
                style={{ width: '100%', padding: '15px', borderRadius: '12px', background: '#fbbf24', color: '#1e293b', fontWeight: '800', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', marginTop: '10px' }}
              >
                <Save size={20} /> GUARDAR CAMBIOS
              </motion.button>
            )}
          </div>

          {/* BOTÓN CERRAR SESIÓN */}
          {!isEditing && (
            <button style={{ 
              width: '100%', marginTop: '30px', padding: '15px', borderRadius: '12px', 
              border: '1px solid #ef4444', background: 'rgba(239, 68, 68, 0.1)', 
              color: '#ef4444', fontWeight: '700', display: 'flex', alignItems: 'center', 
              justifyContent: 'center', gap: '10px', cursor: 'pointer',
              transition: 'all 0.2s'
            }}
            onMouseOver={(e) => e.currentTarget.style.background = 'rgba(239, 68, 68, 0.2)'}
            onMouseOut={(e) => e.currentTarget.style.background = 'rgba(239, 68, 68, 0.1)'}
            >
              <LogOut size={20} /> Cerrar Sesión
            </button>
          )}

        </div>
      </motion.div>
    </div>
    
  );
};

export default Perfil;