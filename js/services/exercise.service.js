import { http } from '../utils/http.js'

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

    const response = await http.delete(`/exercise/${exerciseId}`)

    if (!response.ok) {
      throw new Error('Erro ao deletar exercício.')
    }

    return response
  }
}