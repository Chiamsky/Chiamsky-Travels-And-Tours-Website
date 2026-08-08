const menuToggle = document.getElementById('menuToggle');
const mainNav = document.querySelector('.main-nav');
const navLinks = document.querySelectorAll('.nav-list a');
const heroSearchForm = document.getElementById('heroSearchForm');
const contactForm = document.getElementById('contactForm');
const successModal = document.getElementById('successModal');
const closeModal = document.getElementById('closeModal');
const backToTop = document.getElementById('backToTop');
const whatsappButton = document.getElementById('whatsappButton');
const testimonialTrack = document.getElementById('testimonialTrack');
const testimonialDots = document.getElementById('testimonialDots');
const testimonialPrev = document.getElementById('testimonialPrev');
const testimonialNext = document.getElementById('testimonialNext');
const testimonialCards = Array.from(document.querySelectorAll('.testimonial-card'));
const faqAccordion = document.getElementById('faqAccordion');
const statValues = document.querySelectorAll('.stat-value');
const currentYear = document.getElementById('currentYear');

const WHATSAPP_NUMBER = '234XXXXXXXXXX'; // Replace with business WhatsApp number
const WHATSAPP_MESSAGE = 'Hello CHIAMSKY TRAVELS & TOURS, I would like to make a travel enquiry.';

function toggleMenu() {
  const isOpen = menuToggle.classList.toggle('open');
  mainNav.classList.toggle('open', isOpen);
  menuToggle.setAttribute('aria-expanded', String(isOpen));
}

menuToggle.addEventListener('click', toggleMenu);
navLinks.forEach(link => {
  link.addEventListener('click', () => {
    mainNav.classList.remove('open');
    menuToggle.classList.remove('open');
    menuToggle.setAttribute('aria-expanded', 'false');
  });
});

window.addEventListener('scroll', () => {
  if (window.scrollY > 400) {
    backToTop.classList.add('show');
  } else {
    backToTop.classList.remove('show');
  }
});

backToTop.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

const isValidEmail = email => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
const isValidPhone = phone => /^[0-9+\s()-]{7,20}$/.test(phone);

function showModal() {
  successModal.classList.remove('hidden');
}

function hideModal() {
  successModal.classList.add('hidden');
}

closeModal.addEventListener('click', hideModal);
successModal.addEventListener('click', event => {
  if (event.target === successModal) hideModal();
});

function displayToast(message) {
  alert(message);
}

heroSearchForm.addEventListener('submit', event => {
  event.preventDefault();
  const from = document.getElementById('heroFrom').value.trim();
  const to = document.getElementById('heroTo').value.trim();
  const departure = document.getElementById('heroDeparture').value;
  const returnDate = document.getElementById('heroReturn').value;
  const travellers = document.getElementById('heroTravellers').value;

  if (!from || !to || !departure || !returnDate || !travellers) {
    displayToast('Please complete all fields so we can process your request.');
    return;
  }

  showModal();
  heroSearchForm.reset();
});

contactForm.addEventListener('submit', event => {
  event.preventDefault();
  const name = document.getElementById('contactName').value.trim();
  const email = document.getElementById('contactEmail').value.trim();
  const phone = document.getElementById('contactPhone').value.trim();
  const destination = document.getElementById('contactDestination').value.trim();
  const date = document.getElementById('contactDate').value;
  const travelers = document.getElementById('contactTravelers').value;
  const service = document.getElementById('contactService').value;
  const message = document.getElementById('contactMessage').value.trim();

  if (!name || !email || !phone || !destination || !date || !travelers || !service || !message) {
    displayToast('Please fill in all required fields before sending your request.');
    return;
  }

  if (!isValidEmail(email)) {
    displayToast('Please enter a valid email address.');
    return;
  }

  if (!isValidPhone(phone)) {
    displayToast('Please enter a valid phone number.');
    return;
  }

  showModal();
  contactForm.reset();
});

function updateStats() {
  statValues.forEach(stat => {
    const target = Number(stat.dataset.target);
    const increment = Math.max(1, Math.floor(target / 70));
    let current = 0;

    const counter = setInterval(() => {
      current += increment;
      if (current >= target) {
        stat.textContent = target.toString();
        clearInterval(counter);
      } else {
        stat.textContent = current.toString();
      }
    }, 20);
  });
}

const statsSection = document.querySelector('.stats-section');
const statsObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      updateStats();
      statsObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });

if (statsSection) {
  statsObserver.observe(statsSection);
}

let currentIndex = 0;
let testimonialInterval;

function renderTestimonial(index) {
  testimonialCards.forEach(card => card.classList.toggle('active', Number(card.dataset.index) === index));
  const dots = Array.from(testimonialDots.children);
  dots.forEach((dot, dotIndex) => dot.classList.toggle('active', dotIndex === index));
}

function createTestimonialDots() {
  testimonialCards.forEach((card, index) => {
    const button = document.createElement('button');
    button.type = 'button';
    button.setAttribute('aria-label', `Show testimonial ${index + 1}`);
    button.addEventListener('click', () => {
      currentIndex = index;
      renderTestimonial(currentIndex);
      resetTestimonialTimer();
    });
    testimonialDots.appendChild(button);
  });
}

function nextTestimonial() {
  currentIndex = (currentIndex + 1) % testimonialCards.length;
  renderTestimonial(currentIndex);
}

function prevTestimonial() {
  currentIndex = (currentIndex - 1 + testimonialCards.length) % testimonialCards.length;
  renderTestimonial(currentIndex);
}

function resetTestimonialTimer() {
  clearInterval(testimonialInterval);
  testimonialInterval = setInterval(nextTestimonial, 6000);
}

testimonialPrev.addEventListener('click', () => {
  prevTestimonial();
  resetTestimonialTimer();
});

testimonialNext.addEventListener('click', () => {
  nextTestimonial();
  resetTestimonialTimer();
});

testimonialTrack.addEventListener('mouseenter', () => clearInterval(testimonialInterval));
testimonialTrack.addEventListener('mouseleave', resetTestimonialTimer);

createTestimonialDots();
renderTestimonial(currentIndex);
resetTestimonialTimer();

faqAccordion.addEventListener('click', event => {
  const button = event.target.closest('.faq-question');
  if (!button) return;
  const currentItem = button.parentElement;
  const openItem = faqAccordion.querySelector('.faq-item.active');

  if (openItem && openItem !== currentItem) {
    openItem.classList.remove('active');
    openItem.querySelector('.faq-question').setAttribute('aria-expanded', 'false');
  }

  const isExpanded = currentItem.classList.toggle('active');
  button.setAttribute('aria-expanded', isExpanded ? 'true' : 'false');
});

const revealElements = document.querySelectorAll('.hero-content, .stat-card, .service-card, .destination-card, .package-card, .testimonial-card, .faq-item, .contact-copy');
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.2 });

revealElements.forEach(el => revealObserver.observe(el));

whatsappButton.href = `https://wa.me/${WHATSAPP_NUMBER.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`;

const header = document.querySelector('.site-header');
window.addEventListener('scroll', () => {
  header.classList.toggle('scrolled', window.scrollY > 20);
});

currentYear.textContent = new Date().getFullYear();
