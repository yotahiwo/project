document.addEventListener("DOMContentLoaded", function() {
    const categories = document.querySelectorAll(".category");
    const products = document.querySelectorAll(".product");
    const productSection = document.querySelector(".products"); // Секция товаров
    const categorySection = document.querySelector(".product-categories"); // Категории

    categories.forEach(category => {
        category.addEventListener("click", function() {
            const selectedCategory = this.getAttribute("data-category");

            // Скрываем все категории (чтобы остались только товары)
            categorySection.style.opacity = "0";
            setTimeout(() => {
                categorySection.style.display = "none";
            }, 300);

            // Скрываем все товары
            products.forEach(product => {
                product.style.display = "none";
                product.style.opacity = "0";
            });

            // Показываем только нужные с плавным эффектом
            setTimeout(() => {
                products.forEach(product => {
                    if (product.getAttribute("data-category") === selectedCategory) {
                        product.style.display = "flex"; // Или block, если карточки в ряд
                        setTimeout(() => {
                            product.style.opacity = "1"; // Плавное появление
                        }, 100);
                    }
                });
            }, 300);
        });
    });
});
