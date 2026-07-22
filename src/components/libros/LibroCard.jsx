import { MenuBook } from '@mui/icons-material'
import { Box, Button, Card, CardContent, Chip, Typography } from '@mui/material'

function LibroCard({ libro, onVerDetalle }) {
  const nombreAutor =
    libro.autor_nombre ||
    libro.nombre_autor ||
    libro.autor?.nombre ||
    'Autor no disponible'

  return (
    <Card
      elevation={2}
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
        transition: 'transform 0.25s ease, box-shadow 0.25s ease',
        '&:hover': {
          transform: 'translateY(-8px)',
          boxShadow: 8,
        },
      }}
    >
      <Box
        sx={{
          height: 190,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'linear-gradient(135deg, #6D4C41 0%, #8D6E63 100%)',
          color: 'primary.contrastText',
          position: 'relative',
        }}
      >
        <Box
          sx={{
            width: 92,
            height: 125,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: '4px 10px 10px 4px',
            backgroundColor: 'rgba(255, 255, 255, 0.15)',
            border: '1px solid rgba(255, 255, 255, 0.35)',
            boxShadow: '8px 8px 18px rgba(0, 0, 0, 0.18)',
          }}
        >
          <MenuBook sx={{ fontSize: 58 }} />
        </Box>
      </Box>

      <CardContent
        sx={{
          display: 'flex',
          flexDirection: 'column',
          flexGrow: 1,
          gap: 1,
          p: 2.2,
        }}
      >
        <Typography
          variant="h6"
          fontWeight="bold"
          sx={{
            lineHeight: 1.3,
            minHeight: 50,
          }}
        >
          {libro.titulo || 'Título no disponible'}
        </Typography>

        <Typography color="text.secondary" sx={{ minHeight: 24 }}>
          {nombreAutor}
        </Typography>

        <Box
          sx={{
            display: 'flex',
            gap: 1,
            flexWrap: 'wrap',
            mt: 1,
            mb: 2,
          }}
        >
          {libro.genero && (
            <Chip
              label={libro.genero}
              size="small"
              variant="outlined"
            />
          )}

          <Chip
            label={libro.disponible ? 'Disponible' : 'No disponible'}
            color={libro.disponible ? 'success' : 'default'}
            size="small"
          />
        </Box>

        <Button
          fullWidth
          variant="contained"
          sx={{
            mt: 'auto',
            py: 1,
          }}
          onClick={() => onVerDetalle?.(libro.id)}
        >
          Ver detalle
        </Button>
      </CardContent>
    </Card>
  )
}

export default LibroCard