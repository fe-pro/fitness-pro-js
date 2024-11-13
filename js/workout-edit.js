import { authService } from './services/auth.service.js'
import { workoutService } from './services/workout.service.js'
import './utils/header.js'
import { getParamFromUrl } from './utils/utils.js'

document.addEventListener('DOMContentLoaded', initPage)

async function initPage() {

  authService.routeGuard()

  const HTMLElements = getHTMLElements()

  try {
    const data = await fetchData()
    updateDOM(HTMLElements, data)

  } catch (error) {
    error.message === '404'
    ? location.href = '/workout-list.html'
    : toast('error', error.message)
  }

  setupEventListeners(HTMLElements)
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

  const { workoutTitleInput } = HTMLElements
  const { workoutTitle } = data

  updateWorkoutTitleInput(workoutTitleInput, workoutTitle)
}

function updateWorkoutTitleInput(workoutTitleInput, workoutTitle) {
  workoutTitleInput.value = workoutTitle
}

function setupEventListeners(HTMLElements) {
  const { workoutEditForm, addExerciseButton, deleteWorkoutLink } = HTMLElements

  workoutEditForm.addEventListener('submit',
    (event) => handleUpdateWorkoutTitle(event))

  addExerciseButton.addEventListener('click', handleAddExercise)

  deleteWorkoutLink.addEventListener('click', handleDeleteWorkout)
}

function handleUpdateWorkoutTitle(event) {

  event.preventDefault()

  console.log('handleUpdateWorkoutTitle')
}

function handleAddExercise() {
  console.log('handleAddExercise')
}

function handleDeleteWorkout() {
  console.log('handleDeleteWorkout')
}