import { LockOutlined } from '@mui/icons-material'
import { Alert, Avatar, Box, Button, CircularProgress, Container, Paper, TextField, Typography } from '@mui/material'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { iniciarSesion } from '../services/authService'

function LoginPage() {
  const navigate = useNavigate()
  const { iniciarSesionLocal } = useAuth()

  const [formulario, setFormulario] = useState({
    username: '',
    password: '',
  })

  const [cargando, setCargando] = useState(false)
  const [error, setError] = useState('')

  const handleChange = (event) => {
    const { name, value } = event.target

    setFormulario((datosAnteriores) => ({
      ...datosAnteriores,
      [name]: value,
    }))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    setError('')

    if (!formulario.username.trim() || !formulario.password.trim()) {
      setError('Todos los campos son obligatorios.')
      return
    }

    setCargando(true)

    try {
      const datosToken = await iniciarSesion(
        formulario.username,
        formulario.password,
      )

      iniciarSesionLocal(datosToken)

      navigate('/admin/dashboard')
    } catch (errorPeticion) {
      console.error('Error completo:', errorPeticion)
      console.error('Estado:', errorPeticion.response?.status)
      console.error('Respuesta:', errorPeticion.response?.data)

      if (errorPeticion.response?.status === 400) {
        setError(
          errorPeticion.response?.data?.error_description ||
            'Usuario o contraseña incorrectos.',
        )
      } else if (errorPeticion.response?.status === 401) {
        setError('El Client ID o el Client Secret de OAuth2 no son válidos.')
      } else if (errorPeticion.code === 'ERR_NETWORK') {
        setError('No se pudo conectar con el servidor.')
      } else {
        setError('No fue posible iniciar sesión.')
      }
    } finally {
      setCargando(false)
    }
  }

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        backgroundColor: 'background.default',
      }}
    >
      <Container maxWidth="xs">
        <Paper
          elevation={4}
          sx={{
            p: 4,
            borderRadius: 3,
          }}
        >
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Avatar
              sx={{
                bgcolor: 'primary.main',
                mb: 2,
              }}
            >
              <LockOutlined />
            </Avatar>

            <Typography variant="h4" fontWeight="bold">
              Iniciar sesión
            </Typography>

            <Typography
              color="text.secondary"
              textAlign="center"
              sx={{ mt: 1, mb: 3 }}
            >
              Ingresa tus credenciales para acceder al sistema.
            </Typography>

            {error && (
              <Alert severity="error" sx={{ width: '100%', mb: 2 }}>
                {error}
              </Alert>
            )}

            <Box
              component="form"
              onSubmit={handleSubmit}
              sx={{ width: '100%' }}
            >
              <TextField
                fullWidth
                required
                label="Nombre de usuario"
                margin="normal"
                name="username"
                value={formulario.username}
                onChange={handleChange}
              />

              <TextField
                fullWidth
                required
                label="Contraseña"
                margin="normal"
                name="password"
                type="password"
                value={formulario.password}
                onChange={handleChange}
              />

              <Button
                fullWidth
                disabled={cargando}
                size="large"
                sx={{ mt: 3 }}
                type="submit"
                variant="contained"
              >
                {cargando ? (
                  <CircularProgress color="inherit" size={24} />
                ) : (
                  'Ingresar'
                )}
              </Button>
            </Box>
          </Box>
        </Paper>
      </Container>
    </Box>
  )
}

export default LoginPage