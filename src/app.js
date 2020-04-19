import MatchWord from "./match_word";
import ApiService from "./api_service";
import Loader from "./loader";
import { isEqual } from "lodash";

export default class App {
  constructor() {
    this.apiService = ApiService.getInstance();
    this.matchWord = MatchWord.getInstance();
    this.loader = Loader.getInstance();

    this.matches = [];
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
    this.output = document.getElementById("matches");
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
    const matches = this.matchWord.getMatches(this.apiService.data, value);

    this.matches = matches;
    this.output.innerHTML = "";

    this.matches.forEach((match) => {
      this.output.appendChild(this.getResultTemplate(match, value));
    });
  };

  noNewMatches(matches) {
    if (isEqual(matches, this.matches)) return true;
  }

  getResultTemplate(match, query) {
    const word = match.Word.toLowerCase();
    const meaning = match.Meaning;
    query = query.toLowerCase();

    const li = document.createElement("li");
    const w = document.createElement("p");
    const m = document.createElement("p");
    const q = document.createElement("p");
    q.classList.add("query");
    m.classList.add("match");
    w.classList.add("word");

    const start = word.indexOf(query);

    if (start > 0) {
      q.style.transform = `translateX(${start}ch)`;
    }

    q.textContent = query;
    w.textContent = word;
    m.textContent = meaning;

    li.appendChild(w);
    li.appendChild(q);
    li.appendChild(m);

    return li;
  }
}
