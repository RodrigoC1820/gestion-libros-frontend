import { Login, MenuBook } from '@mui/icons-material'
import { AppBar, Box, Button, Container, Toolbar, Typography } from '@mui/material'
import { useNavigate } from 'react-router-dom'

function PublicHeader() {
  const navigate = useNavigate()

  return (
    <AppBar position="static" elevation={0}>
      <Container maxWidth="lg">
        <Toolbar disableGutters>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 1,
              cursor: 'pointer',
            }}
            onClick={() => navigate('/catalogo')}
          >
            <MenuBook />

            <Typography variant="h6" fontWeight="bold">
              Biblioteca Digital
            </Typography>
          </Box>

          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 1,
              ml: 'auto',
            }}
          >
            <Button color="inherit" onClick={() => navigate('/catalogo')}>
              Catálogo
            </Button>

            <Button color="inherit" onClick={() => navigate('/categorias')}>
              Categorías
            </Button>

            <Button
              color="inherit"
              startIcon={<Login />}
              onClick={() => navigate('/login')}
            >
              Iniciar sesión
            </Button>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  )
}

export default PublicHeader