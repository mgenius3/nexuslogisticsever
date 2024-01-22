// // components/GoogleMap.js
// import React from "react";
// import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";

// const containerStyle = {
//   width: "100%",
//   height: "400px",
// };

// const GoogleMapComponent = ({ center, zoom, markers }) => {
//   return (
//     <LoadScript googleMapsApiKey="AIzaSyCzZeDcEfwCdXSoameCC6SqZeJdrYooDp8">
//       <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={zoom}>
//         {markers?.map((marker, index) => (
//           <Marker key={index} position={marker.position} />
//         ))}
//       </GoogleMap>
//     </LoadScript>
//   );
// };

// export default GoogleMapComponent;

// LocationMap.js
import React, { useState, useEffect } from "react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";

const containerStyle = {
  width: "100%",
  height: "400px",
};

const LocationMap = ({ coordinates }) => {
  // let add = address;
  // const [coordinates, setCoordinates] = useState(null);

  // useEffect(() => {
  //   if (typeof window !== "undefined" && window.google) {
  //     // Your code using window.google.maps
  //     // Fetch coordinates using the Google Geocoding API

  //     const geocoder = new window.google.maps.Geocoder();
  //     geocoder.geocode({ address: String(add) }, (results, status) => {
  //       if (status === "OK" && results[0]) {
  //         const { lat, lng } = results[0].geometry.location;
  //         setCoordinates({ lat: lat(), lng: lng() });
  //       }
  //     });
  //   }
  // });

  return (
    <LoadScript googleMapsApiKey="AIzaSyCzZeDcEfwCdXSoameCC6SqZeJdrYooDp8">
      <GoogleMap mapContainerStyle={containerStyle} center={coordinates} zoom={15}>
        {coordinates && <Marker position={coordinates} />}
      </GoogleMap>
    </LoadScript>
  );
};

export default LocationMap;
