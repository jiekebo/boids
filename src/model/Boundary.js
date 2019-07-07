function Boundary(center, halfDimension) {
  this.center = center;
  this.halfDimension = halfDimension;
}

Boundary.prototype = {
  constructor: Boundary,

  containsPoint: function(point) {
    if(point.x > this.center.x + this.halfDimension) {
      return false;
    }
    if(point.x < this.center.x - this.halfDimension) {
      return false;
    }
    if(point.y > this.center.y + this.halfDimension) {
      return false;
    }
    if(point.y < this.center.y - this.halfDimension) {
      return false;
    }
    return true;
  },

  intersectsBoundary: function(boundary) {
    if(boundary.center.x - boundary.halfDimension > this.center.x + this.halfDimension) {
      return false;
    }
    if(boundary.center.x + boundary.halfDimension < this.center.x - this.halfDimension) {
      return false;
    }
    if(boundary.center.y - boundary.halfDimension > this.center.y + this.halfDimension) {
      return false;
    }
    if(boundary.center.y + boundary.halfDimension < this.center.y - this.halfDimension) {
      return false;
    }
    return true;
  }
}

export default Boundary;