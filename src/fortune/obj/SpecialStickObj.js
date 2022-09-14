import * as THREE from 'three';
import FortuneConstants from '../model/FortuneConstants';
import FortuneHub from '../model/FortuneHub';
import { TimelineMax, Expo } from 'gsap';

export default class SpecialStickObj {

     
    FortuneHub
    textureLoader;
 
    stickGeometry;
    stickMaterial
    stickMesh;

    constructor(textureLoader, fortuneHub) {

        this.textureLoader = textureLoader;
        this.fortuneHub = fortuneHub;

        this.stickGeometry = new THREE.PlaneGeometry(FortuneConstants.stick_w,FortuneConstants.stick_h);
        this.stickMaterial = new THREE.MeshBasicMaterial({
            map: this.textureLoader.load(FortuneConstants.getSpecialStickTexture()),
            side: THREE.DoubleSide,
            transparent: true
          });
 

        this.stickMesh = new THREE.Mesh( this.stickGeometry, this.stickMaterial );
    }

    initPos() {

        this.stickMesh.position.set ( 0, FortuneConstants.bounded_h_adjust , 0);
    }

    isMaxHeightReached() {
        return (this.stickMesh.position.y > FortuneConstants.specialStick_max_y);  
    }
 

    //// SpecialStick
    updateSpecialStickPos() {
        console.log("updateSpecialStickPos...0...");
        
        let me = this;

        if (this.fortuneHub.isCurrentRoundFinished == true) {
            return;
        }

             
        //
        let rand_y = FortuneConstants.getRandomNumFromRange(-0.01 * 2, 0.03 * 2);
        console.log("updateSpecialStickPos...10...rand_y == ", rand_y);

        console.log(`updateSpecialStickPos...10...y == ${this.stickMesh.position.y}...specialStick_min_y==${FortuneConstants.specialStick_min_y}`);

        if (this.stickMesh.position.y + rand_y > FortuneConstants.specialStick_min_y) {
                    
            const timelineMax = new TimelineMax({
                paused: false,
                onComplete: ()=>{
                    console.log("updateSpecialStickPos...20...onComplete::specialStickMesh.position.y == ", me.stickMesh.position.y);

                }
            });

            timelineMax.to(this.stickMesh.position, FortuneConstants.CYLINDER_VIBRATE_DURATION, {
                x: this.stickMesh.position.x,
                y: this.stickMesh.position.y + rand_y,
                z: this.stickMesh.position.z,
                ease: Expo.easeInOut
            });

            console.log("updateSpecialStickPos...30...specialStickMesh.position.y == ", this.stickMesh.position.y);

        }
        else {
            console.log("---> REACH MIN HEIGHT");
        }
         
    }



    

}

