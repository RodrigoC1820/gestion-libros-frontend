import {
  ArrowBack,
  AutoStories,
} from '@mui/icons-material'

import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
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
import { obtenerAutorPorId } from '../services/autorService'
import { obtenerLibros } from '../services/libroService'

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

function AutorDetallePage() {
  const navigate = useNavigate()
  const { id } = useParams()

  const [autor, setAutor] = useState(null)
  const [librosAutor, setLibrosAutor] = useState([])
  const [cargando, setCargando] = useState(true)
  const [error, setError] = useState('')
  const [errorFoto, setErrorFoto] = useState(false)

  useEffect(() => {
    const cargarDetalleAutor = async () => {
      try {
        setCargando(true)
        setError('')
        setErrorFoto(false)

        const [datosAutor, datosLibros] = await Promise.all([
          obtenerAutorPorId(id),
          obtenerLibros({ autor: id }),
        ])

        setAutor(datosAutor)

        if (Array.isArray(datosLibros)) {
          setLibrosAutor(datosLibros)
        } else if (Array.isArray(datosLibros?.results)) {
          setLibrosAutor(datosLibros.results)
        } else {
          setLibrosAutor([])
        }
      } catch (errorPeticion) {
        console.error(
          'Error al cargar el detalle del autor:',
          errorPeticion,
        )

        if (errorPeticion.response?.status === 404) {
          setError('El autor solicitado no existe.')
        } else {
          setError(
            'No se pudo cargar el detalle del autor. '
            + 'Verifica que el backend esté encendido.',
          )
        }
      } finally {
        setCargando(false)
      }
    }

    cargarDetalleAutor()
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

  const fotoAutor = construirUrlImagen(autor?.foto)

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
              Cargando información del autor...
            </Typography>
          </Box>
        )}

        {!cargando && error && (
          <Alert severity="error">
            {error}
          </Alert>
        )}

        {!cargando && !error && autor && (
          <>
            <Paper
              elevation={3}
              sx={{
                borderRadius: 4,
                overflow: 'hidden',
                mb: 5,
              }}
            >
              <Box
                sx={{
                  display: 'grid',
                  gridTemplateColumns: {
                    xs: '1fr',
                    md: '320px 1fr',
                  },
                }}
              >
                <Box
                  sx={{
                    minHeight: {
                      xs: 280,
                      md: 430,
                    },
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    p: 3,
                    background:
                      'linear-gradient(135deg, #5D4037 0%, #8D6E63 100%)',
                  }}
                >
                  {fotoAutor && !errorFoto ? (
                    <Box
                      component="img"
                      src={fotoAutor}
                      alt={`${autor.nombre} ${autor.apellido}`}
                      onError={() => setErrorFoto(true)}
                      sx={{
                        width: {
                          xs: 180,
                          sm: 200,
                          md: 220,
                        },
                        height: {
                          xs: 180,
                          sm: 200,
                          md: 220,
                        },
                        borderRadius: '50%',
                        objectFit: 'cover',
                        border:
                          '4px solid rgba(255,255,255,0.50)',
                        boxShadow:
                          '0 12px 30px rgba(0,0,0,0.28)',
                      }}
                    />
                  ) : (
                    <Box
                      sx={{
                        width: 170,
                        height: 170,
                        borderRadius: '50%',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        color: 'white',
                        backgroundColor:
                          'rgba(255,255,255,0.14)',
                        border:
                          '1px solid rgba(255,255,255,0.35)',
                      }}
                    >
                      <Typography
                        variant="h2"
                        fontWeight="bold"
                      >
                        {autor.nombre?.charAt(0)}
                        {autor.apellido?.charAt(0)}
                      </Typography>
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
                  >
                    {autor.nombre} {autor.apellido}
                  </Typography>

                  <Typography
                    variant="h6"
                    color="text.secondary"
                    sx={{
                      mt: 2,
                    }}
                  >
                    {autor.nacionalidad || 'Nacionalidad no disponible'}
                  </Typography>

                  <Box
                    sx={{
                      display: 'flex',
                      gap: 1,
                      flexWrap: 'wrap',
                      mt: 3,
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
                    />

                    <Chip
                      label={`${autor.total_libros ?? librosAutor.length} libro${
                        (autor.total_libros ?? librosAutor.length) === 1
                          ? ''
                          : 's'
                      }`}
                      variant="outlined"
                    />
                  </Box>

                  <Divider sx={{ my: 4 }} />

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
                        Fecha de nacimiento
                      </Typography>

                      <Typography fontWeight="medium">
                        {formatearFecha(autor.fecha_nacimiento)}
                      </Typography>
                    </Box>

                    <Box>
                      <Typography
                        variant="subtitle2"
                        color="text.secondary"
                      >
                        Estado
                      </Typography>

                      <Typography fontWeight="medium">
                        {autor.activo ? 'Activo' : 'Inactivo'}
                      </Typography>
                    </Box>
                  </Box>

                  <Divider sx={{ my: 4 }} />

                  <Typography
                    variant="h5"
                    fontWeight="bold"
                    sx={{
                      mb: 2,
                    }}
                  >
                    Biografía
                  </Typography>

                  <Typography
                    color="text.secondary"
                    sx={{
                      lineHeight: 1.8,
                    }}
                  >
                    {autor.biografia || 'Biografía no disponible.'}
                  </Typography>
                </Box>
              </Box>
            </Paper>

            <Box>
              <Typography
                variant="h4"
                fontWeight="bold"
                sx={{
                  mb: 3,
                }}
              >
                Libros del autor
              </Typography>

              {librosAutor.length > 0 ? (
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
                  {librosAutor.map((libro) => (
                    <Card
                      key={libro.id}
                      elevation={2}
                      sx={{
                        height: '100%',
                        borderRadius: 3,
                      }}
                    >
                      <CardContent>
                        <Box
                          sx={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: 2,
                            mb: 2,
                          }}
                        >
                          <AutoStories color="primary" />

                          <Typography
                            variant="h6"
                            fontWeight="bold"
                          >
                            {libro.titulo}
                          </Typography>
                        </Box>

                        <Typography color="text.secondary">
                          {libro.genero || 'Sin género'}
                        </Typography>

                        <Typography
                          color="text.secondary"
                          sx={{
                            mt: 1,
                          }}
                        >
                          {libro.numero_paginas
                            ? `${libro.numero_paginas} páginas`
                            : 'Número de páginas no disponible'}
                        </Typography>

                        <Button
                          variant="contained"
                          fullWidth
                          sx={{
                            mt: 3,
                          }}
                          onClick={() =>
                            navigate(`/libros/${libro.id}`)
                          }
                        >
                          Ver libro
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </Box>
              ) : (
                <Alert severity="info">
                  Este autor todavía no tiene libros registrados.
                </Alert>
              )}
            </Box>
          </>
        )}
      </Container>
    </Box>
  )
}

export default AutorDetallePage