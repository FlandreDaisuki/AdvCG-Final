Vector3 = function ( x, y, z ) {
    this.x = x || 0;
    this.y = y || 0;
    this.z = z || 0;
};

Vector3.prototype.constructor = Vector3;

Vector3.prototype.subVectors = function ( a, b ) {
    this.x = a.x - b.x;
    this.y = a.y - b.y;
    this.z = a.z - b.z;
    return this;
}

Vector3.prototype.subScalar = function ( s ) {
    this.x -= s;
    this.y -= s;
    this.z -= s;
    return this;
}
