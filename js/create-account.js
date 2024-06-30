const form = document.querySelector('form')

form.addEventListener('submit', function(event) {
    event.preventDefault()

    const newUser = {
        name: document.querySelector('#name').value,
        email: document.querySelector('#email').value,
        password:  document.querySelector('#password').value
    }

    console.log(newUser)
})