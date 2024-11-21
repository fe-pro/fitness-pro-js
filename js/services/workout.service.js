import { http } from '../utils/http.js'

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

    const response = await http.get(`/exercise/${workoutId}/list`)

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

    const payload = {
      title: workoutTitleUpdated
    }

    const response = await http.patch(`/workout/${workoutId}`, payload)

    if (!response.ok) {
      throw new Error('Erro ao atualizar o título.')
    }

    return response
  },

  deleteWorkout: async (workoutId) => {

    const response = await http.delete(`/workout/${workoutId}`)

    if (!response.ok) {
      throw new Error('Erro ao excluir o treino.')
    }

    return response
  }
}