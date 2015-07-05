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

Vector3.prototype.clone = function () {
    return new Vector3(this.x, this.y, this.z);
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

Vector3.prototype.cross = function ( v ) {
    var x = this.x,
        y = this.y,
        z = this.z;

    this.x = y * v.z - z * v.y;
    this.y = z * v.x - x * v.z;
    this.z = x * v.y - y * v.x;

    return this;
}

Vector3.prototype.crossVectors = function ( a, b ) {
    var ax = a.x,
        ay = a.y,
        az = a.z;
    var bx = b.x,
        by = b.y,
        bz = b.z;

    this.x = ay * bz - az * by;
    this.y = az * bx - ax * bz;
    this.z = ax * by - ay * bx;

    return this;
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

Vector3.prototype.projectOnVector = function ( vector ) {

    var v1 = new Vector3(), dot;

    v1.copy( vector ).normalize();

    dot = this.dot( v1 );

    return this.copy( v1 ).multiplyScalar( dot );
}
