import * as THREE from 'three';
import FortuneConstants from '../model/FortuneConstants';

export default class CylinderObj {

    textureLoader;

    //
    texture;

    //
    cylinderGeom;
    cylinderMat;
    cylinderMesh;

    //
    bottomGeom;
    bottomMat;
    bottomMesh;

    
    constructor(textureLoader ) {

        this.textureLoader = textureLoader;
        

        //
        this.texture = this.textureLoader.load(FortuneConstants.getCylinderTexture());

        //
        this.cylinderGeom = new THREE.CylinderGeometry(FortuneConstants.r, FortuneConstants.r, FortuneConstants.cylinder_h, 50, 1, true, 0, 2* Math.PI);
        this.cylinderMat = new THREE.MeshBasicMaterial({
                map: this.texture,
                side: THREE.DoubleSide
              }) ;
        this.cylinderMesh = new THREE.Mesh( this.cylinderGeom, this.cylinderMat);
        this.cylinderMesh.name = FortuneConstants.NAME_CYLINDER;

        //
        this.bottomGeom = new THREE.CylinderGeometry(FortuneConstants.r, FortuneConstants.r, FortuneConstants.bottom_h, 50, 1, false, 0, 2* Math.PI);
        this.bottomMat = new THREE.MeshBasicMaterial({
                map: this.texture 
            });
        this.bottomMesh = new THREE.Mesh( this.bottomGeom, this.bottomMat);

        this.initPos();
    }


    initPos() {
        //
        this.bottomMesh.position.set ( 0, -(FortuneConstants.cylinder_h / 2), 0);
        this.cylinderMesh.position.set ( 0, 0, 0);
    }

}

