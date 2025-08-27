document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('.main-nav');

    // Deklarasikan navLinks, mengecualikan tombol download dari daftar link navigasi biasa
    const navLinks = document.querySelectorAll('.nav-links a:not(.btn-download)'); 

    const header = document.querySelector('header');
    // Tinggi header kini termasuk padding dari header itu sendiri + padding dari container di dalamnya
    // Ini adalah height dinamis dari pill navbar itu sendiri
    const headerContainer = document.querySelector('header .container');
    const headerHeight = headerContainer ? headerContainer.offsetHeight : 0; 
    // Untuk Sticky Header, offset yang dibutuhkan adalah tinggi header itu sendiri + jarak `top` nya
    const stickyTopOffset = 20; // Sesuai dengan `top: 20px` di CSS header
    const finalHeaderOffset = headerHeight + stickyTopOffset + 10; // Tambahkan sedikit ruang ekstra


    // Toggle mobile menu
    menuToggle.addEventListener('click', function() {
        this.classList.toggle('open');
        navMenu.classList.toggle('show');
        document.body.classList.toggle('no-scroll');
    });

    // Close mobile menu when a link is clicked
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (navMenu.classList.contains('show')) {
                menuToggle.classList.remove('open');
                navMenu.classList.remove('show');
                document.body.classList.remove('no-scroll');
            }
        });
    });

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const elementPosition = targetElement.getBoundingClientRect().top;
                // Gunakan finalHeaderOffset untuk perhitungan offset
                const offsetPosition = elementPosition + window.pageYOffset - finalHeaderOffset;
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Scroll animation for elements
    const animateElements = document.querySelectorAll('.animate-on-scroll');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    });

    animateElements.forEach(element => {
        observer.observe(element);
    });

    // Active link highlighting based on scroll position
    const sections = document.querySelectorAll('section');
    
    function updateActiveNav() {
        let current = '';
        
        sections.forEach(section => {
            // Gunakan finalHeaderOffset untuk perhitungan sectionTop
            const sectionTop = section.offsetTop - finalHeaderOffset - 20; // 20px tambahan untuk sedikit "headroom"
            const sectionBottom = sectionTop + section.offsetHeight;
            
            if (window.pageYOffset >= sectionTop && window.pageYOffset < sectionBottom) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => { // Menggunakan navLinks yang sudah difilter
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    }

    window.addEventListener('scroll', updateActiveNav);
    updateActiveNav(); // Run once on load

    // Close menu when clicking outside
    document.addEventListener('click', function(e) {
        if (!e.target.closest('.main-nav') && !e.target.closest('.menu-toggle')) { 
            if (menuToggle && navMenu) { 
                menuToggle.classList.remove('open');
                navMenu.classList.remove('show');
                document.body.classList.remove('no-scroll');
            }
        }
    });

});