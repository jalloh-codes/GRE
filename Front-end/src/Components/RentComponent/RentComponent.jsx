import React, { useCallback, useState, useEffect } from "react";
import axios from "axios";
import './RentComponent.css';
import Dropdown from 'react-bootstrap/Dropdown'

import { HeaderTopContains } from "../Header/HeaderTopContains/HeaderTopContains";
import { FooterMainContainer } from "../Footer/FooterMainContainer";
import { SearchComponent } from "../Header/searchComponent/SearchComponent";
import { SingleHome } from "../SingleHome/SingleHome";
import { BookingDates } from "../BookingDates/BookingDates";


import pict0 from "../../pictures/pict1.webp";
import pict1 from "../../pictures/pict2.webp";
import pict2 from "../../pictures/pict3.webp";
import pict3 from "../../pictures/pict4.webp";
import pict4 from "../../pictures/pict5.webp";
import pict5 from "../../pictures/pict6.jpeg";
import pict6 from "../../pictures/pict7.jpeg";
import pict7 from "../../pictures/pict8.webp";
import pict8 from "../../pictures/pict9.jpeg";
import pict9 from "../../pictures/pict10.webp";

const baseURL = "https://api.apify.com/v2/datasets/j5QKlrm9nCj0jKJWP/items?clean=true&format=json";
const pictureTab = [pict0, pict1, pict2, pict3, pict4, pict5, pict6, pict7, pict8, pict9, pict0, pict1, pict2, pict3, pict4, pict5, pict6, pict7, pict8, pict9];

export const RentComponent = () => {
    const Any = 20000000000;
    const [begin, setBegin] = useState(0);
    const [value, setValue] = useState("");
    const [Min, setMin] = useState(0);
    const [Max, setMax] = useState(Any);
    const [Beds, setBeds] = useState(0);
    const [Baths, setBaths] = useState(0);
    var [countfilter, setCountfilter] = useState(0);
    const [checked, setChecked] = useState(false);
    const [typeHome, setTypeHome] = useState("");
    //post will hold the data from the backend
    const [post, setPost] = React.useState(null);

    React.useEffect(() => {
        axios.get(baseURL).then((response) => {
            setPost(response.data);
        });
    }, []);
    const callback = useCallback((value) => {
        setValue(value);
    }, []);

    // To be improved
    let bar_number = [];
    let bar_number_indice = 1;
    let obj = {};
    obj[0] = 0;
    for (let i = 1; i <= pictureTab.length; i++) {
        if (i % 8 === 0) {
            bar_number.push(bar_number_indice);
            obj[bar_number_indice] = bar_number_indice * 8;
            bar_number_indice++;
        }
    }
    if (pictureTab.length % 8 !== 0) {
        obj[bar_number_indice] = pictureTab.length;
        bar_number.push(bar_number_indice);

    }

    const handleMin = (e) => {
        setMin(e.target.value);
    };
    const handleMax = (e) => {
        setMax(e.target.value);
    };
    const handleBeds = (e) => {
        setBeds(e.target.value);
    };
    const handleBaths = (e) => {
        setBaths(e.target.value);
    };

    const handChecked = (e) => {

        if (e.target.checked === true) {
            setCountfilter(countfilter + 1);
            setChecked(true)
        }
        else {
            setChecked(false)
            countfilter > 0 ? setCountfilter(countfilter - 1) : setCountfilter(0);
        }
    }
    const handleReset = () => {
        setCountfilter(0);
        setChecked(false)

    }
    //
    if (!post) return null;
    return (
        // the main div doesn't have a classname

        <div>

            <div className="head_top_contains">
                <HeaderTopContains />
            </div>
            <div className="rent_main_container">
                <span className="search_container">
                    <SearchComponent parentCallback={callback} />
                    <div className="Filter_container" >
                        <div className="Filter_container_prices_dates">
                            <div className="filter_container_min_max">
                                <label>Min price</label>
                                <input type="number" placeholder="Min price" className="price_input" min="0" value={Min} onChange={handleMin} />
                                <label> Max price</label>
                                <input type="number" placeholder="Max price" className="price_input" min="0" value={Max} onChange={handleMax} />
                                <select className="Money_sign">
                                    <option value="web">FG</option>
                                    <option selected="" value="images">US</option>
                                    <option selected="" value="images">Euro</option>
                                </select>
                            </div>
                            <div className="chooseDate">
                                {typeHome === "sortstay" && <BookingDates />}
                            </div>

                        </div>

                        <div className="Type_of_rent">
                            <b>Type of Rent </b>
                            <select class="ui dropdown label" value={typeHome} onChange={e => setTypeHome(e.target.value)}>
                                <option value="longstay" >Long Stay</option>
                                <option value="sortstay">Short stay</option>
                            </select>
                        </div>
                        {/* For amenities */}
                        {console.log(typeHome)}
                        <Dropdown>
                            <Dropdown.Toggle variant="success" id="dropdown-basic">
                                Amenities {countfilter}
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                                <form>
                                    <div class="form-check">
                                        <input type="checkbox" class="form-check-input" id="wifi" onClick={handChecked} />
                                        <label class="form-check-label" for="wifi">Wifi</label>
                                    </div>
                                    <div class="form-check">
                                        <input type="checkbox" class="form-check-input" id="furnished" onClick={handChecked} />
                                        <label class="form-check-label" for="furnished">Furnished</label>
                                    </div>
                                    <div class="form-check">
                                        <input type="checkbox" class="form-check-input" id="airconditioning" onClick={handChecked} />
                                        <label class="form-check-label" for="airconditioning">Airconditioning</label>
                                    </div>
                                    <button type="reset" class="btn btn-primary" onClick={handleReset}>Reset</button>
                                </form>
                            </Dropdown.Menu>
                        </Dropdown>


                        <div className="Filter_container_beds_baths">
                            <div className="beds_baths">
                                <label>Beds</label>
                                <input type="number" placeholder="Beds" className="bed_and_baths_input" min="0" value={Beds} onChange={handleBeds} />
                                <label>Baths</label>
                                <input type="number" placeholder="Baths" className="bed_and_baths_input" min="0" value={Baths} onChange={handleBaths} />
                            </div>
                            {/* For home types */}
                            <div className="hometypes" >
                                <Dropdown>
                                    <Dropdown.Toggle variant="success" id="dropdown-basic">
                                        Home type
                                    </Dropdown.Toggle>
                                    <Dropdown.Menu>
                                        <form>
                                            <div class="form-check">
                                                <input type="checkbox" class="form-check-input" id="house" />
                                                <label class="form-check-label" for="house">House</label>
                                            </div>
                                            <div class="form-check">
                                                <input type="checkbox" class="form-check-input" id="building" />
                                                <label class="form-check-label" for="building">Building</label>
                                            </div>
                                            <div class="form-check">
                                                <input type="checkbox" class="form-check-input" id="hotel" />
                                                <label class="form-check-label" for="hotel">Hotel</label>
                                            </div>
                                            <button type="reset" class="btn btn-primary">Reset</button>
                                        </form>
                                    </Dropdown.Menu>
                                </Dropdown>
                            </div>
                        </div>
                    </div>
                </span>
                <div className="rent_search_result">
                    {/* show api result */}
                    {pictureTab.slice(obj[begin], obj[begin + 1]).map((elem, i) => <div className="image"><div className="picture"><img src={elem} alt="Logo" /></div>
                        <SingleHome images={elem} value={post[i].name} location={post[i].location} roomType={post[i].roomType} address={post[i].address} />
                        <div className="title">{100}$/night</div></div>)
                    }

                    <div className="bar_number">
                        <table className="bar_table"><tr>
                            {bar_number.map((item, i) => <td className="cell" onClick={() => setBegin(i)}>{item}</td>)}</tr></table>
                    </div>
                </div>


            </div >
            <FooterMainContainer />
        </div >

    );
}