import {
  Alert,
  Box,
  Card,
  CardContent,
  Chip,
  CircularProgress,
  Container,
  Typography,
} from '@mui/material'
import { useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import PublicHeader from '../components/PublicHeader'
import { obtenerAutores } from '../services/autorService'

function AutoresPublicPage() {
  const navigate = useNavigate()

  const [autores, setAutores] = useState([])
  const [cargando, setCargando] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const cargarAutores = async () => {
      try {
        setCargando(true)
        setError('')

        const datos = await obtenerAutores()

        if (Array.isArray(datos)) {
          setAutores(datos)
        } else if (Array.isArray(datos?.results)) {
          setAutores(datos.results)
        } else {
          setAutores([])
        }
      } catch (errorPeticion) {
        console.error(
          'Error al cargar autores:',
          errorPeticion,
        )

        setError(
          'No se pudieron cargar los autores. '
          + 'Verifica que el backend esté encendido.',
        )
      } finally {
        setCargando(false)
      }
    }

    cargarAutores()
  }, [])

  const autoresOrdenados = useMemo(() => {
    return [...autores].sort((autorA, autorB) => {
      const apellidoA = autorA.apellido || ''
      const apellidoB = autorB.apellido || ''

      return apellidoA.localeCompare(apellidoB, 'es')
    })
  }, [autores])

  const abrirDetalleAutor = (id) => {
    navigate(`/autores/${id}`)
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
          Autores
        </Typography>

        <Typography
          color="text.secondary"
          sx={{
            mt: 2,
            mb: 5,
          }}
        >
          Conoce a los autores disponibles en nuestra biblioteca digital.
        </Typography>

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
              Cargando autores...
            </Typography>
          </Box>
        )}

        {!cargando && error && (
          <Alert severity="error">
            {error}
          </Alert>
        )}

        {!cargando
          && !error
          && autoresOrdenados.length > 0 && (
            <Box
              sx={{
                display: 'grid',
                gridTemplateColumns: {
                  xs: '1fr',
                  sm: 'repeat(2, 1fr)',
                  md: 'repeat(3, 1fr)',
                },
                gap: 3,
              }}
            >
              {autoresOrdenados.map((autor) => (
                <Card
                  key={autor.id}
                  elevation={2}
                  onClick={() => abrirDetalleAutor(autor.id)}
                  sx={{
                    height: '100%',
                    borderRadius: 3,
                    cursor: 'pointer',
                    transition:
                      'transform 0.25s ease, box-shadow 0.25s ease',
                    '&:hover': {
                      transform: 'translateY(-6px)',
                      boxShadow: 6,
                    },
                  }}
                >
                  <CardContent
                    sx={{
                      p: 3,
                      display: 'flex',
                      flexDirection: 'column',
                      gap: 1.5,
                    }}
                  >
                    <Typography
                      variant="h5"
                      fontWeight="bold"
                    >
                      {autor.nombre} {autor.apellido}
                    </Typography>

                    <Typography color="text.secondary">
                      {autor.nacionalidad
                        || 'Nacionalidad no disponible'}
                    </Typography>

                    <Typography
                      sx={{
                        mt: 1,
                        color: 'text.secondary',
                        lineHeight: 1.6,
                      }}
                    >
                      {autor.biografia
                        || 'Biografía no disponible.'}
                    </Typography>

                    <Box
                      sx={{
                        mt: 2,
                        display: 'flex',
                        gap: 1,
                        flexWrap: 'wrap',
                      }}
                    >
                      <Chip
                        label={
                          autor.activo
                            ? 'Autor activo'
                            : 'Autor inactivo'
                        }
                        color={
                          autor.activo
                            ? 'success'
                            : 'default'
                        }
                        size="small"
                      />

                      <Chip
                        label={`${autor.total_libros ?? 0} libro${
                          (autor.total_libros ?? 0) === 1
                            ? ''
                            : 's'
                        }`}
                        size="small"
                        variant="outlined"
                      />
                    </Box>

                    <Typography
                      color="primary"
                      fontWeight="bold"
                      sx={{
                        mt: 1,
                      }}
                    >
                      Ver detalle del autor
                    </Typography>
                  </CardContent>
                </Card>
              ))}
            </Box>
          )}

        {!cargando
          && !error
          && autoresOrdenados.length === 0 && (
            <Alert severity="info">
              Todavía no existen autores para mostrar.
            </Alert>
          )}
      </Container>
    </Box>
  )
}

export default AutoresPublicPage