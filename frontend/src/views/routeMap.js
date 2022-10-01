import Box from '@mui/material/Box';
import { IconButton } from '@mui/material';
import {
  useJsApiLoader,
  GoogleMap,
  Marker,
  Autocomplete,
  DirectionsRenderer,
} from '@react-google-maps/api'
import HighlightOffIcon from '@mui/icons-material/HighlightOff';

import { useRef, useState } from 'react'

const center = { lat: 48.8584, lng: 2.2945 }

function App() {
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    libraries: ['places'],
  })

  const [map, setMap] = useState(/** @type google.maps.Map */ (null))
  const [directionsResponse, setDirectionsResponse] = useState(null)
  const [distance, setDistance] = useState('')
  const [duration, setDuration] = useState('')

  /** @type React.MutableRefObject<HTMLInputElement> */
  const originRef = useRef()
  /** @type React.MutableRefObject<HTMLInputElement> */
  const destiantionRef = useRef()

  // if (!isLoaded) {
  //   return <SkeletonText />
  // }

  async function calculateRoute() {
    if (originRef.current.value === '' || destiantionRef.current.value === '') {
      return
    }
    // eslint-disable-next-line no-undef
    const directionsService = new google.maps.DirectionsService()
    const results = await directionsService.route({
      origin: originRef.current.value,
      destination: destiantionRef.current.value,
      // eslint-disable-next-line no-undef
      travelMode: google.maps.TravelMode.WALKING,
    })
    console.log("********"+results)
    setDirectionsResponse(results)
    setDistance(results.routes[0].legs[0].distance.text)
    setDuration(results.routes[0].legs[0].duration.text)
  }

  function clearRoute() {
    setDirectionsResponse(null)
    setDistance('')
    setDuration('')
    originRef.current.value = ''
    destiantionRef.current.value = ''
  }

  return (
    <div
    style={{position:'relative',
      flexDirection:'column',
      alignItems:'center',
      height:'100vh',
      width:'100vw'}}
      
    >
      <Box style={{position:'absolute', left:"10%", top:"30%", height:'100%', width:'100%'}}>
        {/* Google Map Box */}
        <GoogleMap
          center={center}
          zoom={15}
          mapContainerStyle={{ width: '50%', height: '50%' }}
          options={{
            zoomControl: false,
            streetViewControl: false,
            mapTypeControl: false,
            fullscreenControl: false,
          }}
          onLoad={map => setMap(map)}
        >
          <Marker position={center} />
          {directionsResponse && (
            <DirectionsRenderer directions={directionsResponse}  />
          )}
        </GoogleMap>
      </Box>
      <Box
        p={4}
        borderRadius='lg'
        m={4}
        bgColor='white'
        shadow='base'
        minW='container.md'
        zIndex='1'
      >
        
          <Box flexGrow={1}>
            <Autocomplete>
              <input type='text' placeholder='Origin' ref={originRef} style={{width:"50%"}}/>
            </Autocomplete>
          </Box>
          <Box flexGrow={1}>
            <Autocomplete>
              <input
                type='text'
                placeholder='Destination'
                ref={destiantionRef}
                style={{width:"50%"}}
              />
            </Autocomplete>
          </Box>

          
            <button colorScheme='pink' type='submit' onClick={calculateRoute}>
              Calculate Route
            </button>
            {/* <HighlightOffIcon
              
              
              onClick={clearRoute}
            /> */}
          
        
        
          <div>Distance: {distance} </div>
          <div>Duration: {duration} </div>
          {/* <HighlightOffIcon
            
            

            onClick={() => {
              map.panTo(center)
              map.setZoom(15)
            }}
          /> */}
        
      </Box>
    </div>
  )
}

export default App