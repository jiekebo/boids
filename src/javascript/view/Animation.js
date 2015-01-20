function Animation(fps, scene) {
  this.fps = 1000/fps;
  this.scene = scene;
  this.showFPS = document.getElementById('fpsCount') !== null;
}

Animation.prototype = {
  constructor: Animation,

  start: function(timestamp) {
    setTimeout(function() {
      requestAnimationFrame(this.start.bind(this));
      this.scene.drawScene();
      this.scene.updateScene();
      if(!timestamp) {
        return;
      }
      if(this.showFPS) {
        delta = (timestamp - this.lastCalledTime) / 1000;
        this.lastCalledTime = timestamp;
        calculatedFPS = 1/delta;
        fpsCount.innerHTML = calculatedFPS;
      }
    }.bind(this), this.fps);
  }

}

module.exports = Animation;
