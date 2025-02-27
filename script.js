document.addEventListener('DOMContentLoaded', function () {
    // Получаем все категории и товары
    const categories = document.querySelectorAll('.category');
    const products = document.querySelectorAll('.product');

    // Добавляем обработчик клика на каждую категорию
    categories.forEach(category => {
        category.addEventListener('click', () => {
            const selectedCategory = category.getAttribute('data-category');

            // Убираем активный класс у всех категорий
            categories.forEach(c => c.classList.remove('active'));
            // Добавляем активный класс выбранной категории
            category.classList.add('active');

            // Фильтруем товары
            products.forEach(product => {
                if (product.getAttribute('data-category') === selectedCategory || selectedCategory === 'all') {
                    product.style.display = 'block'; // Показываем товар
                } else {
                    product.style.display = 'none'; // Скрываем товар
                }
            });
        });
    });
});