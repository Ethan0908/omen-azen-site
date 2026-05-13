const header = document.querySelector("[data-header]");
const navToggle = document.querySelector(".nav-toggle");
const navLinks = document.querySelectorAll(".site-nav a");
const revealItems = document.querySelectorAll(".reveal");

function setHeaderState() {
  header.classList.toggle("is-scrolled", window.scrollY > 12);
}

function closeMenu() {
  header.classList.remove("is-open");
  document.body.classList.remove("nav-open");
  navToggle.setAttribute("aria-expanded", "false");
  navToggle.setAttribute("aria-label", "Open navigation");
}

navToggle.addEventListener("click", () => {
  const isOpen = header.classList.toggle("is-open");
  document.body.classList.toggle("nav-open", isOpen);
  navToggle.setAttribute("aria-expanded", String(isOpen));
  navToggle.setAttribute("aria-label", isOpen ? "Close navigation" : "Open navigation");
});

navLinks.forEach((link) => {
  link.addEventListener("click", closeMenu);
});

window.addEventListener("scroll", setHeaderState, { passive: true });
window.addEventListener("resize", () => {
  if (window.innerWidth > 980) {
    closeMenu();
  }
});

if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.16 }
  );

  revealItems.forEach((item) => observer.observe(item));
} else {
  revealItems.forEach((item) => item.classList.add("is-visible"));
}

setHeaderState();
