import { apiUrl } from '../utils/constants.js'

export const http = {

  post: async (endpoint, payload) => {

    const requestData ={
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
    }

    const response = await fetch(`${apiUrl}${endpoint}`, requestData)
    return response
  }
}