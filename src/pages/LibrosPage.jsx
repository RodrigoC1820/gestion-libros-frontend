import { useEffect, useState } from 'react'
import { Add } from '@mui/icons-material'
import {
  Alert,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Typography,
} from '@mui/material'

import LibroFormDialog from '../components/libros/LibroFormDialog'
import LibrosTable from '../components/libros/LibrosTable'

import { obtenerAutores } from '../services/autorService'
import {
  actualizarLibro,
  crearLibro,
  eliminarLibro,
  obtenerLibros,
} from '../services/libroService'

const formularioInicial = {
  autor: '',
  titulo: '',
  isbn: '',
  genero: '',
  fecha_publicacion: '',
  numero_paginas: '',
  idioma: 'Español',
  disponible: true,
}

function LibrosPage() {
  const [libros, setLibros] = useState([])
  const [autores, setAutores] = useState([])

  const [cargando, setCargando] = useState(true)
  const [error, setError] = useState('')
  const [mensajeExito, setMensajeExito] = useState('')

  const [dialogoAbierto, setDialogoAbierto] = useState(false)
  const [modoEdicion, setModoEdicion] = useState(false)
  const [libroSeleccionado, setLibroSeleccionado] = useState(null)

  const [formulario, setFormulario] = useState(formularioInicial)
  const [erroresFormulario, setErroresFormulario] = useState({})
  const [guardando, setGuardando] = useState(false)

  const [dialogoEliminarAbierto, setDialogoEliminarAbierto] =
    useState(false)
  const [libroAEliminar, setLibroAEliminar] = useState(null)
  const [eliminando, setEliminando] = useState(false)
  const [errorEliminacion, setErrorEliminacion] = useState('')

  const cargarLibros = async () => {
    try {
      setCargando(true)
      setError('')

      const respuesta = await obtenerLibros()

      const listaLibros = Array.isArray(respuesta)
        ? respuesta
        : respuesta.results || []

      setLibros(listaLibros)
    } catch (errorPeticion) {
      console.error(
        'Error al cargar los libros:',
        errorPeticion
      )

      setError('No fue posible cargar los libros.')
    } finally {
      setCargando(false)
    }
  }

  const cargarAutores = async () => {
    try {
      const respuesta = await obtenerAutores()

      const listaAutores = Array.isArray(respuesta)
        ? respuesta
        : respuesta.results || []

      const autoresActivos = listaAutores.filter(
        (autor) => autor.activo
      )

      setAutores(autoresActivos)
    } catch (errorPeticion) {
      console.error(
        'Error al cargar los autores:',
        errorPeticion
      )

      setAutores([])
    }
  }

  useEffect(() => {
    cargarLibros()
    cargarAutores()
  }, [])

  const abrirDialogoCrear = () => {
    setModoEdicion(false)
    setLibroSeleccionado(null)
    setFormulario(formularioInicial)
    setErroresFormulario({})
    setMensajeExito('')
    setDialogoAbierto(true)
  }

  const abrirDialogoEditar = (libro) => {
    setModoEdicion(true)
    setLibroSeleccionado(libro)
    setErroresFormulario({})
    setMensajeExito('')

    setFormulario({
      autor: libro.autor?.toString() || '',
      titulo: libro.titulo || '',
      isbn: libro.isbn || '',
      genero: libro.genero || '',
      fecha_publicacion:
        libro.fecha_publicacion || '',
      numero_paginas:
        libro.numero_paginas?.toString() || '',
      idioma: libro.idioma || 'Español',
      disponible: Boolean(libro.disponible),
    })

    setDialogoAbierto(true)
  }

  const cerrarDialogo = () => {
    if (guardando) {
      return
    }

    setDialogoAbierto(false)
    setModoEdicion(false)
    setLibroSeleccionado(null)
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

    if (!formulario.autor) {
      nuevosErrores.autor =
        'Debe seleccionar un autor.'
    }

    if (formulario.titulo.trim().length < 2) {
      nuevosErrores.titulo =
        'El título debe tener al menos 2 caracteres.'
    }

    const isbnLimpio = formulario.isbn
      .replaceAll('-', '')
      .replaceAll(' ', '')
      .trim()

    if (!isbnLimpio) {
      nuevosErrores.isbn =
        'El ISBN es obligatorio.'
    } else if (!/^\d+$/.test(isbnLimpio)) {
      nuevosErrores.isbn =
        'El ISBN solo debe contener números, espacios o guiones.'
    } else if (
      isbnLimpio.length !== 10 &&
      isbnLimpio.length !== 13
    ) {
      nuevosErrores.isbn =
        'El ISBN debe contener 10 o 13 números.'
    }

    if (!formulario.genero.trim()) {
      nuevosErrores.genero =
        'El género es obligatorio.'
    }

    if (!formulario.fecha_publicacion) {
      nuevosErrores.fecha_publicacion =
        'La fecha de publicación es obligatoria.'
    } else {
      const fechaSeleccionada = new Date(
        `${formulario.fecha_publicacion}T00:00:00`
      )

      const fechaActual = new Date()

      fechaActual.setHours(23, 59, 59, 999)

      if (fechaSeleccionada > fechaActual) {
        nuevosErrores.fecha_publicacion =
          'La fecha de publicación no puede ser futura.'
      }
    }

    const numeroPaginas = Number(
      formulario.numero_paginas
    )

    if (
      formulario.numero_paginas === '' ||
      formulario.numero_paginas === null
    ) {
      nuevosErrores.numero_paginas =
        'El número de páginas es obligatorio.'
    } else if (
      Number.isNaN(numeroPaginas) ||
      numeroPaginas < 1
    ) {
      nuevosErrores.numero_paginas =
        'El libro debe tener al menos una página.'
    }

    if (!formulario.idioma.trim()) {
      nuevosErrores.idioma =
        'El idioma es obligatorio.'
    }

    setErroresFormulario(nuevosErrores)

    return Object.keys(nuevosErrores).length === 0
  }

  const procesarErroresBackend = (errorPeticion) => {
    const respuesta = errorPeticion.response?.data

    if (!respuesta || typeof respuesta !== 'object') {
      return {
        general:
          'No fue posible guardar el libro. Verifique la conexión.',
      }
    }

    const nuevosErrores = {}

    Object.entries(respuesta).forEach(
      ([campo, mensajes]) => {
        if (Array.isArray(mensajes)) {
          nuevosErrores[campo] = mensajes.join(' ')
        } else if (
          mensajes &&
          typeof mensajes === 'object'
        ) {
          nuevosErrores[campo] = Object.values(
            mensajes
          )
            .flat()
            .join(' ')
        } else {
          nuevosErrores[campo] = String(mensajes)
        }
      }
    )

    if (nuevosErrores.detail) {
      nuevosErrores.general = nuevosErrores.detail
      delete nuevosErrores.detail
    }

    if (nuevosErrores.non_field_errors) {
      nuevosErrores.general =
        nuevosErrores.non_field_errors

      delete nuevosErrores.non_field_errors
    }

    return nuevosErrores
  }

  const prepararDatosLibro = () => {
    const isbnLimpio = formulario.isbn
      .replaceAll('-', '')
      .replaceAll(' ', '')
      .trim()

    return {
      autor: Number(formulario.autor),
      titulo: formulario.titulo.trim(),
      isbn: isbnLimpio,
      genero: formulario.genero.trim(),
      fecha_publicacion:
        formulario.fecha_publicacion,
      numero_paginas: Number(
        formulario.numero_paginas
      ),
      idioma: formulario.idioma.trim(),
      disponible: formulario.disponible,
    }
  }

  const guardarLibro = async () => {
    if (!validarFormulario()) {
      return
    }

    try {
      setGuardando(true)
      setErroresFormulario({})
      setMensajeExito('')

      const datosLibro = prepararDatosLibro()

      if (modoEdicion && libroSeleccionado) {
        await actualizarLibro(
          libroSeleccionado.id,
          datosLibro
        )

        setMensajeExito(
          'Libro actualizado correctamente.'
        )
      } else {
        await crearLibro(datosLibro)

        setMensajeExito(
          'Libro creado correctamente.'
        )
      }

      setDialogoAbierto(false)
      setModoEdicion(false)
      setLibroSeleccionado(null)
      setFormulario(formularioInicial)
      setErroresFormulario({})

      await cargarLibros()
    } catch (errorPeticion) {
      console.error(
        'Error al guardar el libro:',
        errorPeticion
      )

      setErroresFormulario(
        procesarErroresBackend(errorPeticion)
      )
    } finally {
      setGuardando(false)
    }
  }

  const abrirDialogoEliminar = (libro) => {
    setLibroAEliminar(libro)
    setErrorEliminacion('')
    setMensajeExito('')
    setDialogoEliminarAbierto(true)
  }

  const cerrarDialogoEliminar = () => {
    if (eliminando) {
      return
    }

    setDialogoEliminarAbierto(false)
    setLibroAEliminar(null)
    setErrorEliminacion('')
  }

  const confirmarEliminacion = async () => {
    if (!libroAEliminar) {
      return
    }

    try {
      setEliminando(true)
      setErrorEliminacion('')
      setMensajeExito('')

      await eliminarLibro(libroAEliminar.id)

      setDialogoEliminarAbierto(false)
      setLibroAEliminar(null)
      setMensajeExito(
        'Libro eliminado correctamente.'
      )

      await cargarLibros()
    } catch (errorPeticion) {
      console.error(
        'Error al eliminar el libro:',
        errorPeticion
      )

      const respuesta = errorPeticion.response?.data
      const mensajeBackend =
        respuesta?.detail ||
        respuesta?.error ||
        respuesta?.mensaje

      setErrorEliminacion(
        mensajeBackend ||
          'No fue posible eliminar el libro.'
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
            Libros
          </Typography>

          <Typography color="text.secondary">
            Administración de los libros registrados en el sistema.
          </Typography>
        </Box>

        <Button
          variant="contained"
          startIcon={<Add />}
          onClick={abrirDialogoCrear}
        >
          Nuevo libro
        </Button>
      </Box>

      {mensajeExito && (
        <Alert
          severity="success"
          sx={{ mb: 3 }}
          onClose={() => setMensajeExito('')}
        >
          {mensajeExito}
        </Alert>
      )}

      {error && (
        <Alert
          severity="error"
          sx={{ mb: 3 }}
          action={
            <Button
              color="inherit"
              size="small"
              onClick={cargarLibros}
            >
              Reintentar
            </Button>
          }
        >
          {error}
        </Alert>
      )}

      <LibrosTable
        libros={libros}
        cargando={cargando}
        onEditar={abrirDialogoEditar}
        onEliminar={abrirDialogoEliminar}
      />

      <LibroFormDialog
        abierto={dialogoAbierto}
        modoEdicion={modoEdicion}
        formulario={formulario}
        autores={autores}
        errores={erroresFormulario}
        guardando={guardando}
        onChange={manejarCambioFormulario}
        onCerrar={cerrarDialogo}
        onGuardar={guardarLibro}
      />

      <Dialog
        open={dialogoEliminarAbierto}
        onClose={
          eliminando
            ? undefined
            : cerrarDialogoEliminar
        }
        fullWidth
        maxWidth="xs"
      >
        <DialogTitle>
          Eliminar libro
        </DialogTitle>

        <DialogContent>
          {errorEliminacion && (
            <Alert
              severity="error"
              sx={{ mb: 2 }}
            >
              {errorEliminacion}
            </Alert>
          )}

          <DialogContentText>
            ¿Está seguro de eliminar el libro{' '}
            <strong>
              {libroAEliminar?.titulo || ''}
            </strong>
            ?
          </DialogContentText>

          <DialogContentText sx={{ mt: 2 }}>
            Esta acción no se puede deshacer.
          </DialogContentText>
        </DialogContent>

        <DialogActions>
          <Button
            onClick={cerrarDialogoEliminar}
            disabled={eliminando}
          >
            Cancelar
          </Button>

          <Button
            color="error"
            variant="contained"
            onClick={confirmarEliminacion}
            disabled={eliminando}
          >
            {eliminando
              ? 'Eliminando...'
              : 'Eliminar'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  )
}

export default LibrosPage