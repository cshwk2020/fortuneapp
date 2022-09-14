import './css/fortune.css';
import React, { useRef } from 'react';
import { useState, useEffect, useContext } from 'react';
import * as THREE from 'three';
import { TimelineMax, Expo } from 'gsap';
import FortuneConstants from './model/FortuneConstants';
import { FortuneHubContext } from './model/ImportLib';
import CylinderGroup from './obj/CylinderGroup';

 
function DrawingToolView(props) {
   
    const bounded_h_adjust = ((FortuneConstants.stick_h - FortuneConstants.cylinder_h) / 2);

    const fortuneHubContext = useContext(FortuneHubContext);
 
     
    const [singleGeometry, setSingleGeometry] = useState(new THREE.Group());
    const [texture, setTexture] = useState(props.textureLoader.load(FortuneConstants.getWoodTexture()));
    const [stickTexture, setStickTexture] = useState(props.textureLoader.load(FortuneConstants.getStickTexture()));
    const [specialStickTexture, setSpecialStickTexture] = useState(props.textureLoader.load(FortuneConstants.getSpecialStickTexture()));
  
    //
    const [cylinderGeom, setCylinderGeom] = useState(new THREE.CylinderGeometry(FortuneConstants.r, FortuneConstants.r, FortuneConstants.cylinder_h, 50, 1, true, 0, 2* Math.PI));
    const [cylinderMat, setCylinderMat] = useState( 
        new THREE.MeshBasicMaterial({
            map: texture,
            side: THREE.DoubleSide
          }) 
    );
    const [cylinderMesh, setCylinderMesh] = useState(new THREE.Mesh( cylinderGeom, cylinderMat ));
  

    //
    const [bottomGeom, setBottomGeom] = useState(new THREE.CylinderGeometry(FortuneConstants.r, FortuneConstants.r, FortuneConstants.bottom_h, 50, 1, false, 0, 2* Math.PI));
    const [bottomMat, setBottomMat] = useState( 
        new THREE.MeshBasicMaterial({
            map: texture 
          }) 
    );
    const [bottomMesh, setBottomMesh] = useState(new THREE.Mesh( bottomGeom, bottomMat ));
     
    //
    const [stickGeom, setStickGeom] = useState(new THREE.PlaneGeometry(FortuneConstants.stick_w,FortuneConstants.stick_h));
    const [stickMat, setStickMat] = useState( 
        new THREE.MeshBasicMaterial({
            map: stickTexture,
            side: THREE.DoubleSide
          }) 
    );
    const [stickMeshList, setStickMeshList] = useState([]);
      
    //
    const [specialStickMat, setSpecialStickMat] = useState( 
        new THREE.MeshBasicMaterial({
            map: specialStickTexture,
            side: THREE.DoubleSide
          }) 
    );
    const [specialStickMesh, setSpecialStickMesh] = useState(new THREE.Mesh( stickGeom, specialStickMat ));
     
    const specialStick_min_y = bounded_h_adjust;
    const specialStick_max_y = bounded_h_adjust + 0.1; // 0.3;

    //
    //const [timelineRecord, setTimelineRecord] = useState();
    
/*
    useEffect(()=>{
        const cylinderGroupObj = new CylinderGroup(props.textureLoader, props.domEvents, (cylinderGroupObj)=>{
            //cylinderGroupObj.singleGeometry;
        });
        setSingleGeometry(cylinderGroupObj);
    });
*/


           

    //
    function randomizeAllSticksPos() {

        console.log("randomizeAllSticksPos...0...");
        stickMeshList.forEach(stickMesh => {
               
            let rand_x = FortuneConstants.getRandomNumFromRange(-0.5, 0.5) * FortuneConstants.r ;
            let rand_y = FortuneConstants.getRandomNumFromRange(0, 1) * FortuneConstants.r ;
            let rand_z = FortuneConstants.getRandomNumFromRange(-0.5, 0.5) * FortuneConstants.r ;

         
            const timelineMax = new TimelineMax({
                paused: false 
            });
           
                    
            timelineMax.to(stickMesh.position, FortuneConstants.CYLINDER_VIBRATE_DURATION, {
                        x: rand_x,
                        y: (bounded_h_adjust + rand_y),
                        z: rand_z,
                        ease: Expo.easeInOut
            });

        });
    }


    //// SpecialStick
    function isSpecialStickMaxHeightReached(h) {
        return (specialStickMesh.position.y > FortuneConstants.specialStick_max_y);  
    }


    //// SpecialStick
    function updateSpecialStickPos() {
        console.log("updateSpecialStickPos...0...");
        
        if (fortuneHubContext.isCurrentRoundFinished == true) {
            return;
        }
    

            let rand_y = FortuneConstants.getRandomNumFromRange(-0.01 * 2, 0.03 * 2);

            console.log("specialStickMesh.position.y == ", specialStickMesh.position.y);

            if (specialStickMesh.position.y + rand_y > specialStick_min_y) {
                    
                    const timelineMax = new TimelineMax({
                        paused: false 
                    });

                    timelineMax.to(specialStickMesh.position, FortuneConstants.CYLINDER_VIBRATE_DURATION, {
                        x: specialStickMesh.position.x,
                        y: specialStickMesh.position.y + rand_y,
                        z: specialStickMesh.position.z,
                        ease: Expo.easeInOut
                    });
            }
            else {
                console.log("---> REACH MIN HEIGHT");
 
            }
         
    }



    //// CYLINDER_GROUP
    const handleVibrateObserver = (res)=>{
        console.log("DrawingToolView :: subscribeHitCylinderEvent :: ", JSON.stringify(res));

        if (fortuneHubContext.isCurrentRoundFinished == true) {
            return;
        }

        updateSpecialStickPos();

        const timelineMax = new TimelineMax({
            paused: false,
            onComplete: () => {
                console.log("onComplete", timelineMax);

                const reverseTimelineMax = new TimelineMax({
                    paused: false 
                });

                reverseTimelineMax.to(singleGeometry.rotation, FortuneConstants.CYLINDER_VIBRATE_DURATION, {
                    x: 20 * Math.PI / 180,
                    y: singleGeometry.rotation.y,
                    z: singleGeometry.rotation.z,
                    ease: Expo.easeInOut
                });

                randomizeAllSticksPos();
            }
        });

        //
        timelineMax.to(singleGeometry.rotation, FortuneConstants.CYLINDER_VIBRATE_DURATION, {
                    x: - 30 * Math.PI / 180,
                    y: singleGeometry.rotation.y,
                    z: singleGeometry.rotation.z,
                    ease: Expo.easeInOut
        });
           
    };

    // subscribeDebugButtonEvent
    useEffect(()=>{
        fortuneHubContext.subscribeDebugButtonEvent(handleVibrateObserver);

        fortuneHubContext.subscribeHitCylinderEvent((res)=>{


            handleVibrateObserver(res);
        });

    }, []);

 
     
    
    // update Effect
    useEffect(()=>{
  
        //var stickMeshList = [];
        for (let i=0; i < 100; i++) {
            let stickMesh = new THREE.Mesh( stickGeom, stickMat );
            let rand_x = FortuneConstants.getRandomNumFromRange(-0.5, 0.5) * FortuneConstants.r ;
            let rand_y = FortuneConstants.getRandomNumFromRange(0, 1) * FortuneConstants.r ;
            let rand_z = FortuneConstants.getRandomNumFromRange(-0.5, 0.5) * FortuneConstants.r ;
            //let bounded_h_adjust = ((FortuneConstants.stick_h - FortuneConstants.cylinder_h) / 2);
            stickMesh.position.set ( rand_x, rand_y + bounded_h_adjust , rand_z);
            //stickMesh.rotation.y = rand_rotate;
             
            //stickMeshList.push(stickMesh);
            stickMeshList.push(stickMesh);
        }

        //
        specialStickMesh.position.set ( 0, bounded_h_adjust , 0);

        //
        bottomMesh.position.set ( 0, -(FortuneConstants.cylinder_h / 2), 0);
          
        //
        //props.scene.add(cylinderMesh);
        cylinderMesh.position.set ( 0, 0, 0);
 
        
         

        //
         
           
        singleGeometry.add(cylinderMesh);
        singleGeometry.add(bottomMesh);
        stickMeshList.forEach((stickMesh)=>{
            singleGeometry.add(stickMesh);
            //console.log("added stickMesh...", stickMesh);
        });
        singleGeometry.add(specialStickMesh);
         
         
        props.scene.add(singleGeometry);
        singleGeometry.position.set ( 0, -0.1, -2);
        singleGeometry.rotation.set ( 10 * Math.PI / 180 , 0, 0);

        props.domEvents.addEventListener(singleGeometry, 'click', function(event){
            console.log('!!you clicked on singleGeometry', singleGeometry);
            props.onSelectObjRequested(singleGeometry);

            //
            hitCylinder();
              
        }, false);

 
    }, []);

    function hitCylinder() {

        console.log("0::hitCylinder...");

        if (isSpecialStickMaxHeightReached()) {
            fortuneHubContext.hitCylinder(true);
        }
        else {
            fortuneHubContext.hitCylinder(false);
        }
         
    }
   

    useEffect(()=>{
 
        /*
        var geom = new THREE.CylinderGeometry(0.1, 0.1, 0.3, 16, 1);
        
        var cylinder = new THREE.Mesh(geom, new THREE.MeshBasicMaterial({
        color: "aqua",
        wireframe: true
        }));

        cylinder.position.set ( 0, 0, -2);

        props.domEvents.addEventListener(cylinder, 'click', function(event){
            console.log('!!you clicked on cylinder', cylinder);
            props.onSelectObjRequested(cylinder);
        }, false);


        props.scene.add(cylinder);
        */

    },[]);


       
    function onClicked() {
        console.log("onClicked...");
        
    }
     
    
 

  return (
    <>    
    </>
    );
}

export default DrawingToolView;

