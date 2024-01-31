const letters = ["E", "N", "J", "O", "Y"];
let guessCount = 10;
const guessLetterDisplay = document.querySelector(".guessLetterDisplay");
const correctWord = document.querySelector(".correctWord");
const guessCountMessage = document.querySelector(".guessCountMessage");
const message = document.querySelector(".message");
const form = document.getElementById("guessForm");
const inputLetter = document.getElementById("inputLetter");
let guessLetters = [];
let positions = [3, 4];
let enableForm = true;

guessCountMessage.innerHTML = `You have ${guessCount} guess remaining`;

showCorrectGuess(positions);

form.addEventListener("submit", (event) => {
  event.preventDefault();
  if (!enableForm) {
    return;
  }

  guessCount--;
  if (guessCount >= 0) {
    const updatedLetters = [...guessLetters, inputLetter.value.toUpperCase()];
    guessLetters = [...updatedLetters];
    displayGuessLetter(guessLetters);
    let newPosition = matchedIndex(inputLetter.value.toUpperCase());
    if (newPosition >= 0 && !positions.includes(newPosition)) {
      positions = [newPosition, ...positions];
      console.log(positions);
      message.innerHTML = `Good guess! The word has Letter ${
        letters[positions[0]]
      }.`;
    } else {
      message.innerHTML = "Bad guess!";
    }
    showCorrectGuess(positions);
    if (positions.length === letters.length) {
      enableForm = false;
      inputLetter.disabled = true;
    }
    guessCountMessage.innerHTML =
      positions.length === letters.length
        ? `You win!!!`
        : `You have ${guessCount} guess remaining`;

    inputLetter.value = "";
  } else {
    guessCountMessage.innerHTML = "You failed, try again...";
  }
});

function matchedIndex(letter) {
  return letters.indexOf(letter);
}
function showCorrectGuess(positions) {
  correctWord.innerHTML = letters
    .map(
      (letter, index) =>
        `${
          positions.includes(index)
            ? `<span class="correct-letter" id=${index}>${letter}</span>`
            : `<span class="correct-letter" id=${index}>*</span>`
        }`
    )
    .join(" ");
}

function displayGuessLetter(guessLetters) {
  guessLetterDisplay.innerHTML = guessLetters
    .map((guessLetter) => `<span>${guessLetter}</span>`)
    .join(" ");
}
