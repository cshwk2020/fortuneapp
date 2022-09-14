import React, { useRef } from 'react';
import { useState, useEffect, useContext } from 'react';
import * as THREE from 'three';
import DebugTabItemConstants from '../model/DebugTabItemConstants';
import { DebugContext } from '../model/ImportLib';
import RangeSlider from '../../widget/RangeSlider/RangeSlider';
import "../css/fortune.css";
 
function DebugRotateView(props) {

  const debugContext = useContext(DebugContext);

   
  const [rotationState, setRotationState] = useState(new THREE.Vector3(0,0,0));
 
  useEffect(()=>{
    console.log("DebugRotateView::debugContext.selectedObj == ", debugContext.selectedObj);
    if (debugContext.selectedObj) {
      setRotationState(debugContext.selectedObj.rotation);
      console.log("DebugRotateView::selectedObj.rotation == ", debugContext.selectedObj.rotation);
    }
     
  }, [debugContext.selectedObj]);
 
  

  return (
    <div> 
      
      DebugRotateView
      ( x: { rotationState.x }, y: { rotationState.y }, z: { rotationState.z } )


       
      <div>
      rotation x: <RangeSlider handleRangeChange={ (value)=>{ debugContext.selectedObj.rotation.x = value; } } min={ -Math.PI } max={ Math.PI } step="0.001"  value={ rotationState.x }></RangeSlider>
      </div>
      <div>
      rotation y:<RangeSlider handleRangeChange={ (value)=>{ debugContext.selectedObj.rotation.y = value; } } min={ -Math.PI } max={ Math.PI } step="0.001"  value={ rotationState.y }></RangeSlider>
      </div>
      <div>
      rotation z:<RangeSlider handleRangeChange={ (value)=>{ debugContext.selectedObj.rotation.z = value; } } min={ -Math.PI } max={ Math.PI } step="0.001"  value={ rotationState.z }></RangeSlider>
      </div>
      
        
    </div>
    );
}
 
export default DebugRotateView;

