'use strict';

function Ready( interactive, complete ) {
    complete = complete || function () {};
    interactive = interactive || function () {};
    document.onreadystatechange = function () {
        if ( document.readyState === 'interactive' ) {
            interactive();
        }
        if ( document.readyState === 'complete' ) {
            complete();
        }
    }
};

var scene, camera, canvas;

Ready( function () {
    Init();
    Render( scene, camera );
} );

function Init() {
    canvas = document.querySelector( 'canvas' );

    scene = new Scene();
    var floorMat = new Material( {
        color: new Color( 0x999999 )
    } )
    var t1 = new Triangle( new Vector3( 150, 0, 150 ), new Vector3( 150, 0, -150 ), new Vector3( -150, 0, -150 ) );
    t1.setMaterial(floorMat);
    var t2 = new Triangle( new Vector3( -150, 0, 150 ), new Vector3( 150, 0, 150 ), new Vector3( -150, 0, -150 ) );
    t2.setMaterial(floorMat);

    scene.children.push( t1, t2 );

    var s1 = new Sphere( new Vector3( 0, 100, 150 ), 50 );
    s1.setMaterial( new Material( {
        glossy: 0.5,
        refractable: true,
        refract_n: 5,
        color: new Color( 0x0000ff )
    } ) );

    scene.children.push( s1 );

    camera = new Camera();
    camera.setPosition( new Vector3( 0, 100, 300 ) );

    var light1 = new Light();
    light1.setPosition( new Vector3( 100, 100, 150 ) );
    scene.lights.push( light1 );
}

function GlobalIlumination = function ( scene ) {

}

function Render( scene, camera ) {
    var focusDis = ( canvas.height / 2 ) / Math.tan( camera.fov * Math.PI / 180 );
    var hf_cvsh = canvas.height / 2,
        hf_cvsw = canvas.width / 2;

    var ctx = canvas.getContext( '2d' );
    var pixels = ctx.getImageData( 0, 0, canvas.width, canvas.height );

    for ( var cvsh = 0; cvsh < canvas.height; cvsh++ ) {
        for ( var cvsw = 0; cvsw < canvas.width; cvsw++ ) {

            var coloroffset = ( cvsh * canvas.width + cvsw ) * 4;

            var raydir = new Vector3( cvsw - hf_cvsw, hf_cvsh - cvsh, -focusDis );
            var ray = new Ray( camera.position, raydir );

            var filtered = scene.children.filter( function ( obj ) {

                var hit = ray.intersectObject( obj );

                return hit !== null;
            } );

            if ( filtered.length > 0 ) {
                pixels.data[ coloroffset + 0 ] = 255;
                pixels.data[ coloroffset + 1 ] = 150;
                pixels.data[ coloroffset + 2 ] = 150;
                pixels.data[ coloroffset + 3 ] = 255;
            } else {
                pixels.data[ coloroffset + 0 ] = 50;
                pixels.data[ coloroffset + 1 ] = 50;
                pixels.data[ coloroffset + 2 ] = 50;
                pixels.data[ coloroffset + 3 ] = 255;
            }
        }
    }

    ctx.putImageData( pixels, 0, 0 );
}
