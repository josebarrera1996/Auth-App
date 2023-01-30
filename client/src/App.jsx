import { createBrowserRouter, RouterProvider } from 'react-router-dom';
// Componentes
import Username from './components/Username';
import Password from './components/Password';
import Register from './components/Register';
import Profile from './components/Profile';
import Recovery from './components/Recovery';
import Reset from './components/Reset';
import PageNotFound from './components/PageNotFound';

// Definiendo las rutas
const router = createBrowserRouter([
  {
    path: '/', // Ruta de inicio
    element: <Username></Username>
  },
  {
    path: '/register',
    element: <Register></Register>
  },
  {
    path: '/password',
    element: <Password></Password>
  },
  {
    path: '/profile',
    element: <Profile></Profile>
  },
  {
    path: '/recovery',
    element: <Recovery></Recovery>
  },
  {
    path: '/reset',
    element: <Reset></Reset>
  },
  {
    path: '*', // En caso de ruta no definida, mostrar este componente
    element: <PageNotFound></PageNotFound>
  }
]);

// Componente principal
// En este se alojarán todas las rutas
export default function App() {

  return (
    <main>
      <RouterProvider router={router}></RouterProvider>
    </main>
  )
}
