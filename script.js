'use strict';

// // Selecting elements
const playerEl0 = document.querySelector('.player--0 ');
const playerEl1 = document.querySelector('.player--1 ');
const scoreEl0 = document.querySelector('#score--0');
const scoreEl1 = document.getElementById('score--1');
const currentEl0 = document.getElementById('current--0');
const currentEl1 = document.getElementById('current--1');

const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

// Starting condition
let socres, currentScore, activePlayer, playing;
const init = function () {
  socres = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true;

  currentEl0.textContent = 0;
  currentEl1.textContent = 0;
  scoreEl0.textContent = 0;
  scoreEl1.textContent = 0;

  diceEl.classList.add('hidden');
  playerEl0.classList.remove('player--winner');
  playerEl1.classList.remove('player--winner');
  playerEl0.classList.add('player--active');
  playerEl1.classList.remove('player--active');
};

init();
const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  playerEl0.classList.toggle('player--active');
  playerEl1.classList.toggle('player--active');
};

// Rolling dice Functionality

btnRoll.addEventListener('click', function () {
  if (playing) {
    // 1. get random number of dice roll
    const dice = Math.trunc(Math.random() * 6) + 1;

    // 2. display dice

    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${dice}.png`;

    // 3.Cheeked for roll
    if (dice !== 1) {
      // Add dice to current score
      currentScore += dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      //Swich to next  player
      switchPlayer();
    }
  }
});

btnHold.addEventListener('click', function () {
  if (playing) {
    // 1. Add current's score active score players
    socres[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      socres[activePlayer];

    // 2. Cheek if palayer score >= 100
    if (socres[activePlayer] >= 100) {
      //  finish the game
      playing = false;
      diceEl.classList.add('hidden');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
    } else {
      // Switch the next palayer

      switchPlayer();
    }
  }
});
// new  game functionality
btnNew.addEventListener('click', init);
