import './css/fortune.css';
import React, { useRef } from 'react';
import { useState, useEffect } from 'react';
import * as THREE from 'three';
import { TimelineMax, Expo } from 'gsap';
import StatueView from './StatueView';
import FortuneConstants from './model/FortuneConstants';

function SmokeBgView(props) {
      
    //
    const [smokeGeometry, setSmokeGeometry] = useState(new THREE.BoxGeometry( 1, 1, 1  ));
    const [smokeMaterial, setSmokeMaterial] = useState( new THREE.MeshLambertMaterial({
    	map: props.textureLoader.load(FortuneConstants.getSmokeTexture()),
        emissive: 0x222222,
        opacity: 0.1,
        transparent: true,
        depthTest: false,
        overdraw: 0.5
  	}) );
    const [smokeParticle, setSmokeParticle] = useState([]);
    //const [smokeCube, setSmokeCube] = useState(new THREE.Mesh( smokeGeometry, smokeMaterial ));

     
    
    useEffect(() => {
   
         
        //
         
        for (let row=-2; row<5; row++) {
            for (let col=-2; col<5; col++) {

                for (let i=0; i<5; i++) {
                    let smokeCube = new THREE.Mesh( smokeGeometry, smokeMaterial )
                       

                    smokeCube.scale.set(Math.random() * 2, Math.random() * 2, Math.random() * 2);
                    smokeCube.position.set(
                        row + Math.random() * 0.2,
                        col + Math.random() * 0.2,
                        -10 * Math.random() * 2 
                    );
                    smokeCube.rotation.set(Math.random() * 360,Math.random() * 360,Math.random() * 360);
                    //setSmokeParticle([...smokeParticle, smokeCube]);
                    smokeParticle.push(smokeCube);

                    props.scene.add(smokeCube);
                }

            }
        }

         
        

 
         
        const test_interval = setInterval(
            ()=>{
  
                smokeParticle.forEach ((smokeCube)=>{
 
                    const timelineMax = new TimelineMax({paused: false});
                    /*
                    timelineMax.to(smokeCube.scale, Math.random()*10, {
                        x: Math.random() * 2,
                        y: Math.random() * 2,
                        z: Math.random() * 2,
                        ease: Expo.easeInOut
                    });
                    */

                    smokeCube.scale.set(Math.random() * 2,Math.random() * 2,Math.random() * 2);
                    /*
                    timelineMax.to(smokeCube.position, Math.random()*10, {
                        x: Math.random() * 0.2,
                        y: Math.random() * 0.2,
                        z: -10 * Math.random() * 2,
                        ease: Expo.easeInOut
                    });
                     
 
                    timelineMax.to(smokeCube.rotation, Math.random()*10, {
                        x: Math.random() * 360,
                        y: Math.random() * 360,
                        z: Math.random() * 360,
                        ease: Expo.easeInOut
                    });
                    */
                     
                     
                    smokeCube.position.set(
                        Math.random() * 0.2,
                        Math.random() * 0.2,
                        -10 * Math.random() * 2 
                    );
                    smokeCube.rotation.set(Math.random() * 360,Math.random() * 360,Math.random() * 360);
                     
                    console.log("smoke pos updated...");
    
                });
                 
            }, 5000
   
        );
        
        clearInterval(test_interval);
 
         
    }, []);
 
    
     
     
  
    
 

  return (
    <>   
    </>
    );
}

export default SmokeBgView;

