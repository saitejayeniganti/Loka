import React, {useEffect, useRef, useState} from 'react'
import "../App.css"
import Search from '@mui/icons-material/Search';
import { 
  getLatLng,
} from "react-places-autocomplete";

const apiKey = "AIzaSyAsQ0gdrgDdXMXryiPxhhswaOT6jAYpAKs";
const mapApiJs = 'https://maps.googleapis.com/maps/api/js';
const geocodeJson = 'https://maps.googleapis.com/maps/api/geocode/json';


function loadAsyncScript(src) {
  return new Promise(resolve => {
    const script = document.createElement("script");
    Object.assign(script, {
      type: "text/javascript",
      async: true,
      src
    })
    script.addEventListener("load", () => resolve(script));
    document.head.appendChild(script);
  })
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function LocationSearch(props) {

  const searchInput = useRef(null);
  const [selectedValue, setSelectedValue] = useState("");
  

    useEffect(() => {
    initMapScript().then(() => initAutocomplete())
  }, []);


  // init gmap script
  const initMapScript = () => {
    // if script already loaded
    if(window.google) {
      return Promise.resolve();
    }
    const src = `${mapApiJs}?key=${apiKey}&libraries=places&v=weekly`;
    return loadAsyncScript(src);
  }

    
  const initAutocomplete = () => {
    if (!searchInput.current) return;
    const autocomplete = new window.google.maps.places.Autocomplete(searchInput.current);
    autocomplete.setFields(["address_component", "geometry"]);
    autocomplete.addListener("place_changed", () => onChangeAddress(autocomplete));
  }

  // do something on address change
  const onChangeAddress = (autocomplete) => {
    
    const place = autocomplete.getPlace();
    // console.log(place.address_components)
    // setAddress(extractAddress(place));
    const location=autocomplete.gm_accessors_.place.hk.formattedPrediction
    setSelectedValue(location)
    getLatLngDetails(place)
  }

  const getLatLngDetails = (address) => {
    
      getLatLng(address)
        .then((latLng) => {
          console.log("Success", latLng);
        //   setLatitude(latLng.lat)
        //   setLongitude(latLng.lng)
        })
   
    .catch((error) => console.error("Error", error));
  };


//   const reverseGeocode = ({ latitude: lat, longitude: lng}) => {
//     const url = `${geocodeJson}?key=${apiKey}&latlng=${lat},${lng}`;
//     searchInput.current.value = "Getting your location...";
//     fetch(url)
//         .then(response => response.json())
//         .then(location => {
//           const place = location.results[0];
//           const _address = extractAddress(place);
//           setAddress(_address);
//           searchInput.current.value = _address.plain();
//         })
//   }


//   const findMyLocation = () => {
//     if (navigator.geolocation) {
//       navigator.geolocation.getCurrentPosition(position => {
//         reverseGeocode(position.coords)
//       })
//     }
//   }




  return (
    <div className="App">
      <div>
        <div className="search">
          <span><Search /></span>
          <input ref={searchInput} type="text" placeholder="Search location...."/>
          {/* <button onClick={findMyLocation}><GpsFixed /></button> */}
        </div>

      </div>
    </div>
  )
}

export default LocationSearch