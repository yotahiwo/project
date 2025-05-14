document.addEventListener('DOMContentLoaded', function() {
    // Проверка авторизации
    const userId = localStorage.getItem('currentUserId');
    if (!userId || localStorage.getItem('isLoggedIn') !== 'true') {
        alert('Please login to view your cart');
        window.location.href = 'index.html';
        return;
    }

    // Инициализация корзины
    const basket = new Basket(userId);

    // Первоначальная отрисовка
    renderCart(basket);

    // Делегирование событий для динамических элементов
    document.addEventListener('click', function(e) {
        const cartItem = e.target.closest('.cart-item');
        if (!cartItem) return;

        const itemId = cartItem.dataset.id;
        const item = basket.getItem(itemId);
        if (!item) return;

        // Обработка увеличения количества
        if (e.target.classList.contains('quantity-plus')) {
            basket.update(itemId, item.quantity + 1);
        }

        // Обработка уменьшения количества
        else if (e.target.classList.contains('quantity-minus')) {
            if (item.quantity > 1) {
                basket.update(itemId, item.quantity - 1);
            } else {
                basket.remove(itemId);
            }
        }

        // Обработка удаления
        else if (e.target.classList.contains('remove-btn')) {
            basket.remove(itemId);
        }

        // Обновление интерфейса
        renderCart(basket);
    });

    // Обработчик кнопки оформления заказа
    const checkoutBtn = document.getElementById('checkoutBtn');
    if (checkoutBtn) {
        checkoutBtn.addEventListener('click', function() {
            if (basket.getItems().length === 0) {
                alert('Your cart is empty!');
                return;
            }
            // Здесь будет логика оформления заказа
            alert('Order placed successfully!');
            basket.getItems().length = 0;
            basket.save();
            renderCart(basket);
        });
    }
});

// Функция отрисовки корзины
function renderCart(basket) {
    const cartContainer = document.getElementById('cartItems');
    const totalElement = document.getElementById('total-price');

    if (!cartContainer) return;

    if (basket.getItems().length === 0) {
        cartContainer.innerHTML = '<p class="empty-cart">Your cart is empty</p>';
        if (totalElement) totalElement.textContent = '0.00';
    } else {
        cartContainer.innerHTML = basket.render();
        if (totalElement) {
            totalElement.textContent = basket.getTotal().toFixed(2);
        }
    }

    // Обновляем счетчик в хедере
    updateHeaderCounter(basket);
}

// Функция обновления счетчика в хедере
function updateHeaderCounter(basket) {
    const counter = document.querySelector('.cart-counter, .basket-counter');
    if (!counter) return;

    const totalItems = basket.getItems().reduce((sum, item) => sum + item.quantity, 0);
    counter.textContent = totalItems;
    counter.style.display = totalItems > 0 ? 'flex' : 'none';
}