// Typing animation
const typingText = document.querySelector('.typing-text');
const texts = [
    'Full Stack Developer',
    'UI/UX Designer',
    'Creative Problem Solver',
    'Tech Enthusiast'
];
let textIndex = 0;
let charIndex = 0;
let isDeleting = false;

function type() {
    const currentText = texts[textIndex];
    
    if (isDeleting) {
        typingText.textContent = currentText.substring(0, charIndex - 1);
        charIndex--;
    } else {
        typingText.textContent = currentText.substring(0, charIndex + 1);
        charIndex++;
    }
    
    if (!isDeleting && charIndex === currentText.length) {
        isDeleting = true;
        setTimeout(type, 2000);
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        textIndex = (textIndex + 1) % texts.length;
        setTimeout(type, 500);
    } else {
        setTimeout(type, isDeleting ? 50 : 100);
    }
}

type();

// Smooth scrolling
function scrollToSection(id) {
    document.getElementById(id).scrollIntoView({ behavior: 'smooth' });
}

// Navigation active state
const sections = document.querySelectorAll('.section, .hero');
const navLinks = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        if (pageYOffset >= sectionTop - 100) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.classList.add('active');
        }
    });
});

// Counter animation
const counters = document.querySelectorAll('.counter');
let started = false;

window.addEventListener('scroll', () => {
    if (started) return;
    
    counters.forEach(counter => {
        const rect = counter.getBoundingClientRect();
        if (rect.top < window.innerHeight) {
            started = true;
            const target = +counter.getAttribute('data-target');
            const increment = target / 100;
            
            const updateCounter = () => {
                const current = +counter.textContent;
                if (current < target) {
                    counter.textContent = Math.ceil(current + increment);
                    setTimeout(updateCounter, 20);
                } else {
                    counter.textContent = target;
                }
            };
            
            updateCounter();
        }
    });
});

// Skill progress animation
const skillProgress = document.querySelectorAll('.skill-progress');

const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const progress = entry.target.getAttribute('data-progress');
            entry.target.style.width = progress + '%';
        }
    });
});

skillProgress.forEach(skill => observer.observe(skill));

// Theme toggle
const themeToggle = document.getElementById('themeToggle');
let isDark = true;

themeToggle.addEventListener('click', () => {
    isDark = !isDark;
    document.documentElement.setAttribute('data-theme', isDark ? 'dark' : 'light');
    themeToggle.textContent = isDark ? '🌙' : '☀️';
});

// Custom cursor
const cursor = document.querySelector('.cursor-follow');

document.addEventListener('mousemove', e => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
});

// Contact form
document.getElementById('contactForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;
    
    if (name && email && message) {
        document.getElementById('formStatus').textContent = `Thank you ${name}! Your message has been sent successfully! ✨`;
        document.getElementById('formStatus').style.color = '#6366f1';
        this.reset();
        
        setTimeout(() => {
            document.getElementById('formStatus').textContent = '';
        }, 5000);
    }
});

// Parallax effect for shapes
window.addEventListener('scroll', () => {
    const shapes = document.querySelectorAll('.shape');
    const scrolled = window.pageYOffset;
    
    shapes.forEach((shape, index) => {
        const speed = (index + 1) * 0.5;
        shape.style.transform = `translateY(${scrolled * speed}px)`;
    });
});