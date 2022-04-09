import React, { useState } from "react";
import './SearchComponent.css'


export const SearchComponent = ({ parentCallback }) => {
    const [value, setValue] = useState("");

    const handleChange = (e) => {
        setValue(e.target.value);
        parentCallback(e.target.value)
    };
    return (

        <div class="ui category search">
            <div class="ui icon input">
                <input class="prompt" type="text" value={value}
                    placeholder="Search city..." onChange={handleChange} />
                <i class="search icon"></i>
            </div>

        </div>
    );
}