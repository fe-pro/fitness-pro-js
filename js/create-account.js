import { authService } from './services/auth.service.js'

const form = document.querySelector('form')

authService.routeGuard()

form.addEventListener('submit', async function(event) {
    event.preventDefault()

    const newUser = {
        name: document.querySelector('input[name="name"]').value,
        email: document.querySelector('input[name="email"]').value,
        password:  document.querySelector('input[name="password"]').value
    }

    console.log(newUser)

    // Rota: /users

    const url = 'http://127.0.0.1:3333/users'

    const requestData ={
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newUser)
    }

    const response = await fetch(url, requestData)
    const data = await response.json()
    console.log(data)
})