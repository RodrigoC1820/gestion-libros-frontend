import axios from 'axios'

const API_URL = import.meta.env.VITE_API_URL
const CLIENT_ID = import.meta.env.VITE_OAUTH_CLIENT_ID
const CLIENT_SECRET = import.meta.env.VITE_OAUTH_CLIENT_SECRET

const iniciarSesion = async (username, password) => {
  const datos = new URLSearchParams()

  datos.append('grant_type', 'password')
  datos.append('username', username)
  datos.append('password', password)
  datos.append('client_id', CLIENT_ID)
  datos.append('client_secret', CLIENT_SECRET)

  const respuesta = await axios.post(
    `${API_URL}/o/token/`,
    datos,
    {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    },
  )

  return respuesta.data
}

export { iniciarSesion }