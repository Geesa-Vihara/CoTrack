import React from 'react';
import {
  StyleSheet,
  ImageBackground,
  Dimensions,
  StatusBar,
  TouchableWithoutFeedback,
  Keyboard,
  AsyncStorage,
  Vibration
} from 'react-native';
import { Block, Checkbox, Text, Button as GaButton, theme } from 'galio-framework';
import * as TaskManager from 'expo-task-manager';
import * as Location from 'expo-location';
import { Button, Icon, Input } from '../components';
import { Images, nowTheme } from '../constants';
import {db} from '../config/firebase';
const { width, height } = Dimensions.get('screen');

import Firebase from "../config/firebase"
import { login, getAuthState } from "../actions/auth.js";

import { Notifications } from 'expo';
import { Audio } from 'expo-av';

Audio.setAudioModeAsync({
  staysActiveInBackground:true,
  allowsRecordingIOS: false,
  interruptionModeIOS: Audio.INTERRUPTION_MODE_IOS_DO_NOT_MIX,
  playsInSilentModeIOS: true,
  shouldDuckAndroid: true,
  interruptionModeAndroid: Audio.INTERRUPTION_MODE_ANDROID_DO_NOT_MIX,
});

const DismissKeyboard = ({ children }) => (
  <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>{children}</TouchableWithoutFeedback>
);

class Login extends React.Component {
  state = {
    email: '',
    password: '',
    notification: {},
  }

  handleChange = (name, value) => {
    this.setState({ [name]: value });
    console.log(this.state)
  }

  handleSubmit = () => {
    console.log('state',this.state);
    login(this.state);
  }
  componentDidMount = () => {
    this.setState({emai:'',password:''});
    try {
      Firebase.auth().onAuthStateChanged(async(user) => {

        if (user) {
          await TaskManager.unregisterAllTasksAsync()
          await Location.startLocationUpdatesAsync('updateLoc', {
            accuracy: Location.Accuracy.High,
            timeInterval: 2500,
            distanceInterval: 5,
            showsBackgroundLocationIndicator: false,
            pausesUpdatesAutomatically :true,
            activityType: Location.ActivityType.Fitness
        });
        const uid=await AsyncStorage.getItem('uid');
        const doc=await db.collection('crowdcount').doc(uid).get();
        const data=await doc.data();
        const longitude= data.homeLon;
        const latitude=data.homeLat;
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
        this._notificationSubscription = Notifications.addListener(this._handleNotification); 
        this.props.navigation.navigate('App');
        }
      })

    } catch (error) {
      console.log(error)
    }
}

_handleNotification = async(notification) => {
  Vibration.vibrate();
  console.log(notification);
  this.setState({ notification: notification });
  if(notification.origin==="selected" && notification.data['data']==="hands"){
    const {navigation}= this.props;
    navigation.navigate('HandWash');
  }else if(notification.origin==="selected" && notification.data['data']==="mask"){
    const {navigation}= this.props;
    navigation.navigate('PutMask');
  }
};

static getExpoPushToken=async()=>{
  var token=await AsyncStorage.getItem("expoPushToken"); 
  return token;
}

  render() {
    const { navigation } = this.props;
    return (
      <DismissKeyboard>
        <Block flex middle>
          <ImageBackground
            source={Images.RegisterBackground}
            style={styles.imageBackgroundContainer}
            imageStyle={styles.imageBackground}
          >
            <Block flex middle>
              <Block style={styles.loginContainer}>
                <Block flex space="evenly">
                  <Block flex={0.4} middle style={styles.socialConnect}>
                    <Block flex={0.5} middle style={{ marginTop:18, marginBottom: 18 }}>
                      <Text
                        style={{
                          fontFamily: 'montserrat-regular',
                          textAlign: 'center',
                          paddingTop: 10,
                          paddingBottom:20
                        }}
                        color="#333"
                        size={24}
                      >
                        Login
                      </Text>
                    </Block>

                    <Block flex={0.5} row middle space="between" style={{ marginTop:18, marginBottom: 28 }}>
                      <GaButton
                        round
                        onlyIcon
                        shadowless
                        icon="twitter"
                        iconFamily="Font-Awesome"
                        iconColor={theme.COLORS.WHITE}
                        iconSize={theme.SIZES.BASE * 1.625}
                        color={nowTheme.COLORS.TWITTER}
                        style={[styles.social, styles.shadow]}
                      />

                      <GaButton
                        round
                        onlyIcon
                        shadowless
                        icon="google"
                        iconFamily="Font-Awesome"
                        iconColor={theme.COLORS.WHITE}
                        iconSize={theme.SIZES.BASE * 1.625}
                        color={nowTheme.COLORS.GOOGLE}
                        style={[styles.social, styles.shadow]}
                      />
                      <GaButton
                        round
                        onlyIcon
                        shadowless
                        icon="facebook"
                        iconFamily="Font-Awesome"
                        iconColor={theme.COLORS.WHITE}
                        iconSize={theme.SIZES.BASE * 1.625}
                        color={nowTheme.COLORS.FACEBOOK}
                        style={[styles.social, styles.shadow]}
                      />
                    </Block>
                  </Block>
                  <Block flex={0.1} middle>
                    <Text
                      style={{
                        fontFamily: 'montserrat-regular',
                        textAlign: 'center'
                      }}
                      muted
                      size={16}
                    >
                      or be classical
                    </Text>
                  </Block>
                  <Block flex={1} middle space="between">
                    <Block center flex={0.9}>
                      <Block flex space="between">
                        <Block>
                          <Block width={width * 0.8}>
                            <Input
                              placeholder="Email"
                              style={styles.inputs}
                              value={this.state.email}
                              onChangeText={text => this.handleChange('email', text)}
                              iconContent={
                                <Icon
                                  size={16}
                                  color="#ADB5BD"
                                  name="email-852x"
                                  family="NowExtra"
                                  style={styles.inputIcons}
                                />
                              }
                            />
                          </Block>
                          <Block width={width * 0.8} style={{ marginBottom: 5 }}>
                            <Input
                              password
                              placeholder="Password"
                              style={styles.inputs}
                              onChangeText={text => this.handleChange('password', text)}
                              iconContent={
                                <Icon
                                  size={16}
                                  color="#ADB5BD"
                                  name="caps-small2x"
                                  family="NowExtra"
                                  style={styles.inputIcons}
                                />
                              }
                            />
                          </Block>
                          {/* <Block
                            style={{ marginVertical: theme.SIZES.BASE, marginLeft: 15}}
                            row
                            width={width * 0.75}
                          >
                            <Checkbox
                              checkboxStyle={{
                                borderWidth: 1,
                                borderRadius: 2,
                                borderColor: '#E3E3E3'
                              }}
                              color={nowTheme.COLORS.PRIMARY}
                              labelStyle={{
                                color: nowTheme.COLORS.HEADER,
                                fontFamily: 'montserrat-regular'
                              }}
                              label="I agree to the terms and conditions."
                            />
                          </Block> */}
                        </Block>
                        <Block center>
                          <Button round style={styles.createButton} onPress={this.handleSubmit}>
                            <Text
                              style={{ fontFamily: 'montserrat-bold' }}
                              size={14}
                              color={nowTheme.COLORS.WHITE}
                            >
                              Login
                            </Text>
                          </Button>
                          <Button color="transparent" shadowless style={styles.link} onPress={() => navigation.push('Register')}>
                            <Text center color={nowTheme.COLORS.PRIMARY} size={theme.SIZES.FONT * 0.75}>
                            {"Don't have an account? Sign Up"}
                            </Text>
                        </Button>
                        </Block>
                      </Block>
                    </Block>
                  </Block>
                </Block>
              </Block>
            </Block>
          </ImageBackground>
        </Block>
      </DismissKeyboard>
    );
  }
}

const styles = StyleSheet.create({
  imageBackgroundContainer: {
    width: width,
    height: height,
    padding: 0,
    zIndex: 1
  },
  imageBackground: {
    width: width,
    height: height
  },
  loginContainer: {
    marginTop: 55,
    marginBottom: 55,
    width: width * 0.9,
    height: 450,
    backgroundColor: nowTheme.COLORS.WHITE,
    borderRadius: 4,
    shadowColor: nowTheme.COLORS.BLACK,
    shadowOffset: {
      width: 0,
      height: 4
    },
    shadowRadius: 8,
    shadowOpacity: 0.1,
    elevation: 1,
    overflow: 'hidden'
  },
  socialConnect: {
    backgroundColor: nowTheme.COLORS.WHITE
    // borderBottomWidth: StyleSheet.hairlineWidth,
    // borderColor: "rgba(136, 152, 170, 0.3)"
  },
  socialButtons: {
    width: 120,
    height: 40,
    backgroundColor: '#fff',
    shadowColor: nowTheme.COLORS.BLACK,
    shadowOffset: {
      width: 0,
      height: 4
    },
    shadowRadius: 8,
    shadowOpacity: 0.1,
    elevation: 1
  },
  socialTextButtons: {
    color: nowTheme.COLORS.PRIMARY,
    fontWeight: '800',
    fontSize: 14
  },
  inputIcons: {
    marginRight: 12,
    color: nowTheme.COLORS.ICON_INPUT
  },
  inputs: {
    borderWidth: 1,
    borderColor: '#E3E3E3',
    borderRadius: 21.5
  },
  passwordCheck: {
    paddingLeft: 2,
    paddingTop: 6,
    paddingBottom: 15
  },
  createButton: {
    width: width * 0.5,
    marginTop: 25,
    marginBottom: 40,
    color:nowTheme.COLORS.PRIMARY
  },
  link: {
    width: width * 0.5,
    marginBottom: 40
  },
  social: {
    width: theme.SIZES.BASE * 3.5,
    height: theme.SIZES.BASE * 3.5,
    borderRadius: theme.SIZES.BASE * 1.75,
    justifyContent: 'center',
    marginHorizontal: 10
  }
});

export default Login;
TaskManager.defineTask('updateLoc', async({ data, error }) => {
  if (error) {
    // check `error.message` for more details.
    return;
  }
  const {locations}=data;
  const uid=await AsyncStorage.getItem('uid')
  console.log("uid"+uid)
  console.log('Received new locations', locations[0]);
  await db.collection('users').doc(uid).update({
    "latitude":locations[0].coords.latitude,
    "longitude":locations[0].coords.longitude
  })
  const token=await Login.getExpoPushToken()
  await db.collection('crowdcount').doc(uid).get().then(async(doc)=>{
    var data=doc.data();
    console.log("doc"+JSON.stringify(data))    
    if(data && data['count']>0){      
      console.log("token"+JSON.stringify(token))
      const message = {
          to: token,
          sound: 'default',
          title: 'Be Aware!',
          body: 'People nearby, make sure to keep your distance!',
          data: { data: 'beaware' },
          _displayInForeground: true,
        };
        const response = await fetch('https://exp.host/--/api/v2/push/send', {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Accept-encoding': 'gzip, deflate',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(message),
        }); 
        try {
    
          let soundObject  = new Audio.Sound();
          await soundObject.loadAsync(require('../assets/sounds/beaware.mp3'));
          await soundObject.playAsync();     
    
      } catch (error) {
          //console.log("error"+error);
      }
    }
  })
  
  
});

TaskManager.defineTask('checkHomeTask', async({ data: { eventType, region }, error }) => {
  if (error) {
    // check `error.message` for more details.
    return;
  }
  console.log(eventType);
  
  const token=await Login.getExpoPushToken()
  console.log("token"+JSON.stringify(token))
  if (eventType === Location.GeofencingEventType.Enter) {    
    console.log("You've entered region:", region);
    const message = {
      to: token,
      sound: 'default',
      title: 'Wecome Home!',
      body: 'Remember to wash your hands before you see your loved ones!',
      data: { data: 'hands' },
      _displayInForeground: true,
    };
    const response = await fetch('https://exp.host/--/api/v2/push/send', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Accept-encoding': 'gzip, deflate',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(message),
    });
    try {
    
      let soundObject  = new Audio.Sound();
      await soundObject.loadAsync(require('../assets/sounds/handsfemale.mp3'));
      await soundObject.playAsync();     

  } catch (error) {
      //console.log("error"+error);
  }
    
    
  } else if (eventType === Location.GeofencingEventType.Exit) {
    console.log("You've left region:", region);
    const message = {
      to: token,
      sound: 'default',
      title: 'Going Outside?',
      body: 'Remember to wear a mask!',
      data: { data: 'mask' },
      _displayInForeground: true,
    };
    const response = await fetch('https://exp.host/--/api/v2/push/send', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Accept-encoding': 'gzip, deflate',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(message),
    });
    try {
    
      let soundObject  = new Audio.Sound();
      await soundObject.loadAsync(require('../assets/sounds/maskfemale.mp3'));
      await soundObject.playAsync();        

  } catch (error) {
      //console.log("error"+error);
  }
  }
});