document.addEventListener("DOMContentLoaded", () => {
    // Carica la Navbar
    fetch("navbar.html")
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
    fetch("footer.html")
        .then(response => {
            if (!response.ok) throw new Error("Errore caricamento footer");
            return response.text();
        })
        .then(data => {
            document.getElementById("footer-placeholder").innerHTML = data;
            setActiveFooterLink();
            customizeFooterTitle(); // <--- Personalizza il titolo appena l'HTML esiste nel DOM!
        })
        .catch(err => console.error(err));
});

// Funzione per personalizzare il titolo del footer in base alla pagina
function customizeFooterTitle() {
    // Recupera il nome del file corrente (es. "work.html", "about.html")
    const currentPath = window.location.pathname.split("/").pop() || "home.html";
    
    // Seleziona l'h2 del footer inserito dinamicamente
    const footerTitle = document.querySelector("#footer-placeholder .keep-exploring-title");

    if (footerTitle) {
        // Mappa delle pagine con i relativi titoli desiderati nel footer
        const pageTitles = {
            "work.html": "That's it?",
            "about.html": "See what I create",
            "contact.html": "Until the next idea",
            "little-more.html": "That's me",
            "home.html": "Keep Exploring"
        };

        // Cambia il testo se la pagina è nella mappa, altrimenti lascia quello di default
        if (pageTitles[currentPath]) {
            footerTitle.textContent = pageTitles[currentPath];
        }
    }
}

function setActiveNavLink() {
    const currentPath = window.location.pathname.split("/").pop() || "home.html";
    const navLinks = document.querySelectorAll(".navbar a");
    
    navLinks.forEach(link => {
        if (link.getAttribute("href") === currentPath) {
            link.classList.add("active");
        } else {
            link.classList.remove("active");
        }
    });
}

function setActiveFooterLink() {
    const currentPath = window.location.pathname.split("/").pop() || "home.html";
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