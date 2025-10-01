# Frontend Mentor - Fylo dark theme landing page solution

This is a solution to the [Fylo dark theme landing page challenge on Frontend Mentor](https://www.frontendmentor.io/challenges/fylo-dark-theme-landing-page-5ca5f2d21e82137ec91a50fd).

## Table of contents

- [Overview](#overview)
  - [The challenge](#the-challenge)
  - [Screenshot](#screenshot)
  - [Links](#links)
- [My process](#my-process)
  - [Built with](#built-with)
  - [Advanced Features](#advanced-features)
  - [What I learned](#what-i-learned)
  - [Continued development](#continued-development)
  - [Useful resources](#useful-resources)
- [Author](#author)
- [Acknowledgments](#acknowledgments)

## Overview

### The challenge

Users should be able to:

- View the optimal layout for the site depending on their device's screen size
- See hover states for all interactive elements on the page
- Experience smooth scroll-triggered animations ✨
- Enjoy interactive hover effects and micro-interactions ✨
- Toggle between light and dark themes with animated transition ✨
- Experience subtle parallax effects on scroll ✨

### Screenshot

![](./screenshot.jpg)

### Links

- Solution URL: [Add solution URL here](https://your-solution-url.com)
- Live Site URL: [Add live site URL here](https://your-live-site-url.com)

## My process

### Built with

- Semantic HTML5 markup
- CSS custom properties
- Flexbox
- CSS Grid
- Mobile-first workflow
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework
- Vanilla JavaScript (ES6+)
- IntersectionObserver API for scroll animations
- CSS animations and transitions

### Advanced Features

This project includes several advanced animation and interaction features:

#### 🎬 Scroll-Triggered Reveal Animations

- **IntersectionObserver-based**: Elements animate into view as you scroll
- **Multiple animation variants**: fade-up, scale-in, slide-left, slide-right
- **Staggered timing**: Sequential reveals with custom delays for each element
- **Smooth easing**: Professional spring-based cubic-bezier curves

#### ✨ Interactive Hover Effects

- **Card hover lift**: Feature and testimonial cards lift up with enhanced shadows
- **Glowing CTA buttons**: Animated radial gradient glow on "Get Started" buttons
- **Link underline animation**: Expanding underline effect on "See how Fylo works"
- **Social icon transitions**: Smooth color transitions on footer icons

#### 🎨 Micro-Interactions

- **Theme toggle animation**: Playful wiggle/scale effect when switching themes
- **Button scale effects**: Subtle scale transforms on hover
- **Smooth transitions**: All interactive elements have polished transitions

#### 🌊 Parallax Effects

- **Hero illustration**: Subtle vertical movement on scroll
- **Testimonial quotes**: Background image parallax effect
- **Performance optimized**: GPU-accelerated transforms

#### ♿ Accessibility

- **Reduced motion support**: Full `prefers-reduced-motion` media query support
- **Keyboard navigation**: All interactive elements are keyboard accessible
- **ARIA labels**: Proper labeling for screen readers
- **Focus states**: Visible focus indicators for all interactive elements

#### 🎯 Animation Coverage

- **Header**: Theme toggle micro-interaction
- **Hero Section**: Staggered reveals + parallax + glow button
- **Features Section**: Card reveals + hover lift effects
- **Productive Section**: Slide animations + link underline
- **Testimonials Section**: Card reveals + hover lift + parallax
- **Early Access Section**: Scale-in reveal + glow button
- **Footer**: Fade-up reveal

#### 🔧 Technical Implementation

```css
/* Custom easing functions */
:root {
  --ease-out-expo: cubic-bezier(0.16, 1, 0.3, 1);
  --ease-spring-3: cubic-bezier(0.22, 1, 0.36, 1);
}

/* Reveal system with dynamic timing */
.reveal {
  opacity: 0;
  transition: transform var(--a-duration, 700ms) var(--ease-spring-3), opacity
      var(--a-duration, 700ms) var(--ease-spring-3);
  transition-delay: var(--a-delay, 0ms);
}
```

```javascript
// IntersectionObserver for scroll-triggered animations
const io = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        io.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.15, rootMargin: "0px 0px -10% 0px" }
);
```

#### 📁 Project Structure

```
fylo-dark-theme-landing-page-master/
├── css/
│   ├── style.css          # Compiled Tailwind CSS
│   └── animations.css     # Custom animation styles
├── js/
│   └── script.js          # Theme toggle + animations logic
├── images/                # Project images and icons
├── input.css              # Tailwind source with custom styles
├── tailwind.config.js     # Tailwind configuration
└── index.html             # Main HTML file
```

### What I learned

This project was an excellent opportunity to implement advanced animation techniques:

#### 1. IntersectionObserver API

Learned how to efficiently trigger animations based on scroll position without performance issues:

```javascript
const io = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        io.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.15, rootMargin: "0px 0px -10% 0px" }
);
```

#### 2. CSS Custom Properties for Dynamic Animations

Using CSS variables to control animation timing dynamically from JavaScript:

```css
.reveal {
  transition-delay: var(--a-delay, 0ms);
  transition-duration: var(--a-duration, 700ms);
}
```

```javascript
element.style.setProperty("--a-delay", `${delay}ms`);
element.style.setProperty("--a-duration", `${duration}ms`);
```

#### 3. Professional Easing Curves

Implemented spring-based easing for natural, polished animations:

```css
:root {
  --ease-spring-3: cubic-bezier(0.22, 1, 0.36, 1);
}
```

#### 4. Accessibility-First Animations

Respecting user preferences with reduced motion support:

```css
@media (prefers-reduced-motion: reduce) {
  .reveal,
  .card-hover,
  .glow-btn {
    transition: none !important;
    animation: none !important;
    transform: none !important;
    opacity: 1 !important;
  }
}
```

#### 5. GPU-Accelerated Animations

Using `transform` and `opacity` for smooth 60fps animations:

```css
.card-hover {
  will-change: transform, box-shadow;
  transition: transform 450ms var(--ease-spring-3);
}
```

### Continued development

Areas I want to continue focusing on:

1. **Advanced Animation Patterns**

   - Exploring more complex animation choreography
   - Implementing gesture-based animations
   - Creating reusable animation systems

2. **Performance Optimization**

   - Further optimizing animation performance
   - Implementing animation budgets
   - Using Web Animations API for more control

3. **Accessibility**

   - Testing with screen readers
   - Improving keyboard navigation patterns
   - Enhancing focus management

4. **Modern CSS Features**
   - Exploring CSS `@scroll-timeline`
   - Implementing view transitions API
   - Using container queries for responsive animations

### Useful resources

- [IntersectionObserver API - MDN](https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API) - Essential for implementing scroll-triggered animations efficiently
- [Cubic-bezier.com](https://cubic-bezier.com/) - Excellent tool for creating custom easing functions
- [CSS Tricks - Animation Performance](https://css-tricks.com/animation-performance-101/) - Great guide on optimizing CSS animations
- [Web.dev - Animations Guide](https://web.dev/animations/) - Comprehensive resource on web animations best practices
- [Tailwind CSS Documentation](https://tailwindcss.com/docs) - Official documentation for the utility-first framework
- [prefers-reduced-motion - MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-reduced-motion) - Important for accessibility considerations

## Installation & Usage

### Prerequisites

- Node.js installed on your machine
- npm or yarn package manager

### Setup

1. Clone the repository
2. Navigate to the project directory:
   ```bash
   cd fylo-dark-theme-landing-page-master
   ```
3. Install dependencies:
   ```bash
   npm install
   ```

### Development

To rebuild Tailwind CSS after making changes to `input.css`:

```bash
npm run build
```

To watch for changes and rebuild automatically:

```bash
npm run watch
```

### Viewing the Project

Simply open `index.html` in your browser, or use a local server:

```bash
# Using Python
python -m http.server 8000

# Using Node.js http-server
npx http-server
```

## Features Showcase

### How to Experience the Animations

1. **Scroll slowly** down the page to see reveal animations
2. **Hover over cards** in Features and Testimonials sections
3. **Hover over buttons** to see glow effects
4. **Click the theme toggle** (sun/moon icon) to see the wiggle animation
5. **Hover over "See how Fylo works"** link to see underline animation
6. **Scroll up and down** to notice subtle parallax effects

### Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Opera (latest)

All animations gracefully degrade in older browsers.

## Author

- Website - [Add your name here](https://www.your-site.com)
- Frontend Mentor - [@yourusername](https://www.frontendmentor.io/profile/yourusername)
- Twitter - [@yourusername](https://www.twitter.com/yourusername)

## Acknowledgments

This is where you can give a hat tip to anyone who helped you out on this project. Perhaps you worked in a team or got some inspiration from someone else's solution. This is the perfect place to give them some credit.
