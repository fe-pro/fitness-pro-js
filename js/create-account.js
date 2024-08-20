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
        createAccountForm: document.querySelector('#createAccountForm'),
        nameInput: document.querySelector('#nameInput'),
        emailInput: document.querySelector('#emailInput'),
        passwordInput: document.querySelector('#passwordInput'),
        confirmPasswordInput: document.querySelector('#confirmPasswordInput'),
    }
}

function setupEventListeners(HTMLElements) {

    const { createAccountForm } = HTMLElements

    createAccountForm.addEventListener('submit',
        async (event) => await handleCreateAccount(event, HTMLElements))
}

async function handleCreateAccount(event, HTMLElements) {

    event.preventDefault()

    const {
        createAccountForm,
        nameInput,
        emailInput,
        passwordInput,
        confirmPasswordInput
    } = HTMLElements

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
        createAccountForm.reset()

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