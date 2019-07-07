import Vector2D from "./Vector2D"

function Boid(position, velocity, radius, color, boidRange, centerDivision, distanceRepulsion, velocityDivision, edgeRepulsionVelocity, width, height) {
  this.position = position;
  this.velocity = velocity;
  this.radius = radius;
  this.color = color;
  this.boidRange = boidRange;
  this.centerDivision = centerDivision;
  this.distanceRepulsion = distanceRepulsion;
  this.velocityDivision = velocityDivision;
  this.edgeRepulsionVelocity = edgeRepulsionVelocity;
  this.width = width;
  this.height = height;
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
      halfDimension: this.boidRange}
    );

    var v1 = this._cohesion_rule(neighbourBoids);
    var v2 = this._avoidance_rule(neighbourBoids);
    var v3 = this._alignment_rule(neighbourBoids);
    var v4 = this._boundary_rule();

    this.velocity = this.velocity.add(v1).add(v2).add(v3).add(v4);
    this.position = this.position.add(this.velocity);
  },

  // Try to fly towards the centre of mass of neighbouring boids.
  _cohesion_rule: function(boids) {
    var aggregator = new Vector2D(0, 0);
    if(boids.length <= 1) {
      return aggregator;
    }
    boids.forEach(function(boid) {
      if(boid === this) {
        return;
      }
      aggregator = aggregator.add(boid.position);
    }.bind(this));
    var perceivedCenter = aggregator.divide(boids.length - 1);
    return perceivedCenter.sub(this.position).divide(this.centerDivision);
  },

  // Try to keep a small distance away from other objects (including other boids).
  _avoidance_rule: function(boids) {
    var repulsor = new Vector2D(0, 0);
    if(boids.length <= 1) {
      return repulsor;
    }
    boids.forEach(function(boid) {
      if(boid === this) {
        return;
      }
      if(boid.position.sub(this.position).length() < this.distanceRepulsion) {
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
    boids.forEach(function(boid) {
      if(boid === this) {
        return;
      }
      aggregator = aggregator.add(boid.velocity);
    }.bind(this));
    var perceivedVelocity = aggregator.divide(boids.length - 1);
    return perceivedVelocity.sub(this.velocity).divide(this.velocityDivision);
  },

  // Try to keep the boids within the confines of the playground.
  _boundary_rule: function() {
    var velocity = new Vector2D(0, 0);
    if(this.position.x < 0) {
      velocity.x = this.edgeRepulsionVelocity;
    }
    if(this.position.x > this.width) {
      velocity.x = ~ this.edgeRepulsionVelocity;
    }
    if(this.position.y < 0) {
      velocity.y = this.edgeRepulsionVelocity;
    }
    if(this.position.y > this.height) {
      velocity.y = ~ this.edgeRepulsionVelocity;
    }
    return velocity;
  }
}

export default Boid;
