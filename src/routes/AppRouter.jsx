import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from 'react-router-dom'

import DashboardLayout from '../layouts/DashboardLayout'
import AutoresPage from '../pages/AutoresPage'
import AutoresPublicPage from '../pages/AutoresPublicPage'
import CatalogoPage from '../pages/CatalogoPage'
import DashboardPage from '../pages/DashboardPage'
import LibrosPage from '../pages/LibrosPage'
import LibrosPublicPage from '../pages/LibrosPublicPage'
import LoginPage from '../pages/LoginPage'
import ProtectedRoute from './ProtectedRoute'
import LibroDetallePage from '../pages/LibroDetallePage'
import CategoriasPage from '../pages/CategoriasPage'
import AutorDetallePage from '../pages/AutorDetallePage'

const router = createBrowserRouter([
  {
    path: '/login',
    element: <LoginPage />,
  },
  {
    path: '/',
    element: <Navigate to="/catalogo" replace />,
  },
  {
    path: '/catalogo',
    element: <CatalogoPage />,
  },
  {
    path: '/libros',
    element: <LibrosPublicPage />,
  },
  {
    path: '/autores',
    element: <AutoresPublicPage />,
  },
  {
  path: '/autores/:id',
  element: <AutorDetallePage />,
  },
  {
  path: '/categorias',
  element: <CategoriasPage />,
  },
  {
  path: '/libros/:id',
  element: <LibroDetallePage />,
  },
  {
    path: '/favoritos',
    element: <div>Favoritos en construcción</div>,
  },
  {
    path: '/historial',
    element: <div>Historial en construcción</div>,
  },
  {
    path: '/admin',
    element: (
      <ProtectedRoute>
        <DashboardLayout />
      </ProtectedRoute>
    ),
    children: [
      {
        index: true,
        element: <Navigate to="/admin/dashboard" replace />,
      },
      {
        path: 'dashboard',
        element: <DashboardPage />,
      },
      {
        path: 'autores',
        element: <AutoresPage />,
      },
      {
        path: 'libros',
        element: <LibrosPage />,
      },
    ],
  },
  {
    path: '*',
    element: <Navigate to="/catalogo" replace />,
  },
])

function AppRouter() {
  return <RouterProvider router={router} />
}

export default AppRouter