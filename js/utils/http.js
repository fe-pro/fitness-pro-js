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
  },

  get: async (endpoint, { useAuthorization = true } = { }) => {

    const headers = {
      'Cache-Control': 'no-cache'
    }

    if (useAuthorization) {
      headers['Authorization'] = `Bearer ${accessToken}`
    }

    const requestData = {
      method: 'GET',
      headers,
    }
  
    const response = await fetch(`${apiUrl}${endpoint}`, requestData)
    return response
  },

  put: async (endpoint, payload, { useAuthorization = true } = { }) => {

    const headers = {
      'Content-Type': 'application/json'
    }

    if (useAuthorization) {
      headers['Authorization'] = `Bearer ${accessToken}`
    }

    const requestData = {
      method: 'PUT',
      headers,
      body: JSON.stringify(payload)
    }

    const response = await fetch(`${apiUrl}${endpoint}`, requestData)
    return response
  },

  patch: async (endpoint, payload, { useAuthorization = true } = { }) => {

    const headers = {
      'Content-Type': 'application/json'
    }

    if (useAuthorization) {
      headers['Authorization'] = `Bearer ${accessToken}`
    }

    const requestData = {
      method: 'PATCH',
      headers,
      body: JSON.stringify(payload)
    }

    const response = await fetch(`${apiUrl}${endpoint}`, requestData)
    return response
  }
}