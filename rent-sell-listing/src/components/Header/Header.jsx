import React, {useEffect, useContext, useCallback}from "react";
import { Link } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import './Header.css';
import {useNavigate} from 'react-router-dom';
import {authContext} from '../../Context/authContext';

export const Header = () => {
    const {authanticated, setAuthanticated} =  useContext(authContext);
    let navigate =  useNavigate();

    const Logout = useCallback((e) =>{
        e.preventDefault();
        localStorage.clear()
        setAuthanticated(false)
    }, [authanticated])

    useEffect(() =>{


    },[authanticated])
    return (
        <div className="head_top_contains">
            <div className="left_of_menu">
            </div>
            <div className="menu">
                {authanticated ?
                    <Button className="button" onClick={Logout}>Logout</Button>
                        :
                    <>
                    <Link to="/" ><Button className="button">Login</Button></Link>
                    <Link to="/signup" ><Button className="button">Sign-up</Button></Link>
                </>
                }
            </div>
        </div >
    );
}