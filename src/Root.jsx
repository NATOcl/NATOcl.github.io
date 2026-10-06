// Root.jsx
import { Outlet } from 'react-router-dom';
import { Navbar } from './components/Navbar.jsx';   
import Footer from './components/Footer.jsx';   

export function Root() {
  return (
    <div className="app">
      <Navbar />      
      <main>
        <Outlet />
      </main>

      <Footer />
    </div>
  );
}