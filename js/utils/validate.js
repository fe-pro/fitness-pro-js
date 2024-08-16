export function displayErrorMessage({ inputElement, isValid, errorContainer, errorMessage }) {

  inputElement.classList.toggle('invalid', !isValid)

  isValid === true
      ? errorContainer.textContent = ''
      : errorContainer.textContent = errorMessage
}

export function validateName(nameInput) {

  const isNameValid = nameInput.value.trim() !== '' ? true : false
  return isNameValid
}

export function validateEmail(emailInput) {

  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
  const isEmailValid = emailRegex.test(emailInput.value.trim())

  return isEmailValid
}

export function validatePassword(passwordInput) {

  const isPasswordValid = passwordInput.value.trim().length >= 6 ? true : false
  return isPasswordValid
}

export function validateConfirmPassword(passwordInput, confirmPasswordInput) {
  
  const isPasswordEqual = (passwordInput.value === confirmPasswordInput.value && passwordInput.value.trim() !== '') ? true : false
  return isPasswordEqual
}