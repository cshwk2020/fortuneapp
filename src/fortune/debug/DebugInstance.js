import { Subject, interval } from 'rxjs';
import { map, throttle } from 'rxjs/operators';

export default class DebugInstance {

    // debug controller
    selectedObj;
    
    //
    selectedObjSubject = new Subject();
    selectedObjObs$;

    constructor() {
        console.log("FortuneHub::constructor...");
        this.selectedObjObs$ = this.selectedObjSubject
            .asObservable(); 
         
    }

    setSelectedObj(obj) {
        this.selectedObj = obj;
        this.selectedObjSubject.next(obj);
    }
    subscribeSelectedObjEvent(observer) {
        this.selectedObjObs$.subscribe(observer);
    }

}