import React, {useState, useEffect} from "react";
import './SignUpComponent.css';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Header } from '../Header/Header';
import { Footer } from '../Footer/Footer';
import {SIGN_UP} from '../Api/mutation';
import { useMutation } from '@apollo/client';
import {validateEmail, validatePassword, validMatch}  from '../../Functions/AuthFunction';
import {useToken} from  '../Api/useToken';
import {useNavigate} from 'react-router-dom';
export const SignUpComponent = () => {

    const { token } = useToken();
    let navigate =  useNavigate();
    const [SignUp] = useMutation(SIGN_UP)
    const [email, setEmail] = useState('')
    const [firstname, setFirstname] = useState('')
    const [lastname, setLastname] = useState('')
    const [phoneNumber, setPhoneNumber] = useState('')
    const [password, setPassword] = useState('')
    const [rePassword, setRePassword] = useState('')
    const [onError, setOnError]  = useState('')
    
    const [emailError, setEmailError] = useState({messgae: null,success: false})
    const [passError, setPassError] = useState({messgae: null,success: false})
    const [matchError, setMatchError] = useState({messgae: null,success: false})




    const submit = (e) =>{
        e.preventDefault();
        SignUp({
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
            const data = res.data.SignUp
            if(data.account){
                navigate('/verify', { state: { email: email, verification: data.verification}})
            }
        }).catch(err=>{
            setOnError(err["message"])
        })
    }

    useEffect(() =>{
        if(token.token && token.authanticated){
            navigate('/')
        }
    },[token])

    useEffect(() =>{
        if(email.length > 1){
            const validEmail = validateEmail(email)
            setEmailError(validEmail)
        }else{
            setEmailError('')
            
        }
    },[email])

    useEffect(() =>{
        if(password.length > 1){
            const validPass = validatePassword(password)
            setPassError(validPass)
        }else{
            setPassError('')
        }
    },[password])

    useEffect(() =>{
        if(rePassword.length > 1){
            const matchPass = validMatch(password, rePassword)
            setMatchError(matchPass)
        }
    },[rePassword])

    return (
        <div className="App">
            <div className="head_top_contains">
                <Header />
            </div>
            <Form className="Login_form_container" onSubmit={submit}>
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
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" placeholder="Enter email" 
                    value={email} autoComplete="email" onChange={(e) => setEmail(e.target.value)} required/>
                    {emailError && <Form.Text className="text-muted">{emailError.messgae}</Form.Text>}
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
                     {passError && <Form.Text className="text-muted">{passError.messgae}</Form.Text>}
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicRePassword1">
                    <Form.Label>Match Password</Form.Label>
                    <Form.Control type="password" placeholder="Re Enter Password"
                    value={rePassword} autoComplete="match-password" onChange={(e) => setRePassword(e.target.value)} required/>
                    {matchError && <Form.Text className="text-muted">{matchError.messgae}</Form.Text> }
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicCheckbox">
                    <Form.Check type="checkbox" label="I accept the GRE terms of use." />
                </Form.Group>
                <Button variant="primary" type="submit">
                    Submit
                </Button>

            </Form>
            <Footer />
        </div>
    );
}