const choiceScreen = document.getElementById('choiceScreen');
const formContainer = document.getElementById('formContainer');
const loginContainer = document.getElementById('loginContainer');
const successScreen = document.getElementById('successScreen');
const welcomeScreen = document.getElementById('welcomeScreen');
const registerButton = document.getElementById('registerButton');
const loginButton = document.getElementById('loginButton');
const backToChoiceButton = document.getElementById('backToChoiceButton');
const backToChoiceButtonLogin = document.getElementById('backToChoiceButtonLogin');
const logoutButton = document.getElementById('logoutButton');
const clearFormButton = document.getElementById('clearFormButton');  
const userForm = document.getElementById('userForm');
const loginForm = document.getElementById('loginForm');
const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const loginEmailInput = document.getElementById('loginEmail');
const loginPasswordInput = document.getElementById('loginPassword');
const userNameDisplay = document.getElementById('userName');
const loginErrorMessage = document.getElementById('loginErrorMessage');


let users = JSON.parse(localStorage.getItem('users')) || {};


registerButton.addEventListener('click', () => {
    choiceScreen.style.display = 'none';
    formContainer.style.display = 'block';
});

loginButton.addEventListener('click', () => {
    choiceScreen.style.display = 'none';
    loginContainer.style.display = 'block';
});

backToChoiceButton.addEventListener('click', () => {
    formContainer.style.display = 'none';
    choiceScreen.style.display = 'block';
});

backToChoiceButtonLogin.addEventListener('click', () => {
    loginContainer.style.display = 'none';
    choiceScreen.style.display = 'block';
});

logoutButton.addEventListener('click', () => {
    welcomeScreen.style.display = 'none';
    choiceScreen.style.display = 'block';
});

// Limpar os campos do formulário
clearFormButton.addEventListener('click', () => {
    userForm.reset(); 
});

// Registro de usuários com validação da senha
userForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const name = nameInput.value.trim();
    const email = emailInput.value.trim();
    const password = passwordInput.value.trim();
    const confirmPassword = document.getElementById('confirmPassword').value.trim();
    const avatar = document.getElementById('avatar').files[0];

    if (password !== confirmPassword) {
        alert('As senhas não coincidem!');
        return;
    }

    // Verifica se o usuário já está registrado
    if (users[email]) {
        alert('Este email já está registrado!');
        return;
    }

    const reader = new FileReader();
    reader.onload = () => {
        users[email] = { name, password, avatar: reader.result };
        // Salva os usuários no localStorage
        localStorage.setItem('users', JSON.stringify(users));
        alert('Cadastro realizado com sucesso!');
        switchScreen(formContainer, choiceScreen);
        userForm.reset();
    };

    if (avatar) {
        reader.readAsDataURL(avatar);
    } else {
        users[email] = { name, password, avatar: '' };
        localStorage.setItem('users', JSON.stringify(users));
        alert('Cadastro realizado com sucesso!');
        switchScreen(formContainer, choiceScreen);
        userForm.reset();
    }
});

// Login de usuários
loginForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const email = loginEmailInput.value.trim();
    const password = loginPasswordInput.value.trim();

    // Verifica se o usuário existe e se a senha está correta
    if (users[email] && users[email].password === password) {
        userNameDisplay.textContent = users[email].name;
        // Exibe o avatar ou um padrão
        document.getElementById('userAvatar').src = users[email].avatar || 'default-avatar.png';
        switchScreen(loginContainer, welcomeScreen);
        loginForm.reset();
    } else {
        alert('Email ou senha inválidos!');
    }
});

// Navegação entre telas
registerButton.addEventListener('click', () => switchScreen(choiceScreen, formContainer));
loginButton.addEventListener('click', () => switchScreen(choiceScreen, loginContainer));
backToChoiceButton.addEventListener('click', () => switchScreen(formContainer, choiceScreen));
backToChoiceButtonLogin.addEventListener('click', () => switchScreen(loginContainer, choiceScreen));
logoutButton.addEventListener('click', () => switchScreen(welcomeScreen, choiceScreen));

// Função para trocar de tela com animação
function switchScreen(from, to) {
    from.style.display = 'none';
    to.style.display = 'block';
}

// Exibir/ocultar senha
function toggleVisibility(input, toggle) {
    toggle.addEventListener('click', () => {
        input.type = input.type === 'password' ? 'text' : 'password';
    });
}

toggleVisibility(passwordInput, document.getElementById('togglePassword'));
toggleVisibility(document.getElementById('confirmPassword'), document.getElementById('toggleConfirmPassword'));
toggleVisibility(document.getElementById('loginPassword'), document.getElementById('toggleLoginPassword'));
