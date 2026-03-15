const menuToggle = document.getElementById('menuToggle');
const navMenu = document.getElementById('navMenu');

if (menuToggle && navMenu) {
  menuToggle.addEventListener('click', () => {
    navMenu.classList.toggle('open');
  });
}

const revealItems = document.querySelectorAll('.reveal');
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.16 });

revealItems.forEach((item) => observer.observe(item));


const contactForm = document.getElementById('contactForm');
const formPopup = document.getElementById('formPopup');
const submitBtn = document.getElementById('submitBtn');

if (contactForm) {
  contactForm.addEventListener('submit', async (e) => {
    e.preventDefault(); // stops redirect to Formspree page

    const formData = new FormData(contactForm);
    const action = contactForm.getAttribute('action');

    submitBtn.disabled = true;
    submitBtn.textContent = 'Sending...';

    try {
      const response = await fetch(action, {
        method: 'POST',
        body: formData,
        headers: {
          Accept: 'application/json'
        }
      });

      if (response.ok) {
        showPopup('Message sent successfully.', 'success');
        contactForm.reset(); // clears entered info
      } else {
        showPopup("Message not sent. Kindly send an email instead.", 'error');
      }
    } catch (error) {
      showPopup("Message not sent. Kindly send an email instead.", 'error');
    } finally {
      submitBtn.disabled = false;
      submitBtn.textContent = 'Send Message';
    }
  });
}

function showPopup(message, type) {
  if (!formPopup) return;

  formPopup.textContent = message;
  formPopup.className = `form-popup show ${type}`;

  setTimeout(() => {
    formPopup.classList.remove('show');
  }, 3000);
}