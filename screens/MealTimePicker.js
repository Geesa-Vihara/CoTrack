import React from 'react';
import {
  StyleSheet,
  ImageBackground,
  Dimensions,
  StatusBar,
  TouchableWithoutFeedback,
  Keyboard
} from 'react-native';
import { Block, Checkbox, Text, Button as GaButton, theme } from 'galio-framework';

import TimePicker from 'react-native-simple-time-picker';
import moment from 'moment';

import { Button, Icon, Input } from '../components';
import { Images, nowTheme } from '../constants';
import { setMealTimes } from "../actions/database.js";

const { width, height } = Dimensions.get('screen');

const DismissKeyboard = ({ children }) => (
  <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>{children}</TouchableWithoutFeedback>
);

class MealTimePicker extends React.Component {
  
  state = {
    breakfastHour: 0,
    breakfastMinutes: 0,
    lunchHour: 0,
    lunchMinutes: 0,
    dinnerHour: 0,
    dinnerMinutes: 0,
  }

  handleChange = (hours, minutes, h, m) => {
    this.setState({ [hours]: h, [minutes]: m });
    console.log(this.state)
  }

  handleSubmit = () => {
    const breakfast = this.state.breakfastHour + ':' + this.state.breakfastMinutes;
    const lunch = this.state.lunchHour + ':' + this.state.lunchMinutes;
    const dinner = this.state.dinnerHour + ':' + this.state.dinnerMinutes;

    setMealTimes(breakfast,lunch.dinner);

    // const breakfast = moment.utc(b, [moment.ISO_8601, 'HH:mm']);
    // console.log(breakfast.format('HH:mm'))
    console.log(breakfast,lunch,dinner);
  }

  render() {
    return (
      <DismissKeyboard>
        <Block flex middle>
          <ImageBackground
            source={Images.RegisterBackground}
            style={styles.imageBackgroundContainer}
            imageStyle={styles.imageBackground}
          >
            <Block flex middle>
              <Block style={styles.timepickerContainer}>
                <Block flex space="evenly">
                  <Block flex={0.2} middle style={styles.socialConnect}>
                    <Block flex={0.1} middle>
                      <Text
                        style={{
                          fontFamily: 'montserrat-regular',
                          textAlign: 'center'
                        }}
                        color="#333"
                        size={24}
                      >
                        Pick Your Meal Times
                      </Text>
                    </Block>
                  </Block>
                  <Block flex={0.2}>
                    <Text
                      style={{
                        fontFamily: 'montserrat-regular',
                        textAlign: 'center'
                      }}
                      muted
                      size={16}
                    >
                      Set the time you have your breakfast, lunch and dinner
                    </Text>
                  </Block>
                  <Block flex={1} middle space="between">
                    <Block center flex={0.5}>
                      <Block flex space="between">
                        <Block>
                          <Block width={width * 0.8} style={styles.timepickerInput}>
                            <Text style={{
                              fontFamily: 'montserrat-regular',
                              textAlign: 'center'
                            }}
                            size={16}
                            >
                            Breakfast Time
                            </Text>
                            <TimePicker
                              selectedHours={this.state.breakfastHour}
                              selectedMinutes={this.state.breakfastMinutes}
                              onChange={(selectedHours,selectedMinutes) => this.handleChange('breakfastHour','breakfastMinutes',selectedHours,selectedMinutes)}
                            />
                          </Block>
                          <Block width={width * 0.8} style={styles.timepickerInput}>
                            <Text style={{
                              fontFamily: 'montserrat-regular',
                              textAlign: 'center'
                            }}
                            size={16}
                            >
                            Lunch Time
                            </Text>
                            <TimePicker
                              selectedHours={this.state.lunchHour}
                              selectedMinutes={this.state.lunchMinutes}
                              onChange={(selectedHours,selectedMinutes) => this.handleChange('lunchHour','lunchMinutes',selectedHours,selectedMinutes)}
                            />
                          </Block>
                          <Block width={width * 0.8} style={styles.timepickerInput}>
                            <Text style={{
                              fontFamily: 'montserrat-regular',
                              textAlign: 'center'
                            }}
                            size={16}
                            >
                            Dinner Time
                            </Text>
                            <TimePicker
                              selectedHours={this.state.dinnerHour}
                              selectedMinutes={this.state.dinnerMinutes}
                              onChange={(selectedHours,selectedMinutes) => this.handleChange('dinnerHour','dinnerMinutes',selectedHours,selectedMinutes)}
                            />
                          </Block>
                        </Block>
                        <Block center>
                          <Button color="info" round style={styles.createButton} onPress={this.handleSubmit}>
                            <Text
                              style={{ fontFamily: 'montserrat-bold' }}
                              size={14}
                              color={nowTheme.COLORS.WHITE}
                            >
                              Done
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
  timepickerContainer: {
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
  timepickerInput: { 
    paddingVertical: 8, 
    paddingHorizontal: 80, 
    borderWidth: 1, 
    borderColor: 'grey', 
    borderRadius: 10,
    marginBottom: 10,
    justifyContent: 'center', 
  }
});

export default MealTimePicker;
