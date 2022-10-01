import React, { Component } from 'react'
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';

class GoogleMap extends Component {


  render() {

    return(<>
      
      <Map google={this.props.google} zoom={15}
      style={{width: '500px',
  height: '500px'}}
       initialCenter={{
            lat: 37.3347,
            lng: -121.8753
          }}>
 


 
      <Marker
  title="Location"
  id={1}
  name={'SOMA'}
  position={{lat: 37.778519, lng: -122.405640}}
  
  
  >
  <InfoWindow
    
    >
      <div >
        <p>Click on the map or drag the marker to select location where the incident occurred</p>
      </div>
  </InfoWindow>
</Marker>
      </Map>
      </>
    )
  }
}

export default GoogleApiWrapper({
  apiKey: ("AIzaSyAsQ0gdrgDdXMXryiPxhhswaOT6jAYpAKs")
})(GoogleMap)
