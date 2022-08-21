import React, {useState} from "react";
import './LoginComponent.css';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import { HeaderTopContains } from '../Header/HeaderTopContains/HeaderTopContains'
import { FooterMainContainer } from '../Footer/FooterMainContainer'
import {LOGIN} from '../Api/mutation'
import { useMutation } from '@apollo/client';
import {useNavigate} from 'react-router-dom';
export const LoginComponent = () => {

    const [Login, {loading}] = useMutation(LOGIN)
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [onError, setOnError]  = useState('')
    let navigate =  useNavigate();
    const submit = (e) =>{
        e.preventDefault();
        localStorage.removeItem('token')
        localStorage.removeItem('authanticated')
        localStorage.removeItem('user')
        Login({
            variables:{
                email: email,
                password: password,
            }
        })
        .then(res =>{
            const data  = res.data.Login

            if(data){
                localStorage.setItem('token', data.token);
                localStorage.setItem('user', JSON.stringify(data.user))
                localStorage.setItem('authanticated', true)
            }
            navigate('/')
        }).catch(err=>{
            console.log(err);
            setOnError(err["message"])
        })
    }

    return (
        <div className="App">
            <div className="head_top_contains">
                <HeaderTopContains />
            </div>


            <Form className="Login_form_container" onSubmit={submit}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" placeholder="Enter email" 
                    value={email} autoComplete="email" onChange={(e) => setEmail(e.target.value)} required/>
                    <Form.Text className="text-muted">
                        We'll never share your email with anyone else.
                    </Form.Text>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" 
                    value={password} autoComplete="current-password" onChange={(e) => setPassword(e.target.value)} required/>
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