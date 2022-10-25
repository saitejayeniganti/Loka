import React, { useState, useEffect } from "react";
import {
  withGoogleMap,
  withScriptjs,
  GoogleMap,
  Marker,
  InfoWindow,
} from "react-google-maps";
import { Card } from "antd";
import pic from "../images/theme/s.png"

const GOOGLE_MAPS_API_KEY = "AIzaSyAsQ0gdrgDdXMXryiPxhhswaOT6jAYpAKs";

function Map() {
  const [locations, setLocations] = useState(null);
  const [selectedlocation, setSelectedLocation] = useState(null);
  

   useEffect(() => {
    let data = {
      record_type: "Lost",
      radius: "10",
      latitude: "37.3352",
      longitude: "-121.8811",
      missing_date: "90",
      pet_type: "Dog",
    };
    
    // axios
    //   .post(backendServer + "/", data)
    //   .then((response) => {
    //     setLocations(response.data);
    //   })

    //   .catch((err) => {
    //     console.log(err);
    //   });

    // const listener = (e) => {
    //   if (e.key === "Escape") {
    //     setSelectedLocation(null);
    //   }
    // };
    window.addEventListener("keydown", listener);

    return () => {
      window.removeEventListener("keydown", listener);
    };
  }, []);

  return (
    <>
        <GoogleMap
          defaultZoom={13}
          defaultCenter={{
            lat: 37.3352,
            lng: -121.8811,
          }}
        >
          
            {/* <Marker
              key={location.id}
              position={{
                lat: 37.3352,
                lng: -121.8811,
              }}
              onClick={() => {
                setSelectedLocation(location);
              }}
              icon={{
                url:{pic},
                scaledSize: new window.google.maps.Size(48, 48),
              }}
            /> */}
          {/* {selectedlocation && (
            <InfoWindow
              onCloseClick={() => {
                setSelectedLocation(null);
              }}
              position={{
                lat: Number(selectedlocation.latitude),
                lng: Number(selectedlocation.longitude),
              }}
            >
              <div>
                <div style={{ alignContent: "center" }}>
                  {" "}
                  <img
                    src={
                      "https://petgohome.s3-us-west-2.amazonaws.com/" +
                      selectedlocation.picture
                    }
                    alt="petimage"
                    width="350"
                    height="300"
                  ></img>
                </div>

                <Card
                  title={
                    selectedlocation.pet_type +
                    " - " +
                    selectedlocation.record_type
                  }
                  style={{
                    fontFamily: "Sirin Stencil",
                    fontSize: "18px",
                  }}
                >
                  <h6>Breed : {selectedlocation.breed}</h6>
                  <h6>Gender : {selectedlocation.gender}</h6>
                  <h6>
                    Date : {String(selectedlocation.missing_date).substr(0, 10)}
                  </h6>
                  <h6>Owner Name : {selectedlocation.User.username}</h6>
                  <h6>Contact : {selectedlocation.phone}</h6>

                  <h6>
                    {" "}
                    {selectedlocation.record_type + " - " + "location"}
                    <br></br>
                    {selectedlocation.location +
                      " (" +
                      selectedlocation.latitude +
                      ", " +
                      selectedlocation.longitude +
                      ")"}
                  </h6>
                </Card>
              </div>
            </InfoWindow>
          )} */}
        </GoogleMap>
    </>
  );
}

const MapWrapped = withScriptjs(withGoogleMap(Map));

export default function MapsWithIcon() {
  
  return (
    <div>
      <div style={{ marginBottom: "2%" }}></div>
      <div style={{ width: "138vh", height: "80vh" }}>
        <MapWrapped
          googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=${GOOGLE_MAPS_API_KEY}`}
          loadingElement={<div style={{ height: `100%` }} />}
          containerElement={<div style={{ height: `100%` }} />}
          mapElement={<div style={{ height: `100%` }} />}
        />
      </div>
    </div>
  );
}