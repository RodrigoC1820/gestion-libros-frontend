import { Box, Container, Typography } from '@mui/material'
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

  return (
    <Box
      sx={{
        minHeight: '100vh',
        backgroundColor: '#f5f5f5',
      }}
    >
      <PublicHeader />

      <Container
        maxWidth="lg"
        sx={{
          py: 6,
        }}
      >
        <Typography variant="h3" fontWeight="bold">
          Catálogo de libros
        </Typography>

        <Typography color="text.secondary" sx={{ mt: 2 }}>
          Explora los libros disponibles en nuestra biblioteca digital.
        </Typography>

        <BuscadorLibros onBuscar={handleBuscar} />

        <Typography variant="h5" fontWeight="bold" sx={{ mt: 5, mb: 3 }}>
          {busqueda
            ? `Resultados para: ${busqueda}`
            : 'Libros disponibles'}
        </Typography>

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
          <Box
            sx={{
              py: 6,
              textAlign: 'center',
            }}
          >
            <Typography variant="h6">
              No se encontraron libros.
            </Typography>

            <Typography color="text.secondary" sx={{ mt: 1 }}>
              Prueba con otro título, autor, ISBN o género.
            </Typography>
          </Box>
        )}
      </Container>
    </Box>
  )
}

export default CatalogoPage