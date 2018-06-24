// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles

// eslint-disable-next-line no-global-assign
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;

  for (var i = 0; i < entry.length; i++) {
    newRequire(entry[i]);
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  return newRequire;
})({11:[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
// Point Charge
var pc = {
    dragging: false, // Is the object being dragged?
    rollover: false, // Is the mouse over the ellipse?
    x: 350,
    y: 360,
    r: 5,
    offsetX: 0, // MouseClick offset x
    offsetY: 0, // MouseClick offset y

    draw: function draw() {
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

    centerX: function centerX() {
        return this.x + this.r;
    },

    centerY: function centerY() {
        return this.y + this.r;
    },

    registerMousePressed: function registerMousePressed() {
        var distance = util.distance(this.centerX(), this.centerY(), mouseX, mouseY);

        if (distance <= this.r + 10) {
            this.mousePressed();
        }
    },

    mousePressed: function mousePressed() {
        //console.log("pc.mouseClicked");
        this.dragging = true;
        // If so, keep track of relative location of click to corner of rectangle
        this.offsetX = this.x - mouseX;
        this.offsetY = this.y - mouseY;
        run(0, 30);
    },

    registerMouseReleased: function registerMouseReleased() {
        this.mouseReleased();
    },

    mouseReleased: function mouseReleased() {
        this.dragging = false;
    }

};

exports.default = pc;
},{}],9:[function(require,module,exports) {
'use strict';

var _pc = require('./js/pc.js');

var _pc2 = _interopRequireDefault(_pc);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var canvas;
var gui;

// Initial Velocity
var vzero = {
    dragging: false, // Is the object being dragged?
    rollover: false, // Is the mouse over the ellipse?
    x: 380,
    y: 360,
    r: 10,
    offsetX: 0, // MouseClick offset x
    offsetY: 0, // MouseClick offset y

    draw: function draw() {
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
        line(this.x, this.y, _pc2.default.x, _pc2.default.y);

        fill(74, 91, 117);
        strokeWeight(0);
        ellipse(this.x, this.y, 8, 8);

        stroke('#000000');
        strokeWeight(1);
    },

    centerX: function centerX() {
        return this.x + this.r;
    },

    centerY: function centerY() {
        return this.y + this.r;
    },

    registerMousePressed: function registerMousePressed() {
        var distance = util.distance(this.centerX(), this.centerY(), mouseX, mouseY);

        if (distance <= this.r + 10) {
            this.mousePressed();
        }
    },

    mousePressed: function mousePressed() {
        //console.log("pc.mouseClicked");
        this.dragging = true;
        // If so, keep track of relative location of click to corner of rectangle
        this.offsetX = this.x - mouseX;
        this.offsetY = this.y - mouseY;
    },

    registerMouseReleased: function registerMouseReleased() {
        this.mouseReleased();
    },

    mouseReleased: function mouseReleased() {
        this.dragging = false;
        run(0, 30);
    }

};

// Result
var result = [];
var isRan = false;

function getInitialVelocity() {
    var r = {
        x: vzero.x - _pc2.default.x,
        y: vzero.y - _pc2.default.y
    };
    return r;
}

function getField(t) {
    return {
        x: 0,
        y: field
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

function isInField(x, y) {}

function getChargeMass(t) {
    return 0.1;
}

function run(timeFrom, timeTo) {
    isRan = true;

    result = [];

    var interval = getInterval(-1);

    result.push({
        position: {
            x: _pc2.default.x,
            y: _pc2.default.y
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
            x: getElectricForce(i).x / getChargeMass(i),
            y: getElectricForce(i).y / getChargeMass(i)
        };

        var displacement = {
            x: prev.velocity.x * interval + 0.5 * acceleration.x * interval * interval,
            y: prev.velocity.y * interval + 0.5 * acceleration.y * interval * interval
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
    _pc2.default.draw();

    if (isRan) for (var i = 0; i < 300; i++) {
        if (!(result[i].position.x < document.body.clientWidth && result[i].position.y < document.body.clientHeight)) return;
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
    _pc2.default.registerMousePressed();
    vzero.registerMousePressed();
}

function touchStarted() {
    mousePressed();
}

function mouseReleased() {
    _pc2.default.registerMouseReleased();
    vzero.registerMouseReleased();
}

function touchEnded() {
    mouseReleased();
}
},{"./js/pc.js":11}],17:[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';

var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };

  module.bundle.hotData = null;
}

module.bundle.Module = Module;

var parent = module.bundle.parent;
if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = '' || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + '38277' + '/');
  ws.onmessage = function (event) {
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      data.assets.forEach(function (asset) {
        hmrApply(global.parcelRequire, asset);
      });

      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          hmrAccept(global.parcelRequire, asset.id);
        }
      });
      // Clear the console after HMR
      console.clear();
    }

    if (data.type === 'reload') {
      ws.close();
      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');

      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);

      removeErrorOverlay();

      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);
  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID;

  // html encode message and stack trace
  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;

  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';

  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;
  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];
      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(+k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;
  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAccept(bundle, id) {
  var modules = bundle.modules;
  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAccept(bundle.parent, id);
  }

  var cached = bundle.cache[id];
  bundle.hotData = {};
  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);

  cached = bundle.cache[id];
  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAccept(global.parcelRequire, id);
  });
}
},{}]},{},[17,9], null)
//# sourceMappingURL=stretch.5394c6b4.map