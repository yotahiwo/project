document.addEventListener("DOMContentLoaded", function () {
    const categories = document.querySelectorAll(".category");
    const products = document.querySelectorAll(".product");
    const productSection = document.querySelector(".products");
    const categorySection = document.querySelector(".product-categories");
    const backButton = document.getElementById("backButton"); 

    categories.forEach((category) => {
        category.addEventListener("click", function () {
            const selectedCategory = this.getAttribute("data-category");

            backButton.style.display = "block";

            categorySection.style.opacity = "0";
            setTimeout(() => {
                categorySection.style.display = "none";
            }, 300);

            products.forEach((product) => {
                product.style.display = "none";
                product.style.opacity = "0";
            });

            setTimeout(() => {
                products.forEach((product) => {
                    if (product.getAttribute("data-category") === selectedCategory) {
                        product.style.display = "flex";
                        setTimeout(() => {
                            product.style.opacity = "1";
                        }, 100);
                    }
                });
            }, 300);
        });
    });

    backButton.addEventListener("click", function () {

        backButton.style.display = "none";


        categorySection.style.display = "flex";
        setTimeout(() => {
            categorySection.style.opacity = "1";
        }, 100);


        products.forEach((product) => {
            product.style.opacity = "0";
            setTimeout(() => {
                product.style.display = "none";
            }, 300);
        });
    });
});

document.addEventListener("DOMContentLoaded", function () {

    const loginBtn = document.getElementById("loginBtn");
    const registerBtn = document.getElementById("registerBtn");
    const authPopup = document.getElementById("authPopup");
    const closePopup = document.getElementById("closePopup");
    const successPopup = document.getElementById("successPopup");
    const closeSuccessPopup = document.getElementById("closeSuccessPopup");
    const authForm = document.getElementById("authForm");
    const authSubmit = document.getElementById("authSubmit");
    const errorMessage = document.getElementById("errorMessage");
    const popupTitle = document.getElementById("popupTitle");

    let isRegistering = false;

    loginBtn.addEventListener("click", function () {
        isRegistering = false;
        popupTitle.textContent = "Login";
        authPopup.style.display = "flex";
    });

    registerBtn.addEventListener("click", function () {
        isRegistering = true;
        popupTitle.textContent = "Register";
        authPopup.style.display = "flex";
    });

    closePopup.addEventListener("click", function () {
        authPopup.style.display = "none";
        errorMessage.textContent = "";
    });

    closeSuccessPopup.addEventListener("click", function () {
        successPopup.style.display = "none";
        location.reload(); 
    });

    authForm.addEventListener("submit", function (event) {
        event.preventDefault();
        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;

        if (isRegistering) {
            registerUser(email, password);
        } else {
            loginUser(email, password);
        }
    });

    function registerUser(email, password) {
        const users = JSON.parse(localStorage.getItem("users")) || [];
        const userExists = users.some(user => user.email === email);

        if (userExists) {
            errorMessage.textContent = "A user with this email already exists!";
            return;
        }

        const newUser = { email, password };
        users.push(newUser);
        localStorage.setItem("users", JSON.stringify(users));

        authPopup.style.display = "none";
        successPopup.style.display = "flex";
    }


    function loginUser(email, password) {
        const users = JSON.parse(localStorage.getItem("users")) || [];
        const user = users.find(user => user.email === email && user.password === password);

        if (!user) {
            errorMessage.textContent = "Invalid email or password!";
            return;
        }

        localStorage.setItem("currentUser", JSON.stringify(user));
        authPopup.style.display = "none";
        successPopup.style.display = "flex";
    }
});
document.getElementById("homeLink").addEventListener("click", function (e) {
    e.preventDefault(); 
    location.reload(); 
});

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener("click", function (e) {
        e.preventDefault();
        const targetId = this.getAttribute("href").substring(1);
        const targetElement = document.getElementById(targetId);
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80, 
                behavior: "smooth"
            });
        }
    });
});

