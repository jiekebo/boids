var _ = require('lodash')

var config = require('../config');
var Square = require('./Square');

function Boundary(center, halfDimension) {
  this.center = center;
  this.halfDimension = halfDimension;
}

Boundary.prototype = {
  constructor: Boundary,

  containsPoint: function(point) {
    if(point.x > this.center.x + this.halfDimension) {
      return false;
    }
    if(point.x < this.center.x - this.halfDimension) {
      return false;
    }
    if(point.y > this.center.y + this.halfDimension) {
      return false;
    }
    if(point.y < this.center.y - this.halfDimension) {
      return false;
    }
    return true;
  },

  intersectsBoundary: function(boundary) {
    if(boundary.center.x - boundary.halfDimension > this.center.x + this.halfDimension) {
      return false;
    }
    if(boundary.center.x + boundary.halfDimension < this.center.x - this.halfDimension) {
      return false;
    }
    if(boundary.center.y - boundary.halfDimension > this.center.y + this.halfDimension) {
      return false;
    }
    if(boundary.center.y + boundary.halfDimension < this.center.y - this.halfDimension) {
      return false;
    }
    return true;
  }
}

function Quadtree(center, halfDimension, level) {
  this.boundary = new Boundary(center, halfDimension);
  this.boids = [];
  this.level = level;
}

Quadtree.prototype = {
  constructor: Quadtree,
  capacity: config.quadtreeNodeCapacity,
  boundary: null,
  nw: null,
  ne: null,
  sw: null,
  se: null,

  insert: function(boid) {
    if(!this.boundary.containsPoint(boid.position)) {
      return false;
    }

    if(this.level > config.quadtreeMaxLevel || this.boids.length < this.capacity && this.nw == null) {
      this.boids.push(boid);
      return true;
    }

    if(this.nw == null) {
      this.subdivide();
    }
    
    if(this.nw.insert(boid)) {
      return true;
    }
    if(this.ne.insert(boid)) {
      return true;
    }
    if(this.sw.insert(boid)) {
      return true;
    }
    if(this.se.insert(boid)) {
      return true;
    }

    return false;
  },

  subdivide: function() {
    var subDivDimension = this.boundary.halfDimension / 2;
    
    var nwcenter = {x : this.boundary.center.x - subDivDimension, y : this.boundary.center.y - subDivDimension};
    var necenter = {x : this.boundary.center.x + subDivDimension, y : this.boundary.center.y - subDivDimension};
    var swcenter = {x : this.boundary.center.x - subDivDimension, y : this.boundary.center.y + subDivDimension};
    var secenter = {x : this.boundary.center.x + subDivDimension, y : this.boundary.center.y + subDivDimension};

    var level = this.level+1;
    
    this.nw = new Quadtree(nwcenter, subDivDimension, level);
    this.ne = new Quadtree(necenter, subDivDimension, level);
    this.sw = new Quadtree(swcenter, subDivDimension, level);
    this.se = new Quadtree(secenter, subDivDimension, level);

    while(this.boids.length > 0) {
      var boid = this.boids.pop();
      this.insert(boid);
    }
  },

  queryRange: function(range) {
    var boidsInRange = [];

    if(!this.boundary.intersectsBoundary(range)) {
      return boidsInRange;
    }

    _.forEach(this.boids, function(boid) {
      boidsInRange.push(boid);
    });

    if(this.nw == null) {
      return boidsInRange;
    }

    boidsInRange.push.apply(boidsInRange, this.nw.queryRange(range));
    boidsInRange.push.apply(boidsInRange, this.ne.queryRange(range));
    boidsInRange.push.apply(boidsInRange, this.sw.queryRange(range));
    boidsInRange.push.apply(boidsInRange, this.se.queryRange(range));

    return boidsInRange;
  },

  draw: function(ctx) {
    var size = this.boundary.halfDimension*2;
    var square = new Square({
        x: this.boundary.center.x-this.boundary.halfDimension,
        y: this.boundary.center.y-this.boundary.halfDimension
      },
      size, size, "red"
    );
    square.draw(ctx);
    if(this.nw == null) {
      return;
    }
    this.nw.draw(ctx);
    this.ne.draw(ctx);
    this.sw.draw(ctx);
    this.se.draw(ctx);
  }
}

module.exports = Quadtree;
