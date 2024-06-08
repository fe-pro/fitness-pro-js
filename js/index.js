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
    }

    /**
     * Login
     * Criar conta
     * Criar treino
     * Criar exercício
     */

    await fetch(url, requestData)

})