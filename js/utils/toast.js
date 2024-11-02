import { templates } from './templates.js'

export function toast(type, message) {

  document.body.insertAdjacentHTML('beforeend', templates.renderToast(type, message))

  setTimeout(() => {
    document.body.lastElementChild.remove()
  }, 2500)
}