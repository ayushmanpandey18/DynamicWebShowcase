document.addEventListener('DOMContentLoaded', () => {
  const menuToggle = document.getElementById('menuToggle');
  const navLinks = document.getElementById('navLinks');
  const themeToggle = document.getElementById('themeToggle');
  const scrollTopBtn = document.getElementById('scrollTopBtn');
  const testimonials = document.querySelectorAll('.testimonial');
  const yearSpan = document.getElementById('year');
  const heroHeadline = document.querySelector('.hero-content h1');
  const form = document.getElementById('contactForm');
  const formMessage = document.getElementById('formMessage');
  const navbar = document.querySelector('.navbar');

  // Mobile menu toggle
  menuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
  });

  // Theme toggle with icon switch
  themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark');
    themeToggle.textContent = document.body.classList.contains('dark') ? '☀️' : '🌙';
  });

  // Scroll to section smooth
  window.scrollToSection = (id) => {
    document.getElementById(id).scrollIntoView({ behavior: 'smooth' });
    if (navLinks.classList.contains('active')) {
      navLinks.classList.remove('active');
    }
  };

  // Scroll to top button
  window.addEventListener('scroll', () => {
    scrollTopBtn.style.display = window.scrollY > 200 ? 'block' : 'none';

    // Sticky navbar color change
    if (window.scrollY > 60) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }

    // Update scroll progress bar width
    const scrollTop = window.scrollY;
    const docHeight = document.body.scrollHeight - window.innerHeight;
    const scrollPercent = (scrollTop / docHeight) * 100;
    progressBar.style.width = scrollPercent + '%';
  });

  scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  // Testimonial slider with fade & lazy load
  let currentTestimonial = 0;
  const slideTestimonial = () => {
    testimonials.forEach((t, i) => {
      t.style.opacity = '0';
      t.style.pointerEvents = 'none';
      if (i === currentTestimonial) {
        t.style.opacity = '1';
        t.style.pointerEvents = 'auto';
      }
    });
    currentTestimonial = (currentTestimonial + 1) % testimonials.length;
  };
  slideTestimonial();
  setInterval(slideTestimonial, 5000);

  // Dynamic year
  if (yearSpan) yearSpan.textContent = new Date().getFullYear();

  // Hero typing effect
  const text = heroHeadline.textContent;
  heroHeadline.textContent = '';
  let idx = 0;
  const typeInterval = setInterval(() => {
    heroHeadline.textContent += text[idx];
    idx++;
    if (idx === text.length) clearInterval(typeInterval);
  }, 100);

  // Animated button hover particles
  const heroBtn = document.querySelector('.hero-content button');
  heroBtn.addEventListener('mousemove', e => {
    const particle = document.createElement('span');
    particle.classList.add('particle');
    particle.style.left = e.offsetX + 'px';
    particle.style.top = e.offsetY + 'px';
    heroBtn.appendChild(particle);
    setTimeout(() => particle.remove(), 600);
  });

  // Form validation & confetti burst on submit
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = form.querySelector('input[type="text"]');
    const email = form.querySelector('input[type="email"]');
    const message = form.querySelector('textarea');

    let valid = true;

    // Clear previous errors
    [name, email, message].forEach(input => {
      input.style.borderColor = '';
    });
    formMessage.textContent = '';

    // Basic validation
    if (!name.value.trim()) {
      name.style.borderColor = 'red';
      valid = false;
    }
    if (!email.value.trim() || !/\S+@\S+\.\S+/.test(email.value)) {
      email.style.borderColor = 'red';
      valid = false;
    }
    if (!message.value.trim()) {
      message.style.borderColor = 'red';
      valid = false;
    }
    if (!valid) {
      formMessage.textContent = 'Please fill all fields correctly.';
      formMessage.style.color = 'red';
      return;
    }

    // Show success message
    formMessage.textContent = '🎉 Thank you! We will contact you soon.';
    formMessage.style.color = '#28a745';

    // Confetti burst
    confettiBurst();

    form.reset();
    setTimeout(() => (formMessage.textContent = ''), 6000);
  });

  // Confetti burst function
  function confettiBurst() {
    const colors = ['#ff6f61', '#ffe5d9', '#8ec5fc', '#e0c3fc', '#ffcc00'];
    for (let i = 0; i < 30; i++) {
      const confetti = document.createElement('div');
      confetti.classList.add('confetti');
      confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
      confetti.style.left = Math.random() * 100 + '%';
      confetti.style.animationDelay = (Math.random() * 2) + 's';
      document.body.appendChild(confetti);
      setTimeout(() => confetti.remove(), 4000);
    }
  }

  // Create and append scroll progress bar
  const progressBar = document.createElement('div');
  progressBar.id = 'progressBar';
  Object.assign(progressBar.style, {
    position: 'fixed',
    top: 0,
    left: 0,
    height: '4px',
    width: '0%',
    backgroundColor: 'var(--primary)',
    zIndex: 9999,
    transition: 'width 0.25s ease-out',
  });
  document.body.appendChild(progressBar);
});
