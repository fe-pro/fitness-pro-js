import { apiUrl } from '../utils/constants.js'

const accessToken = localStorage.getItem('token')

export const exerciseService = {

  createExercise: async (newExercise) => {

    const requestData = {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newExercise)
    }

    const response = await fetch(`${apiUrl}/exercise`, requestData)

    if (!response.ok) {
      throw new Error('Erro ao adicionar exercício.')
    }

    return response
  },
  updateExercise: async ({id, title, sets, reps}) => {

    const requestBody = {
      title,
      sets,
      reps
    }

    const requestData = {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(requestBody)
    }

    const response = await fetch(`${apiUrl}/exercise/${id}`, requestData)

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