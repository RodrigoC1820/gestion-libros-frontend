import { Logout } from '@mui/icons-material'
import {
  AppBar,
  Button,
  Toolbar,
  Typography,
} from '@mui/material'
import { useNavigate } from 'react-router-dom'

import { useAuth } from '../context/AuthContext'

const drawerWidth = 240

function Header() {
  const navigate = useNavigate()
  const { cerrarSesion } = useAuth()

  const handleLogout = () => {
    cerrarSesion()
    navigate('/login')
  }

  return (
    <AppBar
      position="fixed"
      sx={{
        width: `calc(100% - ${drawerWidth}px)`,
        ml: `${drawerWidth}px`,
      }}
    >
      <Toolbar>
        <Typography
          component="div"
          sx={{ flexGrow: 1 }}
          variant="h6"
        >
          Sistema de administración
        </Typography>

        <Button
          color="inherit"
          startIcon={<Logout />}
          onClick={handleLogout}
        >
          Cerrar sesión
        </Button>
      </Toolbar>
    </AppBar>
  )
}

export default Header