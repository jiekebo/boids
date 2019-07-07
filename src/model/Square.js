function Square(position, width, height, color) {
  this.position = position;
  this.width = width;
  this.height = height;
  this.color = color;
}

Square.prototype = {
  constructor: Square,
  
  draw: function(ctx) {
    ctx.strokeStyle = this.color;
    ctx.lineWidth = 0.3;
    ctx.strokeRect(this.position.x, this.position.y, this.width, this.height);
  },

  update: function(distance) {}
}

export default Square;
