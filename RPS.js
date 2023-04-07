// function to return Computer's choice (random) of Rock, Paper or Scissors (RPS)
function getComputerChoice(){
    let randNum = Math.ceil(Math.random() * 3);
    let compChoice = "";
    if (randNum === 1) {
        compChoice = "ROCK"
    } else if (randNum === 2) {
        compChoice = "SCISSOR"
    } else {
        compChoice = "PAPER"
    }
    return compChoice;
}

// function to return User's choice of Rock, Paper or Scissors (RPS) via prompt
function getUserChoice(){
    let userChoice = prompt("What do you choose: Rock, Paper or Scissors?").toUpperCase();
    while ((userChoice !== "ROCK") && (userChoice !== "PAPER") && (userChoice !== "SCISSOR")) {
        userChoice = prompt("Incorrect input, please choose: Rock, Paper or Scissors!").toUpperCase();
    }
    return userChoice;
}
// function to play single round of RPS, taking user and computer input, 
// and returning string which announces result.
// Note: Make user input parameter case-insensitive.
function playRound(humanInput="error", computerInput="error"){
    let user = humanInput;
    let comp = computerInput;;
    let result = "";
    //win message + count
    function userWin(){
        result = "You WIN this round :)";
        userWinCount = userWinCount+1;
    }
    //lose message + count
    function compWin(){
        result = "You LOSE this round :(";
        compWinCount = compWinCount+1;
    }

    //determine and report winner to console
    if (user===comp) {
        result = "It's a TIE! Go again!";
        tieCount = tieCount + 1;
        //console.log(result);
    } else if (user === "PAPER") {
        if (comp === "ROCK"){
            userWin();
        } else if (comp === "SCISSOR"){
            compWin();
        }          
    } else if (user === "SCISSOR") {
        if (comp === "PAPER"){
            userWin();
        } else if (comp === "ROCK"){
            compWin();
        }          
    } else if (user === "ROCK") {
        if (comp === "SCISSOR"){
            userWin();
        } else if (comp === "PAPER"){
            compWin();
        }          
    }
    console.log("You selected " + user + " and the Computer selected " + comp + ". " +result);
}

// main function to play 5 rounds of RPS.
// tip: use console.log() to display result of each round and final winner. 
function playGame() {
    for (let x = 0; x < 5; x++) {
        //console.log ("value of X is " + x);
        //console.log("The result of game " + (x+1) + " is :")
        playRound(getUserChoice(), getComputerChoice());
        if (tieCount === 1){
            tieCount = tieCount - 1;
            x = x - 1;
        } else {
            totalGames = userWinCount + compWinCount;
            console.log("Current score after " + totalGames + " games is User:" + userWinCount + " and Computer:" + compWinCount + ".");
            if (totalGames === 5) {
                if (compWinCount > userWinCount) {
                    console.log ("You lost the match to the COMPUTER!! OH NO :(");
                } else {
                    console.log ("WOOHOO!! YOU WON!!");
                }
            }
        }
    }
}

// initialise variables and call Rock Paper Scissor game function.
let userWinCount = 0;
let compWinCount = 0;
let tieCount = 0;
let totalGames = 0;
console.log ("Your Rock Paper Scissor Fight, Best of 5, starts NOW!!");
playGame();



