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

export default pc;