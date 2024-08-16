export function displayErrorMessage({ inputElement, isValid, errorContainer, errorMessage }) {

  inputElement.classList.toggle('invalid', !isValid)

  isValid === true
      ? errorContainer.textContent = ''
      : errorContainer.textContent = errorMessage
}

export function validateInput(inputElement, validator) {
  const inputValue = inputElement.value.trim()
  const isValid = validator(inputValue)
  return isValid
}

export const validators = {

  required: (value) => {
    if(value !== '') {
      return true
    }
    return false
  },

  email: (value) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
    if(emailRegex.test(value)) {
      return true
    }
    return false
  },

  minSixChar: (value) => {
    if(value.length >= 6) {
      return true
    }
    return false
  },

  compare: (a, b) => {
    if(a === b && a !== '') {
      return true
    }
    return false
  }
}