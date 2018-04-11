var canvas;
var gui;

var field = 30;

function tx(x) {
    return 200 + x;
}

function ty(y) {
    return 200 + y;
}

function setup() {
    createCanvas(windowWidth, windowHeight);

    gui = createGui('p5.gui');
    gui.addGlobals('field');
}

function draw() {
    background(220, 180, 200);

    fill(color(66, 134, 244));
    rect(400,300,300,20);
    fill(color(255, 89, 89));
    rect(400,450,300,20);

    ellipse(350, 360,10,10);

}

// dynamically adjust the canvas to the window
function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}