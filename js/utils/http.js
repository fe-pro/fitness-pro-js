import { base_url } from '../utils/constants.js'
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

    const response = await makeFetch(endpoint, requestData)
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
  
    const response = await makeFetch(endpoint, requestData)
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

    const response = await makeFetch(endpoint, requestData)
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

    const response = await makeFetch(endpoint, requestData)
    return response
  },

  delete: async (endpoint, { useAuthorization = true } = { }) => {

    const headers = { }

    if (useAuthorization) {
      headers['Authorization'] = `Bearer ${accessToken}`
    }

    const requestData = {
      method: 'DELETE',
      headers
    }

    const response = await makeFetch(endpoint, requestData)
    return response
  }
}

async function makeFetch(endpoint, requestData) {

  try {
    const response = await fetch(`${base_url}${endpoint}`, requestData)
    return response

  } catch {
    throw new Error('Falha interna, tente mais tarde.')
  }
}