import React, { Component } from 'react'
import GoogleMapReact from 'google-map-react';
import Marker from '../components/Marker';

export default function SimpleMap(){
  const defaultProps = {
    center: {
      lat: 10.99835602,
      lng: 77.01502627
    },
    zoom: 11
  };

  return (
    
    <div style={{ height: '100vh', width: '100%' }}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: "AIzaSyAsQ0gdrgDdXMXryiPxhhswaOT6jAYpAKs" }}
        defaultCenter={defaultProps.center}
        defaultZoom={defaultProps.zoom}
      >
      <Marker
                text="sai"
                lat="10.99835602"
                lng="77.01502627"
              />
      </GoogleMapReact>
    </div>
  );
}