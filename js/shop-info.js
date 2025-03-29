document.addEventListener("DOMContentLoaded", function () {
    const reviewForm = document.getElementById("reviewForm");
    const reviewsContainer = document.getElementById("reviewsContainer");

    loadReviews();

    reviewForm.addEventListener("submit", function (e) {
        e.preventDefault();

        const name = document.getElementById("name").value.trim();
        const rating = document.getElementById("rating").value;
        const reviewText = document.getElementById("reviewText").value.trim();

        if (!name || !reviewText) {
            alert("Please fill in all fields.");
            return;
        }

        const review = {
            name,
            rating,
            reviewText,
            date: new Date().toLocaleDateString()
        };

        let reviews = JSON.parse(localStorage.getItem("reviews")) || [];

        reviews.push(review);

        localStorage.setItem("reviews", JSON.stringify(reviews));

        displayReview(review);

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
