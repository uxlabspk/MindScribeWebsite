document.addEventListener("DOMContentLoaded", function () {
    const hamburger = document.querySelector(".hamburger");
    const navLinks = document.querySelector(".nav-links");
    hamburger?.addEventListener("click", () => {
        navLinks?.classList.toggle("active");
    });

    const track = document.querySelector(".testimonial-track");
    const prevBtn = document.querySelector(".prev-btn");
    const nextBtn = document.querySelector(".next-btn");
    let currentIndex = 0;
    let cardWidth = 0;
    let visibleCount = 3;
    let autoScroll;

    // For dragging/swiping
    let isDragging = false;
    let startX = 0;
    let dragX = 0;

    function getVisibleCount() {
        if (window.innerWidth <= 768) return 1;
        if (window.innerWidth <= 991) return 2;
        return 3;
    }

    function initializeSlider() {
        clearInterval(autoScroll);

        // Remove old clones
        const clones = track.querySelectorAll(".testimonial.clone");
        clones.forEach((c) => c.remove());

        const testimonials = track.querySelectorAll(".testimonial:not(.clone)");
        visibleCount = getVisibleCount();
        cardWidth = testimonials[0].offsetWidth + 32; // includes gap

        for (let i = 0; i < visibleCount; i++) {
            const clone = testimonials[i].cloneNode(true);
            clone.classList.add("clone");
            track.appendChild(clone);
        }

        currentIndex = 0;
        track.style.transition = "none";
        track.style.transform = `translateX(0px)`;

        autoScroll = setInterval(nextSlide, 4000);
    }

    function goToSlide(index, smooth = true) {
        track.style.transition = smooth ? "transform 0.5s ease-in-out" : "none";
        track.style.transform = `translateX(-${index * cardWidth}px)`;
    }

    function nextSlide() {
        currentIndex++;
        goToSlide(currentIndex);
        const total = track.querySelectorAll(".testimonial").length;
        if (currentIndex >= total - visibleCount) {
            setTimeout(() => {
                currentIndex = 0;
                goToSlide(currentIndex, false);
            }, 500);
        }
    }

    function prevSlide() {
        const total = track.querySelectorAll(".testimonial").length;
        if (currentIndex === 0) {
            currentIndex = total - visibleCount;
            goToSlide(currentIndex, false);
            setTimeout(() => {
                currentIndex--;
                goToSlide(currentIndex);
            }, 20);
        } else {
            currentIndex--;
            goToSlide(currentIndex);
        }
    }

    prevBtn.addEventListener("click", prevSlide);
    nextBtn.addEventListener("click", nextSlide);

    track.addEventListener("mouseenter", () => clearInterval(autoScroll));
    track.addEventListener("mouseleave", () => {
        autoScroll = setInterval(nextSlide, 4000);
    });

    window.addEventListener("resize", () => {
        setTimeout(() => {
            initializeSlider();
        }, 500);
    });

    initializeSlider();

    // --- DRAG / SWIPE FUNCTIONALITY USING POINTER EVENTS ---
    track.addEventListener("pointerdown", pointerDownHandler);
    track.addEventListener("pointermove", pointerMoveHandler);
    track.addEventListener("pointerup", pointerUpHandler);
    track.addEventListener("pointercancel", pointerUpHandler);

    function pointerDownHandler(e) {
        isDragging = true;
        startX = e.clientX;
        dragX = 0;
        track.style.transition = "none";
        clearInterval(autoScroll);
        track.setPointerCapture(e.pointerId);
        track.style.cursor = "grabbing";
    }

    function pointerMoveHandler(e) {
        if (!isDragging) return;
        const delta = e.clientX - startX;
        dragX = delta;
        // Use plus delta so dragging is in the correct direction.
        const moveTo = -currentIndex * cardWidth + delta;
        track.style.transform = `translateX(${moveTo}px)`;
    }

    function pointerUpHandler(e) {
        if (!isDragging) return;
        isDragging = false;
        track.releasePointerCapture(e.pointerId);
        track.style.cursor = "grab";

        if (Math.abs(dragX) > cardWidth / 4) {
            dragX < 0 ? nextSlide() : prevSlide();
        } else {
            goToSlide(currentIndex);
        }
        autoScroll = setInterval(nextSlide, 4000);
    }
});


// fetching the json data
// fetch('/data/reviews.json')
//     .then(response => response.json())
//     .then(reviews => {
//         const reviewContainer = document.getElementById('testimonialsContainer');
//
//         // Filter meaningful reviews
//         const filtered = reviews.filter(r => r.review_content && r.review_content.trim() !== '');
//
//         filtered.slice(0, 5).forEach(review => {
//             const stars = '★'.repeat(review.stars) + '☆'.repeat(5 - review.stars);
//             const name = review.user.name || 'Anonymous';
//             const location = review.user.location ? ` from ${review.user.location}` : '';
//             const date = new Date(review.date).toLocaleDateString();
//
//
//             const reviewHTML = `
//           <div class="testimonial">
//               <div class="stars">
//                   <span class="star">${stars}</span>
//               </div>
//               <h3>${review.review_title}</h3>
//               <p>${review.review_content}</p>
//               <div class="user">
//                   <img src="/img/user.png" alt="Sarah T"/>
//                   <div class="user-info">
//                       <h4>${name} ${location}</h4>
//                       <p>${date}</p>
//                   </div>
//               </div>
//           </div>
//       `;
//
//             reviewContainer.innerHTML += reviewHTML;
//         });
//     })
//     .catch(error => {
//         console.error('Error loading reviews:', error);
//     });

// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Get the slider elements
    const track = document.querySelector('.testimonial-track');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');

    // Variables for drag functionality
    let isDragging = false;
    let startPos = 0;
    let currentTranslate = 0;
    let prevTranslate = 0;

    // Initialize slider after reviews are loaded
    function initSlider() {
        const testimonials = document.querySelectorAll('.testimonial');
        if (!testimonials.length) return;

        // Set initial position
        currentTranslate = 0;
        setSliderPosition();

        // Add click events to buttons
        prevBtn.addEventListener('click', moveToPrev);
        nextBtn.addEventListener('click', moveToNext);

        // Add drag events
        track.addEventListener('mousedown', dragStart);
        track.addEventListener('touchstart', dragStart);
        track.addEventListener('mouseup', dragEnd);
        track.addEventListener('touchend', dragEnd);
        track.addEventListener('mouseleave', dragEnd);
        track.addEventListener('mousemove', drag);
        track.addEventListener('touchmove', drag);
    }

    // Move to the previous slide
    function moveToPrev() {
        const testimonialWidth = document.querySelector('.testimonial').offsetWidth + 32; // Width + gap
        currentTranslate += testimonialWidth;

        // Prevent scrolling too far left
        if (currentTranslate > 0) {
            currentTranslate = 0;
        }

        setSliderPosition();
    }

    // Move to the next slide
    function moveToNext() {
        const testimonialWidth = document.querySelector('.testimonial').offsetWidth + 32; // Width + gap
        const trackWidth = track.scrollWidth;
        const containerWidth = document.querySelector('.testimonial-slider').offsetWidth;

        currentTranslate -= testimonialWidth;

        // Prevent scrolling too far right
        if (Math.abs(currentTranslate) > (trackWidth - containerWidth)) {
            currentTranslate = -(trackWidth - containerWidth);
        }

        setSliderPosition();
    }

    // Set the slider position with smooth animation
    function setSliderPosition() {
        track.style.transform = `translateX(${currentTranslate}px)`;
    }

    // Functions for drag functionality
    function dragStart(event) {
        isDragging = true;
        startPos = getPositionX(event);
        prevTranslate = currentTranslate;

        // Change cursor while dragging
        track.style.cursor = 'grabbing';
    }

    function drag(event) {
        if (isDragging) {
            const currentPosition = getPositionX(event);
            const diff = currentPosition - startPos;
            currentTranslate = prevTranslate + diff;

            // Apply the movement
            setSliderPosition();
        }
    }

    function dragEnd() {
        isDragging = false;

        // Snap to nearest testimonial
        const testimonialWidth = document.querySelector('.testimonial').offsetWidth + 32;
        const trackWidth = track.scrollWidth;
        const containerWidth = document.querySelector('.testimonial-slider').offsetWidth;

        // Prevent overscrolling
        if (currentTranslate > 0) {
            currentTranslate = 0;
        } else if (Math.abs(currentTranslate) > (trackWidth - containerWidth)) {
            currentTranslate = -(trackWidth - containerWidth);
        }

        // Reset cursor
        track.style.cursor = 'grab';
        setSliderPosition();
    }

    function getPositionX(event) {
        return event.type.includes('mouse') ? event.pageX : event.touches[0].clientX;
    }

    // Wait for reviews to load before initializing slider
    // Use a MutationObserver to detect when testimonials are added
    const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
            if (mutation.addedNodes.length && document.querySelectorAll('.testimonial').length > 0) {
                initSlider();
                observer.disconnect();
            }
        });
    });

    // Start observing the testimonial container
    if (track) {
        observer.observe(track, { childList: true });
    }

    // If reviews are loaded before this script runs
    if (document.querySelectorAll('.testimonial').length > 0) {
        initSlider();
    }
});

// Modified reviews loader to work with the slider
fetch('/data/reviews.json')
    .then(response => response.json())
    .then(reviews => {
        const reviewContainer = document.getElementById('testimonialsContainer');

        // Clear any existing content
        reviewContainer.innerHTML = '';

        // Filter meaningful reviews
        const filtered = reviews.filter(r => r.review_content && r.review_content.trim() !== '');

        // Add all filtered reviews instead of just 5
        filtered.forEach(review => {
            const stars = '★'.repeat(review.stars) + '☆'.repeat(5 - review.stars);
            const name = review.user.name || 'Anonymous';
            const location = review.user.location ? ` from ${review.user.location}` : '';
            const date = new Date(review.date).toLocaleDateString();

            const reviewHTML = `
                <div class="testimonial" style="height: 300px">
                    <div class="stars">
                        <span class="star">${stars}</span>
                    </div>
                    <h3>${review.review_title || 'Review'}</h3>
                    <p>${review.review_content}</p>
                    <div class="user">
<!--                        <img src="/img/user.png" alt="${name}"/>-->
                        <div class="user-info">
                            <h4>${name}${location}</h4>
                            <p>${date}</p>
                        </div>
                    </div>
                </div>
            `;

            reviewContainer.innerHTML += reviewHTML;
        });
    })
    .catch(error => {
        console.error('Error loading reviews:', error);

        // Add some fallback testimonials in case the fetch fails
        const reviewContainer = document.getElementById('testimonialsContainer');

        for (let i = 0; i < 2; i++) {
            const fallbackHTML = `
                <div class="testimonial">
                    <div class="stars">
                        <span class="star">★★★★★</span>
                    </div>
                    <h3>Great Experience</h3>
                    <p>This is a fallback testimonial that appears when the data couldn't be loaded. The actual content would be much more interesting!</p>
                    <div class="user">
                        <img src="/img/user.png" alt="User"/>
                        <div class="user-info">
                            <h4>Sample User</h4>
                            <p>Jan 1, 2025</p>
                        </div>
                    </div>
                </div>
            `;

            reviewContainer.innerHTML += fallbackHTML;
        }
    });