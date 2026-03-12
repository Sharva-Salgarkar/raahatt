// Modern Navigation
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');
const navItems = document.querySelectorAll('.nav-links a');

// Toggle mobile menu
hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('active');
});

// Close mobile menu when clicking nav items
navItems.forEach(item => {
    item.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navLinks.classList.remove('active');
    });
});

// Smooth scroll with offset for header
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        const headerOffset = 80;
        const elementPosition = target.offsetTop;
        const offsetPosition = elementPosition - headerOffset;

        window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
        });
    });
});

// Active nav link on scroll
const sections = document.querySelectorAll('section');
const navLinksArray = Array.from(navItems);

window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (scrollY >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    navLinksArray.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').includes(current)) {
            link.classList.add('active');
        }
    });
});

// Counter Animation
const counters = document.querySelectorAll('.counter');
const speed = 200;

const animateCounter = () => {
    counters.forEach(counter => {
        const target = +counter.dataset.target;
        const count = +counter.innerText;
        const increment = target / speed;

        if (count < target) {
            counter.innerText = Math.ceil(count + increment);
            setTimeout(animateCounter, 1);
        } else {
            counter.innerText = target;
        }
    });
};

// Intersection Observer for counter animation
const counterSection = document.querySelector('.stats-container');
const counterObserver = new IntersectionObserver(
    (entries) => {
        if (entries[0].isIntersecting) {
            animateCounter();
        }
    },
    { threshold: 0.5 }
);

if (counterSection) {
    counterObserver.observe(counterSection);
}

// Modern Testimonials Slider
const testimonials = [
    {
        text: "Raahatt has completely transformed my approach to wellness. The personalized care and attention to detail is exceptional!",
        name: "Amanda Peters",
        title: "Regular Client",
        image: "images/testimonial1.jpg"
    },
    {
        text: "The yoga sessions have brought balance to my busy life. The instructors are highly skilled and supportive.",
        name: "John Smith",
        title: "Yoga Enthusiast",
        image: "images/testimonial2.jpg"
    },
    {
        text: "Professional staff and excellent therapeutic services. A true sanctuary for wellness and healing.",
        name: "Maria Rodriguez",
        title: "Monthly Member",
        image: "images/testimonial3.jpg"
    },
    {
        text: "The holistic approach to wellness at Raahatt is unmatched. I've seen remarkable improvements in my overall well-being.",
        name: "David Chen",
        title: "Wellness Program Member",
        image: "images/testimonial4.jpg"
    }
];

let currentTestimonialIndex = 0;
const testimonialSlider = document.querySelector('.testimonials-slider');
const prevButton = document.querySelector('.prev-testimonial');
const nextButton = document.querySelector('.next-testimonial');

function updateTestimonial() {
    const testimonial = testimonials[currentTestimonialIndex];
    testimonialSlider.innerHTML = `
        <div class="testimonial">
            <p>"${testimonial.text}"</p>
            <div class="client-info">
                <h4>${testimonial.name}</h4>
                <span>${testimonial.title}</span>
            </div>
        </div>
    `;
}

function nextTestimonial() {
    currentTestimonialIndex = (currentTestimonialIndex + 1) % testimonials.length;
    updateTestimonial();
}

function prevTestimonial() {
    currentTestimonialIndex = (currentTestimonialIndex - 1 + testimonials.length) % testimonials.length;
    updateTestimonial();
}

if (prevButton && nextButton) {
    prevButton.addEventListener('click', prevTestimonial);
    nextButton.addEventListener('click', nextTestimonial);
}

// Auto-advance testimonials
let testimonialInterval = setInterval(nextTestimonial, 5000);

// Pause auto-advance on hover
if (testimonialSlider) {
    testimonialSlider.addEventListener('mouseenter', () => {
        clearInterval(testimonialInterval);
    });

    testimonialSlider.addEventListener('mouseleave', () => {
        testimonialInterval = setInterval(nextTestimonial, 5000);
    });
}

// Initialize first testimonial
updateTestimonial();

// Form Handling
const contactForm = document.querySelector('.contact-form');
const newsletterForm = document.querySelector('.newsletter-form');

if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(this);
        const formObject = {};
        formData.forEach((value, key) => {
            formObject[key] = value;
        });

        // Here you would typically send the form data to your backend
        console.log('Appointment request:', formObject);
        
        // Show success message
        const modal=document.getElementById('successModal');
        if(modal){modal.classList.remove('hidden');
            modal.querySelector('.close-modal').addEventListener('click',()=>modal.classList.add('hidden'));
            setTimeout(()=>modal.classList.add('hidden'),4000);
        }else{
            alert('Thank you for registering!');
        }
        this.reset();
    });
}

if (newsletterForm) {
    newsletterForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const email = this.querySelector('input[type="email"]').value;
        
        // Here you would typically send the email to your backend
        console.log('Newsletter subscription:', email);
        
        // Show success message
        alert('Thank you for subscribing to our newsletter!');
        this.reset();
    });
}

// Scroll Animations
const observerOptions = {
    threshold: 0.2,
    rootMargin: '0px 0px -50px 0px'
};

const animateOnScroll = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate');
        }
    });
}, observerOptions);

// Observe elements for animation
document.querySelectorAll('.service-card, .team-member, .about-content, .contact-container').forEach(element => {
    animateOnScroll.observe(element);
});

// Header scroll effect
const header = document.querySelector('.header');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll <= 0) {
        header.classList.remove('scroll-up');
        return;
    }
    
    if (currentScroll > lastScroll && !header.classList.contains('scroll-down')) {
        header.classList.remove('scroll-up');
        header.classList.add('scroll-down');
    } else if (currentScroll < lastScroll && header.classList.contains('scroll-down')) {
        header.classList.remove('scroll-down');
        header.classList.add('scroll-up');
    }
    lastScroll = currentScroll;
});

// ===== Rotating Hero Background =====
const heroSection=document.querySelector('.hero');
if(heroSection){
    const heroImages=[
        'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?auto=format&fit=crop&w=1920&q=80',
        'https://images.unsplash.com/photo-1519741495895-730aa3b48fa0?auto=format&fit=crop&w=1920&q=80',
        'https://images.unsplash.com/photo-1556228724-4b2bd5090a84?auto=format&fit=crop&w=1920&q=80',
        'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1920&q=80'
    ];
    let heroIdx=0;
    heroSection.style.backgroundImage=`linear-gradient(rgba(0,0,0,0.3),rgba(0,0,0,0.3)), url('${heroImages[0]}')`;
    console.log('Hero rotation initialized');
    heroSection.style.transition='background-image 1s ease-in-out';
    setInterval(()=>{
        heroIdx=(heroIdx+1)%heroImages.length;
        const newBg=`linear-gradient(rgba(0,0,0,0.3),rgba(0,0,0,0.3)), url('${heroImages[heroIdx]}')`;
        heroSection.style.setProperty('background-image', newBg, 'important');
        console.log('Hero image switched to', heroImages[heroIdx]);
    },10000);
}

// -------------------------
// Parallax Scroll + Mousemove Effects
// -------------------------
// Assign speed factors to hero decorative shapes
const shape1s = document.querySelectorAll('.hero-shapes .shape-1');
shape1s.forEach(el => el.dataset.speed = '0.3');
const shape2s = document.querySelectorAll('.hero-shapes .shape-2');
shape2s.forEach(el => el.dataset.speed = '0.2');
const shape3s = document.querySelectorAll('.hero-shapes .shape-3');
shape3s.forEach(el => el.dataset.speed = '0.15');

// Generic parallax for any element with data-speed attribute
const parallaxElements = document.querySelectorAll('[data-speed]');
window.addEventListener('scroll', () => {
    const offset = window.pageYOffset;
    parallaxElements.forEach(el => {
        const speed = parseFloat(el.dataset.speed);
        el.style.transform = `translateY(${offset * speed}px)`;
    });
});

// Mousemove parallax within hero section for extra game-like interactivity
const heroSection2 = document.querySelector('.hero');
if (heroSection2) {
    heroSection2.addEventListener('mousemove', (e) => {
        const { clientX, clientY } = e;
        const centerX = window.innerWidth / 2;
        const centerY = window.innerHeight / 2;
        const deltaX = (clientX - centerX) / 60;
        const deltaY = (clientY - centerY) / 60;
        document.querySelectorAll('.hero-shapes .shape').forEach(el => {
            const speed = parseFloat(el.dataset.speed) || 0.2;
            el.style.transform = `translate(${deltaX * speed}px, ${deltaY * speed}px)`;
        });
    });
}
