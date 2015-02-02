var _ = require('lodash');

var config = require('../config');
var Vector2D = require('../model/Vector2D');


function Boid(position, velocity, radius, color) {
  this.position = position;
  this.velocity = velocity;
  this.radius = radius;
  this.color = color;
}

Boid.prototype = {
  constructor: Boid,
  
  draw: function(ctx) {

    ctx.beginPath();
    ctx.arc(this.position.x, this.position.y, this.radius, 0, 2 * Math.PI, false);
    ctx.fillStyle = this.color;
    ctx.fill();
  },

  update: function(scene) {
    var neighbourBoids = scene.quadtree.queryRange({
      center:{
        x:this.position.x, 
        y:this.position.y
      }, 
      halfDimension: config.boidRange}
    );

    v1 = this._cohesion_rule(neighbourBoids);
    v2 = this._avoidance_rule(neighbourBoids);
    v3 = this._alignment_rule(neighbourBoids);
    v4 = this._boundary_rule();

    this.velocity = this.velocity.add(v1).add(v2).add(v3).add(v4);
    this.position = this.position.add(this.velocity);
  },

  // Try to fly towards the centre of mass of neighbouring boids.
  _cohesion_rule: function(boids) {
    var aggregator = new Vector2D(0, 0);
    if(boids.length <= 1) {
      return aggregator;
    }
    _.forEach(boids, function(boid) {
      if(boid === this) {
        return;
      }
      aggregator = aggregator.add(boid.position);
    }.bind(this));
    perceivedCenter = aggregator.divide(boids.length - 1);
    return perceivedCenter.sub(this.position).divide(config.centerDivision);
  },

  // Try to keep a small distance away from other objects (including other boids).
  _avoidance_rule: function(boids) {
    var repulsor = new Vector2D(0, 0);
    if(boids.length <= 1) {
      return repulsor;
    }
    _.forEach(boids, function(boid) {
      if(boid === this) {
        return;
      }
      if(boid.position.sub(this.position).length() < config.distanceRepulsion) {
        repulsor = repulsor.sub(boid.position.sub(this.position));
      }
    }.bind(this));
    return repulsor;
  },

  // Try to match velocity with near boids.
  _alignment_rule: function(boids) {
    var aggregator = new Vector2D(0, 0);
    if(boids.length <= 1) {
      return aggregator;
    }
    _.forEach(boids, function(boid) {
      if(boid === this) {
        return;
      }
      aggregator = aggregator.add(boid.velocity);
    }.bind(this));
    perceivedVelocity = aggregator.divide(boids.length - 1);
    return perceivedVelocity.sub(this.velocity).divide(config.velocityDivision);
  },

  // Try to keep the boids within the confines of the playground.
  _boundary_rule: function() {
    var velocity = new Vector2D(0, 0);
    if(this.position.x < 0) {
      velocity.x = config.edgeRepulsionVelocity;
    }
    if(this.position.x > config.width) {
      velocity.x = ~ config.edgeRepulsionVelocity;
    }
    if(this.position.y < 0) {
      velocity.y = config.edgeRepulsionVelocity;
    }
    if(this.position.y > config.height) {
      velocity.y = ~ config.edgeRepulsionVelocity;
    }
    return velocity;
  }
}

module.exports = Boid;
