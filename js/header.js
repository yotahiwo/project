document.getElementById("homeLink").addEventListener("click", function (e) {
    e.preventDefault(); 
    window.location.reload(); 
});

document.getElementById("shopLink").addEventListener("click", function (e) {
    e.preventDefault();
    const shopSection = document.getElementById("shop");
    if (shopSection) {
        shopSection.scrollIntoView({ behavior: "smooth" }); 
    }
});

document.getElementById("contactLink").addEventListener("click", function (e) {
    e.preventDefault();
    const contactSection = document.getElementById("contact");
    if (contactSection) {
        contactSection.scrollIntoView({ behavior: "smooth" }); 
    }
});
