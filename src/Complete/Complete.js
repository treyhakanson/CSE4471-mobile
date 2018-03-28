import React, { Component } from "react";
import PropTypes from "prop-types";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import EIcon from "react-native-vector-icons/Entypo";
import FIcon from "react-native-vector-icons/Foundation";

import { colors, navStyles } from "../constants";

export default class Complete extends Component {
   static navigationOptions = {
      title: "Passphrase Received"
   };

   render() {
      let { params: { success = false } = {} } = this.props.navigation.state;
      let Icon;
      let iconStyle;
      let text;
      let iconProps = {
         color: colors.white,
         size: 32
      };

      if (success) {
         Icon = EIcon;
         iconProps.name = "check";
         iconStyle = styles.SuccessIcon;
         text =
            "Passphrase successfully validated, you\nare now fully authenticated.";
      } else {
         Icon = FIcon;
         iconProps.name = "x";
         iconStyle = styles.FailureIcon;
         text = "Unable to validate passphrase.\nPlease try again.";
      }

      return (
         <View style={styles.S}>
            <View style={[styles.S__Icon, iconStyle]}>
               <Icon {...iconProps} />
            </View>
            <Text style={styles.S__Text}>{text}</Text>
            <TouchableOpacity
               style={styles.S__HomeButton}
               onPress={() => {
                  // FIXME: how to go back to home here, instead of just back
                  // 1? (can't just call the following method twice in a row)
                  this.props.navigation.goBack();
               }}
            >
               <Text style={styles.S__HomeButtonText}>HOME</Text>
            </TouchableOpacity>
         </View>
      );
   }
}

const styles = StyleSheet.create({
   S: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
      paddingHorizontal: 35,
      backgroundColor: colors.white
   },

   S__Icon: {
      height: 100,
      width: 100,
      borderRadius: 50,
      alignItems: "center",
      justifyContent: "center"
   },
   SuccessIcon: {
      backgroundColor: colors.success
   },
   FailureIcon: {
      backgroundColor: colors.danger
   },

   S__Text: {
      fontSize: 16,
      marginTop: 20,
      textAlign: "center"
   },

   S__HomeButton: {
      backgroundColor: colors.primary.default,
      paddingVertical: 10,
      alignSelf: "stretch",
      marginTop: 20
   },
   S__HomeButtonText: {
      fontSize: 18,
      fontWeight: "bold",
      color: colors.white,
      textAlign: "center"
   }
});
