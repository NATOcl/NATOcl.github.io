// Root.jsx
import { Outlet, NavLink } from 'react-router-dom';
import Footer from "./components/Footer.jsx";
 
export function Root() {
  return (
    <div className="app">
      <header>
        <nav>
          <NavLink to="/">Inicio</NavLink>
          <NavLink to="/users/1">Perfil</NavLink>
        </nav>
      </header>
 
      <main>
        <Outlet />
      </main>
 
      <Footer />
    </div>
  );
}