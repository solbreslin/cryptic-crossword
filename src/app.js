import MatchWord from "./match_word";
import ApiService from "./api_service";
import Loader from "./loader";

export default class App {
  constructor() {
    this.apiService = ApiService.getInstance();
    this.matchWord = MatchWord.getInstance();
    this.loader = Loader.getInstance();
  }

  init = () => {
    this.apiService.load();
    this.loader.init();
    this.apiService.loaded$.subscribe((status) => {
      if (status) {
        this.getDOMElements();
        this.addEventListeners();
        this.loader.destroy();
      }
    });
  };

  getDOMElements = () => {
    this.input = document.getElementById("query");
    this.output = document.getElementById("answer");
  };

  addEventListeners = () => {
    this.input.addEventListener("input", (e) => {
      this.onQuery(e.target.value);
    });

    this.input.addEventListener("keypress", (e) => {
      if (e.key === "Enter") {
        this.onQuery(e.target.value);
      }
    });
  };

  onQuery = (value) => {
    const match = this.matchWord.findMatch(this.apiService.data, value);

    this.output.textContent = match ? match : "";
  };
}
