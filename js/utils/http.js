import { apiUrl } from '../utils/constants.js'
const accessToken = localStorage.getItem('token')

export const http = {

  post: async (endpoint, payload, { useAuthorization = true } = { }) => {

    const headers = {
      'Content-Type': 'application/json'
    }

    if (useAuthorization) {
      headers['Authorization'] = `Bearer ${accessToken}`
    }

    const requestData = {
        method: 'POST',
        headers,
        body: JSON.stringify(payload)
    }

    const response = await fetch(`${apiUrl}${endpoint}`, requestData)
    return response
  }
}