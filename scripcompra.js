document.getElementById('login-form').addEventListener('submit', function(event) {
    event.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const errorMessage = document.getElementById('error-message');
    
    if (username === "usuario@teste1" && password === "123456789") {
        errorMessage.style.color = 'green';
        errorMessage.innerText = 'Bem-vindo!';
        // Redirecionar para "acessoapp.html" após a mensagem
        window.location.href = 'acessoapp.html';
    } else {
        errorMessage.style.color = 'red';
        errorMessage.innerText = "Usuário inválido. Compre o acesso ao APP.";
    }
});
