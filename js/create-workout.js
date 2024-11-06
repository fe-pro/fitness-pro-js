import { workoutService } from './services/workout.service.js'
import { validate, validators } from './utils/validate.js'
import { toast } from './utils/toast.js'

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
    async (event) => await handleCreateWorkout(event, HTMLElements))
}

async function handleCreateWorkout(event, HTMLElements) {

  event.preventDefault()

  const { titleInput } = HTMLElements

  const isFormValid = validateForm(titleInput)

  if (!isFormValid) {
    return
  }

  const newWorkoutTitle = titleInput.value
  
  try {
    await workoutService.createWorkout(newWorkoutTitle)
    location.href = '/workout-list.html'
    
  } catch (error) {
    toast('error', error.message)
  }
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