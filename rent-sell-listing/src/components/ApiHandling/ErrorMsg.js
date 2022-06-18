import React, {useState,useEffect} from  'react'
import {Alert} from 'react-bootstrap';
 
const ErrorMSg = ({msg, setOnError}) =>{
    const [show, setShow] = useState(true);
    useEffect(()=>{
      if(!show){
        setOnError('')
      }
    })

    if (show) {
      return (
        <Alert variant="danger" onClose={() => setShow(!show)} dismissible>
          <Alert.Heading>Error!</Alert.Heading>
          <p>{msg}</p>
        </Alert>
      );
    }
  }
  
  export default ErrorMSg