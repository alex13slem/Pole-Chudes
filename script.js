const WORDS = [
  {
    word: 'чебурашка',
    hints: [
      'Он корчневый',
      'У него зелёный друг',
      'Любит апельсины',
      'Родом из Ближнего Востока',
    ],
  },
  {
    word: 'баян',
    hints: ['Имеет мех', 'Музыкальный инструмент', 'Похож на гармошку'],
  },
];

const hintsTitle = document.querySelector('#hints');
const attemptsOutput = document.querySelector('output#attempts');
const tabloOutput = document.querySelector('output#tablo');
const letterInput = document.querySelector('input#letter');
const startBtn = document.querySelector('button#start');
const checkBtn = document.querySelector('button#check');

let attempts, showWord, secretWord, secret;

startBtn.onclick = () => {
  const ok = confirm('Хотите начать новую игру?');
  if (ok) return init();
};
checkBtn.onclick = check;

init();

function init() {
  secret = getRandomOfList(WORDS);
  secretWord = secret.word;
  hintsTitle.innerHTML = getRandomOfList(secret.hints);
  checkBtn.disabled = false;
  letterInput.readOnly = false;
  attempts = secretWord.length;
  showWord = Array.from(secretWord)
    .map((char) => '*')
    .join('');

  tabloOutput.innerHTML = showWord;
  attemptsOutput.innerHTML = attempts;
}

function check() {
  const userLetter = letterInput.value.trim();

  if (userLetter.length !== 1) return endOfTurn('Введите одну букву');

  if (!secretWord.includes(userLetter)) {
    attempts -= 1;
    attemptsOutput.innerHTML = attempts;
    if (!attempts) return endOfGame('Ты проиграл.');
    return endOfTurn('Не угадал :(');
  }

  Array.from(secretWord).forEach((letter, idx) => {
    if (letter !== userLetter) return;
    showWord = Array.from(showWord).toSpliced(idx, 1, letter).join('');
  });

  // for (const letter in secretWord) {
  //   if (secretWord[letter] !== userLetter) continue;
  //   showWord = Array.from(showWord)
  //     .toSpliced(letter, 1, secretWord[letter])
  //     .join('');
  // }

  tabloOutput.innerHTML = showWord;

  endOfTurn('Угадал!');

  if (showWord === secretWord) return endOfGame('Ты победил!');
}

function endOfTurn(message = '') {
  hintsTitle.innerHTML = getRandomOfList(secret.hints);
  letterInput.value = '';
  letterInput.focus();
  if (message) {
    alert(message);
  }
}

function endOfGame(message) {
  checkBtn.disabled = true;
  letterInput.readOnly = true;
  letterInput.value = '';
  const ok = confirm(`${message} Начать заново?`);
  if (ok) return init();
}

function getRandomOfList(list) {
  return list[Math.floor(Math.random() * list.length)];
}
