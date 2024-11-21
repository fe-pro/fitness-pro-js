import { authService } from './services/auth.service.js'
import { toast } from './utils/toast.js'
import { validate, validators } from './utils/validate.js'

document.addEventListener('DOMContentLoaded', initPage)

function initPage() {

    authService.routeGuard()

    const HTMLElements = getHTMLElements()

    setupEventListeners(HTMLElements)
}

function getHTMLElements() {
    return {
        loginForm: document.querySelector('#loginForm'),
        emailInput: document.querySelector('#emailInput'),
        passwordInput: document.querySelector('#passwordInput'),
    }
}

function setupEventListeners(HTMLElements) {

    const { loginForm } = HTMLElements

    loginForm.addEventListener('submit',
        async (event) => await handleLogin(event, HTMLElements))
}

async function handleLogin(event, HTMLElements) {

    event.preventDefault()

    const { emailInput, passwordInput } = HTMLElements

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
        toast('error', error.message)
    }
}

function validateForm(emailInput, passwordInput) {

    const isEmailValid =  validate.validateInput(emailInput, validators.email)
    const isPasswordValid =  validate.validateInput(passwordInput, validators.minSixChar)

    validate.displayErrorMessage({
        inputElement: emailInput,
        isValid:  isEmailValid,
        errorContainer:  emailInput.nextElementSibling,
        errorMessage: 'E-mail inválido'
    })

    validate.displayErrorMessage({
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