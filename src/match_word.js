export default class MatchWord {
  constructor() {}

  static getInstance() {
    if (!this.instance) {
      this.instance = new MatchWord();
    }

    return this.instance;
  }

  getMatches = (data, value) => {
    const matches = [];

    if (value.length > 2) {
      data.forEach((entry) => {
        if (this.isMatch(entry.Word, value)) {
          matches.push(entry);
        }
      });
    }

    return matches;
  };

  isMatch = (str, check) => {
    str = str.toLowerCase();
    check = check.toLowerCase();

    return str.includes(check) ? true : false;
  };
}
