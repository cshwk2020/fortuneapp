import React from 'react';
import { useState, useEffect, useRef } from 'react';
 import './RangeSlider.css';
 
function RangeSlider(props) {
 
  //const sliderRef = useRef();
  const [rangeval, setRangeval] = useState();

  useEffect(()=>{
    console.log("RangeSlider value changed:: ", props.value);
    setRangeval(props.value);
    //sliderRef.current.value = props.value;
  }, [props.value]);

  const handleRangeChange = e => {
    console.log("handleRangeChange...e == ", e);
    if (e && e.target && e.target.value) {
      console.log(e.target.value);
      setRangeval(e.target.value);

      props.handleRangeChange(e.target.value);
    }
  }

 /*
    <input  ref={ sliderRef } type="range" className="custom-range" value={rangeval} min={props.min} max={props.max} 
      onChange={(event) => setRangeval(event.target.value)} />
   */

  return (
    <div>
 
    { (rangeval != null) && <input type="range" className="custom-range"   value={rangeval}  min={props.min} max={props.max} step={props.step}
      onChange={ handleRangeChange }  />}

      <span>The range value is {props.min}, {props.max}, {rangeval}</span>
    </div>
    );
}

export default RangeSlider;

