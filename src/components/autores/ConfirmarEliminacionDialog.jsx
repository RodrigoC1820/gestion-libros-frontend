import {
  Alert,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material'

function ConfirmarEliminacionDialog({
  abierto,
  autor,
  eliminando,
  error,
  onCerrar,
  onConfirmar,
}) {
  const nombreCompleto = autor
    ? `${autor.nombre} ${autor.apellido}`
    : ''

  return (
    <Dialog
      open={abierto}
      onClose={eliminando ? undefined : onCerrar}
      fullWidth
      maxWidth="xs"
    >
      <DialogTitle>
        Eliminar autor
      </DialogTitle>

      <DialogContent>
        {error && (
          <Alert
            severity="error"
            sx={{ mb: 2 }}
          >
            {error}
          </Alert>
        )}

        <DialogContentText>
          ¿Está seguro de eliminar al autor{' '}
          <strong>{nombreCompleto}</strong>?
        </DialogContentText>

        <DialogContentText sx={{ mt: 2 }}>
          Esta acción no se puede deshacer.
        </DialogContentText>
      </DialogContent>

      <DialogActions>
        <Button
          onClick={onCerrar}
          disabled={eliminando}
        >
          Cancelar
        </Button>

        <Button
          color="error"
          variant="contained"
          onClick={onConfirmar}
          disabled={eliminando}
        >
          {eliminando ? 'Eliminando...' : 'Eliminar'}
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default ConfirmarEliminacionDialog