import axios from "axios";

const TOKEN_URL = import.meta.env.VITE_OAUTH_TOKEN_URL;
const CLIENT_ID = import.meta.env.VITE_OAUTH_CLIENT_ID;
const CLIENT_SECRET = import.meta.env.VITE_OAUTH_CLIENT_SECRET;

export const iniciarSesion = async (username, password) => {
  if (!TOKEN_URL) {
    throw new Error(
      "No está configurada la variable VITE_OAUTH_TOKEN_URL"
    );
  }

  if (!CLIENT_ID || !CLIENT_SECRET) {
    throw new Error(
      "No están configuradas las credenciales OAuth"
    );
  }

  const datos = new URLSearchParams();

  datos.append("grant_type", "password");
  datos.append("username", username);
  datos.append("password", password);
  datos.append("client_id", CLIENT_ID);
  datos.append("client_secret", CLIENT_SECRET);

  const respuesta = await axios.post(TOKEN_URL, datos, {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
  });

  localStorage.setItem(
    "access_token",
    respuesta.data.access_token
  );

  if (respuesta.data.refresh_token) {
    localStorage.setItem(
      "refresh_token",
      respuesta.data.refresh_token
    );
  }

  return respuesta.data;
};