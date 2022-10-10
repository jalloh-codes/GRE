import React, {useEffect, useState} from 'react';
import Form from 'react-bootstrap/Form';
import {validateEmail, validatePassword, validMatch}  from '../../Functions/AuthFunction';
export const Email = ({handleInput, email, name}) =>{
    const [emailError, setEmailError] = useState({messgae: null,success: false})

    useEffect(() =>{
        if(email.length > 1){
            const validEmail = validateEmail(email)
            setEmailError(validEmail)
        }else{
            setEmailError('')
            localStorage.setItem('email', email)
            // console.log(localStorage.getItem('email'));
        }
    },[email])


    return(
        <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control type="email" placeholder="Enter email"  name={name}
            value={email} autoComplete="email" onChange={handleInput} required/>
            {emailError && <Form.Text className="text-muted">{emailError.messgae}</Form.Text>}
        </Form.Group>
    )
}



export const Name = ({handleInput, name, value}) =>{

    return(
        <Form.Group className="mb-3" key={name}>
            <Form.Label>{name}</Form.Label>
            <Form.Control type="text" placeholder={`Enter your ${name}`} name={name} 
            value={value} onChange={handleInput} required/>
        </Form.Group>
    )
}


export const PhoneNumber = ({handleInput, name, value}) =>{
    
    return(
        <Form.Group className="mb-3">
            <Form.Label>Phone number(optional)</Form.Label>
            <Form.Control type="tel" placeholder="Enter phone number" name={name}
            value={value} onChange={handleInput}/>
        </Form.Group>
    )
}

export const Password = ({handleInput, name, value}) =>{
    const [passError, setPassError] = useState({messgae: null,success: false})
   
        useEffect(() =>{
            if(value.length > 1){
                const validPass = validatePassword(value)
                setPassError(validPass)
            }else{
                setPassError('')
            }
        },[value])
    
    return(
        <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>{name}</Form.Label>
            <Form.Control type="password" placeholder={'Enter match password'} 
             name={name} value={value} autoComplete="new-password" onChange={handleInput} required/>
            {passError && <Form.Text className="text-muted">{passError.messgae}</Form.Text>}
        </Form.Group>
    )
}


export const MatchPassword = ({handleInput, name, value, password}) =>{
     const [matchError, setMatchError] = useState({messgae: null,success: false})
   
        useEffect(() =>{
            if(value.length > 1){
                const matchPass = validMatch(value, password)
                setMatchError(matchPass)
            } 
        },[value])
    
    return(
        <Form.Group className="mb-3" controlId="formBasicRePassword1">
            <Form.Label>Match Password</Form.Label>
            <Form.Control type="password" placeholder="Re Enter Password" name={name}
            value={value} autoComplete="match-password" onChange={handleInput} required/>
            {matchError && <Form.Text className="text-muted">{matchError.messgae}</Form.Text> }
        </Form.Group>
    )
}