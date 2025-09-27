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

// Initialize theme manager when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  new ThemeManager();
});
