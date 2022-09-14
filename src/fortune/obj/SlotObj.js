import * as THREE from 'three';
import FortuneConstants from '../model/FortuneConstants';
import { TimelineMax, Expo } from 'gsap';

export default class SlotObj {

    textureLoader;
    fortuneHub;
    debugContext;
    domEvents;
    slotTexture;
    slotGeometry;
    slotMaterial;
    slotMesh;

    constructor(textureLoader, fortuneHub, debugContext, domEvents, slotGeometry, slotMaterial, onSelectObjRequested) {

        // console.log("slotobj::textureLoader==", textureLoader);
        // console.log("slotobj::debugContext==", debugContext);
        // console.log("slotobj::domEvents==", domEvents);

        let me = this;

        this.textureLoader = textureLoader;
        this.fortuneHub = fortuneHub;
        this.debugContext = debugContext;
        this.domEvents = domEvents;
        this.onSelectObjRequested = onSelectObjRequested;

        this.slotGeometry = slotGeometry;
        this.slotMaterial = slotMaterial;

        // 
        me.slotMesh = new THREE.Mesh( me.slotGeometry, me.slotMaterial );
 
        /*
          me.domEvents.addEventListener(me.slotMesh, 'click', function(event){
            console.log('!!you clicked on this.slotMesh', me.slotMesh);
 
            me.debugContext.selectedObj = me.slotMesh;
            me.onSelectObjRequested(me.slotMesh);
        }, false);
        */
    }

    initPos(x, y, z) {
        this.slotMesh.position.set (x, y, z);       
    }
 
}

