import React, {useState} from "react";
import { Header } from "../Header/Header";
import { Footer } from "../Footer/Footer";
import "./SignUpComponent.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button'
import {SIGN_UP} from '../Api/mutation';
import { useMutation } from '@apollo/client';
import Loading from '../ApiHandling/Loading';
import ErrorMSg from '../ApiHandling/ErrorMsg';
export const SignUpComponent = () => {

    const [signup, { loading}] = useMutation(SIGN_UP)
    const [email, setEmail] = useState('')
    const [firstname, setFirstname] = useState('')
    const [lastname, setLastname] = useState('')
    const [phoneNumber, setPhoneNumber] = useState('')
    const [password, setPassword] = useState('')
    const [rePassword, setRePassword] = useState('')
    const [onError, setOnError]  = useState('')

    const submit = (e) =>{
        e.preventDefault();
        signup({
            variables:{
                firstname: firstname,
                lastname: lastname,
                email: email,
                password: password,
                UserType: "Listing",
                phoneNumber: phoneNumber
            }
        })
        .then(res =>{
            console.log(res.login);
        }).catch(err=>{
            console.log(err);
            setOnError(err["message"])
        })
    }
    // 9.587067532734139, -13.617767469830135
    // TODO
    // Change parent class name to something else beside 'App'
    return (
        <div className="App">
            <Header />
            {onError && <ErrorMSg msg={onError} />}
            {loading ?
            <Loading />:
            <Form className="Login_form_container" onSubmit={submit}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" placeholder="Enter email" 
                    value={email} autoComplete="email" onChange={(e) => setEmail(e.target.value)} required/>
                    <Form.Text className="text-muted">
                        We'll never share your email with anyone else.
                    </Form.Text>
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Firstname</Form.Label>
                    <Form.Control type="text" placeholder="Enter your Firstname" 
                    value={firstname} onChange={(e) => setFirstname(e.target.value)} required/>
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Lastname</Form.Label>
                    <Form.Control type="text" placeholder="Enter your Lastname"
                    value={lastname} onChange={(e) => setLastname(e.target.value)} required/>
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Phone number(optional)</Form.Label>
                    <Form.Control type="tel" placeholder="Enter phone number"
                    value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} required/>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Enter Password"
                    value={password} autoComplete="new-password" onChange={(e) => setPassword(e.target.value)} required/>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicRePassword1">
                    <Form.Label>Match Password</Form.Label>
                    <Form.Control type="password" placeholder="Re Enter Password"
                    value={rePassword} autoComplete="match-password" onChange={(e) => setRePassword(e.target.value)} required/>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicCheckbox">
                    <Form.Check type="checkbox" label="I accept the GRE terms of use." />
                </Form.Group>
                {/* <input type="submit" variant="primary" value={"Submit"}/> */}
                <Button variant="primary" type="submit">
                     Submit
                </Button>

            </Form>
            }
           
            <Footer />
        </div>
    );
}

// email: String!
// password: String!
// UserType: String!
// phoneNumber: String!