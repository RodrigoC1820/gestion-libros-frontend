import { AutoStories } from '@mui/icons-material'

import {
  Alert,
  Box,
  Card,
  CardActionArea,
  CardContent,
  CircularProgress,
  Container,
  Typography,
} from '@mui/material'

import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import PublicHeader from '../components/PublicHeader'
import { obtenerCategorias } from '../services/categoriaService'

const API_URL = (
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

  return `${API_URL}${rutaNormalizada}`
}

function obtenerNombreCategoria(categoria) {
  if (typeof categoria === 'string') {
    return categoria
  }

  return categoria?.nombre || categoria?.genero || ''
}

function obtenerImagenCategoria(categoria) {
  if (typeof categoria === 'string') {
    return null
  }

  return categoria?.imagen || categoria?.foto || null
}

function obtenerIdCategoria(categoria, indice) {
  if (typeof categoria === 'string') {
    return categoria
  }

  return categoria?.id || categoria?.nombre || indice
}

function CategoriasPage() {
  const navigate = useNavigate()

  const [categorias, setCategorias] = useState([])
  const [cargando, setCargando] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const cargarCategorias = async () => {
      try {
        setCargando(true)
        setError('')

        const datos = await obtenerCategorias()

        if (Array.isArray(datos)) {
          setCategorias(datos)
        } else if (Array.isArray(datos?.results)) {
          setCategorias(datos.results)
        } else {
          setCategorias([])
        }
      } catch (errorPeticion) {
        console.error(
          'Error al cargar las categorías:',
          errorPeticion,
        )

        setError(
          'No se pudieron cargar las categorías. '
          + 'Verifica que el backend esté encendido.',
        )
      } finally {
        setCargando(false)
      }
    }

    cargarCategorias()
  }, [])

  const abrirCategoria = (categoria) => {
    const nombreCategoria = obtenerNombreCategoria(categoria)

    navigate(
      `/libros?genero=${encodeURIComponent(nombreCategoria)}`,
    )
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
          Categorías
        </Typography>

        <Typography
          color="text.secondary"
          sx={{
            mt: 2,
            mb: 5,
          }}
        >
          Explora los libros disponibles según el género que prefieras.
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
              Cargando categorías...
            </Typography>
          </Box>
        )}

        {!cargando && error && (
          <Alert severity="error">
            {error}
          </Alert>
        )}

        {!cargando && !error && categorias.length > 0 && (
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
            {categorias.map((categoria, indice) => {
              const nombreCategoria =
                obtenerNombreCategoria(categoria)

              const imagenCategoria =
                obtenerImagenCategoria(categoria)

              const urlImagen =
                construirUrlImagen(imagenCategoria)

              return (
                <Card
                  key={obtenerIdCategoria(categoria, indice)}
                  elevation={2}
                  sx={{
                    height: '100%',
                    borderRadius: 3,
                    overflow: 'hidden',
                    transition:
                      'transform 0.25s ease, '
                      + 'box-shadow 0.25s ease',
                    '&:hover': {
                      transform: 'translateY(-6px)',
                      boxShadow: 6,
                    },
                  }}
                >
                  <CardActionArea
                    onClick={() => abrirCategoria(categoria)}
                    sx={{
                      height: '100%',
                    }}
                  >
                    <Box
                      sx={{
                        height: 170,
                        overflow: 'hidden',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'white',
                        background:
                          'linear-gradient('
                          + '135deg, '
                          + '#6D4C41 0%, '
                          + '#A1887F 100%'
                          + ')',
                      }}
                    >
                      {urlImagen ? (
                        <Box
                          component="img"
                          src={urlImagen}
                          alt={`Imagen de la categoría ${nombreCategoria}`}
                          onError={(event) => {
                            event.currentTarget.style.display = 'none'
                          }}
                          sx={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover',
                            transition: 'transform 0.3s ease',
                            '.MuiCardActionArea-root:hover &': {
                              transform: 'scale(1.06)',
                            },
                          }}
                        />
                      ) : (
                        <Box
                          sx={{
                            width: 84,
                            height: 84,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            borderRadius: '50%',
                            backgroundColor:
                              'rgba(255, 255, 255, 0.16)',
                            border:
                              '1px solid rgba(255, 255, 255, 0.35)',
                          }}
                        >
                          <AutoStories sx={{ fontSize: 46 }} />
                        </Box>
                      )}
                    </Box>

                    <CardContent
                      sx={{
                        p: 3,
                        minHeight: 135,
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                        textAlign: 'center',
                        gap: 1,
                      }}
                    >
                      <Typography
                        variant="h5"
                        fontWeight="bold"
                      >
                        {nombreCategoria}
                      </Typography>

                      <Typography color="text.secondary">
                        Ver libros de esta categoría
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                </Card>
              )
            })}
          </Box>
        )}

        {!cargando && !error && categorias.length === 0 && (
          <Alert severity="info">
            Todavía no existen categorías para mostrar.
          </Alert>
        )}
      </Container>
    </Box>
  )
}

export default CategoriasPage