
const popup = document.querySelector('.auth-popup');
const loginBtn = document.querySelector('#loginBtn');
const registerBtn = document.querySelector('#registerBtn');
const closeBtn = document.querySelector('.close-btn');

const loginForm = document.querySelector('#loginForm');
const registerForm = document.querySelector('#registerForm');

const showLoginLink = document.querySelector('#showLoginForm');
const showRegisterLink = document.querySelector('#showRegisterForm');

function togglePopup() {
    if (popup.style.display === 'flex') {
        popup.style.display = 'none';
    } else {
        popup.style.display = 'flex';
    }
}

function showLogin() {
    loginForm.style.display = 'block';
    registerForm.style.display = 'none';
}

function showRegister() {
    loginForm.style.display = 'none';
    registerForm.style.display = 'block';
}

loginBtn.addEventListener('click', () => {
    showLogin();
    togglePopup();
});

registerBtn.addEventListener('click', () => {
    showRegister();
    togglePopup();
});

closeBtn.addEventListener('click', togglePopup);

showLoginLink.addEventListener('click', showLogin);
showRegisterLink.addEventListener('click', showRegister);

registerForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.querySelector('#registerEmail').value;
    const password = document.querySelector('#registerPassword').value;
    const confirm = document.querySelector('#registerConfirmPassword').value;

    if (!email || !password || !confirm) {
        alert('Please fill in all fields!');
        return;
    }

    if (password !== confirm) {
        alert('Passwords do not match!');
        return;
    }

    localStorage.setItem('username', email);
    localStorage.setItem('password', password);

    console.log('✅ Registration successful');
    console.log('name:', email);
    console.log('password:', password);

    togglePopup();
    alert('Registration successful!');
});

loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.querySelector('#loginEmail').value;
    const password = document.querySelector('#loginPassword').value;

    const storedUser = localStorage.getItem('username');
    const storedPass = localStorage.getItem('password');

    console.log('🔐 Login attempt:');
    console.log('name:', email);
    console.log('password:', password);

    if (email === storedUser && password === storedPass) {
        alert('Login successful!');
        togglePopup();
    } else {
        alert('Invalid credentials!');
    }
});
