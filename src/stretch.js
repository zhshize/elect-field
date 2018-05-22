var canvas;



// Point Charge
var pc = {
    dragging: false, // Is the object being dragged?
    rollover: false, // Is the mouse over the ellipse?
    x: 250,
    y: 260,
    z: 0,
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
    x: 700,
    y: 260,
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

// Field
var fb = {
    x: 300,
    y: 200,

    // width at y-axis --
    d: 150,

    // width at x-axis |
    l: 300
};

// Result
var result = [];
var isRan = false;

var fieldy = 30;
var fieldz = 0;
var charge = 5;

function getInitialVelocity() {
    var r = {
        x: vzero.x - pc.x,
        y: vzero.y - pc.y,
        z: vzero.y - pc.y
    };
    return r;
}

function getField(x, y, z, t) {
    if (x >= fb.x && x <= fb.x + fb.l && y >= fb.y && y <= fb.y + fb.d)
        return {
            x: 0,
            y: fieldy,
            z: fieldz
        };
    else
        return {x: 0, y: 0, z: 0};
}

function getCharge(x, y, z, t) {
    return charge;
}

function getElectricForce(x, y, z, t) {
    var field = getField(x, y, z, t);
    var charge = getCharge(x, y, z, t);
    return {
        x: charge * field.x,
        y: charge * field.y,
        z: charge * field.z
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
            y: pc.y,
            z: pc.z
        },
        displacement: {
            x: 0,
            y: 0,
            z: 0
        },
        velocity: {
            x: getInitialVelocity().x,
            y: getInitialVelocity().y,
            z: getInitialVelocity().z
        }
    });

    for (var i = timeFrom; i <= timeTo; i += interval) {

        var prev = result[result.length - 1];
        var pos = prev.position;
        var vel = prev.velocity;

        var electricForce = getElectricForce(pos.x, pos.y, pos.z, i);
        var acceleration = {
            x: electricForce.x/getChargeMass(i),
            y: electricForce.y/getChargeMass(i),
            z: electricForce.z/getChargeMass(i)
        };

        var displacement = {
            x: vel.x * interval + 0.5 * acceleration.x * interval*interval,
            y: vel.y * interval + 0.5 * acceleration.y * interval*interval,
            z: vel.z * interval + 0.5 * acceleration.z * interval*interval
        };

        var velocity = {
            x: vel.x + acceleration.x * interval,
            y: vel.y + acceleration.y * interval,
            z: vel.z + acceleration.z * interval
        };

        var position = {
            x: pos.x + displacement.x,
            y: pos.y + displacement.y,
            z: pos.z + displacement.z
        };

        result.push({
            position: position,
            displacement: displacement,
            velocity: velocity
        });
    }
    console.log(result);
}

function setup() {
    createCanvas(windowWidth, windowHeight);
}

function draw() {
    background(220, 180, 200);

    fill(color(66, 134, 244));
    rect(fb.x, fb.y, fb.l, 20);
    fill(color(255, 89, 89));
    rect(fb.x, fb.y + fb.d, fb.l, 20);

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