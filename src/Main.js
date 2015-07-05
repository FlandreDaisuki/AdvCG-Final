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
    var st = Date.now();

    Init();
    GlobalIlumination( scene );
    Render( scene, camera );

    console.log( 'scene.photonMap.length: ' + scene.photonMap.length );
    console.log( ( Date.now() - st ) + ' seconds' );
} );

function Init() {
    canvas = document.querySelector( 'canvas' );

    scene = new Scene();
    var floorMat = new Material( {
        color: new Color( 0x999999 )
    } )
    var t1 = new Triangle( new Vector3( 150, 0, 150 ), new Vector3( 150, 0, -150 ), new Vector3( -150, 0, -150 ) );
    t1.setMaterial( floorMat );
    var t2 = new Triangle( new Vector3( -150, 0, 150 ), new Vector3( 150, 0, 150 ), new Vector3( -150, 0, -150 ) );
    t2.setMaterial( floorMat );

    scene.children.push( t1, t2 );

    var s1 = new Sphere( new Vector3( 0, 100, 150 ), 50 );
    s1.setMaterial( new Material( {
        glossy: 8,
        refractable: true,
        refract_n: 5,
        color: new Color( 0x0000ff ),
        ka: new Color( 0.5, 0.5, 0.5 ),
        kd: new Color( 0.05, 0.05, 0.05 ),
        ks: new Color( 0.5, 0.5, 0.5 )
    } ) );

    scene.children.push( s1 );

    camera = new Camera();
    camera.setPosition( new Vector3( 0, 100, 250 ) );

    var light1 = new Light();
    light1.setPosition( new Vector3( 100, 150, 200 ) );
    scene.lights.push( light1 );
}

function GlobalIlumination( scene ) {
    var photonMap = [];

    for ( var i = 0; i < 100000; i++ ) {
        var randdir = new Vector3( Math.floor( Math.random() * 100000 ) - 50000, Math.floor( Math.random() * 100000 ) - 50000, Math.floor( Math.random() * 100000 ) - 50000 );
        var lightRay = new Ray( scene.lights[ 0 ].position, randdir );

        var mapped = scene.children.map( function ( obj ) {
            var hit = lightRay.intersectObject( obj );
            return ( hit !== null ) ? hit : null;
        } );

        mapped = mapped.filter( function ( hit ) {
            return ( hit !== null );
        } );

        if ( mapped.length > 0 ) {

            var minhit = Nearest( scene.lights[ 0 ].position, mapped );

            photonMap.push( minhit );
        }
    }

    scene.photonMap = photonMap;
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

            var filtered = scene.children.map( function ( obj ) {
                var hit = ray.intersectObject( obj );
                return ( hit !== null ) ? hit : null;
            } );

            filtered = filtered.filter( function ( hit ) {
                return hit !== null;
            } );

            if ( filtered.length > 0 ) {
                var cameraHit = Nearest( ray.origin, filtered );
                //debugger;
                var photonCollection = scene.photonMap.map( function ( p ) {
                    return ( p.position.distanceToSquared( cameraHit.position ) < 25 ) ? p : null;
                } );
                photonCollection = photonCollection.filter( function ( p ) {
                    return p !== null;
                } );

                ColorCalc( cameraHit, photonCollection ).toCanvasArray( pixels.data, coloroffset );

            } else {
                scene.color.toCanvasArray( pixels.data, coloroffset );
            }
        }
    }

    ctx.putImageData( pixels, 0, 0 );
}


function Nearest( targetVector, objArray ) {
    // targetVector : Vector3
    // objArray : an array of objs that has position prop(Vector3)
    // this function can't use on Sphere and Triangle 

    if ( objArray.length <= 0 ) {
        return null;
    } else if ( objArray.length == 1 ) {
        return objArray[ 0 ];
    } else {
        var n = objArray[ 0 ];
        objArray.forEach( function ( c ) {
            if ( n.position.distanceToSquared( targetVector ) >
                c.position.distanceToSquared( targetVector ) ) {
                n = c;
            }
        } );
        return n;
    }
}

function ColorCalc( cameraHit, photonCollecttion ) {
    // https://en.wikipedia.org/wiki/Phong_reflection_model
    var hitobj = cameraHit.on;
    var objmat = hitobj.material;
    var c = new Color( 0, 0, 0 );
    c.add( objmat.color.clone().multiply( objmat.ka ) );

    photonCollecttion.forEach( function ( p ) {
        var LN = new Vector3().copy( p.reflect ).projectOnVector( p.normal );
        var diffuse = objmat.color.clone().multiply( objmat.kd ).multiply( new Color( LN.x, LN.y, LN.z ) );
        
        var RV = new Vector3().copy( p.reflect ).normalize().dot(new Vector3().copy( cameraHit.fromRay.direction ).negate());
        var glossy = new Color().copy(scene.lights[0].color).multiply( objmat.ks ).multiplyScalar( Math.pow(RV, objmat.glossy) );
        c.add( diffuse ).add( glossy );
    } );

    return c;
}

