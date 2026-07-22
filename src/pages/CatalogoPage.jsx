import { AutoStories, Category, People, Search } from '@mui/icons-material'
import { Box, Button, Container, Paper, Typography } from '@mui/material'
import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import BuscadorLibros from '../components/libros/BuscadorLibros'
import LibroCard from '../components/libros/LibroCard'
import PublicHeader from '../components/PublicHeader'

const librosTemporales = [
  {
    id: 1,
    titulo: 'Introducción a la programación',
    autor_nombre: 'Carlos Ramírez',
    genero: 'Tecnología',
    isbn: '978000000001',
    disponible: true,
  },
  {
    id: 2,
    titulo: 'Historia del Ecuador',
    autor_nombre: 'María Andrade',
    genero: 'Historia',
    isbn: '978000000002',
    disponible: true,
  },
  {
    id: 3,
    titulo: 'Fundamentos de filosofía',
    autor_nombre: 'Luis Herrera',
    genero: 'Filosofía',
    isbn: '978000000003',
    disponible: false,
  },
  {
    id: 4,
    titulo: 'Relatos de una ciudad',
    autor_nombre: 'Ana Torres',
    genero: 'Novela',
    isbn: '978000000004',
    disponible: true,
  },
]

function CatalogoPage() {
  const navigate = useNavigate()
  const [busqueda, setBusqueda] = useState('')

  const librosFiltrados = useMemo(() => {
    const texto = busqueda.toLowerCase().trim()

    if (!texto) {
      return librosTemporales
    }

    return librosTemporales.filter((libro) => {
      const titulo = libro.titulo?.toLowerCase() || ''
      const autor = libro.autor_nombre?.toLowerCase() || ''
      const genero = libro.genero?.toLowerCase() || ''
      const isbn = libro.isbn?.toLowerCase() || ''

      return (
        titulo.includes(texto) ||
        autor.includes(texto) ||
        genero.includes(texto) ||
        isbn.includes(texto)
      )
    })
  }, [busqueda])

  const handleBuscar = (texto) => {
    setBusqueda(texto)
  }

  const handleVerDetalle = (id) => {
    navigate(`/libros/${id}`)
  }

  const opcionesExplorar = [
    {
      titulo: 'Libros',
      descripcion: 'Explora nuestro catálogo de libros disponibles.',
      icono: <AutoStories sx={{ fontSize: 44 }} />,
      ruta: '/catalogo',
    },
    {
      titulo: 'Autores',
      descripcion: 'Conoce a los autores de nuestra biblioteca.',
      icono: <People sx={{ fontSize: 44 }} />,
      ruta: '/autores',
    },
    {
      titulo: 'Categorías',
      descripcion: 'Encuentra libros según el género que prefieras.',
      icono: <Category sx={{ fontSize: 44 }} />,
      ruta: '/categorias',
    },
  ]

  return (
    <Box
      sx={{
        minHeight: '100vh',
        backgroundColor: 'background.default',
      }}
    >
      <PublicHeader />

      <Box
        sx={{
          background: 'linear-gradient(135deg, #5D4037 0%, #8D6E63 100%)',
          color: 'white',
          py: {
            xs: 5,
            md: 7,
          },
        }}
      >
        <Container maxWidth="lg">
          <Box
            sx={{
              maxWidth: 760,
              mx: 'auto',
              textAlign: 'center',
            }}
          >
            <AutoStories
              sx={{
                fontSize: 60,
                mb: 2,
              }}
            />

            <Typography
              variant="h3"
              sx={{
                fontSize: {
                  xs: '2.2rem',
                  md: '3.2rem',
                },
                fontWeight: 700,
              }}
            >
              Biblioteca Digital
            </Typography>

            <Typography
              sx={{
                mt: 2,
                mb: 4,
                fontSize: {
                  xs: '1rem',
                  md: '1.2rem',
                },
                color: 'rgba(255, 255, 255, 0.88)',
              }}
            >
              Descubre nuevas historias, explora diferentes categorías y conoce
              a los autores disponibles en nuestra biblioteca.
            </Typography>

            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
              }}
            >
              <BuscadorLibros onBuscar={handleBuscar} />
            </Box>
          </Box>
        </Container>
      </Box>

      <Container
        maxWidth="lg"
        sx={{
          py: 7,
        }}
      >
        <Box sx={{ textAlign: 'center', mb: 4 }}>
          <Typography variant="h3">
            Explorar
          </Typography>

          <Typography color="text.secondary" sx={{ mt: 1 }}>
            Accede rápidamente a las principales secciones de la biblioteca.
          </Typography>
        </Box>

        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: {
              xs: '1fr',
              md: 'repeat(3, 1fr)',
            },
            gap: 3,
          }}
        >
          {opcionesExplorar.map((opcion) => (
            <Paper
              key={opcion.titulo}
              elevation={1}
              sx={{
                p: 4,
                textAlign: 'center',
                cursor: 'pointer',
                border: '1px solid',
                borderColor: 'rgba(109, 76, 65, 0.15)',
                transition: 'transform 0.25s ease, box-shadow 0.25s ease',
                '&:hover': {
                  transform: 'translateY(-6px)',
                  boxShadow: 6,
                },
              }}
              onClick={() => navigate(opcion.ruta)}
            >
              <Box
                sx={{
                  width: 80,
                  height: 80,
                  mx: 'auto',
                  mb: 2,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: '50%',
                  color: 'primary.main',
                  backgroundColor: 'rgba(109, 76, 65, 0.10)',
                }}
              >
                {opcion.icono}
              </Box>

              <Typography variant="h5">
                {opcion.titulo}
              </Typography>

              <Typography color="text.secondary" sx={{ mt: 1 }}>
                {opcion.descripcion}
              </Typography>
            </Paper>
          ))}
        </Box>

        <Box sx={{ mt: 9 }}>
          <Box
            sx={{
              display: 'flex',
              alignItems: {
                xs: 'flex-start',
                md: 'center',
              },
              justifyContent: 'space-between',
              flexDirection: {
                xs: 'column',
                md: 'row',
              },
              gap: 2,
              mb: 4,
            }}
          >
            <Box>
              <Typography variant="h3">
                {busqueda ? 'Resultados de búsqueda' : 'Libros destacados'}
              </Typography>

              <Typography color="text.secondary" sx={{ mt: 1 }}>
                {busqueda
                  ? `Resultados encontrados para: ${busqueda}`
                  : 'Conoce algunos de los libros disponibles en nuestra biblioteca.'}
              </Typography>
            </Box>

            {!busqueda && (
              <Button
                variant="outlined"
                endIcon={<Search />}
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              >
                Buscar libros
              </Button>
            )}
          </Box>

          {librosFiltrados.length > 0 ? (
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
              {librosFiltrados.map((libro) => (
                <LibroCard
                  key={libro.id}
                  libro={libro}
                  onVerDetalle={handleVerDetalle}
                />
              ))}
            </Box>
          ) : (
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

              <Typography color="text.secondary" sx={{ mt: 1 }}>
                Prueba con otro título, autor, ISBN o género.
              </Typography>
            </Paper>
          )}
        </Box>
      </Container>
    </Box>
  )
}

export default CatalogoPage