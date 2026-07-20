import { useEffect, useState } from 'react'
import {
  Book,
  MenuBook,
  People,
} from '@mui/icons-material'
import {
  Alert,
  Box,
  Card,
  CardContent,
  CircularProgress,
  Grid,
  Typography,
} from '@mui/material'

import { obtenerAutores } from '../services/autorService'
import { obtenerLibros } from '../services/libroService'

function DashboardPage() {
  const [totalLibros, setTotalLibros] = useState(0)
  const [totalAutores, setTotalAutores] = useState(0)
  const [librosDisponibles, setLibrosDisponibles] =
    useState(0)

  const [cargando, setCargando] = useState(true)
  const [error, setError] = useState('')

  const cargarResumen = async () => {
    try {
      setCargando(true)
      setError('')

      const [
        respuestaAutores,
        respuestaLibros,
      ] = await Promise.all([
        obtenerAutores(),
        obtenerLibros(),
      ])

      const listaAutores = Array.isArray(respuestaAutores)
        ? respuestaAutores
        : respuestaAutores.results || []

      const listaLibros = Array.isArray(respuestaLibros)
        ? respuestaLibros
        : respuestaLibros.results || []

      const disponibles = listaLibros.filter(
        (libro) => libro.disponible
      )

      setTotalAutores(listaAutores.length)
      setTotalLibros(listaLibros.length)
      setLibrosDisponibles(disponibles.length)
    } catch (errorPeticion) {
      console.error(
        'Error al cargar el resumen del dashboard:',
        errorPeticion
      )

      setError(
        'No fue posible cargar la información del dashboard.'
      )
    } finally {
      setCargando(false)
    }
  }

  useEffect(() => {
    cargarResumen()
  }, [])

  const tarjetas = [
    {
      titulo: 'Total de libros',
      valor: totalLibros,
      icono: (
        <MenuBook
          fontSize="large"
          color="primary"
        />
      ),
    },
    {
      titulo: 'Total de autores',
      valor: totalAutores,
      icono: (
        <People
          fontSize="large"
          color="primary"
        />
      ),
    },
    {
      titulo: 'Libros disponibles',
      valor: librosDisponibles,
      icono: (
        <Book
          fontSize="large"
          color="primary"
        />
      ),
    },
  ]

  return (
    <Box>
      <Typography
        variant="h4"
        fontWeight="bold"
        gutterBottom
      >
        Dashboard
      </Typography>

      <Typography
        color="text.secondary"
        sx={{ mb: 3 }}
      >
        Resumen general del sistema de gestión de libros.
      </Typography>

      {error && (
        <Alert
          severity="error"
          sx={{ mb: 3 }}
        >
          {error}
        </Alert>
      )}

      {cargando ? (
        <Box
          sx={{
            minHeight: 180,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'column',
            gap: 2,
          }}
        >
          <CircularProgress />

          <Typography color="text.secondary">
            Cargando resumen...
          </Typography>
        </Box>
      ) : (
        <Grid container spacing={3}>
          {tarjetas.map((tarjeta) => (
            <Grid
              key={tarjeta.titulo}
              size={{
                xs: 12,
                sm: 6,
                md: 4,
              }}
            >
              <Card>
                <CardContent
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  }}
                >
                  <Box>
                    <Typography color="text.secondary">
                      {tarjeta.titulo}
                    </Typography>

                    <Typography
                      variant="h4"
                      fontWeight="bold"
                    >
                      {tarjeta.valor}
                    </Typography>
                  </Box>

                  {tarjeta.icono}
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  )
}

export default DashboardPage