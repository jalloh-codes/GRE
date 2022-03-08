import React from "react";
import './AboutComponent.css';
import { HeaderTopContains } from '../Header/HeaderTopContains/HeaderTopContains'
import { FooterMainContainer } from '../Footer/FooterMainContainer'


export const AboutComponent = () => {
    return (
        <div className="App">
            <div className='About-main-container' >
                <HeaderTopContains />
                <div className="Bottom">
                    <h1>About US</h1>
                    Welcome to Guinea Real Estate
                </div>
            </div>
            <div className="About_body">
                Founded by two software engineers (Souleymane Diallo and Cellou Diallo) and one civil engineer(Mamadou Diallo), our real-estate firm has a well-earned reputation for outstanding service. We not only facilitate the buying and selling of homes and investment properties,
                but we also see beyond to what makes each property special and unique.
                We have an in depth understanding of the marketplace, specializing in correct property valuation, unique marketing and sales strategy programs.
                <h2>For Sellers</h2>
                At Guinea Real Estate we recognize that it is important to partner with a trusted advisor who has a deep understanding of the real estate market and who can expertly price a property to help the seller find the highest possible offer in a timely manner.
                Guinea Real Estate is trusted by sellers to close deals efficiently at the most advantageous prices.
                <h2>For Renters</h2>
                Delivering the goods in a timely fashion is Guinea Real Estate’s number one priority when it comes to finding your next home.
                Guinea Real Estate’s focus remains the same whether you are buying a home or renting one: our priority is to exceed your expectations.
                <h2>For Buyers</h2>
                Looking out on your behalf, Guinea Real Estate agents are experts on the ever-changing real estate market, from uncovering the best properties to knowing the intricacies of co-op and condo board requirements.
                We excel at understanding your desires and needs and matching you with exceptional properties.
            </div>



            <FooterMainContainer />
        </div>
    );
}