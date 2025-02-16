"use strict";
// generating random number in a variable
let secretNumber = Math.floor(Math.random() * 20) + 1;

//creating variable to access the message
let messageText = document.querySelector(".message").textContent;
// console.log(messageText)

//creating score variable
let score = 20;
//variable for highscore
let highscore = 0;

//refactoring code with function to make code dry and follow dry principle i.e. dont repeat yourself
//code to display message in message class
const displayMessage = (message) => {
  document.querySelector(".message").textContent = message;
};
//created the function to store logic call it for click and enter key press events 
function handleTheEvents() {
  const inputNumber = Number(document.querySelector(".guess").value);
  //if no input
  if (!inputNumber) {
    displayMessage("⛔ No number!");
  } //if inputNo === actual no
  else if (inputNumber === secretNumber) {
    displayMessage("🎉 Correct Number!");
    document.querySelector("body").style.backgroundColor = "#60b347";
    document.querySelector(".question-mark").style.padding = "2rem 4rem";
    document.querySelector(".question-mark").textContent = secretNumber;
    //code to set high score
    if (score > highscore) {
      //initially highscore 0 hoga jab score highscore bada hoga tho use ye replace kardega and display bhi karengge
      highscore = score;
      document.querySelector(".highscore").textContent = highscore;
    }
  } //if inputNo ! ==  actual no
  else if (inputNumber !== secretNumber) {
    if (score > 1) {
      displayMessage(inputNumber > secretNumber ? "📈 Too high" : "📉 Too Low");
      score--;
      document.querySelector(".score").textContent = score;
    } else {
      document.querySelector(".score").textContent = 0;
      displayMessage("💥 you loose the game");
    }
  }
}

//function to restore the code when click and ctrl+enter key
/**
 * Restores the initial state of the game by resetting various elements and variables.
 * - Changes the background color of the body.
 * - Displays the initial message.
 * - Resets the question mark text and its padding.
 * - Generates a new secret number.
 * - Clears the input field.
 * - Resets the score and updates the score display.
 */
function restoreEvents() {
  document.querySelector("body").style.backgroundColor = "#222";
  displayMessage("Start guessing...");
  document.querySelector(".question-mark").textContent = "?";
  document.querySelector(".question-mark").style.padding = "1.5rem 2rem";
  // Declaring random number again
  secretNumber = Math.floor(Math.random() * 20) + 1;
  // Emptying the input
  document.querySelector(".guess").value = "";
  score = 20;
  document.querySelector(".score").textContent = 20;
}
//creating event listner and handler for checking number and reaction
document.querySelector(".check").addEventListener("click", handleTheEvents);
document.querySelector(".guess").addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    handleTheEvents();
  }
});

//code for restoring everything as begining if agian btn clicked
document.querySelector(".again").addEventListener("click", restoreEvents);
// Add an event listener to the document body that listens for keydown events
document.body.addEventListener("keydown", function(event) {
  // Check if the Control key and the Enter key is pressed together
  if (event.ctrlKey && event.key === "Enter") {
    // Call the restoreEvents function when the condition is met
    restoreEvents();
  }
});