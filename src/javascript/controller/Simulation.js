var config = require('../config');

var Animation = require('../view/Animation');
var Boid = require('../model/Boid');
var Vector2D = require('../model/Vector2D');

function Simulation(scene) {
  this.scene = scene;
}

Simulation.prototype = {
  constructor: Simulation,

  init: function() {
    for (var i = 0; i < config.boids; i++) {
      this.addBoid();
    }
    var anim = new Animation(config.fps, this.scene);
    anim.start();
  },

  addBoid: function() {
    var x = Math.floor((Math.random() * config.width) + 1);
    var y = Math.floor((Math.random() * config.height) + 1);
    var velx = Math.floor((Math.random() * 10) + 1) - 5;
    var vely = Math.floor((Math.random() * 10) + 1) - 5;
    this.scene.addElement(new Boid(new Vector2D(x, y), new Vector2D(velx, vely), 3, "#FFFF00"));
  },

  removeBoid: function() {
    this.scene.removeElement();
  }
}

module.exports = Simulation;
