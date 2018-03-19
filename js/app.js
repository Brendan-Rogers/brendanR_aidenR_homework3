// Self Executing Anonymous Function
(function(){  console.log("JS Initialized");


// VARIABLES

// retrive gameCanvas from DOM
let field = document.getElementById("gameCanvas");
// BACKGROUND vars
let background = field.getContext("2d");
let imgBackground = new Image();
imgBackground.src = "images/battlefield.svg";
// ALIEN vars
let alien1 = field.getContext("2d");
let imgAlien1 = new Image();
imgAlien1.src = "images/alien1.svg"


// SCORE vars
let score = 0;



// FUNCTIONS

// LOAD BACKGROUND CONTEXT
imgBackground.onload = function() {
	// set canvas size
	field.width = 800;
	field.height = 800;
	// draw background(DOM element) as JS IMG at (xLocation, yLocation, xLength, yLength)
    background.drawImage(imgBackground, 0, 0, 800, 800);
    // confirm load
    console.log("Background Loaded"); }

// LOAD ALIEN1 CONTEXT
imgAlien1.onload = function() {
	// apply imgAlien1 to DOM Variable alien1
	alien1.drawImage(imgAlien1, 75, 500, 100, 100);
	// confirm load
	console.log("alien1 is loaded");
}

// EVENT HANDLERS


// TEST TIMER
function startTimer(duration, display) {
    let timer = duration, minutes, seconds;

    setInterval(function () {
        minutes = parseInt(timer / 60, 10)
        seconds = parseInt(timer % 60, 10);

        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;

        display.textContent = minutes + ":" + seconds;

        if (--timer < 0) {
            timer = duration;
        }
    }, 1000);
}

window.onload = function () {
    let startMinutes = 60 * 2,
        display = document.querySelector('#time');
    startTimer(startMinutes, display);
};



}) ();












