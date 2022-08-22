let player = localStorage.getItem('player');
const grid = document.querySelector('.grid');
const span_player = document.querySelector('.player');
const timer = document.querySelector('.timer');

const characters = [
    'brook',
    'chopper',
    'franky',
    'luffy',
    'merry',
    'nami',
    'robin',
    'sanji',
    'sogeking',
    'sunny',
    'vivi',
    'zoro'
];

if(!player) {
    window.location = '../index.html';
}

let first_card = '';
let second_card = '';

const checkEndGame = () => {
  let disabled_cards = document.querySelectorAll('.disabled-card');

  if (disabled_cards.length === 24) {
    clearInterval(this.loop);
    alert(`Congratulations, ${span_player.innerHTML}! Your time was: ${timer.innerHTML}`);
  }
}

function checkCards() {
  let first_character = first_card.getAttribute('data-character');
  let second_character = second_card.getAttribute('data-character');

  if (first_character === second_character) {
    first_card.firstChild.classList.add('disabled-card');
    second_card.firstChild.classList.add('disabled-card');

    first_card = '';
    second_card = '';

    checkEndGame();
  } else {
    setTimeout(() => {
      first_card.classList.remove('reveal-card');
      second_card.classList.remove('reveal-card');

      first_card = '';
      second_card = '';
    }, 500);
  }

}

const revealCard = ({ target }) => {
  if (target.parentNode.className.includes('reveal-card')) {
    return;
  }

  if (first_card === '') {
    target.parentNode.classList.add('reveal-card');
    first_card = target.parentNode;
  } else if (second_card === '') {
    target.parentNode.classList.add('reveal-card');
    second_card = target.parentNode;

    checkCards();
  }  
}

const createElement = (tag, class_name) => {
    const element = document.createElement(tag);
    element.className = class_name;
    return element;
}

const createCard = (character) => {

    const card = createElement('div', 'card');
    const front = createElement('div', 'face front');
    const back = createElement('div', 'face back');
  
    front.style.backgroundImage = `url('../static/img/${character}.jpg')`;
  
    card.appendChild(front);
    card.appendChild(back);
  
    card.addEventListener('click', revealCard);
    card.setAttribute('data-character', character)
  
    return card;
}

function loadGame() {
    let duplicated_characters = [ ...characters, ...characters ];
  
    let shuffled_array = duplicated_characters.sort(() => Math.random() - 0.5);
    shuffled_array.forEach((character) => {
      const card = createCard(character);
      grid.appendChild(card);
    });
}

function countDozens(number) {
    if(number < 10) {
        return '0' + number;
    }

    return number;
}

const startTimer = () => {
    this.loop = setInterval(() => {
        let time = timer.innerHTML;
        let minutes_seconds = time.split(':');
        let new_time = parseInt(minutes_seconds[1]) + 1;
        let minutes = parseInt(minutes_seconds[0]);
        let seconds = new_time;
        if(new_time == 60) {
            minutes ++;
            seconds = 0;
        }
        if(minutes){
            timer.innerHTML = countDozens(minutes) + ':' + countDozens(seconds);
        }
        else {
            timer.innerHTML = '00:' + countDozens(new_time);
        }
    }, 1000);
}

window.onload = () => {
    span_player.innerHTML = localStorage.getItem('player');
    loadGame();
    startTimer();
  }