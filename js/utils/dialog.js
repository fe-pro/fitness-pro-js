import { templates } from './templates.js'

/**
 * Cria e exibe um diálogo de confirmação para remover um item.
 * @param {string} headerMessage - A mensagem do cabeçalho a ser exibida.
 * @param {string} titleItemToBeRemove - O título do item a ser removido.
 * @returns {Promise<boolean>} Resolve com `true` se confirmado, `false` se cancelado.
 */
export async function showConfirmDialog(headerMessage, titleItemToBeRemove) {

  document.body.insertAdjacentHTML('beforeend', templates.renderConfirmDialog(headerMessage, titleItemToBeRemove))

  return new Promise((resolve) => {

    const dialogElement = document.body.lastElementChild
    dialogElement.addEventListener('click', (event) => {

      const cancelClasses = ['cancel-button', 'outside-dialog']
      const isCanceled = cancelClasses
        .some((cls) => event.target.classList.contains(cls))

      const isConfirmed = event.target.classList.contains('delete-button')

      if (isCanceled) {
        dialogElement.remove()
        resolve(false)

      } else if (isConfirmed) {
        dialogElement.remove()
        resolve(true)
      }
  })
  })  
}