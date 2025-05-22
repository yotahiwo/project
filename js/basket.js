// Ждем полной загрузки DOM
document.addEventListener('DOMContentLoaded', function() {
    // Проверка авторизации пользователя
    const userId = localStorage.getItem('currentUserId');
    if (!userId || localStorage.getItem('isLoggedIn') !== 'true') {
        alert('Please login to view your cart'); // Предупреждение для неавторизованных
        window.location.href = 'index.html'; // Перенаправление на главную
        return; // Прерывание выполнения
    }

    // Создание экземпляра корзины для пользователя
    const basket = new Basket(userId);

    // Первоначальная отрисовка корзины
    renderCart(basket);

    // Обработка кликов через делегирование событий
    document.addEventListener('click', function(e) {
        const cartItem = e.target.closest('.cart-item'); // Поиск ближайшего элемента корзины
        if (!cartItem) return; // Выход если клик не по элементу корзины

        const itemId = cartItem.dataset.id; // Получение ID товара
        const item = basket.getItem(itemId); // Поиск товара в корзине
        if (!item) return; // Выход если товар не найден

        // Увеличение количества товара
        if (e.target.classList.contains('quantity-plus')) {
            basket.update(itemId, item.quantity + 1);
        }
        // Уменьшение количества товара
        else if (e.target.classList.contains('quantity-minus')) {
            if (item.quantity > 1) {
                basket.update(itemId, item.quantity - 1);
            } else {
                basket.remove(itemId); // Удаление если количество = 1
            }
        }
        // Удаление товара
        else if (e.target.classList.contains('remove-btn')) {
            basket.remove(itemId);
        }

        // Обновление отображения корзины
        renderCart(basket);
    });

    // Обработка оформления заказа
    const checkoutBtn = document.getElementById('checkoutBtn');
    if (checkoutBtn) {
        checkoutBtn.addEventListener('click', function() {
            if (basket.getItems().length === 0) { // Проверка на пустую корзину
                alert('Your cart is empty!');
                return;
            }
            // Заглушка для оформления заказа
            alert('Order placed successfully!');
            basket.getItems().length = 0; // Очистка корзины
            basket.save(); // Сохранение изменений
            renderCart(basket); // Обновление интерфейса
        });
    }
});

// Рендер содержимого корзины
function renderCart(basket) {
    const cartContainer = document.getElementById('cartItems'); // Контейнер товаров
    const totalElement = document.getElementById('total-price'); // Элемент общей суммы

    if (!cartContainer) return; // Выход если контейнер не найден

    if (basket.getItems().length === 0) { // Проверка на пустую корзину
        cartContainer.innerHTML = '<p class="empty-cart">Your cart is empty</p>';
        if (totalElement) totalElement.textContent = '0.00'; // Сброс суммы
    } else {
        cartContainer.innerHTML = basket.render(); // Генерация HTML товаров
        if (totalElement) {
            totalElement.textContent = basket.getTotal().toFixed(2); // Обновление суммы
        }
    }

    // Обновление счетчика в шапке
    updateHeaderCounter(basket);
}

// Обновление счетчика товаров в шапке
function updateHeaderCounter(basket) {
    const counter = document.querySelector('.cart-counter, .basket-counter'); // Поиск счетчика
    if (!counter) return; // Выход если не найден

    // Расчет общего количества товаров
    const totalItems = basket.getItems().reduce((sum, item) => sum + item.quantity, 0);
    counter.textContent = totalItems; // Установка значения
    counter.style.display = totalItems > 0 ? 'flex' : 'none'; // Переключение видимости
}