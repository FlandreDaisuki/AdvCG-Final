Object3D = function () {
    Object.defineProperty( this, 'id', { value: Object3DIdCount++ } );
    this.name = '';
    this.type = 'Object3D';

    this.children = [];
    this.position = new Vector3();
}

Object3DIdCount = 0;

// Sphere extend Object3D
Sphere = function ( center, radius ) {
    Object3D.call( this );
    this.type = 'Sphere';

    if ( center instanceof( Vector3 ) ) {
        this.center = center;
    } else {
        this.center = new Vector3();
    }

    this.radius = ( radius !== undefined ) ? radius : 5;
}

Sphere.prototype = {
    constructor: Sphere
};

// Triangle extend Object3D
Triangle = function ( a, b, c ) {
    Object3D.call( this );
    this.type = 'Triangle';

    this.a = ( a !== undefined ) ? a : new Vector3();
    this.b = ( b !== undefined ) ? b : new Vector3();
    this.c = ( c !== undefined ) ? c : new Vector3();
}

Triangle.prototype = {
    constructor: Triangle
};

// Scene extend Object3D
Scene = function () {
    Object3D.call( this );
    this.type = 'Scene';
}

Scene.prototype = {
    constructor: Scene
};

// Camera extend Object3D
Camera = function ( fov ) {
    Object3D.call( this );
    this.type = 'Camera';

    this.fov = ( fov !== undefined ) ? fov : 50; //degree
}

Camera.prototype = {
    constructor: Camera,
    fovDegree: function () {
        return this.fov;
    },
    fovRad: function () {
        return this.fov * Math.PI / 180;
    }
};

