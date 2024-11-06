import { validate, validators } from './utils/validate.js'

document.addEventListener('DOMContentLoaded', initPage)

function initPage() {

  const HTMLElements = getHTMLElements()

  setupEventListeners(HTMLElements)
}

function getHTMLElements() {
  return {
    createWorkoutForm: document.querySelector('#createWorkoutForm'),
    titleInput: document.querySelector('#titleInput')
  }
}

function setupEventListeners(HTMLElements) {
  const { createWorkoutForm } = HTMLElements

  createWorkoutForm.addEventListener('submit',
    async (event) => await handleCreateWorkout(event, HTMLElements))
}

async function handleCreateWorkout(event, HTMLElements) {

  event.preventDefault()

  const { titleInput } = HTMLElements

  const isFormValid = validateForm(titleInput)

  if (!isFormValid) {
    return
  }

  const newWorkoutTitle = titleInput.value
  
  const url = 'http://127.0.0.1:3333/workout'
  const accessToken = localStorage.getItem('token')

  const requestData = {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${accessToken}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ title: newWorkoutTitle })
  }

  const response = await fetch(url, requestData)
  console.log(response)
}

function validateForm(titleInput) {

  const isTitleValid = validate.validateInput(titleInput, validators.required)

  validate.displayErrorMessage({
    inputElement: titleInput,
    isValid: isTitleValid,
    errorContainer: titleInput.nextElementSibling,
    errorMessage: 'Nome do treino é obrigatório',
  })

  if(isTitleValid) {
    return true
  }
  
  return false
}