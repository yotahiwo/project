// Обработчик клика по ссылке "Home"
document.getElementById("homeLink").addEventListener("click", function (e) {
    e.preventDefault();  // Отменяем стандартное поведение ссылки
    window.location.reload();  // Перезагружаем текущую страницу
});

// Обработчик клика по ссылке "Shop"
document.getElementById("shopLink").addEventListener("click", function (e) {
    e.preventDefault();  // Отменяем стандартное поведение ссылки
    const shopSection = document.getElementById("shop");  // Находим секцию магазина
    if (shopSection) {  // Если секция существует
        shopSection.scrollIntoView({ behavior: "smooth" });  // Плавно скроллим к ней
    }
});

// Обработчик клика по ссылке "Contact"
document.getElementById("contactLink").addEventListener("click", function (e) {
    e.preventDefault();  // Отменяем стандартное поведение ссылки
    const contactSection = document.getElementById("contact");  // Находим секцию контактов
    if (contactSection) {  // Если секция существует
        contactSection.scrollIntoView({ behavior: "smooth" });  // Плавно скроллим к ней
    }
});