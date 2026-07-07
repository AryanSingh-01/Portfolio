const navLinks = Array.from(document.querySelectorAll(".nav-links a"));
const sections = navLinks
  .map((link) => document.querySelector(link.getAttribute("href")))
  .filter(Boolean);

const setActiveLink = () => {
  const currentSection = sections.reduce((current, section) => {
    return section.getBoundingClientRect().top <= 140 ? section : current;
  }, null);

  navLinks.forEach((link) => {
    link.classList.toggle(
      "active",
      currentSection && link.getAttribute("href") === `#${currentSection.id}`
    );
  });
};

window.addEventListener("scroll", setActiveLink, { passive: true });
setActiveLink();

const copyButton = document.querySelector("[data-copy-email]");

copyButton?.addEventListener("click", async () => {
  const email = "aryan1311002@gmail.com";
  const originalText = copyButton.textContent;

  try {
    await navigator.clipboard.writeText(email);
    copyButton.textContent = "Copied";
  } catch {
    copyButton.textContent = email;
  }

  window.setTimeout(() => {
    copyButton.textContent = originalText;
  }, 1800);
});
