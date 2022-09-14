import React from 'react';
import { useState, useEffect } from 'react';
import Constants from '../common/Constants';
import '../../App.css';

function Subjects(props) {
    const [subjectState, setSubjectState] = useState([]);
    const constants = new Constants();

    console.log('ownerId: ', props.ownerId);

    useEffect(async ()=>{
        try {
            const res = await fetch(constants.getSubjectsUrl());
            const data = await res.json();
            setSubjectState(data);
            console.log('data==', data);
        }
        catch (err) {
            console.log(JSON.stringify(err));
        }
        

    }, [props.ownerId]);

  return (
    <div> 
        
        {subjectState?.map(subject =>
            <div key={subject.subjectId}>
            { subject.subjectTitle }
            </div>
        )}
    </div>
    );
}

export default Subjects;