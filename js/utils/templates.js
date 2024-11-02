export const templates = {


  renderToast: () => `
    <div class="toast-container">
      <div class="toast-border ${toastType[type]}"></div>
      <span>${message}</span>
    </div>
  `,

  renderMenu: () => `
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

}

export function renderToast(type, message) {
  return 
}

const toastType = {
  success: 'toast--success',
  error: 'toast--error'
}