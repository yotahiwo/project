document.addEventListener("DOMContentLoaded", function () {
    const reviewForm = document.getElementById("reviewForm");
    const reviewsContainer = document.getElementById("reviewsContainer");

    // Загружаем отзывы из localStorage при загрузке страницы
    loadReviews();

    reviewForm.addEventListener("submit", function (e) {
        e.preventDefault();

        // Получаем данные из формы
        const name = document.getElementById("name").value.trim();
        const rating = document.getElementById("rating").value;
        const reviewText = document.getElementById("reviewText").value.trim();

        if (!name || !reviewText) {
            alert("Please fill in all fields.");
            return;
        }

        // Создаем объект отзыва
        const review = {
            name,
            rating,
            reviewText,
            date: new Date().toLocaleDateString()
        };

        // Получаем отзывы из localStorage
        let reviews = JSON.parse(localStorage.getItem("reviews")) || [];

        // Добавляем новый отзыв
        reviews.push(review);

        // Сохраняем в localStorage
        localStorage.setItem("reviews", JSON.stringify(reviews));

        // Отображаем новый отзыв
        displayReview(review);

        // Очищаем форму
        reviewForm.reset();
    });

    function loadReviews() {
        let reviews = JSON.parse(localStorage.getItem("reviews")) || [];
        reviews.forEach(displayReview);
    }

    function displayReview(review) {
        const reviewElement = document.createElement("div");
        reviewElement.classList.add("review");
        reviewElement.innerHTML = `
            <p><strong>${review.name}</strong> <span>(${review.date})</span></p>
            <p>Rating: ⭐ ${review.rating}/5</p>
            <p>${review.reviewText}</p>
            <hr>
        `;
        reviewsContainer.prepend(reviewElement); // Добавляем новый отзыв в начало
    }
});
