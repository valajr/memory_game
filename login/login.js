let input = document.querySelector('.login-input');
let button = document.querySelector('.login-button');
let form = document.querySelector('.login-form');

const validateInput = ({ target }) => {
    if(target.value.length > 2) {
        button.removeAttribute('disabled');
        return;
    }
    button.setAttribute('disabled', true);
}

const handleSubmit = (event) => {
    event.preventDefault();
    localStorage.setItem('player', input.value);
    window.location = 'game/game.html';
}

input.addEventListener('input', validateInput);
form.addEventListener('submit', handleSubmit);
