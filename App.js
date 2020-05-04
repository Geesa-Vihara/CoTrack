import React from 'react';
import { Image, AsyncStorage } from 'react-native';
import { AppLoading } from 'expo';
import * as Font from 'expo-font';
import { Asset } from 'expo-asset';
import { Block, GalioProvider } from 'galio-framework';
import { NavigationContainer, DarkTheme } from '@react-navigation/native';
import * as TaskManager from 'expo-task-manager';

import Screens from './navigation/Screens';
import { Images, articles, nowTheme } from './constants';

import {decode, encode} from 'base-64'

if (!global.btoa) {  global.btoa = encode }

if (!global.atob) { global.atob = decode }

import { Notifications } from 'expo';
import * as Permissions from 'expo-permissions';
import Constants from 'expo-constants';
import * as Location from 'expo-location';

// cache app images
const assetImages = [
  Images.Onboarding,
  Images.Logo,
  Images.Pro,
  Images.NowLogo,
  Images.iOSLogo,
  Images.androidLogo,
  Images.ProfilePicture,
  Images.CreativeTimLogo,
  Images.InvisionLogo,
  Images.RegisterBackground,
  Images.ProfileBackground
];

// cache product images
articles.map(article => assetImages.push(article.image));

function cacheImages(images) {
  return images.map(image => {
    if (typeof image === 'string') {
      return Image.prefetch(image);
    } else {
      return Asset.fromModule(image).downloadAsync();
    }
  });
}

export default class App extends React.Component {

  state = {
    isLoadingComplete: false,
    fontLoaded: false,
    expoPushToken: '',
    notification: {}, 
    local_total_cases:0,
    global_total_cases:0,
    local_new_cases:0,
    local_deaths:0,
    local_recovered:0,
  };

  notificationAndMicrophone = async () => {
    if (Constants.isDevice) {
      const { status: existingStatus } = await Permissions.getAsync(Permissions.NOTIFICATIONS,Permissions.AUDIO_RECORDING);
      let finalStatus = existingStatus;
      if (existingStatus !== 'granted') {
        const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS,Permissions.AUDIO_RECORDING);
        finalStatus = status;
      }
      if (finalStatus !== 'granted') {
        alert('Please enable selected permissions!');
        return;
      }
      token = await Notifications.getExpoPushTokenAsync();
      console.log(token);
      this.setState({ expoPushToken: token });
      await AsyncStorage.setItem("expoPushToken",token);
    } else {
      alert('Must use physical device for Push Notifications');
    }
  
    if (Platform.OS === 'android') {
      Notifications.createChannelAndroidAsync('default', {
        name: 'default',
        sound: true,
        priority: 'max',
        vibrate: [0, 250, 250, 250],
      });
    }
  };

  async getLocationAsync (){
    let { status } = await Location.requestPermissionsAsync();
    if (status !== 'granted') {
      this.setState({
        locationResult: 'Permission to access location was denied',
      });
    } else {
      this.setState({ hasLocationPermissions: true });
    }
   }
   async newsFetch(){

   
    fetch(
      `https://hpb.health.gov.lk/api/get-current-statistical`
    )
    .then(res => res.json())
    .then(data => {

    console.log("local total cases = "+JSON.stringify(data.data.local_total_cases));
    console.log("global total cases = "+data.data.global_total_cases);
    console.log("local deaths = "+data.data.local_deaths);
    console.log("local new cases = "+data.data.local_new_cases);
    console.log("local recovered cases = "+data.data.local_recovered);

      this.setState({
        local_total_cases: data.data.local_total_cases,
        global_total_cases: data.data.global_total_cases,
        local_deaths : data.data.local_deaths,
        local_new_cases : data.data.local_new_cases,
        local_recovered : data.data.local_recovered,
        isLoading: false,
        
        });
     
       

    });
    console.log("blaaaa "+this.state.local_total_cases);
    console.log("haaaa "+this.state.local_deaths);
    
   }
  
  async componentDidMount() {     
    console.log("app")
    await Font.loadAsync({ 'montserrat-regular': require('./assets/font/Montserrat-Regular.ttf'), 'montserrat-bold': require('./assets/font/Montserrat-Bold.ttf') } ); this.setState({fontLoaded: true, isLoadingComplete: true}); 
    this.notificationAndMicrophone();
    this.getLocationAsync();  
    this.newsFetch();
  }

  render() {
    if (!this.state.isLoadingComplete) {
      return (
        <AppLoading
          startAsync={this._loadResourcesAsync}
          onError={this._handleLoadingError}
          onFinish={this._handleFinishLoading}
        />
      );
    } else {
      return (
        <NavigationContainer>
          <GalioProvider theme={nowTheme}>
            <Block flex>
              <Screens />
            </Block>
          </GalioProvider>
        </NavigationContainer>
      );
    }
  }

  _loadResourcesAsync = async () => {
    return Promise.all([...cacheImages(assetImages)]);
  };

  _handleLoadingError = error => {
    // In this case, you might want to report the error to your error
    // reporting service, for example Sentry
    console.warn(error);
  };

  _handleFinishLoading = () => {
    if (this.state.fontLoaded) {
      this.setState({ isLoadingComplete: true });
    }
  };
}
