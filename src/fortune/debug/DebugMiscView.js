import React, { useRef } from 'react';
import { useState, useEffect, useContext } from 'react';
import * as THREE from 'three';
import DebugTabItemConstants from '../model/DebugTabItemConstants';
import { SelectObjContext } from './DebugIndex';
import RangeSlider from '../../widget/RangeSlider/RangeSlider';
import "../css/fortune.css";
import FortuneConstants from '../model/FortuneConstants';
import { FortuneHubContext, DebugContext } from '../model/ImportLib';

function DebugMiscView(props) {
 
  const fortuneHubContext = useContext(FortuneHubContext);
  const debugContext = useContext(DebugContext);
 

  function onCylinderClicked(e) {
    console.log("DebugMiscView::onCylinderClicked...0...");
    fortuneHubContext.debugButtonClick(FortuneConstants.EVENT_MISC_HIT_CYLINDER);
 
  }

  return (
    <div> 
      MISC
      <button  onClick={ onCylinderClicked }>Touch</button>

    </div>
    );
}

export default DebugMiscView;

