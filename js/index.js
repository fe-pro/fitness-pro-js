import { authService } from './services/auth.service.js'
import { displayErrorMessage, validateInput, validators } from './utils/validate.js'

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

    const isFormValid = validateForm(emailInput, passwordInput)

    if (!isFormValid) {
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

function validateForm(emailInput, passwordInput) {

    const isEmailValid = validateInput(emailInput, validators.email)
    const isPasswordValid = validateInput(passwordInput, validators.minSixChar)

    displayErrorMessage({
        inputElement: emailInput,
        isValid:  isEmailValid,
        errorContainer:  emailInput.nextElementSibling,
        errorMessage: 'E-mail inválido'
    })

    displayErrorMessage({
        inputElement: passwordInput,
        isValid: isPasswordValid,
        errorContainer: passwordInput.nextElementSibling,
        errorMessage: 'Senha deve ter no mínimo 6 caracteres'
    })

    if (isEmailValid && isPasswordValid) {
        return true
    }

    return false
}