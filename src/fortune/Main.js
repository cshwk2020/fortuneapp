import './css/fortune.css';
import React from 'react';
import { useState, useEffect, useRef, useContext } from 'react';
import * as THREE from 'three';
import { TimelineMax, Expo } from 'gsap';
import StatueView from './StatueView';
import SmokeBgView from './SmokeBgView';
import TestView from './TestView';
import DebugTabbedContainer from './debug/DebugTabbedContainer';
import { SelectObjContext } from './debug/DebugIndex';
import DrawingToolView from './DrawingToolView';
import LuckStickView from './LuckStickView';
import { FortuneHubContext, fortuneHubInstance, DebugContext, debugInstance } from './model/ImportLib';
import PaperDrawerView from './PaperDrawerView';
import UnitTestView from './UnitTestView';
import CylinderObjGroup from './obj/CylinderGroup';
import SlotObj from './obj/SlotObj';
import SlotGroup from './obj/SlotGroup';
import PaperObj from './obj/PaperObj';
import CradleGroupObj from './obj/CradleGroupObj';
import FortuneConstants from './model/FortuneConstants';

var initializeDomEvents = require('threex-domevents');

 
function Main(props) {
 
    const [paperReadyState, setPaperReadyState] = useState(false);

    //const fortuneHubContext = useContext(FortuneHubContext);
  
    //const [selectedObj, setSelectedObj] = useState(null);
     
    //const debugContext = useContext(DebugContext);

    const testViewRef = useRef();
    const canvasRef = useRef();
    const [THREEx, setThreex] = useState({});
     
    const [scene, setScene] = useState(new THREE.Scene());
    const [camera, setCamera] = useState(new THREE.PerspectiveCamera( 25, window.innerWidth/window.innerHeight, 1, 100 ));
    const [lightSource, setLightSource] = useState(new THREE.PointLight(0xffffff, 1, 500));
     
     
    const [geometry, setGeometry] = useState(new THREE.BoxGeometry( 0.01, 0.01, 0.01 ));
    const [material, setMaterial] = useState(new THREE.MeshBasicMaterial( { color: 0x00ff00 } ));
    
    //const [cube, setCube] = useState(new THREE.Mesh( geometry, material ));
    const [renderer, setRenderer] = useState(new THREE.WebGLRenderer({antialias:true}));
    const [animateState, setAnimateState] = useState(false);

    const [textureLoader, setTextureLoader] = useState(new THREE.TextureLoader());
    const [timelineMax, setTimelineMax] = useState(new TimelineMax({paused: false}));

    var [domEvents, setDomEvents] = useState(null);

    //
    const [cylinderObjGroup, setCylinderObjGroup] = useState(); 
    const [slotGroup, setSlotGroup] = useState(); 
    const [slotObj, setSlotObj] = useState(); 
    const [paperObj, setPaperObj] = useState(); 
    let [cradleGroupObj, setCradleGroupObj ] = useState();
    const [raycaster, setRaycaster] = useState(new THREE.Raycaster()); 

    useEffect(() => {
  
         
        


        initializeDomEvents(THREE, THREEx);

        document.body.appendChild( renderer.domElement );
        //canvasRef.current.appendChild( renderer.domElement );

        renderer.setSize( window.innerWidth, window.innerHeight );
        camera.position.z = 0;

          
        //
        const _domEvents = new THREEx.DomEvents(camera, renderer.domElement);
        setDomEvents (_domEvents);
           

        //
         
        const cylinderObjGroup = new CylinderObjGroup(textureLoader,  fortuneHubInstance, debugInstance, _domEvents, (obj)=>{
            console.log('cylinderObjGroup...onClick...');
            //props.onSelectObjRequested(obj);
        })
        scene.add(cylinderObjGroup.singleGeometry);
        //cylinderObjGroup.singleGeometry.position.set(0, -0.1, -2);
        cylinderObjGroup.initPos();
        setCylinderObjGroup(cylinderObjGroup);
         
        //
        fortuneHubInstance.registerCylinderGroup(cylinderObjGroup);
         

        //
        const cradleGroupObj = new CradleGroupObj(scene, textureLoader, fortuneHubInstance, debugInstance, _domEvents);
        setCradleGroupObj(cradleGroupObj);
        scene.add(cradleGroupObj.cradleGroupObj);
        
        /*
        const slotObj = new SlotObj(textureLoader, fortuneHubInstance, debugInstance, _domEvents, "", "", (obj)=>{
            console.log('slotObj...onClick...');
             
        });
        scene.add(slotObj.slotMesh);
        slotObj.slotMesh.position.set(0, -0.1, -2);
        setSlotObj(slotObj);
        */

        
        const slotGroup = new SlotGroup(scene, textureLoader, fortuneHubInstance, debugInstance, _domEvents, (obj)=>{
            console.log('slotGroup...onClick...');
             
        });
        scene.add(slotGroup.singleGeometry);
        slotGroup.initPos();
        setSlotGroup(slotGroup);
        //
        fortuneHubInstance.registerSlotGroup(slotGroup);
        

        /*
        const paperObj = new PaperObj(textureLoader, fortuneHubInstance, debugInstance, _domEvents, "", "", 1,  (obj)=>{
            console.log('paperObj...onClick...');
             
        });
        scene.add(paperObj.paperMesh);
        paperObj.paperMesh.position.set(0, -0.1, -2);
        setPaperObj(paperObj);

        paperObj.up();
        paperObj.down();
        */

   
        //
        renderer.setClearColor(0x333F47, 1);
         
        lightSource.position.set(0,1,-1);
        scene.add( lightSource );
        
 
        render();


        //
        window.addEventListener('resize', ()=>{
            renderer.setSize( window.innerWidth, window.innerHeight );
            camera.aspect = window.innerWidth/window.innerHeight;
            camera.updateProjectionMatrix();
            
        });



        //

        
        // 3d mouse
        window.addEventListener('touchend', onMouseDown, false);
        function onMouseDown( event ){
            //event.preventDefault();

             
            var br = document.getElementsByTagName("canvas")[0].getBoundingClientRect();
            var x = event.changedTouches[0].pageX; // event.touches[0].clientX - br.left;
            var y = event.changedTouches[0].pageY; // event.touches[0].clientY - br.top;
            console.log("x: " + x + " y: " + y);

            
            let objects = [ ...slotGroup.paperObjList.map((o)=>o.paperMesh), cylinderObjGroup.cylinderObj.cylinderMesh ];
            
            let e = event.touches[0];
            console.log("GLOBAL::DOCUMENT::onMouseDown...0...", event, window);

            
            // x
            var mouse = new THREE.Vector2();
            //mouse.x = x; // ( event.clientX / window.innerWidth ) * 2 - 1;
            //mouse.y = y; // - ( event.clientY / window.innerHeight ) * 2 + 1;
            mouse.x = ( x / window.innerWidth ) * 2 - 1;
            mouse.y = - ( y / window.innerHeight ) * 2 + 1;


            const raycaster = new THREE.Raycaster()
            raycaster.setFromCamera(mouse, camera)
            const intersects = raycaster.intersectObjects(objects);

            console.log("GLOBAL::DOCUMENT::onMouseDown...10...", intersects);

            if(intersects.length > 0){
                for ( var i = 0; i < intersects.length; i++ ) {
                     
                    const name = intersects[ i ].object.name;
                    console.log("GLOBAL::DOCUMENT::name...20...", name);
                    if (name && name == FortuneConstants.NAME_CYLINDER) {
                        cylinderObjGroup.hitCylinder();
                    }
                    else if (name && name.startsWith(FortuneConstants.NAME_PAPER)) {
                        console.log("GLOBAL::DOCUMENT::name.split('_')...30...", name.split('_'));
                        const paper_num = parseInt(name.split('_')[1]);
                         
                        console.log("GLOBAL::DOCUMENT::paper_num...40...", paper_num);

                        slotGroup.paperObjList[paper_num - 1].actionHandler(event);
                    }
                    else {
                        intersects[ i ].object.material.color.set( 0xff0000 );

                    }
                }
            }
             
        }
       


        //
        /*
        var raycaster = new THREE.Raycaster();
        var mouse = new THREE.Vector2();
         
        function onMouseMove( event ) {
   
            const mouse3D = new THREE.Vector3(
                (event.clientX / window.innerWidth) * 2 - 1,
                -(event.clientY / window.innerheight) * 2 - 1,
                0.5
              );
            
                mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
                mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;

                console.log("!!!...onMouseMove...x,y == ", mouse.x, mouse.y);

                raycaster.setFromCamera( mouse, camera );
              var intersects = raycaster.intersectObjects(mouse, scene.children );
 
              console.log("!!!...onMouseMove...intersects == ", intersects);
            for ( var i = 0; i < intersects.length; i++ ) {
                intersects[ i ].object.material.color.set( 0xff0000 );
            }

        }
       
        
        window.addEventListener( 'click', onMouseMove, false );
        */
 
         
    }, []);
 

    useEffect(()=>{

        if (animateState && debugInstance.selectedObj) {

            const testSubject = debugInstance.selectedObj;

            const timer = setInterval(()=>{

                console.log("animate timer called...", testSubject);
                testSubject.rotation.z += 0.1;
  
            }, (1000));

            return ()=>{
                clearInterval(timer);
                console.log("timer cleared...");
            };
        }

    }, [ animateState, debugInstance.selectedObj ]);

    

    
     

    //
    function render() {
        requestAnimationFrame( render );
 
         
        //setPosState({...selectObj.position, 'x': selectObj.position.x + 0.001});
        /*
        if (debugInstance.selectedObj) {
            debugInstance.selectedObj.singleGeometry.position.x = debugInstance.selectedObj.singleGeometry.position.x + 0.001;
            console.log("selectedObj.position.x == ", debugInstance.selectedObj.singleGeometry.position.x);
        }
        */
        
         
        renderer.render( scene, camera );
    }
 
     

    function startAnimate() {
        setAnimateState(true);
    }

    function pauseAnimate() {
        setAnimateState(false);
    }

    function onClicked() {
        console.log("onClicked...");
        testViewRef.current.onClicked()
        //cube.rotation.x += 0.1;
        //cube.rotation.y += 0.1;
    }
    function onAnimateClicked() {
        console.log("onClicked...");
        setAnimateState(!animateState);
    }
    
    // debug control panel
    function changeSelectedObj(obj) {
        console.log("CHANGE_SELECT_OBJ...obj==", obj);
        debugInstance.setSelectedObj(obj);
    }

    /*
    <SmokeBgView scene={ scene } textureLoader={ textureLoader }></SmokeBgView>
    <StatueView scene={ scene } textureLoader={ textureLoader }></StatueView>
        
    */

  return (
 
   
    <FortuneHubContext.Provider value={ fortuneHubInstance }>
        <DebugContext.Provider value={debugInstance}>

            <div className="app"> 
                
                {/* 
                    {domEvents && <TestView  scene={ scene } domEvents={ domEvents } onSelectObjRequested = { changeSelectedObj } textureLoader={ textureLoader }></TestView>}
                */}  
                {/* 
                {domEvents && <DrawingToolView  scene={ scene } domEvents={ domEvents } onSelectObjRequested = { changeSelectedObj } textureLoader={ textureLoader }></DrawingToolView>}
                 
                { domEvents && <TestView  scene={ scene } domEvents={ domEvents } onSelectObjRequested = { changeSelectedObj } textureLoader={ textureLoader }></TestView>}
                */}  
 
                {/*
                { domEvents && textureLoader && <PaperDrawerView scene={ scene } domEvents={ domEvents } textureLoader={ textureLoader } onSelectObjRequested = { changeSelectedObj } ></PaperDrawerView> }               
                 */}

                {/*
                {domEvents && <DrawingToolView  scene={ scene } domEvents={ domEvents } onSelectObjRequested = { changeSelectedObj } textureLoader={ textureLoader }></DrawingToolView>}
                
                {domEvents && <UnitTestView  scene={ scene } domEvents={ domEvents } onSelectObjRequested = { changeSelectedObj } textureLoader={ textureLoader }></UnitTestView>}
                 
                <DebugTabbedContainer ></DebugTabbedContainer>
 
                */}


                <SmokeBgView scene={ scene } textureLoader={ textureLoader }></SmokeBgView>
                <StatueView scene={ scene } textureLoader={ textureLoader }></StatueView>
       
                
                  
                 
                <div className="app-title">
                    <div className='text-rotate unselectable'>觀音娘娘賜籤</div>
                     {/*
                    <button  onClick={ onClicked }>rotate</button>
                    <button onClick={ onAnimateClicked }>Animate</button>
                    */}
                </div>
                
                
                <div ref={ canvasRef }>             
                </div>

                {/*
                 
                <DebugTabbedContainer ></DebugTabbedContainer>
 
                */}

                 
            </div>
 
        </DebugContext.Provider>
    </FortuneHubContext.Provider>

     
     
    );
}

export default Main;

