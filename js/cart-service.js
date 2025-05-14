class Basket {
    constructor(userId) {
        this.userId = userId;
        this.items = this.load();
    }

    // Загрузка корзины из LocalStorage
    load() {
        try {
            const data = localStorage.getItem(`basket_${this.userId}`);
            return data ? JSON.parse(data) : [];
        } catch (e) {
            console.error('Error loading basket:', e);
            return [];
        }
    }

    // Сохранение корзины в LocalStorage
    save() {
        try {
            localStorage.setItem(`basket_${this.userId}`, JSON.stringify(this.items));
            this.updateUI();
        } catch (e) {
            console.error('Error saving basket:', e);
        }
    }

    // Добавление товара
    add(item) {
        const existingItem = this.items.find(i => i.id === item.id);
        if (existingItem) {
            existingItem.quantity += item.quantity;
        } else {
            this.items.push(item);
        }
        this.save();
        return this; // Для цепочки вызовов
    }

    // Удаление товара
    remove(itemId) {
        this.items = this.items.filter(item => item.id !== itemId);
        this.save();
        return this;
    }

    // Обновление количества
    update(itemId, newQuantity) {
        const item = this.items.find(item => item.id === itemId);
        if (item) {
            item.quantity = newQuantity;
            this.save();
        }
        return this;
    }

    // Получение всех товаров
    getItems() {
        return [...this.items]; // Возвращаем копию массива
    }

    // Получение конкретного товара
    getItem(itemId) {
        return this.items.find(item => item.id === itemId);
    }

    // Расчет общей суммы
    getTotal() {
        return this.items.reduce((total, item) => total + (item.price * item.quantity), 0);
    }

    // Генерация HTML для товаров
    render() {
        return this.items.map(item => `
            <div class="cart-item" data-id="${item.id}">
                <img src="../images/${item.id}.jpg" alt="${item.name}" onerror="this.src='../images/default-product.jpg'">
                <div class="item-details">
                    <h3>${item.name}</h3>
                    <p>$${item.price.toFixed(2)}</p>
                    <div class="quantity-control">
                        <button class="quantity-minus">-</button>
                        <span class="quantity">${item.quantity}</span>
                        <button class="quantity-plus">+</button>
                    </div>
                    <button class="remove-btn">Remove</button>
                </div>
                <p class="item-total">$${(item.price * item.quantity).toFixed(2)}</p>
            </div>
        `).join('');
    }

    // Обновление интерфейса
    updateUI() {
        this.updateCartPage();
        this.updateCartCounter();
        return this;
    }

    // Обновление страницы корзины
    updateCartPage() {
        if (!document.getElementById('cartItems')) return;

        const cartContainer = document.getElementById('cartItems');
        const totalElement = document.getElementById('total-price');

        if (this.items.length === 0) {
            cartContainer.innerHTML = '<p>Your cart is empty</p>';
        } else {
            cartContainer.innerHTML = this.render();
            this.setupCartEventHandlers();
        }

        if (totalElement) {
            totalElement.textContent = this.getTotal().toFixed(2);
        }
    }

    // Обновление счетчика в хедере
    updateCartCounter() {
        const counter = document.querySelector('.cart-counter, .basket-counter');
        if (!counter) return;

        const totalItems = this.items.reduce((sum, item) => sum + item.quantity, 0);
        counter.textContent = totalItems;
        counter.style.display = totalItems > 0 ? 'flex' : 'none';
    }

    // Настройка обработчиков событий
    setupCartEventHandlers() {
        document.querySelectorAll('.quantity-plus').forEach(btn => {
            btn.addEventListener('click', () => {
                const itemId = btn.closest('.cart-item').dataset.id;
                this.update(itemId, this.getItem(itemId).quantity + 1);
            });
        });

        document.querySelectorAll('.quantity-minus').forEach(btn => {
            btn.addEventListener('click', () => {
                const itemId = btn.closest('.cart-item').dataset.id;
                const currentQty = this.getItem(itemId).quantity;
                currentQty > 1 ? this.update(itemId, currentQty - 1) : this.remove(itemId);
            });
        });

        document.querySelectorAll('.remove-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                const itemId = btn.closest('.cart-item').dataset.id;
                this.remove(itemId);
            });
        });
    }
}