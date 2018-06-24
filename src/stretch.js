var canvas;

var fieldY = 3.0;
var fieldYMin = -10.0;
var fieldYMax = 10.0;
var fieldYStep = 0.1;

var fieldZ = 0.0;
var fieldZMin = -10.0;
var fieldZMax = 10.0;
var fieldZStep = 0.1;

var charge = 5;
var chargeMin = -10.0;
var chargeMax = 10.0;
var chargetep = 0.1;

var VelocityZeroMagnitude = 0.0;
var fieldZMin = -10.0;
var fieldZMax = 10.0;
var fieldZStep = 0.1;

var VelocityZeroDirection = 0.0;
var fieldZMin = -10.0;
var fieldZMax = 10.0;
var fieldZStep = 0.1;

var fieldBoardDistance = 150;
var fieldBoardDistanceMin = 0;
var fieldBoardDistanceMax = 1000;

var fieldBoardLength = 300;
var fieldBoardLengthMin = 0;
var fieldBoardLengthMax = 1000;


Object.defineProperty(window, "PixelNumber", {
    get : function() {
        return this._PixelNumber;
    },
    set: function(val) {
        //console.log("watch: PixelNumber changed");
        screen.pixelChanged = true;
        this._PixelNumber = val;
    }
});

window.PixelNumber = 18;
var PixelNumberMin = 4;
var PixelNumberMax = 72;
var PixelNumberStep = 1;

// All objects (without screen) are mounted under xa.
var xa = {
    // Point Charge
    pc: {
        dragging: false, // Is the object being dragged?
        rollover: false, // Is the mouse over the ellipse?
        x: 280,
        y: 285,
        z: 0,
        r: 5,
        offsetX: 0,   // MouseClick offset x
        offsetY: 0,    // MouseClick offset y

        draw: function () {
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

        /**
         * get charge center in x-axis.
         * @returns {number}
         */
        centerX: function () {
            return this.x + this.r;
        },

        /**
         * get charge center in y-axis.
         * @returns {number}
         */
        centerY: function () {
            return this.y + this.r;
        },

        /**
         * Register event mousePressed of pc (Point Charge).
         * @returns {number}
         */
        registerMousePressed: function () {
            var distance = util.distance(this.centerX(), this.centerY(), mouseX, mouseY);

            if (distance <= this.r + 10) {
                this.mousePressed();
            }
        },

        /**
         * mousePressed event handler of pc (Point Charge).
         * @returns {number}
         */
        mousePressed: function () {
            //console.log("pc.mouseClicked");
            this.dragging = true;
            // If so, keep track of relative location of click to corner of rectangle
            this.offsetX = this.x - mouseX;
            this.offsetY = this.y - mouseY;
            xa.run(0, 30);
        },

        /**
         * Register event mouseReleased of pc (Point Charge).
         * @returns {number}
         */
        registerMouseReleased: function () {
            this.mouseReleased();
        },

        /**
         * mouseReleased event handler of pc (Point Charge).
         * @returns {number}
         */
        mouseReleased: function () {
            this.dragging = false;
        }

    },

    // Initial Velocity, velocity control
    vzero: {
        dragging: false, // Is the object being dragged?
        rollover: false, // Is the mouse over the ellipse?
        x: 900,
        y: 285,
        r: 10,
        offsetX: 0,   // MouseClick offset x
        offsetY: 0,    // MouseClick offset y

        draw: function () {
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
            line(this.x, this.y, xa.pc.x, xa.pc.y);

            fill(74, 91, 117);
            strokeWeight(0);
            ellipse(this.x, this.y, 8, 8);

            stroke('#000000');
            strokeWeight(1);
        },

        /**
         * get velocity control center in x-axis.
         * @returns {number}
         */
        centerX: function () {
            return this.x + this.r;
        },

        /**
         * get velocity control center in y-axis.
         * @returns {number}
         */
        centerY: function () {
            return this.y + this.r;
        },

        /**
         * Register event mousePressed of velocity control.
         * @returns {number}
         */
        registerMousePressed: function () {
            var distance = util.distance(this.centerX(), this.centerY(), mouseX, mouseY);

            if (distance <= this.r + 10) {
                this.mousePressed();
            }
        },

        /**
         * mousePressed event handler of velocity control.
         * @returns {number}
         */
        mousePressed: function () {
            //console.log("pc.mouseClicked");
            this.dragging = true;
            // If so, keep track of relative location of click to corner of rectangle
            this.offsetX = this.x - mouseX;
            this.offsetY = this.y - mouseY;
        },

        /**
         * Register event mouseReleased of velocity control.
         * @returns {number}
         */
        registerMouseReleased: function () {
            this.mouseReleased();
        },

        /**
         * mouseReleased event handler of velocity control.
         * @returns {number}
         */
        mouseReleased: function () {
            this.dragging = false;
            xa.run(0, 30);
        }

    },

    // Field Boards
    fb: {
        x: 300,
        y: 200,

        // width at y-axis "--"
        d: fieldBoardDistance,

        // width at x-axis "|"
        l: fieldBoardLength,

        /**
         * get distance of two board
         * @returns {number}
         */
        getD: function() {
            return fieldBoardDistance;
        },

        /**
         * get length of two board
         * @returns {number}
         */
        getL: function() {
            return fieldBoardLength;
        },

        /**
         * get position of board 1
         * @returns {{x: *, y: *}}
         */
        getBoard1Position: function() {
            return {
                x: this.x,
                y: this.y
            };
        },

        /**
         * get position of board 2
         * @returns {{x: *, y: *}}
         */
        getBoard2Position: function() {
            return {
                x: this.x,
                y: this.y + this.getD()
            };
        },

        draw: function () {
            fill(color(66, 134, 244));
            rect(this.x, this.y - 20, this.getL(), 20);
            fill(color(255, 89, 89));
            rect(this.x, this.y + this.getD(), this.getL(), 20);
        }
    },

    /** @var Array the locus points of running charge */
    result: [],

    isRan: false,

    //fieldy: 30,
    //fieldz: 0,

    getInitialVelocity: function () {
        var r = {
            x: xa.vzero.x - xa.pc.x,
            y: xa.vzero.y - xa.pc.y,
            z: xa.vzero.y - xa.pc.y
        };
        return r;
    },

    getField: function (x, y, z, t) {
        if (x >= xa.fb.x && x <= xa.fb.x + xa.fb.getL() && y >= xa.fb.y && y <= xa.fb.y + xa.fb.getD())
            return {
                x: 0,
                y: fieldY,
                z: fieldZ
            };
        else
            return {x: 0, y: 0, z: 0};
    },

    getCharge: function (x, y, z, t) {
        return charge;
    },

    getElectricForce: function (x, y, z, t) {
        var field = this.getField(x, y, z, t);
        var charge = this.getCharge(x, y, z, t);
        return {
            x: charge * field.x,
            y: charge * field.y,
            z: charge * field.z
        };
    },

    getInterval: function (t) {
        return 0.01;
    },

    getChargeMass: function (t) {
        return 0.1;
    },

    /**
     * Calculate the locus of point charge and push to result.
     * @param timeFrom
     * @param timeTo
     */
    run: function (timeFrom, timeTo) {
        this.isRan = true;

        this.result = [];

        var interval = this.getInterval(-1);

        this.result.push({
            position: {
                x: xa.pc.x,
                y: xa.pc.y,
                z: xa.pc.z
            },
            displacement: {
                x: 0,
                y: 0,
                z: 0
            },
            velocity: {
                x: this.getInitialVelocity().x,
                y: this.getInitialVelocity().y,
                z: this.getInitialVelocity().z
            }
        });

        for (var i = timeFrom; i <= timeTo; i += interval) {

            var prev = this.result[this.result.length - 1];
            var pos = prev.position;
            var vel = prev.velocity;

            var electricForce = this.getElectricForce(pos.x, pos.y, pos.z, i);
            var acceleration = {
                x: electricForce.x / this.getChargeMass(i),
                y: electricForce.y / this.getChargeMass(i),
                z: electricForce.z / this.getChargeMass(i)
            };

            var displacement = {
                x: vel.x * interval + 0.5 * acceleration.x * interval * interval,
                y: vel.y * interval + 0.5 * acceleration.y * interval * interval,
                z: vel.z * interval + 0.5 * acceleration.z * interval * interval
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

            var now = {
                position: position,
                displacement: displacement,
                velocity: velocity
            };

            this.result.push(now);

            if (prev.position.x <= screen.d && now.position.x >= screen.d) {
                screen.light(prev, now);
            }

            var b1p = xa.fb.getBoard1Position();
            var b2p = xa.fb.getBoard2Position();
            var pp = prev.position;
            var np = now.position;

            if (util.isIntersect(b1p.x, b1p.y, b1p.x + xa.fb.getL(), b1p.y, pp.x, pp.y, np.x,np.y) ||
                util.isIntersect(b2p.x, b2p.y, b2p.x + xa.fb.getL(), b2p.y, pp.x, pp.y, np.x,np.y)) {
                break;
            }

        }
        //console.log(this.result);
    }

};

// Screen
var screen = {

    /**
     * store pixel data (binary)
     * @var Array
     */
    pixel: [],

    pixelChanged: false,

    visible: true,

    init: function() {
        this.pixel = [];
        var pixelNumY = this.pixelNumY();
        var pixelNumZ = this.pixelNumZ();
        for (var i = 0; i <= pixelNumY; i++) {
            this.pixel[i] = [];
            for (var j = 0; j <= pixelNumZ; j++)
                this.pixel[i][j] = 0;
        }
    },

    clear: function() {
        this.init();
    },

    toggle: function() {
        this.visible = !this.visible;
    },

    d: 1200,
    startX: this.d,
    startY: 95,
    startZ: -190,

    pixelNumZ: function () {
        return PixelNumber;
    },

    pixelNumY: function () {
        return PixelNumber;
    },

    pixelWidth: function () {
        return 380.0 / (PixelNumber + 1);
    },

    draw: function () {

        try {
            if (this.pixelChanged) {
                //console.log("pixelChanged");
                this.init();
                this.pixelChanged = false;
            }

            var pixelNumY = this.pixelNumY();
            var pixelNumZ = this.pixelNumZ();
            var pixelWidth = this.pixelWidth();

            if (this.visible === false) return;
            fill(color(0, 0, 0, 120));
            strokeWeight(1);
            stroke(200, 200, 200);
            for (var i = 0; i <= pixelNumY; i++) {
                for (var j = 0; j <= pixelNumZ; j++) {
                    if (this.pixel[j][i] === 1) {
                        fill(color(255, 255, 255));
                    }
                    rect(1000 + pixelWidth * i, 95 + pixelWidth * j, pixelWidth, pixelWidth);
                    fill(color(0, 0, 0, 120));
                }
            }
        } catch (e) {

        }

    },
    
    light: function (prev, next) {
        var pixelNumY = this.pixelNumY();
        var pixelNumZ = this.pixelNumZ();
        var pixelWidth = this.pixelWidth();
        var mul = (this.d - prev.position.x)/(next.position.x - prev.position.x);
        var p = {
            x: screen.d,
            y: prev.position.y + (next.position.y - prev.position.y) * mul,
            z: prev.position.z + (next.position.z - prev.position.z) * mul
        };
        var ypix = int((p.y - this.startY) / pixelWidth);
        var zpix = int((p.z - this.startZ) / pixelWidth);

        if (ypix > pixelNumY || ypix < 0 || zpix > pixelNumZ || zpix < 0) {

        } else {
            this.pixel[ypix][zpix] = 1;
        }
        //console.log(ypix + "," + zpix);
    },

    _fieldPairs: [],
    _fieldPairsIterator: 0,
    _fieldPairsNext: function() {
        if (this._fieldPairsIterator === 0) this.clear();
        return this._fieldPairs[this._fieldPairsIterator++];
    },

    paintFromFieldPairs: function (fieldPairs) {
        this._fieldPairs = fieldPairs;
        this._fieldPairsIterator = 0;

        for (var i = 0; i < fieldPairs.length; i++)

            setTimeout(function () {
                var fpi = screen._fieldPairsNext();
                //console.log(fpi);
                fieldY = fpi[0];
                fieldZ = fpi[1];
                xa.run(0, 30);
                draw();
            }, 100 * i);
    }
};

function setup() {
    screen.init();
    createCanvas(windowWidth, windowHeight);
    var gui = createGui('Label');
    gui.addGlobals('fieldY', 'fieldZ', 'charge', 'fieldBoardDistance', 'fieldBoardLength', 'PixelNumber');
}

function draw() {
    background(187, 234, 222);
    strokeWeight(0);

    xa.fb.draw();
    xa.vzero.draw();
    xa.pc.draw();

    if (xa.isRan) {
        for (var i = 0; i < xa.result.length; i++) {
            var r = xa.result[i];
            if (!(r.position.x < document.body.clientWidth && r.position.y < document.body.clientHeight)) break;
            fill(color(0, 0, 0));
            strokeWeight(0);
            ellipse(r.position.x, r.position.y, 3, 3);
        }
    }

    screen.draw();
}

// dynamically adjust the canvas to the window
function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}

function mousePressed() {
    xa.pc.registerMousePressed();
    xa.vzero.registerMousePressed();
}

function touchStarted() {
    mousePressed();
}

function mouseReleased() {
    xa.pc.registerMouseReleased();
    xa.vzero.registerMouseReleased();
}

function touchEnded() {
    mouseReleased();
}

function sinGraph() {
    var fieldPair = [];
    for (var i = -0.6; i <= 0.6; i += 0.005) {
        fieldPair.push([Math.sin(i*10.0) * 5.0, i * 10.0]);
    }
    screen.paintFromFieldPairs(fieldPair);
}

function customGraph() {
    eval($('#customGraphText').val());
}

