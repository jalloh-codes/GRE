import React from "react";
import { Header } from "../Header/Header";
import { Footer } from "../Footer/Footer";
import { Link } from "react-router-dom";
import "./Rent_or_sell_Component.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button'
import { useState } from "react";

export const Rent_or_sell_Component = ({ authStatus, logout }) => {
    const [theLink, setThelink] = useState('');

    const onChangeButton = (event) => {
        if (event.target.id === 'inline-radio-1') {
            setThelink('/rentlisting')
        }
        else setThelink('/selllisting')
    }

    return (
        <div className="App">

            <Header authStatus={authStatus} logout={logout}/>

            <Header authStatus={authStatus} logout={logout} />


            <div className="Login_form_container">
                <Form>

                    <div key={`inline-radio`} className="mb-3" onClick={onChangeButton}>
                        <Form.Check
                            inline
                            label="Rent"
                            name="group1"
                            type="radio"
                            id={`inline-radio-1`}
                        />
                        <Form.Check
                            inline
                            label="Sell"
                            name="group1"
                            type="radio"
                            id={`inline-radio-2`}
                        />
                    </div>
                    <Link to={theLink}>
                        <Button variant="primary" type="submit">
                            Next
                        </Button>
                    </Link>
                </Form>

            </div>
            <Footer />
        </div>
    );
}