import './utils/header.js'

document.addEventListener('DOMContentLoaded', initPage)

function initPage() {

  const HTMLElements = getHTMLElements()
  setupEventListeners(HTMLElements)
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