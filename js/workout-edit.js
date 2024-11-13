import { authService } from './services/auth.service.js'
import './utils/header.js'

document.addEventListener('DOMContentLoaded', initPage)

function initPage() {

  authService.routeGuard()

  const HTMLElements = getHTMLElements()

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