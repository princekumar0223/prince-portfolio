/* =========================================================
   PRINCE KUMAR PORTFOLIO — INTERACTIVE JAVASCRIPT
   Theme Switcher (Dark & Light), Gallery & Certificates Loader,
   Native Dialog Lightbox, Copy Email, & Smooth UX
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* ================= THEME SWITCHER (DARK & LIGHT) ================= */
    const darkThemeBtn = document.getElementById("darkThemeBtn");
    const lightThemeBtn = document.getElementById("lightThemeBtn");
    const metaColorScheme = document.querySelector('meta[name="color-scheme"]');

    function applyTheme(theme) {
        document.documentElement.setAttribute("data-theme", theme);
        if (metaColorScheme) {
            metaColorScheme.content = theme;
        }
        try {
            localStorage.setItem("portfolio_theme", theme);
        } catch (e) {}

        if (darkThemeBtn && lightThemeBtn) {
            if (theme === "light") {
                lightThemeBtn.classList.add("active");
                darkThemeBtn.classList.remove("active");
            } else {
                darkThemeBtn.classList.add("active");
                lightThemeBtn.classList.remove("active");
            }
        }
    }

    // Initialize theme from localStorage or system preference
    const savedTheme = localStorage.getItem("portfolio_theme") || "dark";
    applyTheme(savedTheme);

    if (darkThemeBtn) {
        darkThemeBtn.addEventListener("click", () => applyTheme("dark"));
    }
    if (lightThemeBtn) {
        lightThemeBtn.addEventListener("click", () => applyTheme("light"));
    }

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

    /* ================= NAVBAR SCROLL BLUR ================= */
    function updateNavbar() {
        if (!navbar) return;
        const isLight = document.documentElement.getAttribute("data-theme") === "light";
        if (window.scrollY > 30) {
            navbar.style.background = isLight ? "rgba(246, 248, 252, 0.96)" : "rgba(7, 7, 10, 0.94)";
            navbar.style.borderBottomColor = isLight ? "rgba(179, 133, 45, 0.25)" : "rgba(214, 173, 96, 0.2)";
        } else {
            navbar.style.background = isLight ? "rgba(246, 248, 252, 0.85)" : "rgba(7, 7, 10, 0.82)";
            navbar.style.borderBottomColor = isLight ? "rgba(0, 0, 0, 0.08)" : "rgba(255, 255, 255, 0.08)";
        }
    }

    window.addEventListener("scroll", () => {
        updateActiveNav();
        updateNavbar();
    }, { passive: true });

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
    if (galleryModal && !('closedBy' in HTMLDialogElement.prototype)) {
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
