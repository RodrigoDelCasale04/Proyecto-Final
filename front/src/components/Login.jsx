import React from 'react'
import { useNavigate } from 'react-router-dom'

function Login() {
    const navigate = useNavigate()
    const handleSubmit = (ev)=>{
        ev.preventDefault()
        const correo = ev.target.correo.value
        const contraseña = ev.target.contraseña.value
        console.log(correo, contraseña)
    }
  return (
    <>
    <h2>Login</h2>
    <form className="formulario" onSubmit={handleSubmit}>
        <div>
        <input type="email" placeholder = "Correo" id='correo' />
        <input type="password" placeholder = "Contraseña" id='contraseña'/>
        <button>Iniciar Sesion</button>
        <button onClick={() => navigate("/register")}>No tenes cuenta? Registrate</button>
        </div>
    </form>

    </>
  )
}

export default Login