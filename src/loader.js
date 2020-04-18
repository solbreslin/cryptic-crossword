const LOADING_ANIMATION_INTERVAL = 250;
const FADE_OUT_TIME = 500;

export default class Loader {
  constructor() {}

  static getInstance() {
    if (!this.instance) {
      this.instance = new Loader();
    }
    return this.instance;
  }

  init() {
    this.loader = document.getElementById("loader");
    this.letters = [...this.loader.querySelectorAll("div")];

    this.loadingInterval = setInterval(() => {
      const rand = this.getRandomInt(this.letters.length);

      this.letters[rand].classList.add("active");
    }, LOADING_ANIMATION_INTERVAL);
  }

  destroy = () => {
    this.wrapper = document.getElementById("loader-wrapper");
    if (this.wrapper) {
      this.wrapper.classList.add("fade-out");

      setTimeout(() => {
        this.wrapper.parentElement.removeChild(this.wrapper);
      }, FADE_OUT_TIME);
    }
  };

  getRandomInt = (max) => {
    return Math.floor(Math.random() * Math.floor(max));
  };
}
