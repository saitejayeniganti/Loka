import React, { useEffect, useState } from "react";
import LocationSearchInput from "./LocationAuto";
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from "react-places-autocomplete";

function LocationTest() {

    const [address,setAddress]=useState("");
    const [latitude,setLatitude]=useState("");
    const [longitude,setLongitude]=useState("");

 const handleChange = (address) => {
    setAddress(address)
  };

  const handleSelect = (address) => {
    geocodeByAddress(address).then((results) => {
      setAddress(address)
      getLatLng(results[0])
        .then((latLng) => {
          console.log("Success", latLng);
          setLatitude(latLng.lat)
          setLongitude(latLng.lng)
        })
        .catch((error) => console.error("Error", error));
    });
  };

    return (<>
        <LocationSearchInput 
        handleChange={handleChange}
        handleSelect={handleSelect}
        address={address}
        />
    </>)
}

export default LocationTest;
