import React from "react";
import $ from 'jquery';
import './BodyMainContainer.css';
import logo from './noom-hotel-conakry.jpeg'


class BodyMainContainer extends React.Component {
    constructor() {
        super()
        this.scroll = this.scroll.bind(this)
    }


    scroll(direction) {
        let far = $('.image-container').width() / 2 * direction;
        let pos = $('.image-container').scrollLeft() + far;
        $('.image-container').animate({ scrollLeft: pos }, 1000)
    }

    render() {
        const tab = [{ image: logo, name: "Noom hotel", price: "100" }, { image: logo, name: "Noom hotel", price: "100" }, { image: logo, name: "Noom hotel", price: "100" }, { image: logo, name: "Noom hotel", price: "100" }, { image: logo, name: "Noom hotel", price: "100" }, { image: logo, name: "Noom hotel", price: "100" }];
        return <div className="main">
            <h1 className="title">Latest Properties</h1>
            <div className="wrapper">
                <a className="prev" onClick={this.scroll.bind(null, -1)}>&#10094;</a>
                <div className="image-container">
                    {tab.map((elem, i) => <div className="image"><div className="picture"><img src={elem.image} alt="Logo" /></div><div className="price">{elem.name}: {elem.price}$/night</div></div>)}
                </div>
                <a className="next" onClick={this.scroll.bind(null, 1)}>&#10095;</a>
            </div>
        </div >;
    }
}

export default BodyMainContainer;