// Ждем полной загрузки DOM документа перед выполнением скрипта
$(document).ready(function() {

    // 1. ИНИЦИАЛИЗАЦИЯ СЛАЙДЕРА РЕЙТИНГА
    $("#ratingSlider").ionRangeSlider({
        min: 1,         // Минимальное значение (1 звезда)
        max: 5,         // Максимальное значение (5 звезд)
        from: 3,        // Начальное положение ползунка
        grid: true,     // Показывать сетку значений
        skin: "round",  // Стиль оформления слайдера
        onChange: function(data) {
            // Обновляем отображаемое значение рейтинга при изменении
            $("#ratingValue").text(data.from);
        }
    });

    // 2. ОБРАБОТКА ФОРМЫ ОТЗЫВА
    $("#reviewForm").on("submit", function(e) {
        e.preventDefault(); // Отменяем стандартную отправку формы

        // Собираем данные из формы в объект
        const newReview = {
            name: $("#reviewName").val().trim(), // Имя пользователя (без пробелов)
            rating: $("#ratingSlider").val(),    // Значение рейтинга со слайдера
            text: $("#reviewText").val().trim(), // Текст отзыва (без пробелов)
            // Если есть фото - создаем временный URL, иначе null
            photo: $("#reviewPhoto")[0].files[0]
                ? URL.createObjectURL($("#reviewPhoto")[0].files[0])
                : null,
            date: new Date().toLocaleString() // Текущая дата в локальном формате
        };

        // ВАЛИДАЦИЯ: проверяем заполнение обязательных полей
        if (!newReview.name || !newReview.text) {
            alert("Please fill all required fields!");
            return; // Прерываем выполнение если поля не заполнены
        }

        // 3. РАБОТА С LOCALSTORAGE
        // Получаем текущие отзывы или пустой массив, если их нет
        const reviews = JSON.parse(localStorage.getItem("productReviews")) || [];
        // Добавляем новый отзыв в массив
        reviews.push(newReview);
        // Сохраняем обновленный массив в localStorage
        localStorage.setItem("productReviews", JSON.stringify(reviews));

        // Обновляем отображение отзывов
        displayReviews();

        // СБРОС ФОРМЫ
        this.reset(); // Очищаем все поля формы
        $("#ratingValue").text("3"); // Сбрасываем отображаемый рейтинг
        // Возвращаем слайдер в начальное положение
        $("#ratingSlider").data("ionRangeSlider").update({ from: 3 });
    });

    // 4. ФУНКЦИЯ ОТОБРАЖЕНИЯ ОТЗЫВОВ
    function displayReviews() {
        // Получаем отзывы из localStorage или пустой массив
        const reviews = JSON.parse(localStorage.getItem("productReviews")) || [];
        const container = $("#reviewsContainer");

        container.empty(); // Очищаем контейнер

        // Если отзывов нет - показываем сообщение
        if (reviews.length === 0) {
            container.html("<p>No reviews yet. Be the first!</p>");
            return;
        }

        // Для каждого отзыва создаем HTML-блок
        reviews.forEach(review => {
            // Создаем строку со звездами рейтинга
            const stars = '★'.repeat(review.rating) + '☆'.repeat(5 - review.rating);

            // Добавляем отзыв в начало контейнера
            container.prepend(`
                <div class="review">
                    <div class="review-header">
                        ${review.photo ? `<img src="${review.photo}" alt="${review.name}">` : ''}
                        <div>
                            <h4>${review.name}</h4>
                            <div class="stars">${stars}</div>
                            <small>${review.date}</small>
                        </div>
                    </div>
                    <p>${review.text}</p>
                    <button class="delete-review" data-date="${review.date}">Delete</button>
                </div>
            `);
        });
    }

    // 5. УДАЛЕНИЕ ОТЗЫВА
    $(document).on("click", ".delete-review", function() {
        // Получаем дату отзыва из data-атрибута кнопки
        const dateToDelete = $(this).data("date");
        // Загружаем текущие отзывы
        let reviews = JSON.parse(localStorage.getItem("productReviews")) || [];

        // Фильтруем массив, удаляя отзыв с указанной датой
        reviews = reviews.filter(review => review.date !== dateToDelete);
        // Сохраняем измененный массив
        localStorage.setItem("productReviews", JSON.stringify(reviews));

        // Обновляем отображение
        displayReviews();
    });

    // ПЕРВОНАЧАЛЬНАЯ ЗАГРУЗКА ОТЗЫВОВ ПРИ ЗАПУСКЕ
    displayReviews();
});