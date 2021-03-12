// Document Selector
const rockPlayerClass = document.querySelector(".rock-p");
const paperPlayerClass = document.querySelector(".paper-p");
const scissorPlayerClass = document.querySelector(".scissor-p");
const rockCompClass = document.querySelector(".rock-c");
const paperCompClass = document.querySelector(".paper-c");
const scissorCompClass = document.querySelector(".scissor-c");
const winLose = document.querySelector(".win-lose");

// choices option
const choices = ["rock", "paper", "scissor"];

// scores
let playerScores = 0;
let computerScores = 0;

// history
let playerChooseHistory = [];
let computerChooseHistory = [];

// player choose action listener
rockPlayerClass.addEventListener("click", function () {
    humanChoosen = choices[0];
    clickAction(humanChoosen);
});

paperPlayerClass.addEventListener("click", function () {
    humanChoosen = choices[1];
    clickAction(humanChoosen);
});

scissorPlayerClass.addEventListener("click", function () {
    humanChoosen = choices[2];
    clickAction(humanChoosen);
});

// action when rock paper scissor button pressed
function clickAction(humanChoosen) {
    let humanAction = new PlayerAction(humanChoosen);
    let computerAction = new PlayerAction();
    let choiceOfHuman = humanAction.humanChoice();
    let choiceOfComputer = computerAction.computerChoiceLogic();
    let game = new GameLogic(choiceOfHuman, choiceOfComputer);
    let choosenStyle = new ChoiceMarker(choiceOfHuman, choiceOfComputer)
    console.log(`player choose ${humanChoosen}`);
    playerChooseHistory.push(humanChoosen);
    console.log(`player choice history ${playerChooseHistory}`);
    choosenStyle.playerEffect();
    choosenStyle.comEffect();
    game.playGame();
}

// action class when player has choosen
class PlayerAction {
    constructor(playerChoose) {
        this.playerChoose = playerChoose;
    }
    humanChoice() {
        return this.playerChoose;
    }
    // computer random choice logic 
    computerChoiceLogic() {
        let computerChoosen = choices[Math.floor((Math.random() * 3))];
        console.log(`computer choose ${computerChoosen}`);
        computerChooseHistory.push(computerChoosen);
        console.log(`computer choice history ${computerChooseHistory}`);
        return computerChoosen;
    }
}
// styling when player and computer has choosen
class ChoiceMarker {
    constructor(human, computer) {
        this.human = human;
        this.computer = computer;
    }
    // padding effect when player has choosen
    playerEffect() {
        if (this.human === "rock") {
            rockPlayerClass.classList.add("game-img-clicked");
            paperPlayerClass.classList.remove("game-img-clicked");
            scissorPlayerClass.classList.remove("game-img-clicked");
        } else if (this.human === "paper") {
            paperPlayerClass.classList.add("game-img-clicked");
            scissorPlayerClass.classList.remove("game-img-clicked");
            rockPlayerClass.classList.remove("game-img-clicked");
        } else if (this.human === "scissor") {
            scissorPlayerClass.classList.add("game-img-clicked");
            rockPlayerClass.classList.remove("game-img-clicked");
            paperPlayerClass.classList.remove("game-img-clicked");
        }
    }
    // padding effect when computer has choosen
    comEffect() {
        if (this.computer === "rock") {
            rockCompClass.classList.add("game-img-clicked");
            paperCompClass.classList.remove("game-img-clicked");
            scissorCompClass.classList.remove("game-img-clicked");
        } else if (this.computer === "paper") {
            paperCompClass.classList.add("game-img-clicked");
            scissorCompClass.classList.remove("game-img-clicked");
            rockCompClass.classList.remove("game-img-clicked");
        } else if (this.computer === "scissor") {
            scissorCompClass.classList.add("game-img-clicked");
            rockCompClass.classList.remove("game-img-clicked");
            paperCompClass.classList.remove("game-img-clicked");
        }
    }
}

// game logic
class GameLogic {

    constructor(human, computer) {
        this.human = human;
        this.computer = computer;
    }

    playGame() {
        if (this.human === this.computer) {
            this.bothDraw();
            console.log(`Draw`);
        } else if (this.human === "rock" && this.computer === "paper" ||
            this.human === "paper" && this.computer === "scissor" ||
            this.human === "scissor" && this.computer === "rock") {
            this.computerWin();
            computerScores++;
            console.log(`${this.computer} over ${this.human} Computer Wins`);
        } else if (this.human === "rock" && this.computer === "scissor" ||
            this.human === "paper" && this.computer === "rock" ||
            this.human === "scissor" && this.computer === "paper") {
            this.playerWin();
            console.log(`${this.human} over ${this.computer} Player Wins`);
            playerScores++;
        }

        console.log(`Player Scores : ${playerScores} Computer Scores : ${computerScores}`);
    }
    // match indicators 
    bothDraw() {
        winLose.classList.remove("vs");
        winLose.classList.remove("win-or-lose");
        winLose.classList.add("draw");
        winLose.innerHTML = "DRAW";
    }

    playerWin() {
        winLose.classList.remove("vs");
        winLose.classList.remove("draw");
        winLose.classList.add("win-or-lose");
        winLose.innerHTML = "PLAYER 1 <br>WIN";
    }

    computerWin() {
        winLose.classList.remove("vs");
        winLose.classList.remove("draw");
        winLose.classList.add("win-or-lose");
        winLose.innerHTML = "COM <br>WIN";
    }
}
// refresh button
document.querySelector(".refresh").addEventListener("click", function () {
    location.reload();
});