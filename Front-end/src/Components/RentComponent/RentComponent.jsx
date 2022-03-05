import React, { useCallback, useState } from "react";
import './RentComponent.css'
import { HeaderTopContains } from "../Header/HeaderTopContains/HeaderTopContains";
import { FooterMainContainer } from "../Footer/FooterMainContainer";
import { SearchComponent } from "../Header/searchComponent/SearchComponent";



export const RentComponent = () => {
    const [value, setValue] = useState("");

    const callback = useCallback((value) => {
        setValue(value);
    }, []);
    return (
        <div className="App">
            <div className="head_top_contains">
                <HeaderTopContains />
            </div>

            <div className="rent_main_container">
                <span className="search_container">
                    <SearchComponent parentCallback={callback} />
                </span>

                <h1> {value}</h1>
            </div>
            <FooterMainContainer />
        </div>

    );
}