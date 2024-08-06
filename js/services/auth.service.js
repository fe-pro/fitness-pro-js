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
    const url = 'http://127.0.0.1:3333/sessions'

    const requestData = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
    }

    const response = await fetch(url, requestData)

    if (response.status === 400) {
      throw new Error('Usuário ou senha inválido.')
    }

    if (!response.ok) {
      throw new Error('Erro ao efetuar o login, tente novamente mais tarde.')
    }

    const { token } = await response.json()
    return token
  }
}