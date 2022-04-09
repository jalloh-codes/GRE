import React, { useState } from "react"
import { compose, withProps } from "recompose"
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps"

const MyMapComponent = compose(
    withProps({
        googleMapURL: "https://maps.googleapis.com/maps/api/js?key={Your_Google_map_key}",
        loadingElement: <div style={{ height: `100%` }} />,
        containerElement: <div style={{ height: `600px` }} />,
        mapElement: <div style={{ height: `100%` }} />,
    }),
    withScriptjs,
    withGoogleMap
)((props) => {
    return (
        <GoogleMap
            defaultZoom={8}
            defaultCenter={{ lat: props.location.lat, lng: props.location.lng }}
        >
            {props.isMarkerShown && <Marker position={{ lat: props.location.lat, lng: props.location.lng }} onClick={props.onMarkerClick} />}
        </GoogleMap>
    );
}
)

export const SimpleMap = (props) => {

    const [isMarkerShown, SetIsMarkerShown] = useState(false)



    React.useEffect(() => {
        delayedShowMarker()
    }, []);

    const delayedShowMarker = () => {
        setTimeout(() => {
            SetIsMarkerShown(true)
        }, 3000)
    }

    const handleMarkerClick = () => {
        SetIsMarkerShown(false)
        delayedShowMarker()
    }

    return (
        <MyMapComponent
            isMarkerShown={isMarkerShown}
            onMarkerClick={handleMarkerClick}
            location={props.location}
        />
    )

}