import { authService } from './services/auth.service.js'
import { workoutService } from './services/workout.service.js'
import { getParamFromUrl } from './utils/utils.js'
import { toast } from './utils/toast.js'
import { templates } from './utils/templates.js'
import './utils/header.js'

document.addEventListener('DOMContentLoaded', initPage)

async function initPage() {

  authService.routeGuard()

  const HTMLElements = getHTMLElements()

  try {

    const data = await fetchData()
    updateDOM(HTMLElements, data)
    setupEventListeners(HTMLElements, data)

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
  updateExercisesTable(exercisesTableContainer, exercises)
}

function updateWorkoutTitle(workoutTitleH1, workoutTitle) {
  workoutTitleH1.textContent = workoutTitle
}

function updateExercisesTable(exercisesTableContainer, exercises) {
  
  const hasExercisesAvaliable = exercises.length > 0

  exercisesTableContainer.classList.toggle('fix-table-container-margin', hasExercisesAvaliable)

  exercisesTableContainer.innerHTML = 
    hasExercisesAvaliable
      ? templates.renderExerciseTable({ exercises })
      : templates.renderEmptyList()
}

function setupEventListeners(HTMLElements, data) {

  const { workoutEditButton } = HTMLElements
  const { workoutId } = data

  workoutEditButton.addEventListener('click',
      () => handleNavigateToWorkoutEdit(workoutId))
}

function handleNavigateToWorkoutEdit(workoutId) {

  const workoutSearchParams = new URLSearchParams({
    'workout-id': workoutId
  }).toString()

  location.href = `/workout-edit.html?${workoutSearchParams}`
}