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

async function updateDOM(HTMLElements) {

  const { workoutListContainer } = HTMLElements

  const url = 'http://127.0.0.1:3333/workout/list'
  const accessToken = localStorage.getItem('token')
  const requestData = {
    method: 'GET',
    headers: {
      "Authorization": `Bearer ${accessToken}`,
      "Cache-Control": "no-cache"
    }
  }

  try {

    const response = await fetch(url, requestData)

    if (!response.ok) {
      throw new Error('Erro ao buscar lista de treinos.')
    }

    const { workouts } = await response.json()

    const hasWorkoutsAvaliable = workouts.length > 0

    workoutListContainer.innerHTML =
      hasWorkoutsAvaliable
        ? renderWorkoutList(workouts)
        : renderEmptyList()

  } catch {
    throw new Error('Falha interna, tente mais tarde.')
  }
}

function renderWorkoutList(workoutList) {

  return `
    <ul>${
        workoutList.map(workout =>
        `<li class="workout-item">${workout.title}</li>`).join('')
    }</ul>
  `
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