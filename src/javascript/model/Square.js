var _ = require('lodash');

function Square(position, width, height, color) {
  this.position = position;
  this.width = width;
  this.height = height;
  this.color = color;
}

Square.prototype = {
  constructor: Square,
  
  draw: function(ctx) {
    ctx.fillStyle = this.color;
    ctx.fillRect(this.position.x, this.position.y, this.width, this.height);
  },

  update: function(distance) {}

}

module.exports = Square;
