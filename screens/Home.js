import React from "react";
import { StyleSheet, Dimensions, ScrollView} from "react-native";
import { Block, theme, Text } from "galio-framework";

import { Card, Button } from "../components";
const { width } = Dimensions.get('screen');

class Home extends React.Component {

  state = { 
    local_total_cases:0,
   global_total_cases:0,
   local_new_cases:0,
   local_deaths:0,
   local_recovered:0,
   local_active_cases:0,
   local_total_number_of_individuals_in_hospitals:0,
 };
  
  renderArticles = () => {
    return (
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.articles}
      >
        <Block flex>
        {/* <Card item={articles[0]} horizontal /> */}
        <Block flex row>
            <Card
              item={{
                title: 'Total Confirmed Cases',
                image: require("../assets/imgs/ac.jpg"),
                description: `${this.state.local_total_cases}`
              }}
              style={{ marginRight: theme.SIZES.BASE}}
            >
              <Text>{this.state.local_total_cases}</Text>
              </Card>
            {/* <Text>{this.state.local_total_cases}</Text> */}
            <Card item={{
                title: 'Active Cases',
                image: require("../assets/imgs/active.jpg"),       
                description: `${this.state.local_active_cases}`
            }} />

          </Block>
          <Block flex row>
            <Card
              item={{
                title: 'New Cases',
                image: require("../assets/imgs/tcc.jpg"),
                description: `${this.state.local_new_cases}`
              }}
              style={{ marginRight: theme.SIZES.BASE }}
            />
            <Card item={{
                title: 'Under investigations',
                image: require("../assets/imgs/ui.jpg"),
                description: `${this.state.local_total_number_of_individuals_in_hospitals}`
            }} />
          </Block>
          <Block flex row>
            <Card
              item={{
                title: 'Recovered',
                image: require("../assets/imgs/rec.jpg"),
                description: `${this.state.local_recovered}`
              }}
              style={{ marginRight: theme.SIZES.BASE }}
            />
            <Card item={{
                 title: 'Deaths',
                 image: require("../assets/imgs/dead.jpg"),
                 description: `${this.state.local_deaths}`
            }} />
          </Block>
       
        </Block>
      </ScrollView>
    );
  };
 
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
        local_active_cases : data.data.local_active_cases,
        local_total_number_of_individuals_in_hospitals : data.data.local_total_number_of_individuals_in_hospitals,
        isLoading: false,
        
        });
    });
    console.log("blaaaa "+this.state.local_total_cases);
    console.log("haaaa "+this.state.local_deaths);
   }


  async componentDidMount() {     
    console.log("app test")
  
    this.newsFetch();
  }



  render() {
    return (
      <Block flex center style={styles.home}>
        {this.renderArticles()}
      </Block>
    );
  }

 
}

const styles = StyleSheet.create({
  home: {
    width: width
  },
  articles: {
    width: width - theme.SIZES.BASE * 2,
    paddingVertical: theme.SIZES.BASE,
    paddingHorizontal: 2,
    fontFamily: 'montserrat-regular'

  }
});

export default Home;
