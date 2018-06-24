var util = {
    distance: function (x1, y1, x2, y2) {
        return Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2));
    },

    /**
     * Algorithm for checking whether two line segments intersect.
     *
     * Source code from:  https://gist.github.com/lengstrom/8499382
     * @param x1
     * @param y1
     * @param x2
     * @param y2
     * @param x3
     * @param y3
     * @param x4
     * @param y4
     * @returns {boolean} whether two line segments are intersect.
     */
    isIntersect: function (x1, y1, x2, y2, x3, y3, x4, y4) {
        var a1, a2, b1, b2, c1, c2;
        var r1, r2, r3, r4;
        var denom, offset, num;
        var sameSign = function (a, b) {
            return (a * b) > 0
        };

        // Compute a1, b1, c1, where line joining points 1 and 2
        // is "a1 x + b1 y + c1 = 0".
        a1 = y2 - y1;
        b1 = x1 - x2;
        c1 = (x2 * y1) - (x1 * y2);

        // Compute r3 and r4.
        r3 = ((a1 * x3) + (b1 * y3) + c1);
        r4 = ((a1 * x4) + (b1 * y4) + c1);

        // Check signs of r3 and r4. If both point 3 and point 4 lie on
        // same side of line 1, the line segments do not intersect.
        if ((r3 !== 0) && (r4 !== 0) && sameSign(r3, r4)) {
            return false; //return that they do not intersect
        }

        // Compute a2, b2, c2
        a2 = y4 - y3;
        b2 = x3 - x4;
        c2 = (x4 * y3) - (x3 * y4);

        // Compute r1 and r2
        r1 = (a2 * x1) + (b2 * y1) + c2;
        r2 = (a2 * x2) + (b2 * y2) + c2;

        // Check signs of r1 and r2. If both point 1 and point 2 lie
        // on same side of second line segment, the line segments do
        // not intersect.
        if ((r1 !== 0) && (r2 !== 0) && (sameSign(r1, r2))) {
            return false; //return that they do not intersect
        }

        //Line segments intersect: compute intersection point.
        denom = (a1 * b2) - (a2 * b1);

        if (denom === 0) {
            return true; //collinear
        }

        // lines_intersect
        return true; //lines intersect, return true
    }
};