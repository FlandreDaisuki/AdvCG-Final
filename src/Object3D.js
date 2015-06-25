Object3D = function () {
    Object.defineProperty( this, 'id', { value: Object3DIdCount++ } );
    this.name = '';
    this.type = 'Object3D';

    this.children = [];
    this.position = new Vector3();
}

Object3DIdCount = 0;

Object3D.prototype.setPosition = function ( v ) {
    this.position.copy(v);
}

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
    this.material = new Material();
}

Sphere.prototype = Object.create( Object3D.prototype );
Sphere.prototype.constructor = Sphere;

Sphere.prototype.setMaterial = function ( m ) {
    this.material.copy(m);
}
// Triangle extend Object3D
Triangle = function ( a, b, c ) {
    Object3D.call( this );
    this.type = 'Triangle';

    this.a = ( a !== undefined ) ? a : new Vector3();
    this.b = ( b !== undefined ) ? b : new Vector3();
    this.c = ( c !== undefined ) ? c : new Vector3();
    this.material = new Material();

}

Triangle.prototype = Object.create( Object3D.prototype );
Triangle.prototype.constructor = Triangle;

Triangle.prototype.setMaterial = function ( m ) {
    this.material.copy(m);
}
// Scene extend Object3D
Scene = function () {
    Object3D.call( this );
    this.type = 'Scene';
    this.lights = [];
    this.color = new Color(0x333333);
}

Scene.prototype = Object.create( Object3D.prototype );
Scene.prototype.constructor = Scene;

// Camera extend Object3D
Camera = function ( fov ) {
    Object3D.call( this );
    this.type = 'Camera';

    this.fov = ( fov !== undefined ) ? fov : 50; //degree
}

Camera.prototype = Object.create( Object3D.prototype );
Camera.prototype.constructor = Camera;

Camera.prototype.fovDegree = function () {
    return this.fov;
}

Camera.prototype.fovRad = function () {
    return this.fov * Math.PI / 180;
}

// Light extend Object3D
Light = function () {
    Object3D.call( this );
    this.type = 'Light';
}

Light.prototype = Object.create( Object3D.prototype );
Light.prototype.constructor = Light;