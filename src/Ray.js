Ray = function ( origin, direction ) {
    this.origin = ( origin !== undefined ) ? origin : new Vector3();
    this.direction = ( direction !== undefined ) ? direction.normalize() : new Vector3();
}

Ray.prototype.constructor = Ray;

Ray.prototype.copy = function ( ray ) {
    this.origin.copy( ray.origin );
    this.direction.copy( ray.direction );

    return this;
}

Ray.prototype.at = function ( t, optionalTarget ) {
    var result = optionalTarget || new Vector3();
    return result.copy( this.direction ).multiplyScalar( t ).add( this.origin );
}

Ray.prototype.distanceToPoint = function () {

    var v1 = new Vector3();

    return function ( point ) {
        var directionDistance = v1.subVectors( point, this.origin ).dot( this.direction );
        // point behind the ray
        if ( directionDistance < 0 ) {
            return this.origin.distanceTo( point );
        }

        v1.copy( this.direction ).multiplyScalar( directionDistance ).add( this.origin );
        return v1.distanceTo( point );
    };
}()

Ray.prototype.isIntersectionSphere = function ( sphere ) {
    return this.distanceToPoint( sphere.center ) <= sphere.radius;
}

Ray.prototype.intersectSphere = function () {
    // from http://www.scratchapixel.com/lessons/3d-basic-lessons/lesson-7-intersecting-simple-shapes/ray-sphere-intersection/
    var v1 = new Vector3();
    var photon = {  position: new Vector3(),
                    on: undefined,
                    fromRay: new Ray(),
                    
                    //reflaction side normal (photon.normal.dot( photon.fromRay.direction ) <= 0)
                    normal: new Vector3() };
    return function ( sphere, optionalTarget ) {

        v1.subVectors( sphere.center, this.origin );
        photon.on = sphere;
        photon.fromRay = this;

        var tca = v1.dot( this.direction );

        var d2 = v1.dot( v1 ) - tca * tca;

        var radius2 = sphere.radius * sphere.radius;

        if ( d2 > radius2 ) return null;

        var thc = Math.sqrt( radius2 - d2 );

        // t0 = first intersect point - entrance on front of sphere
        var t0 = tca - thc;

        // t1 = second intersect point - exit point on back of sphere
        var t1 = tca + thc;

        // test to see if both t0 and t1 are behind the ray - if so, return null
        if ( t0 < 0 && t1 < 0 ) return null;

        // test to see if t0 is behind the ray:
        // if it is, the ray is inside the sphere, so return the second exit point scaled by t1,
        // in order to always return an intersect point that is in front of the ray.
        if ( t0 < 0 ) {
            photon.position = this.at( t1, optionalTarget );
            photon.normal.copy( photon.position ).sub( sphere.center );
            return photon;
        }

        // else t0 is in front of the ray, so return the first collision point scaled by t0
        photon.position = this.at( t0, optionalTarget );
        photon.normal.copy( photon.position ).sub( sphere.center );
        return photon;
    }
}()
