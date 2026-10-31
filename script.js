/* =========================================================
   PRINCE KUMAR PORTFOLIO — INTERACTIVE JAVASCRIPT
   Modern Gallery Uploads, LocalStorage Persistence,
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
        if (window.scrollY > 30) {
            navbar.style.background = "rgba(7, 7, 10, 0.94)";
            navbar.style.borderBottomColor = "rgba(214, 173, 96, 0.2)";
        } else {
            navbar.style.background = "rgba(7, 7, 10, 0.82)";
            navbar.style.borderBottomColor = "rgba(255, 255, 255, 0.08)";
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
        let isHovered = false;

        heroVisual.addEventListener("mousemove", (event) => {
            const rect = heroVisual.getBoundingClientRect();
            const x = event.clientX - rect.left;
            const y = event.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            mouseX = (x - centerX) / 25;
            mouseY = (y - centerY) / 25;
            isHovered = true;
        });

        heroVisual.addEventListener("mouseleave", () => {
            mouseX = 0;
            mouseY = 0;
            isHovered = false;
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
       PHOTO GALLERY SYSTEM
       LocalStorage Persistence + Native <dialog> Lightbox
       ========================================================= */

    const LOCAL_STORAGE_KEY = "prince_portfolio_gallery_photos_v2";

    // High quality Curated Default Photos
    const defaultPhotos = [
        {
            id: "default-1",
            title: "Prince Kumar — B.Tech AIML",
            tag: "Personal",
            date: "2024 – 2028",
            imageUrl: "assets/images/profile.jpg",
            isUserUploaded: false
        },
        {
            id: "default-2",
            title: "Gulzar Group of Institutions Campus",
            tag: "College Life",
            date: "Ludhiana, Punjab",
            imageUrl: "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='800' height='600' viewBox='0 0 800 600'><defs><linearGradient id='bg' x1='0%' y1='0%' x2='100%' y2='100%'><stop offset='0%' stop-color='%2313131c'/><stop offset='100%' stop-color='%2309090d'/></linearGradient><linearGradient id='goldG' x1='0%' y1='0%' x2='100%' y2='100%'><stop offset='0%' stop-color='%23f5d790'/><stop offset='100%' stop-color='%23d6ad60'/></linearGradient></defs><rect width='800' height='600' fill='url(%23bg)'/><circle cx='400' cy='300' r='180' fill='%23d6ad60' opacity='0.08'/><path d='M250 420 L250 250 L400 160 L550 250 L550 420 Z' fill='none' stroke='url(%23goldG)' stroke-width='4'/><rect x='300' y='280' width='50' height='60' rx='8' fill='%23d6ad60' opacity='0.3'/><rect x='450' y='280' width='50' height='60' rx='8' fill='%23d6ad60' opacity='0.3'/><rect x='370' y='320' width='60' height='100' rx='6' fill='%23d6ad60' opacity='0.5'/><text x='400' y='490' font-family='Arial' font-size='26' font-weight='bold' fill='white' text-anchor='middle'>GGI Ludhiana Campus</text><text x='400' y='525' font-family='Arial' font-size='18' fill='%23d6ad60' text-anchor='middle'>B.Tech Computer Science &amp; Engineering</text></svg>",
            isUserUploaded: false
        },
        {
            id: "default-3",
            title: "AI & Web Development Hackathon",
            tag: "Tech & Hackathons",
            date: "Coding & Innovation",
            imageUrl: "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='800' height='600' viewBox='0 0 800 600'><defs><linearGradient id='bg2' x1='0%' y1='0%' x2='100%' y2='100%'><stop offset='0%' stop-color='%230f1422'/><stop offset='100%' stop-color='%2307070a'/></linearGradient><linearGradient id='goldG2' x1='0%' y1='0%' x2='100%' y2='100%'><stop offset='0%' stop-color='%232ed573'/><stop offset='100%' stop-color='%2310ac84'/></linearGradient></defs><rect width='800' height='600' fill='url(%23bg2)'/><circle cx='400' cy='280' r='140' fill='%23d6ad60' opacity='0.05'/><rect x='220' y='180' width='360' height='230' rx='16' fill='%23131722' stroke='%23d6ad60' stroke-width='3'/><circle cx='255' cy='210' r='6' fill='%23ff5f56'/><circle cx='275' cy='210' r='6' fill='%23ffbd2e'/><circle cx='295' cy='210' r='6' fill='%2327c93f'/><text x='250' y='270' font-family='monospace' font-size='20' fill='%23f5d790'>const prince = new Developer({</text><text x='270' y='305' font-family='monospace' font-size='18' fill='%232ed573'>  focus: ['AI', 'FullStack'],</text><text x='270' y='340' font-family='monospace' font-size='18' fill='%2354a0ff'>  status: 'Deploying Solutions'</text><text x='250' y='375' font-family='monospace' font-size='20' fill='%23f5d790'>});</text><text x='400' y='490' font-family='Arial' font-size='24' font-weight='bold' fill='white' text-anchor='middle'>Code &amp; AI Engineering Sprint</text><text x='400' y='525' font-family='Arial' font-size='16' fill='%23a0a0b0' text-anchor='middle'>Hackathon Building &amp; Innovation</text></svg>",
            isUserUploaded: false
        },
        {
            id: "default-4",
            title: "Relink AI & Cloud Architecture",
            tag: "Tech & Hackathons",
            date: "Render Cloud Live",
            imageUrl: "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='800' height='600' viewBox='0 0 800 600'><defs><linearGradient id='bg3' x1='0%' y1='0%' x2='100%' y2='100%'><stop offset='0%' stop-color='%2318121f'/><stop offset='100%' stop-color='%2308070b'/></linearGradient><linearGradient id='goldG3' x1='0%' y1='0%' x2='100%' y2='100%'><stop offset='0%' stop-color='%23f5d790'/><stop offset='100%' stop-color='%23d6ad60'/></linearGradient></defs><rect width='800' height='600' fill='url(%23bg3)'/><circle cx='400' cy='260' r='100' fill='%23d6ad60' opacity='0.15'/><polygon points='400,160 490,260 400,360 310,260' fill='none' stroke='url(%23goldG3)' stroke-width='4'/><circle cx='400' cy='260' r='20' fill='%23d6ad60'/><text x='400' y='480' font-family='Arial' font-size='26' font-weight='bold' fill='white' text-anchor='middle'>Relink AI Cloud Deployment</text><text x='400' y='515' font-family='Arial' font-size='17' fill='%23d6ad60' text-anchor='middle'>Production Ready URL &amp; Link Intelligence</text></svg>",
            isUserUploaded: false
        }
    ];

    // Load user photos from localStorage
    function getStoredPhotos() {
        try {
            const raw = localStorage.getItem(LOCAL_STORAGE_KEY);
            return raw ? JSON.parse(raw) : [];
        } catch (e) {
            console.error("Failed to read photos from localStorage:", e);
            return [];
        }
    }

    function saveStoredPhotos(photos) {
        try {
            localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(photos));
        } catch (e) {
            console.error("Storage limit reached while saving photos:", e);
            showToast("Storage quota exceeded. Please remove some photos.", false);
        }
    }

    // Combine default and user photos
    function getAllPhotos() {
        const userPhotos = getStoredPhotos();
        return [...userPhotos, ...defaultPhotos];
    }

    // Gallery DOM elements
    const galleryGrid = document.getElementById("galleryGrid");
    const countAllEl = document.getElementById("countAll");
    const countUploadedEl = document.getElementById("countUploaded");
    const filterButtons = document.querySelectorAll(".filter-btn");

    // Upload Panel Elements
    const toggleUploadBtn = document.getElementById("toggleUploadBtn");
    const uploadPanel = document.getElementById("uploadPanel");
    const closeUploadBtn = document.getElementById("closeUploadBtn");
    const cancelUploadBtn = document.getElementById("cancelUploadBtn");
    const uploadDropzone = document.getElementById("uploadDropzone");
    const galleryFileInput = document.getElementById("galleryFileInput");
    const dropzonePrompt = document.getElementById("dropzonePrompt");
    const dropzonePreview = document.getElementById("dropzonePreview");
    const selectedImagePreview = document.getElementById("selectedImagePreview");
    const removeSelectedBtn = document.getElementById("removeSelectedBtn");
    const photoCaptionInput = document.getElementById("photoCaptionInput");
    const photoTagSelect = document.getElementById("photoTagSelect");
    const confirmUploadBtn = document.getElementById("confirmUploadBtn");

    // Lightbox Dialog Elements
    const galleryModal = document.getElementById("galleryModal");
    const modalCloseBtn = document.getElementById("modalCloseBtn");
    const modalImg = document.getElementById("modalImg");
    const modalCaption = document.getElementById("modalCaption");
    const modalMeta = document.getElementById("modalMeta");
    const modalDownloadBtn = document.getElementById("modalDownloadBtn");

    let currentFilter = "all";
    let pendingImageDataUrl = null;

    // Render Gallery Cards
    function renderGallery() {
        if (!galleryGrid) return;
        const allPhotos = getAllPhotos();
        const userPhotos = getStoredPhotos();

        // Update counts
        if (countAllEl) countAllEl.textContent = allPhotos.length;
        if (countUploadedEl) countUploadedEl.textContent = userPhotos.length;

        // Filter photos
        let filtered = allPhotos;
        if (currentFilter === "uploaded") {
            filtered = allPhotos.filter(p => p.isUserUploaded);
        } else if (currentFilter === "college") {
            filtered = allPhotos.filter(p => p.tag === "College Life");
        } else if (currentFilter === "tech") {
            filtered = allPhotos.filter(p => p.tag === "Tech & Hackathons");
        }

        galleryGrid.innerHTML = "";

        if (filtered.length === 0) {
            galleryGrid.innerHTML = `
                <div style="grid-column: 1 / -1; text-align: center; padding: 60px 20px; color: var(--text-muted);">
                    <div style="font-size: 2.5rem; margin-bottom: 12px;">📷</div>
                    <p style="font-size: 1.1rem; color: var(--text-secondary); margin-bottom: 8px;">No photos found in this category.</p>
                    <p style="font-size: 0.9rem;">Click "Upload Photo" above to upload your first memorable picture!</p>
                </div>
            `;
            return;
        }

        filtered.forEach((photo) => {
            const card = document.createElement("div");
            card.className = "gallery-card";
            card.setAttribute("data-id", photo.id);

            card.innerHTML = `
                <img src="${photo.imageUrl}" alt="${photo.title}" class="gallery-card-img" loading="lazy">
                <div class="gallery-card-overlay">
                    <div class="gallery-card-top">
                        <span class="gallery-tag-badge">${photo.tag || "Moment"}</span>
                        ${photo.isUserUploaded ? `
                            <button type="button" class="gallery-delete-btn" title="Delete Photo" data-delete-id="${photo.id}">
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>
                            </button>
                        ` : ''}
                    </div>
                    <div class="gallery-card-bottom">
                        <div>
                            <span class="gallery-caption-text">${photo.title}</span>
                            <span class="gallery-date-text">${photo.date || "Memory"}</span>
                        </div>
                        <div class="gallery-zoom-icon" title="View Fullscreen">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/><line x1="11" y1="8" x2="11" y2="14"/><line x1="8" y1="11" x2="14" y2="11"/></svg>
                        </div>
                    </div>
                </div>
            `;

            // Card click -> Open Lightbox (unless clicking delete button)
            card.addEventListener("click", (e) => {
                if (e.target.closest(".gallery-delete-btn")) return;
                openLightbox(photo);
            });

            // Delete button listener
            const deleteBtn = card.querySelector(".gallery-delete-btn");
            if (deleteBtn) {
                deleteBtn.addEventListener("click", (e) => {
                    e.stopPropagation();
                    deletePhoto(photo.id);
                });
            }

            galleryGrid.appendChild(card);
        });
    }

    // Delete photo from localStorage
    function deletePhoto(photoId) {
        if (!confirm("Are you sure you want to remove this photo from your gallery?")) return;
        const currentStored = getStoredPhotos();
        const updated = currentStored.filter(p => p.id !== photoId);
        saveStoredPhotos(updated);
        renderGallery();
        showToast("Photo removed from gallery.");
    }

    // Open Lightbox with Modern <dialog>
    function openLightbox(photo) {
        if (!galleryModal) return;
        modalImg.src = photo.imageUrl;
        modalCaption.textContent = photo.title;
        modalMeta.textContent = `${photo.tag} • ${photo.date}`;
        modalDownloadBtn.href = photo.imageUrl;
        modalDownloadBtn.download = `${photo.title.toLowerCase().replace(/[^a-z0-9]/g, '-')}.jpg`;

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

    // Toggle Upload Panel
    function openUploadPanel() {
        if (!uploadPanel) return;
        uploadPanel.classList.add("open");
        uploadPanel.scrollIntoView({ behavior: "smooth", block: "nearest" });
    }

    function closeUploadPanel() {
        if (!uploadPanel) return;
        uploadPanel.classList.remove("open");
        resetUploadForm();
    }

    if (toggleUploadBtn) toggleUploadBtn.addEventListener("click", openUploadPanel);
    if (closeUploadBtn) closeUploadBtn.addEventListener("click", closeUploadPanel);
    if (cancelUploadBtn) cancelUploadBtn.addEventListener("click", closeUploadPanel);

    // Dropzone & File Handling
    if (uploadDropzone && galleryFileInput) {
        uploadDropzone.addEventListener("click", (e) => {
            if (e.target === removeSelectedBtn) return;
            galleryFileInput.click();
        });

        uploadDropzone.addEventListener("dragover", (e) => {
            e.preventDefault();
            uploadDropzone.classList.add("drag-over");
        });

        uploadDropzone.addEventListener("dragleave", () => {
            uploadDropzone.classList.remove("drag-over");
        });

        uploadDropzone.addEventListener("drop", (e) => {
            e.preventDefault();
            uploadDropzone.classList.remove("drag-over");
            if (e.dataTransfer.files && e.dataTransfer.files[0]) {
                processFile(e.dataTransfer.files[0]);
            }
        });

        galleryFileInput.addEventListener("change", () => {
            if (galleryFileInput.files && galleryFileInput.files[0]) {
                processFile(galleryFileInput.files[0]);
            }
        });
    }

    if (removeSelectedBtn) {
        removeSelectedBtn.addEventListener("click", (e) => {
            e.stopPropagation();
            resetUploadForm();
        });
    }

    // Process & Compress Image via Canvas to optimize LocalStorage size
    function processFile(file) {
        if (!file.type.startsWith("image/")) {
            showToast("Please select a valid image file (JPG, PNG, WEBP).", false);
            return;
        }

        const reader = new FileReader();
        reader.onload = (e) => {
            const img = new Image();
            img.onload = () => {
                // Resize image to max 1200px to ensure fast load and low localStorage usage
                const maxDim = 1200;
                let width = img.width;
                let height = img.height;

                if (width > maxDim || height > maxDim) {
                    if (width > height) {
                        height = Math.round((height * maxDim) / width);
                        width = maxDim;
                    } else {
                        width = Math.round((width * maxDim) / height);
                        height = maxDim;
                    }
                }

                const canvas = document.createElement("canvas");
                canvas.width = width;
                canvas.height = height;
                const ctx = canvas.getContext("2d");
                ctx.drawImage(img, 0, 0, width, height);

                // Convert to compressed JPEG data URL
                pendingImageDataUrl = canvas.toDataURL("image/jpeg", 0.82);

                // Update preview in dropzone
                selectedImagePreview.src = pendingImageDataUrl;
                dropzonePrompt.style.display = "none";
                dropzonePreview.style.display = "flex";

                // Autofill caption with filename if empty
                if (photoCaptionInput && !photoCaptionInput.value.trim()) {
                    const cleanName = file.name.replace(/\.[^/.]+$/, "").replace(/[-_]/g, " ");
                    photoCaptionInput.value = cleanName.charAt(0).toUpperCase() + cleanName.slice(1);
                }
            };
            img.src = e.target.result;
        };
        reader.readAsDataURL(file);
    }

    function resetUploadForm() {
        pendingImageDataUrl = null;
        if (galleryFileInput) galleryFileInput.value = "";
        if (photoCaptionInput) photoCaptionInput.value = "";
        if (dropzonePrompt) dropzonePrompt.style.display = "block";
        if (dropzonePreview) dropzonePreview.style.display = "none";
    }

    // Confirm Upload Button
    if (confirmUploadBtn) {
        confirmUploadBtn.addEventListener("click", () => {
            if (!pendingImageDataUrl) {
                showToast("Please choose or drop a photo first!", false);
                return;
            }

            const caption = (photoCaptionInput && photoCaptionInput.value.trim())
                ? photoCaptionInput.value.trim()
                : "My Memory";
            const tag = (photoTagSelect && photoTagSelect.value)
                ? photoTagSelect.value
                : "Moments";

            const now = new Date();
            const formattedDate = now.toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
                year: "numeric"
            });

            const newPhoto = {
                id: "user-" + Date.now(),
                title: caption,
                tag: tag,
                date: formattedDate,
                imageUrl: pendingImageDataUrl,
                isUserUploaded: true
            };

            const userPhotos = getStoredPhotos();
            userPhotos.unshift(newPhoto);
            saveStoredPhotos(userPhotos);

            // Re-render gallery with new photo
            renderGallery();
            closeUploadPanel();
            showToast("Photo added to gallery successfully! 🎉");

            // Scroll to gallery
            const gallerySection = document.getElementById("gallery");
            if (gallerySection) {
                gallerySection.scrollIntoView({ behavior: "smooth" });
            }
        });
    }

    // Initialize gallery on load
    renderGallery();
    updateActiveNav();
    updateNavbar();

});
