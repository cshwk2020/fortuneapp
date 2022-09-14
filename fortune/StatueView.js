import './css/fortune.css';
import React, { useRef } from 'react';
import { useState, useEffect } from 'react';
import * as THREE from 'three';
import StatueObj from './obj/StatueObj';
import FortuneConstants from './model/FortuneConstants';
 
function StatueView(props) {
  
    const statue = new StatueObj(props.textureLoader);
    
    useEffect(() => {
    
        //
        statue.statueMesh.position.set(0, 2.5, -20 - FortuneConstants.cradle_base_l); 
        props.scene.add( statue.statueMesh );
  
    }, []);
  
      

  return (
    <>   
    </>
    );
}

export default StatueView;

