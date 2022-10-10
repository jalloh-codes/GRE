import React, {useEffect, useContext} from "react";
import './HeaderTopContains.css'
import { Menu } from "../Menu/Menu";
import { Logo} from "../Logo/Logo";
import {useNavigate} from 'react-router-dom';
import {authContext} from '../../../Context/authContext';
export const HeaderTopContains = () => {
    const {authanticated, setAuthanticated} =  useContext(authContext);
    let navigate =  useNavigate();

    const Logout = async (e) =>{
        e.preventDefault();
        await localStorage.clear()
        await setAuthanticated(false)
    }

    useEffect(() =>{


    },[authanticated])

    return (
        <div className="top">
            <div className="Logo">
                <Logo />
            </div>
            <div className="Menu">
                <Menu authanticated={authanticated} Logout={Logout}/>
            </div>
        </div>

    );
}