
import * as THREE from 'three';
import FortuneConstants from '../model/FortuneConstants';
import StickObj from './StickObj';

export default class StickGroupObj {

    onSelectObjRequested = ()=>{};

    textureLoader;
    stickGeometry;
    stickMaterial;
    stickObjList = [];

    constructor(textureLoader) {
 
        this.textureLoader = textureLoader;
        this.stickGeometry = new THREE.PlaneGeometry(FortuneConstants.stick_w,FortuneConstants.stick_h);
        this.stickMaterial = new THREE.MeshBasicMaterial({
            map: textureLoader.load(FortuneConstants.getStickTexture()),
            side: THREE.DoubleSide,
            transparent: true
          });
          //
          this.initStickList();
          
    }

    initStickList() {

        for (let i=0; i < 100; i++) {
            let stickObj = new StickObj( this.stickGeometry, this.stickMaterial );
            this.stickObjList.push(stickObj);
            stickObj.initPos();

            //console.log("...", this.stickObjList.length, stickObj);
        }
    }

    randomizeAllSticksPos() {

        this.stickObjList.forEach(stickObj => {
            stickObj.randomizePosition();
        });
    }
     

}

