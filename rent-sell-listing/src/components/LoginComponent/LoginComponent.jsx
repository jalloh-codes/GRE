import React, {useState, useEffect} from "react";
import { Header } from "../Header/Header";
import { Footer } from "../Footer/Footer";
import { Link } from "react-router-dom"; // to be checked
import "./LoginComponent.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useMutation } from '@apollo/client';
import Loading from '../ApiHandling/Loading';
import ErrorMSg from '../ApiHandling/ErrorMsg';
import {LOGIN} from '../Api/mutation'
import { useNavigate} from 'react-router-dom'

export const LoginComponent = ({setToken, authStatus}) => {

    const [login, {loading}] = useMutation(LOGIN)
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [onError, setOnError]  = useState('')
    const navigate = useNavigate()
    const submit = (e) =>{
        e.preventDefault();
        login({
            variables:{
                email: email,
                password: password,
            }
        })
        .then(res =>{
            const data  = res.data.login
            setToken(data.token)
            localStorage.setItem('user', JSON.stringify(data.user))
            return navigate('/makeChoice')
        }).catch(err=>{
            setOnError(err["message"])
        })
    }

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

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" 
                    value={password} autoComplete="current-password" onChange={(e) => setPassword(e.target.value)} required/>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicCheckbox">
                    <Form.Check type="checkbox" label="Check me out" />
                </Form.Group>
                {/* <Link to="/makeChoice" > */}
                <Button variant="primary" type="submit">
                    Submit
                </Button>
                {/* </Link> */}
            </Form>
            }

            <Footer />
        </div>
    );
}