// Mobile menu toggle
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger?.addEventListener('click', () => {
  navLinks?.classList.toggle('active');
});

// Testimonial slider
const testimonialTrack = document.querySelector('.testimonial-track');
const prevBtn = document.querySelector('.prev-btn');
const nextBtn = document.querySelector('.next-btn');
let currentSlide = 0;
const slideCount = document.querySelectorAll('.testimonial').length;

function updateSliderPosition() {
  if (window.innerWidth <= 768) {
    // For mobile, vertical slider
    if (testimonialTrack) {
      testimonialTrack.style.transform = `translateY(-${currentSlide * 100}%)`;
    }
  } else {
    // For desktop, horizontal slider
    if (testimonialTrack) {
      testimonialTrack.style.transform = `translateX(-${(currentSlide / slideCount) * 100}%)`;
    }
  }
}

prevBtn?.addEventListener('click', () => {
  currentSlide = (currentSlide - 1 + slideCount) % slideCount;
  updateSliderPosition();
});

nextBtn?.addEventListener('click', () => {
  currentSlide = (currentSlide + 1) % slideCount;
  updateSliderPosition();
});

// Update slider on window resize
window.addEventListener('resize', updateSliderPosition);

// Initialize
updateSliderPosition();