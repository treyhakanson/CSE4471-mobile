import React, { Component } from "react";
import PropTypes from "prop-types";
import { StyleSheet, View, Text } from "react-native";

export default class Success extends Component {
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
