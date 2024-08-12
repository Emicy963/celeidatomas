document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const name = document.getElementById('name').value;
    const age = parseInt(document.getElementById('age').value, 10);

    const predefinedName = "Celeida Rebeca Luneva Tomás";
    const predefinedAge = 19;

    if (name === predefinedName && age === predefinedAge) {
        window.location.href = "/welcome";  // Redirecionar para uma página de boas-vindas
    } else {
        document.getElementById('error-message').innerText = "Nome ou idade incorretos.";
    }
});
