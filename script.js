// =========================
// Portfolio Navigation Logic
// =========================

console.log("Portfolio JS loaded");

(function () {
  const navLinks = document.querySelectorAll('.nav-link');
  const panels = document.querySelectorAll('.panel');
  const mainContent = document.getElementById('main-content');

  if (!navLinks.length || !panels.length || !mainContent) {
    console.warn('Required elements missing');
    return;
  }

  function openPanel(id, pushState = true) {
    // Hide all panels
    panels.forEach(panel => {
      panel.classList.remove('active');
    });

    // Deactivate all nav links
    navLinks.forEach(link => {
      link.classList.remove('active');
      link.removeAttribute('aria-current');
    });

    // Activate selected panel
    const panel = document.getElementById(id);
    if (!panel) return;

    panel.classList.add('active');

    // Activate corresponding nav links (desktop + mobile)
    navLinks.forEach(link => {
      if (link.dataset.target === id) {
        link.classList.add('active');
        link.setAttribute('aria-current', 'page');
      }
    });

    // Update URL hash
    if (pushState) {
      history.replaceState(null, '', `#${id}`);
    }

    // Accessibility: move focus to main content
    mainContent.focus({ preventScroll: true });
  }

  // Handle nav link clicks
  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const target = link.dataset.target;
      if (target) {
        openPanel(target, true);
      }
    });

    // Keyboard accessibility (Enter / Space)
    link.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        link.click();
      }
    });
  });

  // Initialize from URL hash
  function initFromHash() {
    const hash = location.hash.replace('#', '');
    const initialPanel =
      hash && document.getElementById(hash)
        ? hash
        : 'home';

    openPanel(initialPanel, false);
  }

  // Handle back / forward navigation
  window.addEventListener('hashchange', () => {
    const hash = location.hash.replace('#', '');
    if (hash && document.getElementById(hash)) {
      openPanel(hash, false);
    }
  });

  // Init
  initFromHash();
})();
