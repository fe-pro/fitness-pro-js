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

    if(isValid === false) {
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

    displayErrorMessage({
        inputElement: nameInput,
        isValid: isNameValid,
        errorContainer: nameInput.nextElementSibling,
        errorMessage: 'Nome é obrigatório'
    })

    if(isNameValid) {
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