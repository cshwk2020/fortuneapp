import * as THREE from 'three';
import FortuneConstants from "./FortuneConstants";

export default class SoundUtil {

    // AUDIO
    audioLoader = new THREE.AudioLoader();
    listener = new THREE.AudioListener();
  
    playCylinderVibrateSound() {
      
        let audio = new THREE.Audio(this.listener);

        this.audioLoader.load(FortuneConstants.getCylinderVibrateSound(), function(buffer) {
            audio.setBuffer(buffer);
            //audio.setLoop(true);
            audio.play();
        });
    }

     

}