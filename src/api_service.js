const Tabletop = require("tabletop");
import { BehaviorSubject } from "rxjs";

const url =
  "https://docs.google.com/spreadsheets/d/1sNQOdgB8BcP83fJvH2RKCbzsfrwZeldaGQrkK1ZjHks/edit?usp=sharing";

export default class ApiService {
  constructor() {
    this._data = null;

    this.loaded$ = new BehaviorSubject(false);
  }

  static getInstance() {
    if (!this.instance) {
      this.instance = new ApiService();
    }

    return this.instance;
  }

  set data(data) {
    this._data = data;
  }

  get data() {
    return this._data;
  }

  load() {
    const self = this;

    if (Tabletop) {
      Tabletop.init({
        key: url,
        callback: self.handleResponse.bind(self),
        simpleSheet: false,
      });
    }
  }

  handleResponse(json, tabletop) {
    if (json) {
      this.data = json.Sheet1.elements;
      this.loaded$.next(true);
    }
  }
}
