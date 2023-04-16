import React from "react";
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { SimpleMap } from './SimpleMap';

import './SingleHome.css';
import { useState } from "react";

function MyVerticallyCenteredModal(props) {

    return (
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >

            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    {props.value}
                </Modal.Title>
            </Modal.Header>
            <div className="picture_for_singleHome_for_the_Modal">
                <img src={props.images} alt="Logo"  loading="lazy"/>
            </div>
            <div className="container_singleHOme_modal">
                <p><b>Property Type:</b> {props.roomType}</p>
                <p><b>Address :</b> {props.address}</p>

                <button class="huge ui button right floated" onClick={props.handleRequest}>
                    contact us for this property
                </button>
            </div>
            <Modal.Body>
                <SimpleMap location={props.location} />
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={props.onHide}>Close</Button>
            </Modal.Footer>
        </Modal>
    );
}

const homeTitle = (title) => {
    if (title.length > 38) {
        return title.slice(0, 38) + "...";
    }

    return title;
}


function FormTemplete(props) {
    const handleClose = () => {
        props.onHide();
        props.handleClose();
    }
    return (
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >

            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Modal heading
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
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
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={handleClose}>Close</Button>
            </Modal.Footer>
        </Modal>
    );
}

export const SingleHome = (props) => {
    const [modalShow, setModalShow] = React.useState(false);
    const [request, SetRequest] = useState(false);

    if (request) {
        return <>
            <a className="title" onClick={() => setModalShow(true)}>
                {homeTitle(props.value)}
            </a>
            <FormTemplete show={modalShow} onHide={() => setModalShow(false)} handleClose={() => SetRequest(false)} />
        </>
    }
    return (
        <>
            <a className="title" onClick={() => setModalShow(true)}>
                {homeTitle(props.value)}
            </a>
            <MyVerticallyCenteredModal
                show={modalShow}
                onHide={() => setModalShow(false)}
                images={props.images}
                value={props.value}
                location={props.location}
                roomType={props.roomType}
                address={props.address}
                request={request}
                handleRequest={() => SetRequest(true)}
            />
        </>
    );
}