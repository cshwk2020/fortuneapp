import React from 'react';
import { useState, useEffect, useContext } from 'react';
import * as THREE from 'three';
import DebugTabItemConstants from '../model/DebugTabItemConstants';
import "../css/fortune.css";
import DebugTranslateView from './DebugTranslateView';
import DebugRotateView from './DebugRotateView';
import DebugMiscView from './DebugMiscView';
import { FortuneHubContext, DebugContext } from '../model/ImportLib';

function DebugTabbedContainer(props) {

  const fortuneHubContext = useContext(FortuneHubContext);
  const debugContext = useContext(DebugContext);
    
  //const [selectedObjState, setSelectedObjState] = useState(DebugTabItemConstants.TRANSLATE);
 
  const [tabItemState, setTabItemState] = useState(DebugTabItemConstants.TRANSLATE);
 
  const onTabItemClicked = (index) => {
    setTabItemState(index);
  }

  const [paperState, setPaperState] = useState({
    isFinished: false,
    paperNumber: -1
  });
 

  useEffect(()=>{
    console.log("DebugTabbedContainer::fortuneHubContext==", fortuneHubContext);

    //
    fortuneHubContext.subscribeDebugButtonEvent((res)=>{
      setPaperState(res);
    });
    fortuneHubContext.subscribeHitCylinderEvent((res)=>{
         setPaperState(res);
    });

    //
    debugContext.subscribeSelectedObjEvent((selectedObj)=>{
      console.log("DebugTabbedContainer::selectedObj==", selectedObj);
    });
  });
  


  return (
    <div className="debug-tabbed-container"> 
      
        <div>current index == { tabItemState }</div>
        <div>isCurrentRoundFinished ==  <span>{ paperState.isFinished.toString() }, { paperState.paperNumber }</span> </div>
     
                 
          <div>
          <button  onClick={ () => onTabItemClicked(DebugTabItemConstants.TRANSLATE) }>translate</button>
          <button  onClick={ () => onTabItemClicked(DebugTabItemConstants.ROTATE) }>rotate</button>
          <button  onClick={ () => onTabItemClicked(DebugTabItemConstants.MISC) }>misc</button>
          </div>
           
          { (debugContext.selectedObj) && (tabItemState==DebugTabItemConstants.TRANSLATE) && <DebugTranslateView></DebugTranslateView>}
          { (debugContext.selectedObj) &&(tabItemState==DebugTabItemConstants.ROTATE) && <DebugRotateView></DebugRotateView>}
          { (debugContext.selectedObj) &&(tabItemState==DebugTabItemConstants.MISC) && <DebugMiscView></DebugMiscView>}
           
       
        
    </div>
    );
}

export default DebugTabbedContainer;

