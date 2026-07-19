import {Book,MenuBook,People,} from '@mui/icons-material'
import {Box,Card,CardContent,Grid,Typography,} from '@mui/material'

const tarjetas = [
  {
    titulo: 'Total de libros',
    valor: 0,
    icono: <MenuBook fontSize="large" color="primary" />,
  },
  {
    titulo: 'Total de autores',
    valor: 0,
    icono: <People fontSize="large" color="primary" />,
  },
  {
    titulo: 'Libros disponibles',
    valor: 0,
    icono: <Book fontSize="large" color="primary" />,
  },
]

function DashboardPage() {
  return (
    <Box>
      <Typography variant="h4" fontWeight="bold" gutterBottom>
        Dashboard
      </Typography>

      <Typography color="text.secondary" sx={{ mb: 3 }}>
        Resumen general del sistema de gestión de libros.
      </Typography>

      <Grid container spacing={3}>
        {tarjetas.map((tarjeta) => (
          <Grid key={tarjeta.titulo} size={{ xs: 12, sm: 6, md: 4 }}>
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

                  <Typography variant="h4" fontWeight="bold">
                    {tarjeta.valor}
                  </Typography>
                </Box>

                {tarjeta.icono}
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  )
}

export default DashboardPage