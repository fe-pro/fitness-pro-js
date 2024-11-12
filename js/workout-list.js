import { authService } from './services/auth.service.js'
import { workoutService } from './services/workout.service.js'
import './utils/header.js'
import { toast } from './utils/toast.js'

document.addEventListener('DOMContentLoaded', initPage)

function initPage() {

  authService.routeGuard()

  const HTMLElements = getHTMLElements()

  updateDOM(HTMLElements)

  setupEventListeners(HTMLElements)
}

function getHTMLElements() {
  return {
    navigateToCreateWorkoutButton: document.querySelector('#createWorkoutButton'),
    workoutListContainer: document.querySelector('#workoutListContainer')
  }
}

async function updateDOM(HTMLElements) {

  const { workoutListContainer } = HTMLElements

  try {
    const workouts = await workoutService.fetchWorkouts()
    
    const hasWorkoutsAvaliable = workouts.length > 0
  
    workoutListContainer.innerHTML =
      hasWorkoutsAvaliable
        ? renderWorkoutList(workouts)
        : renderEmptyList()

  } catch(error) {
    toast('error', error.message)
  }
}

function renderWorkoutList(workoutList) {

  return `
    <ul>${
        workoutList.map(workout =>
        `<li class="workout-item">${sanitizeHTML(workout.title)}</li>`).join('')
    }</ul>
  `
}

function sanitizeHTML(input) {

  const sanitizedInput = input.replace(/[&<>"'/]/g, '')

  return sanitizedInput
}

function renderEmptyList() {
  return `
    <div class="fallback-render">
      <img src="./assets/nothing-here-icon.svg">
      <span>Nada por aqui!</span>
    </div>
  `
}

function setupEventListeners(HTMLElements) {

  const { navigateToCreateWorkoutButton } = HTMLElements

  navigateToCreateWorkoutButton.addEventListener('click', handleNavigateToCreateWorkout)
}

function handleNavigateToCreateWorkout() {
  location.href = `/create-workout.html`
}