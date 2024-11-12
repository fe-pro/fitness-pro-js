import { authService } from './services/auth.service.js'
import { workoutService } from './services/workout.service.js'
import './utils/header.js'
import { toast } from './utils/toast.js'

document.addEventListener('DOMContentLoaded', initPage)

async function initPage() {

  authService.routeGuard()

  const HTMLElements = getHTMLElements()

  try {
    const data = await fetchData()
    updateDOM(HTMLElements, data)
    setupEventListeners(HTMLElements)

  } catch (error) {
    toast('error', error.message)
  }
}

function getHTMLElements() {
  return {
    navigateToCreateWorkoutButton: document.querySelector('#createWorkoutButton'),
    workoutListContainer: document.querySelector('#workoutListContainer')
  }
}

async function fetchData() {

  const workouts = await workoutService.fetchWorkouts()
  return { workouts }
}

function updateDOM(HTMLElements, data) {

  const { workoutListContainer } = HTMLElements
  const { workouts } = data

  const hasWorkoutsAvaliable = workouts.length > 0

  workoutListContainer.innerHTML =
    hasWorkoutsAvaliable
      ? renderWorkoutList(workouts)
      : renderEmptyList()
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

  const htmlEscapeMap = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;',
    '/': '&#x2F;',
  }

  const sanitizedInput = input.replace(/[&<>"'/]/g, match => htmlEscapeMap[match])
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