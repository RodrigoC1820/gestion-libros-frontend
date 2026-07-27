import api from './api'

export const obtenerLibros = async (parametros = {}) => {
  const respuesta = await api.get('/libros/', {
    params: parametros,
  })

  return respuesta.data
}

export const obtenerLibroPorId = async (id) => {
  const respuesta = await api.get(`/libros/${id}/`)
  return respuesta.data
}

export const obtenerLibrosDestacados = async () => {
  const respuesta = await api.get('/libros/destacados/')
  return respuesta.data
}

export const crearLibro = async (datosLibro) => {
  const respuesta = await api.post('/libros/', datosLibro)
  return respuesta.data
}

export const actualizarLibro = async (id, datosLibro) => {
  const respuesta = await api.put(
    `/libros/${id}/`,
    datosLibro,
  )

  return respuesta.data
}

export const actualizarLibroParcial = async (
  id,
  datosLibro,
) => {
  const respuesta = await api.patch(
    `/libros/${id}/`,
    datosLibro,
  )

  return respuesta.data
}

export const eliminarLibro = async (id) => {
  await api.delete(`/libros/${id}/`)
}