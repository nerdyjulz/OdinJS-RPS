// initialise global variables and invoke RPS game.
let userWinCount = 0;
let compWinCount = 0;
let tieCount = 0;
let totalGames = 0;
let gameFinished = 0;
let matchCount = 0;
let timeout = 10000;
const buttonDiv = document.querySelector('#buttons');
const buttons = document.querySelectorAll('button');
const paperButton = document.querySelector('.paper');
const scissorButton = document.querySelector ('.scissor');
const rockButton = document.querySelector ('.rock');
console.log ("Your Rock Paper Scissor Fight, Best of 5, starts NOW!!");

/* RPSv2: Step3: Add a div for displaying results and change all of your console.logs into DOM methods.*/

//Initialise Welcome div with welcome message
const welcomeDiv = document.createElement('div');
buttonDiv.insertAdjacentElement('beforebegin',welcomeDiv);
welcomeDiv.setAttribute('id', 'welcome');
welcomeDiv.innerText = "Welcome to the ROCK, PAPER, SCISSOR game! \n\n The match is Best-of-5 format...Good Luck! \n\n (Click the buttons to start playing...)";

//Initialise additional Button Div elements
const resetButton = document.createElement('button');
resetButton.className = "reset";

//initialise sub-sections of the result div (i.e. round/match results)
const resultDiv = document.createElement('div');
const roundResultPara = document.createElement('p');
const matchResultDiv = document.createElement('div');
roundResultPara.className = "roundResult";
matchResultDiv.className = "matchResult";
resultDiv.className = "results";
buttonDiv.insertAdjacentElement('afterend',resultDiv);
resultDiv.insertAdjacentElement('afterend',matchResultDiv);
matchResultDiv.style.display = 'none';

// return Computer's choice (random) of Rock, Paper or Scissors (RPS)
function getComputerChoice(){
    let randNum = Math.ceil(Math.random() * 3);
    let compChoice = "";
    if (randNum === 1) {
        compChoice = "ROCK";
    } else if (randNum === 2) {
        compChoice = "SCISSOR";
    } else {
        compChoice = "PAPER";
    }
    return compChoice;
}

// return User's choice of Rock, Paper or Scissors (RPS) via input from button press
function getUserChoice(x){
    //v2 mod - no longer takes user prompt, but inputs from button click
    let userChoice = x.toUpperCase();
    //console.log(typeof(userChoice)+ ': '+userChoice);
    return userChoice;
}
// Play a single round of RPS, taking user and computer input, 
// and returning the result as a string.
// Note: Make user input parameter case-insensitive.
function playRPSRound(humanInput="error", computerInput="error"){
    let userInput = humanInput;
    let compInput = computerInput;;
    console.log("In playRound with User: " + userInput + " and Comp: " + compInput);
    let result = "";
    //output 'win' message + track win count
    function userWin(){
        result = "You WIN this round :)";
        userWinCount += 1;
    }
    //output 'lose' message + track loss count
    function compWin(){
        result = "You LOSE this round :(";
        compWinCount += 1;
    }

    //determine and report winner to console
    if (userInput===compInput) {
        result = "It's a TIE! Go again!";
    } else if (userInput === "PAPER") {
        if (compInput === "ROCK"){
            userWin();
        } else if (compInput === "SCISSOR"){
            compWin();
        }          
    } else if (userInput === "SCISSOR") {
        if (compInput === "PAPER"){
            userWin();
        } else if (compInput === "ROCK"){
            compWin();
        }          
    } else if (userInput === "ROCK") {
        if (compInput === "SCISSOR"){
            userWin();
        } else if (compInput === "PAPER"){
            compWin();
        }          
    }
    resultDiv.appendChild(roundResultPara);
    totalGames = userWinCount + compWinCount;
    roundResultPara.innerText = "Round #"+totalGames+ " \n\nYour choice: " + userInput + "\nComputer choice: " + compInput + "\n\n " +result +"\n\n UserWin: " + userWinCount +". CompWin: " + compWinCount + ". ";
}

//function to announce winner, depending on who has more wins
function announceWinner(){
    matchResultDiv.style.display = 'inline';
    if (userWinCount > compWinCount) {
        return "YOU WON!! \n Man shall not be controlled by AI! \n\n (resetting in " + (timeout / 1000) + " seconds...)";
    } else {
        return "YOU LOST!! \n The AI will take over the world! \n\n (resetting in )" + (timeout / 1000) + " seconds...)";
    }
}

//removes Reset Button and reinstates the page as it appeared at the start
function viewReset(){
    //remove Reset view
    console.log("Reset Button Pressed!");
    
    //reinstate Default view
    resetButton.style.display = 'none';
    paperButton.disabled = false;
    scissorButton.disabled = false;
    rockButton.disabled = false;
    resultDiv.style.display = 'inline';
    paperButton.style.display = 'inline';
    scissorButton.style.display = 'inline';
    rockButton.style.display = 'inline';
    matchResultDiv.innerText = "";
    roundResultPara.innerText = "";

    // set tracking variables to default values
    userWinCount = 0;
    compWinCount = 0;
    tieCount = 0;
    totalGames = 0;
    gameFinished = 0;
    matchCount += 1;
}

/*RPSv2: Step1: For now, remove the logic that plays exactly five rounds.
 format game to play 5 rounds of RPS. */
 function playRPSGame() {
    /* RPSv2: Step2: Create three buttons, one for each selection. Add an event listener to the buttons that calls your playRound function with the correct playerSelection every time a button is clicked */
    buttons.forEach((button) => {
        button.addEventListener('click', () => {
            //Manage mouse-over button interaction
            console.log("Mouse-clicked with ClassName: "+ button.className);
            if (button.className.includes(" playing") ){
                button.className = button.className.slice(0, (button.className.length - 8));
            }
            console.log("Button post-slice ClassName: "+ button.className);
            console.log("In Match #: " + matchCount + " game #: " + totalGames);
            const buttonName = button.className;
            //console.log (buttonName);
            playRPSRound(getUserChoice(buttonName),getComputerChoice());
            //Once 5 games reached, announce winner and reset view
            if (totalGames === 5) {
                console.log ("5 GAMES STOP PLAY");
                paperButton.disabled = true;
                scissorButton.disabled = true;
                rockButton.disabled = true;
                
                // RPSv2: Step4: Display the running score, and announce a winner of the game once one player reaches 5 points.
                //display the result in a new paragraph
                matchResultDiv.innerText = announceWinner();
                
                //resultDiv.appendChild(matchResultPara); 
                
                console.log("Displaying Match Result for " + (timeout / 1000) + " seconds");
                // After X seconds of displaying result, reset the view
                setTimeout(() => {
                    resultDiv.style.display = 'none';
                    paperButton.style.display = 'none';
                    scissorButton.style.display = 'none';
                    rockButton.style.display = 'none';
                    resetButton.innerText = 'Reset';
                    buttonDiv.appendChild(resetButton);
                    resetButton.style.display = 'inline';
                    matchResultDiv.style.display = 'none'
                }, timeout);
                
                // Wait for user to Reset the game
                //console.log("Resetting...");
                resetButton.addEventListener('click', () => {
                    viewReset();
                });
                resetButton.addEventListener("mouseover", (event) => {
                    console.log ("Moused-over: " + resetButton.className);
                    //console.log (button.classlist);
                    resetButton.className = resetButton.className + " playing";
                });
                resetButton.addEventListener("mouseout", (event) => {
                    console.log ("Moused-out: " + resetButton.className);
                    //console.log (button.classlist);
                    if (resetButton.className.includes(" playing") ){
                        resetButton.className = resetButton.className.slice(0, (resetButton.className.length - 8));
                    }
                });

            }

        });
        button.addEventListener("mouseover", (event) => {
            console.log ("Moused-over: " + button.className);
            /*would like future functionality to show images on mouseover*/
            //button.insertAdjacentHTML("afterbegin", "<img src=\"" + button.className + ".png\"/>");
            //console.log("Inner HTML: "+button.innerHTML);
            button.className = button.className + " playing";
        });

        button.addEventListener("mouseout", (event) => {
            console.log ("Moused-out: " + button.className);
            //console.log (button.classlist);
            if (button.className.includes(" playing") ){
                button.className = button.className.slice(0, (button.className.length - 8));
            }
        });

    });
}

playRPSGame();

console.log(document);




// TEST AREA FOR PRACTICING DOM COMMANDS







