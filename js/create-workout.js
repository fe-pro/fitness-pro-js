import { validate, validators } from './utils/validate.js'

document.addEventListener('DOMContentLoaded', initPage)

function initPage() {

  const HTMLElements = getHTMLElements()

  setupEventListeners(HTMLElements)
}

function getHTMLElements() {
  return {
    createWorkoutForm: document.querySelector('#createWorkoutForm'),
    titleInput: document.querySelector('#titleInput')
  }
}

function setupEventListeners(HTMLElements) {
  const { createWorkoutForm } = HTMLElements

  createWorkoutForm.addEventListener('submit',
    (event) => handleCreateWorkout(event, HTMLElements))
}

function handleCreateWorkout(event, HTMLElements) {

  event.preventDefault()

  const { titleInput } = HTMLElements

  const isFormValid = validateForm(titleInput)

  if (!isFormValid) {
    return
  }

  const newWorkoutTitle = titleInput.value
  
  console.log(newWorkoutTitle)
}

function validateForm(titleInput) {

  const isTitleValid = validate.validateInput(titleInput, validators.required)

  validate.displayErrorMessage({
    inputElement: titleInput,
    isValid: isTitleValid,
    errorContainer: titleInput.nextElementSibling,
    errorMessage: 'Nome do treino é obrigatório',
  })

  if(isTitleValid) {
    return true
  }
  
  return false
}