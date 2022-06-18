import React from "react";
import './HeaderMainContainer.css'
// import "semantic-ui-css/semantic.min.css";
import { HeaderTopContains } from './HeaderTopContains/HeaderTopContains';
import { SearchComponent } from "./searchComponent/SearchComponent";

export const HeaderMainContainer = () => {
    return (<div className='head-main-container' >
        <HeaderTopContains />
        <div className="Bottom">
            <h1>Guinea Real Estate</h1>
            Find your new Home

            <SearchComponent />
        </div>
    </div>
    );
}