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
})({7:[function(require,module,exports) {
var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

//

(function () {

  // list of guis
  var guis = [];

  // default slider params
  var sliderMin = 0;
  var sliderMax = 100;
  var sliderStep = 1;

  // default gui provider
  var guiProvider = 'QuickSettings';

  // Create a GUI using QuickSettings (or DAT.GUI or ...)
  p5.prototype.createGui = function (label, x, y, provider) {

    label = label || 'GUI';
    x = x || 20;
    y = y || 20;
    provider = provider || guiProvider;

    var gui;

    // create a gui using the provider
    if (provider === 'QuickSettings') {
      if (QuickSettings) {
        console.log('Creating p5.gui powered by QuickSettings.');
        gui = new QSGui(label, x, y);
      } else {
        console.log('QuickSettings not found. Is the script included in your HTML?');
        gui = new DummyGui(label, x, y);
      }
    } else {
      console.log('Unknown GUI provider ' + provider);
      gui = new DummyGui(label, x, y);
    }

    // add it to the list of guis
    guis.push(gui);

    // return it
    return gui;
  };

  p5.prototype.removeGui = function (gui) {
    // TODO: implement this
  };

  // update defaults used for creation of sliders
  p5.prototype.sliderRange = function (vmin, vmax, vstep) {
    sliderMin = vmin;
    sliderMax = vmax;
    sliderStep = vstep;
  };

  // extend default behaviour of noLoop()
  p5.prototype.noLoop = function () {
    this._loop = false;
    for (var i = 0; i < guis.length; i++) {
      guis[i].noLoop();
    }
  };

  // extend default behaviour of loop()
  p5.prototype.loop = function () {
    for (var i = 0; i < guis.length; i++) {
      guis[i].loop();
    }
    this._loop = true;
    this._draw();
  };

  // interface for quicksettings
  function QSGui(label, x, y) {

    var qs = QuickSettings.create(x, y, label);
    this.prototype = qs;

    // addGlobals(global1, global2, ...) to add the selected globals
    this.addGlobals = function () {
      qs.bindGlobals(arguments);
    };

    // addObject(object) to add all params of the object
    // addObject(object, param1, param2, ...) to add selected params
    this.addObject = function () {
      // get object
      object = arguments[0];
      // convert arguments object to array
      var params = [];
      if (arguments.length > 1) {
        params = Array.prototype.slice.call(arguments);
        params = params.slice(1);
      }
      // if no arguments are provided take all keys of the object
      if (params.length === 0) {
        params = object.keys();
      }
      qs.bindParams(object, params);
    };

    // noLoop() to call draw every time the gui changes when we are not looping
    this.noLoop = function () {
      qs.setGlobalChangeHandler(draw);
    };

    this.loop = function () {
      qs.setGlobalChangeHandler(null);
    };

    this.show = function () {
      qs.show();
    };
    this.hide = function () {
      qs.hide();
    };
    this.toggleVisibility = function () {
      qs.toggleVisibility();
    };
  }

  // Just a Dummy object that provides the GUI interface
  function DummyGui() {
    var f = function f() {};
    this.addGlobals = f;
    this.noLoop = f;
    this.addObject = f;
    this.show = f;
  }

  // Extend Quicksettings
  // so it can magically create a GUI for parameters passed by name
  QuickSettings.bindParams = function (object, params) {

    // iterate over all the arguments
    for (var i = 0; i < params.length; i++) {

      var arg = params[i];
      var val = object[arg];
      var typ = typeof val === 'undefined' ? 'undefined' : _typeof(val);

      // console.log(typ, arg, val);

      switch (typ) {

        case 'object':

          // color triple ?
          if (val instanceof Array && val.length === 3 && typeof val[0] === 'number') {
            // create color according to the current color mode
            var c = color(val[0], val[1], val[2]);
            // get decimal RGB values
            var c2 = c.levels.slice(0, 3);
            // create HTML color code
            var vcolor = '#' + c2.map(function (value) {
              return ('0' + value.toString(16)).slice(-2);
            }).join('');
            this.bindColor(arg, vcolor, object);
          } else {
            // multiple choice drop down list
            this.bindDropDown(arg, val, object);
            object[arg] = val[0];
          }
          break;

        case 'number':

          // values as defined by magic variables or gui.sliderRange()
          var vmin = object[arg + 'Min'] || object[arg + 'min'] || sliderMin;
          var vmax = object[arg + 'Max'] || object[arg + 'max'] || sliderMax;
          var vstep = object[arg + 'Step'] || object[arg + 'step'] || sliderStep;

          // the actual values can still overrule the limits set by magic
          var vmin = min(val, vmin);
          var vmax = max(val, vmax);

          // set the range
          this.bindRange(arg, vmin, vmax, val, vstep, object);

          break;

        case 'string':

          var HEX6 = /^#([a-f0-9]{2})([a-f0-9]{2})([a-f0-9]{2})$/i;
          if (HEX6.test(val)) {
            // HTML color value (such as #ff0000)
            this.bindColor(arg, val, object);
          } else {
            // String value
            this.bindText(arg, val, object);
          }
          break;

        case 'boolean':

          this.bindBoolean(arg, object[arg], object);
          break;

      }
    }
  };

  // bind params that are defined globally
  QuickSettings.bindGlobals = function (params) {
    this.bindParams(window, params);
  };
})();
},{}],17:[function(require,module,exports) {
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
},{}]},{},[17,7], null)
//# sourceMappingURL=p5.gui.60a7a9ab.map