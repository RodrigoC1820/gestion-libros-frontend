import { Box, Container, Typography } from '@mui/material'
import PublicHeader from '../components/PublicHeader'

function AutoresPublicPage() {
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
        <Typography variant="h3" fontWeight="bold">
          Autores
        </Typography>

        <Typography color="text.secondary" sx={{ mt: 2 }}>
          Conoce a los autores disponibles en nuestra biblioteca digital.
        </Typography>
      </Container>
    </Box>
  )
}

export default AutoresPublicPage