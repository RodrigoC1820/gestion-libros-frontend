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
  MenuItem,
  TextField,
} from '@mui/material'

function LibroFormDialog({
  abierto,
  modoEdicion,
  formulario,
  autores,
  errores,
  guardando,
  onChange,
  onCerrar,
  onGuardar,
}) {
  return (
    <Dialog
      open={abierto}
      onClose={guardando ? undefined : onCerrar}
      fullWidth
      maxWidth="sm"
    >
      <DialogTitle>
        {modoEdicion ? 'Editar libro' : 'Nuevo libro'}
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
            select
            label="Autor"
            name="autor"
            value={formulario.autor}
            onChange={onChange}
            required
            fullWidth
            disabled={guardando}
            error={Boolean(errores.autor)}
            helperText={errores.autor}
          >
            <MenuItem value="">
              Seleccione un autor
            </MenuItem>

            {autores.map((autor) => (
              <MenuItem
                key={autor.id}
                value={autor.id}
              >
                {autor.nombre_completo ||
                  `${autor.nombre} ${autor.apellido}`}
              </MenuItem>
            ))}
          </TextField>

          <TextField
            label="Título"
            name="titulo"
            value={formulario.titulo}
            onChange={onChange}
            required
            fullWidth
            disabled={guardando}
            error={Boolean(errores.titulo)}
            helperText={errores.titulo}
            inputProps={{ maxLength: 200 }}
          />

          <TextField
            label="ISBN"
            name="isbn"
            value={formulario.isbn}
            onChange={onChange}
            required
            fullWidth
            disabled={guardando}
            error={Boolean(errores.isbn)}
            helperText={
              errores.isbn ||
              'Ingrese un ISBN de 10 o 13 números.'
            }
            inputProps={{ maxLength: 20 }}
          />

          <TextField
            label="Género"
            name="genero"
            value={formulario.genero}
            onChange={onChange}
            required
            fullWidth
            disabled={guardando}
            error={Boolean(errores.genero)}
            helperText={errores.genero}
            inputProps={{ maxLength: 80 }}
          />

         <TextField
           label="Fecha de publicación"
           name="fecha_publicacion"
           type="date"
           value={formulario.fecha_publicacion}
           onChange={onChange}
           required
           fullWidth
           disabled={guardando}
           error={Boolean(errores.fecha_publicacion)}
           helperText={errores.fecha_publicacion}
           slotProps={{
            inputLabel: {
            shrink: true,
    },
  }}
/>

          <TextField
            label="Número de páginas"
            name="numero_paginas"
            type="number"
            value={formulario.numero_paginas}
            onChange={onChange}
            required
            fullWidth
            disabled={guardando}
            error={Boolean(errores.numero_paginas)}
            helperText={errores.numero_paginas}
            inputProps={{
              min: 1,
            }}
          />

          <TextField
            label="Idioma"
            name="idioma"
            value={formulario.idioma}
            onChange={onChange}
            required
            fullWidth
            disabled={guardando}
            error={Boolean(errores.idioma)}
            helperText={errores.idioma}
            inputProps={{ maxLength: 40 }}
          />

          <FormControlLabel
            control={
              <Checkbox
                name="disponible"
                checked={formulario.disponible}
                onChange={onChange}
                disabled={guardando}
              />
            }
            label="Libro disponible"
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

export default LibroFormDialog