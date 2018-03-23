import React, { Component } from "react";
import { StyleSheet, Text, View } from "react-native";

import { colors } from "./constants";

export default class App extends Component {
   render() {
      return (
         <View style={styles.container}>
            <Text style={styles.text}>The Application is Working.</Text>
         </View>
      );
   }
}

const styles = StyleSheet.create({
   container: {
      flex: 1,
      backgroundColor: colors.white,
      alignItems: "center",
      justifyContent: "center"
   },
   text: {
      color: colors.text.default
   }
});
