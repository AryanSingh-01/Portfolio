
// Future JS functionality will go here (mobile menu, animations, etc.)
console.log("Portfolio JS loaded");

// script.js
(function () {
  const navLinks = document.querySelectorAll('.nav-link');
  const panels = document.querySelectorAll('.panel');
  const mainContent = document.getElementById('main-content');

  function openPanel(id, pushState = true) {
    // hide all panels
    panels.forEach(p => p.classList.remove('active'));
    // deactivate nav links
    navLinks.forEach(a => a.classList.remove('active'), a => a.removeAttribute('aria-current'));

    // show selected panel
    const panel = document.getElementById(id);
    if (!panel) return;
    panel.classList.add('active');

    // mark nav link active
    const link = document.querySelector(`.nav-link[data-target="${id}"]`);
    if (link) {
      link.classList.add('active');
      link.setAttribute('aria-current', 'page');
    }

    // Update URL hash for deep linking
    if (pushState) {
      try {
        history.replaceState(null, '', `#${id}`);
      } catch (e) {
        // fallback
        location.hash = `#${id}`;
      }
    }

    // For accessibility: move focus to main content wrapper
    mainContent.focus({preventScroll:true});
  }

  // click handlers
  navLinks.forEach(link => {
    link.addEventListener('click', function (e) {
      e.preventDefault();
      const target = this.dataset.target || this.getAttribute('href').slice(1);
      openPanel(target, true);
    });

    // keyboard: allow enter/space to activate
    link.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        this.click();
      }
    });
  });

  // On load: check hash or default to 'home'
  function initFromHash() {
    const hash = location.hash ? location.hash.replace('#','') : '';
    const initial = hash && document.getElementById(hash) ? hash : 'home';
    openPanel(initial, false);
  }

  // support back/forward navigation
  window.addEventListener('hashchange', () => {
    const hash = location.hash ? location.hash.replace('#','') : 'home';
    if (document.getElementById(hash)) openPanel(hash, false);
  });

  // init
  initFromHash();
})();
