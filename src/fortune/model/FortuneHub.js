import { Subject, interval } from 'rxjs';
import { map, throttle } from 'rxjs/operators';
import HitCylinderResponse from './HitCylinderResponse';
import CylinderState from './CylinderState';
import PaperState from './PaperState';
import CylinderStateEvent from '../model/CylinderStateEvent';

export default class FortuneHub {

    cylinderGroup;
    slotGroup;

    registerCylinderGroup(cylinderGroup) {
        this.cylinderGroup = cylinderGroup;
    }
    registerSlotGroup(slotGroup) {
        this.slotGroup = slotGroup;
         
    }

    isCylinderGroupIdle() {
        if (this.cylinderGroup) {
            return this.cylinderGroup.cylinderGroupState == CylinderState.CYLINDER_IDLE;
        }
        else {
            return true;
        }
    }

    isAnyPaperUp() {
        return this.slotGroup.isAnyPaperUp();
    }


    //
    isCurrentRoundFinished = false;
    currentRoundpaperNumber = -1;
    resetForNextRound() {
        this.isCurrentRoundFinished = false;
        this.currentRoundpaperNumber = -1;
    }
    finishCurrentRound() {
        this.isCurrentRoundFinished = true;
        this.currentRoundpaperNumber = 1 + (Math.random() * 100);
    }



    // IDLE OR ACTIVE (CylinderState)
    cylinderGroupStatusSubject = new Subject();
    cylinderGroupStatusObs$;

    reportCylinderGroupIdle() {
        /*
        //
        let hitCylinderResponse = new HitCylinderResponse();
        hitCylinderResponse.isFinished = this.isCurrentRoundFinished;
        hitCylinderResponse.paperNumber = Math.trunc(this.currentRoundpaperNumber);
        //
        this.cylinderGroupStatusSubject.next(hitCylinderResponse);
        */
        let hitCylinderResponse = new HitCylinderResponse();
        hitCylinderResponse.isFinished = this.isCurrentRoundFinished;
        hitCylinderResponse.paperNumber = Math.trunc(this.currentRoundpaperNumber);
       
        let cylinderStateEvent = new CylinderStateEvent();
        cylinderStateEvent.cylinderState = CylinderState.CYLINDER_WAIT_IDLE;
        cylinderStateEvent.hitCylinderResponse = hitCylinderResponse;
        //
        this.cylinderGroupStatusSubject.next(cylinderStateEvent);
    }

    subscribeCylinderGroupStatus(observer) {
        //
        this.cylinderGroupStatusObs$.subscribe(observer);
    }



    //  UP OR DOWN (PaperState)
    paperStatusSubject = new Subject();
    paperStatusObs$;

    reportPaperDownStatus() {
        this.paperStatusSubject.next(PaperState.PAPER_DOWN);
    }
    subscribePaperStatus(observer) {
        //
        this.paperStatusObs$.subscribe(observer);
    }



    //
    hitCylinderSubject = new Subject();
    hitCylinderObs$;
    //
    debugButtonSubject = new Subject();
    debugButtonObs$;

    constructor() {
        console.log("FortuneHub::constructor...");
        this.debugButtonObs$ = this.debugButtonSubject
            .asObservable(); 
        this.hitCylinderObs$ = this.hitCylinderSubject
            .asObservable();
        //
        this.cylinderGroupStatusObs$ = this.cylinderGroupStatusSubject.asObservable(); 
        //
        this.paperStatusObs$ = this.paperStatusSubject.asObservable(); 
    }

    debugButtonClick(TAG) {
        console.log("FortuneHub::debugButtonClick == ", TAG);
        let hitCylinderResponse = new HitCylinderResponse();
        hitCylinderResponse.isFinished = this.isCurrentRoundFinished;
        hitCylinderResponse.paperNumber = this.currentRoundpaperNumber;

        this.debugButtonSubject.next(hitCylinderResponse);
    }
    subscribeDebugButtonEvent(observer) {
        this.debugButtonObs$.subscribe(observer);
    }


     
    hitCylinder(isStickOut) {

        console.log("FortuneHub::hitCylinder...isStickOut == ", isStickOut);

        if (isStickOut == true) {
            this.finishCurrentRound();
        }
 
        let hitCylinderResponse = new HitCylinderResponse();
        hitCylinderResponse.isFinished = this.isCurrentRoundFinished;
        hitCylinderResponse.paperNumber = Math.trunc(this.currentRoundpaperNumber);

        this.hitCylinderSubject.next(hitCylinderResponse);
    }

    subscribeHitCylinderEvent(observer) {
        this.hitCylinderObs$.subscribe(observer);
    }
}