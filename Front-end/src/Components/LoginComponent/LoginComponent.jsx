import React from "react";
import './LoginComponent.css';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import { HeaderTopContains } from '../Header/HeaderTopContains/HeaderTopContains'
import { FooterMainContainer } from '../Footer/FooterMainContainer'


export const LoginComponent = () => {
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

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" />
                </Form.Group>
                <a href="#" className="mb-3">Forgot my password ?</a>
                <Button variant="primary" type="submit">
                    Submit
                </Button>

            </Form>
            <FooterMainContainer />
        </div>
    );
}