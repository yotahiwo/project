function setupAddToCartButton(productId, productName, productPrice) {
    const button = document.querySelector('.buy-btn');

    // Удаляем старые обработчики (если есть)
    button.removeEventListener('click', handleAddToCart);

    // Добавляем новый обработчик
    button.addEventListener('click', handleAddToCart);

    function handleAddToCart() {
        const userId = localStorage.getItem('currentUserId');
        if (!userId) {
            alert('Please login first');
            return;
        }

        // Блокируем кнопку на 1 секунду
        button.disabled = true;
        setTimeout(() => button.disabled = false, 1000);

        const basket = new Basket(userId);
        basket.add({
            id: productId,
            name: productName,
            price: productPrice,
            quantity: 1
        });

        // Переход в корзину только если добавление успешно
        window.location.href = 'basket.html';
    }
}