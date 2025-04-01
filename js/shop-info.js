$(document).ready(function () {
    const reviewForm = document.getElementById("reviewForm");
    const reviewsContainer = document.getElementById("reviews");
    const clearReviewsBtn = document.getElementById("clearReviewsBtn"); 

    loadReviews();

    reviewForm.addEventListener("submit", function (e) {
        e.preventDefault();

        const name = document.getElementById("name").value.trim();
        const rating = $("#rating-slider").val();
        const reviewText = document.getElementById("reviewText").value.trim();
        const photoInput = document.getElementById("photo");

        if (!name || !reviewText) {
            alert("Please fill in all fields.");
            return;
        }

        const photo = photoInput.files.length > 0 ? URL.createObjectURL(photoInput.files[0]) : ""; 

        const review = {
            name,
            rating,
            reviewText,
            photo,  
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

        let ratingStars = "★".repeat(review.rating) + "☆".repeat(5 - review.rating);

        reviewElement.innerHTML = `
            <div class="user-info">
                <img src="${review.photo || ''}" alt="User Image" onError="this.style.display='none'">  
                <div class="user-details">
                    <h3>${review.name}</h3>
                    <p class="rating">${ratingStars}</p>
                </div>
            </div>
            <p>${review.reviewText}</p>
            <button class="delete-btn">Delete</button>  
            <hr>
        `;
        
        reviewsContainer.prepend(reviewElement);

        const deleteBtn = reviewElement.querySelector('.delete-btn');
        deleteBtn.addEventListener("click", function () {
            deleteReview(review);  
        });
    }

    function deleteReview(review) {
        let reviews = JSON.parse(localStorage.getItem("reviews")) || [];

        reviews = reviews.filter(item => item.date !== review.date);

        localStorage.setItem("reviews", JSON.stringify(reviews));

        loadReviews();  
    }

    $("#rating-slider").ionRangeSlider({
        min: 1,
        max: 5,
        from: 5,
        step: 1,
        grid: true,
        skin: "round",
        onFinish: function (data) {
            console.log("Selected rating:", data.from);
        }
    });
});
