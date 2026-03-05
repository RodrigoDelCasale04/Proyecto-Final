import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function Register() {
    const navigate = useNavigate()
    const initialState = {
        nombre: "",
        apellido: "",
        correo: "",
        contraseña: ""
    }
    const [newUser, setNewUser] = useState(initialState)


    const handleSubmit = (ev) =>{
        ev.preventDefault()


    }
    const handleInput = (ev) =>{
        setNewUser({
            ...newUser,
            [ev.target.id]: ev.target.value
        })
        console.log(newUser)
        
    }


  return (
    <>
    
    
    <h2>Registro</h2>
    <form className = "formulario" onSubmit={handleSubmit} >
        <div >
        <input type="text" placeholder = "Nombre" onChange = {handleInput} id="nombre" />
        <input type="text" placeholder = "Apellido" onChange = {handleInput} id="apellido"/>
        <input type="email" placeholder = "Correo" onChange = {handleInput} id="correo"/>
        <input type="password" placeholder = "Contraseña" onChange = {handleInput} id="contraseña"/>
        <button>Registrarse</button>
        <button onClick={() => navigate("/login")}>Ya tenes cuenta? Inicia Sesion</button>
        </div>
    </form>
    
    
    </>
    
  )
}

export default Register