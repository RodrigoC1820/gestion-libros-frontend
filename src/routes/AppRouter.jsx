import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from 'react-router-dom'

import DashboardLayout from '../layouts/DashboardLayout'
import AutoresPage from '../pages/AutoresPage'
import DashboardPage from '../pages/DashboardPage'
import LibrosPage from '../pages/LibrosPage'
import LoginPage from '../pages/LoginPage'
import ProtectedRoute from './ProtectedRoute'

const router = createBrowserRouter([
  {
    path: '/login',
    element: <LoginPage />,
  },
  {
    path: '/',
    element: (
      <ProtectedRoute>
        <DashboardLayout />
      </ProtectedRoute>
    ),
    children: [
      {
        index: true,
        element: <Navigate to="/dashboard" replace />,
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
])

function AppRouter() {
  return <RouterProvider router={router} />
}

export default AppRouter