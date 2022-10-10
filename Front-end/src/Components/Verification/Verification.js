import React, {useState, useEffect} from "react";
import {SEND_VERIFICATION, VERIFY_ACCOUNT, RESET_PASSWORD} from '../Api/mutation';
import Form from 'react-bootstrap/Form';
import {validateEmail }  from '../../Functions/AuthFunction';
import { useMutation, } from '@apollo/client';
import Button from 'react-bootstrap/Button';
import {useNavigate, useLocation} from 'react-router-dom';


export const Verification = ({resetPass}) => {
   
    const location = useLocation()
    const  navigate =  useNavigate();
    const [sendVerification, {loading}] = useMutation(SEND_VERIFICATION);
    const [VerifyAccount] = useMutation(VERIFY_ACCOUNT);
    const [email, setEmail] = useState(location.state?.email);
    const [codeSent, setCodeSent] = useState(location.state?.verification)
    const [code, setCode] = useState('');
    const [sentStatus, setSentStatus] = useState('');
    const [emailError, setEmailError] = useState({messgae: null,success: false});
   
    const reSendCode = (e) =>{
        e.preventDefault();
        if(validateEmail(email) && validateEmail(email).success){
            sendVerification({
                variables:{
                    email: email
                }
            }).then(res =>{
                localStorage.setItem('email', email)
                let data = res.data.sendVerification
                if(data.status){
                    setSentStatus(data.message)
                    setCodeSent(data.status)
                }
            }).catch(error =>{
                setCodeSent(false)
            })
            setCode('')
        }
       
    }
    
    const Verify = (e) =>{
        e.preventDefault();
        VerifyAccount({
            variables:{
                user: email,
                code: code
            }
        }).then(res =>{
            setCode('')
            if(resetPass){
                navigate('/resetpassword', { state: {resetComplete: email}})
            }else{
                setSentStatus("Account Veriffied")
                navigate('/login')
            }
        }).catch(error =>{
            setSentStatus("Code expire. New code sent to you account.")
        })
        
    }


    useEffect(() =>{
        if(email?.length > 1){
            const validEmail = validateEmail(email)
            if(!validEmail.success){
                setEmailError(validEmail)
            }else{
                setEmailError(validEmail)
            }
        }
        
    },[email])


    useEffect(() =>{
        if(sentStatus){
            setTimeout(() => {
                setSentStatus('')
            }, 8000);
        }
    },[sentStatus])
    

    if(!codeSent){
        return( 
            <Form className="Login_form_container" onSubmit={reSendCode}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <h5>Enter your Email to send a verification code</h5>
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" placeholder="Enter email" 
                    value={email} autoComplete="email" onChange={(e) => setEmail(e.target.value)} required/>
                    {emailError && <Form.Text className="text-muted">{emailError.messgae}</Form.Text>}
                </Form.Group>
                <Button variant="primary" type="submit">Next</Button>
            </Form>
        )
    }else if(codeSent){
        return(
            <Form className="Login_form_container" onSubmit={Verify}>
                <Form.Group className="mb-3">
                    <div> <h3 className="verify-label">Verify Account</h3></div>
                    <Form.Control type="text" placeholder="Enter veridication code" 
                    value={code} onChange={(e) => setCode(e.target.value)} required/>
                </Form.Group>
                {sentStatus ? <p className='sent-label'>{sentStatus}</p> :
                <button onClick={reSendCode} className="resend-button sent-label">Resend code</button>}
                <Button variant="primary" type="submit">Verify</Button>
            </Form>
        )
    }
    


}