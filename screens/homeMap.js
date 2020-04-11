import React from "react";
import { StyleSheet, Dimensions,View,Text, AsyncStorage } from "react-native";
import MapView,{Marker} from "react-native-maps";
import * as Location from 'expo-location';



export default class homeMap extends React.Component {
state={
  coords :{
    latitude: 0,
    longitude: 0,
    
},
  mapRegion: null,
  hasLocationPermissions: false,
  locationResult: null
}

componentDidMount(){
  AsyncStorage.getItem('longitude', (err, result) => {
    this.setState(prevState => ({
      coords: {                   
          ...prevState.coords,    
          longitude: Number(result)  
      }
  }))
  });
  AsyncStorage.getItem('latitude', (err, result) => {
    this.setState(prevState => ({
      coords: {                   
          ...prevState.coords,    
          latitude: Number(result)  
      }
  }))
  });
  //this.getLocationAsync();
}
/*
async getLocationAsync (){
  let { status } = await Location.requestPermissionsAsync();
  if (status !== 'granted') {
    this.setState({
      locationResult: 'Permission to access location was denied',
    });
  } else {
    this.setState({ hasLocationPermissions: true });
  }

  let location = await Location.getCurrentPositionAsync({});
  this.setState({ locationResult: JSON.stringify(location) });
  this.setState(prevState => ({
    coords: {                   
        ...prevState.coords,    
        longitude: location.coords.longitude      
    }
}))
  this.setState(prevState => ({
    coords: {                   
        ...prevState.coords,    
        latitude: location.coords.latitude      
    }
  }))
  // Center the map on the location we just fetched.
   this.setState({mapRegion: { latitude: location.coords.latitude, longitude: location.coords.longitude, latitudeDelta: 0.0922, longitudeDelta: 0.0421 }});
 } */

 handlePress=async(e)=>{
  let coordinate=await e.nativeEvent.coordinate;
  let longitude=await coordinate.longitude;
  let latitude=await coordinate.latitude;
  this.setState(prevState => ({
    coords: {                   
        ...prevState.coords,    
        longitude: longitude 
    }
}))
  this.setState(prevState => ({
    coords: {                   
        ...prevState.coords,    
        latitude: latitude     
    }
  }))
  await AsyncStorage.setItem("longitude",String(longitude) );
  await AsyncStorage.setItem("latitude",String(latitude));
 }
  render() {
    return (
      <MapView
        style={{
          flex: 1
        }}
        initialRegion={{
          latitude: 7.8731,
          longitude: 80.7718,
          latitudeDelta: 3,
          longitudeDelta: 3
        }}
        onPress={this.handlePress}
      >
            <Marker
            coordinate={this.state.coords}
            title="My Home"
         />
      </MapView>
      
   
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  mapStyle: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
});
