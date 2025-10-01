// Prevent flash of unstyled content (FOUC)
(function () {
  const savedTheme = localStorage.getItem("color-theme");
  const systemPrefersDark = window.matchMedia(
    "(prefers-color-scheme: dark)"
  ).matches;

  if (savedTheme === "light" || (!savedTheme && !systemPrefersDark)) {
    document.documentElement.classList.remove("dark");
  }
})();

// Theme switching functionality
class ThemeManager {
  constructor() {
    this.themeToggleBtn = document.getElementById("theme-toggle");
    this.themeToggleDarkIcon = document.getElementById(
      "theme-toggle-dark-icon"
    );
    this.themeToggleLightIcon = document.getElementById(
      "theme-toggle-light-icon"
    );

    this.init();
  }

  init() {
    // Set initial theme based on localStorage or system preference
    const savedTheme = localStorage.getItem("color-theme");
    const systemPrefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;

    const isDark = savedTheme === "dark" || (!savedTheme && systemPrefersDark);

    this.setTheme(isDark ? "dark" : "light");

    // Listen for system theme changes
    window
      .matchMedia("(prefers-color-scheme: dark)")
      .addEventListener("change", (e) => {
        if (!localStorage.getItem("color-theme")) {
          this.setTheme(e.matches ? "dark" : "light");
        }
      });

    // Listen for toggle button click
    this.themeToggleBtn.addEventListener("click", () => this.toggleTheme());
  }

  setTheme(theme) {
    const isDark = theme === "dark";

    // Update HTML class
    if (isDark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }

    // Update icons
    this.themeToggleDarkIcon.classList.toggle("hidden", isDark);
    this.themeToggleLightIcon.classList.toggle("hidden", !isDark);

    // Save to localStorage
    localStorage.setItem("color-theme", theme);

    // Update button aria-label for accessibility
    this.themeToggleBtn.setAttribute(
      "aria-label",
      isDark ? "Switch to light mode" : "Switch to dark mode"
    );
  }

  toggleTheme() {
    const currentTheme = localStorage.getItem("color-theme");
    const isDark = document.documentElement.classList.contains("dark");
    this.setTheme(isDark ? "light" : "dark");
  }
}

// Initialize theme manager and animations when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  // Initialize theme manager
  new ThemeManager();

  // Check for reduced motion preference
  const prefersReduced = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  // Add subtle toggle animation on theme switch
  const themeBtn = document.getElementById("theme-toggle");
  if (themeBtn) {
    const triggerToggleAnim = () => {
      themeBtn.classList.add("toggling");
      setTimeout(() => themeBtn.classList.remove("toggling"), 500);
    };
    themeBtn.addEventListener("click", triggerToggleAnim);
  }

  // Variables used by animations/parallax
  let heroImg = null;
  let quotesImg = null;
  let heroVisible = false;
  let quotesVisible = false;

  // IntersectionObserver-based reveal animations
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          io.unobserve(entry.target);

          // Mark visibility for parallax targets
          if (entry.target === heroImg) heroVisible = true;
          if (entry.target === quotesImg) quotesVisible = true;
        }
      });
    },
    { threshold: 0.1, rootMargin: "0px 0px -5% 0px" }
  );

  const addReveal = (el, variant = "fade-up", delay = 0, duration = 700) => {
    if (!el) return;
    el.classList.add("reveal", variant);
    el.style.setProperty("--a-delay", `${delay}ms`);
    el.style.setProperty("--a-duration", `${duration}ms`);
    
    // Check if element is already in viewport on page load
    const rect = el.getBoundingClientRect();
    const isInViewport = rect.top < window.innerHeight && rect.bottom > 0;
    
    if (isInViewport) {
      // Immediately reveal elements already visible
      setTimeout(() => {
        el.classList.add("is-visible");
        // Mark visibility for parallax targets
        if (el === heroImg) heroVisible = true;
        if (el === quotesImg) quotesVisible = true;
      }, delay);
    } else {
      // Use IntersectionObserver for elements below the fold
      io.observe(el);
    }
  };

  // Hero section animations
  const hero = document.getElementById("hero-section");
  heroImg = hero?.querySelector("img");
  const heroH1 = hero?.querySelector("h1");
  const heroP = hero?.querySelector("p");
  const heroBtn = hero?.querySelector("a");

  addReveal(heroImg, "fade-up", 0, 800);
  addReveal(heroH1, "fade-up", 120, 800);
  addReveal(heroP, "fade-up", 220, 800);
  addReveal(heroBtn, "scale-in", 340, 700);
  if (heroBtn) heroBtn.classList.add("glow-btn");

  // Features section animations
  document
    .querySelectorAll("#features-section .flex.flex-col.items-center")
    .forEach((card, i) => {
      addReveal(card, "fade-up", i * 120, 700);
      card.classList.add("card-hover");
    });

  // Productive section animations
  const prod = document.getElementById("productive-section");
  addReveal(prod?.querySelector("img"), "slide-left", 0, 800);
  prod
    ?.querySelectorAll("h3, p")
    .forEach((el, i) => addReveal(el, "slide-right", 140 + i * 120, 700));
  const prodLink = prod?.querySelector("a");
  if (prodLink) {
    addReveal(prodLink, "fade", 420, 600);
    prodLink.classList.add("link-underline-anim");
  }

  // Testimonials section animations
  document
    .querySelectorAll("#testimonials-section .rounded-lg")
    .forEach((card, i) => {
      addReveal(card, "fade-up", i * 150, 750);
      card.classList.add("card-hover");
    });

  // Early access section animations
  const eaCard = document.querySelector(
    "#early-access-section .relative.max-w-4xl"
  );
  addReveal(eaCard, "scale-in", 100, 700);
  const eaBtn = document.querySelector("#early-access-section button");
  if (eaBtn) eaBtn.classList.add("glow-btn");

  // Footer animations
  const footer = document.querySelector("footer");
  addReveal(footer, "fade-up", 0, 800);

  // Subtle parallax effects
  quotesImg = document.querySelector(
    '#testimonials-section img[src*="bg-quotes"]'
  );

  const onScroll = () => {
    if (prefersReduced) return;
    const y = window.scrollY || window.pageYOffset || 0;

    if (heroImg && heroVisible) {
      const intensity = 0.05; // smaller = subtler
      heroImg.style.transform = `translateY(${y * intensity}px)`;
    }

    if (quotesImg && quotesVisible) {
      const rect = quotesImg.getBoundingClientRect();
      const viewportH =
        window.innerHeight || document.documentElement.clientHeight;
      const progress = 1 - Math.min(Math.max(rect.top / viewportH, 0), 1);
      quotesImg.style.transform = `translateY(${progress * 20}px)`;
    }
  };

  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  // Email validation for early access form
  const earlyAccessForm = document.getElementById("early-access-form");
  const emailInput = document.getElementById("email-input");
  const emailError = document.getElementById("email-error");

  if (earlyAccessForm && emailInput && emailError) {
    earlyAccessForm.addEventListener("submit", (e) => {
      e.preventDefault();

      const email = emailInput.value.trim();
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      if (!email) {
        emailError.textContent = "Email cannot be empty";
        emailError.classList.remove("hidden");
        emailInput.classList.add("border-red-500");
        emailInput.classList.remove("border-transparent");
        return;
      }

      if (!emailRegex.test(email)) {
        emailError.textContent = "Please enter a valid email address";
        emailError.classList.remove("hidden");
        emailInput.classList.add("border-red-500");
        emailInput.classList.remove("border-transparent");
        return;
      }

      // Valid email - clear errors and show success
      emailError.classList.add("hidden");
      emailInput.classList.remove("border-red-500");
      emailInput.classList.add("border-green-500");
      
      // Success feedback (you can replace this with actual form submission)
      alert(`Thank you! We'll send updates to ${email}`);
      emailInput.value = "";
      emailInput.classList.remove("border-green-500");
      emailInput.classList.add("border-transparent");
    });

    // Clear error on input
    emailInput.addEventListener("input", () => {
      if (!emailError.classList.contains("hidden")) {
        emailError.classList.add("hidden");
        emailInput.classList.remove("border-red-500");
        emailInput.classList.add("border-transparent");
      }
    });
  }
});
