import { authService } from './services/auth.service.js'
import './utils/header.js'

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

function updateDOM(HTMLElements) {

  const { workoutListContainer } = HTMLElements

  workoutListContainer.innerHTML =
    
    false
      ? 'lista de treino'
      : renderEmptyList()
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