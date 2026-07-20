import {
  Box,
  CircularProgress,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tooltip,
  Typography,
} from '@mui/material'
import {
  Delete,
  Edit,
} from '@mui/icons-material'

function LibrosTable({
  libros,
  cargando,
  onEditar,
  onEliminar,
}) {
  return (
    <Paper sx={{ overflow: 'hidden' }}>
      {cargando ? (
        <Box
          sx={{
            minHeight: 220,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'column',
            gap: 2,
          }}
        >
          <CircularProgress />

          <Typography color="text.secondary">
            Cargando libros...
          </Typography>
        </Box>
      ) : libros.length === 0 ? (
        <Box
          sx={{
            p: 4,
            textAlign: 'center',
          }}
        >
          <Typography color="text.secondary">
            No existen libros registrados.
          </Typography>
        </Box>
      ) : (
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>
                  <strong>ID</strong>
                </TableCell>

                <TableCell>
                  <strong>Título</strong>
                </TableCell>

                <TableCell>
                  <strong>Autor</strong>
                </TableCell>

                <TableCell>
                  <strong>ISBN</strong>
                </TableCell>

                <TableCell>
                  <strong>Género</strong>
                </TableCell>

                <TableCell>
                  <strong>Estado</strong>
                </TableCell>

                <TableCell align="center">
                  <strong>Acciones</strong>
                </TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {libros.map((libro) => (
                <TableRow key={libro.id} hover>
                  <TableCell>
                    {libro.id}
                  </TableCell>

                  <TableCell>
                    {libro.titulo}
                  </TableCell>

                  <TableCell>
                    {libro.autor_nombre}
                  </TableCell>

                  <TableCell>
                    {libro.isbn}
                  </TableCell>

                  <TableCell>
                    {libro.genero}
                  </TableCell>

                  <TableCell>
                    {libro.disponible
                      ? 'Disponible'
                      : 'No disponible'}
                  </TableCell>

                  <TableCell align="center">
                    <Tooltip title="Editar libro">
                      <IconButton
                        color="primary"
                        onClick={() => onEditar(libro)}
                      >
                        <Edit />
                      </IconButton>
                    </Tooltip>

                    <Tooltip title="Eliminar libro">
                      <IconButton
                        color="error"
                        onClick={() => onEliminar(libro)}
                      >
                        <Delete />
                      </IconButton>
                    </Tooltip>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Paper>
  )
}

export default LibrosTable