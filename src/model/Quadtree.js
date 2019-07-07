import Square from "./Square"
import Boundary from "./Boundary"

function Quadtree(center, halfDimension, level, capacity, maxLevel) {
  this.boundary = new Boundary(center, halfDimension);
  this.boids = [];
  this.level = level;
  this.capacity = capacity;
  this.maxLevel = maxLevel;
}

Quadtree.prototype = {
  constructor: Quadtree,
  boundary: null,
  nw: null,
  ne: null,
  sw: null,
  se: null,

  insert: function(boid) {
    if(!this.boundary.containsPoint(boid.position)) {
      return false;
    }

    if(this.level > this.maxLevel || this.boids.length < this.capacity && this.nw == null) {
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
    
    this.nw = new Quadtree(nwcenter, subDivDimension, level, this.capacity, this.maxLevel);
    this.ne = new Quadtree(necenter, subDivDimension, level, this.capacity, this.maxLevel);
    this.sw = new Quadtree(swcenter, subDivDimension, level, this.capacity, this.maxLevel);
    this.se = new Quadtree(secenter, subDivDimension, level, this.capacity, this.maxLevel);

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

    this.boids.forEach(function(boid) {
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
      size, size, "#d4d6d5"
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

export default Quadtree;
