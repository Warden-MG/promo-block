const burger = document.querySelector('.burger');
const menu = document.querySelector('.header__menu');

if (burger && menu) {
  burger.addEventListener('click', () => {
    burger.classList.toggle('burger--active');
    menu.classList.toggle('header__menu--active');
  });
}