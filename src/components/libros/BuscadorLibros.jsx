import { Search } from '@mui/icons-material'
import { Box, Button, Paper, TextField } from '@mui/material'
import { useState } from 'react'

function BuscadorLibros({ onBuscar }) {
  const [textoBusqueda, setTextoBusqueda] = useState('')

  const handleSubmit = (event) => {
    event.preventDefault()

    if (onBuscar) {
      onBuscar(textoBusqueda.trim())
    }
  }

  const handleChange = (event) => {
    const nuevoTexto = event.target.value

    setTextoBusqueda(nuevoTexto)

    if (!nuevoTexto.trim() && onBuscar) {
      onBuscar('')
    }
  }

  return (
    <Paper
      component="form"
      elevation={2}
      onSubmit={handleSubmit}
      sx={{
        display: 'flex',
        alignItems: 'center',
        gap: 1,
        mt: 4,
        p: 1,
        borderRadius: 3,
        maxWidth: 750,
      }}
    >
      <TextField
        fullWidth
        placeholder="Buscar por título, autor, ISBN o género"
        size="small"
        value={textoBusqueda}
        onChange={handleChange}
        slotProps={{
          input: {
            startAdornment: <Search sx={{ mr: 1, color: 'text.secondary' }} />,
          },
        }}
      />

      <Button
        type="submit"
        variant="contained"
        sx={{
          px: 3,
          height: 40,
        }}
      >
        Buscar
      </Button>
    </Paper>
  )
}

export default BuscadorLibros