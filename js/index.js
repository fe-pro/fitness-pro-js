import { authService } from './services/auth.service.js'

const form = document.querySelector('form')

authService.routeGuard()

form.addEventListener('submit', handleLoginFormSubmit)

async function handleLoginFormSubmit(event) {
    event.preventDefault()

    const user = {
        email: document.querySelector('#email').value,
        password: document.querySelector('#password').value
    }

    try {

        const token = await authService.login(user)
        console.log(token)

    } catch (error) {
        console.error(error.message)
    }

    // if (response.ok) {
    //     const data = await response.json()
    //     localStorage.setItem('token', data.token)
    //     location.replace('/workout-list.html')
    // }

    // if (response.status === 400) {
    //     console.error('Usuário ou senha inválido.')
    // } else if (response.ok === false) {
    //     console.error('Erro ao efetuar login.')
    // }
}