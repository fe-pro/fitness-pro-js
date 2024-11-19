import { authService } from './services/auth.service.js'
import { workoutService } from './services/workout.service.js'
import './utils/header.js'
import { templates } from './utils/templates.js'
import { getParamFromUrl } from './utils/utils.js'
import { validate, validators } from './utils/validate.js'
import { toast } from './utils/toast.js'

document.addEventListener('DOMContentLoaded', initPage)

async function initPage() {

  authService.routeGuard()

  const HTMLElements = getHTMLElements()

  try {
    const data = await fetchData()
    updateDOM(HTMLElements, data)
    setupEventListeners(HTMLElements, data)

  } catch (error) {
    error.message === '404'
    ? location.href = '/workout-list.html'
    : toast('error', error.message)
  }
}

function getHTMLElements() {

  return {
    workoutEditForm: document.querySelector('#workoutEditForm'),
    workoutTitleInput: document.querySelector('#workoutTitleInput'),
    workoutTitleErrorContainer: document.querySelector('#workoutTitleErrorContainer'),
    exercisesTableContainer: document.querySelector('#exercisesTableContainer'),
    addExerciseButton: document.querySelector('#addExerciseButton'),
    deleteWorkoutLink: document.querySelector('#deleteWorkoutLink')
  }
}

async function fetchData() {

  const workoutId = getParamFromUrl('workout-id')
  const { workoutTitle, exercises } = await workoutService.getWorkoutById(workoutId)

  return {
    workoutId,
    workoutTitle,
    exercises
  }
}

function updateDOM(HTMLElements, data) {

  const { workoutTitleInput, exercisesTableContainer } = HTMLElements
  const { workoutTitle, exercises } = data

  updateWorkoutTitleInput(workoutTitleInput, workoutTitle)
  updateExercisesTable(exercisesTableContainer, exercises)
}

function updateWorkoutTitleInput(workoutTitleInput, workoutTitle) {
  workoutTitleInput.value = workoutTitle
}

function updateExercisesTable(exercisesTableContainer, exercises) {

  const hasExercisesAvaliable = exercises.length > 0

  exercisesTableContainer.classList.toggle('fix-table-container-margin', hasExercisesAvaliable)

  exercisesTableContainer.innerHTML = 
    hasExercisesAvaliable
      ? templates.renderExerciseTable({ exercises, includeEditButton: true })
      : templates.renderEmptyList()
}

function setupEventListeners(HTMLElements, data) {

  const { workoutEditForm, addExerciseButton, deleteWorkoutLink } = HTMLElements
  const { workoutId } = data

  workoutEditForm.addEventListener('submit',
    (event) => handleUpdateWorkoutTitle(event, HTMLElements, workoutId))

  addExerciseButton.addEventListener('click', 
    () => handleNavigateToAddExercise(workoutId))

  deleteWorkoutLink.addEventListener('click', handleDeleteWorkout)
}

async function handleUpdateWorkoutTitle(event, HTMLElements, workoutId) {

  event.preventDefault()

  const { workoutTitleInput, workoutTitleErrorContainer } = HTMLElements

  const isFormValid = validateForm(workoutTitleInput, workoutTitleErrorContainer)

  if (!isFormValid) {
    return
  }

  const workoutTitleUpdated = workoutTitleInput.value

  try {
    await workoutService.updateWorkoutTitle(workoutId, workoutTitleUpdated)
    toast('success', 'Título atualizado!')

  } catch (error) {
    toast('error', error.message)
  }
}

function validateForm(workoutTitleInput, workoutTitleErrorContainer) {

  const isWorkoutTitleValid = validate.validateInput(workoutTitleInput, validators.required)

  validate.displayErrorMessage({
    inputElement: workoutTitleInput,
    isValid: isWorkoutTitleValid,
    errorContainer: workoutTitleErrorContainer,
    errorMessage: 'Título não pode ficar vazio'
  })

  if (isWorkoutTitleValid) {
    return true
  }

  return false
}

function handleNavigateToAddExercise(workoutId) {
  
  const workoutSearchParams = new URLSearchParams({
    'workout-id': workoutId
  }).toString()

  location.href = `/create-exercise.html?${workoutSearchParams}`
}

function handleDeleteWorkout() {
  console.log('handleDeleteWorkout')
}