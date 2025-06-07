// Получаем элементы DOM
const popup = document.querySelector('.auth-popup'); // Основное модальное окно авторизации
const loginBtn = document.querySelector('#loginBtn'); // Кнопка входа/выхода
const registerBtn = document.querySelector('#registerBtn'); // Кнопка регистрации
const closeBtn = document.querySelector('.close-btn'); // Кнопка закрытия попапа
const loginForm = document.querySelector('#loginForm'); // Форма входа
const registerForm = document.querySelector('#registerForm'); // Форма регистрации
const showLoginLink = document.querySelector('#showLoginForm'); // Ссылка "Войти"
const showRegisterLink = document.querySelector('#showRegisterForm'); // Ссылка "Регистрация"

// Инициализация базы пользователей в localStorage
if (!localStorage.getItem('users')) {
    localStorage.setItem('users', JSON.stringify([])); // Создаем пустой массив пользователей
}

// Проверка авторизации пользователя
function checkAuth() {
    return localStorage.getItem('isLoggedIn') === 'true'; // Возвращает true/false
}

// Обновление интерфейса в зависимости от статуса авторизации
function updateAuthState() {
    const isLoggedIn = checkAuth();
    if (isLoggedIn) {
        const email = localStorage.getItem('currentUserEmail');
        loginBtn.textContent = `Logout (${email})`; // Показываем email при входе
        registerBtn.style.display = 'none'; // Скрываем кнопку регистрации
    } else {
        loginBtn.textContent = 'Login'; // Стандартный текст кнопки
        registerBtn.style.display = 'block'; // Показываем кнопку регистрации
    }
}

// Переключение видимости попапа
function togglePopup() {
    popup.style.display = popup.style.display === 'flex' ? 'none' : 'flex';
}

// Показать форму входа
function showLogin() {
    loginForm.style.display = 'block';
    registerForm.style.display = 'none';
}

// Показать форму регистрации
function showRegister() {
    loginForm.style.display = 'none';
    registerForm.style.display = 'block';
}

// Обработчик кнопки входа/выхода
loginBtn.addEventListener('click', function() {
    if (checkAuth()) {
        // Выход из системы - очищаем данные
        localStorage.removeItem('isLoggedIn');
        localStorage.removeItem('currentUserEmail');
        localStorage.removeItem('currentUserId');
        updateAuthState();
        return;
    }
    showLogin();
    togglePopup();
});

// Обработчик кнопки регистрации
registerBtn.addEventListener('click', function() {
    showRegister();
    togglePopup();
});

// Обработчики вспомогательных элементов
closeBtn.addEventListener('click', togglePopup); // Закрытие попапа
showLoginLink.addEventListener('click', showLogin); // Переключение на форму входа
showRegisterLink.addEventListener('click', showRegister); // Переключение на регистрацию

// Обработка отправки формы регистрации
registerForm.addEventListener('submit', function(e) {
    e.preventDefault(); // Отменяем стандартное поведение

    // Получаем значения полей
    const email = document.querySelector('#registerEmail').value.trim();
    const password = document.querySelector('#registerPassword').value;
    const confirm = document.querySelector('#registerConfirmPassword').value;

    // Валидация полей
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

    // Работа с базой пользователей
    const users = JSON.parse(localStorage.getItem('users'));

    // Проверка существования пользователя
    if (users.some(user => user.email === email)) {
        alert('User with this email already exists!');
        return;
    }

    // Добавление нового пользователя
    users.push({ email, password });
    localStorage.setItem('users', JSON.stringify(users));

    // Автоматический вход после регистрации
    localStorage.setItem('isLoggedIn', 'true');
    localStorage.setItem('currentUserEmail', email);
    localStorage.setItem('currentUserId', email);

    alert('Registration successful! You are now logged in.');
    togglePopup();
    updateAuthState();
});

// Обработка отправки формы входа
loginForm.addEventListener('submit', function(e) {
    e.preventDefault();
    const email = document.querySelector('#loginEmail').value.trim();
    const password = document.querySelector('#loginPassword').value;
    const users = JSON.parse(localStorage.getItem('users'));

    // Поиск пользователя в базе
    const user = users.find(u => u.email === email && u.password === password);

    if (user) {
        // Сохранение данных авторизации
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('currentUserEmail', email);
        localStorage.setItem('currentUserId', email);

        alert('Login successful!');
        togglePopup();
        updateAuthState();
    } else {
        alert('Invalid email or password!');
    }
});

// Инициализация при загрузке страницы
updateAuthState(); // Обновляем интерфейс
showLogin(); // Показываем форму входа по умолчанию