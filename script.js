'use strict';

let jo = '';
let score = 20;
let highScore = 0;

const displayMessage = function (message) {
  document.querySelector(`.message`).textContent = message;
};
const displayNumber = function (num) {
  document.querySelector(`.number`).textContent = num;
};

const setJa = function () {
  jo = Math.trunc(Math.random() * 20 + 1);
};

setJa();

const play = function () {
  const kanske = Number(document.querySelector(`.guess`).value);

  document.querySelector(`.again`).addEventListener(`click`, function () {
    score = 20;
    document.querySelector(`.score`).textContent = score;
    displayMessage(`Start guessing...`);
    displayNumber(`?`);
    document.querySelector(`.guess`).value = null;
    document.querySelector(`body`).style.backgroundColor = `#222`;
    document.querySelector(`.number`).style.width = `15rem`;
    setJa();
  });

  if (!kanske) {
    displayMessage(`You didn't Enter a Number!`);
  } else if (kanske === jo) {
    displayMessage(`Wow Congrats!`);
    displayNumber(jo);

    document.querySelector(`body`).style.backgroundColor = `#84CA0A`;

    document.querySelector(`.number`).style.width = `30rem`;

    if (score > highScore) {
      highScore = score;
      document.querySelector(`.highscore`).textContent = highScore;
    }
  } else if (kanske !== jo) {
    if (score > 1) {
      displayMessage(kanske > jo ? `Too high!` : `Too low!`);
      score--;
      document.querySelector(`.score`).textContent = score;
    } else {
      displayMessage(`You lost the game loser!`);
      document.querySelector(`.score`).textContent = 0;
    }
  }
};

document.querySelector(`.check`).addEventListener(`click`, function () {
  play();
});

document.addEventListener(`keydown`, function (event) {
  if (event.key === `Enter`) {
    play();
  }
});
