import Animation from "../view/Animation"
import Vector2D from "../model/Vector2D"
import Boid from "../model/Boid"

function Simulation(scene, boids, width, height, fps, boidRange, centerDivision, distanceRepulsion, velocityDivision, edgeRepulsionVelocity) {
  this.scene = scene;
  this.boids = boids
  this.width = width;
  this.height = height;
  this.fps = fps;
  this.boidRange = boidRange;
  this.centerDivision = centerDivision;
  this.distanceRepulsion = distanceRepulsion;
  this.velocityDivision = velocityDivision;
  this.edgeRepulsionVelocity = edgeRepulsionVelocity;
}

Simulation.prototype = {
  constructor: Simulation,

  init: function() {
    for (var i = 0; i < this.boids; i++) {
      this.addBoid();
    }
    var anim = new Animation(this.fps, this.scene);
    anim.start();
  },

  addBoid: function() {
    var x = Math.floor((Math.random() * this.width) + 1);
    var y = Math.floor((Math.random() * this.height) + 1);
    var velx = Math.floor((Math.random() * 10) + 1) - 5;
    var vely = Math.floor((Math.random() * 10) + 1) - 5;
    this.scene.addElement(new Boid(new Vector2D(x, y), new Vector2D(velx, vely), 3, "#FFFF00", this.boidRange, this.centerDivision, this.distanceRepulsion, this.velocityDivision, this.edgeRepulsionVelocity, this.width, this.height));
  },

  removeBoid: function() {
    this.scene.removeElement();
  }
}

export default Simulation;
