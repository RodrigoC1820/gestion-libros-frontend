import { useEffect, useState } from 'react'
import {
  Alert,
  Box,
  Button,
  Typography,
} from '@mui/material'
import { Add } from '@mui/icons-material'

import AutorFormDialog from '../components/autores/AutorFormDialog'
import AutoresTable from '../components/autores/AutoresTable'
import ConfirmarEliminacionDialog from '../components/autores/ConfirmarEliminacionDialog'

import {
  actualizarAutor,
  crearAutor,
  eliminarAutor,
  obtenerAutores,
} from '../services/autorService'

const formularioInicial = {
  nombre: '',
  apellido: '',
  nacionalidad: '',
  fecha_nacimiento: '',
  biografia: '',
  activo: true,
}

function AutoresPage() {
  const [autores, setAutores] = useState([])
  const [cargando, setCargando] = useState(true)
  const [error, setError] = useState('')

  const [dialogoAbierto, setDialogoAbierto] = useState(false)
  const [guardando, setGuardando] = useState(false)
  const [modoEdicion, setModoEdicion] = useState(false)
  const [autorSeleccionado, setAutorSeleccionado] = useState(null)

  const [formulario, setFormulario] = useState(formularioInicial)
  const [erroresFormulario, setErroresFormulario] = useState({})

  const [dialogoEliminarAbierto, setDialogoEliminarAbierto] =
    useState(false)
  const [autorAEliminar, setAutorAEliminar] = useState(null)
  const [eliminando, setEliminando] = useState(false)
  const [errorEliminacion, setErrorEliminacion] = useState('')

  const cargarAutores = async () => {
    try {
      setCargando(true)
      setError('')

      const respuesta = await obtenerAutores()

      const listaAutores = Array.isArray(respuesta)
        ? respuesta
        : respuesta.results || []

      setAutores(listaAutores)
    } catch (error) {
      console.error('Error al cargar los autores:', error)
      setError('No fue posible cargar los autores.')
    } finally {
      setCargando(false)
    }
  }

  useEffect(() => {
    cargarAutores()
  }, [])

  const abrirDialogoCrear = () => {
    setModoEdicion(false)
    setAutorSeleccionado(null)
    setFormulario(formularioInicial)
    setErroresFormulario({})
    setDialogoAbierto(true)
  }

  const abrirDialogoEditar = (autor) => {
    setModoEdicion(true)
    setAutorSeleccionado(autor)

    setFormulario({
      nombre: autor.nombre || '',
      apellido: autor.apellido || '',
      nacionalidad: autor.nacionalidad || '',
      fecha_nacimiento: autor.fecha_nacimiento || '',
      biografia: autor.biografia || '',
      activo: autor.activo,
    })

    setErroresFormulario({})
    setDialogoAbierto(true)
  }

  const cerrarDialogo = () => {
    if (guardando) {
      return
    }

    setDialogoAbierto(false)
    setModoEdicion(false)
    setAutorSeleccionado(null)
    setFormulario(formularioInicial)
    setErroresFormulario({})
  }

  const manejarCambioFormulario = (event) => {
    const {
      name,
      value,
      checked,
      type,
    } = event.target

    setFormulario((formularioAnterior) => ({
      ...formularioAnterior,
      [name]: type === 'checkbox' ? checked : value,
    }))

    setErroresFormulario((erroresAnteriores) => ({
      ...erroresAnteriores,
      [name]: '',
      general: '',
    }))
  }

  const validarFormulario = () => {
    const nuevosErrores = {}

    if (formulario.nombre.trim().length < 2) {
      nuevosErrores.nombre =
        'El nombre debe tener al menos 2 caracteres.'
    }

    if (formulario.apellido.trim().length < 2) {
      nuevosErrores.apellido =
        'El apellido debe tener al menos 2 caracteres.'
    }

    if (formulario.fecha_nacimiento) {
      const fechaSeleccionada = new Date(
        `${formulario.fecha_nacimiento}T00:00:00`
      )

      const fechaActual = new Date()

      if (fechaSeleccionada > fechaActual) {
        nuevosErrores.fecha_nacimiento =
          'La fecha de nacimiento no puede ser futura.'
      }
    }

    setErroresFormulario(nuevosErrores)

    return Object.keys(nuevosErrores).length === 0
  }

  const procesarErroresBackend = (error) => {
    const respuesta = error.response?.data

    if (!respuesta || typeof respuesta !== 'object') {
      return {
        general: 'No fue posible guardar el autor.',
      }
    }

    const nuevosErrores = {}

    Object.entries(respuesta).forEach(([campo, mensajes]) => {
      nuevosErrores[campo] = Array.isArray(mensajes)
        ? mensajes.join(' ')
        : String(mensajes)
    })

    return nuevosErrores
  }

  const guardarAutor = async () => {
    if (!validarFormulario()) {
      return
    }

    try {
      setGuardando(true)
      setErroresFormulario({})

      const datosAutor = {
        nombre: formulario.nombre.trim(),
        apellido: formulario.apellido.trim(),
        nacionalidad: formulario.nacionalidad.trim(),
        fecha_nacimiento:
          formulario.fecha_nacimiento || null,
        biografia: formulario.biografia.trim(),
        activo: formulario.activo,
      }

      if (modoEdicion && autorSeleccionado) {
        await actualizarAutor(
          autorSeleccionado.id,
          datosAutor
        )
      } else {
        await crearAutor(datosAutor)
      }

      setDialogoAbierto(false)
      setModoEdicion(false)
      setAutorSeleccionado(null)
      setFormulario(formularioInicial)
      setErroresFormulario({})

      await cargarAutores()
    } catch (error) {
      console.error('Error al guardar el autor:', error)

      setErroresFormulario(
        procesarErroresBackend(error)
      )
    } finally {
      setGuardando(false)
    }
  }

  const abrirDialogoEliminar = (autor) => {
    setAutorAEliminar(autor)
    setErrorEliminacion('')
    setDialogoEliminarAbierto(true)
  }

  const cerrarDialogoEliminar = () => {
    if (eliminando) {
      return
    }

    setDialogoEliminarAbierto(false)
    setAutorAEliminar(null)
    setErrorEliminacion('')
  }

  const confirmarEliminacion = async () => {
    if (!autorAEliminar) {
      return
    }

    try {
      setEliminando(true)
      setErrorEliminacion('')

      await eliminarAutor(autorAEliminar.id)

      setDialogoEliminarAbierto(false)
      setAutorAEliminar(null)

      await cargarAutores()
    } catch (error) {
      console.error('Error al eliminar el autor:', error)

      const mensajeBackend =
        error.response?.data?.detail

      setErrorEliminacion(
        mensajeBackend ||
          'No fue posible eliminar el autor.'
      )
    } finally {
      setEliminando(false)
    }
  }

  return (
    <Box>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          mb: 3,
          gap: 2,
          flexWrap: 'wrap',
        }}
      >
        <Box>
          <Typography
            variant="h4"
            fontWeight="bold"
            gutterBottom
          >
            Autores
          </Typography>

          <Typography color="text.secondary">
            Administración de los autores registrados en el sistema.
          </Typography>
        </Box>

        <Button
          variant="contained"
          startIcon={<Add />}
          onClick={abrirDialogoCrear}
        >
          Nuevo autor
        </Button>
      </Box>

      {error && (
        <Alert
          severity="error"
          sx={{ mb: 3 }}
          action={
            <Button
              color="inherit"
              size="small"
              onClick={cargarAutores}
            >
              Reintentar
            </Button>
          }
        >
          {error}
        </Alert>
      )}

      <AutoresTable
        autores={autores}
        cargando={cargando}
        onEditar={abrirDialogoEditar}
        onEliminar={abrirDialogoEliminar}
      />

      <AutorFormDialog
        abierto={dialogoAbierto}
        modoEdicion={modoEdicion}
        formulario={formulario}
        errores={erroresFormulario}
        guardando={guardando}
        onChange={manejarCambioFormulario}
        onCerrar={cerrarDialogo}
        onGuardar={guardarAutor}
      />

      <ConfirmarEliminacionDialog
        abierto={dialogoEliminarAbierto}
        autor={autorAEliminar}
        eliminando={eliminando}
        error={errorEliminacion}
        onCerrar={cerrarDialogoEliminar}
        onConfirmar={confirmarEliminacion}
      />
    </Box>
  )
}

export default AutoresPage