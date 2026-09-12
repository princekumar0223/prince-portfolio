/* =========================================================
   PRINCE KUMAR PORTFOLIO
   Interactive JavaScript
   ========================================================= */


/* ================= ELEMENTS ================= */

const navbar = document.querySelector(".navbar");

const navLinks = document.querySelectorAll(".nav-links a");

const sections = document.querySelectorAll("section[id]");

const menuButton = document.getElementById("menuButton");

const navMenu = document.getElementById("navLinks");

const profileCard = document.querySelector(".profile-card");

const heroVisual = document.querySelector(".hero-visual");

const footerText = document.querySelector(".footer p");


/* ================= MOBILE MENU ================= */

if (menuButton && navMenu) {

    menuButton.addEventListener("click", () => {

        navMenu.classList.toggle("open");

        const isOpen =
            navMenu.classList.contains("open");

        menuButton.setAttribute(
            "aria-label",
            isOpen ? "Close Menu" : "Open Menu"
        );

        menuButton.textContent =
            isOpen ? "✕" : "☰";

    });


    navLinks.forEach((link) => {

        link.addEventListener("click", () => {

            navMenu.classList.remove("open");

            menuButton.textContent = "☰";

            menuButton.setAttribute(
                "aria-label",
                "Open Menu"
            );

        });

    });

}


/* ================= ACTIVE NAVIGATION ================= */

function updateActiveNav() {

    let currentSection = "";

    const scrollPosition =
        window.scrollY + 180;


    sections.forEach((section) => {

        const sectionTop =
            section.offsetTop;

        const sectionBottom =
            sectionTop + section.offsetHeight;


        if (
            scrollPosition >= sectionTop &&
            scrollPosition < sectionBottom
        ) {

            currentSection =
                section.getAttribute("id");

        }

    });


    navLinks.forEach((link) => {

        link.classList.remove("active");

        if (
            link.getAttribute("href") ===
            `#${currentSection}`
        ) {

            link.classList.add("active");

        }

    });

}


/* ================= NAVBAR SCROLL ================= */

function updateNavbar() {

    if (!navbar) {
        return;
    }


    if (window.scrollY > 30) {

        navbar.style.background =
            "rgba(8, 8, 8, 0.94)";

        navbar.style.borderBottomColor =
            "rgba(214, 173, 96, 0.12)";

    } else {

        navbar.style.background =
            "rgba(8, 8, 8, 0.78)";

        navbar.style.borderBottomColor =
            "rgba(255, 255, 255, 0.06)";

    }

}


window.addEventListener(
    "scroll",
    () => {

        updateActiveNav();

        updateNavbar();

    },
    { passive: true }
);


/* ================= SMOOTH NAVIGATION ================= */

navLinks.forEach((link) => {

    link.addEventListener(
        "click",
        (event) => {

            const targetId =
                link.getAttribute("href");


            if (
                !targetId ||
                !targetId.startsWith("#")
            ) {

                return;

            }


            const target =
                document.querySelector(targetId);


            if (!target) {

                return;

            }


            event.preventDefault();


            const navbarHeight =
                navbar
                    ? navbar.offsetHeight
                    : 0;


            const targetPosition =
                target.getBoundingClientRect().top +
                window.scrollY -
                navbarHeight;


            window.scrollTo({

                top: targetPosition,

                behavior: "smooth"

            });

        }
    );

});


/* ================= SCROLL REVEAL ================= */

const revealElements =
    document.querySelectorAll(
        ".section, .skill-card, .project-card, .education-card, .highlight-card"
    );


const revealObserver =
    new IntersectionObserver(
        (entries, observer) => {

            entries.forEach((entry) => {

                if (entry.isIntersecting) {

                    entry.target.classList.add("show");

                    observer.unobserve(
                        entry.target
                    );

                }

            });

        },
        {
            threshold: 0.12
        }
    );


revealElements.forEach((element) => {

    element.classList.add("reveal");

    revealObserver.observe(element);

});


/* ================= PROFILE EFFECT ================= */

let mouseX = 0;

let mouseY = 0;

let currentX = 0;

let currentY = 0;

let animationFrame;


function animateProfile() {

    currentX +=
        (mouseX - currentX) * 0.08;

    currentY +=
        (mouseY - currentY) * 0.08;


    if (profileCard) {

        const floating =
            Math.sin(Date.now() / 1000) * 4;


        profileCard.style.transform =
            `rotate(3deg)
             translate(${currentX}px, ${currentY + floating}px)`;

    }


    animationFrame =
        requestAnimationFrame(
            animateProfile
        );

}


if (
    profileCard &&
    heroVisual &&
    window.innerWidth > 900
) {

    heroVisual.addEventListener(
        "mousemove",
        (event) => {

            const rect =
                heroVisual.getBoundingClientRect();


            const x =
                event.clientX - rect.left;


            const y =
                event.clientY - rect.top;


            const centerX =
                rect.width / 2;


            const centerY =
                rect.height / 2;


            mouseX =
                (x - centerX) / 35;


            mouseY =
                (y - centerY) / 35;

        }
    );


    heroVisual.addEventListener(
        "mouseleave",
        () => {

            mouseX = 0;

            mouseY = 0;

        }
    );


    animateProfile();

}


/* ================= BUTTON PRESS ================= */

const buttons =
    document.querySelectorAll(".btn");


buttons.forEach((button) => {

    button.addEventListener(
        "mousedown",
        () => {

            button.style.transform =
                "scale(0.97)";

        }
    );


    button.addEventListener(
        "mouseup",
        () => {

            button.style.transform = "";

        }
    );


    button.addEventListener(
        "mouseleave",
        () => {

            button.style.transform = "";

        }
    );

});


/* ================= CURRENT YEAR ================= */

if (footerText) {

    footerText.textContent =
        `© ${new Date().getFullYear()} Prince Kumar. All rights reserved.`;

}


/* ================= PAGE LOAD ================= */

window.addEventListener(
    "load",
    () => {

        updateActiveNav();

        updateNavbar();

    }
);