import './utils/header.js'
import { toast } from './utils/toast.js'
import { getParamFromUrl } from './utils/utils.js'
import { validate, validators } from './utils/validate.js'
import { exerciseService } from './services/exercise.service.js'

document.addEventListener('DOMContentLoaded', initPage)

function initPage() {

  const HTMLElements = getHTMLElements()

  try {
    const data = fetchData()
    updateDOM(HTMLElements, data)
    setupEventListeners(HTMLElements, data)

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

function setupEventListeners(HTMLElements, data) {

  const { exerciseEditForm, deleteExerciseButton } = HTMLElements

  exerciseEditForm.addEventListener('submit',
    async (event) => await handleEditExercise(event, HTMLElements, data))

  deleteExerciseButton.addEventListener('click',
    () => handleDeleteExercise(data))
}

async function handleEditExercise(event, HTMLElements, data) {

  event.preventDefault()

  const { titleInput, setsInput, repsInput } = HTMLElements
  const { exerciseId } = data

  const isFormValid = validateForm(titleInput, setsInput, repsInput)

  if (!isFormValid) {
    return
  }

  const updatedExercise = {
    id: exerciseId,
    title: titleInput.value,
    sets: Number(setsInput.value),
    reps: Number(repsInput.value)
  }

  try {
    await exerciseService.updateExercise(updatedExercise)
    toast('success', 'Exercício atualizado!')
    
  } catch (error) {
    toast('error', error.message)
  }
}

function validateForm(titleInput, setsInput, repsInput) {

  const isTitleValid = validate.validateInput(titleInput, validators.required)
  const isSetsValid = validate.validateInput(setsInput, validators.required)
  const isRepsValid = validate.validateInput(repsInput, validators.required)

  validate.displayErrorMessage({
    inputElement: titleInput,
    isValid: isTitleValid,
    errorContainer: titleInput.nextElementSibling,
    errorMessage: 'Título é obrigatório'
  })

  validate.displayErrorMessage({
    inputElement: setsInput,
    isValid: isSetsValid,
    errorContainer: setsInput.nextElementSibling,
    errorMessage: 'Número de séries é obrigatório'
  })

  validate.displayErrorMessage({
    inputElement: repsInput,
    isValid: isRepsValid,
    errorContainer: repsInput.nextElementSibling,
    errorMessage: 'Número de repetições é obrigatório'
  })

  if (isTitleValid && isSetsValid && isRepsValid) {
    return true
  }

  return false
}

async function handleDeleteExercise(data) {

  const { exerciseId, title } = data

  const deletionConfirmed = await showConfirmDialog('Deletar exercício?', title)
  console.log('handleDeleteExercise =>', deletionConfirmed)

  if (!deletionConfirmed) {
    return
  }

  try {
    await exerciseService.deleteExercise(exerciseId)
    history.back()

  } catch (error) {
    toast('error', error.message)
  }
}

async function showConfirmDialog(headerMessage, titleItemToBeRemove) {

  const dialogTemplate = `
    <div class="outside-dialog">
      <div class="dialog-content">
        <header>
          <span>${headerMessage}</span>
        </header>

        <section>
          <span>Isso irá remover <span class="title-item">${titleItemToBeRemove}</span></span>
        </section>

        <footer>
          <button class="cancel-button">Cancelar</button>
          <button class="delete-button">Deletar</button>
        </footer>
      </div>
    </div>
  `

  let dialogConfirm = false

  document.body.insertAdjacentHTML('beforeend', dialogTemplate)

  const dialogElement = document.body.lastElementChild
  dialogElement.addEventListener('click', (event) => {

    console.log(event.target.classList)

    const cancelClasses = ['cancel-button', 'outside-dialog']
    const isCanceled = cancelClasses
      .some((cls) => event.target.classList.contains(cls))

    const isConfirmed = event.target.classList.contains('delete-button')

    if (isCanceled) {
      dialogConfirm = false

    } else if (isConfirmed) {
      dialogConfirm = true
    }
  })

  return dialogConfirm
}