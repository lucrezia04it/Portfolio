document.addEventListener("DOMContentLoaded", () => {
    // Controlla se ci troviamo nella cartella "html/" o nella root principale
    const isInHtmlFolder = window.location.pathname.includes("/html/");
    
    // Definisce i percorsi corretti per il fetch in base a dove si trova la pagina attuale
    const navbarPath = isInHtmlFolder ? "navbar.html" : "html/navbar.html";
    const footerPath = isInHtmlFolder ? "footer.html" : "html/footer.html";

    // Carica la Navbar
    fetch(navbarPath)
        .then(response => {
            if (!response.ok) throw new Error("Errore caricamento navbar");
            return response.text();
        })
        .then(data => {
            document.getElementById("navbar-placeholder").innerHTML = data;
            setActiveNavLink();
            initHamburgerMenu();
        })
        .catch(err => console.error(err));

    // Carica il Footer
    fetch(footerPath)
        .then(response => {
            if (!response.ok) throw new Error("Errore caricamento footer");
            return response.text();
        })
        .then(data => {
            document.getElementById("footer-placeholder").innerHTML = data;
            setActiveFooterLink();
            customizeFooterTitle(); 
        })
        .catch(err => console.error(err));
});

// Funzione per personalizzare il titolo del footer in base alla pagina
function customizeFooterTitle() {
    const currentPath = window.location.pathname.split("/").pop() || "index.html";
    const footerTitle = document.querySelector("#footer-placeholder .keep-exploring-title");

    if (footerTitle) {
        const pageTitles = {
            "work.html": "That's it?",
            "about.html": "See what I create",
            "contact.html": "Until the next idea",
            "little-more.html": "That's me",
            "index.html": "Keep Exploring"
        };

        if (pageTitles[currentPath]) {
            footerTitle.textContent = pageTitles[currentPath];
        }
    }
}

function setActiveNavLink() {
    const currentPath = window.location.pathname.split("/").pop() || "index.html";
    const navLinks = document.querySelectorAll(".navbar a");

    navLinks.forEach(link => {
        const href = link.getAttribute("href");

        // Home
        if (link.textContent.trim() === "Home") {
            link.setAttribute(
                "href",
                currentPath === "index.html" ? "index.html" : "../index.html"
            );
        }

        // Pagine interne
        else if (["About", "Work", "Little More", "Get in Touch"].includes(link.textContent.trim())) {
            const pages = {
                "About": "about.html",
                "Work": "work.html",
                "Little More": "little-more.html",
                "Get in Touch": "contact.html"
            };

            link.setAttribute(
                "href",
                currentPath === "index.html"
                    ? `html/${pages[link.textContent.trim()]}`
                    : pages[link.textContent.trim()]
            );
        }

        // Aggiorna stato active
        const finalHref = link.getAttribute("href");

        if (
            (currentPath === "index.html" && finalHref === "index.html") ||
            finalHref === currentPath ||
            finalHref === `html/${currentPath}`
        ) {
            link.classList.add("active");
        } else {
            link.classList.remove("active");
        }
    });
}

function setActiveFooterLink() {
    const currentPath = window.location.pathname.split("/").pop() || "index.html";
    const footerLinks = document.querySelectorAll(".breadcrumbs a");
    
    footerLinks.forEach(link => {
        if (link.getAttribute("href") === currentPath) {
            link.classList.add("active");
        } else {
            link.classList.remove("active");
        }
    });
}

function initHamburgerMenu() {
    const hamburger = document.querySelector(".hamburger");
    const navbar = document.querySelector(".navbar");

    if (hamburger && navbar) {
        hamburger.addEventListener("click", () => {
            navbar.classList.toggle("mobile-open");
            hamburger.classList.toggle("active");
        });
    }
}