document.addEventListener('DOMContentLoaded', () => {
    document.body.classList.add('js-enabled');
    /* --- Sticky Header + Back to Top Logic --- */
    const navbar = document.querySelector('.navbar');

    // Inject back-to-top button
    const backToTopBtn = document.createElement('button');
    backToTopBtn.id = 'back-to-top';
    backToTopBtn.setAttribute('aria-label', 'Back to top');
    backToTopBtn.innerHTML = '<i class="bi bi-arrow-up"></i>';
    document.body.appendChild(backToTopBtn);

    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        // Show/hide back-to-top
        if (window.scrollY > 400) {
            backToTopBtn.classList.add('visible');
        } else {
            backToTopBtn.classList.remove('visible');
        }
    });

    /* --- Theme Toggle --- */
    const themeToggleBtns = document.querySelectorAll('.theme-toggle');
    const currentTheme = localStorage.getItem('theme') || 'dark';

    document.documentElement.setAttribute('data-theme', currentTheme);
    themeToggleBtns.forEach(btn => updateThemeIcon(btn, currentTheme));

    themeToggleBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const current = document.documentElement.getAttribute('data-theme');
            const targetTheme = current === 'dark' ? 'light' : 'dark';
            
            document.documentElement.setAttribute('data-theme', targetTheme);
            localStorage.setItem('theme', targetTheme);
            themeToggleBtns.forEach(b => updateThemeIcon(b, targetTheme));
        });
    });

    function updateThemeIcon(btn, theme) {
        const icon = btn.querySelector('i');
        if (theme === 'dark') {
            icon.classList.remove('bi-moon-fill');
            icon.classList.add('bi-sun-fill');
        } else {
            icon.classList.remove('bi-sun-fill');
            icon.classList.add('bi-moon-fill');
        }
    }

    /* --- RTL Toggle --- */
    const rtlToggleBtns = document.querySelectorAll('.rtl-toggle');
    const isRtl = localStorage.getItem('rtl') === 'true';

    if (isRtl) {
        document.documentElement.setAttribute('dir', 'rtl');
        document.documentElement.classList.add('rtl');
    }

    rtlToggleBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const currentRtl = document.documentElement.getAttribute('dir') === 'rtl';
            const targetRtl = !currentRtl;
            
            document.documentElement.setAttribute('dir', targetRtl ? 'rtl' : 'ltr');
            if (targetRtl) {
                document.documentElement.classList.add('rtl');
            } else {
                document.documentElement.classList.remove('rtl');
            }
            localStorage.setItem('rtl', targetRtl);
        });
    });

    /* --- Scroll Reveal Animations --- */
    const observerOptions = {
        threshold: 0.10,
        rootMargin: '0px 0px -20px 0px'
    };

    const scrollObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, observerOptions);

    document.querySelectorAll('.reveal-left, .fade-in, .zoom-in').forEach(el => {
        scrollObserver.observe(el);
    });

    /* --- Active Navigation State --- */
    const currentPath = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.nav-link').forEach(link => {
        const linkPath = link.getAttribute('href');
        if (linkPath === currentPath) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });

    /* --- Smooth Scroll for anchor links --- */
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    /* --- Product/Gallery Modal Mock Content --- */
    const detailModals = document.querySelectorAll('.modal-detail-trigger');
    detailModals.forEach(btn => {
        btn.addEventListener('click', (e) => {
            const title = btn.dataset.title;
            const img = btn.dataset.img;
            const desc = btn.dataset.desc;
            const price = btn.dataset.price;

            const modalTitle = document.getElementById('detailModalLabel');
            const modalImg = document.getElementById('detailModalImg');
            const modalDesc = document.getElementById('detailModalDesc');
            const modalPrice = document.getElementById('detailModalPrice');

            if (modalTitle) modalTitle.innerText = title;
            if (modalImg) modalImg.src = img;
            if (modalDesc) modalDesc.innerText = desc;
            if (modalPrice) modalPrice.innerText = price || '';
        });
    });

    /* --- Password Visibility Toggle --- */
    const passwordToggles = document.querySelectorAll('.password-toggle');
    passwordToggles.forEach(btn => {
        btn.addEventListener('click', () => {
            const input = btn.parentElement.querySelector('input');
            const icon = btn.querySelector('i');
            
            if (input.type === 'password') {
                input.type = 'text';
                icon.classList.remove('bi-eye');
                icon.classList.add('bi-eye-slash');
            } else {
                input.type = 'password';
                icon.classList.remove('bi-eye-slash');
                icon.classList.add('bi-eye');
            }
        });
    });

    /* --- Gallery Filtering Logic --- */
    const filterBtns = document.querySelectorAll('.filter-btn');
    const galleryItems = document.querySelectorAll('.gallery-item');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class from all buttons
            filterBtns.forEach(b => {
                b.classList.remove('active', 'btn-primary');
                b.classList.add('btn-outline-premium');
            });
            // Add active class to current button
            btn.classList.add('active', 'btn-primary');
            btn.classList.remove('btn-outline-premium');

            const filterValue = btn.getAttribute('data-filter');

            galleryItems.forEach(item => {
                if (filterValue === 'all' || item.classList.contains(filterValue)) {
                    item.classList.remove('d-none');
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'scale(1)';
                    }, 50);
                } else {
                    item.style.opacity = '0';
                    item.style.transform = 'scale(0.8)';
                    setTimeout(() => {
                        item.classList.add('d-none');
                    }, 300);
                }
            });
        });
    });

    // Contact Form Logic
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const inputs = contactForm.querySelectorAll('input, select, textarea');
            let isValid = true;
            
            inputs.forEach(input => {
                if (!input.value || input.value === 'Select Interest') {
                    input.classList.add('is-invalid');
                    isValid = false;
                } else {
                    input.classList.remove('is-invalid');
                    input.classList.add('is-valid');
                }
            });

            if (isValid) {
                showToast("Message Sent!", "We'll get back to you within 24 hours.");
                contactForm.reset();
                inputs.forEach(input => input.classList.remove('is-valid'));
            }
        });
    }

    // Purchase Link Toast
    const purchaseBtn = document.querySelector('.btn-secure-instrument');
    if (purchaseBtn) {
        purchaseBtn.addEventListener('click', (e) => {
            e.preventDefault();
            showToast("Reservation Started", "Redirecting to our secure payment portal...");
            setTimeout(() => {
                window.location.href = "contact.html?ref=reservation";
            }, 2000);
        });
    }
});

// Toast System
function showToast(title, message) {
    let toastContainer = document.querySelector('.toast-container');
    if (!toastContainer) {
        toastContainer = document.createElement('div');
        toastContainer.className = 'toast-container position-fixed bottom-0 end-0 p-3';
        toastContainer.style.zIndex = '1060';
        document.body.appendChild(toastContainer);
    }

    const toastId = 'toast-' + Date.now();
    const toastHTML = `
        <div id="${toastId}" class="toast bg-darker border-primary border-opacity-50" role="alert" aria-live="assertive" aria-atomic="true">
            <div class="toast-header bg-dark text-white border-bottom border-secondary border-opacity-25">
                <i class="bi bi-soundwave text-primary me-2"></i>
                <strong class="me-auto">${title}</strong>
                <button type="button" class="btn-close btn-close-white" data-bs-dismiss="toast" aria-label="Close"></button>
            </div>
            <div class="toast-body text-secondary small">
                ${message}
            </div>
        </div>
    `;

    toastContainer.innerHTML += toastHTML;
    const toastElement = document.getElementById(toastId);
    const bsToast = new bootstrap.Toast(toastElement, { delay: 3000 });
    bsToast.show();

    toastElement.addEventListener('hidden.bs.toast', () => {
        toastElement.remove();
    });
}
