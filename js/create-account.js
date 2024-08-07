import { authService } from './services/auth.service.js'

document.addEventListener('DOMContentLoaded', initPage)

function initPage() {

    authService.routeGuard()
    const form = document.querySelector('form')
    form.addEventListener('submit', handleCreateAccountFormSubmit)
}

async function handleCreateAccountFormSubmit(event) {
    event.preventDefault()

    const newUser = {
        name: document.querySelector('input[name="name"]').value,
        email: document.querySelector('input[name="email"]').value,
        password:  document.querySelector('input[name="password"]').value
    }

    try {
        
        await authService.createAccount(newUser)
        console.log('Sucesso!')
    } catch (error) {
        console.error(error.message)
    }
}