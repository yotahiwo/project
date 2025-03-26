
const authPopup = document.querySelector('.auth-popup');
const loginButton = document.querySelector('#loginBtn');
const registerButton = document.querySelector('#registerBtn');
const closeButton = document.querySelector('.close-btn');

const loginForm = document.querySelector('#loginForm');
const registerForm = document.querySelector('#registerForm');

function togglePopup() {
    authPopup.style.display = (authPopup.style.display === 'flex') ? 'none' : 'flex';
}

loginButton.addEventListener('click', () => {
    loginForm.style.display = 'block';
    registerForm.style.display = 'none';
    togglePopup();
});

registerButton.addEventListener('click', () => {
    loginForm.style.display = 'none';
    registerForm.style.display = 'block';
    togglePopup();
});

closeButton.addEventListener('click', togglePopup);

registerForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.querySelector('#registerEmail').value;
    const password = document.querySelector('#registerPassword').value;
    const confirmPassword = document.querySelector('#registerConfirmPassword').value;
    
    if (email && password && confirmPassword) {
        if (password === confirmPassword) {
            localStorage.setItem('username', email);
            localStorage.setItem('password', password);
            alert('Registration successful!');
            togglePopup();
        } else {
            alert('Passwords do not match!');
        }
    } else {
        alert('Please fill in all fields!');
    }
});

loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.querySelector('#loginEmail').value;
    const password = document.querySelector('#loginPassword').value;
    
    const storedUsername = localStorage.getItem('username');
    const storedPassword = localStorage.getItem('password');
    
    if (email === storedUsername && password === storedPassword) {
        alert('Login successful!');
        togglePopup();
    } else {
        alert('Invalid credentials!');
    }
});

document.getElementById('showLoginForm').addEventListener('click', function() {
    loginForm.style.display = 'block';
    registerForm.style.display = 'none';
});

document.getElementById('showRegisterForm').addEventListener('click', function() {
    loginForm.style.display = 'none';
    registerForm.style.display = 'block';
});
registerForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const username = document.querySelector('#registerEmail').value;
    const password = document.querySelector('#registerPassword').value;
    
    if (username && password) {
        localStorage.setItem('username', username);
        localStorage.setItem('password', password);
        
        console.log('Registration successful!');
        console.log('Saved Username:', username);
        console.log('Saved Password:', password);
        
        alert('Registration successful!');
        togglePopup();
    } else {
        alert('Please fill in both fields!');
    }
});
loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const username = document.querySelector('#loginEmail').value;
    const password = document.querySelector('#loginPassword').value;
    
    const storedUsername = localStorage.getItem('username');
    const storedPassword = localStorage.getItem('password');
    
    console.log('Login attempt:');
    console.log('Entered Username:', username);
    console.log('Entered Password:', password);
    console.log('Stored Username:', storedUsername);
    console.log('Stored Password:', storedPassword);
    
    if (username === storedUsername && password === storedPassword) {
        alert('Login successful!');
        togglePopup();
    } else {
        alert('Invalid credentials!');
    }
});
