import { Box, Button, Container, Typography } from "@mui/material";

function HomePage() {
  return (
    <Container maxWidth="md">
      <Box
        sx={{
          minHeight: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          gap: 2,
        }}
      >
        <Typography variant="h3">
          Gestión de Libros
        </Typography>

        <Typography variant="h6">
          Sistema de Administración
        </Typography>

        <Button variant="contained">
          Proyecto Configurado
        </Button>
      </Box>
    </Container>
  );
}

export default HomePage;