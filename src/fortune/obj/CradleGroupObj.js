import * as THREE from 'three';
import FortuneConstants from '../model/FortuneConstants';
 
import FireObj from './FireObj';
import CradleBaseObj from './CradleBaseObj';

export default class CradleGroupObj {

    scene;
    debugContext;
    FortuneHub
    textureLoader;
    domEvents;

    cradleGroupObj = new THREE.Group();
    cradleBaseObj;
    fireObj_middle;
    fireObj_left;
    fireObj_right;
    

    constructor(scene, textureLoader, fortuneHub, debugContext, domEvents) {

        let me = this;
        
        this.scene = scene;
        this.debugContext = debugContext;
        this.textureLoader = textureLoader;
        this.fortuneHub = fortuneHub;
        this.domEvents = domEvents;

 
        
        me.fireObj_left = new FireObj(scene, textureLoader, fortuneHub, debugContext, domEvents);
        me.fireObj_right = new FireObj(scene, textureLoader, fortuneHub, debugContext, domEvents);
        me.fireObj_middle = new FireObj(scene, textureLoader, fortuneHub, debugContext, domEvents);
        me.cradleBaseObj = new CradleBaseObj(scene, textureLoader, fortuneHub, debugContext, domEvents);

         
        //
        me.cradleGroupObj.add(me.fireObj_left.particles);
        me.cradleGroupObj.add(me.fireObj_left.middleCylinderMesh);
        me.cradleGroupObj.add(me.fireObj_left.lowerCylinderMesh);
        //
        me.fireObj_left.translateGroupXby(-FortuneConstants.cradle_base_w / 4);
         
        //
        me.cradleGroupObj.add(me.fireObj_right.particles);
        me.cradleGroupObj.add(me.fireObj_right.middleCylinderMesh);
        me.cradleGroupObj.add(me.fireObj_right.lowerCylinderMesh);
        //
        me.fireObj_right.translateGroupXby(FortuneConstants.cradle_base_w / 4);
         
        //
         
        me.cradleGroupObj.add(me.fireObj_middle.particles);
        me.cradleGroupObj.add(me.fireObj_middle.middleCylinderMesh);
        me.cradleGroupObj.add(me.fireObj_middle.lowerCylinderMesh);
        //
        me.cradleGroupObj.add(me.cradleBaseObj.cradleBaseMesh);
 
        //
        me.cradleBaseObj.cradleBaseMesh.position.set(0, FortuneConstants.cradle_base_h / 2 ,0);
        //me.fireObj.fireMesh.position.set(0, FortuneConstants.cradle_base_h ,0);

        scene.add(me.cradleGroupObj);
          
        //
        me.domEvents.addEventListener(me.cradleGroupObj, 'click', function(event){
            console.log('!!you clicked on cradleGroupObj', me.cradleGroupObj);
            me.debugContext.selectedObj = me.cradleGroupObj;
              
        }, false);

        console.log("cradleGroupObj...50...");

        me.initPos();
    }

    initPos() {
        this.cradleGroupObj.position.set(0,0,-20);
    }
     

}