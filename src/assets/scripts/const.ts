const sliderSettings = {
  selector: '.slider__wrapper',
  settings: {
    direction: 'horizontal',
    loop: true,
    slideClass: 'slider__slide',
    breakpoints: {
      480: {
        slidesPerView: 1,
      },
      768: {
        slidesPerView: 2,
        spaceBetween: 20,
      },
      1024: {
        slidesPerView: 3,
        spaceBetween: 20,
      },
    },
    navigation: {
      nextEl: '.slider__arrow--next',
      prevEl: '.slider__arrow--prev',
    },
  },
};

export {sliderSettings};
