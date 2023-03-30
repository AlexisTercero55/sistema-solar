import * as THREE from 'three';

// init graphics pipeline,

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera( 70, window.innerWidth / window.innerHeight, 0.01, 100 );
camera.position.set(1,1,1);
camera.lookAt(scene.position);


const renderer = new THREE.WebGLRenderer( { antialias: true } );
renderer.setSize( window.innerWidth, window.innerHeight );
renderer.setAnimationLoop( animation );
document.body.appendChild( renderer.domElement );

const animations = [];

// creating 3D objects.

const axes = new THREE.AxesHelper(1);
scene.add( axes );

cubo();

// animation

function animation( time ) {

	//playing animations
  animations.forEach((f,index)=>{
    f(time);
  })

	
  // next frame
  renderer.render( scene, camera );

}


//------------------------------------------------

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
