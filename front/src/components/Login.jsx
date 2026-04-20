import React from 'react'
import { useNavigate } from 'react-router-dom'

function Login() {
  const navigate = useNavigate()
  
  const handleSubmit = (ev) => {
    ev.preventDefault()
    const correo = ev.target.correo.value
    const contraseña = ev.target.contraseña.value
    console.log(correo, contraseña)
  }

  return (
    <div style={{ padding: '0 20px' }}>
      <h2>LOGIN</h2>
      <form className="formulario" onSubmit={handleSubmit}>
        <div className="form-container">
          <input 
            type="email" 
            placeholder="Correo electrónico" 
            id='correo' 
            required 
          />
          <input 
            type="password" 
            placeholder="Contraseña" 
            id='contraseña' 
            required 
          />
          
          <button type="submit" className="btn-submit">
            INICIAR SESIÓN
          </button>
          
          <button 
            type="button" 
            className="btn-secondary" 
            onClick={() => navigate("/register")}
          >
            ¿No tienes cuenta? Registrate aquí
          </button>
        </div>
      </form>
    </div>
  )
}

export default Login