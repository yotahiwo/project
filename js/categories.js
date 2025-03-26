
if (typeof categories === 'undefined') {
    const categories = document.querySelectorAll('.category');
    const products = document.querySelectorAll('.product');
    const shopSection = document.querySelector('#shopSection');

    categories.forEach(category => {
        category.addEventListener("click", function() {

            categories.forEach(cat => cat.classList.remove("active"));

            this.classList.add("active");

            const selectedCategory = this.getAttribute("data-category");


            let anyVisible = false;
            products.forEach(product => {
                if (product.getAttribute("data-category") === selectedCategory) {
                    product.style.display = "block"; 
                    anyVisible = true;
                } else {
                    product.style.display = "none";  
                }
            });

            if (anyVisible) {
                shopSection.style.display = "block";
            } else {
                shopSection.style.display = "none";
            }
        });
    });
} else {
    console.log("Переменная 'categories' уже была определена.");
}
