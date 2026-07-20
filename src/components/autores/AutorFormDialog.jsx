import {
  Alert,
  Box,
  Button,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControlLabel,
  TextField,
} from '@mui/material'

function AutorFormDialog({
  abierto,
  modoEdicion,
  formulario,
  errores,
  guardando,
  onChange,
  onCerrar,
  onGuardar,
}) {
  return (
    <Dialog
      open={abierto}
      onClose={onCerrar}
      fullWidth
      maxWidth="sm"
    >
      <DialogTitle>
        {modoEdicion ? 'Editar autor' : 'Nuevo autor'}
      </DialogTitle>

      <DialogContent>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: 2,
            mt: 1,
          }}
        >
          {errores.general && (
            <Alert severity="error">
              {errores.general}
            </Alert>
          )}

          <TextField
            label="Nombre"
            name="nombre"
            value={formulario.nombre}
            onChange={onChange}
            required
            fullWidth
            disabled={guardando}
            error={Boolean(errores.nombre)}
            helperText={errores.nombre}
            inputProps={{
              maxLength: 100,
            }}
          />

          <TextField
            label="Apellido"
            name="apellido"
            value={formulario.apellido}
            onChange={onChange}
            required
            fullWidth
            disabled={guardando}
            error={Boolean(errores.apellido)}
            helperText={errores.apellido}
            inputProps={{
              maxLength: 100,
            }}
          />

          <TextField
            label="Nacionalidad"
            name="nacionalidad"
            value={formulario.nacionalidad}
            onChange={onChange}
            fullWidth
            disabled={guardando}
            error={Boolean(errores.nacionalidad)}
            helperText={errores.nacionalidad}
            inputProps={{
              maxLength: 80,
            }}
          />

         <TextField
          label="Fecha de nacimiento"
          name="fecha_nacimiento"
          type="date"
          value={formulario.fecha_nacimiento}
          onChange={onChange}
          fullWidth
          disabled={guardando}
          error={Boolean(errores.fecha_nacimiento)}
          helperText={errores.fecha_nacimiento}
          slotProps={{
           inputLabel: {
            shrink: true,
    },
  }}
/>

          <TextField
            label="Biografía"
            name="biografia"
            value={formulario.biografia}
            onChange={onChange}
            fullWidth
            multiline
            minRows={4}
            disabled={guardando}
            error={Boolean(errores.biografia)}
            helperText={errores.biografia}
          />

          <FormControlLabel
            control={
              <Checkbox
                name="activo"
                checked={formulario.activo}
                onChange={onChange}
                disabled={guardando}
              />
            }
            label="Autor activo"
          />
        </Box>
      </DialogContent>

      <DialogActions>
        <Button
          onClick={onCerrar}
          disabled={guardando}
        >
          Cancelar
        </Button>

        <Button
          variant="contained"
          onClick={onGuardar}
          disabled={guardando}
        >
          {guardando
            ? 'Guardando...'
            : modoEdicion
              ? 'Guardar cambios'
              : 'Guardar'}
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default AutorFormDialog