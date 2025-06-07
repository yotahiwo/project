class Basket {
    constructor(userId) {
        this.userId = userId;  // ID текущего пользователя
        this.items = this.load();  // Загружаем товары из хранилища
    }

    // Загрузка корзины из LocalStorage
    load() {
        try {
            const data = localStorage.getItem(`basket_${this.userId}`);
            let result = data ? JSON.parse(data) : [];  // Возвращаем массив товаров или пустой массив
            return result;
        } catch (e) {
            console.error('Error loading basket:', e);
            return [];  // При ошибке возвращаем пустую корзину
        }
    }

    // Сохранение корзины в LocalStorage
    save() {
        try {
            localStorage.setItem(`basket_${this.userId}`, JSON.stringify(this.items));
            this.updateUI();  // Обновляем интерфейс после сохранения
        } catch (e) {
            console.error('Error saving basket:', e);
        }
    }

    // Добавление товара в корзину
    add(item) {
        const existingItem = this.items.find(i => i.id === item.id);

        if (existingItem) {
            existingItem.quantity += item.quantity;  // Увеличиваем количество если товар уже есть
        } else {
            this.items.push({...item});  // Добавляем новый товар
        }

        this.save();  // Сохраняем изменения
        return this;  // Возвращаем экземпляр для чейнинга
    }

    // Удаление товара из корзины
    remove(itemId) {
        this.items = this.items.filter(item => item.id !== itemId);  // Фильтруем массив
        this.save();
        return this;
    }

    // Обновление количества товара
    update(itemId, newQuantity) {
        const item = this.items.find(item => item.id === itemId);
        if (item) {
            item.quantity = newQuantity;  // Устанавливаем новое количество
            this.save();
        }
        return this;
    }

    // Получение всех товаров (защищенная копия)
    getItems() {
        return [...this.items];  // Возвращаем копию массива
    }

    // Поиск товара по ID
    getItem(itemId) {
        return this.items.find(item => item.id === itemId);
    }

    // Расчет общей стоимости корзины
    getTotal() {
        return this.items.reduce((total, item) => total + (item.price * item.quantity), 0);
    }

    // Генерация HTML-разметки для товаров
    render() {
        return this.items.map(item => `
            <div class="cart-item" data-id="${item.id}">
                <img src="../images/${item.id}.jpg" alt="${item.name}" 
                     onerror="this.src='../images/default-product.jpg'">
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
        `).join('');  // Объединяем массив в строку
    }

    // Обновление интерфейса корзины
    updateUI() {
        this.updateCartPage();  // Обновляем страницу
        this.updateCartCounter();  // Обновляем счетчик
        return this;
    }

    // Обновление содержимого страницы корзины
    updateCartPage() {
        if (!document.getElementById('cartItems')) return;

        const cartContainer = document.getElementById('cartItems');
        const totalElement = document.getElementById('total-price');

        if (this.items.length === 0) {
            cartContainer.innerHTML = '<p>Your cart is empty</p>';  // Пустая корзина
        } else {
            cartContainer.innerHTML = this.render();  // Рендерим товары
            this.setupCartEventHandlers();  // Настраиваем обработчики
        }

        if (totalElement) {
            totalElement.textContent = this.getTotal().toFixed(2);  // Обновляем итого
        }
    }

    // Обновление счетчика товаров в шапке
    updateCartCounter() {
        const counter = document.querySelector('.cart-counter, .basket-counter');
        if (!counter) return;

        const totalItems = this.items.reduce((sum, item) => sum + item.quantity, 0);
        counter.textContent = totalItems;  // Устанавливаем количество
        counter.style.display = totalItems > 0 ? 'flex' : 'none';  // Показываем/скрываем
    }

    // Настройка обработчиков событий для элементов корзины
    setupCartEventHandlers() {
        // Обработчик увеличения количества
        document.querySelectorAll('.quantity-plus').forEach(btn => {
            btn.addEventListener('click', () => {
                const itemId = btn.closest('.cart-item').dataset.id;
                this.update(itemId, this.getItem(itemId).quantity + 1);
            });
        });

        // Обработчик уменьшения количества
        document.querySelectorAll('.quantity-minus').forEach(btn => {
            btn.addEventListener('click', () => {
                const itemId = btn.closest('.cart-item').dataset.id;
                const currentQty = this.getItem(itemId).quantity;
                currentQty > 1 ? this.update(itemId, currentQty - 1) : this.remove(itemId);
            });
        });

        // Обработчик удаления товара
        document.querySelectorAll('.remove-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                const itemId = btn.closest('.cart-item').dataset.id;
                this.remove(itemId);
            });
        });
    }
}