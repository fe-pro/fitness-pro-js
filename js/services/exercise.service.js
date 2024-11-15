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
  }
}