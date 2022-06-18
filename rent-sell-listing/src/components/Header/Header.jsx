import React from "react";
import { Link, NavLink } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import './Header.css';
import {useNavigate} from 'react-router-dom';
export const Header = ({authStatus, logout}) => {

    return (
        <div className="head_top_contains">
            <div className="left_of_menu">
            </div>
            <div className="menu">
                {authStatus?
                    // <Link to="/home">
                        <Button className="button" onClick={logout}>Logout</Button>
                        // </Link> 
                    :
                <>
                <Link to="/home" ><Button className="button">Login</Button></Link>
                <Link to="/sign-up" ><Button className="button">Sign-up</Button></Link>
                </>
                }
            </div>
        </div >
    );
}