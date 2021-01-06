// import Swiper styles
import 'swiper/swiper-bundle.css';

import Swiper, {Navigation, Pagination} from 'swiper';
console.log();

// configure Swiper to use modules
Swiper.use([Navigation, Pagination]);

const mySwiper = new Swiper('.swiper-container', {
  direction: 'horizontal',
  loop: true,
  breakpoints: {
    // // when window width is >= 320px
    480: {
      slidesPerView: 1,
    },
    // // when window width is >= 480px
    768: {
      slidesPerView: 2,
      spaceBetween: 20,
    },
    // // when window width is >= 640px
    1024: {
      slidesPerView: 3,
      spaceBetween: 20,
    },
  },
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
});
