import React from "react";
import './HeaderTopContains.css'
import { Menu } from "../Menu/Menu";
import { Logo } from "../Logo/Logo";


export const HeaderTopContains = () => {

    return (
        <div className="top">
            <div className="Logo">
                <Logo />
            </div>
            <div className="Menu">
                <Menu />
            </div>
        </div>

    );
}