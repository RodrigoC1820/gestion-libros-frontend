import { Logout } from '@mui/icons-material'
import {
  AppBar,
  Button,
  Toolbar,
  Typography,
} from '@mui/material'

const drawerWidth = 240

function Header() {
  const handleLogout = () => {
    console.log('Cerrar sesión')
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