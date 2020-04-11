import React from "react";
import { StyleSheet, Dimensions,View, AsyncStorage } from "react-native";
import MapView,{Marker} from "react-native-maps";
import * as Location from 'expo-location';
import { Button,Block,theme,Text } from "galio-framework";
import { nowTheme } from '../constants/';
const { height, width } = Dimensions.get('screen');
import * as TaskManager from 'expo-task-manager';

export default class OnstartMap extends React.Component {
 
state={
  coords :{
    latitude: 7.8731,
    longitude: 80.7718,
},
  mapRegion: null,
  hasLocationPermissions: false,
  locationResult: null
}

componentDidMount() {
  this.getLocationAsync();
}
nextpage=async()=>{
    const longitude=this.state.coords.longitude;
    const latitude=this.state.coords.latitude;
    await AsyncStorage.setItem("longitude",String(longitude) );
    await AsyncStorage.setItem("latitude",String(latitude));
    const latLng={
        latitude:latitude,
        longitude:longitude
    }
    const radius = 100;
    await Location.startGeofencingAsync('checkHomeTask', [
        {
          ...latLng,
          radius
        }
      ]); 
      /* await Location.startLocationUpdatesAsync('checkHomeTask', {
        accuracy: Location.Accuracy.Balanced,
      }); */
    const {navigation}= this.props;
    navigation.navigate('App');
}
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
 }
  render() {
    return (
        <Block flex>
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
                <Button
                  shadowless
                  style={styles.button}
                  color={nowTheme.COLORS.PRIMARY}
                  onPress={this.nextpage}
                >
                  <Text
                    style={{ fontFamily: 'montserrat-bold', fontSize: 14 }}
                    color={theme.COLORS.WHITE}
                  >
                    Next
                  </Text>
                </Button>
            </Block>
            //<Button>Next</Button>
       
      
      
   
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
  button: {
    width: width,
    height: theme.SIZES.BASE * 3,
    shadowRadius: 0,
    shadowOpacity: 0
  },
});
TaskManager.defineTask('checkHomeTask', ({ data: { eventType, region }, error }) => {
  if (error) {
    // check `error.message` for more details.
    return;
  }
  console.log(eventType);
  if (eventType === Location.GeofencingEventType.Enter) {
    console.log("You've entered region:", region);
  } else if (eventType === Location.GeofencingEventType.Exit) {
    console.log("You've left region:", region);
  }
});