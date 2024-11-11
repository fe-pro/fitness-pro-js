const accessToken = localStorage.getItem('token')

export const workoutService = {

  createWorkout: async (workoutTitle) => {
    const url = 'http://127.0.0.1:3333/workout'
  
    const requestData = {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ title: workoutTitle })
    }
  
    try {
      const response = await fetch(url, requestData)
      
      if (!response.ok) {
        throw new Error('Erro ao criar treino.')
      }
  
      return response

    } catch {
      throw new Error('Falha interna, tente mais tarde.')
    }

  },
  fetchWorkouts: async () => {
    const url = 'http://127.0.0.1:3333/workout/list'

    const requestData = {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Cache-Control': 'no-cache'
      }
    }
  
    try {
  
      const response = await fetch(url, requestData)
  
      if (!response.ok) {
        throw new Error('Erro ao buscar lista de treinos.')
      }
  
      const { workouts } = await response.json()
      return workouts
  
    } catch {
      throw new Error('Falha interna, tente mais tarde.')
    }
  }
}