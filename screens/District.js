import React from 'react';
import {
  StyleSheet,
  ImageBackground,
  Dimensions,
  StatusBar,
  TouchableWithoutFeedback,
  Keyboard,
  Vibration,
  Alert ,
  Picker,
  View,
  AsyncStorage
} from 'react-native';
import { Block, Checkbox, Text, Button as GaButton, theme } from 'galio-framework';
import { Button, Icon, Input,Card } from '../components';
import { Images, nowTheme } from '../constants';
import { ScrollView } from 'react-native-gesture-handler';

const { width, height } = Dimensions.get('screen');

const DismissKeyboard = ({ children }) => (
  <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>{children}</TouchableWithoutFeedback>
);

class District extends React.Component {
  state = {
    district:"colombo",
    coords :{
        latitude: 0,
        longitude: 0,
        
    }
  }


  


  handleSubmit = async() => {
 
    }
   
  
  setSelectedValue = (item) => { 
  
  }

  handlePress=async(e)=>{
    
   }

  render() {
    return (
      <ScrollView>
      
         
            <Block >
              <Block>
              
                   
                  <Block flex middle >                  
                    <Text
                      style={{
                        fontFamily: 'montserrat-regular',
                        textAlign: 'center'
                      }}
                      color="#333"
                      size={24}
                    >
                       Select a district
                    </Text>
                  </Block>
                      <Picker selectedValue = {this.state.district} onValueChange = {this.setSelectedValue} middle>
                                  <Picker.Item label="Colombo" value="colombo" />                                
                                  <Picker.Item label="Gampaha" value="gampaha" />                                
                                  <Picker.Item label="Kalutara" value="kalutara" />
                                  <Picker.Item label="Polonnaruwa" value="polonnaruwa" />
                                  <Picker.Item label="Ampara" value="ampara" />
                                  <Picker.Item label="Anuradhapura" value="anuradhapura" />
                                  <Picker.Item label="Badulla" value="badulla" />
                                  <Picker.Item label="Batticaloa" value="batticaloa" />
                                  <Picker.Item label="Galle" value="galle" />
                                  <Picker.Item label="Hambantota" value="hambantota" />
                                  <Picker.Item label="Jaffna" value="jaffna" />
                                  <Picker.Item label="Kalmunai" value="kalmunai" />
                                  <Picker.Item label="Kandy" value="kandy" />
                                  <Picker.Item label="Kegalle" value="kegalle" />
                                  <Picker.Item label="Kilinochchi" value="kilinochchi" />
                                  <Picker.Item label="Kurunegala" value="kurunegala" />
                                  <Picker.Item label="Kalmunai" value="mannar" />
                                  <Picker.Item label="Kalmunai" value="matale" />
                                  <Picker.Item label="Kalmunai" value="matara" />
                                  <Picker.Item label="Kalmunai" value="monaragala" />
                                  <Picker.Item label="Kalmunai" value="mullaitivu" />
                                  <Picker.Item label="Nuwara Eliya" value="nuwara" />
                                  <Picker.Item label="Kalmunai" value="puttalam" />
                                  <Picker.Item label="Kalmunai" value="ratnapura" />
                                  <Picker.Item label="Kalmunai" value="trincomalee" />
                                  <Picker.Item label="Kalmunai" value="vavuniya" />
                                  
                              </Picker>                                                        
                                                 
                        
                      
                        <Block flex>
        {/* <Card item={articles[0]} horizontal /> */}
        <Block flex row>
            <Card
              item={{
                title: 'Cumulative local',
                image: require("../assets/imgs/ac.jpg"),
                // description: `${this.state.local_total_cases}`
              }}
              style={{ marginRight: theme.SIZES.BASE}}
            >
            
              </Card>
            

</Block>
<Block flex row>
           
            <Card item={{
                title: 'Cumulative foreign',
                image: require("../assets/imgs/active.jpg"),       
                // description: `${this.state.local_active_cases}`
            }} />

</Block>
          <Block flex row>
            <Card
              item={{
                title: 'Treatment local',
                image: require("../assets/imgs/tcc.jpg"),
                // description: `${this.state.local_new_cases}`
              }}
              style={{ marginRight: theme.SIZES.BASE }}
            />
            <Card item={{
                title: 'Treatment foreign',
                image: require("../assets/imgs/ui.jpg"),
                // description: `${this.state.local_total_number_of_individuals_in_hospitals}`
            }} />
          </Block>
          <Block flex row>
            <Card
              item={{
                title: 'Hospital data from :',
               
                // description: `${this.state.local_recovered}`
              }}
              style={{ marginRight: theme.SIZES.BASE }}
            />
         
          </Block>
       
        </Block>
                           
                </Block>
             
              </Block>
             
           
         
       
      </ScrollView>
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
  visitsContainer: {
    marginTop: 55,
    marginBottom: 55,
    width: width * 0.9,
    height: height < 812 ? height * 0.8 : height * 0.8,
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
    backgroundColor: nowTheme.COLORS.WHITE,
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
    color:nowTheme.COLORS.PRIMARY,
    width: width * 0.5,
    marginTop: 25,
    marginBottom: 40
  },
  social: {
    width: theme.SIZES.BASE * 3.5,
    height: theme.SIZES.BASE * 3.5,
    borderRadius: theme.SIZES.BASE * 1.75,
    justifyContent: 'center',
    marginHorizontal: 10
  },
  visitsInput: { 
    paddingVertical: 8, 
    paddingHorizontal: 80, 
    borderWidth: 1, 
    borderColor: 'grey', 
    borderRadius: 10,
    marginBottom: 10,
    justifyContent: 'center', 
  }
});

export default District;
