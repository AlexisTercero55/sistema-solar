import * as THREE from 'three';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls';

let SCREEN_WIDTH = window.innerWidth;
let SCREEN_HEIGHT = window.innerHeight;
let aspect = SCREEN_WIDTH / SCREEN_HEIGHT;

// init graphics pipeline,

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera( 70, window.innerWidth / window.innerHeight, 0.01, 1000 );
let p = 1;
camera.position.set(p,p,p);
camera.lookAt(scene.position);

const renderer = new THREE.WebGLRenderer( { antialias: true } );
renderer.setSize( window.innerWidth, window.innerHeight );
renderer.setAnimationLoop( animation );
document.body.appendChild( renderer.domElement );

//---------------


const controls = new OrbitControls(camera,renderer.domElement);
const animations = [];

// creating 3D objects.

const axes = new THREE.AxesHelper(1);
scene.add( axes );

starts();



var points_ = [
  0,0,0,
  0,.5,0,
  0,.5,.5,
  0,0,0.5
]
points_ = points(points_);
scene.add(points_);
lines()


// point.position.set(0,.5,0);
// animations.push((time)=>{
//   point.position.y += 0.001;
//   point.position.z += 0.001;
// })






// animation loop
function animation( time ) {

	//playing animations
  animations.forEach((f,index)=>{
    f(time);
  })

  // cameraPerspectiveHelper.update();
  
  controls.update();
  // next frame
  renderer.render( scene, camera );

}


//------------------------------------------------

function cameraHelper1()
{
  // camera helper
  var cameraPerspective = new THREE.PerspectiveCamera( 50,  aspect, 1, 2);
  var cameraPerspectiveHelper = new THREE.CameraHelper( cameraPerspective );
  scene.add( cameraPerspectiveHelper );

  var cameraRig = new THREE.Group();
  cameraRig.add(cameraPerspective);

  var points_ = points([1,1,1]);
  scene.add(points_);

  cameraRig.lookAt(points_.position);
  scene.add( cameraRig );
}

function starts(){
  const geometry = new THREE.BufferGeometry();
  const vertices = [];

  for ( let i = 0; i < 10000; i ++ ) {

    vertices.push( THREE.MathUtils.randFloatSpread( 2000 ) ); // x
    vertices.push( THREE.MathUtils.randFloatSpread( 2000 ) ); // y
    vertices.push( THREE.MathUtils.randFloatSpread( 2000 ) ); // z

  }

  geometry.setAttribute( 'position', new THREE.Float32BufferAttribute( vertices, 3 ) );

  const shader = new THREE.ShaderMaterial({
    transparent : true,
    uniforms : {
      size: {value:Math.random()},
      color: {value:new THREE.Color(0xffffff)},

    },
    vertexShader : THREE.ShaderLib.points.vertexShader,
    fragmentShader : `
    uniform vec3 color;
    void main()
    {
      vec2 xy = gl_PointCoord.xy - vec2(0.5);
      float ll = length(xy);
      gl_FragColor = vec4(color,step(ll,0.5));
    }
    `
  });

  const particles = new THREE.Points( geometry, shader);
  scene.add( particles );
}

function lines(){
  const material = new THREE.LineBasicMaterial({
    color: 0xff00ff
  });
  
  const points = [];
  points.push( new THREE.Vector3( 0,0,0 ) );
  points.push( new THREE.Vector3( 0,.5,0 ) );
  points.push( new THREE.Vector3( 0,.5,.5 ) );
  points.push( new THREE.Vector3( 0,0,0.5 ) );
  
  const geometry = new THREE.BufferGeometry().setFromPoints( points );
  
  const line = new THREE.Line( geometry, material );
  scene.add( line );
}

function points(ps=[0,0,0])
{
  const geometry = new THREE.BufferGeometry();
  const vertices = new Float32Array([
    ...ps
  ]);
  geometry.setAttribute('position',new THREE.BufferAttribute(vertices,3));//x,y,z
  const shader = new THREE.ShaderMaterial({
    transparent : true,
    uniforms : {
      size: {value:10},
      scale: {value:1},
      color: {value:new THREE.Color(0xffffff)},

    },
    vertexShader : THREE.ShaderLib.points.vertexShader,
    fragmentShader : `
    uniform vec3 color;
    void main()
    {
      vec2 xy = gl_PointCoord.xy - vec2(0.5);
      float ll = length(xy);
      gl_FragColor = vec4(color,step(ll,0.5));
    }
    `
  });

  return new THREE.Points(geometry,shader);
}

function cubo(){
  // add Object3D to the scene
  const geometry = new THREE.BoxGeometry( 0.2, 0.2, 0.2 );
  const material = new THREE.MeshNormalMaterial();
  const mesh = new THREE.Mesh( geometry, material );
  animations.push((time)=>{
    mesh.rotation.x = time / 2000;
	  mesh.rotation.y = time / 1000;
  })

  scene.add( mesh );
}
