import {
  ArrowBack,
  AutoStories,
} from '@mui/icons-material'

import {
  Alert,
  Box,
  Button,
  Chip,
  CircularProgress,
  Container,
  Divider,
  Paper,
  Typography,
} from '@mui/material'

import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

import PublicHeader from '../components/PublicHeader'
import { obtenerLibroPorId } from '../services/libroService'

const API_BASE_URL = (
  import.meta.env.VITE_API_URL
  || 'http://127.0.0.1:8000/api'
).replace(/\/api\/?$/, '')

function construirUrlImagen(ruta) {
  if (!ruta) {
    return null
  }

  if (
    ruta.startsWith('http://')
    || ruta.startsWith('https://')
  ) {
    return ruta
  }

  const rutaNormalizada = ruta.startsWith('/')
    ? ruta
    : `/${ruta}`

  return `${API_BASE_URL}${rutaNormalizada}`
}

function LibroDetallePage() {
  const navigate = useNavigate()
  const { id } = useParams()

  const [libro, setLibro] = useState(null)
  const [cargando, setCargando] = useState(true)
  const [error, setError] = useState('')
  const [errorPortada, setErrorPortada] = useState(false)

  useEffect(() => {
    const cargarLibro = async () => {
      try {
        setCargando(true)
        setError('')
        setErrorPortada(false)

        const datos = await obtenerLibroPorId(id)
        setLibro(datos)
      } catch (errorPeticion) {
        console.error(
          'Error al cargar el detalle del libro:',
          errorPeticion,
        )

        if (errorPeticion.response?.status === 404) {
          setError('El libro solicitado no existe.')
        } else {
          setError(
            'No se pudo cargar el detalle del libro. '
            + 'Verifica que el backend esté encendido.',
          )
        }
      } finally {
        setCargando(false)
      }
    }

    cargarLibro()
  }, [id])

  const formatearFecha = (fecha) => {
    if (!fecha) {
      return 'No disponible'
    }

    return new Intl.DateTimeFormat('es-EC', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }).format(new Date(`${fecha}T00:00:00`))
  }

  const portadaLibro = construirUrlImagen(libro?.portada)

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
        <Button
          startIcon={<ArrowBack />}
          onClick={() => navigate(-1)}
          sx={{
            mb: 4,
          }}
        >
          Volver
        </Button>

        {cargando && (
          <Box
            sx={{
              py: 10,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 2,
            }}
          >
            <CircularProgress />

            <Typography color="text.secondary">
              Cargando detalle del libro...
            </Typography>
          </Box>
        )}

        {!cargando && error && (
          <Alert severity="error">
            {error}
          </Alert>
        )}

        {!cargando && !error && libro && (
          <Paper
            elevation={3}
            sx={{
              overflow: 'hidden',
              borderRadius: 4,
            }}
          >
            <Box
              sx={{
                display: 'grid',
                gridTemplateColumns: {
                  xs: '1fr',
                  md: '360px 1fr',
                },
              }}
            >
              <Box
                sx={{
                  minHeight: {
                    xs: 320,
                    md: 560,
                  },
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  p: 3,
                  background:
                    'linear-gradient(135deg, #5D4037 0%, #8D6E63 100%)',
                }}
              >
                {portadaLibro && !errorPortada ? (
                  <Box
                    component="img"
                    src={portadaLibro}
                    alt={`Portada de ${libro.titulo}`}
                    onError={() => setErrorPortada(true)}
                    sx={{
                      width: {
                        xs: 200,
                        sm: 230,
                        md: 250,
                      },
                      maxWidth: '100%',
                      maxHeight: {
                        xs: 300,
                        md: 430,
                      },
                      objectFit: 'cover',
                      borderRadius: '8px 20px 20px 8px',
                      border:
                        '1px solid rgba(255,255,255,0.35)',
                      boxShadow:
                        '16px 16px 30px rgba(0,0,0,0.28)',
                    }}
                  />
                ) : (
                  <Box
                    sx={{
                      width: 180,
                      height: 250,
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      borderRadius: '8px 20px 20px 8px',
                      color: 'white',
                      border:
                        '1px solid rgba(255,255,255,0.35)',
                      backgroundColor:
                        'rgba(255,255,255,0.14)',
                      boxShadow:
                        '16px 16px 30px rgba(0,0,0,0.22)',
                    }}
                  >
                    <AutoStories sx={{ fontSize: 100 }} />
                  </Box>
                )}
              </Box>

              <Box
                sx={{
                  p: {
                    xs: 3,
                    md: 5,
                  },
                }}
              >
                <Typography
                  variant="h3"
                  fontWeight="bold"
                  sx={{
                    lineHeight: 1.15,
                  }}
                >
                  {libro.titulo}
                </Typography>

                <Typography
                  variant="h6"
                  color="text.secondary"
                  sx={{
                    mt: 2,
                  }}
                >
                  {libro.autor_nombre || 'Autor no disponible'}
                </Typography>

                <Box
                  sx={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    gap: 1,
                    mt: 3,
                  }}
                >
                  <Chip
                    label={libro.genero || 'Sin género'}
                    variant="outlined"
                  />

                  <Chip
                    label={
                      libro.disponible
                        ? 'Disponible'
                        : 'No disponible'
                    }
                    color={
                      libro.disponible
                        ? 'success'
                        : 'default'
                    }
                  />
                </Box>

                <Divider
                  sx={{
                    my: 4,
                  }}
                />

                <Box
                  sx={{
                    display: 'grid',
                    gridTemplateColumns: {
                      xs: '1fr',
                      sm: 'repeat(2, 1fr)',
                    },
                    gap: 3,
                  }}
                >
                  <Box>
                    <Typography
                      variant="subtitle2"
                      color="text.secondary"
                    >
                      ISBN
                    </Typography>

                    <Typography fontWeight="medium">
                      {libro.isbn || 'No disponible'}
                    </Typography>
                  </Box>

                  <Box>
                    <Typography
                      variant="subtitle2"
                      color="text.secondary"
                    >
                      Idioma
                    </Typography>

                    <Typography fontWeight="medium">
                      {libro.idioma || 'No disponible'}
                    </Typography>
                  </Box>

                  <Box>
                    <Typography
                      variant="subtitle2"
                      color="text.secondary"
                    >
                      Fecha de publicación
                    </Typography>

                    <Typography fontWeight="medium">
                      {formatearFecha(libro.fecha_publicacion)}
                    </Typography>
                  </Box>

                  <Box>
                    <Typography
                      variant="subtitle2"
                      color="text.secondary"
                    >
                      Número de páginas
                    </Typography>

                    <Typography fontWeight="medium">
                      {libro.numero_paginas
                        ? `${libro.numero_paginas} páginas`
                        : 'No disponible'}
                    </Typography>
                  </Box>
                </Box>

                <Divider
                  sx={{
                    my: 4,
                  }}
                />

                <Typography
                  variant="h5"
                  fontWeight="bold"
                  sx={{
                    mb: 2,
                  }}
                >
                  Información del libro
                </Typography>

                <Typography
                  color="text.secondary"
                  sx={{
                    lineHeight: 1.8,
                  }}
                >
                  Este libro pertenece al género{' '}
                  <strong>
                    {libro.genero || 'no especificado'}
                  </strong>
                  {' '}y fue escrito por{' '}
                  <strong>
                    {libro.autor_nombre
                      || 'un autor no disponible'}
                  </strong>
                  . Actualmente se encuentra{' '}
                  <strong>
                    {libro.disponible
                      ? 'disponible'
                      : 'no disponible'}
                  </strong>
                  {' '}en la biblioteca digital.
                </Typography>

                <Box
                  sx={{
                    mt: 4,
                    display: 'flex',
                    gap: 2,
                    flexWrap: 'wrap',
                  }}
                >
                  <Button
                    variant="contained"
                    onClick={() => navigate('/libros')}
                  >
                    Ver todos los libros
                  </Button>

                  <Button
                    variant="outlined"
                    onClick={() => navigate('/autores')}
                  >
                    Ver autores
                  </Button>
                </Box>
              </Box>
            </Box>
          </Paper>
        )}
      </Container>
    </Box>
  )
}

export default LibroDetallePage