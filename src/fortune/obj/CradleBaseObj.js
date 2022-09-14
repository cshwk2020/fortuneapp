

import * as THREE from 'three';
import FortuneConstants from '../model/FortuneConstants';
 
export default class CradleBaseObj {

    scene;
    debugContext;
    FortuneHub
    textureLoader;
    domEvents;

    cradleBaseGeometry;
    cradleBaseMaterial_front;
    cradleBaseMaterial_side;
    cradleBaseMesh;

    constructor(scene, textureLoader, fortuneHub, debugContext, domEvents) {

        let me = this;
        
        this.scene = scene;
        this.debugContext = debugContext;
        this.textureLoader = textureLoader;
        this.fortuneHub = fortuneHub;
        this.domEvents = domEvents;


        console.log("CradleBaseObj...0...");

 

        me.cradleBaseGeometry = new THREE.BoxGeometry( FortuneConstants.cradle_base_w,
            FortuneConstants.cradle_base_h,
            FortuneConstants.cradle_base_l  );

            console.log("CradleBaseObj...10...");


             

            me.cradleBaseMaterial_front = new THREE.MeshBasicMaterial({
            map: me.textureLoader.load(FortuneConstants.getCradleBaseFrontTexture()),
            transparent: true,
            
          });

            
          console.log("CradleBaseObj...20...");
          me.cradleBaseMaterial_side = new THREE.MeshBasicMaterial({
            map: me.textureLoader.load(FortuneConstants.getCradleBaseSideTexture()),
            transparent: true
          });
             

        /*
        this.cradleBaseMesh = new THREE.Mesh( this.cradleBaseGeometry, [
            this.cradleBaseMaterial_side,
            this.cradleBaseMaterial_front,
            this.cradleBaseMaterial_side,
            this.cradleBaseMaterial_side,
            this.cradleBaseMaterial_front,
            this.cradleBaseMaterial_side,
         ] );
         */
         
         

         me.cradleBaseMesh = new THREE.Mesh(me.cradleBaseGeometry, me.cradleBaseMaterial_front );
      
         console.log("CradleBaseObj...40...", me.domEvents, me.debugContext);

          
        //
        me.domEvents.addEventListener(me.cradleBaseMesh, 'click', function(event){
            console.log('!!you clicked on cradleBaseMesh', me.cradleBaseMesh);
            me.debugContext.selectedObj = me.cradleBaseMesh;
              
        }, false);

        console.log("CradleBaseObj...50...");

        //me.initPos();
    }

    initPos() {
        this.cradleBaseMesh.position.set(0,0,-10);
    }
     

}