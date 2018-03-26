import React, { Component } from "react";
import PropTypes from "prop-types";
import { StyleSheet, View, StatusBar, Text } from "react-native";

import { navStyles } from "../constants";
import SiteList from "./SiteList";

const fakeData = [
   { key: "a", title: "Sample App", actionDate: require("moment")() },
   { key: "b", title: "Sample App" },
   { key: "c", title: "Sample App" }
];

export default class HomeScreen extends Component {
   static navigationOptions = {
      ...navStyles.primary,
      title: "Home"
   };

   render() {
      return (
         <View style={styles.HS}>
            <StatusBar barStyle="light-content" />
            <SiteList data={fakeData} />
         </View>
      );
   }
}

const styles = StyleSheet.create({
   HS: {
      flex: 1
   }
});
