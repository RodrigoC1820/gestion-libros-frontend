import api from "./api";

export const obtenerAutores = async () => {
    const response = await api.get("/autores/");
    return response.data;
};

export const crearAutor = async (autor) => {
    const response = await api.post("/autores/", autor);
    return response.data;
};

export const actualizarAutor = async (id, autor) => {
    const response = await api.put(`/autores/${id}/`, autor);
    return response.data;
};

export const eliminarAutor = async (id) => {
    await api.delete(`/autores/${id}/`);
};