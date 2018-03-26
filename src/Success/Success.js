import React, { Component } from "react";
import PropTypes from "prop-types";
import { StyleSheet, View, Text } from "react-native";

import navStyles from "../constants/nav-styles";

export default class Success extends Component {
   static navigationOptions = {
      ...navStyles.primary,
      title: "Home"
   };

   render() {
      return (
         <View style={styles.S}>
            <Text>Success Screen</Text>
         </View>
      );
   }
}

const styles = StyleSheet.create({
   S: {}
});
