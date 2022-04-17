import React from "react";
import { Link } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import './Header.css';

export const Header = () => {
    return (
        <div className="head_top_contains">
            <div className="left_of_menu">

            </div>
            <div className="menu">

                <Link to="/login" ><Button className="button">Login</Button></Link>
                <Link to="/sign-up" ><Button className="button">Sign-up</Button></Link>
            </div>
        </div >
    );
}