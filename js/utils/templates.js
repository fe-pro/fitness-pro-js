export function renderToast(type, message) {
  return `
    <div class="toast-container">
      <div class="toast-border ${toastType[type]}"></div>
      <span>${message}</span>
    </div>
  `
}

const toastType = {
  success: 'toast--success',
  error: 'toast--error'
}