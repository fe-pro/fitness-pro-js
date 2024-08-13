import { authService } from './services/auth.service.js'

document.addEventListener('DOMContentLoaded', initPage)

function initPage() {

    authService.routeGuard()
    const form = document.querySelector('form')
    form.addEventListener('submit', handleLoginFormSubmit)
}

async function handleLoginFormSubmit(event) {
    event.preventDefault()

    const emailInput = document.querySelector('#emailInput')
    const passwordInput = document.querySelector('#passwordInput')

    const isPasswordValid = passwordInput.value.length >= 6 ? true : false
    console.log(`isPasswordValid ${isPasswordValid}`)

    passwordInput.classList.toggle('invalid', !isPasswordValid)

    if(!isPasswordValid) {
        return
    }

    const loginData = {
        email: emailInput.value,
        password: passwordInput.value
    }

    try {
        const token = await authService.login(loginData)
        localStorage.setItem('token', token)
        location.replace('/workout-list.html')

    } catch (error) {
        console.error(error.message)
    }
}