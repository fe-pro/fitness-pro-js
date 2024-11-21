import { apiUrl } from '../utils/constants.js'
import { http } from '../utils/http.js'

const accessToken = localStorage.getItem('token')

export const workoutService = {

  createWorkout: async (workoutTitle) => {

    const payload = {
       title: workoutTitle
    }

    const response = await http.post('/workout', payload)
    
    if (!response.ok) {
      throw new Error('Erro ao criar treino.')
    }

    return response
  },

  fetchWorkouts: async () => {

    const response = await http.get('/workout/list')

    if (!response.ok) {
      throw new Error('Erro ao buscar lista de treinos.')
    }

    const { workouts } = await response.json()
    return workouts
  },

  getWorkoutById: async (workoutId) => {
    const requestData = {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Cache-Control': 'no-cache'
      }
    }

    const response = await fetch(`${apiUrl}/exercise/${workoutId}/list`, requestData)

    if(response.status === 404) {
      throw new Error(404)
    }

    if(!response.ok) {
      throw new Error('Erro ao buscar dados do treino.')
    }

    const workout = await response.json()
    return workout
  },

  updateWorkoutTitle: async (workoutId, workoutTitleUpdated) => {
    const requestData = {
      method: 'PATCH',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ title: workoutTitleUpdated })
    }

    const response = await fetch(`${apiUrl}/workout/${workoutId}`, requestData)

    if (!response.ok) {
      throw new Error('Erro ao atualizar o título.')
    }

    return response
  },

  deleteWorkout: async (workoutId) => {

    const requestData = {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${accessToken}`
      }
    }

    const response = await fetch(`${apiUrl}/workout/${workoutId}`, requestData)

    if (!response.ok) {
      throw new Error('Erro ao excluir o treino.')
    }

    return response
  }
}