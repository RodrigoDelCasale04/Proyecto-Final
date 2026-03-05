import React from 'react'
import { useNavigate } from 'react-router-dom'
import Formulario from './Formulario'

function PaginaPrincipal() {
  const navigate = useNavigate()
  return (
        <>
             <header className="header">
                <div className="logo">Logo</div>
        <nav>  
            <ul className="nav-links">
                <li><button onClick={() => navigate("/login")}>Iniciar Sesion</button> </li>
            <li>  <button onClick={() => navigate("/register")}>Registrarse</button>   </li>
            </ul>
        </nav>
        </header>
            <h2> La pagina esta en desarrollo</h2>
            <div className=''>
                <p>Estamos trabajando para ofrecerte la mejor experiencia. Pronto podrás acceder a todas las funcionalidades de nuestra plataforma.</p>
                <p>¡Gracias por tu paciencia!</p>
                <p>ACA IRIA TODA LA INFO NUESTRA, QUE HACEMOS ETC PODRIAMOS HACER CON FOTOS Y BIEN DECORADO</p>
             

            </div>
            <Formulario />
            
    </>
  )
}

export default PaginaPrincipal
