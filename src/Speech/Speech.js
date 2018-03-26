import React, { Component } from "react";
import PropTypes from "prop-types";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/Entypo";

import { colors, navStyles } from "../constants";

const BackButton = ({ onPress }) => (
   <TouchableOpacity
      style={{ marginLeft: navStyles.buttonMargin }}
      onPress={onPress}
   >
      <Icon
         name="chevron-left"
         color={colors.white}
         size={navStyles.buttonSize}
      />
   </TouchableOpacity>
);

export default class Speech extends Component {
   static navigationOptions = ({ navigation, navigationOptions }) => {
      return {
         title: "Speak Passphrase",
         headerLeft: <BackButton onPress={() => navigation.goBack()} />
      };
   };

   render() {
      return (
         <View style={styles.S}>
            <View style={styles.S__Mic}>
               <Icon name="mic" color={colors.white} size={32} />
            </View>
         </View>
      );
   }
}

const styles = StyleSheet.create({
   S: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center"
   },
   S__Mic: {
      height: 100,
      width: 100,
      borderRadius: 50,
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: colors.accent.default
   }
});
