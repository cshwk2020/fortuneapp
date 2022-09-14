import * as THREE from 'three';
import FortuneConstants from '../model/FortuneConstants';
import { TimelineMax, Expo } from 'gsap';

export default class StickObj {

    textureLoader;
    stickGeometry;
    stickMaterial;
    stickMesh;

    constructor(stickGeometry, stickMaterial) {

        this.stickGeometry = stickGeometry;
        this.stickMaterial = stickMaterial;

        this.stickMesh = new THREE.Mesh( this.stickGeometry, this.stickMaterial );
    }

    initPos() {

        let rand_x = FortuneConstants.getRandomNumFromRange(-0.5, 0.5) * FortuneConstants.r ;
        let rand_y = FortuneConstants.getRandomNumFromRange(0, 1) * FortuneConstants.r ;
        let rand_z = FortuneConstants.getRandomNumFromRange(-0.5, 0.5) * FortuneConstants.r ;
        //let bounded_h_adjust = ((FortuneConstants.stick_h - FortuneConstants.cylinder_h) / 2);
        this.stickMesh.position.set ( rand_x, rand_y + FortuneConstants.bounded_h_adjust , rand_z);
        //stickMesh.rotation.y = rand_rotate;
              
        //stickMeshList.push(stickMesh);
    }

    randomizePosition() {

        let rand_x = FortuneConstants.getRandomNumFromRange(-0.5, 0.5) * FortuneConstants.r ;
        let rand_y = FortuneConstants.getRandomNumFromRange(0, 1) * FortuneConstants.r ;
        let rand_z = FortuneConstants.getRandomNumFromRange(-0.5, 0.5) * FortuneConstants.r ;

        const timelineMax = new TimelineMax({
            paused: false 
        });

        timelineMax.to(this.stickMesh.position, FortuneConstants.CYLINDER_VIBRATE_DURATION, {
                    x: rand_x,
                    y: (FortuneConstants.bounded_h_adjust + rand_y),
                    z: rand_z,
                    ease: Expo.easeInOut
        });
    }

}

