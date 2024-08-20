export function toast(message) {

  const toastTemplate = `
    <div class="toast-container">
      <div class="toast-border"></div>
      <span>${message}</span>
    </div>
  `

  document.body.insertAdjacentHTML('beforeend', toastTemplate)

  setTimeout(() => {
    document.body.lastElementChild.remove()
  }, 2500)
}