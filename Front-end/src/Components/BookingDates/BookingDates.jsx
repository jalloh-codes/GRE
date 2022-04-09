import React, { useState } from "react";
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { Dateranges } from './Dateranges';
import "./BookingDates.css";


function MyVerticallyCenteredModal(props) {
    const [countAdult, setCountadult] = useState(0);
    const [countchildren, setCountchildren] = useState(0);
    const [countinfant, setCountinfant] = useState(0);
    const [countpet, setCountpet] = useState(0);

    return (
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Choose your Booking dates
                </Modal.Title>
            </Modal.Header>
            <Modal.Body className="Modal_body">
                <div className="calandar">
                    <Dateranges />
                </div>
                <div className="guesses">
                    <p><label>Adults</label><button onClick={() => countAdult > 0 ? setCountadult(countAdult - 1) : setCountadult(0)}>-</button>
                        {countAdult}
                        <button onClick={() => setCountadult(countAdult + 1)}>+</button></p>
                    <p><label>Children </label><button onClick={() => countchildren > 0 ? setCountchildren(countchildren - 1) : setCountchildren(0)}>-</button>
                        {countchildren}
                        <button onClick={() => setCountchildren(countchildren + 1)}>+</button></p>
                    <p><label>Infants</label><button onClick={() => countinfant > 0 ? setCountinfant(countinfant - 1) : setCountinfant(0)}>-</button>
                        {countinfant}
                        <button onClick={() => setCountinfant(countinfant + 1)}>+</button></p>
                    <p> <label>Pets</label> <button onClick={() => countpet > 0 ? setCountpet(countpet - 1) : setCountpet(0)}>-</button>
                        {countpet}
                        <button onClick={() => setCountpet(countpet + 1)}>+</button></p>
                </div>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={props.onHide}>Close</Button>
            </Modal.Footer>
        </Modal>
    );
}

export function BookingDates() {
    const [modalShow, setModalShow] = React.useState(false);

    return (
        <>
            <Button variant="primary" onClick={() => setModalShow(true)}>
                add Dates
            </Button>

            <MyVerticallyCenteredModal
                show={modalShow}
                onHide={() => setModalShow(false)}
            />
        </>
    );
}