import React, { useRef } from 'react';
import { useState, useEffect, useContext } from 'react';
import * as THREE from 'three';
import DebugTabItemConstants from '../model/DebugTabItemConstants';
import { DebugContext } from '../model/ImportLib';
import RangeSlider from '../../widget/RangeSlider/RangeSlider';
import "../css/fortune.css";
 
function DebugTranslateView(props) {

    
  const debugContext = useContext(DebugContext);

  const [posState, setPosState] = useState(new THREE.Vector3(0,0,0));
 
  useEffect(()=>{
    console.log("DebugTranslateView::debugContext.selectedObj == ", debugContext.selectedObj);
    if (debugContext.selectedObj) {
      setPosState(debugContext.selectedObj.position);
    }

    
     
  }, [ debugContext.selectedObj ]);
 
  /*
  debugContext.selectedObj.setXPos(value);
  */

  return (
    <div> 
      
      DebugTranslateView
      ( x: { posState.x }, y: { posState.y }, z: { posState.z } )


       
      <div>
       pos x: <RangeSlider handleRangeChange={ (value)=>{ debugContext.selectedObj.position.x = value;  console.log('!!!translate value==', value, typeof(debugContext.selectedObj)); } } min="-5" max="5" step="0.001"  value={ posState.x }></RangeSlider>
      </div>
      <div>
        pos y:<RangeSlider handleRangeChange={ (value)=>{ debugContext.selectedObj.position.y = value; } } min="-5" max="5" step="0.001"  value={ posState.y }></RangeSlider>
      </div>
      <div>
        pos z:<RangeSlider handleRangeChange={ (value)=>{ debugContext.selectedObj.position.z = value; } } min="-5" max="5" step="0.001"  value={ posState.z }></RangeSlider>
      </div>
      
       
      
       

    </div>
    );
}

export default DebugTranslateView;

