import { sanitizeHTML } from './utils.js'

export const templates = {

  renderEmptyList: () => `
    <div class="fallback-render">
      <img src="./assets/nothing-here-icon.svg">
      <span>Nada por aqui!</span>
    </div>
  `,

  renderExerciseTable: (exercises) => `
      <table>
        <thead>
            <tr>
              <th>Exercício</th>
              <th>Séries</th>
              <th>Rep.</th>
            </tr>
        </thead>

        <tbody>
            ${exercises.map(renderExerciseRow).join('')}
        </tbody>

    </table>
  `,

  renderToast: (type, message) => `
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
  `,

  renderWorkoutList: (workouts) => `
    <ul>
      ${workouts.map(renderWorkoutListItem).join('')}
    </ul>
  `
}

const toastType = {
  success: 'toast--success',
  error: 'toast--error'
}

function renderWorkoutListItem(workout) {

  const workoutSearchParams = new URLSearchParams({
    'workout-id': workout.id
  }).toString()

  return `
    <li class="workout-item" onclick="location.href='/workout-view.html?${workoutSearchParams}'">
      ${sanitizeHTML(workout.title)}
    </li>
  `
}

function renderExerciseRow(exercise) {
  return `
    <tr>
      <td>${sanitizeHTML(exercise.title)}</td>
      <td>${sanitizeHTML(exercise.sets.toString())}</td>
      <td>${sanitizeHTML(exercise.reps.toString())}</td>
    </tr>
  `
}