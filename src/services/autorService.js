import api from './api'

export const obtenerAutores = async (parametros = {}) => {
  const respuesta = await api.get('/autores/', {
    params: parametros,
  })

  return respuesta.data
}

export const obtenerAutorPorId = async (id) => {
  const respuesta = await api.get(`/autores/${id}/`)
  return respuesta.data
}

export const crearAutor = async (datosAutor) => {
  const respuesta = await api.post('/autores/', datosAutor)
  return respuesta.data
}

export const actualizarAutor = async (id, datosAutor) => {
  const respuesta = await api.put(
    `/autores/${id}/`,
    datosAutor,
  )

  return respuesta.data
}

export const actualizarAutorParcial = async (
  id,
  datosAutor,
) => {
  const respuesta = await api.patch(
    `/autores/${id}/`,
    datosAutor,
  )

  return respuesta.data
}

export const eliminarAutor = async (id) => {
  await api.delete(`/autores/${id}/`)
}