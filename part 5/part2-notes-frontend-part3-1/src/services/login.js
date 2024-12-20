import axios from "axios"
const baseUrl = '/api/login'

// credentials: { username, password }
const login = async credentials => {
  console.log('Credentials', credentials)
  // credentials es enviado en el cuerpo de la solicitud. Se envian los datos del usuario al backend
  const response = await axios.post(baseUrl, credentials)
  // response.data son los datos devueltos por el backend con información y el token de acceso (En nuestro back se devuelve el username, el name del usuario y el token de acceso)
  return response.data
}

export default { login }