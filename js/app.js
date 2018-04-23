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
            { x: -700, y: 640, width: 75, height: 75, image: alien3, points: 20},
        ],
        alienPos = [90, 195, 300, 410, 520, 630],
        hitMark = document.querySelector(".hit"),
        // displayHit = document.querySelector(".displayHit"),
        logoIMG = document.querySelector(".logo");
        // infoTXT = document.querySelector(".updateInfo");

let mousePos = 0,
    retX = 0,
    retY = 0,
    score = 0,
    gameState = 0,
    respawnTime = 1200,
    countdown = 5,
    ascension = 0,
    showReticle = false,
    gameplay = false,
    endScreen = false
    pushStart = false;


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

    // draw SCORE if the game is OCCURING
    if (gameplay) {
        
    }
    
    // load START of GAME
    switch (gameState) {
        case 1:
            // draw the LOGO in the CENTER
            ctx.drawImage(logoIMG, 160, 120, 500, 500);
            break;
        case 2:
            ctx.font = "200px Share Tech Mono";
            ctx.fillStyle = "black";
            ctx.fillText("3", 350, 410);
            break;
        case 3:
            ctx.font = "200px Share Tech Mono";
            ctx.fillStyle = "black";
            ctx.fillText("2", 350, 410);
            break;
        case 4:
            ctx.font = "200px Share Tech Mono";
            ctx.fillStyle = "black";
            ctx.fillText("1", 350, 410);
            break;
        case 5:
            ctx.font = "200px Share Tech Mono";
            ctx.fillStyle = "black";
            ctx.fillText("GO!", 270, 410);
            break;
        case 6:
            // begin COUNTDOWN
            gameplay = true;
            break;
    }

    if (gameplay) {
        //draw COUNTDOWN
        ctx.font = "50px Share Tech Mono";
        ctx.fillStyle = "red";
        ctx.fillText(`TIME: ${countdown}`, 500, 120);
        // draw SCORE
        ctx.font = "50px Share Tech Mono";
        ctx.fillStyle = "red";
        ctx.fillText(`SCORE: ${score}`,80, 120);
        // draw ASCENsion
        if (ascension > 0) {
            ctx.font = "50px Share Tech Mono";
            ctx.fillStyle = "red";
            ctx.fillText(`ASCENSION: ${ascension}`,250, 180);
        }
    }

    // ENDGAME

    if (endScreen) {
        // show SCORE
        ctx.font = "50px Share Tech Mono";
        ctx.fillStyle = "red";
        ctx.fillText(`YOU SCORED: ${score}`, 200, 400);
        // ask to TRY AGAIN
        ctx.font = "30px Share Tech Mono";
        ctx.fillStyle = "black";
        ctx.fillText(`LEVEL UP! ITS GETTING HARDER...`, 150, 470);
    }

    if (pushStart == false) {
        // intro to game
        ctx.font = "60px Share Tech Mono";
        ctx.fillStyle = "red";
        ctx.fillText(`KILL BUGS`, 245, 300);
        // shoot to start
        ctx.font = "50px Share Tech Mono";
        ctx.fillStyle = "black";
        ctx.fillText(`SHOOT (CLICK) TO BEGIN`, 100, 370);
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

    checkCollision();
}


function checkCollision() {
    // for every Alien, check if the reticle is inside it on the X axis. If so, delete that bug
    aliens.forEach((alienHit, index) => {
        let alienIndex = index;

        if (retX < alienHit.x + alienHit.width &&
            retX + 52 > alienHit.x ) {
                // displayHit.innerHTML = `${alienIndex} IS HIT!`;
                alienHit.x = -1000;
                score += alienHit.points;
        } 
    });
}

function gameLoad() {
    if (pushStart) {
        gameState += 1;
    }
    

    if (gameplay) {
        countdown -= 1;
    }

    // THE GAME IS OVER
    if (countdown <= 0) {
        // END GAMEPLAY LOOP
        gameplay = false;
        endScreen = true;
    }

}

function enemyRNG() {
    aliens.forEach((alienLoad, index) => {
        // generate alien IF 1/4 chance procs AND game is started
        if ( Math.floor((Math.random() * 3) + 1) == 3 && gameplay) {
            alienLoad.x = alienPos[index];
        } else {
            alienLoad.x = -500;
        }
    });
}

function movePlayer(e) {
    mousePos = (e.clientX - field.offsetLeft) - player.width / 2;
    mouseTracker.x = e.clientX - field.offsetLeft;
}

function gameChange() {
    
    if (pushStart == false) {
        // set PUSHSTART to TRUE, triggering GAMESTATE
        pushStart = true;
    }

    setTimeout(function () {
        if (endScreen) {
            //disable ENDSCREEN
            endScreen = false;
            //reset TIMER
            countdown = 10;
            //reset GAMESTATE
            gameState = 0;
            //reset SCORE
            score = 0;
            //increse DIFICULTY
            respawnTime -= 200;
            //increase ASCENSION
            ascension += 1;
        }
    }, 7000);
}


// EVENT HANDLERS

window.requestAnimationFrame(draw);

window.setInterval(enemyRNG, respawnTime);

window.setInterval(gameLoad, 1000);

field.addEventListener('mousemove', movePlayer);

field.addEventListener('click', createHitmark);

field.addEventListener('click', gameChange);

}) ();












