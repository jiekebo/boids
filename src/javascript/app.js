var config = require('./config');

var Quadtree = require('./model/Quadtree');
var Scene = require('./view/Scene');
var Simulation = require('./controller/Simulation');
var canvas = document.getElementById("playground");
config.width = canvas.width;
config.height = canvas.height;
var quadtree = new Quadtree({x:config.width/2, y:config.height/2}, Math.max(config.width, config.height)/2, 0);
var scene = new Scene(canvas, quadtree);
var simulation = new Simulation(scene);

simulation.init();

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
};