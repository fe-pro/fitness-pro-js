import './utils/header.js'

document.addEventListener('DOMContentLoaded', initPage)

function initPage() {

  const HTMLElements = getHTMLElements()
  setupEventListeners(HTMLElements)
}

function getHTMLElements() {

  return {
    createExerciseForm: document.querySelector('#createExerciseForm'),
    titleInput: document.querySelector('#titleInput'),
    setsInput: document.querySelector('#setsInput'),
    repsInput: document.querySelector('#repsInput'),
  }
}

function setupEventListeners(HTMLElements) {

  const { createExerciseForm } = HTMLElements

  createExerciseForm.addEventListener('submit',
    (event) => handleCreateExercise(event))
}

function handleCreateExercise(event) {

  event.preventDefault()

  console.log('Hello world!')
}