import {
  createContext,
  useContext,
  useMemo,
  useState,
} from 'react'

const AuthContext = createContext(null)

function AuthProvider({ children }) {
  const [autenticado, setAutenticado] = useState(
    Boolean(localStorage.getItem('access_token')),
  )

  const iniciarSesionLocal = (datosToken) => {
    localStorage.setItem('access_token', datosToken.access_token)
    localStorage.setItem('refresh_token', datosToken.refresh_token)

    setAutenticado(true)
  }

  const cerrarSesion = () => {
    localStorage.removeItem('access_token')
    localStorage.removeItem('refresh_token')

    setAutenticado(false)
  }

  const valorContexto = useMemo(
    () => ({
      autenticado,
      iniciarSesionLocal,
      cerrarSesion,
    }),
    [autenticado],
  )

  return (
    <AuthContext.Provider value={valorContexto}>
      {children}
    </AuthContext.Provider>
  )
}

function useAuth() {
  const contexto = useContext(AuthContext)

  if (!contexto) {
    throw new Error('useAuth debe utilizarse dentro de AuthProvider.')
  }

  return contexto
}

export {
  AuthProvider,
  useAuth,
}