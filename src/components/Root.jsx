// Root.jsx
import { Outlet } from 'react-router-dom';
import { Navbar } from './Navbar.jsx';   
import Footer from './Footer.jsx';   

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