import { http } from '../utils/http.js'

export const authService = {

  routeGuard: () => {

    const hasAccessToken = localStorage.getItem('token')
    const currentRoute = location.pathname

    const isPublicRoute = 
      currentRoute === '/' ||
      currentRoute === '/index.html' ||
      currentRoute === '/create-account.html'

    if (hasAccessToken && isPublicRoute) {
      location.replace('/workout-list.html')
    }

    if (!hasAccessToken && !isPublicRoute) {
      location.replace('/')
    }
  },

  login: async (user) => {

    const response = await http.post('/sessions', user, { useAuthorization: false })

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

    const response = await http.post('/users', newUser, { useAuthorization: false })

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