import React from "react";
import { StyleSheet, Dimensions, ScrollView} from "react-native";
import { Block, theme, Text } from "galio-framework";

import { Card, Button } from "../components";
const { width } = Dimensions.get('screen');

class Global extends React.Component {



  render() {
    return (
        <Text>GLOBAL</Text>
    )
      
  }

 
}



export default Global;
