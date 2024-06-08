const form = document.querySelector('form')

form.addEventListener('submit', async function(event) {
    event.preventDefault()

    const user = {
        email: document.querySelector('#email').value,
        password: document.querySelector('#password').value
    }

    const url = 'http://127.0.0.1:3333/sessions'

    const requestData = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
    }

    /**
     * Login
     * Criar conta
     * Criar treino
     * Criar exercício
     */

    const response = await fetch(url, requestData)
    const data = await response.json()

    console.log(data)

})