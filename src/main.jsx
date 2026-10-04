// main.jsx
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider  } from "react-router-dom";
import { Root } from './Root.jsx'
import { Home } from './pages/Home'
import { Nosotros } from "./pages/Nosotros";
import { Contacto} from "./pages/Contacto.jsx";
import { Login} from "./pages/Login.jsx";

import 'bootstrap/dist/css/bootstrap.min.css'
import './index.css'
import {UserProfile} from "./pages/UserProfile.jsx";

const router = createBrowserRouter([
    {
        path: '/',
        element: <Root />,
        children: [
            {index: true,element: <Home/>},
            {path: 'nosotros',element: <Nosotros/>},
            {path: 'contacto', element: <Contacto/>},
            {path: 'login', element: <Login/>},
            {path: 'users/:userId',element: <UserProfile />},
        ],
    },
])

createRoot(document.getElementById('root')).render(
    <RouterProvider router={router} />
)