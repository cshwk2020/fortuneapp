import './css/fortune.css';
import React, { useContext, useRef } from 'react';
import { useState, useEffect } from 'react';
import * as THREE from 'three';
import { TimelineMax, Expo } from 'gsap';
import { FortuneHubContext, DebugContext } from './model/ImportLib';
import SpecialStickObj from './obj/SpecialStickObj'; 
import CylinderObj from './obj/CylinderObj';
import StickGroupObj from './obj/StickGroupObj';
import CylinderObjGroup from './obj/CylinderGroup';
import SlotGroup from './obj/SlotGroup';
import SlotObj from './obj/SlotObj';
import FireObj from './obj/FireObj';
import CradleBaseObj from './obj/CradleBaseObj';
import CradleGroupObj from './obj/CradleGroupObj';

function UnitTestView(props) {
    const debugContext = useContext(DebugContext);
    const fortuneHubContext = useContext(FortuneHubContext);
     
    /*
    const [slotGroup, setSlotGroup] = useState(
        new SlotGroup(props.textureLoader,  fortuneHubContext, debugContext, props.domEvents, (obj)=>{
            console.log('SlotGroup...onClick...');
             
        })
    ); 
    */
   
    /*
    const [fireObj, setFireObj] = useState(
        new FireObj(props.scene, props.textureLoader, fortuneHubContext)
    ); 
    */
   
     

    useEffect(()=>{

        /*
        let fireObj = new FireObj(props.scene, props.textureLoader, fortuneHubContext, debugContext, props.domEvents);
        //props.scene.add(fireObj.fireMesh);
        fireObj.init();

        console.log("fireObj init...");
        */

         

        /*
        let cradleBaseObj = new CradleBaseObj(props.scene, props.textureLoader, fortuneHubContext, debugContext, props.domEvents);
        
        console.log("debug...0...::", props);
        console.log("debug...10...::", props.scene);
        console.log("debug...20...::", cradleBaseObj);

        props.scene.add(cradleBaseObj.cradleBaseMesh);
        //cradleBaseObj.initPos();
        */

        let cradleGroupObj = new CradleGroupObj(props.scene, props.textureLoader, fortuneHubContext, debugContext, props.domEvents);
        
        console.log("debug...0...::", props);
        console.log("debug...10...::", props.scene);
        console.log("debug...20...::", cradleGroupObj);

        props.scene.add(cradleGroupObj.cradleGroupObj);
        //cradleBaseObj.initPos();



        //props.scene.add(slotGroup.singleGeometry);
        //slotGroup.singleGeometry.position.set(0, -0.1, -2);


        //props.scene.add(specialStickObj.stickMesh);
        //specialStickObj.stickMesh.position.set(0, 0, -2);

        //props.scene.add(cylinderObj.cylinderMesh);
        //cylinderObj.cylinderMesh.position.set(0, 0, -2);

        //props.scene.add(cylinderObj.bottomMesh);
        //cylinderObj.bottomMesh.position.set(0, 0, -2);

        /*
        console.log(stickGroupObj.stickObjList.length, stickGroupObj.stickObjList);
   
        if (stickGroupObj && stickGroupObj.stickObjList) {

            for (let i=0; i < stickGroupObj.stickObjList.length; i++) {
                let stickObj = stickGroupObj.stickObjList[i];
                console.log(stickObj);

                props.scene.add(stickObj.stickMesh);
                stickObj.stickMesh.position.set(0 + i * 0.01, 0 + i * 0.01, -2);

            }
            
        }
        */
          
    }, [ ]);

    return (
        <>    
        </>
    );
}

export default UnitTestView;

