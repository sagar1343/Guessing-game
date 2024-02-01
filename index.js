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
let index = 0;

guessCountMessage.innerHTML = showMessage(positions);

showCorrectGuess(positions);

form.addEventListener("submit", handleInput);

function showCorrectGuess(positions) {
  correctWord.innerHTML = letters
    .map((letter, index) => {
      return `${
        positions.includes(index)
          ? `<span class="correct-letter" id=${index}>${letter}</span>`
          : `<span class="correct-letter" id=${index}>*</span>`
      }`;
    })
    .join(" ");
}

function displayGuessLetter(guessLetters) {
  guessLetterDisplay.innerHTML = guessLetters
    .map((guessLetter) => `<span>${guessLetter}</span>`)
    .join(" ");
}
function validateLetter(letter) {
  return letter === letters[index];
}

function handleInput(event) {
  event.preventDefault();

  if (!enableForm) {
    return;
  }
  guessCount--;
  if (guessCount >= 0) {
    const enteredLetter = inputLetter.value.toUpperCase();
    guessLetters = [...guessLetters, enteredLetter];
    displayGuessLetter(guessLetters);

    if (validateLetter(enteredLetter)) {
      message.innerHTML = `Good guess! The word has Letter ${letters[index]}.`;
      positions = [...positions, index];
      index++;
    } else {
      message.innerHTML = "Bad guess!";
    }
    inputLetter.value = "";
    showCorrectGuess(positions);
    guessCountMessage.innerHTML = showMessage(positions);
  }
}
function showMessage(positionArray) {
  if (positionArray.length === letters.length) {
    inputLetter.disabled = true;
    enableForm = false;
    return "You Win!!!";
  } else if (guessCount === 0) {
    inputLetter.disabled = true;
    enableForm = false;
    return "You failed, try again...";
  } else {
    return `You have ${guessCount} guess remaining`;
  }
}
