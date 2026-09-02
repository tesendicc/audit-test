// -----------------------------------------------------------
// Mobile nav toggle — keeps aria-expanded in sync so screen
// reader / switch users know the menu's state (WCAG 4.1.2).
// -----------------------------------------------------------
const navToggle = document.getElementById('nav-toggle');
const navList = document.getElementById('primary-nav');

navToggle.addEventListener('click', () => {
  const isOpen = navList.classList.toggle('is-open');
  navToggle.setAttribute('aria-expanded', String(isOpen));
});

// Close the mobile menu with Escape, returning focus to the toggle.
navList.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && navList.classList.contains('is-open')) {
    navList.classList.remove('is-open');
    navToggle.setAttribute('aria-expanded', 'false');
    navToggle.focus();
  }
});


const form = document.getElementById('contact-form');
const status = document.getElementById('form-status');

const fields = [
  {
    input: document.getElementById('name'),
    error: document.getElementById('name-error'),
    validate: (value) => (value.trim().length > 0 ? '' : 'Please enter your full name.'),
  },
  {
    input: document.getElementById('email'),
    error: document.getElementById('email-error'),
    validate: (value) => {
      if (value.trim().length === 0) return 'Please enter your email address.';
      const looksValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
      return looksValid ? '' : 'Please enter a valid email address, like name@example.com.';
    },
  },
  {
    input: document.getElementById('subject'),
    error: document.getElementById('subject-error'),
    validate: (value) => (value.trim().length > 0 ? '' : 'Please enter a subject.'),
  },
  {
    input: document.getElementById('message'),
    error: document.getElementById('message-error'),
    validate: (value) => (value.trim().length > 0 ? '' : 'Please enter a message.'),
  },
];

function validateField(field) {
  const message = field.validate(field.input.value);

  if (message) {
    field.error.textContent = message;
    field.input.setAttribute('aria-invalid', 'true');
    field.input.classList.add('invalid');
  } else {
    field.error.textContent = '';
    field.input.removeAttribute('aria-invalid');
    field.input.classList.remove('invalid');
  }

  return message === '';
}

fields.forEach((field) => {
  field.input.addEventListener('blur', () => validateField(field));
});

form.addEventListener('submit', (event) => {
  event.preventDefault();

  let firstInvalidInput = null;
  let allValid = true;

  fields.forEach((field) => {
    const valid = validateField(field);
    if (!valid) {
      allValid = false;
      if (!firstInvalidInput) {
        firstInvalidInput = field.input;
      }
    }
  });

  if (!allValid) {
    status.textContent = 'There is a problem with your submission. Please review the highlighted fields.';
    status.classList.remove('success');
    firstInvalidInput.focus();
    return;
  }

  status.textContent = 'Thanks — your message has been sent. We will get back to you soon.';
  status.classList.add('success');
  form.reset();
});
