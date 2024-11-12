import { apiUrl } from '../utils/constants.js'

export const authService = {
  routeGuard: () => {

    const hasAccessToken = localStorage.getItem('token')
    const isPublicRoute = location.pathname === '/' || location.pathname === '/create-account.html'

    if (hasAccessToken && isPublicRoute) {
      location.replace('/workout-list.html')
    }

    if (!hasAccessToken && !isPublicRoute) {
      location.replace('/')
    }
  },
  login: async (user) => {

    const requestData = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
    }

    const response = await fetch(`${apiUrl}/sessions`, requestData)

    if (response.status === 400) {
      throw new Error('Usuário ou senha inválido.')
    }

    if (!response.ok) {
      throw new Error('Erro ao efetuar o login, tente novamente mais tarde.')
    }

    const { token } = await response.json()
    return token
  },
  createAccount: async (newUser) => {

    const requestData ={
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newUser)
    }

    const response = await fetch(`${apiUrl}/users`, requestData)

    if (response.status === 409) {
      throw new Error('E-mail já cadastrado.')
    }

    if (!response.ok) {
      throw new Error('Erro ao criar nova conta, tente novamente.');
    }

    return response
  },
  logout: () => {
    localStorage.removeItem('token')
  }
}