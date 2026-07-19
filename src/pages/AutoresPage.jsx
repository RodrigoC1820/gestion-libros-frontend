import {
  Box,
  Button,
  Paper,
  Typography,
} from '@mui/material'
import { Add } from '@mui/icons-material'

function AutoresPage() {
  const handleCrearAutor = () => {
    console.log('Crear autor')
  }

  return (
    <Box>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          mb: 3,
        }}
      >
        <Box>
          <Typography variant="h4" fontWeight="bold" gutterBottom>
            Autores
          </Typography>

          <Typography color="text.secondary">
            Administración de los autores registrados en el sistema.
          </Typography>
        </Box>

        <Button
          variant="contained"
          startIcon={<Add />}
          onClick={handleCrearAutor}
        >
          Nuevo autor
        </Button>
      </Box>

      <Paper
        sx={{
          p: 3,
          textAlign: 'center',
        }}
      >
        <Typography color="text.secondary">
          Todavía no se han cargado los autores.
        </Typography>
      </Paper>
    </Box>
  )
}

export default AutoresPage