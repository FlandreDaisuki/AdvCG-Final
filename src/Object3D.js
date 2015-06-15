Object3D = function () {
    Object.defineProperty( this, 'id', { value: Object3DIdCount ++ } );
    this.name = '';
    this.type = 'Object3D';

    this.parent = undefined;
    this.children = [];
    this.position = new Vector3();
}

Object3DIdCount = 0;