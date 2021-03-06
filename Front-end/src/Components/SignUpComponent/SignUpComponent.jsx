import React from "react";
import './SignUpComponent.css';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import { HeaderTopContains } from '../Header/HeaderTopContains/HeaderTopContains';
import { FooterMainContainer } from '../Footer/FooterMainContainer';


export const SignUpComponent = () => {

    return (
        <div className="App">
            <div className="head_top_contains">
                <HeaderTopContains />
            </div>
            <Form className="Login_form_container">
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" placeholder="Enter email" />
                    <Form.Text className="text-muted">
                        We'll never share your email with anyone else.
                    </Form.Text>
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Phone number(optional)</Form.Label>
                    <Form.Control type="tel" placeholder="Enter phone number" />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicCheckbox">
                    <Form.Check type="checkbox" label="I accept the GRE terms of use." />
                </Form.Group>
                <Button variant="primary" type="submit">
                    Submit
                </Button>

            </Form>

            <FooterMainContainer />
        </div>
    );
}