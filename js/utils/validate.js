export const validate = {

  validateInput: (inputElement, validator) => {
    const inputValue = inputElement.value.trim()
    const isValid = validator(inputValue)
    return isValid
  },
  displayErrorMessage: ({ inputElement, isValid, errorContainer, errorMessage }) => {
    inputElement.classList.toggle('invalid', !isValid)
    errorContainer.textContent = isValid ? '' : errorMessage
  }
}

export const validators = {

  required: (value) => value !== '',
  email: (value) => /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value),
  minSixChar: (value) => value.length >= 6,
  compare: (a, b) => a === b && a !== ''
}