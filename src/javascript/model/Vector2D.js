function Vector2D(x, y) {
  this.x = x;
  this.y = y;
}

Vector2D.prototype = {
  constructor: Vector2D,

  add: function(vector) {
    return new Vector2D(this.x + vector.x, this.y + vector.y);
  },

  sub: function(vector) {
    return new Vector2D(this.x - vector.x, this.y - vector.y);
  },

  divide: function(dividend) {
    return new Vector2D(Math.round(this.x / dividend), Math.round(this.y / dividend));
  },

  length: function() {
    return Math.sqrt(Math.pow(this.x, 2) + Math.pow(this.y, 2));
  }
}

module.exports = Vector2D;
