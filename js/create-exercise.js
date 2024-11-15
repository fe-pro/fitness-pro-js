import { exerciseService } from './services/exercise.service.js'
import './utils/header.js'
import { getParamFromUrl } from './utils/utils.js'
import { validate, validators } from './utils/validate.js'
import { toast } from './utils/toast.js'

document.addEventListener('DOMContentLoaded', initPage)

function initPage() {

  const HTMLElements = getHTMLElements()

  try {
    const data = fetchData()
    setupEventListeners(HTMLElements, data)

  } catch (error) {
    error.message === '404' && location.replace('/workout-list.html')
  }
}

function getHTMLElements() {

  return {
    createExerciseForm: document.querySelector('#createExerciseForm'),
    titleInput: document.querySelector('#titleInput'),
    setsInput: document.querySelector('#setsInput'),
    repsInput: document.querySelector('#repsInput'),
  }
}

function fetchData() {

  return {
    workoutId: getParamFromUrl('workout-id')
  }
}

function setupEventListeners(HTMLElements, data) {

  const { createExerciseForm } = HTMLElements
  const { workoutId } = data

  createExerciseForm.addEventListener('submit',
    async (event) => await handleCreateExercise(event, HTMLElements, workoutId))
}

async function handleCreateExercise(event, HTMLElements, workoutId) {

  event.preventDefault()

  const { titleInput, setsInput, repsInput } = HTMLElements

  const isValid = validateForm(titleInput, setsInput, repsInput)

  if (!isValid) {
    return
  }

  const newExercise = {
    title: titleInput.value,
    sets: Number(setsInput.value),
    reps: Number(repsInput.value),
    workoutId
  }

  try {
    await exerciseService.createExercise(newExercise)
    history.back()

  } catch (error) {
    toast('error', error.message)
  }
}

function validateForm(titleInput, setsInput, repsInput) {

  const isTitleValid = validate.validateInput(titleInput, validators.required)
  const isSetsValid = validate.validateInput(setsInput, validators.required)
  const isRepsValid = validate.validateInput(repsInput, validators.required)

  validate.displayErrorMessage({
    inputElement: titleInput,
    isValid: isTitleValid,
    errorContainer: titleInput.nextElementSibling,
    errorMessage: 'Título é obrigatório'
  })

  validate.displayErrorMessage({
    inputElement: setsInput,
    isValid: isSetsValid,
    errorContainer: setsInput.nextElementSibling,
    errorMessage: 'Número de série é obrigatório'
  })

  validate.displayErrorMessage({
    inputElement: repsInput,
    isValid: isRepsValid,
    errorContainer: repsInput.nextElementSibling,
    errorMessage: 'Número de repetições é obrigatório'
  })

  if (isTitleValid && isSetsValid && isRepsValid) {
    return true
  }

  return false
}