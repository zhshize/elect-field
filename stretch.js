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
        run(0,30);
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
        run(0,30);
    },

};

// Result
var result = [];
var isRan = false;

function getInitialVelocity() {
    var r = {
        x: vzero.x - pc.x,
        y: vzero.y - pc.y
    };
    return r;
}

function getField(t) {
    return {
        x: 0, 
        y: 3
    };
}

function getCharge(t) {
    return charge;
}

function getElectricForce(t) {
    var field = getField(t);
    var charge = getCharge(t);
    return {
        x: charge * field.x,
        y: charge * field.y
    };
}

function getInterval(t) {
    return 0.01;
}

function isInField(x, y) {

}

function getChargeMass(t) {
    return 0.1;
}

function run(timeFrom, timeTo) {
    isRan = true;

    result = [];

    var interval = getInterval(-1);

    result.push({
        position: {
            x: pc.x,
            y: pc.y
        },
        displacement: {
            x: 0,
            y: 0
        },
        velocity: {
            x: getInitialVelocity().x,
            y: getInitialVelocity().y
        }
    });

    for (var i = timeFrom; i <= timeTo; i += interval) {

        var prev = result[result.length - 1];

        var acceleration = {
            x: getElectricForce(i).x/getChargeMass(i),
            y: getElectricForce(i).y/getChargeMass(i)
        };

        var displacement = {
            x: prev.velocity.x * interval + 0.5 * acceleration.x * interval*interval,
            y: prev.velocity.y * interval + 0.5 * acceleration.y * interval*interval
        };

        var velocity = {
            x: prev.velocity.x + acceleration.x * interval,
            y: prev.velocity.y + acceleration.y * interval
        };

        var position = {
            x: prev.position.x + displacement.x,
            y: prev.position.y + displacement.y
        };

        result.push({
            position: position,
            displacement: displacement,
            velocity: velocity
        });
    }
    console.log(result);
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

    if (isRan)
        for (var i = 0; i < 300; i++) {
            if ( !(result[i].position.x < document.body.clientWidth && result[i].position.y < document.body.clientHeight)) return;
            fill(color(0, 0, 0));
            strokeWeight(0);
            ellipse(result[i].position.x, result[i].position.y, 3, 3);
        }
}

// dynamically adjust the canvas to the window
function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}

function mousePressed() {
    pc.registerMousePressed();
    vzero.registerMousePressed();
}

function touchStarted() {
    mousePressed();
}

function mouseReleased() {
    pc.registerMouseReleased();
    vzero.registerMouseReleased();
}

function touchEnded() {
    mouseReleased();
}