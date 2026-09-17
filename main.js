/**
 * Portfolio Rizky Qiano Pratama
 * Interactive Client Scripts
 */

document.addEventListener('DOMContentLoaded', () => {
  // Elements
  const navbar = document.querySelector('.navbar');
  const menuToggle = document.querySelector('.menu-toggle');
  const navMenu = document.querySelector('.nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');
  const backToTopBtn = document.querySelector('.back-to-top');
  const copyEmailBtn = document.getElementById('copyEmailBtn');
  const toastMsg = document.getElementById('toastMsg');
  const projectButtons = document.querySelectorAll('.btn-project');

  /* ----------------------------------------------------
     1. Sticky Navbar & Back-to-top Scroll Effects
  ---------------------------------------------------- */
  const handleScroll = () => {
    const scrollY = window.scrollY;

    // Navbar style shift
    if (scrollY > 40) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }

    // Back to top button visibility
    if (scrollY > 400) {
      backToTopBtn.classList.add('visible');
    } else {
      backToTopBtn.classList.remove('visible');
    }

    // ScrollSpy active link
    updateActiveNav();
  };

  window.addEventListener('scroll', handleScroll, { passive: true });

  /* ----------------------------------------------------
     2. Mobile Menu Toggle
  ---------------------------------------------------- */
  if (menuToggle && navMenu) {
    menuToggle.addEventListener('click', () => {
      const isOpen = navMenu.classList.toggle('open');
      menuToggle.classList.toggle('open', isOpen);
      menuToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });

    // Close menu when clicking nav link
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('open');
        menuToggle.classList.remove('open');
        menuToggle.setAttribute('aria-expanded', 'false');
      });
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
      if (!navbar.contains(e.target) && navMenu.classList.contains('open')) {
        navMenu.classList.remove('open');
        menuToggle.classList.remove('open');
        menuToggle.setAttribute('aria-expanded', 'false');
      }
    });
  }

  /* ----------------------------------------------------
     3. Active Navigation on Scroll (ScrollSpy)
  ---------------------------------------------------- */
  const sections = document.querySelectorAll('section[id]');

  function updateActiveNav() {
    const scrollPosition = window.scrollY + 120;

    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute('id');

      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active');
          }
        });
      }
    });
  }

  /* ----------------------------------------------------
     4. Back to Top Smooth Scroll
  ---------------------------------------------------- */
  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

  /* ----------------------------------------------------
     5. Copy Email to Clipboard with Toast Feedback
  ---------------------------------------------------- */
  if (copyEmailBtn) {
    copyEmailBtn.addEventListener('click', async () => {
      const email = 'mazzqiano45@gmail.com';

      try {
        if (navigator.clipboard && window.isSecureContext) {
          await navigator.clipboard.writeText(email);
        } else {
          // Fallback
          const tempInput = document.createElement('input');
          tempInput.value = email;
          document.body.appendChild(tempInput);
          tempInput.select();
          document.execCommand('copy');
          document.body.removeChild(tempInput);
        }
        showToast('Email mazzqiano45@gmail.com berhasil disalin! 📋');
      } catch (err) {
        showToast('Email: mazzqiano45@gmail.com ✨');
      }
    });
  }

  function showToast(message) {
    if (!toastMsg) return;
    toastMsg.textContent = message;
    toastMsg.classList.add('show');
    clearTimeout(toastMsg._timeout);
    toastMsg._timeout = setTimeout(() => {
      toastMsg.classList.remove('show');
    }, 3500);
  }

  /* ----------------------------------------------------
     6. Coming Soon Projects Friendly Feedback
  ---------------------------------------------------- */
  projectButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      showToast('Project ini masih dalam tahap pengerjaan & belajar 🚀');
    });
  });

  /* ----------------------------------------------------
     7. Intersection Observer for Scroll Reveal
  ---------------------------------------------------- */
  const revealElements = document.querySelectorAll('.reveal');
  
  if ('IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
          observer.unobserve(entry.target);
        }
      });
    }, {
      root: null,
      threshold: 0.12,
      rootMargin: '0px 0px -40px 0px'
    });

    revealElements.forEach(el => revealObserver.observe(el));
  } else {
    // Fallback for older environments
    revealElements.forEach(el => el.classList.add('active'));
  }

  // Initial trigger for active nav
  updateActiveNav();
});
