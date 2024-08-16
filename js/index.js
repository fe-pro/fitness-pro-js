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

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
    const isEmailValid = emailRegex.test(emailInput.value.trim())

    const isPasswordValid = passwordInput.value.trim().length >= 6 ? true : false

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

function displayErrorMessage({ inputElement, isValid, errorContainer, errorMessage }) {

    inputElement.classList.toggle('invalid', !isValid)

    isValid === true
        ? errorContainer.textContent = ''
        : errorContainer.textContent = errorMessage
}