Ray = function ( origin, direction ) {
    this.origin = ( origin !== undefined ) ? origin : new THREE.Vector3();
    this.direction = ( direction !== undefined ) ? direction.normalize() : new THREE.Vector3();
}

Ray.prototype.constructor = Ray;

Ray.prototype.copy = function ( ray ) {
    this.origin.copy( ray.origin );
    this.direction.copy( ray.direction );

    return this;
}
