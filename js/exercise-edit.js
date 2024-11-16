import './utils/header.js'
import { getParamFromUrl } from './utils/utils.js'

document.addEventListener('DOMContentLoaded', initPage)

function initPage() {

  const HTMLElements = getHTMLElements()

  try {
    const data = fetchData()
    updateDOM(HTMLElements, data)
    setupEventListeners(HTMLElements)

  } catch (error) {
    error.message === '404' && location.replace('/workout-list.html')
  }

}

function getHTMLElements() {

  return {
    exerciseEditForm: document.querySelector('#exerciseEditForm'),
    titleInput: document.querySelector('#titleInput'),
    setsInput: document.querySelector('#setsInput'),
    repsInput: document.querySelector('#repsInput'),
    deleteExerciseButton: document.querySelector('#deleteExerciseButton'),
  }
}

function fetchData() {

  return {
    exerciseId: getParamFromUrl('exercise-id'),
    title: getParamFromUrl('title'),
    sets: getParamFromUrl('sets'),
    reps: getParamFromUrl('reps')
  }
}

function updateDOM(HTMLElements, data) {

  populateFields(HTMLElements, data)
}

function populateFields(HTMLElements, data) {

  const { titleInput, setsInput, repsInput } = HTMLElements
  const { title, sets, reps } = data

  titleInput.value = title
  setsInput.value = sets
  repsInput.value = reps
}

function setupEventListeners(HTMLElements) {

  const { exerciseEditForm, deleteExerciseButton } = HTMLElements

  exerciseEditForm.addEventListener('submit', (event) => handleEditExercise(event))

  deleteExerciseButton.addEventListener('click', handleDeleteExercise)
}

function handleEditExercise(event) {

  event.preventDefault()

  console.log('handleEditExercise')
}

function handleDeleteExercise() {
  console.log('handleDeleteExercise')
}