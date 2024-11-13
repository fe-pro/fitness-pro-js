import { authService } from './services/auth.service.js'
import { workoutService } from './services/workout.service.js'
import { getParamFromUrl } from './utils/utils.js'
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
    error.message === '404'
      ? location.href = '/workout-list.html'
      : toast('error', error.message)
  }
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
  const { workoutTitle, exercises } = await workoutService.getWorkoutById(workoutId)

  return {
    workoutId,
    workoutTitle,
    exercises
  }
}

function updateDOM(HTMLElements, data) {

  const { workoutTitleH1, exercisesTableContainer } = HTMLElements
  const { workoutTitle, exercises } = data

  updateWorkoutTitle(workoutTitleH1, workoutTitle)
}

function updateWorkoutTitle(workoutTitleH1, workoutTitle) {
  workoutTitleH1.textContent = workoutTitle
}

function setupEventListeners(HTMLElements) {

  const { workoutEditButton } = HTMLElements

  workoutEditButton.addEventListener('click',
      () => handleNavigateToWorkoutEdit())
}

function handleNavigateToWorkoutEdit() {
  console.log('navigate')
}