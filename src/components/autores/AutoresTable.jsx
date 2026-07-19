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

function AutoresTable({
  autores,
  cargando,
  onEditar,
  onEliminar,
}) {
  const formatearFecha = (fecha) => {
    if (!fecha) {
      return 'No registrada'
    }

    return new Date(
      `${fecha}T00:00:00`
    ).toLocaleDateString('es-EC')
  }

  return (
    <Paper sx={{ overflow: 'hidden' }}>
      {cargando ? (
        <Box
          sx={{
            minHeight: 220,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 2,
          }}
        >
          <CircularProgress />

          <Typography color="text.secondary">
            Cargando autores...
          </Typography>
        </Box>
      ) : autores.length === 0 ? (
        <Box
          sx={{
            p: 4,
            textAlign: 'center',
          }}
        >
          <Typography color="text.secondary">
            No existen autores registrados.
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
                  <strong>Nombre</strong>
                </TableCell>

                <TableCell>
                  <strong>Apellido</strong>
                </TableCell>

                <TableCell>
                  <strong>Nacionalidad</strong>
                </TableCell>

                <TableCell>
                  <strong>Fecha de nacimiento</strong>
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
              {autores.map((autor) => (
                <TableRow hover key={autor.id}>
                  <TableCell>{autor.id}</TableCell>

                  <TableCell>{autor.nombre}</TableCell>

                  <TableCell>{autor.apellido}</TableCell>

                  <TableCell>
                    {autor.nacionalidad || 'No registrada'}
                  </TableCell>

                  <TableCell>
                    {formatearFecha(
                      autor.fecha_nacimiento
                    )}
                  </TableCell>

                  <TableCell>
                    {autor.activo ? 'Activo' : 'Inactivo'}
                  </TableCell>

                  <TableCell align="center">
                    <Tooltip title="Editar autor">
                      <IconButton
                        color="primary"
                        onClick={() => onEditar(autor)}
                      >
                        <Edit />
                      </IconButton>
                    </Tooltip>

                    <Tooltip title="Eliminar autor">
                      <IconButton
                        color="error"
                        onClick={() => onEliminar(autor)}
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

export default AutoresTable