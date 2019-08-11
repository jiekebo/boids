import Vector2D from "../model/Vector2D"
import Boid from "../model/Boid"
import Scene from "../view/Scene"
import _ from "lodash"
import h337 from "heatmap.js"

function Simulation(canvas, config, debug) {
  this.scene = new Scene(canvas, debug, canvas.width, canvas.height, config.quadtreeNodeCapacity, config.quadtreeMaxLevel);
  this.debug = debug;
  this.boids = config.boids
  this.width = canvas.width;
  this.height = canvas.height;
  this.boidRange = config.boidRange;
  this.centerDivision = canvas.width/2;
  this.distanceRepulsion = config.distanceRepulsion;
  this.velocityDivision = config.velocityDivision;
  this.edgeRepulsionVelocity = config.edgeRepulsionVelocity;
  this.fpsCount = document.getElementById('fpsCount');
  this.frames = [];
  this.heatmap = [[]];
  this.total_frames = 0;
  this.heatmapDiv = null;
}

Simulation.prototype = {
  constructor: Simulation,

  init: function() {
    this.heatmapDiv = document.querySelector('#heatmap');
    if(this.heatmapDiv != null) {
      this.hmap = h337.create({
        container: this.heatmapDiv,
        radius: 15,
        maxOpacity: 0.3
      });
    }
    for (var i = 0; i < this.boids; i++) {
      this.addBoid();
    }
    this.heatmap = _.range(this.width).map(function () {
      return _.range(this.height).map(function () {
        return 0;
      }.bind(this))
    }.bind(this))
    this.animate();
  },

  addBoid: function() {
    var x = Math.floor(Math.random() * this.width);
    var y = Math.floor(Math.random() * this.height);
    var velx = Math.floor(Math.random() * 10)-5;
    var vely = Math.floor(Math.random() * 10)-5;
    this.scene.addElement(new Boid(new Vector2D(x, y), new Vector2D(velx, vely), 3, "#f777b9", this.boidRange, this.centerDivision, this.distanceRepulsion, this.velocityDivision, this.edgeRepulsionVelocity, this.width, this.height));
  },

  removeBoid: function() {
    this.scene.removeElement();
  },

  updateHeatmap: function(elements) {
    elements.forEach(function(element) {
      var x = Math.max(0, Math.min(this.width-1, element.position.x));
      var y = Math.max(0, Math.min(this.height-1, element.position.y));
      this.heatmap[x][y] += 1;
    }.bind(this));
    if(this.total_frames % 60 == 1) {
      var hmapData = this.heatmap.flatMap(function(elem, i) { return elem.flatMap(function(val, j) {
        if (val <= 0) {
          return null;
        } else {
          return {x:i, y:j, value:val};
        }
      })}).filter(function(elem) {return elem != null});
      this.hmap.setData({
        min:0,
        max:20000, 
        data:hmapData
      });
    }
  },

  animate: function(timestamp) {
    requestAnimationFrame(this.animate.bind(this));
    this.scene.drawScene();
    this.scene.updateScene();
    this.total_frames += 1;
    if(!timestamp) {
      return;
    }
    if(this.fpsCount != null && this.debug) {
      while (this.frames.length > 0 && this.frames[0] <= timestamp - 1000) {
        this.frames.shift();
      }
      this.frames.push(timestamp);
      this.fpsCount.innerHTML = this.frames.length;
      
    }
    if(this.heatmapDiv != null) {
      this.updateHeatmap(this.scene.elements);
    }
  }

}

export default Simulation;
