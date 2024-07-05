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

    if (response.ok) {
        const data = await response.json()
        location.replace('/workout-list.html')
    }

    if (response.status === 400) {
        console.error('Usuário ou senha inválido.')
    } else if (response.ok === false) {
        console.error('Erro ao efetuar login.')
    }
})