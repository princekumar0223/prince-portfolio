/* =========================================================
   PRINCE KUMAR PORTFOLIO — INTERACTIVE JAVASCRIPT
   Theme Switcher (Dark & Light), Gallery & Certificates Loader,
   Native Dialog Lightbox, Copy Email, & Smooth UX
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* ================= ELEMENTS ================= */
    const navbar = document.querySelector(".navbar");
    const navLinks = document.querySelectorAll(".nav-links a");
    const menuButton = document.getElementById("menuButton");
    const navMenu = document.getElementById("navLinks");
    const profileCard = document.querySelector(".profile-card");
    const heroVisual = document.querySelector(".hero-visual");
    const currentYearEl = document.getElementById("currentYear");
    const copyEmailBtn = document.getElementById("copyEmailBtn");
    const toastContainer = document.getElementById("toastContainer");
    const darkThemeBtn = document.getElementById("darkThemeBtn");
    const lightThemeBtn = document.getElementById("lightThemeBtn");
    const metaColorScheme = document.querySelector('meta[name="color-scheme"]');

    /* ================= NAVBAR SCROLL BLUR ================= */
    function updateNavbar() {
        const nav = navbar || document.querySelector(".navbar");
        if (!nav) return;
        const isLight = document.documentElement.getAttribute("data-theme") === "light" ||
                        (document.body && document.body.classList.contains("light-theme"));
        if (window.scrollY > 30) {
            nav.style.background = isLight ? "rgba(255, 255, 255, 0.94)" : "rgba(7, 7, 10, 0.94)";
            nav.style.borderBottomColor = isLight ? "rgba(147, 197, 253, 0.6)" : "rgba(214, 173, 96, 0.2)";
        } else {
            nav.style.background = isLight ? "rgba(255, 255, 255, 0.88)" : "rgba(7, 7, 10, 0.82)";
            nav.style.borderBottomColor = isLight ? "rgba(147, 197, 253, 0.4)" : "rgba(255, 255, 255, 0.08)";
        }
    }

    /* ================= THEME SWITCHER (DARK & LIGHT) ================= */
    function applyTheme(theme) {
        const targetTheme = theme === "light" ? "light" : "dark";
        document.documentElement.setAttribute("data-theme", targetTheme);
        if (document.body) {
            document.body.classList.toggle("light-theme", targetTheme === "light");
            document.body.classList.toggle("dark-theme", targetTheme === "dark");
        }
        if (metaColorScheme) {
            metaColorScheme.content = targetTheme;
        }
        try {
            localStorage.setItem("portfolio_theme", targetTheme);
        } catch (e) {}

        if (darkThemeBtn && lightThemeBtn) {
            if (targetTheme === "light") {
                lightThemeBtn.classList.add("active");
                darkThemeBtn.classList.remove("active");
            } else {
                darkThemeBtn.classList.add("active");
                lightThemeBtn.classList.remove("active");
            }
        }
        updateNavbar();
    }

    if (darkThemeBtn) {
        darkThemeBtn.addEventListener("click", (e) => {
            e.preventDefault();
            applyTheme("dark");
        });
    }
    if (lightThemeBtn) {
        lightThemeBtn.addEventListener("click", (e) => {
            e.preventDefault();
            applyTheme("light");
        });
    }

    // Initialize theme from localStorage or system preference
    const savedTheme = localStorage.getItem("portfolio_theme") || "dark";
    applyTheme(savedTheme);

    /* ================= CURRENT YEAR ================= */
    if (currentYearEl) {
        currentYearEl.textContent = new Date().getFullYear();
    }

    /* ================= MOBILE NAVIGATION ================= */
    if (menuButton && navMenu) {
        menuButton.addEventListener("click", () => {
            const isOpen = navMenu.classList.toggle("open");
            menuButton.classList.toggle("open", isOpen);
            menuButton.setAttribute("aria-label", isOpen ? "Close Menu" : "Open Menu");
        });

        navLinks.forEach((link) => {
            link.addEventListener("click", () => {
                navMenu.classList.remove("open");
                menuButton.classList.remove("open");
                menuButton.setAttribute("aria-label", "Open Menu");
            });
        });
    }

    /* ================= ACTIVE LINK ON SCROLL ================= */
    const sections = document.querySelectorAll("section[id]");

    function updateActiveNav() {
        const scrollPosition = window.scrollY + 160;

        sections.forEach((section) => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute("id");

            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                navLinks.forEach((link) => {
                    link.classList.remove("active");
                    if (link.getAttribute("href") === `#${sectionId}`) {
                        link.classList.add("active");
                    }
                });
            }
        });
    }

    window.addEventListener("scroll", () => {
        updateActiveNav();
        updateNavbar();
    }, { passive: true });

    /* ================= FLOATING AMBIENT GLOWING PARTICLES CANVAS (VAKTA STYLE) ================= */
    const ambientCanvas = document.getElementById("ambientCanvas");
    if (ambientCanvas && typeof ambientCanvas.getContext === "function") {
        const ambientCtx = ambientCanvas.getContext("2d");
        let bubbles = [];

        function initBubbles() {
            ambientCanvas.width = window.innerWidth;
            ambientCanvas.height = window.innerHeight;
            bubbles = [];
            const count = Math.max(35, Math.floor(window.innerWidth / 28)); // ~40-60 glowing particles
            for (let i = 0; i < count; i++) {
                bubbles.push({
                    x: Math.random() * ambientCanvas.width,
                    y: Math.random() * ambientCanvas.height,
                    radius: Math.random() * 2.8 + 1.2,
                    speedY: Math.random() * 0.45 + 0.16,
                    speedX: (Math.random() - 0.5) * 0.25,
                    alpha: Math.random() * 0.5 + 0.2,
                    pulseSpeed: Math.random() * 0.02 + 0.01
                });
            }
        }

        window.addEventListener("resize", initBubbles, { passive: true });
        initBubbles();

        function renderBubblesLoop() {
            ambientCtx.clearRect(0, 0, ambientCanvas.width, ambientCanvas.height);
            const isDark = document.documentElement.getAttribute("data-theme") !== "light";

            for (let i = 0; i < bubbles.length; i++) {
                const b = bubbles[i];
                b.y -= b.speedY;
                b.x += b.speedX;
                b.alpha += Math.sin(Date.now() * b.pulseSpeed) * 0.005;

                if (b.y < -15) {
                    b.y = ambientCanvas.height + 15;
                    b.x = Math.random() * ambientCanvas.width;
                }
                if (b.x < -10) b.x = ambientCanvas.width + 10;
                if (b.x > ambientCanvas.width + 10) b.x = -10;

                const safeAlpha = Math.max(0.12, Math.min(0.75, b.alpha));

                ambientCtx.beginPath();
                ambientCtx.arc(b.x, b.y, b.radius, 0, Math.PI * 2);
                if (isDark) {
                    ambientCtx.fillStyle = `rgba(0, 245, 196, ${safeAlpha * 0.85})`;
                    ambientCtx.shadowBlur = 8;
                    ambientCtx.shadowColor = "rgba(0, 245, 196, 0.6)";
                } else {
                    ambientCtx.fillStyle = `rgba(56, 189, 248, ${safeAlpha})`;
                    ambientCtx.shadowBlur = 7;
                    ambientCtx.shadowColor = "rgba(14, 165, 233, 0.45)";
                }
                ambientCtx.fill();
                ambientCtx.shadowBlur = 0;
            }
            if (typeof window.requestAnimationFrame === "function") {
                window.requestAnimationFrame(renderBubblesLoop);
            }
        }
        renderBubblesLoop();
    }

    /* ================= PROJECT CATEGORY FILTERS (IMAGE 2) ================= */
    const projectFilterBtns = document.querySelectorAll(".p-filter-btn");
    const projectCards = document.querySelectorAll(".project-feature");

    if (projectFilterBtns.length > 0 && projectCards.length > 0) {
        projectFilterBtns.forEach((btn) => {
            btn.addEventListener("click", () => {
                projectFilterBtns.forEach((b) => b.classList.remove("active"));
                btn.classList.add("active");

                const filter = btn.getAttribute("data-pfilter");

                projectCards.forEach((card) => {
                    const categories = (card.getAttribute("data-category") || "").split(" ");
                    if (filter === "all" || categories.includes(filter)) {
                        card.style.display = "grid";
                        card.style.opacity = "0";
                        card.style.transform = "translateY(15px)";
                        setTimeout(() => {
                            card.style.transition = "opacity 0.35s ease, transform 0.35s ease";
                            card.style.opacity = "1";
                            card.style.transform = "translateY(0)";
                        }, 20);
                    } else {
                        card.style.display = "none";
                    }
                });
            });
        });
    }

    /* ================= TOAST NOTIFICATION UTILITY ================= */
    function showToast(message, isSuccess = true) {
        if (!toastContainer) return;
        const toast = document.createElement("div");
        toast.className = "toast";
        toast.innerHTML = `
            <span>${isSuccess ? "✓" : "ℹ"}</span>
            <span>${message}</span>
        `;
        toastContainer.appendChild(toast);

        setTimeout(() => {
            toast.remove();
        }, 4000);
    }

    /* ================= COPY EMAIL TO CLIPBOARD ================= */
    if (copyEmailBtn) {
        copyEmailBtn.addEventListener("click", async () => {
            const email = "princekumarsing68@gmail.com";
            try {
                await navigator.clipboard.writeText(email);
                copyEmailBtn.classList.add("copied");
                const textSpan = copyEmailBtn.querySelector(".copy-text");
                const originalText = textSpan ? textSpan.textContent : "Copy Email";
                if (textSpan) textSpan.textContent = "Copied! ✓";

                showToast("Email address copied to clipboard!");

                setTimeout(() => {
                    copyEmailBtn.classList.remove("copied");
                    if (textSpan) textSpan.textContent = originalText;
                }, 2500);
            } catch (err) {
                showToast("Email: princekumarsing68@gmail.com", true);
            }
        });
    }

    /* ================= HERO PROFILE 3D PARALLAX ================= */
    if (profileCard && heroVisual && window.innerWidth > 900) {
        let mouseX = 0;
        let mouseY = 0;
        let currentX = 0;
        let currentY = 0;

        heroVisual.addEventListener("mousemove", (event) => {
            const rect = heroVisual.getBoundingClientRect();
            const x = event.clientX - rect.left;
            const y = event.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            mouseX = (x - centerX) / 25;
            mouseY = (y - centerY) / 25;
        });

        heroVisual.addEventListener("mouseleave", () => {
            mouseX = 0;
            mouseY = 0;
        });

        function animateProfile() {
            currentX += (mouseX - currentX) * 0.08;
            currentY += (mouseY - currentY) * 0.08;

            const floating = Math.sin(Date.now() / 1200) * 5;
            profileCard.style.transform = `perspective(1000px) rotateY(${currentX * 0.8}deg) rotateX(${-currentY * 0.8}deg) translateY(${floating}px)`;

            requestAnimationFrame(animateProfile);
        }

        animateProfile();
    }

    /* =========================================================
       PHOTO GALLERY & CERTIFICATES SYSTEM
       ========================================================= */

    const photosList = (typeof GALLERY_PHOTOS !== "undefined" && Array.isArray(GALLERY_PHOTOS))
        ? GALLERY_PHOTOS
        : [];

    const galleryGrid = document.getElementById("galleryGrid");
    const filterButtons = document.querySelectorAll(".filter-btn");
    const countAllEl = document.getElementById("countAll");
    const countCertEl = document.getElementById("countCert");

    // Update Counts
    if (countAllEl) countAllEl.textContent = photosList.length;
    if (countCertEl) {
        const certs = photosList.filter(p => p.category === "Certificates");
        countCertEl.textContent = certs.length;
    }

    // Lightbox Dialog Elements
    const galleryModal = document.getElementById("galleryModal");
    const modalCloseBtn = document.getElementById("modalCloseBtn");
    const modalImg = document.getElementById("modalImg");
    const modalCaption = document.getElementById("modalCaption");
    const modalMeta = document.getElementById("modalMeta");
    const modalDownloadBtn = document.getElementById("modalDownloadBtn");

    let currentFilter = "all";

    function renderGallery() {
        if (!galleryGrid) return;

        let filtered = photosList;
        if (currentFilter !== "all") {
            filtered = photosList.filter(p => p.category === currentFilter);
        }

        galleryGrid.innerHTML = "";

        if (filtered.length === 0) {
            galleryGrid.innerHTML = `
                <div style="grid-column: 1 / -1; text-align: center; padding: 60px 20px; color: var(--text-muted);">
                    <div style="font-size: 2.2rem; margin-bottom: 12px;">📜</div>
                    <p style="font-size: 1.05rem; color: var(--text-secondary); margin-bottom: 6px;">No items found in this category.</p>
                </div>
            `;
            return;
        }

        filtered.forEach((item) => {
            const card = document.createElement("div");
            card.className = "gallery-card";

            card.innerHTML = `
                <img src="${item.image}" alt="${item.title}" class="gallery-card-img" loading="lazy">
                <div class="gallery-card-overlay">
                    <div class="gallery-card-top">
                        <span class="gallery-tag-badge">${item.category || "Certificate"}</span>
                    </div>
                    <div class="gallery-card-bottom">
                        <div>
                            <span class="gallery-caption-text">${item.title}</span>
                            <span class="gallery-date-text">${item.date || ""}</span>
                        </div>
                        <div class="gallery-zoom-icon" title="View Full Certificate">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/><line x1="11" y1="8" x2="11" y2="14"/><line x1="8" y1="11" x2="14" y2="11"/></svg>
                        </div>
                    </div>
                </div>
            `;

            // Card click -> Open Lightbox
            card.addEventListener("click", () => {
                openLightbox(item);
            });

            galleryGrid.appendChild(card);
        });
    }

    // Open Lightbox with Modern <dialog>
    function openLightbox(item) {
        if (!galleryModal) return;
        modalImg.src = item.image;
        modalCaption.textContent = item.title;
        modalMeta.textContent = `${item.category} • ${item.date}`;
        modalDownloadBtn.href = item.image;
        modalDownloadBtn.download = `${item.title.toLowerCase().replace(/[^a-z0-9]/g, '-')}.jpg`;

        if (typeof galleryModal.showModal === "function") {
            galleryModal.showModal();
        } else {
            galleryModal.setAttribute("open", "");
        }
    }

    // Close Lightbox
    if (modalCloseBtn && galleryModal) {
        modalCloseBtn.addEventListener("click", () => {
            galleryModal.close();
        });
    }

    // Modern Web Guidance: Fallback light-dismiss for browsers lacking closedby support
    if (galleryModal && typeof HTMLDialogElement !== "undefined" && !('closedBy' in HTMLDialogElement.prototype)) {
        const outside = (e, dialog) => {
            const r = dialog.getBoundingClientRect();
            return e.clientX < r.left || e.clientX > r.right || e.clientY < r.top || e.clientY > r.bottom;
        };
        let pressedOutside = false;
        galleryModal.addEventListener("pointerdown", (e) => {
            pressedOutside = outside(e, galleryModal);
        });
        galleryModal.addEventListener("pointerup", (e) => {
            if (pressedOutside && outside(e, galleryModal)) {
                galleryModal.close();
            }
        });
    }

    // Filter Buttons click handler
    filterButtons.forEach((btn) => {
        btn.addEventListener("click", () => {
            filterButtons.forEach(b => b.classList.remove("active"));
            btn.classList.add("active");
            currentFilter = btn.getAttribute("data-filter") || "all";
            renderGallery();
        });
    });

    // Initialize gallery on load
    renderGallery();
    updateActiveNav();
    updateNavbar();

});
