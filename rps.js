function computerPlay() {
    let rand = Math.floor(Math.random())%3;
    switch(rand) {
        case 0:
            return 'rock';
        case 1:
            return 'paper';
        case 2:
            return 'scissor';
        default:
            throw 'unknown number generated';
    }
}

function playRound(playerSelection, computerSelection) {
    playerSelection = playerSelection.toLowerCase();
    computerSelection = computerSelection.toLowerCase();
    if(
        playerSelection === 'rock' && computerSelection === 'scissor' ||
        playerSelection === 'paper' && computerSelection === 'rock' ||
        playerSelection === 'scissor' && computerSelection === 'paper'
    ) {
        return `You win! ${playerSelection} beats ${computerSelection}`;
    }
    else if(
        computerSelection === 'rock' && playerSelection === 'scissor' ||
        computerSelection === 'paper' && playerSelection === 'rock' ||
        computerSelection === 'scissor' && playerSelection === 'paper'
    ) {
        return `Computer wins! ${computerSelection} beats ${playerSelection}`;
    }
    else if(computerSelection === playerSelection) {
        return `Tie game! ${playerSelection} and ${computerSelection}`;
    }
    return 'You typed something else, didn\'t you?';
}

function game() {
    rounds = 5;
    for(let i=0; i<rounds; ++i) {
        console.log(`round ${i+1}`);
        let playerSelection = prompt('choose between rock, paper, and scissor');
        console.log(playRound(playerSelection, computerPlay()));
    }
}

game();
