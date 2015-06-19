Vector3 = function ( x, y, z ) {
    this.x = x || 0;
    this.y = y || 0;
    this.z = z || 0;
};

Vector3.prototype.constructor = Vector3;

Vector3.prototype.copy = function ( v ) {
    this.x = v.x;
    this.y = v.y;
    this.z = v.z;
    return this;
}

Vector3.prototype.add = function ( v ) {
    this.x += v.x;
    this.y += v.y;
    this.z += v.z;
    return this;
}

Vector3.prototype.addScalar = function ( s ) {
    this.x += s;
    this.y += s;
    this.z += s;
    return this;
}

Vector3.prototype.addVectors = function ( a, b ) {
    this.x = a.x + b.x;
    this.y = a.y + b.y;
    this.z = a.z + b.z;
    return this;
}

Vector3.prototype.sub = function ( v ) {
    this.x -= v.x;
    this.y -= v.y;
    this.z -= v.z;
    return this;
}

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

Vector3.prototype.multiplyScalar = function ( scalar ) {
    this.x *= scalar;
    this.y *= scalar;
    this.z *= scalar;
    return this;
}

Vector3.prototype.multiplyVectors = function ( a, b ) {
    this.x = a.x * b.x;
    this.y = a.y * b.y;
    this.z = a.z * b.z;
    return this;
}

Vector3.prototype.divideScalar = function ( scalar ) {
    if ( scalar !== 0 ) {
        var invScalar = 1 / scalar;
        this.x *= invScalar;
        this.y *= invScalar;
        this.z *= invScalar;
    } else {
        this.x = 0;
        this.y = 0;
        this.z = 0;
    }
    return this;
}

Vector3.prototype.negate = function () {
    this.x = -this.x;
    this.y = -this.y;
    this.z = -this.z;
    return this;
}

Vector3.prototype.dot = function ( v ) {
    return this.x * v.x + this.y * v.y + this.z * v.z;
}

Vector3.prototype.length = function () {
    return Math.sqrt( this.x * this.x + this.y * this.y + this.z * this.z );
}

Vector3.prototype.normalize = function () {
    return this.divideScalar( this.length() );
}

Vector3.prototype.distanceTo = function ( v ) {
    return Math.sqrt( this.distanceToSquared( v ) );
}

Vector3.prototype.distanceToSquared = function ( v ) {
    var dx = this.x - v.x;
    var dy = this.y - v.y;
    var dz = this.z - v.z;
    return dx * dx + dy * dy + dz * dz;
}
