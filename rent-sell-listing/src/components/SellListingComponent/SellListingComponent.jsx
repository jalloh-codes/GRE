import React from "react";
import { Header } from "../Header/Header";
import { Footer } from "../Footer/Footer";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';


export const SellListingComponent = () => {
    return (
        <div className="App">
            <Header />
            <Form className="rent_listing_container" >
                <div className="property">
                    <div className="property_info">
                        <form>
                            <div>
                                <label>Property title</label>
                                <input type="text" placeholder="property title" className="prop_input" />
                            </div>
                            <div>
                                <label>Property type</label>
                                <input type="text" placeholder="ex: house/land/building" className="prop_input" />
                            </div>
                            <div>
                                <label>Property price</label>
                                <input type="Number" min="0" placeholder="ex: 100M FG" className="prop_input" />
                            </div>

                        </form>
                    </div>
                    <div className="property_pictures">
                        <p>Upload property pictures</p>
                        <input type="file" accept="image/*" />
                    </div>
                </div>
                <div className="rest_of_the_info">
                    <div>
                        <h3>Coordinates</h3>
                        <input type="Number" placeholder="longitute" className="prop_input" />
                        <input type="Number" placeholder="Latitude" className="prop_input" />
                    </div>

                    <div>
                        <h3>Address</h3>
                        <input type="text" placeholder="Region/Commune" className="prop_input" />
                        <input type="text" placeholder="Quartier/City" className="prop_input" />
                    </div>

                    <div>
                        <label>Number of people allow</label>
                        <input type="number" min="0" />
                    </div>
                    <div>
                        <h3>Property owner informations</h3>
                        <input type="numbeer" min="0" placeholder="phone number" className="prop_input" />
                        <input type="email" placeholder="email" className="prop_input" />
                    </div>
                </div>
                <div>
                    <Button variant="primary" type="submit">
                        Submit
                    </Button>
                </div>
            </Form>
            <Footer />
        </div>
    );
}