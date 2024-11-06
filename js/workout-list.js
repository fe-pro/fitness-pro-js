import { authService } from './services/auth.service.js'
import './utils/header.js'

authService.routeGuard()

document.querySelector('#createWorkoutButton').addEventListener('click', handleNavigateToCreateWorkout)

function handleNavigateToCreateWorkout() {
  location.href = `/create-workout.html`
}