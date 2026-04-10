import Swiper from 'swiper/bundle';
import 'swiper/css/bundle';

new Swiper('.swiper', {
  slidesPerView: 1,
  spaceBetween: 20,
  breakpoints: {
    768: {
      slidesPerView: 2
    },
    1024: {
      slidesPerView: 3
    }
  }
});