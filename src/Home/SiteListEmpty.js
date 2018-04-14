import React, { Component } from "react";
import { StyleSheet, View, Text } from "react-native";
import Icon from "react-native-vector-icons/Entypo";

import { colors } from "../constants";

export default class SiteListEmpty extends Component {
   render() {
      return (
         <View style={styles.SLE}>
            <Icon name="thumbs-up" color={colors.grey.medium} size={30} />
            <Text style={styles.SLE__Text} >No pending authentication requests.</Text>
         </View>
      );
   }
}

const styles = StyleSheet.create({
   SLE: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      marginTop: 20
   },
   SLE__Text: {
      fontSize: 16,
      marginTop: 8
   }
});
