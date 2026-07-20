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
        borderRadius: 3,
        overflow: 'hidden',
      }}
    >
      <Box
        sx={{
          height: 180,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: 'primary.main',
          color: 'primary.contrastText',
        }}
      >
        <MenuBook sx={{ fontSize: 80 }} />
      </Box>

      <CardContent
        sx={{
          display: 'flex',
          flexDirection: 'column',
          flexGrow: 1,
          gap: 1,
        }}
      >
        <Typography variant="h6" fontWeight="bold">
          {libro.titulo || 'Título no disponible'}
        </Typography>

        <Typography color="text.secondary">
          {nombreAutor}
        </Typography>

        <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', mt: 1 }}>
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
          sx={{ mt: 'auto', pt: 1, pb: 1 }}
          onClick={() => onVerDetalle?.(libro.id)}
        >
          Ver detalle
        </Button>
      </CardContent>
    </Card>
  )
}

export default LibroCard