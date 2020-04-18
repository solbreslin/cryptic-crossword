export default class MatchWord {
  constructor() {}

  static getInstance() {
    if (!this.instance) {
      this.instance = new MatchWord();
    }

    return this.instance;
  }

  findMatch = (data, value) => {
    const matchIndex = data.findIndex((entry) =>
      this.isMatch(entry.Word, value)
    );

    if (data[matchIndex]) {
      return data[matchIndex].Meaning;
    }
  };

  isMatch = (a, b) => {
    a = a.toLowerCase();
    b = b.toLowerCase();

    if (a === b) {
      return true;
    }

    return false;
  };
}
