import React, {useState,} from  'react'
import {Alert} from 'react-bootstrap';
 
const SuccessMsg = ({msg}) =>{
    const [show, setShow] = useState(true);
  
    if (show) {
      return (
        <Alert variant="success" onClose={() => setShow(false)} dismissible>
          <Alert.Heading>Success!</Alert.Heading>
          <p>{msg}</p>
        </Alert>
      );
    }
    // return <Button onClick={() => setShow(true)}>Show Alert</Button>;
  }
  
  export default SuccessMsg