import React, { Component } from "react";
import PropTypes from "prop-types";
import { StyleSheet, View, Text } from "react-native";

export default class HomeScreen extends Component {
   render() {
      return (
         <View style={styles.HS}>
            <Text>Home Screen</Text>
         </View>
      );
   }
}

const styles = StyleSheet.create({
   HS: {}
});
