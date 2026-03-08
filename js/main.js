/* ===========================
   MAIN.JS — Law Offices of Norman J. Homen
   =========================== */

// Mobile nav toggle
(function () {
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.getElementById('nav-links');

  if (!hamburger || !navLinks) return;

  // Set initial state on mobile: links hidden and not keyboard-reachable
  function setNavClosed() {
    navLinks.classList.remove('nav-open');
    hamburger.classList.remove('open');
    hamburger.setAttribute('aria-expanded', 'false');
    navLinks.setAttribute('aria-hidden', 'true');
    navLinks.querySelectorAll('a').forEach(function (link) {
      link.setAttribute('tabindex', '-1');
    });
  }

  function setNavOpen() {
    navLinks.classList.add('nav-open');
    hamburger.classList.add('open');
    hamburger.setAttribute('aria-expanded', 'true');
    navLinks.setAttribute('aria-hidden', 'false');
    navLinks.querySelectorAll('a').forEach(function (link) {
      link.removeAttribute('tabindex');
    });
  }

  // Initialize: on mobile start closed; on desktop reset to normal
  if (window.innerWidth <= 768) {
    setNavClosed();
  }

  hamburger.addEventListener('click', function () {
    const isOpen = navLinks.classList.contains('nav-open');
    if (isOpen) {
      setNavClosed();
    } else {
      setNavOpen();
    }
  });

  // Close nav when a link is clicked
  navLinks.querySelectorAll('a').forEach(function (link) {
    link.addEventListener('click', function () {
      if (window.innerWidth <= 768) {
        setNavClosed();
      }
    });
  });

  // Close nav on outside click
  document.addEventListener('click', function (e) {
    if (!hamburger.contains(e.target) && !navLinks.contains(e.target)) {
      if (navLinks.classList.contains('nav-open')) {
        setNavClosed();
      }
    }
  });

  // Keyboard accessibility: close on Escape
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && navLinks.classList.contains('nav-open')) {
      setNavClosed();
      hamburger.focus();
    }
  });
})();

// Scroll-triggered animations (IntersectionObserver)
(function () {
  if (!('IntersectionObserver' in window)) {
    // Fallback: show all animated elements
    document.querySelectorAll('.animate-up').forEach(function (el) {
      el.classList.add('in-view');
    });
    return;
  }

  var observer = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
  );

  document.querySelectorAll('.animate-up').forEach(function (el) {
    observer.observe(el);
  });
})();

// Nav background on scroll
(function () {
  var nav = document.querySelector('.site-nav');
  if (!nav) return;

  function handleScroll() {
    if (window.scrollY > 40) {
      nav.style.background = 'rgba(6,14,26,0.99)';
    } else {
      nav.style.background = 'rgba(13,27,46,0.97)';
    }
  }

  window.addEventListener('scroll', handleScroll, { passive: true });
})();

// Active nav link highlighting
(function () {
  var sections = document.querySelectorAll('section[id]');
  var navLinks = document.querySelectorAll('.nav-links a');

  if (!sections.length || !navLinks.length) return;

  var observer = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          var id = entry.target.getAttribute('id');
          navLinks.forEach(function (link) {
            link.classList.remove('nav-active');
            if (link.getAttribute('href') === '#' + id) {
              link.classList.add('nav-active');
            }
          });
        }
      });
    },
    { threshold: 0.4 }
  );

  sections.forEach(function (s) { observer.observe(s); });
})();

// Form submission feedback
(function () {
  var form = document.querySelector('.contact-form');
  if (!form) return;

  form.addEventListener('submit', function (e) {
    var btn = form.querySelector('.btn-submit');
    if (btn) {
      btn.textContent = 'Sending...';
      btn.disabled = true;
    }
  });
})();
