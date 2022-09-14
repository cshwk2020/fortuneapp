import * as THREE from 'three';
import { TimelineMax, Expo } from 'gsap';
import FortuneConstants from '../model/FortuneConstants';
import CylinderObj from './CylinderObj';
import SpecialStickObj from './SpecialStickObj';
import StickObj from './StickObj';
import StickGroupObj from './StickGroupObj';
import PaperState from '../model/PaperState';
import CylinderState from '../model/CylinderState';
import SoundUtil from '../model/SoundUtil';

export default class CylinderGroup {

    
    textureLoader;
    domEvents;
    //
    fortuneHub;
    debugContext;
    //
    onSelectObjRequested;

    //
    singleGeometry = new THREE.Group();
    //
    cylinderObj;
    specialStickObj;
    stickGroupObj;

    //
    soundUtil = new SoundUtil();
        

    //
    //isIdle = true;
    cylinderGroupState = CylinderState.CYLINDER_IDLE;

    //
    idlePosX = 5 * FortuneConstants.slot_w;
    idlePosY = 0.35;
    idlePosZ = -20;
    //
    idleRotateX = 10 * Math.PI / 180;
    idleRotateY = 0;
    idleRotateZ = 0;
    //
    activePosX = 0;
    activePosY = -0.1;
    activePosZ = -3;
    //
    activeRotateX = 10 * Math.PI / 180;
    activeRotateY = 0;
    activeRotateZ = 0;
  
     

    constructor(textureLoader, fortuneHub, debugContext, domEvents, onSelectObjRequested) {
        
        let me = this;

        //
        this.domEvents = domEvents;
        this.textureLoader = textureLoader;

        this.fortuneHub = fortuneHub;
        this.debugContext = debugContext;
        //
        this.onSelectObjRequested = onSelectObjRequested;
        //
        this.cylinderObj = new CylinderObj(textureLoader);
        this.specialStickObj = new SpecialStickObj(this.textureLoader, this.fortuneHub);
        this.specialStickObj.initPos();

        //
        this.stickGroupObj = new StickGroupObj(textureLoader);
        this.initGroup();
        this.initPos();

        // 
        console.log("CG::DEBUG...",me.domEvents);
        this.domEvents.addEventListener(me.singleGeometry, 'click', function(event){
            console.log('!!you clicked on singleGeometry', me.onSelectObjRequested, me.singleGeometry);
            me.debugContext.selectedObj = me.singleGeometry;
            me.onSelectObjRequested(me.singleGeometry);
            me.hitCylinder();
        }, false);
        
        //
        me.fortuneHub.subscribeDebugButtonEvent((res)=>{
            me.handleVibrateObserver(res);
        });
        me.fortuneHub.subscribeHitCylinderEvent((res)=>{
            me.handleVibrateObserver(res);
        });
        me.fortuneHub.subscribeHitCylinderEvent((res)=>{
            if (res.isFinished == true) {
                me.setIdle();
            }
        });
        me.fortuneHub.subscribePaperStatus((paperStatus)=>{

            console.log(`subscribePaperStatus...paperStatus == ${paperStatus}...`);
            if (paperStatus != PaperState.PAPER_UP) {

                me.cylinderGroupState = CylinderState.CYLINDER_IDLE;

                //
                me.specialStickObj.initPos();
                me.fortuneHub.resetForNextRound();
            }
        });

    }

    handleVibrateObserver(res) {

        console.log("CylinderGroup :: handleVibrateObserver :: ", JSON.stringify(res));
        
        let me = this;

        if (this.fortuneHub.isCurrentRoundFinished == true) {
            return;
        }

        this.specialStickObj.updateSpecialStickPos();

        const timelineMax = new TimelineMax({
            paused: false,
            onComplete: () => {
                console.log("onComplete", timelineMax);

                const reverseTimelineMax = new TimelineMax({
                    paused: false 
                });

                reverseTimelineMax.to(me.singleGeometry.rotation, FortuneConstants.CYLINDER_VIBRATE_DURATION, {
                    x: 20 * Math.PI / 180,
                    y: me.singleGeometry.rotation.y,
                    z: me.singleGeometry.rotation.z,
                    ease: Expo.easeInOut
                });

                me.stickGroupObj.randomizeAllSticksPos();
            }
        });

        //
        timelineMax.to(me.singleGeometry.rotation, FortuneConstants.CYLINDER_VIBRATE_DURATION, {
                    x: - 30 * Math.PI / 180,
                    y: me.singleGeometry.rotation.y,
                    z: me.singleGeometry.rotation.z,
                    ease: Expo.easeInOut
        });

    }

    setXPos(x) {

        console.log("setXPos...0...", x);

        let me = this;

        //
        const timelineMax = new TimelineMax({
            paused: false,
            onComplete: () => {
                console.log("setXPos onComplete", x);

            }
        });

        timelineMax.to(me.singleGeometry.position, FortuneConstants.CYLINDER_VIBRATE_DURATION, {
            x: x,
            y: me.singleGeometry.position.y,
            z: me.singleGeometry.position.z,
            ease: Expo.easeInOut
        });
    }

    hitCylinder() {

        console.log("hitCylinder...0...", this.fortuneHub.isAnyPaperUp()==false);

        if (this.cylinderGroupState == CylinderState.CYLINDER_IDLE ) {

            console.log("hitCylinder...10...isAnyPaperUp == ", this.fortuneHub.isAnyPaperUp());
            
            if (this.fortuneHub.isAnyPaperUp()==false
            && this.fortuneHub.isCurrentRoundFinished == false) {
                this.setActive();
            }
              
        }
        else {

            console.log("hitCylinder...20...");

            if (this.fortuneHub.isCurrentRoundFinished == true) {
                console.log("hitCylinder...30...");
                return;
            }
    
            if (this.specialStickObj.isMaxHeightReached()) {
                this.fortuneHub.hitCylinder(true);
                console.log("hitCylinder...40...");

            }
            else {
                this.fortuneHub.hitCylinder(false);

                console.log("DEBUG SOUND...cylinderGroupState==", this.cylinderGroupState, CylinderState.CYLINDER_ACTIVE,
                    (this.cylinderGroupState == CylinderState.CYLINDER_ACTIVE));
                if (this.cylinderGroupState == CylinderState.CYLINDER_ACTIVE) {
                    console.log("DEBUG SOUND...playCylinderVibrateSound...");
                    this.soundUtil.playCylinderVibrateSound();
                     
                }
                 
                console.log("hitCylinder...50...");
            }
        }
 
    }


    initGroup() {

        this.singleGeometry.add(this.cylinderObj.cylinderMesh);
        this.singleGeometry.add(this.cylinderObj.bottomMesh);
        this.stickGroupObj.stickObjList.forEach((stickObj)=>{
            //console.log(stickObj);
            this.singleGeometry.add(stickObj.stickMesh);
        });
        this.singleGeometry.add(this.specialStickObj.stickMesh);
    }

    setIdle() {

        //this.isIdle = true;

        this.animateToIdlePos(()=>{
            this.fortuneHub.reportCylinderGroupIdle();
        });
         
    }
    setActive() {
        //this.isIdle = false;
        this.animateToActivePos();
    }

    initPos() {

        if (this.cylinderGroupState==CylinderState.CYLINDER_IDLE) {
            this.initIdlePos();
        }
        else if (this.cylinderGroupState==CylinderState.CYLINDER_ACTIVE) {
            this.initActivePos();
        }
    }

    initIdlePos() {
  
        this.singleGeometry.position.set ( this.idlePosX, this.idlePosY, this.idlePosZ);
        this.singleGeometry.rotation.set ( this.idleRotateX, this.idleRotateY, this.idleRotateZ);
    }

    initActivePos() {
 
        this.singleGeometry.position.set ( this.activePosX, this.activePosY, this.activePosZ);
        this.singleGeometry.rotation.set ( this.activeRotateX , this.activeRotateY, this.activeRotateZ);
    }

    animateToIdlePos(completionHandler) {

        let me = this;

        this.cylinderGroupState = CylinderState.CYLINDER_MOVING;

        const timelineMax_pos = new TimelineMax({
            paused: false,
            onComplete: ()=>{
                me.cylinderGroupState = CylinderState.CYLINDER_WAIT_IDLE;
                completionHandler();
            }
        });
        const timelineMax_rotate = new TimelineMax({
            paused: false 
        });

        timelineMax_rotate.to(this.singleGeometry.rotation, FortuneConstants.PAPER_UP_DURATION, {
            x: me.idleRotateX,
            y: me.idleRotateY,
            z: me.idleRotateZ,
            ease: Expo.easeInOut
        });

         
        timelineMax_pos.to(this.singleGeometry.position, FortuneConstants.PAPER_UP_DURATION, {
            x: me.idlePosX,
            y: me.idlePosY,
            z: me.idlePosZ,
            ease: Expo.easeInOut
        });
    }

    animateToActivePos() {

        let me = this;

        this.cylinderGroupState = CylinderState.CYLINDER_MOVING;

        const timelineMax_pos = new TimelineMax({
            paused: false,
            onComplete: ()=>{
                me.cylinderGroupState = CylinderState.CYLINDER_ACTIVE;
            }
        });
        const timelineMax_rotate = new TimelineMax({
            paused: false 
        });

        
        timelineMax_rotate.to(this.singleGeometry.rotation, FortuneConstants.PAPER_UP_DURATION, {
            x: 10 * Math.PI / 180,
            y: 0,
            z: 0,
            ease: Expo.easeInOut
        });

        timelineMax_pos.to(this.singleGeometry.position, FortuneConstants.PAPER_UP_DURATION, {
            x: me.activePosX,
            y: me.activePosY,
            z: me.activePosZ,
            ease: Expo.easeInOut
        });
    }

}

