import React from 'react';
import { useState, useEffect } from 'react';
import * as THREE from 'three';

function MainScene(props) {

  const [refreshState, setRefreshState] = useState(0);


  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

  const renderer = new THREE.WebGLRenderer({ antialias: true});
  renderer.setSize( window.innerWidth, window.innerHeight );
  document.body.appendChild( renderer.domElement );

  var geometry = new THREE.BoxGeometry( 1, 1, 1 );
  var material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
  var cube = new THREE.Mesh( geometry, material );
   

  camera.position.z = 5;
  
  function refreshUI() {
    setRefreshState( refreshState + 1 );
  }

  function render() {
    requestAnimationFrame( render );

    //cube.rotation.x += 0.04;
    //cube.rotation.y += 0.04;

    renderer.render( scene, camera );
}

render();
/*
  useEffect(()=>{
      requestAnimationFrame( render );
      renderer.render( scene, camera );
  }); 

   
  setInterval(()=>{
    setRefreshState(refreshState + 1);
  }, (1000/30));
  */
    
  function onClicked() {
    console.log("onClicked...");
    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;
    refreshUI();
  }

  return (
    <div> 
        TEST

        <button onClick={ onClicked }>rotate</button>
    </div>
    );
}

export default MainScene;

