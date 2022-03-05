import React from "react";
import logo from "./logo.png";
import './Logo.css'
import { Link } from "react-router-dom";

export const Logo = () => {
    return (
        <Link to="/">
            <img src={logo} alt="Logo" />
        </Link>
    );
}