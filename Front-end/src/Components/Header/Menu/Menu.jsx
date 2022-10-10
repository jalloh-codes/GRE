import React from "react";
import { Link } from "react-router-dom";
import "./Menu.css"

// import "semantic-ui-css/semantic.min.css";


export const Menu = ({authanticated, Logout}) => {

    return (

        <div className="ui menu header-menu">
            <Link to="/" className="active item">
                Home
            </Link>
            <Link to="/aboutUS" className="item" replace={true}>
                About Us
            </Link>
            <Link to="/rent" className="item">
                Rent
            </Link>
            <Link to="/buy" className="item">
                Buy
            </Link>
            <Link to="/contactUs" className="item">
                Contact US
            </Link>
            {authanticated ?
            <div className="right menu">
                <Link to="/signUp" className="SignUp" onClick={Logout}>Log out</Link>
            </div>:
            <div className="right menu">
                <div id="google_translate_element"></div>
                <Link to="/login" className="Login">
                    Login
                </Link>
                <Link to="/signUp" className="SignUp">
                    Sign up
                </Link>
            </div>
                }
        </div >
    );
}