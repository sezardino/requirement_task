import 'swiper/swiper-bundle.css';

import Swiper, {Navigation} from 'swiper';
Swiper.use([Navigation]);

interface ISlider {
  init: () => void;
}

type SliderProps = {
  selector: string;
  settings: {
    direction: string;
    loop: boolean;
    slideClass: string;
    breakpoints?: {
      [index: number]: {
        slidesPerView: number;
        spaceBetween?: number;
      };
    };
    navigation: {
      nextEl: string;
      prevEl: string;
    };
  };
};

class Slider implements ISlider {
  settings: Object;
  selector: string;
  constructor(props: SliderProps) {
    this.settings = props.settings;
    this.selector = props.selector;
  }

  init() {
    new Swiper(this.selector, this.settings);
  }
}

export default Slider;
