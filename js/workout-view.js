import { authService } from './services/auth.service.js'

document.addEventListener('DOMContentLoaded', initPage)

function initPage() {

  authService.routeGuard()

  const HTMLElements = getHTMLElements()

  setupEventListeners(HTMLElements)
}

function getHTMLElements() {
  return {
    workoutTitleH1: document.querySelector('#workoutTitleH1'),
    exercisesTableContainer: document.querySelector('#exercisesTableContainer'),
    workoutEditButton: document.querySelector('#workoutEditButton')
  }
}

function setupEventListeners(HTMLElements) {

  const { workoutEditButton } = HTMLElements

  workoutEditButton.addEventListener('click',
      () => handleNavigateToWorkoutEdit())
}

function handleNavigateToWorkoutEdit() {
  console.log('navigate')
}