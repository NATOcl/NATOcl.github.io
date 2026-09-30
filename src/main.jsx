// main.jsx
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Root } from './Root';
import { HomePage } from './pages/HomePage';
import { UserProfile } from './pages/UserProfile';
 
const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    children: [
      { index: true, element: <HomePage /> },
      { path: 'users/:userId', element: <UserProfile /> },
    ],
  },
]);
 
createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />
);