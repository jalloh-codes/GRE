import React from "react";
import { Link } from "react-router-dom";
import "./Menu.css"
import "semantic-ui-css/semantic.min.css";



export const Menu = () => {
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
            <Link to="/#" class="item">
                Contact Us
            </Link>

            <div class="right menu">
                <div id="google_translate_element"></div>
                <Link to="/login" class="Login">
                    Login
                </Link>
                <Link to="/signUp" class="SignUp">
                    Sign up
                </Link>
            </div>

        </div >
    );
}