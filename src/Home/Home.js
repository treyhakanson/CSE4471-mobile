import React, { Component } from "react";
import PropTypes from "prop-types";
import { StyleSheet, View, StatusBar, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/Entypo";

import { colors, navStyles } from "../constants";
import SiteList from "./SiteList";

// TODO: this should be in redux so that it can be updated from the Complete
// screen
const fakeData = [
   { key: "a", title: "Sample App 1", actionDate: require("moment")() },
   { key: "b", title: "Sample App 2" },
   { key: "c", title: "Sample App 3" }
];

const AddSiteButton = () => (
   <TouchableOpacity style={{ marginRight: navStyles.buttonMargin }}>
      <Icon
         name="circle-with-plus"
         color={colors.white}
         size={navStyles.buttonSize}
      />
   </TouchableOpacity>
);

export default class HomeScreen extends Component {
   static navigationOptions = ({ navigation, navigationOptions }) => {
      return {
         title: "Home",
         headerRight: <AddSiteButton />
      };
   };

   constructor(props) {
      super(props);
      this.state = {
         data: [...fakeData]
      };
   }

   _onSpeak = item => {
      this.props.navigation.navigate("Speech", { ...item });
   };

   _onCancel = item => {
      // TODO: update status with call to API
      // TODO: should be a redux update
      let data = [...this.state.data];
      delete data.find(x => x.key === item.key).actionDate;
      this.setState({ data });
   };

   render() {
      return (
         <View style={styles.HS}>
            <StatusBar barStyle="light-content" />
            <SiteList
               data={this.state.data}
               onSpeak={this._onSpeak}
               onCancel={this._onCancel}
            />
         </View>
      );
   }
}

const styles = StyleSheet.create({
   HS: {
      flex: 1
   }
});
