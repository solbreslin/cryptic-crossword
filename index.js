const Tabletop = require("tabletop");

const publicSpreadsheetUrl =
  "https://docs.google.com/spreadsheets/d/1sNQOdgB8BcP83fJvH2RKCbzsfrwZeldaGQrkK1ZjHks/edit?usp=sharing";

const input = document.getElementById("i");
const output = document.getElementById("o");

let data = null;

function init() {
  Tabletop.init({
    key: publicSpreadsheetUrl,
    callback: showInfo,
    simpleSheet: false,
    debug: true,
  });
}

function showInfo(json, tabletop) {
  data = json.Sheet1.elements;
}

input.addEventListener("input", (e) => {
  if (data) {
    findMatch(e.target.value);
  }
});

input.addEventListener("keypress", (e) => {
  if (data) {
    if (e.key === "Enter") {
      findMatch(e.target.value);
    }
  }
});

const findMatch = (value) => {
  const matchIndex = data.findIndex((entry) => isMatch(entry.Word, value));

  if (data[matchIndex]) {
    output.textContent = data[matchIndex].Meaning;
  } else {
    output.textContent = "";
  }
};

const isMatch = (a, b) => {
  a = a.toLowerCase();
  b = b.toLowerCase();

  if (a === b) {
    return true;
  }

  return false;
};

init();
