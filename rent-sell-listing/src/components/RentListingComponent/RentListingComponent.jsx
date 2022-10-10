import React, {useState, useEffect, useContext} from "react";
import { Header } from "../Header/Header";
import { Footer } from "../Footer/Footer";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import "./RentListingComponent.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import {Add_Sell_Property} from '../Api/mutation';
import { useMutation } from '@apollo/client';
import Loading from "../ApiHandling/Loading";
import ErrorMSg from '../ApiHandling/ErrorMsg';
import { useNavigate} from 'react-router-dom';
import SuccessMsg from '../ApiHandling/SuccessMsg'
import {authContext} from '../../Context/authContext';
export const RentListingComponent = ({authStatus, logout}) => {

    const navigate = useNavigate()
    const {authanticated} =  useContext(authContext);
    const[createProperty, {loading}] = useMutation(Add_Sell_Property)
    const[price, setPrice] = useState(0.0)
    const[propertyType, setPropertyType] = useState(String)
    const[quantity, setQuantity] = useState(1)
    const[built, setBuilt] = useState(0)
    const[width, setWidth] = useState(0)
    const[length, setLength] = useState(0)
    const[wifi, setWifi] = useState(false)
    const[airCondition, setAirCondition] = useState(false)
    const[furnished, setFurnished] = useState(false)
    const[parking, setParking] = useState(false)
    const[lng, setLng] = useState(0.0)
    const[lat, setLat] = useState(0.0)
    const[bed, setBed] = useState(1)
    const[bath, setBath] = useState(1)
    const[region, setRegion] = useState('')
    const[commune, setCommune] = useState('')
    const[images, setImages] = useState(['https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg?cs=srgb&dl=pexels-binyamin-mellish-106399.jpg&fm=jpg'])
    const[descriptions, setDescriptions] = useState('')
    const[studio, setStudio] = useState(false)
    const [onError, setOnError]  = useState('')
    const [onSuccess, setOnSuccess] = useState('')

    // const data  = localStorage.getItem('user')
    // console.log(JSON.parse(data)._id);
    const submit = (e) =>{
        e.preventDefault();
        createProperty({
            variables:{
                studio: Boolean(studio),
                price: parseFloat(price),
                propertyType: propertyType,
                quantity: parseInt(quantity),
                built: parseInt(built),
                width: parseInt(width),
                length: parseInt(length),
                wifi: Boolean(wifi),
                airCondition: Boolean(airCondition),
                furnished: Boolean(furnished),
                parking: Boolean(parking),
                bed: parseInt(bed),
                bath: parseInt(bath),
                lng: parseFloat(lng),
                lat: parseFloat(lat),
                region: region,
                commune: commune,
                images: images,
                descriptions: descriptions,
            }
        }).then(res =>{
            const data  = res.data.createProperty
            setOnSuccess(data['message'])
        }).catch(err =>{
            setOnError(err["message"])
        })
    }

    

    useEffect(() =>{
        if(authanticated){
          return navigate('/makeChoice')
        }else{
          return navigate("/")
        }
      },[authanticated, navigate])

    if(loading){
        return
    }

    // lng, lat 9.587067532734139, -13.617767469830135
    return (
        <div className="App">
            <Header authStatus={authStatus} logout={logout}/>
            {onSuccess && <SuccessMsg msg={onSuccess} />}
            {onError && <ErrorMSg msg={onError} />}
            {loading ?
            <Loading /> :
            <Form className="rent_listing_container" onSubmit={submit}>
                <div className="property">
                    <div className="property_info">
                        <div>
                            {/* <div>
                                <label>Property title</label>
                                <input type="text" placeholder="property title" className="prop_input" required/>
                            </div> */}
                            <div>
                                <label>Property type</label>
                                <input type="text" value={propertyType} onChange={(e) => setPropertyType(e.target.value)}
                                 placeholder="property type" className="prop_input" />
                            </div>
                            <div>
                                <label>Property monthly price</label>
                                <input type="Number" value={price}  onChange={(e) => setPrice(e.target.value)}min="0" 
                                placeholder="property monthly price" className="prop_input" required/>
                            </div>
                            <div>
                                <label>Quantity</label>
                                <input type="Number" value={quantity} onChange={(e) => setQuantity(e.target.value)} 
                                min="1" placeholder="Quantity" className="prop_input" />
                            </div>
                            <div>
                                <label>Built</label>
                                <input type="number" min="0000" max="9999" value={built} 
                                onChange={(e) => setBuilt(e.target.value)}  placeholder="Year Built" className="prop_input" />
                            </div>
                            <div>
                                <label>Width</label>
                                <input type="number" value={width} onChange={(e) => setWidth(e.target.value)} min={0} className="width" />
                            </div>
                            <div>
                                <label>Length</label>
                                <input type="number" value={length} 
                                onChange={(e) => setLength(e.target.value)} min={0} className="length" />
                            </div>
                            <div>
                                <label>Bed</label>
                                <input type="number" value={bed} 
                                onChange={(e) => setBed(e.target.value)} min={1} className="length" />
                            </div>
                            <div>
                                <label>Length</label>
                                <input type="number" value={bath} 
                                onChange={(e) => setBath(e.target.value)} min={1} className="length" />
                            </div>
                            <div>
                            <Form.Check type="checkbox" label="Studio"  value={studio} onChange={(e) => setStudio(e.target.value)}/>
                            </div>
                        </div>
                    </div>
                    <div className="property_pictures">
                        <p>Upload property pictures</p>
                        <input type="file"  onChange={(e) => setImages(e.target.files[0])} />
                    </div>
                    
                </div>
                <div className="rest_of_the_info">
                    <div>
                        <h3>Amenities available</h3>
                        {/* <Form.Check type="checkbox" label="A/C" /> */}
                        <Form.Check type="checkbox" label="Wifi"  value={wifi} onChange={(e) => setWifi(e.target.value)}/>
                        <Form.Check type="checkbox" label="Air condition" value={airCondition} onChange={(e) => setAirCondition(e.target.value)} />
                        <Form.Check type="checkbox" label="furnished" value={furnished} onChange={(e) => setFurnished(e.target.value)}/>
                        <Form.Check type="checkbox" label="Parking"  value={parking} onChange={(e) => setParking(e.target.value)}/>
                    </div>
                    <div>
                        <h3>Coordinates</h3>
                        <input type="Number" placeholder="longitute" className="prop_input" 
                        value={lng} onChange={(e) => setLng(e.target.value)} />
                        <input type="Number" placeholder="Latitude" className="prop_input" 
                        value={lat} onChange={(e) => setLat(e.target.value)} />
                    </div>

                    <div>
                        <h3>Address</h3>
                        <input type="text" placeholder="Region/Commune" className="prop_input" value={region}
                          onChange={(e) => setRegion(e.target.value)} />
                        <input type="text" placeholder="Quartier/City" className="prop_input" value={commune}
                         onChange={(e) => setCommune(e.target.value)} />
                    </div>

                    {/* <div>
                        <label>Number of people allow</label>
                        <input type="number" min="0" />
                    </div> */}
                    {/* <div>
                        <h3>Property owner informations</h3>
                        <input type="tel" min="0" placeholder="phone number" className="prop_input" required/>
                        <input type="email" placeholder="email" className="prop_input" required/>
                    </div> */}
                    <div>
                        <label>Descriptions</label>
                        <textarea   placeholder="add discription" value={descriptions}
                         onChange={(e) => setDescriptions(e.target.value)} className="prop_input">
                        </textarea>
                    </div>
                </div>
                <div>
                    <Button variant="primary" type="submit">
                        Submit
                    </Button>
                </div>
            </Form>
            }
            <Footer />
        </div>
    );
}