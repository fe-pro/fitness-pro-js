import { authService } from './services/auth.service.js'
import { workoutService } from './services/workout.service.js'
import './utils/header.js'
import { templates } from './utils/templates.js'
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

  updateWorkoutList(workoutListContainer, workouts)
}

function updateWorkoutList(workoutListContainer, workouts) {

  const hasWorkoutsAvaliable = workouts.length > 0

  workoutListContainer.innerHTML =
    hasWorkoutsAvaliable
      ? templates.renderWorkoutList(workouts)
      : templates.renderEmptyList()
}

function setupEventListeners(HTMLElements) {

  const { navigateToCreateWorkoutButton } = HTMLElements

  navigateToCreateWorkoutButton.addEventListener('click', handleNavigateToCreateWorkout)
}

function handleNavigateToCreateWorkout() {
  location.href = `/create-workout.html`
}