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
  
}


 handlePress=async(e)=>{
   
  await TaskManager.unregisterAllTasksAsync()
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
  const latLng={
    latitude:latitude,
    longitude:longitude
}
  const radius = 50;
  await Location.startGeofencingAsync('checkHomeTask', [
      {
        ...latLng,
        radius
      }
    ]);
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
