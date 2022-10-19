import React, { useState } from "react";


export const SearchComponent = ({ parentCallback }) => {
    const [value, setValue] = useState("");

    const handleChange = (e) => {
        setValue(e.target.value);
        parentCallback(e.target.value)
    };
    return (

        <div >
            <div >
                <input className="prompt" type="text" value={value}
                    placeholder="Search city..." onChange={handleChange} />
                <i className="search icon"></i>
            </div>

        </div>
    );
}