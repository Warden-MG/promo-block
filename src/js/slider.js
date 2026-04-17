import '../scss/style.scss';

const courseCards = document.querySelectorAll('[data-course-card]');

if (courseCards.length > 0) {
  courseCards.forEach((card) => {
    card.addEventListener('click', () => {
      courseCards.forEach((item) => {
        item.classList.remove('courses__card--active');
      });

      card.classList.add('courses__card--active');
    });
  });
}