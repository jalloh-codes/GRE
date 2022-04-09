import React from "react";

import { useState } from "react";
import './ContactComponent.css';

import { HeaderTopContains } from '../Header/HeaderTopContains/HeaderTopContains'
import { FooterMainContainer } from "../Footer/FooterMainContainer";






export const ContactComponent = (props) => {
    return (
        <div className="App">
            <div className='Contact-header-container' >
                <HeaderTopContains />
                <div className="Bottom">
                    <h1>Contact US</h1>
                    Anything that we can help you with?
                </div>
            </div>

            <div className="Contact_main_container">
                <h1>For direct phone/whatsApp</h1>
                <p>Phone: +224 624-65-42-01</p>
                <p>WhatsApp: +224 624-65-42-01</p>

                <h1>OTHER</h1>
                <form class="ui form">
                    <div class="field">
                        <label>First Name</label>
                        <input type="text" name="first-name" placeholder="First Name" />
                    </div>
                    <div class="field">
                        <label>Last Name</label>
                        <input type="text" name="last-name" placeholder="Last Name" />
                    </div>
                    <div class="field">
                        <label>Email</label>
                        <input type="email" name="last-name" placeholder="email" />
                    </div>
                    <div class="field">
                        <label>Phone number</label>
                        <input type="number" name="last-name" placeholder="number" />
                    </div>
                    <div class="field">
                        <label>Comments</label>
                        <textarea></textarea>
                    </div>
                    <button class="ui button" type="submit">Submit</button>
                </form>
            </div>

            <FooterMainContainer />
        </div>



    );
}