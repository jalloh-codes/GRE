import React, {useState, useEffect, useContext} from "react";
import './LoginComponent.css';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Header } from '../Header/Header'
import { Footer } from '../Footer/Footer'
import {LOGIN} from '../Api/mutation'
import { useMutation} from '@apollo/client';
import {useNavigate, Link} from 'react-router-dom';
import {Verification} from  '../Verification/Verification';
import Alert from 'react-bootstrap/Alert';
import {useToken} from  '../Api/useToken';
import {authContext} from  '../../Context/authContext'

export const LoginComponent = () => {
    const {setAuthanticated} =  useContext(authContext);
    const { token } = useToken();
    const [Login ] = useMutation(LOGIN)
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [onError, setOnError]  = useState({name: '', message: ''});
    const [resetNav, setResetnav] = useState(false);
    const [show, setShow] = useState(false);
    let navigate =  useNavigate();

    const submit =  async (e) =>{
        e.preventDefault();
        localStorage.removeItem('token')
        localStorage.removeItem('authanticated')
        localStorage.removeItem('user')
        Login({
            variables:{
                email: email,
                password: password,
            }
        }).then(res =>{
            const data  = res.data.Login
            if(data){
                localStorage.setItem('listingAccess', data.token);
                localStorage.setItem('user', JSON.stringify(data.user))
                localStorage.setItem('authanticated', true)
                setAuthanticated(true)
            }
        }).catch((err) =>{
            console.log(err);
            const jsonError =  JSON.parse(err.message)
            setOnError(jsonError)
        })
    }


    
    useEffect(() =>{
        if(onError.name){
            setShow(true)
        }
    },[onError])

    useEffect(() =>{
        if(token.token && token.authanticated){
            navigate('/makeChoice')
        }else{
            navigate('/')  
        }
    },[token.authanticated, navigate])
    
    return (
        <div className="App">
            <div className="head_top_contains">
                <Header />
            </div>
          
            {!resetNav ? 
            <Form className="Login_form_container" onSubmit={submit}>
                 {show && 
                    <Alert variant={'danger'} onClose={() => setShow(false)} dismissible>{onError.message}</Alert>
                }
                {onError.name !== 'authan' && 
                    <Link to={onError.name === 'verify' ?'/verify' : '/signup'} className="center-link">
                        {onError.message}
                    </Link>
                }
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
                {/* <button onClick={resetPassNav} className="resend-button sent-label">Forgot my password</button> */}
                <Link to="/resetpassword" state={{resetPass: true}}  className="center-text">
                    Forgot my password</Link>
                <Button variant="primary" type="submit">Submit</Button>  
            </Form>:
           <Verification getEmail={''} reset={true} emailLabel={'Send Code'}/>}
            <Footer />
        </div>
    );
}