import { apiUrl } from '../utils/constants.js'
import { http } from '../utils/http.js'

const accessToken = localStorage.getItem('token')

export const exerciseService = {

  createExercise: async (newExercise) => {

    const response = await http.post('/exercise', newExercise)

    if (!response.ok) {
      throw new Error('Erro ao adicionar exercício.')
    }

    return response
  },

  updateExercise: async ({id, title, sets, reps}) => {

    const payload = {
      title,
      sets,
      reps
    }

    const response = await http.put(`/exercise/${id}`, payload)

    if (!response.ok) {
      throw new Error('Erro ao atualizar o exercício.')
    }

    return response
  },
  
  deleteExercise: async (exerciseId) => {

    const requestData = {
      method: 'DELETE',
      headers: { 'Authorization': `Bearer ${accessToken}` }
    }

    const response = await fetch(`${apiUrl}/exercise/${exerciseId}`, requestData)

    if (!response.ok) {
      throw new Error('Erro ao deletar exercício.')
    }

    return response
  }
}