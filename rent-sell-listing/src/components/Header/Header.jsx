import React from "react";
import { Link } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import './Header.css';

export const Header = ({authStatus, logout}) => {



    return (
        <div className="head_top_contains">
            <div className="left_of_menu">

            </div>
            <div className="menu">
                {authStatus?
                <Link to="/" ><Button className="button" onClick={logout}>Logout</Button></Link>:
                <>
                <Link to="/" ><Button className="button">Login</Button></Link>
                <Link to="/sign-up" ><Button className="button">Sign-up</Button></Link>
                </>
                }
            </div>
        </div >
    );
}