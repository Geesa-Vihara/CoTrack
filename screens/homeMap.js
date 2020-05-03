import React from "react";
import { StyleSheet, Dimensions,View,Text, AsyncStorage } from "react-native";
import MapView,{Marker} from "react-native-maps";
import * as Location from 'expo-location';
import * as TaskManager from 'expo-task-manager';
import {db} from '../config/firebase';

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

async componentDidMount(){
  const uid=await AsyncStorage.getItem('uid');
  const doc=await db.collection('crowdcount').doc(uid).get();
  const data=await doc.data();
  this.setState(prevState => ({
    coords: {                   
        ...prevState.coords,    
        longitude: data.homeLon 
    }
  }));

  this.setState(prevState => ({
    coords: {                   
        ...prevState.coords,    
        latitude: data.homeLat  
    }
  }));
  
  
}


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
  const latLng={
    latitude:latitude,
    longitude:longitude
}
  const radius = 50;
  await TaskManager.unregisterTaskAsync('checkHomeTask')
  await Location.startGeofencingAsync('checkHomeTask', [
      {
        ...latLng,
        radius
      }
    ]);
    const uid=await AsyncStorage.getItem('uid');
    console.log(longitude,latitude)
    await db.collection('crowdcount').doc(uid).update({homeLon:longitude,homeLat:latitude});
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
