import api from "./api";

export const obtenerCategorias = async () => {
  const respuesta = await api.get("/categorias/");
  return respuesta.data;
};