// Self Executing Anonymous Function
(function(){  console.log("JS Initialized");


// VARIABLES

// retrive gameCanvas from DOM
const   field = document.getElementById("gameCanvas"),
        ctx = field.getContext("2d"),
        gun = document.querySelector(".gun"),
        player = {width : 120, height : 120, speed : 10, x : 275, y : 630},
        mouseTracker = {x : field.width / 2},
        alien1 = document.querySelector(".alien1"),
        alien2 = document.querySelector(".alien2"),
        alien3 = document.querySelector(".alien3"),
        aliens = [
            { x: -700, y: 640, width: 75, height: 75, image: alien1, points: 05},
            { x: -700, y: 640, width: 75, height: 75, image: alien2, points: 10},
            { x: -700, y: 640, width: 75, height: 75, image: alien3, points: 20},
            { x: -700, y: 640, width: 75, height: 75, image: alien1, points: 05},
            { x: -700, y: 640, width: 75, height: 75, image: alien2, points: 10},
            { x: -700, y: 640, width: 75, height: 75, image: alien3, points: 20}
        ],
        alienPos = [90, 195, 300, 410, 520, 630],
        hitMark = document.querySelector(".hit"),
        displayHit = document.querySelector(".displayHit"),
        logoIMG = document.querySelector(".logo"),
        infoTXT = document.querySelector(".updateInfo");

let mousePos = 0,
    showReticle = false,
    retX = 0,
    retY = 0,
    counterLMAO = 0
    score = 0;


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

    // draw SCORE
    ctx.font = "30px Arial";
    ctx.fillText(`SCORE : ${score}`,10,50);

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

    checkCollision();
}


function checkCollision() {
    // for every Alien, check if the reticle is inside it on the X axis. If so, delete that bug
    aliens.forEach((alienHit, index) => {

        let alienIndex = index;

        if (retX < alienHit.x + alienHit.width &&
            retX + 52 > alienHit.x ) {

                displayHit.innerHTML = `${alienIndex} IS HIT!`;
                alienHit.x = -1000;
                score += alienHit.points;

        } 

    });
}


function enemyRNG() {

    aliens.forEach((alienLoad, index) => {

        if ( Math.floor((Math.random() * 4) + 1) == 4 ) {
            alienLoad.x = alienPos[index];
        }

    });
}



function movePlayer(e) {
    mousePos = (e.clientX - field.offsetLeft) - player.width / 2;
    mouseTracker.x = e.clientX - field.offsetLeft;
}

// EVENT HANDLERS

window.requestAnimationFrame(draw);

window.setInterval(enemyRNG, 700);

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












