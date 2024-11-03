document.addEventListener("DOMContentLoaded", () => {
    const cards = document.querySelectorAll(".card");
    cards.forEach((card, index) => {
        setTimeout(() => {
            card.classList.add("aparecer");
        }, index * 200); // Aparece com atraso entre os cartões
    });
});
