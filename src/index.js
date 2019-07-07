import Scene from "./view/Scene"
import Quadtree from "./model/Quadtree"
import Simulation from "./controller/Simulation"

var config = {
  fps: 120,
  boids: 100,
  boidRange: 2,
  centerDivision: 200,
  distanceRepulsion: 10,
  velocityDivision: 8,
  edgeRepulsionVelocity: 2,
  quadtreeNodeCapacity: 4,
  quadtreeMaxLevel: 10,
  debug: true
}

var canvas = document.getElementById("playground");
config.width = canvas.width;
config.height = canvas.height;

var quadtree = new Quadtree({x:config.width/2, y:config.height/2}, Math.max(config.width, config.height)/2, 0, config.quadtreeNodeCapacity, config.quadtreeMaxLevel);
var scene = new Scene(canvas, quadtree, config.debug, config.width, config.height, config.quadtreeNodeCapacity, config.quadtreeMaxLevel);
var simulation = new Simulation(scene, config.boids, config.width, config.height, config.fps, config.boidRange, config.centerDivision, config.distanceRepulsion, config.velocityDivision, config.edgeRepulsionVelocity);

simulation.init();

/*
var boidCount = document.getElementById("boidCount");
boidCount.innerHTML = scene.getElements().length;

var addButton = document.getElementById("add");
addButton.onclick = function() {
  simulation.addBoid();
  boidCount.innerHTML = scene.getElements().length;
};

var removeButton = document.getElementById("remove");
removeButton.onclick = function() {
  simulation.removeBoid();
  boidCount.innerHTML = scene.getElements().length;
};*/