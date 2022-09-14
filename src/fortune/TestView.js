import './css/fortune.css';
import React, { useContext, useRef } from 'react';
import { useState, useEffect } from 'react';
import * as THREE from 'three';
import { TimelineMax, Expo } from 'gsap';
import { FortuneHubContext } from './model/ImportLib';
import FortuneConstants from './model/FortuneConstants';
 
function TestView(props) {
   
    const fortuneHubContext = useContext(FortuneHubContext);

    const [singleGeometry, setSingleGeometry] = useState(new THREE.Group());
    //
    const [geometry, setGeometry] = useState(new THREE.BoxGeometry( 0.01, 0.01, 0.01 ));
    const [material, setMaterial] = useState(new THREE.MeshBasicMaterial( { color: 0x00ff00 } ));
    
    //
    const [cube, setCube] = useState(new THREE.Mesh( geometry, material ));
    const [renderer, setRenderer] = useState(new THREE.WebGLRenderer({antialias:true}));
    const [animateState, setAnimateState] = useState(false);

    //
    const [testGeometry, setTestGeometry] = useState(new THREE.PlaneGeometry( 0.050*2, 0.1*2  ));
    const [testMaterial, setTestMaterial] = useState( new THREE.MeshBasicMaterial({
    	map: props.textureLoader.load(FortuneConstants.getPaperTexture(1)),
  	}) );
    const [testCube, setTestCube] = useState(new THREE.Mesh( testGeometry, testMaterial ));

 /*
    useEffect(()=>{

        console.log("child::props.domEvents==", props.domEvents);
         
        props.domEvents.addEventListener(testCube, 'click', function(event){
            console.log('you clicked on testCube', testCube);
            props.onSelectObjRequested(testCube);
        }, false);

    }, []);
    */
 
     
    function initPaper() {

        console.log("TESTVIEW::initPaper");

        singleGeometry.clear();

        var mesh1 = new THREE.Mesh( testGeometry, testMaterial );
        var mesh2 = new THREE.Mesh( testGeometry, testMaterial );

        console.log("position==", mesh1.position);

        let r = 0.01;
        mesh1.position.set ( mesh1.position.x - mesh1.geometry.parameters.width / 2, -0.1);
        mesh2.position.set ( mesh2.position.x + mesh2.geometry.parameters.width / 2, 0);
        //mesh1.position.setX(0.01);
 
        console.log("position==", mesh1.geometry.parameters.width);
        
         

         
           
        singleGeometry.add(mesh1);
        singleGeometry.add(mesh2);
         
        props.scene.add(singleGeometry);


        singleGeometry.position.set ( 0.03, 0.03, -1);
 
        /*
        props.domEvents.addEventListener(singleGeometry, 'click', function(event){
            console.log('you clicked on singleGeometry', singleGeometry);
            props.onSelectObjRequested(singleGeometry);
        }, false);
        */
        props.domEvents.addEventListener(mesh1, 'click', function(event){
            console.log('!!you clicked on mesh1', mesh1);
            props.onSelectObjRequested(mesh1);
        }, false);

        props.domEvents.addEventListener(mesh2, 'click', function(event){
            console.log('!!you clicked on mesh2', mesh2);
            props.onSelectObjRequested(mesh2);
        }, false);
 
    }

    
     

      
    useEffect(()=>{

        fortuneHubContext.subscribeHitCylinderEvent((res)=>{
            
            console.log("TESTVIEW::subscribeHitCylinderEvent == ", res);
            
            if (res.isFinished == false) {
                console.log("TESTVIEW::isFinished", res.isFinished);
                //singleGeometry.visible = false;
            }
            else {
                //singleGeometry.visible = true;
                initPaper();
                console.log("TESTVIEW::initPaper::isFinished", res.isFinished);
            }
        });
    });

 

    function onClicked() {
        console.log("onClicked...");
        
        cube.rotation.x += 0.1;
        cube.rotation.y += 0.1;
    }
    function onAnimateClicked() {
        console.log("onClicked...");
        setAnimateState(!animateState);
    }
    
 

  return (
    <>    
    </>
    );
}

export default TestView;

