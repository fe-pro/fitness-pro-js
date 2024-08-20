import { authService } from './services/auth.service.js'
import { toast } from './utils/toast.js'
import { validate, validators } from './utils/validate.js'

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
        toast('success', 'Conta criada com sucesso!')

    } catch (error) {
        toast('error', error.message)
    }
}

function validateForm(nameInput, emailInput, passwordInput, confirmPasswordInput) {

    const isNameValid = validate.validateInput(nameInput, validators.required)
    const isEmailValid =  validate.validateInput(emailInput, validators.email)
    const isPasswordValid =  validate.validateInput(passwordInput, validators.minSixChar)
    const isPasswordEqual = validators.compare(passwordInput.value.trim(), confirmPasswordInput.value.trim())

    validate.displayErrorMessage({
        inputElement: nameInput,
        isValid: isNameValid,
        errorContainer: nameInput.nextElementSibling,
        errorMessage: 'Nome é obrigatório'
    })

    validate.displayErrorMessage({
        inputElement: emailInput,
        isValid: isEmailValid,
        errorContainer: emailInput.nextElementSibling,
        errorMessage: 'E-mail inválido'
    })

    validate.displayErrorMessage({
        inputElement: passwordInput,
        isValid: isPasswordValid,
        errorContainer: passwordInput.nextElementSibling,
        errorMessage: 'Senha deve ter no mínimo 6 caracteres'
    })

    validate.displayErrorMessage({
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