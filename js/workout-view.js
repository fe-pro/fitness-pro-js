import { authService } from './services/auth.service.js'
import { workoutService } from './services/workout.service.js'
import { getParamFromUrl } from './utils/utils.js'

document.addEventListener('DOMContentLoaded', initPage)

function initPage() {

  authService.routeGuard()

  const HTMLElements = getHTMLElements()

  fetchData()

  setupEventListeners(HTMLElements)
}

function getHTMLElements() {
  return {
    workoutTitleH1: document.querySelector('#workoutTitleH1'),
    exercisesTableContainer: document.querySelector('#exercisesTableContainer'),
    workoutEditButton: document.querySelector('#workoutEditButton')
  }
}

async function fetchData() {

  const workoutId = getParamFromUrl('workout-id')
  const workout = await workoutService.getWorkoutById(workoutId)
  console.log(workout)
}

function setupEventListeners(HTMLElements) {

  const { workoutEditButton } = HTMLElements

  workoutEditButton.addEventListener('click',
      () => handleNavigateToWorkoutEdit())
}

function handleNavigateToWorkoutEdit() {
  console.log('navigate')
}