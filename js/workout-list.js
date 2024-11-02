import { authService } from './services/auth.service.js';

authService.routeGuard()

const menuTemplate = `
  <div id="menuContainer" class="menu-container">
      <button id="closeMenuButton" class="close-menu-button">
          <img src="./assets/close-menu-icon.svg" alt="Botão fechar menu">
      </button>

      <div class="menu-content">
          <a href="/workout-list.html">Treinos</a>
          <a href="/create-workout.html">Novo treino</a>
          <a href="#" id="logoutMenuItem">Sair</a>
      </div>
  </div>
`

document.querySelector('#openMenuButton').addEventListener('click', handleOpenMenu)
document.querySelector('#backMenuButton').addEventListener('click', handleBackButton)

function handleOpenMenu() {

  document.body.insertAdjacentHTML('beforeend', menuTemplate)
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
  localStorage.removeItem('token')
  location.replace('/')
}

function handleBackButton() {
  history.back()
}