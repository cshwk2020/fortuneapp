
import React from 'react';
import { useState, useEffect } from 'react';
import Constants from '../common/Constants';
import '../../App.css';
import { useFormik, Formik, validationSchema, Form, Field, ErrorMessage } from 'formik';
import * as yup from 'yup';
import { propTypes } from 'react-bootstrap/esm/Image';

function InputSubject(ownerId) {
    
  const constants = new Constants();

  /*
  const validateSubjectForm = (subjectData)=>{
    const errors = {};

    console.log('validateSubjectForm...0...', JSON.stringify(subjectData), subjectData.subject_title.length);

    if ((!subjectData.subject_title) || subjectData.subject_title.length <= 0) {
      errors.subject_title = "please enter subject title";
    }
    else {

    }
    if (subjectData.subject_title.length > 500) {
      errors.subject_title = "subject title max length = 500";
    }
 
    console.log("errors == ", errors);

    return errors;
  }
  */

  /*
  const formik = useFormik({
    initialValues: {
      subject_title: ''
    },
    //validate: validateSubjectForm,
    validationSchema: yup.object({
      subject_title: yup.string()
        .max(500, 'subject title max length 500')
        .required('please enter subject title')
    }),
    onSubmit: values=>{
      alert(JSON.stringify(values));
    }
  });
  */
    
 
  return (
    <div> 

      <Formik
        initialValues = {
          {
          subject_title: ''
          }
        }
        validationSchema = { 
          yup.object({
            subject_title: yup.string()
                .max(500, 'subject title max length 500')
                .required('please enter subject title')
            }) 
        }
        onSubmit = {
          async values=>{
             
            const subjectData = { 
                subjectId: null,
                subjectTitle: values.subject_title,
                editUserId: constants.getCurrentUserId(),
                editDatetime: '2020-01-01',
                ownerId: constants.getCurrentUserId(),
              } 
             
            try {
              const res = await fetch(constants.saveSubjectUrl(), {
                method: 'post',
                headers: {'Content-Type':'application/json'},
                body: JSON.stringify(subjectData)
               });
               const data = await res.json();
               alert(JSON.stringify(data));
            }
            catch (err) {
              console.log('EXCEPTION...!!!');
              alert(err);
            }
             
          }
        }
      >

        {
          props => (

            <Form>
              <p>
                <label>Subject Title</label>
                <Field type="text" name="subject_title"></Field>
                <ErrorMessage name="subject_title"></ErrorMessage>
              </p>
              
                
              <br />

              <button type='submit' disabled={ !props.isValid }>submit</button>
            
            </Form>
          )
        }

         

      </Formik>
 
    </div>
    );
}

export default InputSubject;


/*
      <form onSubmit={ formik.handleSubmit }>
          <label htmlFor="subject_title">Subject Title</label>
          <Field name="subject_title" onBlur={formik.handleBlur} onChange={formik.handleChange} value={ formik.values.subject_title }></input>
            { formik.touched.subject_title && formik.errors.subject_title ? 
              <span style={{color: 'red'}}> { formik.errors.subject_title } </span> : null }
              <br />
              <button type='submit'>submit</button>
         </form>
*/