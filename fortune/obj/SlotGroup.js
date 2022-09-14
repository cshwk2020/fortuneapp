import * as THREE from 'three';
import { TimelineMax, Expo } from 'gsap';
import FortuneConstants from '../model/FortuneConstants';
import SlotObj from './SlotObj';
import PaperObj from './PaperObj'; 
import CylinderState from '../model/CylinderState';
import CylinderStateEvent from '../model/CylinderStateEvent';
import PaperState from '../model/PaperState';


export default class SlotGroup {

    scene;
    textureLoader;
    fortuneHub;
    debugContext;
    domEvents;

    slotTexture;
    slotGeometry;
    slotMaterial;
    slotMesh;


    
    //
    onSelectObjRequested;

    //
    singleGeometry = new THREE.Group();

    //
    slotObjList = [];
    paperObjList = [];
    

    isAnyPaperUp() {

        var result = false;

        for (let i=0; i < this.paperObjList.length; i++) {
            if (this.paperObjList[i].paperStatus != PaperState.PAPER_DOWN) {

                result = true;
                break;
            }
        }

        console.log("SlotGroup::isAnyPaperUp == ", result);

        return result;
    }

    paperUp(paperNum) {

        var selectedPaperObj;
        for (let i=0; i < this.paperObjList.length; i++) {
            if (this.paperObjList[i].paperNum == paperNum) {
                selectedPaperObj = this.paperObjList[i];
                break;
            }
        }

        if (selectedPaperObj) {
            selectedPaperObj.up();
        }
    }

    constructor(scene, textureLoader, fortuneHub, debugContext, domEvents, onSelectObjRequested) {
        
        let me = this;

        //
        this.scene = scene;
        this.textureLoader = textureLoader;
        this.domEvents = domEvents;

        this.fortuneHub = fortuneHub;
        this.debugContext = debugContext;
        //
        this.onSelectObjRequested = onSelectObjRequested;
         
        this.slotTexture = this.textureLoader.load(FortuneConstants.getSlotTexture());
        this.slotGeometry = new THREE.BoxGeometry( FortuneConstants.slot_w, FortuneConstants.slot_h, FortuneConstants.slot_l );
        this.slotMaterial = new THREE.MeshBasicMaterial({
            map: this.slotTexture,
            side: THREE.DoubleSide
          })

        //
        this.initSlotList();
        this.initSlotGap();
        //
        this.initPos();

        // 
        console.log("CG::DEBUG...",me.domEvents);
        this.domEvents.addEventListener(me.singleGeometry, 'click', function(event){
            console.log('!!you clicked on singleGeometry', me.onSelectObjRequested, me.singleGeometry);
            me.debugContext.selectedObj = me.singleGeometry;
            me.onSelectObjRequested(me.singleGeometry);
        }, false);
        
        //
        me.fortuneHub.subscribeDebugButtonEvent((res)=>{
             
            me.paperUp(1);
        });
        me.fortuneHub.subscribeCylinderGroupStatus((subscribeCylinderGroupEvent)=>{
            
            console.log("subscribeCylinderGroupStatus...e == ", JSON.stringify(subscribeCylinderGroupEvent));

            if (subscribeCylinderGroupEvent.cylinderState == CylinderState.CYLINDER_WAIT_IDLE) {
                console.log("CYLINDER_WAIT_IDLE...!!!");
                me.paperUp(subscribeCylinderGroupEvent.hitCylinderResponse.paperNumber);
            }
            /*
            if (res.isFinished == true) {
                me.paperUp(res.paperNumber);
            }
            */
        });
    }


    _min = -5;
    _max = 5;
    //_min = 0;
    //_max = 1;
     
    initSlotGap() {

        let num_of_thickness = 1;

        for (let row = this._min - 1; row < this._max; row++) {
             
            let slotGapGeometry = new THREE.BoxGeometry( 

                FortuneConstants.slot_thickness + 10 * (FortuneConstants.slot_w + FortuneConstants.slot_thickness), 
                FortuneConstants.slot_thickness, 
                FortuneConstants.slot_thickness * num_of_thickness );
            let slotGap = new SlotObj( 
                this.textureLoader, this.fortuneHub, this.debugContext, this.domEvents, 
                slotGapGeometry, this.slotMaterial, ()=>{ } );

            this.singleGeometry.add( slotGap.slotMesh );

            slotGap.initPos (
                    - 0.5 * (FortuneConstants.slot_w + FortuneConstants.slot_thickness), 
                    FortuneConstants.slot_thickness / 2 + FortuneConstants.slot_h / 2 + (row) * (FortuneConstants.slot_h + FortuneConstants.slot_thickness), 
                    FortuneConstants.slot_thickness * num_of_thickness / 2); 
        }

        for (let col = this._min - 1; col < this._max; col++) {
             
            let slotGapGeometry = new THREE.BoxGeometry( 

                FortuneConstants.slot_thickness, 
                -FortuneConstants.slot_thickness + 10 * (FortuneConstants.slot_h + FortuneConstants.slot_thickness), 
                 
                FortuneConstants.slot_thickness * num_of_thickness );
            let slotGap = new SlotObj( 
                this.textureLoader, this.fortuneHub, this.debugContext, this.domEvents, 
                slotGapGeometry, this.slotMaterial, ()=>{ } );

            this.singleGeometry.add( slotGap.slotMesh );

            slotGap.initPos (
                     
                    FortuneConstants.slot_thickness / 2 + FortuneConstants.slot_w / 2 + (col) * (FortuneConstants.slot_w + FortuneConstants.slot_thickness), 
                    -0.5 * (FortuneConstants.slot_h + FortuneConstants.slot_thickness), 
                    FortuneConstants.slot_thickness * num_of_thickness / 2); 
        }
    }

    initSlotList() {
 
        var paperNum = 1;
        for (let row = this._min; row < this._max; row++) {
            for (let col = this._min; col < this._max; col++) {
 
                //console.log("DEBUG::initSlotList...10...")

                let slotObj = new SlotObj( 
                    this.textureLoader, this.fortuneHub, this.debugContext, this.domEvents, 
                    this.slotGeometry, this.slotMaterial, ()=>{

                    } );
                    //console.log("DEBUG::initSlotList...20...")
                this.slotObjList.push(slotObj);
                //console.log("DEBUG::initSlotList...30...")
                this.singleGeometry.add( slotObj.slotMesh);
                //console.log("DEBUG::initSlotList...40...")
                slotObj.initPos(
                    col * (FortuneConstants.slot_w + FortuneConstants.slot_thickness),
                    row * (FortuneConstants.slot_h + FortuneConstants.slot_thickness), 
                    0); 
                    //console.log("DEBUG::initSlotList...50...");




                //
                let paperObj = new PaperObj(this.scene, this.textureLoader, this.fortuneHub, this.debugContext, this.domEvents, null, paperNum, ()=>{

                } );
     
                this.paperObjList.push(paperObj);
                //console.log("DEBUG::initPaperList...30...")
                this.singleGeometry.add( paperObj.paperMesh);
                //console.log("DEBUG::initPaperList...40...")
                paperObj.initPos(
                    col * (FortuneConstants.slot_w + FortuneConstants.slot_thickness),
                    row * (FortuneConstants.slot_h + FortuneConstants.slot_thickness), 
                    0.01 + FortuneConstants.slot_l / 2); 
                    //console.log("DEBUG::initSlotList...50...");


                    paperNum += 1;
            }
        } 
       
    }

    initPos() {
        this.singleGeometry.position.set ( 0, -1.08, -14);
        this.singleGeometry.rotation.set ( -Math.PI / 2.8, 0, 0);
    }


}

