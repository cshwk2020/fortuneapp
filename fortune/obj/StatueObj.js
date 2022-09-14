import * as THREE from 'three';
import FortuneConstants from '../model/FortuneConstants';

export default class StatueObj {

    textureLoader;
    statueGeometry;
    statueMaterial;
    statueMesh;

    constructor(textureLoader) {

        this.textureLoader = textureLoader;
        this.statueGeometry = new THREE.PlaneGeometry( 0.65*5, 1*5  );
        this.statueMaterial = new THREE.MeshBasicMaterial({
            map: this.textureLoader.load(FortuneConstants.getStatueTexture()),
            transparent: true
          });
        this.statueMesh = new THREE.Mesh( this.statueGeometry, this.statueMaterial );
      
    }
     

}