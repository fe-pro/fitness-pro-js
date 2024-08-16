import { authService } from './services/auth.service.js'

document.addEventListener('DOMContentLoaded', initPage)

function initPage() {

    authService.routeGuard()
    const form = document.querySelector('form')
    form.addEventListener('submit', handleCreateAccountFormSubmit)
}

async function handleCreateAccountFormSubmit(event) {

    event.preventDefault()

    const nameInput = document.querySelector('#nameInput')
    const emailInput = document.querySelector('#emailInput')
    const passwordInput = document.querySelector('#passwordInput')

    const isValid = validateForm(nameInput, emailInput, passwordInput)

    if(!isValid) {
        return
    }

    const newUser = {
        name: nameInput.value,
        email: emailInput.value,
        password: passwordInput.value
    }

    try {
        await authService.createAccount(newUser)
        console.log('Sucesso!')

    } catch (error) {
        console.error(error.message)
    }
}

function validateForm(nameInput, emailInput, passwordInput) {

    const isNameValid = nameInput.value.trim() !== '' ? true : false
    
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
    const isEmailValid = emailRegex.test(emailInput.value.trim())

    const isPasswordValid = passwordInput.value.trim().length >= 6 ? true : false

    displayErrorMessage({
        inputElement: nameInput,
        isValid: isNameValid,
        errorContainer: nameInput.nextElementSibling,
        errorMessage: 'Nome é obrigatório'
    })

    displayErrorMessage({
        inputElement: emailInput,
        isValid: isEmailValid,
        errorContainer: emailInput.nextElementSibling,
        errorMessage: 'E-mail inválido'
    })

    displayErrorMessage({
        inputElement: passwordInput,
        isValid: isPasswordValid,
        errorContainer: passwordInput.nextElementSibling,
        errorMessage: 'Senha deve ter no mínimo 6 caracteres'
    })

    if(isNameValid && isEmailValid && isPasswordValid) {
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