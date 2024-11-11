const loginForm = document.getElementById('login-form');
const usernameField = document.getElementById('username');
const passwordField = document.getElementById('password');
const passwordError = document.getElementById('password-error');

loginForm.addEventListener('submit', function(event) {
    event.preventDefault(); // Previne o envio do formulário padrão
    
    // Captura o valor inserido nos campos
    const username = usernameField.value;
    const password = passwordField.value;
    
    // Envia as credenciais para o backend
    fetch('http://localhost:5000/login', {  // A URL do backend pode ser ajustada
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username: username, password: password })
    })
    .then(response => {
        // Verifica se a resposta foi bem-sucedida
        if (!response.ok) {
            throw new Error('Erro na requisição');
        }
        return response.json(); // Faz o parse da resposta JSON
    })
    .then(data => {
        // Verifica a resposta do backend
        if (data.status === 'success') {
            // Redireciona para a página de testes se o login for bem-sucedido
            window.location.href = '/Testes/test.html';
        } else {
            // Exibe erro se o login falhar
            passwordError.textContent = data.message;
            passwordError.style.color = 'red';
        }
    })
    .catch(error => {
        console.error('Erro:', error);
        passwordError.textContent = 'Ocorreu um erro ao tentar fazer o login. Tente novamente mais tarde.';
        passwordError.style.color = 'red';
    });
});
