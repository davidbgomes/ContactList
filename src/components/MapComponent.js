import React from "react"
import { compose, withProps } from "recompose"
import { withScriptjs, withGoogleMap, GoogleMap, Circle} from "react-google-maps"



const MyMapComponent = compose(
  withProps({
    googleMapURL: "https://maps.googleapis.com/maps/api/js?v=3.exp&key=AIzaSyDGLlCqkHSyWrmbvZINgrzEueWGjZCaTNQ&libraries=geometry,drawing,places",
    loadingElement: <div style={{ height: '100%' }} />,
    containerElement: <div style={{ height: '40vh', weight:'100%'}} />,
    mapElement: <div style={{ height: '100%', margin:'0',marginBottom: '20px'}} />,
  }),
  withScriptjs,
  withGoogleMap
)((props) =>
  <GoogleMap
    defaultZoom={14}
    defaultCenter={{ lat: props.latitude, lng: props.longitude }}
    options={{streetViewControl: false}}
  >
    <Circle
      visible={true}
      editable={false}
      radius={500}
      center={{ lat: props.latitude, lng: props.longitude }}
      defaultCenter={{ lat: props.latitude, lng: props.longitude }}
      options={{
                  fillColor: '#ce4c4c',
                  strokeColor: '#ff0000',
                  strokeWeight:'1'
                  }}
      />
    
  </GoogleMap>
)

export default MyMapComponent