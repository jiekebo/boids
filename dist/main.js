/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/controller/Simulation.js":
/*!**************************************!*\
  !*** ./src/controller/Simulation.js ***!
  \**************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _view_Animation__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../view/Animation */ \"./src/view/Animation.js\");\n/* harmony import */ var _model_Vector2D__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../model/Vector2D */ \"./src/model/Vector2D.js\");\n/* harmony import */ var _model_Boid__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../model/Boid */ \"./src/model/Boid.js\");\n\n\n\n\nfunction Simulation(scene, boids, width, height, fps, boidRange, centerDivision, distanceRepulsion, velocityDivision, edgeRepulsionVelocity) {\n  this.scene = scene;\n  this.boids = boids\n  this.width = width;\n  this.height = height;\n  this.fps = fps;\n  this.boidRange = boidRange;\n  this.centerDivision = centerDivision;\n  this.distanceRepulsion = distanceRepulsion;\n  this.velocityDivision = velocityDivision;\n  this.edgeRepulsionVelocity = edgeRepulsionVelocity;\n}\n\nSimulation.prototype = {\n  constructor: Simulation,\n\n  init: function() {\n    for (var i = 0; i < this.boids; i++) {\n      this.addBoid();\n    }\n    var anim = new _view_Animation__WEBPACK_IMPORTED_MODULE_0__[\"default\"](this.fps, this.scene);\n    anim.start();\n  },\n\n  addBoid: function() {\n    var x = Math.floor((Math.random() * this.width) + 1);\n    var y = Math.floor((Math.random() * this.height) + 1);\n    var velx = Math.floor((Math.random() * 10) + 1) - 5;\n    var vely = Math.floor((Math.random() * 10) + 1) - 5;\n    this.scene.addElement(new _model_Boid__WEBPACK_IMPORTED_MODULE_2__[\"default\"](new _model_Vector2D__WEBPACK_IMPORTED_MODULE_1__[\"default\"](x, y), new _model_Vector2D__WEBPACK_IMPORTED_MODULE_1__[\"default\"](velx, vely), 3, \"#FFFF00\", this.boidRange, this.centerDivision, this.distanceRepulsion, this.velocityDivision, this.edgeRepulsionVelocity, this.width, this.height));\n  },\n\n  removeBoid: function() {\n    this.scene.removeElement();\n  }\n}\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (Simulation);\n\n\n//# sourceURL=webpack:///./src/controller/Simulation.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _view_Scene__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./view/Scene */ \"./src/view/Scene.js\");\n/* harmony import */ var _model_Quadtree__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./model/Quadtree */ \"./src/model/Quadtree.js\");\n/* harmony import */ var _controller_Simulation__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./controller/Simulation */ \"./src/controller/Simulation.js\");\n\n\n\n\nvar config = {\n  fps: 120,\n  boids: 100,\n  boidRange: 2,\n  centerDivision: 200,\n  distanceRepulsion: 10,\n  velocityDivision: 8,\n  edgeRepulsionVelocity: 2,\n  quadtreeNodeCapacity: 4,\n  quadtreeMaxLevel: 10,\n  debug: true\n}\n\nvar canvas = document.getElementById(\"playground\");\nconfig.width = canvas.width;\nconfig.height = canvas.height;\n\nvar quadtree = new _model_Quadtree__WEBPACK_IMPORTED_MODULE_1__[\"default\"]({x:config.width/2, y:config.height/2}, Math.max(config.width, config.height)/2, 0, config.quadtreeNodeCapacity, config.quadtreeMaxLevel);\nvar scene = new _view_Scene__WEBPACK_IMPORTED_MODULE_0__[\"default\"](canvas, quadtree, config.debug, config.width, config.height, config.quadtreeNodeCapacity, config.quadtreeMaxLevel);\nvar simulation = new _controller_Simulation__WEBPACK_IMPORTED_MODULE_2__[\"default\"](scene, config.boids, config.width, config.height, config.fps, config.boidRange, config.centerDivision, config.distanceRepulsion, config.velocityDivision, config.edgeRepulsionVelocity);\n\nsimulation.init();\n\n/*\nvar boidCount = document.getElementById(\"boidCount\");\nboidCount.innerHTML = scene.getElements().length;\n\nvar addButton = document.getElementById(\"add\");\naddButton.onclick = function() {\n  simulation.addBoid();\n  boidCount.innerHTML = scene.getElements().length;\n};\n\nvar removeButton = document.getElementById(\"remove\");\nremoveButton.onclick = function() {\n  simulation.removeBoid();\n  boidCount.innerHTML = scene.getElements().length;\n};*/\n\n//# sourceURL=webpack:///./src/index.js?");

/***/ }),

/***/ "./src/model/Boid.js":
/*!***************************!*\
  !*** ./src/model/Boid.js ***!
  \***************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _Vector2D__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Vector2D */ \"./src/model/Vector2D.js\");\n\n\nfunction Boid(position, velocity, radius, color, boidRange, centerDivision, distanceRepulsion, velocityDivision, edgeRepulsionVelocity, width, height) {\n  this.position = position;\n  this.velocity = velocity;\n  this.radius = radius;\n  this.color = color;\n  this.boidRange = boidRange;\n  this.centerDivision = centerDivision;\n  this.distanceRepulsion = distanceRepulsion;\n  this.velocityDivision = velocityDivision;\n  this.edgeRepulsionVelocity = edgeRepulsionVelocity;\n  this.width = width;\n  this.height = height;\n}\n\nBoid.prototype = {\n  constructor: Boid,\n  \n  draw: function(ctx) {\n\n    ctx.beginPath();\n    ctx.arc(this.position.x, this.position.y, this.radius, 0, 2 * Math.PI, false);\n    ctx.fillStyle = this.color;\n    ctx.fill();\n  },\n\n  update: function(scene) {\n    var neighbourBoids = scene.quadtree.queryRange({\n      center:{\n        x:this.position.x, \n        y:this.position.y\n      }, \n      halfDimension: this.boidRange}\n    );\n\n    var v1 = this._cohesion_rule(neighbourBoids);\n    var v2 = this._avoidance_rule(neighbourBoids);\n    var v3 = this._alignment_rule(neighbourBoids);\n    var v4 = this._boundary_rule();\n\n    this.velocity = this.velocity.add(v1).add(v2).add(v3).add(v4);\n    this.position = this.position.add(this.velocity);\n  },\n\n  // Try to fly towards the centre of mass of neighbouring boids.\n  _cohesion_rule: function(boids) {\n    var aggregator = new _Vector2D__WEBPACK_IMPORTED_MODULE_0__[\"default\"](0, 0);\n    if(boids.length <= 1) {\n      return aggregator;\n    }\n    boids.forEach(function(boid) {\n      if(boid === this) {\n        return;\n      }\n      aggregator = aggregator.add(boid.position);\n    }.bind(this));\n    var perceivedCenter = aggregator.divide(boids.length - 1);\n    return perceivedCenter.sub(this.position).divide(this.centerDivision);\n  },\n\n  // Try to keep a small distance away from other objects (including other boids).\n  _avoidance_rule: function(boids) {\n    var repulsor = new _Vector2D__WEBPACK_IMPORTED_MODULE_0__[\"default\"](0, 0);\n    if(boids.length <= 1) {\n      return repulsor;\n    }\n    boids.forEach(function(boid) {\n      if(boid === this) {\n        return;\n      }\n      if(boid.position.sub(this.position).length() < this.distanceRepulsion) {\n        repulsor = repulsor.sub(boid.position.sub(this.position));\n      }\n    }.bind(this));\n    return repulsor;\n  },\n\n  // Try to match velocity with near boids.\n  _alignment_rule: function(boids) {\n    var aggregator = new _Vector2D__WEBPACK_IMPORTED_MODULE_0__[\"default\"](0, 0);\n    if(boids.length <= 1) {\n      return aggregator;\n    }\n    boids.forEach(function(boid) {\n      if(boid === this) {\n        return;\n      }\n      aggregator = aggregator.add(boid.velocity);\n    }.bind(this));\n    var perceivedVelocity = aggregator.divide(boids.length - 1);\n    return perceivedVelocity.sub(this.velocity).divide(this.velocityDivision);\n  },\n\n  // Try to keep the boids within the confines of the playground.\n  _boundary_rule: function() {\n    var velocity = new _Vector2D__WEBPACK_IMPORTED_MODULE_0__[\"default\"](0, 0);\n    if(this.position.x < 0) {\n      velocity.x = this.edgeRepulsionVelocity;\n    }\n    if(this.position.x > this.width) {\n      velocity.x = ~ this.edgeRepulsionVelocity;\n    }\n    if(this.position.y < 0) {\n      velocity.y = this.edgeRepulsionVelocity;\n    }\n    if(this.position.y > this.height) {\n      velocity.y = ~ this.edgeRepulsionVelocity;\n    }\n    return velocity;\n  }\n}\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (Boid);\n\n\n//# sourceURL=webpack:///./src/model/Boid.js?");

/***/ }),

/***/ "./src/model/Boundary.js":
/*!*******************************!*\
  !*** ./src/model/Boundary.js ***!
  \*******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\nfunction Boundary(center, halfDimension) {\n  this.center = center;\n  this.halfDimension = halfDimension;\n}\n\nBoundary.prototype = {\n  constructor: Boundary,\n\n  containsPoint: function(point) {\n    if(point.x > this.center.x + this.halfDimension) {\n      return false;\n    }\n    if(point.x < this.center.x - this.halfDimension) {\n      return false;\n    }\n    if(point.y > this.center.y + this.halfDimension) {\n      return false;\n    }\n    if(point.y < this.center.y - this.halfDimension) {\n      return false;\n    }\n    return true;\n  },\n\n  intersectsBoundary: function(boundary) {\n    if(boundary.center.x - boundary.halfDimension > this.center.x + this.halfDimension) {\n      return false;\n    }\n    if(boundary.center.x + boundary.halfDimension < this.center.x - this.halfDimension) {\n      return false;\n    }\n    if(boundary.center.y - boundary.halfDimension > this.center.y + this.halfDimension) {\n      return false;\n    }\n    if(boundary.center.y + boundary.halfDimension < this.center.y - this.halfDimension) {\n      return false;\n    }\n    return true;\n  }\n}\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (Boundary);\n\n//# sourceURL=webpack:///./src/model/Boundary.js?");

/***/ }),

/***/ "./src/model/Quadtree.js":
/*!*******************************!*\
  !*** ./src/model/Quadtree.js ***!
  \*******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _Square__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Square */ \"./src/model/Square.js\");\n/* harmony import */ var _Boundary__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Boundary */ \"./src/model/Boundary.js\");\n\n\n\nfunction Quadtree(center, halfDimension, level, capacity, maxLevel) {\n  this.boundary = new _Boundary__WEBPACK_IMPORTED_MODULE_1__[\"default\"](center, halfDimension);\n  this.boids = [];\n  this.level = level;\n  this.capacity = capacity;\n  this.maxLevel = maxLevel;\n}\n\nQuadtree.prototype = {\n  constructor: Quadtree,\n  boundary: null,\n  nw: null,\n  ne: null,\n  sw: null,\n  se: null,\n\n  insert: function(boid) {\n    if(!this.boundary.containsPoint(boid.position)) {\n      return false;\n    }\n\n    if(this.level > this.maxLevel || this.boids.length < this.capacity && this.nw == null) {\n      this.boids.push(boid);\n      return true;\n    }\n\n    if(this.nw == null) {\n      this.subdivide();\n    }\n    \n    if(this.nw.insert(boid)) {\n      return true;\n    }\n    if(this.ne.insert(boid)) {\n      return true;\n    }\n    if(this.sw.insert(boid)) {\n      return true;\n    }\n    if(this.se.insert(boid)) {\n      return true;\n    }\n\n    return false;\n  },\n\n  subdivide: function() {\n    var subDivDimension = this.boundary.halfDimension / 2;\n    \n    var nwcenter = {x : this.boundary.center.x - subDivDimension, y : this.boundary.center.y - subDivDimension};\n    var necenter = {x : this.boundary.center.x + subDivDimension, y : this.boundary.center.y - subDivDimension};\n    var swcenter = {x : this.boundary.center.x - subDivDimension, y : this.boundary.center.y + subDivDimension};\n    var secenter = {x : this.boundary.center.x + subDivDimension, y : this.boundary.center.y + subDivDimension};\n\n    var level = this.level+1;\n    \n    this.nw = new Quadtree(nwcenter, subDivDimension, level, this.capacity, this.maxLevel);\n    this.ne = new Quadtree(necenter, subDivDimension, level, this.capacity, this.maxLevel);\n    this.sw = new Quadtree(swcenter, subDivDimension, level, this.capacity, this.maxLevel);\n    this.se = new Quadtree(secenter, subDivDimension, level, this.capacity, this.maxLevel);\n\n    while(this.boids.length > 0) {\n      var boid = this.boids.pop();\n      this.insert(boid);\n    }\n  },\n\n  queryRange: function(range) {\n    var boidsInRange = [];\n\n    if(!this.boundary.intersectsBoundary(range)) {\n      return boidsInRange;\n    }\n\n    this.boids.forEach(function(boid) {\n      boidsInRange.push(boid);\n    });\n\n    if(this.nw == null) {\n      return boidsInRange;\n    }\n\n    boidsInRange.push.apply(boidsInRange, this.nw.queryRange(range));\n    boidsInRange.push.apply(boidsInRange, this.ne.queryRange(range));\n    boidsInRange.push.apply(boidsInRange, this.sw.queryRange(range));\n    boidsInRange.push.apply(boidsInRange, this.se.queryRange(range));\n\n    return boidsInRange;\n  },\n\n  draw: function(ctx) {\n    var size = this.boundary.halfDimension*2;\n    var square = new _Square__WEBPACK_IMPORTED_MODULE_0__[\"default\"]({\n        x: this.boundary.center.x-this.boundary.halfDimension,\n        y: this.boundary.center.y-this.boundary.halfDimension\n      },\n      size, size, \"red\"\n    );\n    square.draw(ctx);\n    if(this.nw == null) {\n      return;\n    }\n    this.nw.draw(ctx);\n    this.ne.draw(ctx);\n    this.sw.draw(ctx);\n    this.se.draw(ctx);\n  }\n}\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (Quadtree);\n\n\n//# sourceURL=webpack:///./src/model/Quadtree.js?");

/***/ }),

/***/ "./src/model/Square.js":
/*!*****************************!*\
  !*** ./src/model/Square.js ***!
  \*****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\nfunction Square(position, width, height, color) {\n  this.position = position;\n  this.width = width;\n  this.height = height;\n  this.color = color;\n}\n\nSquare.prototype = {\n  constructor: Square,\n  \n  draw: function(ctx) {\n    ctx.strokeStyle = this.color;\n    ctx.strokeRect(this.position.x, this.position.y, this.width, this.height);\n  },\n\n  update: function(distance) {}\n}\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (Square);\n\n\n//# sourceURL=webpack:///./src/model/Square.js?");

/***/ }),

/***/ "./src/model/Vector2D.js":
/*!*******************************!*\
  !*** ./src/model/Vector2D.js ***!
  \*******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\nfunction Vector2D(x, y) {\n  this.x = x;\n  this.y = y;\n}\n\nVector2D.prototype = {\n  constructor: Vector2D,\n\n  add: function(vector) {\n    return new Vector2D(this.x + vector.x, this.y + vector.y);\n  },\n\n  sub: function(vector) {\n    return new Vector2D(this.x - vector.x, this.y - vector.y);\n  },\n\n  divide: function(dividend) {\n    return new Vector2D(Math.round(this.x / dividend), Math.round(this.y / dividend));\n  },\n\n  length: function() {\n    return Math.sqrt(Math.pow(this.x, 2) + Math.pow(this.y, 2));\n  }\n}\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (Vector2D);\n\n\n//# sourceURL=webpack:///./src/model/Vector2D.js?");

/***/ }),

/***/ "./src/view/Animation.js":
/*!*******************************!*\
  !*** ./src/view/Animation.js ***!
  \*******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\nfunction Animation(fps, scene) {\n  this.fps = 1000/fps;\n  this.scene = scene;\n  this.showFPS = document.getElementById('fpsCount') !== null;\n}\n\nAnimation.prototype = {\n  constructor: Animation,\n\n  start: function(timestamp) {\n    setTimeout(function() {\n      requestAnimationFrame(this.start.bind(this));\n      this.scene.drawScene();\n      this.scene.updateScene();\n      if(!timestamp) {\n        return;\n      }\n      if(this.showFPS) {\n        delta = (timestamp - this.lastCalledTime) / 1000;\n        this.lastCalledTime = timestamp;\n        calculatedFPS = 1/delta;\n        fpsCount.innerHTML = calculatedFPS;\n      }\n    }.bind(this), this.fps);\n  }\n}\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (Animation);\n\n\n//# sourceURL=webpack:///./src/view/Animation.js?");

/***/ }),

/***/ "./src/view/Scene.js":
/*!***************************!*\
  !*** ./src/view/Scene.js ***!
  \***************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _model_Quadtree__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../model/Quadtree */ \"./src/model/Quadtree.js\");\n\n\nfunction Scene(canvas, quadtree, debug, width, height, capacity, maxLevel) {\n  this.elements = [];\n  this.canvas = canvas;\n  this.ctx = this.canvas.getContext(\"2d\");\n  this.quadtree = quadtree;\n  this.debug = debug;\n  this.width = width;\n  this.height = height;\n  this.capacity = capacity;\n  this.maxLevel = maxLevel\n}\n\nScene.prototype = {\n  constructor: Scene,\n  \n  addElement: function(element) {\n    this.elements.push(element);\n    this.quadtree.insert(element);\n  },\n\n  removeElement: function() {\n    this.elements.pop();\n  },\n\n  getElements: function(elementType) {\n    if(elementType) {\n      return this.elements.filter(function(element) {\n        return element instanceof elementType;\n      });\n    }\n    return this.elements\n  },\n\n  drawScene: function() {\n    this._clearSceneTransparency();\n    if(this.debug) {\n      this.quadtree.draw(this.ctx);\n    }\n    this.elements.forEach(function(element) {\n      element.draw(this.ctx);\n    }.bind(this));\n  },\n\n  updateScene: function() {\n    this.elements.forEach(function(element) {\n      element.update(this);\n    }.bind(this));\n    // This is needed to redraw all quadtrees\n    this.quadtree = new _model_Quadtree__WEBPACK_IMPORTED_MODULE_0__[\"default\"]({x:this.width/2, y:this.height/2}, Math.max(this.width, this.height)/2, 0, this.capacity, this.maxLevel);\n    this.elements.forEach(function(element) {\n      this.quadtree.insert(element);\n    }.bind(this));\n  },\n\n  _clearSceneTransparency: function() {\n    this.ctx.globalAlpha = 0.2;\n    this.ctx.fillStyle = \"black\";\n    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);\n    this.ctx.globalAlpha = 1;\n  },\n\n  _clearScene: function() {\n    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);\n  }\n}\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (Scene);\n\n\n//# sourceURL=webpack:///./src/view/Scene.js?");

/***/ })

/******/ });