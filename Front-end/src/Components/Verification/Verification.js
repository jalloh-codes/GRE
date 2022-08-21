import React, {useState, useEffect} from "react";
import {SEND_VERIFICATION, VERIFY_ACCOUNT} from '../Api/mutation';
import Form from 'react-bootstrap/Form';
import {validateEmail }  from '../../Functions/AuthFunction';
import { useMutation } from '@apollo/client';
import Button from 'react-bootstrap/Button';
import {SendCode} from './SendCode'
import { GetEmail } from "./GetEmail";
import {useNavigate} from 'react-router-dom';
export const Verification = ({getEmail}) => {
   
    const [sendVerification, {loading}] = useMutation(SEND_VERIFICATION);
    const [VerifyAccount] = useMutation(VERIFY_ACCOUNT);
    let navigate =  useNavigate();
    const [email, setEmail] = useState(String);
    const [code, setCode] = useState(String);
    const [sentStatus, setSentStatus] = useState(String);
    const [emailError, setEmailError] = useState({messgae: null,success: false});
    const [next, setNext] = useState(false);

    const reSendCode = (e) =>{
        e.preventDefault();
        if(validateEmail(email).success){
            sendVerification({
                variables:{
                    email: email
                }
            }).then(res =>{
                let data = res.data.sendVerification
                if(data.status){
                    setSentStatus(data.message)
                    setNext(true)
                }
            }).catch(error =>{
                console.log(error);
                setNext(false)
            })
        }
    }

    const Verify= (e) =>{
        e.preventDefault();
        VerifyAccount({
            variables:{
                user: email,
                code: code
            }
        }).then(res =>{
            navigate('/login')
        }).catch(error =>{
            setSentStatus("Code expire. New code sent to you account.")
        })
    }

    useEffect(() =>{
        if(email.length > 1){
            const validEmail = validateEmail(email)
            if(!validEmail.success){
                setEmailError(validEmail)
            }else{
                setEmailError(validEmail)
            }
        }
        
    },[email])

    useEffect(()=>{
        if(getEmail){
            console.log('here');
            setNext(true)
            setEmail(getEmail)
        }else{
            setNext(false)
        }
    },[getEmail])

    useEffect(() =>{
        if(sentStatus){
            setTimeout(() => {
                setSentStatus('')
            }, 8000);
        }
    },[sentStatus])

    const nextComp = (e) =>{
        e.preventDefault()
        if(validateEmail(email)){
            if(validateEmail(email).success){
                reSendCode(e)
            }else{
                setNext(false)
            }
        }
    }

    if(!next){
        return  <GetEmail email={email} setEmail={setEmail} emailError={emailError} nextComp={nextComp} />
    }else if(next || getEmail){
        return <SendCode code={code} setCode={setCode} Verify={Verify} reSendCode={reSendCode} sentStatus={sentStatus} />
    }
}