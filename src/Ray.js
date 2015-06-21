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

Ray.prototype.distanceToPoint = function ( point ) {
    var v1 = new Vector3();

    var directionDistance = v1.subVectors( point, this.origin ).dot( this.direction );
    // point behind the ray
    if ( directionDistance < 0 ) {
        return this.origin.distanceTo( point );
    }

    v1.copy( this.direction ).multiplyScalar( directionDistance ).add( this.origin );
    return v1.distanceTo( point );
}


Ray.prototype.isIntersectionSphere = function ( sphere ) {
    return this.distanceToPoint( sphere.center ) <= sphere.radius;
}

Ray.prototype.intersectSphere = function ( sphere, optionalTarget ) {
    // from http://www.scratchapixel.com/lessons/3d-basic-lessons/lesson-7-intersecting-simple-shapes/ray-sphere-intersection/
    var v1 = new Vector3();

    var photon = {
        position: new Vector3(),
        on: undefined,
        fromRay: new Ray(),

        //reflaction side normal (photon.normal.dot( photon.fromRay.direction ) <= 0)
        normal: new Vector3()
    };

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


Ray.prototype.intersectTriangle = function ( triangle, backfaceCulling, optionalTarget ) {
    // Compute the offset origin, edges, and normal.
    var diff = new Vector3();
    var edge1 = new Vector3();
    var edge2 = new Vector3();
    var normal = new Vector3();

    var photon = {
        position: new Vector3(),
        on: undefined,
        fromRay: new Ray(),

        //reflaction side normal (photon.normal.dot( photon.fromRay.direction ) <= 0)
        normal: new Vector3()
    };

    var a = triangle.a;
    var b = triangle.b;
    var c = triangle.c;

    photon.on = triangle;
    photon.fromRay = this;
    // from http://www.geometrictools.com/LibMathematics/Intersection/Wm5IntrRay3Triangle3.cpp

    edge1.subVectors( b, a );
    edge2.subVectors( c, a );
    normal.crossVectors( edge1, edge2 );

    // Solve Q + t*D = b1*E1 + b2*E2 (Q = kDiff, D = ray direction,
    // E1 = kEdge1, E2 = kEdge2, N = Cross(E1,E2)) by
    //   |Dot(D,N)|*b1 = sign(Dot(D,N))*Dot(D,Cross(Q,E2))
    //   |Dot(D,N)|*b2 = sign(Dot(D,N))*Dot(D,Cross(E1,Q))
    //   |Dot(D,N)|*t = -sign(Dot(D,N))*Dot(Q,N)
    var DdN = this.direction.dot( normal );
    var sign;

    if ( DdN > 0 ) {

        if ( backfaceCulling ) { return null; }
        sign = 1;
        photon.normal.copy( normal ).negate();

    } else if ( DdN < 0 ) {

        sign = -1;
        DdN = -DdN;
        photon.normal.copy( normal );

    } else {
        return null;
    }

    diff.subVectors( this.origin, a );
    var DdQxE2 = sign * this.direction.dot( edge2.crossVectors( diff, edge2 ) );

    // b1 < 0, no intersection
    if ( DdQxE2 < 0 ) {
        return null;
    }

    var DdE1xQ = sign * this.direction.dot( edge1.cross( diff ) );

    // b2 < 0, no intersection
    if ( DdE1xQ < 0 ) {
        return null;
    }

    // b1+b2 > 1, no intersection
    if ( DdQxE2 + DdE1xQ > DdN ) {
        return null;
    }

    // Line intersects triangle, check if ray does.
    var QdN = -sign * diff.dot( normal );

    // t < 0, no intersection
    if ( QdN < 0 ) {
        return null;
    }

    // Ray intersects triangle.
    photon.position = this.at( QdN / DdN, optionalTarget );
    return photon;
}

Ray.prototype.intersectObject = function( object ) {
    
    if (object instanceof(Sphere)) {
        return this.intersectSphere(object);
    }

    if (object instanceof(Triangle)) {
        return this.intersectTriangle(object);
    }

    return null;
}