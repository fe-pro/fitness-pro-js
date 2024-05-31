const form = document.querySelector('form')

form.addEventListener('submit', function(event) {
    event.preventDefault()

    const email = document.querySelector('#email')
    const password = document.querySelector('#password')

    console.dir(email.value)
    console.dir(password.value)
})