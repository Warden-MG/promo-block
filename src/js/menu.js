const burger = document.getElementById('burgerButton');
const overlay = document.getElementById('mobileOverlay');

function openOverlay() {
  overlay.classList.add('mobile-overlay--open');
  burger.classList.add('burger-button--active');
  document.body.style.overflow = 'hidden';
}

function closeOverlay() {
  overlay.classList.remove('mobile-overlay--open');
  burger.classList.remove('burger-button--active');
  document.body.style.overflow = '';
}

// Открытие/закрытие по бургер-кнопке (toggle)
burger.addEventListener('click', () => {
  if (overlay.classList.contains('mobile-overlay--open')) {
    closeOverlay();
  } else {
    openOverlay();
  }
});

// Закрытие оверлея при клике на любой пункт меню
document.querySelectorAll('.mobile-overlay__link').forEach(link => {
  link.addEventListener('click', () => {
    closeOverlay();
  });
});

document.querySelectorAll('.mobile-overlay__policy').forEach(link => {
  link.addEventListener('click', () => {
    closeOverlay();
  });
});