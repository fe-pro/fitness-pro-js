import { authService } from '../services/auth.service.js'
import { templates } from './templates.js'

document.querySelector('#openMenuButton').addEventListener('click', handleOpenMenu)
document.querySelector('#backMenuButton').addEventListener('click', handleBackButton)

function handleOpenMenu() {

  document.body.insertAdjacentHTML('beforeend', templates.renderMenu())
  const menuContainer = document.querySelector('#menuContainer')

  requestAnimationFrame(() => menuContainer.classList.add('active'))

  document.querySelector('#closeMenuButton').addEventListener('click', handleCloseMenu)
  document.querySelector('#logoutMenuItem').addEventListener('click', handleLogout)
}

function handleCloseMenu() {
  const menuContainer = document.querySelector('#menuContainer')
  menuContainer.classList.remove('active')
  menuContainer.addEventListener('transitionend', () => menuContainer.remove())
}

function handleLogout() {
  authService.logout()
  location.replace('/')
}

function handleBackButton() {
  history.back()
}