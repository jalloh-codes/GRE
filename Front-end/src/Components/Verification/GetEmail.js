import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import React, {useEffect} from "react";
export const GetEmail = ({emailError, email, setEmail, nextComp})  =>{


    return(
        <Form className="Login_form_container">
            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control type="email" placeholder="Enter email" 
                value={email} autoComplete="email" onChange={(e) => setEmail(e.target.value)} required/>
                {emailError && <Form.Text className="text-muted">{emailError.messgae}</Form.Text>}
            </Form.Group>
            <Button variant="primary" type="submit" onClick={nextComp}>Next</Button>
        </Form>
    )
}