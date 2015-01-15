var config = require('../config');

var Animation = require('../view/Animation');
var Scene = require('../view/Scene');
var Boid = require('../model/Boid');
var Vector2D = require('../model/Vector2D');
var Square = require('../model/Square');

function Simulation() {}

Simulation.prototype = {
  constructor: Simulation,

  init: function() {
    var scene = new Scene();
    
    for (var i = 0; i < config.boids; i++) {
      var x = Math.floor((Math.random() * config.width) + 1);
      var y = Math.floor((Math.random() * config.height) + 1);
      var velx = Math.floor((Math.random() * 10) + 1) - 5;
      var vely = Math.floor((Math.random() * 10) + 1) - 5;
      scene.addElement(new Boid(new Vector2D(x, y), new Vector2D(velx, vely), 3, "#FFFF00"));
    }

    var anim = new Animation(config.fps, scene);
    anim.start();
  }

}

module.exports = Simulation;
