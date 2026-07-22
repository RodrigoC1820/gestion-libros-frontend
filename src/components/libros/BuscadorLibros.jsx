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
      elevation={3}
      onSubmit={handleSubmit}
      sx={{
        width: '100%',
        maxWidth: 760,
        display: 'flex',
        alignItems: 'center',
        gap: 1,
        p: 1,
        borderRadius: 3,
        backgroundColor: 'background.paper',
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
            startAdornment: (
              <Search
                sx={{
                  mr: 1,
                  color: 'text.secondary',
                }}
              />
            ),
          },
        }}
        sx={{
          '& .MuiOutlinedInput-root': {
            backgroundColor: 'background.paper',
          },
        }}
      />

      <Button
        type="submit"
        variant="contained"
        sx={{
          minWidth: {
            xs: 90,
            sm: 115,
          },
          height: 40,
          px: 3,
        }}
      >
        Buscar
      </Button>
    </Paper>
  )
}

export default BuscadorLibros