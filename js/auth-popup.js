const popup = document.querySelector('.auth-popup');
const loginBtn = document.querySelector('#loginBtn');
const registerBtn = document.querySelector('#registerBtn');
const closeBtn = document.querySelector('.close-btn');
const loginForm = document.querySelector('#loginForm');
const registerForm = document.querySelector('#registerForm');
const showLoginLink = document.querySelector('#showLoginForm');
const showRegisterLink = document.querySelector('#showRegisterForm');

// Проверка авторизации
function checkAuth() {
    return localStorage.getItem('isLoggedIn') === 'true';
}

// Обновление состояния интерфейса
function updateAuthState() {
    const isLoggedIn = checkAuth();
    if (isLoggedIn) {
        const username = localStorage.getItem('username');
        loginBtn.textContent = `Logout (${username})`;
        registerBtn.style.display = 'none';
    } else {
        loginBtn.textContent = 'Login';
        registerBtn.style.display = 'block';
    }
}

// Переключение попапа
function togglePopup() {
    popup.style.display = popup.style.display === 'flex' ? 'none' : 'flex';
}

// Переключение между формами
function showLogin() {
    loginForm.style.display = 'block';
    registerForm.style.display = 'none';
}

function showRegister() {
    loginForm.style.display = 'none';
    registerForm.style.display = 'block';
}

// Обработчики событий для кнопок авторизации
loginBtn.addEventListener('click', function(e) {
    if (checkAuth()) {
        // Выход из системы
        localStorage.removeItem('isLoggedIn');
        localStorage.removeItem('currentUserId');
        updateAuthState();
        return;
    }
    showLogin();
    togglePopup();
});

registerBtn.addEventListener('click', function() {
    showRegister();
    togglePopup();
});

// Остальные обработчики
closeBtn.addEventListener('click', togglePopup);
showLoginLink.addEventListener('click', showLogin);
showRegisterLink.addEventListener('click', showRegister);

// Обработка формы регистрации
registerForm.addEventListener('submit', function(e) {
    e.preventDefault();
    const email = document.querySelector('#registerEmail').value;
    const password = document.querySelector('#registerPassword').value;
    const confirm = document.querySelector('#registerConfirmPassword').value;

    if (!email || !password || !confirm) {
        alert('Please fill all fields!');
        return;
    }

    if (password !== confirm) {
        alert('Passwords do not match!');
        return;
    }

    localStorage.setItem('username', email);
    localStorage.setItem('password', password);
    localStorage.setItem('currentUserId', email);
    localStorage.setItem('isLoggedIn', 'true');

    alert('Registration successful!');
    togglePopup();
    updateAuthState();
});

// Обработка формы входа
loginForm.addEventListener('submit', function(e) {
    e.preventDefault();
    const email = document.querySelector('#loginEmail').value;
    const password = document.querySelector('#loginPassword').value;
    const storedUser = localStorage.getItem('username');
    const storedPass = localStorage.getItem('password');

    if (email === storedUser && password === storedPass) {
        localStorage.setItem('currentUserId', email);
        localStorage.setItem('isLoggedIn', 'true');
        alert('Login successful!');
        togglePopup();
        updateAuthState();
    } else {
        alert('Invalid credentials!');
    }
});

// Инициализация
updateAuthState();
showLogin();