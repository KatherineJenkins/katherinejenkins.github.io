'use strict';

// Selecting elements
const player0El = document.querySelector(`.player--0`);
const player1El = document.querySelector(`.player--1`);
const score0EL = document.querySelector(`#score--0`);
const score1El = document.getElementById(`score--1`);
const current0El = document.getElementById(`current--0`);
const current1El = document.getElementById(`current--1`);

const diceEl = document.querySelector(`.dice`);
const btnRoll = document.querySelector(`.btn--roll`);
const btnHold = document.querySelector(`.btn--hold`);
const btnNew = document.querySelector(`.btn--new`);

let scores = [];
let currentScore = '';
let activePlayer = '';
let playing = '';

// Starting conditions
const init = function () {
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true;

  score0EL.textContent = 0;
  score1El.textContent = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;

  diceEl.classList.add(`hidden`);
  player0El.classList.remove(`player--winner`);
  player1El.classList.remove(`player--winner`);
  player0El.classList.add(`player--active`);
  player1El.classList.remove(`player--active`);
  return;
};
init();

const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0El.classList.toggle(`player--active`);
  player1El.classList.toggle(`player--active`);
};

// Rolling dice functionality
btnRoll.addEventListener(`click`, function () {
  if (playing) {
    // 1. Generating a random dice roll
    const dice = Math.trunc(Math.random() * 6) + 1;

    // 2. Display the dice
    diceEl.classList.remove(`hidden`);
    diceEl.src = `dice-${dice}.png`;
    //   console.log(dice);

    // 3. Check for a rolled 1
    if (dice !== 1) {
      // Add dice to current score
      currentScore += dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
      // current0El.textContent = currentScore; //CHANGE LATER
    } else {
      // switch to next player
      switchPlayer();
    }
  }
});

btnHold.addEventListener(`click`, function () {
  if (playing) {
    // 1. Add current score to score of active player
    scores[activePlayer] += currentScore;
    // scores[1] = scores[1] + currentScore
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];
    // 2. Check is score >=100
    if (scores[activePlayer] >= 100) {
      // Finish game
      playing = false;
      diceEl.classList.add(`hidden`);
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add(`player--winner`);
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove(`player--active`);
    } else {
      // Switch to next player
      switchPlayer();
    }
  }
});

// New Game Conditions
btnNew.addEventListener(`click`, init);
