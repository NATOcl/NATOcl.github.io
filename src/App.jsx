//
// SOLO ES UN EJEMPLO DEBE SER BORRADO, SE UTILIZO PARA SABER SI REACT/ROUTER FUNCIONABAN
//
//
import { HashRouter, Routes, Route, Link } from 'react-router-dom'
import { Login } from './pages/Login'

function Home() {
  return (
    <div className="p-5 mb-4 bg-light rounded-3 text-center">
      <h1 className="display-5 fw-bold text-primary">NATOcl</h1>
      <p className="fs-5">Vite + React + Bootstrap + Router funcionando correctamente.</p>
      <Link to="/acerca" className="btn btn-primary btn-lg">Ir a Acerca de</Link>
    </div>
  )
}

function Acerca() {
  return (
    <div className="card shadow-sm p-4">
      <h2 className="text-secondary">Acerca de este proyecto</h2>
      <p>Esta es una segunda ruta renderizada con React Router.</p>
      <Link to="/" className="btn btn-outline-secondary">Volver al inicio</Link>
    </div>
  )
}

export default function App() {
  return (
    <HashRouter>
      <nav className="navbar navbar-dark bg-dark mb-4 px-3">
        <div className="container">
          <Link className="navbar-brand" to="/">Mi Sitio</Link>
          <div className="d-flex gap-2">
            <Link className="nav-link text-white" to="/">Inicio</Link>
            <Link className="nav-link text-white" to="/acerca">Acerca</Link>
          </div>
        </div>
      </nav>

      <div className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/acerca" element={<Acerca />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </div>
    </HashRouter>
  )
}