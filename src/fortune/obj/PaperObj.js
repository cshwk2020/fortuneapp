import * as THREE from 'three';
import FortuneConstants from '../model/FortuneConstants';
import { TimelineMax, Expo } from 'gsap';
import PaperState from '../model/PaperState';

export default class PaperObj {

    scene;
    textureLoader;
    fortuneHub;
    debugContext;
    domEvents;
    paperTexture;
    paperGeometry;
    paperMaterial;
    paperMesh;
    //
    onSelectObjRequested;
    //
    absolutePos;
    x;
    y; 
  
    //isUp = false;

    paperStatus = PaperState.PAPER_DOWN;
    paperNum;
    

    actionHandler(event){
 
        let me = this;

        console.log('!!you clicked on this.paperMesh', me.paperMesh);

        console.log('TEST TEST...10...document == ', document);

        me.debugContext.selectedObj = me.paperMesh;
        me.onSelectObjRequested(me.paperMesh);


        //
        if (me.paperStatus == PaperState.PAPER_DOWN) {

            if (me.fortuneHub.isCylinderGroupIdle()==true
                && me.fortuneHub.isAnyPaperUp() == false) {

                console.log("isCylinderGroupIdle == TRUE");

                //me.paperStatus = PaperState.PAPER_MOVING;
                me.up();
            }
            else {
                console.log("isCylinderGroupIdle == FALSE...paper cannot force UP...");
            }
        }
        else if (me.paperStatus == PaperState.PAPER_UP) {

            //me.paperStatus = PaperState.PAPER_MOVING;
            me.down();
        }
    }


    constructor(scene, textureLoader, fortuneHub, debugContext, domEvents, paperMaterial, paperNum, onSelectObjRequested) {

        ///console.log("paperObj::textureLoader==", textureLoader);
        ///console.log("paperObj::debugContext==", debugContext);
        ///console.log("paperObj::domEvents==", domEvents);

        let me = this;

        this.paperNum = paperNum;
        this.scene = scene;
        this.textureLoader = textureLoader;
        this.fortuneHub = fortuneHub;
        this.debugContext = debugContext;
        this.domEvents = domEvents;
        this.onSelectObjRequested = onSelectObjRequested;

        /*
        this.paperGeometry = paperGeometry;
        this.paperMaterial = paperMaterial;
        */
        //
        
        this.paperTexture = this.textureLoader.load(FortuneConstants.getPaperTexture(paperNum));
        this.paperGeometry = new THREE.PlaneGeometry( FortuneConstants.slot_w, FortuneConstants.slot_h  );
        this.paperMaterial = new THREE.MeshBasicMaterial({
            map: this.paperTexture,
            side: THREE.DoubleSide
          });
       


          me.paperMesh = new THREE.Mesh( me.paperGeometry, me.paperMaterial );
          me.paperMesh.name = `${FortuneConstants.NAME_PAPER}_${paperNum}`;
        
            

          me.domEvents.addEventListener(me.paperMesh, 'click', me.actionHandler, false);
           
          /*
          console.log('TEST TEST...0...', document.getElementById(me.paperMesh.id));
          document.getElementById(me.paperMesh.id).addEventListener('touchend', (e)=>{

            console.log('TEST TEST...10...e == ', e);
          })
          */
         
        
    }

    initPos(x, y, z) {
        this.x = x;
        this.y = y;
        this.z = z;

        this.paperMesh.position.set (this.x, this.y, this.z);  
        //
        this.paperMesh.updateMatrixWorld();
        var worldMatrix = this.paperMesh.matrixWorld;
        this.absolutePos = new THREE.Vector3().getPositionFromMatrix(worldMatrix);
 
        console.log("paperObj::absolutePos == ", this.absolutePos);
    }
  
    down() {

        let me = this;

        //
        this.paperStatus = PaperState.PAPER_MOVING;

        const timelineMax_scale = new TimelineMax({
            paused: false 
        });
        const timelineMax_rotate = new TimelineMax({
            paused: false 
        });
        const timelineMaxPos = new TimelineMax({
            paused: false,
            onComplete: ()=>{
                me.paperMesh.position.set(
                     this.x,
                     this.y, 
                     this.z
                );
                //
                this.paperStatus = PaperState.PAPER_DOWN;
                this.fortuneHub.reportPaperDownStatus();
        
            }
        });

        timelineMax_scale.to(this.paperMesh.scale, FortuneConstants.PAPER_UP_DURATION, {
            x: 1,
            y: 1,
            z: 1,
            ease: Expo.easeInOut
        });

        timelineMax_rotate.to(this.paperMesh.rotation, FortuneConstants.PAPER_UP_DURATION, {
            x: 0,
            y: 0,
            z: 0,
            ease: Expo.easeInOut
        });

        timelineMaxPos.to(this.paperMesh.position, FortuneConstants.PAPER_UP_DURATION, {
            x: this.x,
            y: this.y,
            z: this.z,
            ease: Expo.easeInOut
        });
  
    }

    up() {

        //
        this.paperStatus = PaperState.PAPER_MOVING;       
                      
            const timelineMaxRotation = new TimelineMax({
                paused: false,
                onComplete: () => {
                      
                }
            });

            const timelineMaxScale = new TimelineMax({
                paused: false,
                onComplete: () => {
                      
                }
            });
            const timelineMaxPosition = new TimelineMax({
                paused: false,
                onComplete: () => {
                    parent.attach( this.paperMesh ); 
                    this.paperStatus = PaperState.PAPER_UP;
                }
            });
           

            timelineMaxRotation.to(this.paperMesh.rotation, FortuneConstants.PAPER_UP_DURATION, {
                x: 0,
                y: 0,
                z: 0,
                ease: Expo.easeInOut
            });
            
            const parent = this.paperMesh.parent;
            this.scene.attach( this.paperMesh );  
            

            timelineMaxScale.to(this.paperMesh.scale, FortuneConstants.PAPER_UP_DURATION, {
                x: FortuneConstants.paper_size_scale,
                y: FortuneConstants.paper_size_scale,
                z: 1,
                ease: Expo.easeInOut
            });

            
            timelineMaxPosition.to(this.paperMesh.position, FortuneConstants.PAPER_UP_DURATION, {
                x: 0,
                y: 0,
                z: -1.3,
                ease: Expo.easeInOut
            });
 
 
    }
  

     
 
}

