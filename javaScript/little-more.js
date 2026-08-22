document.addEventListener("DOMContentLoaded", function() {
    const finalPhrase = document.querySelector(".final-phrase");

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            // Quando la frase entra nel campo visivo dello schermo
            if (entry.isIntersecting) {
                entry.target.classList.add("visible");
                observer.unobserve(entry.target); // Esegue l'animazione una sola volta
            }
        });
    }, {
        threshold: 0.2 // L'animazione parte quando il 20% dell'elemento è visibile
    });

    if (finalPhrase) {
        observer.observe(finalPhrase);
    }
});