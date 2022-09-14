import './css/fortune.css';
import React, { useRef } from 'react';
import { useState, useEffect } from 'react';
import * as THREE from 'three';
import { TimelineMax, Expo } from 'gsap';
import FortuneConstants from './model/FortuneConstants';

 
function LuckStickView(props) {
     

    const [texture, setTexture] = useState(props.textureLoader.load(FortuneConstants.getSpecialStickTexture()));
      
    //
    const [stickGeom, setStickGeom] = useState(new THREE.PlaneGeometry(FortuneConstants.stick_w, FortuneConstants.stick_h));
    const [stickMat, setStickMat] = useState( 
        new THREE.MeshBasicMaterial({
            map: texture,
            side: THREE.DoubleSide
          }) 
    );
    const [stickMesh, setStickMesh] = useState(new THREE.Mesh( stickGeom, stickMat ));
     

      
    useEffect(()=>{
    
        
        //
        props.scene.add(stickMesh);
        stickMesh.position.set ( -0.2, 0.05, -2);
 
          
        props.domEvents.addEventListener(stickMesh, 'click', function(event){
            console.log('!!you clicked on stickMesh', stickMesh);
            props.onSelectObjRequested(stickMesh);
        }, false);
 

    }, []);
    
     
 

  return (
    <>    
    </>
    );
}

export default LuckStickView;

