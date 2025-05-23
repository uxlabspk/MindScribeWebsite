<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8"/>
    <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
    <title>MindScribe - Revolutionize Your Journaling Experience</title>
    <link rel="stylesheet" href="/css/style.css"/>
    <link rel="stylesheet" href="/css/responsive-menu.css"/>
    <link rel="preconnect" href="https://fonts.googleapis.com"/>
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin/>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet"/>
</head>
<body>
<?php include 'includes/header.php' ?>

<main>
    <!-- Hero Section -->
    <section class="hero">
        <div class="container">
            <div class="hero-content">
                <div class="hero-text">
                    <h1>Revolutionize Your Journaling Experience</h1>
                    <p class="subtitle">Our innovative platform uses advanced tech to help you organize, reflect, and
                        grow</p>
                    <p class="tagline">Your Companion for Clarity and Growth.</p>
                    <button class="btn-primary">Get Started</button>
                </div>
                <div class="hero-image">
                    <img src="/img/home imge index.png" alt="MindScribe App"/>
                </div>
            </div>
        </div>
    </section>

    <!-- Features Section -->
    <section class="features">
        <div class="container">
            <div class="section-header">
                <h2>An app where You'll find</h2>
                <p>a peace of mind</p>
            </div>
            <div class="feature-cards">
                <div class="feature-card">
                    <div class="feature-icon">
                        <img src="/img/yoga.png" alt="Meditation"/>
                    </div>
                    <h3>Clear Your</h3>
                    <p>tangled mind</p>
                </div>
                <div class="feature-card">
                    <div class="feature-icon">
                        <img src="/img/creative.png" alt="Creativity"/>
                    </div>
                    <h3>Showcase</h3>
                    <p>your creativity</p>
                </div>
                <div class="feature-card">
                    <div class="feature-icon">
                        <img src="/img/studying.png" alt="Writing"/>
                    </div>
                    <h3>Write down</h3>
                    <p>your thought</p>
                </div>
            </div>
        </div>
    </section>

    <!-- Benefits Section -->
    <section class="benefits">
        <div class="container">
            <div class="benefit-content">
                <div class="benefit-text">
                    <h2>Reflect and Write, Anytime, Anywhere</h2>
                    <p>Capture life's moments effortlessly with our intuitive journaling platform. Start writing today
                        and create a personal space that grows with you.</p>
                </div>
                <div class="benefit-image">
                    <img src="/img/walking_person.png" alt="Person journaling"/>
                </div>
            </div>
        </div>
    </section>

    <!-- Testimonials Section -->
    <section class="testimonials">
        <div class="testimonial-container">
            <div class="testimonial-slider">
                <div class="testimonial-track" id="testimonialsContainer">

                </div>

                <div class="slider-controls">
                    <button class="prev-btn">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <circle cx="12" cy="12" r="11.5" fill="white" stroke="#E5E7EB"/>
                            <path d="M14 8L10 12L14 16" stroke="#111827" stroke-width="1.5" stroke-linecap="round"
                                  stroke-linejoin="round"/>
                        </svg>
                    </button>
                    <button class="next-btn">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <circle cx="12" cy="12" r="11.5" fill="white" stroke="#E5E7EB"/>
                            <path d="M10 8L14 12L10 16" stroke="#111827" stroke-width="1.5" stroke-linecap="round"
                                  stroke-linejoin="round"/>
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    </section>

</main>

<?php include 'includes/footer.php' ?>

<script src="/js/main.js" type="module"></script>
</body>
</html>