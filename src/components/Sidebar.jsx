import {
  Dashboard,
  MenuBook,
  People,
} from '@mui/icons-material'
import {
  Box,
  Divider,
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
} from '@mui/material'
import { useLocation, useNavigate } from 'react-router-dom'

const drawerWidth = 240

const opciones = [
  {
    texto: 'Dashboard',
    icono: <Dashboard />,
    ruta: '/admin/dashboard',
  },
  {
    texto: 'Autores',
    icono: <People />,
    ruta: '/admin/autores',
  },
  {
    texto: 'Libros',
    icono: <MenuBook />,
    ruta: '/admin/libros',
  },
]

function Sidebar() {
  const navigate = useNavigate()
  const location = useLocation()

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: drawerWidth,
          boxSizing: 'border-box',
        },
      }}
    >
      <Toolbar>
        <Box>
          <Typography fontWeight="bold" variant="h6">
            Gestión de Libros
          </Typography>

          <Typography color="text.secondary" variant="caption">
            Panel administrativo
          </Typography>
        </Box>
      </Toolbar>

      <Divider />

      <List>
        {opciones.map((opcion) => (
          <ListItemButton
            key={opcion.ruta}
            selected={location.pathname === opcion.ruta}
            onClick={() => navigate(opcion.ruta)}
          >
            <ListItemIcon>
              {opcion.icono}
            </ListItemIcon>

            <ListItemText primary={opcion.texto} />
          </ListItemButton>
        ))}
      </List>
    </Drawer>
  )
}

export default Sidebar