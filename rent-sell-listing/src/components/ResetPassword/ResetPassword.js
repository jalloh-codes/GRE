import React, {useState, useEffect, useContext} from 'react'
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import {validatePassword, validMatch}  from '../../Functions/AuthFunction';
import {useToken} from  '../Api/useToken';
import {authContext} from '../../Context/authContext';
import {RESET_PASSWORD} from '../Api/mutation';
import { useMutation, } from '@apollo/client';
import {useNavigate, useLocation} from 'react-router-dom';
import {Verification} from '../Verification/Verification';

export const ResetPassword = () => {
    const location = useLocation();
    const resetComplete = location.state.resetComplete
    const  navigate =  useNavigate();
    const [passError, setPassError] = useState({messgae: null,success: false})
    const [matchError, setMatchError] = useState({messgae: null,success: false})
    const [email, setEmail] = useState(localStorage.getItem('email')? localStorage.getItem('email') : '');
    const [oldPassword, setOldPassword] = useState('')
    const [newPassword, setNewPassword] = useState('')
    const { token } = useToken();
    const {authanticated} =  useContext(authContext);
    const [resetPassword] = useMutation(RESET_PASSWORD);
    const [matchPassword, setMatchPassword] = useState('')
    const [codeSend, setCodeSent] = useState(false)


    // TODO
    // Add seesion for reseting password

    const resetPass = (e) =>{
        e.preventDefault();
        if(email){
            resetPassword({
                variables:{
                    email: email,
                    oldPassword: oldPassword,
                    newPassword: newPassword
                }
            }).then(res =>{
                console.log(res);
                navigate('/')
            }).catch(error => {
                // TODO
                // Error handleling
            
            })
        }
    }


    useEffect(() =>{
        if(newPassword.length > 1){
            const validPass = validatePassword(newPassword)
            setPassError(validPass)
        }else{
            setPassError('')
        }
    },[newPassword])


    useEffect(() =>{
        if(matchPassword.length > 1){
            const matchPass = validMatch(newPassword, matchPassword)
            setMatchError(matchPass)
        }
    },[matchPassword])

    useEffect(()=>{
        if((authanticated && token.authanticated) || resetComplete){
            setCodeSent(true)
        }
    }, [token, authanticated, resetComplete])


    if(!codeSend){
        return(
            <Verification  resetPass={location.state.resetPass}/>
        )
    }else{
        return (
            <Form className="Login_form_container" onSubmit={resetPass}>
                {/* <button onClick={reSendCode} className="resend-button sent-label">Resend code</button> */}
                <Form.Group className="mb-3" controlId="formBasicPassword">
                    {/* {returnStatus && <Alert variant={'danger'} onClose={() => setShow(false, setReturnStatus(''))} dismissible>
                            {returnStatus}</Alert>} */}
                    <Form.Label>Old Password</Form.Label>
                    <Form.Control type="password" placeholder="Enter Old Password"
                    value={oldPassword} autoComplete="old-password" onChange={(e) => setOldPassword(e.target.value)} required/>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicRePassword1">
                    <Form.Label>New Password</Form.Label>
                    <Form.Control type="password" placeholder="Enter New Password"
                    value={newPassword} autoComplete="new-password" onChange={(e) => setNewPassword(e.target.value)} required/>
                    {passError && <Form.Text className="text-muted">{passError.messgae}</Form.Text>}
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicPassword2">
                    <Form.Label>Match Password</Form.Label>
                    <Form.Control type="password" placeholder="Re Enter Password"
                    value={matchPassword} autoComplete="match-password" onChange={(e) => setMatchPassword(e.target.value)} required/>
                    {matchError && <Form.Text className="text-muted">{matchError.messgae}</Form.Text> }
                </Form.Group>
                <Button variant="primary" type="submit">Submit</Button>
            </Form>
        )
    }
}
