export function displayErrorMessage({ inputElement, isValid, errorContainer, errorMessage }) {

  inputElement.classList.toggle('invalid', !isValid)

  isValid === true
      ? errorContainer.textContent = ''
      : errorContainer.textContent = errorMessage
}

export function validateName(nameInput) {

  const isNameValid = validators.required(nameInput.value.trim())
  return isNameValid
}

export function validateEmail(emailInput) {

  const isEmailValid = validators.email(emailInput.value.trim())
  return isEmailValid
}

export function validatePassword(passwordInput) {

  const isPasswordValid = validators.minSixChar(passwordInput.value.trim())
  return isPasswordValid
}

export function validateConfirmPassword(passwordInput, confirmPasswordInput) {
  
  const isPasswordEqual = validators.compare(passwordInput.value, confirmPasswordInput.value)
  return isPasswordEqual
}

const validators = {

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
    if(a === b && a.trim() !== '') {
      return true
    }
    return false
  }
}