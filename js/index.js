const form = document.querySelector('form')

form.addEventListener('submit', function(event) {
    event.preventDefault()

    const user = {
        email: document.querySelector('#email').value,
        password: document.querySelector('#password').value
    }

    console.log(user)
    console.log(
        JSON.stringify(user)
    )

    // JavaScript Object Notation = JSON

    /**
     * JSON é um formato de texto padrão para
     * representar dados estruturados, usado
     * principalmente para a troca de dados entre um
     * servidor e uma aplicação web.
     */

    // enviarParaOBackEnd(user)
})