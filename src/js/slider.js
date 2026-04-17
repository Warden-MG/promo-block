import '../scss/style.scss';

const courseCards = document.querySelectorAll('[data-course-card]');
const pagination = document.querySelector('[data-course-pagination]');

if (courseCards.length > 0 && pagination) {
    const bulletClassName = 'courses__bullet';
    const bulletActiveClassName = 'courses__bullet--active';
    const cardActiveClassName = 'courses__card--active';

    const bullets = Array.from(courseCards, (_, index) => {
        const bullet = document.createElement('button');
        bullet.type = 'button';
        bullet.className = bulletClassName;
        bullet.setAttribute('aria-label', `Показать слайд ${index + 1}`);

        pagination.append(bullet);

        return bullet;
    });

    const setActiveSlide = (slideIndex) => {
        courseCards.forEach((card, index) => {
            card.classList.toggle(cardActiveClassName, index === slideIndex);
        });

        bullets.forEach((bullet, index) => {
            bullet.classList.toggle(bulletActiveClassName, index === slideIndex);
        });
    };

    courseCards.forEach((card, index) => {
        card.addEventListener('click', () => setActiveSlide(index));
    });

    bullets.forEach((bullet, index) => {
        bullet.addEventListener('click', () => setActiveSlide(index));
    });

    setActiveSlide(Array.from(courseCards).findIndex((card) => card.classList.contains(cardActiveClassName)));
}