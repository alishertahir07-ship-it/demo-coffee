/* =========================================================
   COFFEE&CO — PROFESSIONAL SCRIPTS
========================================================= */

/* 1. COFFEE FILTER */
function filterCoffee(type, button) {
  const items = document.querySelectorAll(".coffee-item");
  const buttons = document.querySelectorAll(".filter-btn");
  buttons.forEach(btn => btn.classList.remove("active"));
  button.classList.add("active");
  items.forEach(item => {
    const itemType = item.getAttribute("data-type");
    item.style.display = (type === "all" || itemType === type) ? "block" : "none";
  });
}

/* 2. ADD TO ORDER */
function addToOrder(productName) {
  const notification = document.getElementById("cartNotification");
  if (!notification) return;
  notification.textContent = productName + " added to your order";
  notification.classList.add("show");
  clearTimeout(notification._timer);
  notification._timer = setTimeout(() => {
    notification.classList.remove("show");
  }, 2400);
}

/* 3. RESERVATION FORM */
function handleReservation(event) {
  event.preventDefault();
  const success = document.getElementById("formSuccess");
  const form = document.getElementById("reservationForm");
  if (success) {
    success.classList.add("show");
    setTimeout(() => success.classList.remove("show"), 6000);
  }
  if (form) form.reset();
}

/* 4. HEADER SCROLL */
const header = document.getElementById("header");
window.addEventListener("scroll", () => {
  if (!header) return;
  if (window.scrollY > 40) header.classList.add("scrolled");
  else header.classList.remove("scrolled");
});

/* 5. MOBILE MENU */
const menuToggle = document.getElementById("menuToggle");
const mobileMenu = document.getElementById("mobileMenu");
if (menuToggle && mobileMenu) {
  menuToggle.addEventListener("click", () => {
    mobileMenu.classList.toggle("open");
    document.body.style.overflow = mobileMenu.classList.contains("open") ? "hidden" : "";
  });
  mobileMenu.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", () => {
      mobileMenu.classList.remove("open");
      document.body.style.overflow = "";
    });
  });
}

/* 6. SCROLL REVEAL */
const revealElements = document.querySelectorAll(".reveal");
if ("IntersectionObserver" in window) {
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("active");
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: "0px 0px -60px 0px" }
  );
  revealElements.forEach(el => revealObserver.observe(el));
} else {
  revealElements.forEach(el => el.classList.add("active"));
}

/* 7. IMAGE FALLBACK */
document.querySelectorAll("img").forEach(img => {
  img.addEventListener("error", function () {
    this.style.display = "none";
    if (this.parentElement) {
      this.parentElement.style.background = "linear-gradient(135deg, #6b4631, #211b17)";
    }
  });
});

/* 8. MIN DATE = TODAY */
const dateInput = document.getElementById("date");
if (dateInput) {
  const today = new Date().toISOString().split("T")[0];
  dateInput.setAttribute("min", today);
}

/* 9. SMOOTH SCROLL */
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener("click", function (e) {
    const href = this.getAttribute("href");
    if (href === "#" || href === "") return;
    const target = document.querySelector(href);
    if (target) {
      e.preventDefault();
      const offset = 80;
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: "smooth" });
    }
  });
});
/* =========================================================
   10. WELCOME OVERLAY — ENTER CAFÉ
========================================================= */
function enterCafe() {
  const overlay = document.getElementById("welcomeOverlay");
  if (!overlay) return;

  overlay.classList.add("closing");

  // Enable body scroll after fade
  setTimeout(() => {
    overlay.style.display = "none";
    document.body.style.overflow = "";
  }, 900);
}

// Lock scroll while overlay is active
window.addEventListener("DOMContentLoaded", () => {
  const overlay = document.getElementById("welcomeOverlay");
  if (overlay && !overlay.classList.contains("closing")) {
    document.body.style.overflow = "hidden";
  }
});