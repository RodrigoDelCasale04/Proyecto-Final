import React from 'react'
import { useNavigate } from 'react-router-dom'

function PaginaPrincipal() {
  const navigate = useNavigate()
  return (
    <header className="header">
      <div className="logo" style={{ color: '#fbbf24', fontWeight: 'bold', fontSize: '1.2rem' }}>SOLAR IA</div>
      <nav>
        <ul className="nav-links">
          <li><button onClick={() => navigate("/login")}>Login</button></li>
          <li><button onClick={() => navigate("/register")}>Registro</button></li>
        </ul>
      </nav>
    </header>
  )
}
export default PaginaPrincipal;