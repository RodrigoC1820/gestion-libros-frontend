import { Add } from '@mui/icons-material'
import {
  Box,
  Button,
  Paper,
  Typography,
} from '@mui/material'

function LibrosPage() {
  const handleCrearLibro = () => {
    console.log('Crear libro')
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
            Libros
          </Typography>

          <Typography color="text.secondary">
            Administración de los libros registrados en el sistema.
          </Typography>
        </Box>

        <Button
          variant="contained"
          startIcon={<Add />}
          onClick={handleCrearLibro}
        >
          Nuevo libro
        </Button>
      </Box>

      <Paper
        sx={{
          p: 3,
          textAlign: 'center',
        }}
      >
        <Typography color="text.secondary">
          Todavía no se han cargado los libros.
        </Typography>
      </Paper>
    </Box>
  )
}

export default LibrosPage