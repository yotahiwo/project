document.addEventListener('DOMContentLoaded', function() {
    const userId = localStorage.getItem('currentUserId');
    if (!userId) {
        alert('Please login to view your cart');
        window.location.href = 'index.html';
        return;
    }

    // Здесь позже будем загружать товары из localStorage
    const cartItems = JSON.parse(localStorage.getItem(`basket_${userId}`)) || [];
    const cartContainer = document.getElementById('cartItems');

    if (cartItems.length === 0) {
        cartContainer.innerHTML = '<p>Your cart is empty</p>';
        return;
    }

    // Просто для примера - потом заменим на нормальный вывод
    cartContainer.innerHTML = cartItems.map(item =>
        `<div class="cart-item">
            <h3>${item.name}</h3>
            <p>Quantity: ${item.quantity}</p>
        </div>`
    ).join('');
});