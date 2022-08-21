import React, {useContext} from "react";
import { Link } from "react-router-dom";
import "./Menu.css"
import {authContext} from '../../../Context/authContext'
// import "semantic-ui-css/semantic.min.css";
import {useToken} from '../../../Components/Api/useToken';
import {useNavigate} from 'react-router-dom';

export const Menu = (props) => {
    const state =  useContext(authContext);
    let navigate =  useNavigate();

    const Logout = async (e) =>{
        e.preventDefault();
        await localStorage.removeItem('token');
        await localStorage.removeItem('authanticated');
        await localStorage.removeItem('user');
        navigate('/login')
    }
    return (

        <div class="ui menu header-menu">
            <Link to="/" class="active item">
                Home
            </Link>
            <Link to="/aboutUS" className="item" replace={true}>
                About Us
            </Link>
            <Link to="/rent" class="item">
                Rent
            </Link>
            <Link to="/buy" class="item">
                Buy
            </Link>
            <Link to="/contactUs" class="item">
                Contact US
            </Link>
            {state.authanticated ?
            <div class="right menu">
                <Link to="/signUp" class="SignUp" onClick={(e) => Logout(e)}>Log out</Link>
            </div>:
            <div class="right menu">
                <div id="google_translate_element"></div>
                <Link to="/login" class="Login">
                    Login
                </Link>
                <Link to="/signUp" class="SignUp">
                    Sign up
                </Link>
            </div>
                }
        </div >
    );
}