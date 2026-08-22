const avatarWrapper = document.querySelector(".avatar-wrapper");
const avatarPhoto = document.querySelector(".avatar-photo");
const avatarDraw = document.querySelector(".avatar-draw");

// Hover Foto Avatar (solo se gli elementi esistono nella pagina corrente)
if (avatarWrapper && avatarPhoto && avatarDraw) {

    avatarWrapper.addEventListener("mousemove", (e) => {
        if (window.innerWidth <= 767) return;

        const rect = avatarWrapper.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const centerX = rect.width * 0.43;
        const centerY = rect.height * 0.52;

        const radiusX = rect.width * 0.30;
        const radiusY = rect.height * 0.32;

        const inside =
            Math.pow((x - centerX) / radiusX, 2) +
            Math.pow((y - centerY) / radiusY, 2) <= 1;

        if (inside) {
            avatarPhoto.style.opacity = "0";
            avatarDraw.style.opacity = "1";
        } else {
            avatarPhoto.style.opacity = "1";
            avatarDraw.style.opacity = "0";
        }
    });

    avatarWrapper.addEventListener("mouseleave", () => {
        if (window.innerWidth <= 767) return;

        avatarPhoto.style.opacity = "1";
        avatarDraw.style.opacity = "0";
    });
}