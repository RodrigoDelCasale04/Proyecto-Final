
import "../css/App.css"
import { Routes, Route } from "react-router-dom"
import Register from "./Register"
import Login from "./Login"
import PaginaPrincipal from "./PaginaPrincipal"


function App() {
  

  return (
    <>
    <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700;800&display=swap" rel="stylesheet"></link>
      <Routes>

          <Route path="/" element={<PaginaPrincipal />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          
      </Routes>
    </>
  )
}

export default App
