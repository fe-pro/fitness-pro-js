const form = document.querySelector('form')

form.addEventListener('submit', function(event) {
    event.preventDefault()

    const newUser = {
        name: document.querySelector('input[name="name"]').value,
        email: document.querySelector('input[name="email"]').value,
        password:  document.querySelector('input[name="password"]').value
    }

    console.log(newUser)
})