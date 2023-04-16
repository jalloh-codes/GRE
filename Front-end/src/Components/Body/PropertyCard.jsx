import React,{useEffect, useState} from "react";
import { SingleHome } from '../SingleHome/SingleHome'
import{useQuery} from '@apollo/client';
import {GET_IMAGE}  from '../Api/query';
export const PropertyCard = ({propertie}) =>{
    const [profileImage, setProfileImage] = useState()
    const name  = propertie.name ? propertie.name : ''
    const profile = propertie.images.profile;
    const lat = propertie.loc.lat
    const lng =  propertie.loc.lng
    const address = propertie.loc.region +' ' +propertie.loc.commune
    const price = propertie.details.price 
    const {data, error, loading} =  useQuery(GET_IMAGE,{
        variables:{
            fileKey: profile
        }
    });
    useEffect(()=>{
        if(data){
            
            setProfileImage(data.getImage.image)
        }
    })

    if(loading){
        return(
            <div className="image">
            <SingleHome images={profileImage} 
            value={name} 
            roomType={propertie.propertyType} 
            address={address}
            location={{ "lat": lat, "lng":  lng }} />
            <div className="title">{price}$/night</div>
        </div>
        )
    }
    return(
        <div className="image">
            <div className="picture">    
                <img src={profileImage} alt="Logo" />
            </div>
            <SingleHome images={profileImage} 
                value={name} 
                roomType={propertie.propertyType} 
                address={address}
                location={{ "lat": lat, "lng":  lng }} />
            <div className="title">{price}$/night</div>
        </div>
    )
}