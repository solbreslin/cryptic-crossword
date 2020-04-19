const LOADING_ANIMATION_INTERVAL = 250;
const FADE_OUT_TIME = 250;

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

    const randomSelection = this.getRandomSelection(this.letters.length);

    let nextItem = 0;

    this.loadingInterval = setInterval(() => {
      if (nextItem === randomSelection.length) return;

      this.letters[randomSelection[nextItem]].classList.add("active");
      nextItem++;
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

    clearInterval(this.loadingInterval);
  };

  getRandomSelection(n) {
    const arr = [...Array(n).keys()];

    return arr
      .map((a) => ({ sort: Math.random(), value: a }))
      .sort((a, b) => a.sort - b.sort)
      .map((a) => a.value);
  }
}
