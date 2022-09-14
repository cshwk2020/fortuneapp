import './css/fortune.css';
import React, { useContext, useRef } from 'react';
import { useState, useEffect } from 'react';
import * as THREE from 'three';
import { TimelineMax, Expo } from 'gsap';
import { FortuneHubContext } from './model/ImportLib';
import FortuneConstants from './model/FortuneConstants';
 

function PaperDrawerView(props) {
   
    const fortuneHubContext = useContext(FortuneHubContext);
 
    const [singleGeometry, setSingleGeometry] = useState(new THREE.Group());
    const [slotTexture, setSlotTexture] = useState(props.textureLoader.load(FortuneConstants.getWoodTexture()));
  
    const [slotGeometry, setSlotGeometry] = useState(new THREE.BoxGeometry( FortuneConstants.slot_w, FortuneConstants.slot_h, FortuneConstants.slot_l ));
    const [slotMaterial, setSlotMaterial] = useState( 
        new THREE.MeshBasicMaterial({
            map: slotTexture,
            side: THREE.DoubleSide
          }) 
    );
    const [slotMeshList, setSlotMeshList] = useState([]);
 

    

      
    useEffect(() => {
    
        //
        for (let row = -5; row < 5; row++) {
            for (let col = -5; col < 5; col++) {
                let slotMesh = new THREE.Mesh( slotGeometry, slotMaterial );
                slotMeshList.push(slotMesh);
                singleGeometry.add( slotMesh );
                slotMesh.position.set(
                    col * (FortuneConstants.slot_w + FortuneConstants.slot_thickness),
                    row * (FortuneConstants.slot_h + FortuneConstants.slot_thickness), 
                    0); 
            }
                
        }


        props.scene.add( singleGeometry );
        singleGeometry.position.set( 0, 0, -3); 
       
         
        props.domEvents.addEventListener(singleGeometry, 'click', function(event){
            console.log('!!you clicked on singleGeometry', singleGeometry);
            props.onSelectObjRequested(singleGeometry);
        }, false);
             
        
         
        

    }, []);
 

  return (
    <>    
    </>
    );
}

export default PaperDrawerView;

