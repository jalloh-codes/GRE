import React from "react";
import $ from 'jquery';
import './BodyMainContainer.css';
import noom from './noom-hotel-conakry.jpeg';
import sheraton from './sheraton.jpeg';
import atlantic from './atlantic.webp';
import maison_blanche from './maison_blanche.jpeg';
import onomo from './onomo.webp';
import riviera from './riviera.jpeg';

import { SingleHome } from '../SingleHome/SingleHome'


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
        const tab = [{ image: noom, name: "Noom hotel", price: "100" }, { image: riviera, name: "Riviera hotel", price: "107" }, { image: onomo, name: "Onomo hotel", price: "120" }, { image: sheraton, name: "Sheraton hotel", price: "102" }, { image: atlantic, name: "Atlantic hotel", price: "110" }, { image: maison_blanche, name: "Maison Blanche hotel", price: "140" }];
        return <div className="main">
            <h1 className="Main_title">Latest Properties</h1>
            <div className="wrapper">
                <a className="prev" onClick={this.scroll.bind(null, -1)}>&#10094;</a>
                <div className="image-container">
                    {tab.map((elem, i) => <div className="image"><div className="picture"><img src={elem.image} alt="Logo" /></div>
                        <SingleHome images={elem.image} value={elem.name} roomType="hotel room" address="Kaloum" location={{ "lat": 9.509167, "lng": -13.712222 }} />
                        <div className="title">{elem.price}$/night</div></div>)}
                </div>
                <a className="next" onClick={this.scroll.bind(null, 1)}>&#10095;</a>
            </div>
        </div >;
    }
}

export default BodyMainContainer;