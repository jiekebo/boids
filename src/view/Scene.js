import Quadtree from "../model/Quadtree"

function Scene(canvas, quadtree, debug, width, height, capacity, maxLevel) {
  this.elements = [];
  this.canvas = canvas;
  this.ctx = this.canvas.getContext("2d");
  this.quadtree = quadtree;
  this.debug = debug;
  this.width = width;
  this.height = height;
  this.capacity = capacity;
  this.maxLevel = maxLevel
}

Scene.prototype = {
  constructor: Scene,
  
  addElement: function(element) {
    this.elements.push(element);
    this.quadtree.insert(element);
  },

  removeElement: function() {
    this.elements.pop();
  },

  getElements: function(elementType) {
    if(elementType) {
      return this.elements.filter(function(element) {
        return element instanceof elementType;
      });
    }
    return this.elements
  },

  drawScene: function() {
    this._clearSceneTransparency();
    if(this.debug) {
      this.quadtree.draw(this.ctx);
    }
    this.elements.forEach(function(element) {
      element.draw(this.ctx);
    }.bind(this));
  },

  updateScene: function() {
    this.elements.forEach(function(element) {
      element.update(this);
    }.bind(this));
    // This is needed to redraw all quadtrees
    this.quadtree = new Quadtree({x:this.width/2, y:this.height/2}, Math.max(this.width, this.height)/2, 0, this.capacity, this.maxLevel);
    this.elements.forEach(function(element) {
      this.quadtree.insert(element);
    }.bind(this));
  },

  _clearSceneTransparency: function() {
    this.ctx.globalAlpha = 0.2;
    this.ctx.fillStyle = "black";
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    this.ctx.globalAlpha = 1;
  },

  _clearScene: function() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }
}

export default Scene;
