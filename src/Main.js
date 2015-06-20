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

Ready( function(){
    Init();
    Render( scene, camera );
} );

function Init() {
    canvas = document.querySelector( 'canvas' );

    scene = new Scene();
    var yuka = [ new Vector3( 300, 0, 300 ), new Vector3( 300, 0, -300 ), new Vector3( -300, 0, -300 ), new Vector3( -300, 0, 300 ) ];

    var t1 = new Triangle( yuka[ 0 ], yuka[ 1 ], yuka[ 2 ] );
    var t2 = new Triangle( yuka[ 3 ], yuka[ 0 ], yuka[ 2 ] );

    //scene.children.push(t1, t2);

    var s1 = new Sphere( new Vector3( 0, 100, 150 ), 50 );

    scene.children.push( s1 );

    camera = new Camera();
    camera.setPosition( new Vector3( 0, 100, 350 ) );
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

            //debugger;

            scene.children.forEach( function ( obj ) {
                
                var hit = ray.intersectSphere( obj );

                if ( hit !== null ) {
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
            } );
        }
    }

    ctx.putImageData( pixels, 0, 0 );
}
