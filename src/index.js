import Simulation from "./controller/Simulation"

var config = {
  boids: 150,
  boidRange: 2,
  distanceRepulsion: 10,
  velocityDivision: 8,
  edgeRepulsionVelocity: 2,
  quadtreeNodeCapacity: 4,
  quadtreeMaxLevel: 10,
  debug: true
}

var canvas = document.getElementById("playground");

var simulation = new Simulation(canvas, config, true);

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