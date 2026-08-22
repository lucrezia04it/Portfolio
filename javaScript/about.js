document.addEventListener("DOMContentLoaded", () => {

    const pages = [
        document.querySelector(".card-1"),
        document.querySelector(".card-2"),
        document.querySelector(".card-3"),
        document.querySelector(".card-4"),
        document.querySelector(".card-5"),
        document.querySelector(".card-6"),
        document.querySelector(".card-7"),
        document.querySelector(".card-8"),
        document.querySelector(".card-9")
    ];

    const title = document.querySelector("#about-title");

    let currentPage = 0;
    let isAnimating = false;


    /* ==========================================
       IMPOSTAZIONE INIZIALE DELLE PAGINE
       ========================================== */

    pages.forEach((page, index) => {

        gsap.set(page, {
            zIndex: pages.length - index,
            rotationY: 0,
            opacity: 1,

            filter: index === 0
                ? "drop-shadow(35px 35px 10px rgba(0, 0, 0, 0.15))"
                : "none"
        });

    });


    /* ==========================================
       CLICK PER SFOGLIARE
       ========================================== */

    document.querySelector(".paper-stack").addEventListener("click", (event) => {

        /* Se clicco su un link, lascio funzionare il link */
        if (event.target.closest("a")) {
            return;
        }

        /* Non permettere click durante l'animazione */
        if (isAnimating) {
            return;
        }

        /* Se abbiamo già sfogliato tutte le pagine */
        if (currentPage >= pages.length) {
            return;
        }

        turnPage(currentPage);

    });

    /* ==========================================
   FRECCE DELLA TASTIERA
   ========================================== */

document.addEventListener("keydown", (event) => {

    // Freccia destra = gira pagina
    if (event.key === "ArrowRight") {

        if (isAnimating) return;

        if (currentPage >= pages.length - 1) return;

        turnPage(currentPage);
    }

});


    /* ==========================================
       ANIMAZIONE PAGINA
       ========================================== */

function turnPage(index) {

    const page = pages[index];

    isAnimating = true;

    // SOLO quando gira la nona pagina
    if (index === 7) {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}

    gsap.set(page, {
        zIndex: 1000
    });

    const tl = gsap.timeline({
        onComplete: () => {
            currentPage++;
            isAnimating = false;
        }
    });

    // 1. SOLLEVAMENTO
    tl.to(page, {
        rotationY: -8,
        rotationX: 3,
        scale: 1.02,
        duration: 0.3,
        ease: "power2.out"
    });

    // // 2. PIEGA
    // tl.to(page, {
    //     rotationY: -55,
    //     rotationX: 5,
    //     scaleX: 0.98,
    //     scaleY: 1.015,
    //     duration: 0.3,
    //     ease: "power1.inOut"
    // });

    // 3. PASSAGGIO CENTRALE
    tl.to(page, {
        rotationY: -125,
        rotationX: 3,
        scaleX: 0.94,
        scaleY: 1.01,
        duration: 0.55,
        ease: "power1.inOut"
    });

    // CAMBIO TITOLO DURANTE LA NONA PAGINA
    if (index === 7) {

    tl.call(() => {
        title.classList.add("final-title");

    }, null, 0.8);

}
    // 4. SI DISTENDE
    tl.to(page, {
        rotationY: -170,
        rotationX: 0,
        scaleX: 0.92,
        scaleY: 1,
        duration: 0.45,
        ease: "power2.out"
    });

    // 5. FADE
    tl.to(page, {
        rotationY: -180,
        opacity: 0,
        duration: 0.55,
        ease: "power1.out"
    }, "-=0.12");

    // 6. DIETRO
    tl.set(page, {
        zIndex: 0,
        pointerEvents: "none"
    });
}

});