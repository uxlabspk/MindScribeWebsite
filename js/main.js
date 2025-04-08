// Mobile menu toggle
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger?.addEventListener('click', () => {
  navLinks?.classList.toggle('active');
});

// Testimonial Slider Functionality
document.addEventListener('DOMContentLoaded', function() {
  const track = document.querySelector('.testimonial-track');
  const testimonials = document.querySelectorAll('.testimonial');
  const prevBtn = document.querySelector('.prev-btn');
  const nextBtn = document.querySelector('.next-btn');

  let currentIndex = 0;

  // Get number of visible testimonials based on screen width
  function getVisibleCount() {
    if (window.innerWidth <= 768) {
      return 1;
    } else if (window.innerWidth <= 991) {
      return 2;
    } else {
      return 3;
    }
  }

  // Update slider position
  function updateSlider() {
    const visibleCount = getVisibleCount();
    const maxVisibleIndex = Math.max(0, testimonials.length - visibleCount);

    // Ensure current index doesn't go beyond max visible
    if (currentIndex > maxVisibleIndex) {
      currentIndex = maxVisibleIndex;
    }

    // Calculate testimonial width + gap
    const testimonialWidth = testimonials[0].offsetWidth;
    const gap = parseInt(window.getComputedStyle(track).columnGap || 16);

    // Calculate translation value
    const translation = currentIndex * -(testimonialWidth + gap);
    track.style.transform = `translateX(${translation}px)`;

    // Update button states
    prevBtn.disabled = currentIndex === 0;
    nextBtn.disabled = currentIndex === maxVisibleIndex;

    // Visual indicator for disabled buttons
    prevBtn.style.opacity = prevBtn.disabled ? "0.5" : "1";
    nextBtn.style.opacity = nextBtn.disabled ? "0.5" : "1";
  }

  // Event listeners for buttons
  prevBtn.addEventListener('click', function() {
    if (currentIndex > 0) {
      currentIndex--;
      updateSlider();
    }
  });

  nextBtn.addEventListener('click', function() {
    const visibleCount = getVisibleCount();
    const maxVisibleIndex = Math.max(0, testimonials.length - visibleCount);

    if (currentIndex < maxVisibleIndex) {
      currentIndex++;
      updateSlider();
    }
  });

  // Initialize slider
  updateSlider();

  // Update on window resize
  window.addEventListener('resize', updateSlider);
});