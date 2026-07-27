import {
  Alert,
  Box,
  CircularProgress,
  Container,
  Paper,
  Typography,
} from '@mui/material'
import { useEffect, useMemo, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'

import BuscadorLibros from '../components/libros/BuscadorLibros'
import LibroCard from '../components/libros/LibroCard'
import PublicHeader from '../components/PublicHeader'
import { obtenerLibros } from '../services/libroService'

function LibrosPublicPage() {
  const navigate = useNavigate()
  const [searchParams, setSearchParams] = useSearchParams()

  const [libros, setLibros] = useState([])
  const [cargando, setCargando] = useState(true)
  const [error, setError] = useState('')

  const busquedaInicial = searchParams.get('search') || ''
  const generoSeleccionado = searchParams.get('genero') || ''

  const [busqueda, setBusqueda] = useState(busquedaInicial)

  useEffect(() => {
    const cargarLibros = async () => {
      try {
        setCargando(true)
        setError('')

        const parametros = {}

        if (busquedaInicial) {
          parametros.search = busquedaInicial
        }

        if (generoSeleccionado) {
          parametros.genero = generoSeleccionado
        }

        const datos = await obtenerLibros(parametros)

        if (Array.isArray(datos)) {
          setLibros(datos)
        } else if (Array.isArray(datos?.results)) {
          setLibros(datos.results)
        } else {
          setLibros([])
        }
      } catch (errorPeticion) {
        console.error(
          'Error al cargar los libros:',
          errorPeticion,
        )

        setError(
          'No se pudieron cargar los libros. '
          + 'Verifica que el backend esté encendido.',
        )
      } finally {
        setCargando(false)
      }
    }

    cargarLibros()
  }, [busquedaInicial, generoSeleccionado])

  const librosMostrados = useMemo(() => {
    return libros
  }, [libros])

  const handleBuscar = (texto) => {
    const textoLimpio = texto.trim()

    setBusqueda(textoLimpio)

    const nuevosParametros = {}

    if (textoLimpio) {
      nuevosParametros.search = textoLimpio
    }

    if (generoSeleccionado) {
      nuevosParametros.genero = generoSeleccionado
    }

    setSearchParams(nuevosParametros)
  }

  const handleVerDetalle = (id) => {
    navigate(`/libros/${id}`)
  }

  return (
    <Box
      sx={{
        minHeight: '100vh',
        backgroundColor: 'background.default',
      }}
    >
      <PublicHeader />

      <Container
        maxWidth="lg"
        sx={{
          py: 6,
        }}
      >
        <Typography
          variant="h3"
          fontWeight="bold"
        >
          Libros
        </Typography>

        <Typography
          color="text.secondary"
          sx={{
            mt: 2,
            mb: 4,
          }}
        >
          Explora los libros disponibles en nuestra biblioteca digital.
        </Typography>

        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            mb: 5,
          }}
        >
          <BuscadorLibros
            onBuscar={handleBuscar}
            valorInicial={busqueda}
          />
        </Box>

        {generoSeleccionado && (
          <Alert
            severity="info"
            sx={{
              mb: 3,
            }}
          >
            Mostrando libros del género: {generoSeleccionado}
          </Alert>
        )}

        {cargando && (
          <Box
            sx={{
              py: 8,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 2,
            }}
          >
            <CircularProgress />

            <Typography color="text.secondary">
              Cargando libros...
            </Typography>
          </Box>
        )}

        {!cargando && error && (
          <Alert severity="error">
            {error}
          </Alert>
        )}

        {!cargando && !error && librosMostrados.length > 0 && (
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: {
                xs: '1fr',
                sm: 'repeat(2, 1fr)',
                md: 'repeat(3, 1fr)',
                lg: 'repeat(4, 1fr)',
              },
              gap: 3,
            }}
          >
            {librosMostrados.map((libro) => (
              <LibroCard
                key={libro.id}
                libro={libro}
                onVerDetalle={handleVerDetalle}
              />
            ))}
          </Box>
        )}

        {!cargando
          && !error
          && librosMostrados.length === 0 && (
            <Paper
              elevation={0}
              sx={{
                py: 7,
                px: 3,
                textAlign: 'center',
                border: '1px dashed',
                borderColor: 'primary.light',
              }}
            >
              <Typography variant="h5">
                No se encontraron libros
              </Typography>

              <Typography
                color="text.secondary"
                sx={{ mt: 1 }}
              >
                Prueba con otro título, autor, ISBN o género.
              </Typography>
            </Paper>
          )}
      </Container>
    </Box>
  )
}

export default LibrosPublicPage