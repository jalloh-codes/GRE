import React from "react";
import './FooterMainContainer.css'

import Footer from './Footer_logo.png';

export const FooterMainContainer = () => {
    return (
        <div className='footer--main-container'>
            <div className="footer_text">

                <p>Copyright © 2022 Guinea Real Estate LLC, Inc. All rights reserved Privacy Terms</p>
            </div>
            <div className="footer_logo">
                <img src={Footer} alt="logo" />
            </div>
        </div>
    );
}