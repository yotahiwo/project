
function setupAddToCartButton(productId, productName, productPrice) {
    document.querySelector('.buy-btn').addEventListener('click', function() {
        const userId = localStorage.getItem('currentUserId');
        if (!userId) {
            alert('Please login first');
            return;
        }

        const basket = new Basket(userId);
        basket.add({
            id: productId,
            name: productName,
            price: productPrice,
            quantity: 1
        });

        window.location.href = 'basket.html';
    });
}