var canvas;
var gui;

// Point Charge
var pc = {
    dragging: false, // Is the object being dragged?
    rollover: false, // Is the mouse over the ellipse?
    x: 350,
    y: 360,
    r: 5,
    offsetX: 0,   // MouseClick offset x
    offsetY: 0,    // MouseClick offset y

    draw: function() {
        var distance = util.distance(this.centerX, this.centerY, mouseX, mouseY);
        //return (distance <= this.r);
        // Is mouse over object
        this.rollover = distance <= this.r;

        // Adjust location if being dragged
        if (this.dragging) {
            this.x = mouseX + this.offsetX;
            this.y = mouseY + this.offsetY;
        }

        stroke(0);

        fill(color(255, 255, 255));
        ellipse(this.x, this.y, 2 * this.r, 2 * this.r);
    },

    centerX: function () {
        return this.x + this.r;
    },

    centerY: function () {
        return this.y + this.r;
    },

    registerMousePressed: function () {
        var distance = util.distance(this.centerX(), this.centerY(), mouseX, mouseY);

        if (distance <= this.r + 10) {
            this.mousePressed();
        }
    },

    mousePressed: function () {
        //console.log("pc.mouseClicked");
        this.dragging = true;
        // If so, keep track of relative location of click to corner of rectangle
        this.offsetX = this.x - mouseX;
        this.offsetY = this.y - mouseY;
    },

    registerMouseReleased: function () {
        this.mouseReleased();
    },

    mouseReleased: function () {
        this.dragging = false;
    },

};

// Initial Velocity
var vzero = {
    dragging: false, // Is the object being dragged?
    rollover: false, // Is the mouse over the ellipse?
    x: 380,
    y: 360,
    r: 10,
    offsetX: 0,   // MouseClick offset x
    offsetY: 0,    // MouseClick offset y

    draw: function() {
        var distance = util.distance(this.centerX, this.centerY, mouseX, mouseY);
        //return (distance <= this.r);
        // Is mouse over object
        this.rollover = distance <= this.r;

        // Adjust location if being dragged
        if (this.dragging) {
            this.x = mouseX + this.offsetX;
            this.y = mouseY + this.offsetY;
        }

        stroke('#4a5b75');
        strokeWeight(2);
        line(this.x, this.y, pc.x, pc.y);

        fill(74, 91, 117);
        strokeWeight(0);
        ellipse(this.x, this.y, 8, 8);

        stroke('#000000');
        strokeWeight(1);
    },

    centerX: function () {
        return this.x + this.r;
    },

    centerY: function () {
        return this.y + this.r;
    },

    registerMousePressed: function () {
        var distance = util.distance(this.centerX(), this.centerY(), mouseX, mouseY);

        if (distance <= this.r + 10) {
            this.mousePressed();
        }
    },

    mousePressed: function () {
        //console.log("pc.mouseClicked");
        this.dragging = true;
        // If so, keep track of relative location of click to corner of rectangle
        this.offsetX = this.x - mouseX;
        this.offsetY = this.y - mouseY;
    },

    registerMouseReleased: function () {
        this.mouseReleased();
    },

    mouseReleased: function () {
        this.dragging = false;
    },

};

function getField(t) {
    return 10;
}

function getCharge(t) {
    return charge;
}

function getElectricForce(t) {
    return getField(t) * getCharge(t);
}

var field = 30;
var charge = 5;

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

    sliderRange(-10, 10, 0.01);
    gui.addGlobals('charge');
}

function draw() {
    background(220, 180, 200);

    fill(color(66, 134, 244));
    rect(400, 300, 300, 20);
    fill(color(255, 89, 89));
    rect(400, 450, 300, 20);

    vzero.draw();
    pc.draw();

}

// dynamically adjust the canvas to the window
function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}

function mousePressed() {
    pc.registerMousePressed();
    vzero.registerMousePressed();
}

function mouseReleased() {
    pc.registerMouseReleased();
    vzero.registerMouseReleased();
}