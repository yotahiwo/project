// Получаем элементы DOM
const popup = document.querySelector('.auth-popup');
const loginBtn = document.querySelector('#loginBtn');
const registerBtn = document.querySelector('#registerBtn');
const closeBtn = document.querySelector('.close-btn');
const loginForm = document.querySelector('#loginForm');
const registerForm = document.querySelector('#registerForm');
const showLoginLink = document.querySelector('#showLoginForm');
const showRegisterLink = document.querySelector('#showRegisterForm');

// Инициализация базы пользователей
if (!localStorage.getItem('users')) {
    localStorage.setItem('users', JSON.stringify([]));
}

// Проверка авторизации
function checkAuth() {
    return localStorage.getItem('isLoggedIn') === 'true';
}

// Обновление интерфейса
function updateAuthState() {
    const isLoggedIn = checkAuth();
    if (isLoggedIn) {
        const email = localStorage.getItem('currentUserEmail');
        loginBtn.textContent = `Logout (${email})`;
        registerBtn.style.display = 'none';
    } else {
        loginBtn.textContent = 'Login';
        registerBtn.style.display = 'block';
    }
}

// Управление попапом
function togglePopup() {
    popup.style.display = popup.style.display === 'flex' ? 'none' : 'flex';
}

function showLogin() {
    loginForm.style.display = 'block';
    registerForm.style.display = 'none';
}

function showRegister() {
    loginForm.style.display = 'none';
    registerForm.style.display = 'block';
}

// Обработчики кнопок
loginBtn.addEventListener('click', function() {
    if (checkAuth()) {
        // Выход из системы
        localStorage.removeItem('isLoggedIn');
        localStorage.removeItem('currentUserEmail');
        localStorage.removeItem('currentUserId'); // Добавили очистку ID
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

closeBtn.addEventListener('click', togglePopup);
showLoginLink.addEventListener('click', showLogin);
showRegisterLink.addEventListener('click', showRegister);

// Обработка регистрации
registerForm.addEventListener('submit', function(e) {
    e.preventDefault();
    const email = document.querySelector('#registerEmail').value.trim();
    const password = document.querySelector('#registerPassword').value;
    const confirm = document.querySelector('#registerConfirmPassword').value;

    // Валидация
    if (!email || !password || !confirm) {
        alert('Please fill all fields!');
        return;
    }

    if (password !== confirm) {
        alert('Passwords do not match!');
        return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        alert('Please enter a valid email address!');
        return;
    }

    // Работа с базой
    const users = JSON.parse(localStorage.getItem('users'));

    if (users.some(user => user.email === email)) {
        alert('User with this email already exists!');
        return;
    }

    // Добавляем пользователя
    users.push({ email, password });
    localStorage.setItem('users', JSON.stringify(users));

    // Автовход после регистрации
    localStorage.setItem('isLoggedIn', 'true');
    localStorage.setItem('currentUserEmail', email);
    localStorage.setItem('currentUserId', email); // Добавили сохранение ID

    alert('Registration successful! You are now logged in.');
    togglePopup();
    updateAuthState();
});

// Обработка входа (ОБНОВЛЕННЫЙ КОД)
loginForm.addEventListener('submit', function(e) {
    e.preventDefault();
    const email = document.querySelector('#loginEmail').value.trim();
    const password = document.querySelector('#loginPassword').value;
    const users = JSON.parse(localStorage.getItem('users'));

    const user = users.find(u => u.email === email && u.password === password);

    if (user) {
        // Сохраняем все необходимые ключи
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('currentUserEmail', email);
        localStorage.setItem('currentUserId', email); // Ключ для корзины

        alert('Login successful!');
        togglePopup();
        updateAuthState();
    } else {
        alert('Invalid email or password!');
    }
});

// Инициализация
updateAuthState();
showLogin();