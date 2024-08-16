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

// isValid
//     ? errorContainer.textContent = ''
//     : errorContainer.textContent = errorMessage

// export const validators = {

//   required: (value) => {
//     if(value !== '') {
//       return true
//     }
//     return false
//   },

//   email: (value) => {
//     const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
//     if(emailRegex.test(value)) {
//       return true
//     }
//     return false
//   },

//   minSixChar: (value) => {
//     if(value.length >= 6) {
//       return true
//     }
//     return false
//   },

//   compare: (a, b) => {
//     if(a === b && a !== '') {
//       return true
//     }
//     return false
//   }
// }