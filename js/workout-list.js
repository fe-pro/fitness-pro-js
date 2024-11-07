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
    navigateToCreateWorkoutButton: document.querySelector('#createWorkoutButton'),
    workoutListContainer: document.querySelector('#workoutListContainer')
  }
}

function setupEventListeners(HTMLElements) {

  const { navigateToCreateWorkoutButton } = HTMLElements

  navigateToCreateWorkoutButton.addEventListener('click', handleNavigateToCreateWorkout)
}

function handleNavigateToCreateWorkout() {
  location.href = `/create-workout.html`
}