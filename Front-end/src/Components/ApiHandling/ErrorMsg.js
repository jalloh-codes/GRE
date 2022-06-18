import React, {useState,} from  'react'
import {Alert} from 'react-bootstrap';
 
const ErrorMSg = ({msg}) =>{
    const [show, setShow] = useState(true);
  
    if (show) {
      return (
        <Alert variant="danger" onClose={() => setShow(false)} dismissible>
          <Alert.Heading>Error!</Alert.Heading>
          <p>{msg}</p>
        </Alert>
      );
    }
    // return <Button onClick={() => setShow(true)}>Show Alert</Button>;
  }
  
  export default ErrorMSg