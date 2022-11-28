import React, { useEffect, useRef, useState } from "react";
import "../App.css";
import Search from "@mui/icons-material/Search";
import { getLatLng } from "react-places-autocomplete";

const apiKey = "AIzaSyAsQ0gdrgDdXMXryiPxhhswaOT6jAYpAKs";
const mapApiJs = "https://maps.googleapis.com/maps/api/js";

function loadAsyncScript(src) {
  return new Promise((resolve) => {
    const script = document.createElement("script");
    Object.assign(script, {
      type: "text/javascript",
      async: true,
      src,
    });
    script.addEventListener("load", () => resolve(script));
    document.head.appendChild(script);
  });
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function LocationSearch(props) {
  const searchInput = useRef(null);
  const [selectedValue, setSelectedValue] = useState("");

  useEffect(() => {
    initMapScript().then(() => initAutocomplete());
  }, []);

  // init gmap script
  const initMapScript = () => {
    // if script already loaded
    if (window.google) {
      return Promise.resolve();
    }
    const src = `${mapApiJs}?key=${apiKey}&libraries=places&v=weekly`;
    return loadAsyncScript(src);
  };

  const initAutocomplete = () => {
    if (!searchInput.current) return;
    const autocomplete = new window.google.maps.places.Autocomplete(
      searchInput.current
    );
    autocomplete.setFields(["address_component", "geometry"]);
    autocomplete.addListener("place_changed", () =>
      onChangeAddress(autocomplete)
    );
  };

  // do something on address change
  const onChangeAddress = (autocomplete) => {
    const place = autocomplete.getPlace();
    const location = autocomplete.gm_accessors_.place.hk.formattedPrediction;
    setSelectedValue(location);
    getLatLngDetails(place);
  };

  const getLatLngDetails = (address) => {
    getLatLng(address)
      .then((latLng) => {
        console.log("Success", latLng);
      })

      .catch((error) => console.error("Error", error));
  };
  return (
    <div className="App">
      <div>
        <div className="search">
          <span>
            <Search />
          </span>
          <input
            ref={searchInput}
            type="text"
            placeholder="Search location...."
          />
        </div>
      </div>
    </div>
  );
}

export default LocationSearch;
