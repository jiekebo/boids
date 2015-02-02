var _ = require('lodash');

var Quadtree = require('../model/Quadtree');
var config = require('../config');

function Scene() {
  this.elements = [];
  this.canvas = document.getElementById("playground");
  config.width = this.canvas.width
  config.height = this.canvas.height
  this.ctx = this.canvas.getContext("2d");
  this.quadtree = new Quadtree({x:config.width/2, y:config.height/2}, Math.max(config.width, config.height)/2, 0);
}

Scene.prototype = {
  constructor: Scene,
  
  addElement: function(element) {
    this.elements.push(element);
    this.quadtree.insert(element);
  },

  getElements: function(elementType) {
    if(elementType) {
      return _.filter(this.elements, function(element) {
        return element instanceof elementType;
      });
    }
    return this.elements
  },

  drawScene: function() {
    this._clearSceneTransparency();
    _.forEach(this.elements, function(element) {
      element.draw(this.ctx);
    }.bind(this));
    if(document.getElementById("debug").checked) {
      this.quadtree.draw(this.ctx);
    }
  },

  updateScene: function() {
    _.forEach(this.elements, function(element) {
      element.update(this);
    }.bind(this));
    this.quadtree = new Quadtree({x:config.width/2, y:config.height/2}, Math.max(config.width, config.height)/2, 0);
    _.forEach(this.elements, function(element) {
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

module.exports = Scene;