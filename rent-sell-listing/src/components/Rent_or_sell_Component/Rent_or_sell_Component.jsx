import React from "react";
import { Header } from "../Header/Header";
import { Footer } from "../Footer/Footer";
import { Link } from "react-router-dom";
import "./Rent_or_sell_Component.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button'

export const Rent_or_sell_Component = () => {
    return (
        <div className="App">
            <Header />

            <div className="Login_form_container">
                <Form>

                    <div key={`inline-radio`} className="mb-3">
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
                    <Link to='/rentlisting'>
                        <Button variant="primary" type="submit">
                            Next
                        </Button>
                    </Link>
                    <Link to='/selllisting'>
                        <Button variant="primary" type="submit">
                            Next_sell
                        </Button>
                    </Link>
                </Form>

            </div>
            <Footer />
        </div>
    );
}