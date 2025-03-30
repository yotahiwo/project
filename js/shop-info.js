$(document).ready(function () {
    const reviewForm = document.getElementById("reviewForm");
    const reviewsContainer = document.getElementById("reviews");
    const clearReviewsBtn = document.getElementById("clearReviewsBtn"); // Кнопка для очистки всех отзывов

    loadReviews();

    reviewForm.addEventListener("submit", function (e) {
        e.preventDefault();

        const name = document.getElementById("name").value.trim();
        const rating = $("#rating-slider").val();
        const reviewText = document.getElementById("reviewText").value.trim();
        const photoInput = document.getElementById("photo");

        // Проверка на пустые поля
        if (!name || !reviewText) {
            alert("Please fill in all fields.");
            return;
        }

        // Проверяем, выбрал ли пользователь фото, если нет - ставим пустое значение для изображения
        const photo = photoInput.files.length > 0 ? URL.createObjectURL(photoInput.files[0]) : "";  // Пустое значение если фото не выбрано

        const review = {
            name,
            rating,
            reviewText,
            photo,  // Добавляем фото
            date: new Date().toLocaleDateString()
        };

        let reviews = JSON.parse(localStorage.getItem("reviews")) || [];

        reviews.push(review);

        localStorage.setItem("reviews", JSON.stringify(reviews));

        displayReview(review);

        reviewForm.reset();  // Очищаем форму
    });

    function loadReviews() {
        let reviews = JSON.parse(localStorage.getItem("reviews")) || [];
        reviews.forEach(displayReview);
    }

    function displayReview(review) {
        const reviewElement = document.createElement("div");
        reviewElement.classList.add("review");

        // Используем рейтинг в виде звезд
        let ratingStars = "★".repeat(review.rating) + "☆".repeat(5 - review.rating);

        // Создаем элемент отзыва с кнопкой удаления
        reviewElement.innerHTML = `
            <div class="user-info">
                <img src="${review.photo || ''}" alt="User Image" onError="this.style.display='none'">  
                <div class="user-details">
                    <h3>${review.name}</h3>
                    <p class="rating">${ratingStars}</p>
                </div>
            </div>
            <p>${review.reviewText}</p>
            <button class="delete-btn">Delete</button>  <!-- Кнопка удаления -->
            <hr>
        `;
        
        reviewsContainer.prepend(reviewElement);

        // Обработчик для кнопки удаления
        const deleteBtn = reviewElement.querySelector('.delete-btn');
        deleteBtn.addEventListener("click", function () {
            deleteReview(review);  // Удаляем отзыв из localStorage и с экрана
        });
    }

    // Функция для удаления отзыва из localStorage и с экрана
    function deleteReview(review) {
        let reviews = JSON.parse(localStorage.getItem("reviews")) || [];

        // Фильтруем отзывы, чтобы удалить нужный
        reviews = reviews.filter(item => item.date !== review.date);

        // Обновляем localStorage
        localStorage.setItem("reviews", JSON.stringify(reviews));

        // Удаляем отзыв с экрана
        loadReviews();  // Перезагружаем все отзывы на экран
    }

    // Настройка слайдера
    $("#rating-slider").ionRangeSlider({
        min: 1,
        max: 5,
        from: 5,
        step: 1,
        grid: true,
        skin: "round",
        onFinish: function (data) {
            console.log("Выбранный рейтинг:", data.from);
        }
    });
});
