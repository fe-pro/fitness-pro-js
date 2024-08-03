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
  }
}