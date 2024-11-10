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

  const workoutList = {
    workouts: [
      {
        id: "4aaf3510-412d-4f7c-b449-c65ac6bbfaab",
        title: "Costas"
      },
      {
        id: "d29fd499-6ab5-42cc-83c7-6150e6031e97",
        title: "Peito"
      }
    ]
  }

  const hasWorkoutsAvaliable = workoutList.workouts.length > 0

  workoutListContainer.innerHTML =
    hasWorkoutsAvaliable
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