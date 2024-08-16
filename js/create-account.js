import { authService } from './services/auth.service.js'
import { displayErrorMessage, validateInput, validators } from './utils/validate.js'

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
    const confirmPasswordInput = document.querySelector('#confirmPasswordInput')

    const isValid = validateForm(nameInput, emailInput, passwordInput, confirmPasswordInput)

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

function validateForm(nameInput, emailInput, passwordInput, confirmPasswordInput) {

    const isNameValid = validateInput(nameInput, validators.required)
    const isEmailValid = validateInput(emailInput, validators.email)
    const isPasswordValid = validateInput(passwordInput, validators.minSixChar)
    const isPasswordEqual = validators.compare(passwordInput.value.trim(), confirmPasswordInput.value.trim())

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

    displayErrorMessage({
        inputElement: confirmPasswordInput,
        isValid: isPasswordEqual,
        errorContainer: confirmPasswordInput.nextElementSibling,
        errorMessage: 'Senhas não conferem'
    })

    if(isNameValid && isEmailValid && isPasswordValid && isPasswordEqual) {
        return true
    }

    return false
}