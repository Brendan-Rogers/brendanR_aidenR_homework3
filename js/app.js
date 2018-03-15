// Self Executing Anonymous Function
(function(){ 

console.log("JS Initialized");

let field = document.getElementById("gameCanvas");
let box1 = field.getContext("2d");
let box2 = field.getContext("2d");
let box3 = field.getContext("2d");
let box4 = field.getContext("2d");
let box5 = field.getContext("2d");
let box6 = field.getContext("2d");

box1.rect(100,500,50,50);
box1.fillStyle = '#AA0000';
box1.fill();

box2.rect(200,100,50,50);
box2.fillStyle = '#AA0000';
box2.fill();

box3.rect(400,600,50,50);
box3.fillStyle = '#AA0000';
box3.fill();

box4.rect(700,350,50,50);
box4.fillStyle = '#AA0000';
box4.fill();

box5.rect(500,400,50,50);
box5.fillStyle = '#AA0000';
box5.fill();

box6.rect(250,200,50,50);
box6.fillStyle = '#AA0000';
box6.fill();


}) ();