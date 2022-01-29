const COLOR_DEFAULT = 'rgb(206, 206, 206)';
const COLOR_RED = '#FF7777';
const COLOR_GREEN = '#88E385';
const MAX_SCORE = 5;

const mainMenu = document.querySelector('.main');
const buttons = document.querySelectorAll('.button');
const moves = document.querySelectorAll('.move');
const opponent = document.querySelector('.opponent');
const playButton = document.querySelector('.play');
const loseButton = document.querySelector('.lose');
const nextButton = document.querySelector('.next');
const mainMenuButton = document.querySelector('.mainmenu');
const gameMessage = document.querySelector('.game-msg');
const title = document.querySelector('.title');

let round = 1;
let playerScore = 0;
let cpuScore = 0;
let playerPrev;
let cpuPrev;

initialize();

function initialize() {
    setupMainMenuDialog();
    activateButtonEffects(buttons);
    activateButton(playButton, setupRound);
    activateButton(loseButton, loseGame);
    activateButton(nextButton, goNextRound);
    activateButton(mainMenuButton, goMainMenu);
}

function setupRound() {
    setupRoundDialog();
    activateButtonNodes(moves, playRound);
}

function playRound(event) {
    clearGameMessage();

    const playerMove = event.currentTarget.id;

    if (round === 1 && playerMove === 'time-machine') {
        appendGameMessage('You cannot choose time-machine the first round!');
        return;
    }

    deactivateButtonNodes(moves, playRound);

    const cpuMove = cpuChoose();
    const outcome = checkRound(cpuMove, playerMove);

    /**
     *  Previous move does not store time-machine because recursively, 
     *  it causes an infinite loop in the case where cpu is against time-machine
     *  while having his previous move as time-machine.
     *  
     *  One way to avoid this problem is to simply store the last non time-machine move.
     */
    if(playerMove !== 'time-machine')
        playerPrev = playerMove;

    if(cpuMove !== 'time-machine')
        cpuPrev = cpuMove;

    if (outcome === 'player') {
        playerScore++;
    }
    else if (outcome === 'cpu') {
        cpuScore++;
    }

    /**
     *  Title is updated so that as soon as there is an update in either scores,
     *  it displays those changes.
     */
    updateTitleStatus();

    if (playerScore === MAX_SCORE) {
        appendGameMessage("<br><strong>Computer:</strong> You win this time.", COLOR_GREEN);
    }
    else if (cpuScore === MAX_SCORE) {
        appendGameMessage("<br><strong>Computer:</strong> Incompetent Human.", COLOR_RED);
    }
    else {
        show(nextButton);
        return;
    }

    hide(nextButton);
    show(mainMenuButton);
}

function goNextRound() {
    round++;
    hide(nextButton);
    setupRoundDialog();
    activateButtonNodes(moves, playRound);
}

function goMainMenu() {
    resetValues();
    setupMainMenuDialog();
}

function cpuChoose() {
    let range = 4;
    if (round === 1) range = 3;

    const move = Math.floor(Math.random() * range);
    console.log(move);
    switch (move) {
        case 0:
            return 'rock';
        case 1:
            return 'paper';
        case 2:
            return 'scissor';
        case 3:
            return 'time-machine';
        default:
            return undefined;
    }
}

function checkRound(cpuMove, playerMove) {
    appendGameMessage(`Computer throws ${cpuMove}!`, COLOR_RED);
    appendGameMessage(`You throw ${playerMove}!`, COLOR_GREEN);

    if (playerMove === 'time-machine' && cpuMove === 'time-machine') {
        playerMove = playerPrev;
        cpuMove = cpuPrev;

        appendGameMessage('Both threw time-machine!');
        appendGameMessage('Both player\'s previous moves will go against each other.');
        appendGameMessage(`Your move: ${playerPrev}`);
        appendGameMessage(`Computer's move: ${cpuPrev}`)
    }
    else if (playerMove === 'time-machine') {
        playerMove = cpuPrev;

        appendGameMessage('Computer goes against his previous move!');
        appendGameMessage(`Computer's ${cpuMove} goes against his ${cpuPrev}.`)
    }
    else if (cpuMove === 'time-machine') {
        cpuMove = playerPrev;

        appendGameMessage('You go against your previous move!');
        appendGameMessage(`Your ${playerMove} goes against your ${playerPrev}.`)
    }

    if (playerMove === 'rock' && cpuMove === 'scissor' ||
        playerMove === 'paper' && cpuMove === 'rock' ||
        playerMove === 'scissor' && cpuMove === 'paper') {
        
        appendGameMessage(`Player wins! ${playerMove} beats ${cpuMove}.`);

        return 'player';
    }
    else if (cpuMove === 'rock' && playerMove === 'scissor' ||
        cpuMove === 'paper' && playerMove === 'rock' ||
        cpuMove === 'scissor' && playerMove === 'paper') {

        appendGameMessage(`Computer wins! ${playerMove} beats ${cpuMove}.`);

        return 'cpu';
    }
    else {
        appendGameMessage(`Tie game! ${playerMove} and ${cpuMove} are equal.`);

        return 'tie';
    }
}

function resetValues() {
    round = 1;
    playerScore = 0;
    cpuScore = 0;
    playerPrev = undefined;
    cpuPrev = undefined;
}

function setupRoundDialog() {
    hide(playButton);
    hide(loseButton);
    clearGameMessage();
    appendGameMessage("Choose one of the moves below:");
    updateTitleStatus();
}

function setupMainMenuDialog() {
    hide(mainMenuButton);
    hide(nextButton);
    show(playButton);
    show(loseButton);
    clearGameMessage();
    appendGameMessage('<strong>Computer:</strong> So, you feel competent enough to challenge me?');
    clearTitleStatus();
}

function loseGame() {
    show(mainMenuButton);
    hide(playButton);
    hide(loseButton);
    clearGameMessage();
    appendGameMessage("<strong>Computer:</strong> Incompetent Human.", COLOR_RED);
}

function activateButtonNodes(buttons, func) {
    let addListeners = function (button) {
        button.addEventListener('click', func);
    }

    buttons.forEach(addListeners);
    activateButtonEffects(buttons);
}

function activateButton(button, func) {
    button.addEventListener('click', func);
}

function activateButtonEffects(buttons) {
    let addListeners = function (button) {
        button.addEventListener('mouseenter', addMouseover);
        button.addEventListener('mouseleave', removeMouseover);
    }

    buttons.forEach(addListeners);
}

function deactivateButtonNodes(buttons, func) {
    let removeListeners = function (button) {
        button.removeEventListener('click', func);
    }

    buttons.forEach(removeListeners);
    deactivateButtonEffects(buttons);
}

function deactivateButtonEffects(buttons) {
    let removeListeners = function (button) {
        button.removeEventListener('mouseenter', addMouseover);
        button.removeEventListener('mouseleave', removeMouseover);
    }

    buttons.forEach(removeListeners);
    buttons.forEach((button) => { button.classList.remove('mouseover') })
}

function appendGameMessage(message, color=COLOR_DEFAULT) {
    gameMessage.innerHTML += `<span style="color: ${color};">${message}</span><br>`;
}

function clearGameMessage() {
    gameMessage.innerHTML = '';
}

function updateTitleStatus() {
    title.innerHTML = `Round ${round}: CPU ${cpuScore} | ${playerScore} Player`;
}

function clearTitleStatus() {
    title.innerHTML = 'Rock Paper Scissor Time-Machine';
}

function hide(element) {
    element.classList.add('hidden');
}

function show(element) {
    element.classList.remove('hidden');
}

function addMouseover(event) {
    event.target.classList.add('mouseover');
}

function removeMouseover(event) {
    event.target.classList.remove('mouseover');
}