import React, { useState } from "react";
import './searchComponent.css'


export const SearchComponent = ({ parentCallback }) => {
    const [value, setValue] = useState("");

    const handleChange = (e) => {
        setValue(e.target.value);
        parentCallback(e.target.value)
    };
    return (

        <div className="ui category search">
            <div className="ui icon input">
                <input className="prompt" type="text" value={value}
                    placeholder="Search city..." onChange={handleChange} />
                <i className="search icon"></i>
            </div>

        </div>
    );
}