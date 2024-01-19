// components/GoogleMap.js
import React from "react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";

const containerStyle = {
  width: "100%",
  height: "400px",
};

const GoogleMapComponent = ({ center, zoom, markers }) => {
  return (
    <LoadScript googleMapsApiKey="AIzaSyCzZeDcEfwCdXSoameCC6SqZeJdrYooDp8">
      <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={zoom}>
        {markers.map((marker, index) => (
          <Marker key={index} position={marker.position} />
        ))}
      </GoogleMap>
    </LoadScript>
  );
};

export default GoogleMapComponent;
