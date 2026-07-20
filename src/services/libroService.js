import api from './api'

export const obtenerLibros = async () => {
  const respuesta = await api.get('/libros/')
  return respuesta.data
}

export const crearLibro = async (datosLibro) => {
  const respuesta = await api.post('/libros/', datosLibro)
  return respuesta.data
}

export const actualizarLibro = async (id, datosLibro) => {
  const respuesta = await api.put(
    `/libros/${id}/`,
    datosLibro
  )

  return respuesta.data
}

export const eliminarLibro = async (id) => {
  await api.delete(`/libros/${id}/`)
}