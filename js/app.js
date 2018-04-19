// Self Executing Anonymous Function
(function(){  console.log("JS Initialized");


// VARIABLES

// retrive gameCanvas from DOM
const   field = document.getElementById("gameCanvas"),
        ctx = field.getContext("2d"),
        gun = document.querySelector(".gun"),
        player = {width : 120, height : 120, speed : 10, x : 275, y : 630},
        mouseTracker = {x : field.width / 2},
        alien1 = document.querySelector(".alien1")
        alien2 = document.querySelector(".alien2")
        alien3 = document.querySelector(".alien3")
        aliens = [
            { x: 095, y: 640, width: 75, height: 75, image: alien1, points: 05},
            { x: 195, y: 640, width: 75, height: 75, image: alien2, points: 10},
            { x: 300, y: 640, width: 75, height: 75, image: alien3, points: 20},
            { x: 410, y: 640, width: 75, height: 75, image: alien1, points: 05},
            { x: 520, y: 640, width: 75, height: 75, image: alien2, points: 10},
            { x: 630, y: 640, width: 75, height: 75, image: alien3, points: 20}
        ],
        hitMark = document.querySelector(".hit");

let mousePos = 0,
    count = 0,
    showReticle = false,
    retX = 0,
    retY = 0;


// FUNCTIONS

// LOAD IMAGE CONTEXT
function draw() {
    // begin by CLEARING the ENTIRE PAGE
    // eliminates ARTIFACTING
    ctx.clearRect(0, 0, field.width, field.height);

    // draw ALIENS
    aliens.forEach((alienBoy, index) => {
        // drawImage (IMAGE, X-Pos, Y-Pos, WIDTH, HEIGHT)
        ctx.drawImage(alienBoy.image, alienBoy.x, alienBoy.y, alienBoy.width, alienBoy.height);
    });

    // move GUN after MOUSE
    dx = mousePos - player.x;
    player.x += (dx / 3);
    // draw GUN
    ctx.drawImage(gun, player.x, player.y, player.width, player.height);


    if (showReticle) {
        ctx.drawImage(hitMark, retX, retY, 52, 52)
    }

    // LOOP the ANIMATION SEQUENCE
    window.requestAnimationFrame(draw);
}

function createHitmark() {
    showReticle = true;

    retX = player.x - 30;
    retY = player.y + 8;

    setTimeout(function() {
        showReticle = false;
    }, 500);
}

function enemyRNG() {

}

function movePlayer(e) {
    mousePos = (e.clientX - field.offsetLeft) - player.width / 2;
    mouseTracker.x = e.clientX - field.offsetLeft;
}

// function initImages() {
//     console.log("initializing images");

//     for (i = 0; i < 6; i++) { 
//         alien[i] = field.getContext("2d");
//         console.log(`Alien${i} has been initialized.`);
//     }

//     // NOT WORKING!!!!
//     switch (i) {
//         case 0:
//             // apply imgAlien1 to DOM Variable alien[]
//             alien[i].drawImage(imgAlien1, 90, 500, 100, 100);
//             console.log("this triggered");
//             break;
//         case 1:
//             alien[i].drawImage(imgAlien1, 180, 500, 100, 100);
//             console.log("this triggered as well");

//             break;
//         case 2:
//             alien[i].drawImage(imgAlien1, 270, 500, 100, 100);
//             break;
//         case 3:
//             alien[i].drawImage(imgAlien1, 360, 500, 100, 100);
//             break;
//         case 4:
//             alien[i].drawImage(imgAlien1, 450, 500, 100, 100);
//             break;
//         case 5:
//             alien[i].drawImage(imgAlien1, 540, 500, 100, 100);
//             break;
//     }
// }


// LOAD ALIEN1 CONTEXT
// imgAlien1.onload = function() {
	
	
// }

// EVENT HANDLERS

window.requestAnimationFrame(draw);

window.setInterval(enemyRNG, 1000);

field.addEventListener('mousemove', movePlayer);

field.addEventListener('click', createHitmark);

// TIMER
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
    }, 1000); }

window.onload = function () {
    let startMinutes = 60 * 2,
        display = document.querySelector('#time');
    startTimer(startMinutes, display);

    };

}) ();












