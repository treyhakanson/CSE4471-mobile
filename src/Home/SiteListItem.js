import React, { Component } from "react";
import PropTypes from "prop-types";
import { StyleSheet, TouchableOpacity, View, Text } from "react-native";
import moment from "moment";
import EIcon from "react-native-vector-icons/Entypo";
import FIcon from "react-native-vector-icons/Foundation";

import { colors } from "../constants";

const ACTIONS = {
   SPEAK: Symbol("ACTIONS/SPEAK"),
   CANCEL: Symbol("ACTIONS/CANCEL")
};

export default class SiteListItem extends Component {
   static propTypes = {
      onPress: PropTypes.func.isRequired,
      title: PropTypes.string.isRequired,
      actionDate: PropTypes.instanceOf(moment)
   };

   static defaultProps = {
      onPress: () => {}
   };

   _onPress = action => {
      this.props.onPress(action);
   };

   render() {
      return (
         <TouchableOpacity style={styles.SLI}>
            <View style={styles.SLI__Info}>
               <Text style={styles.SLI__TitleText}>{this.props.title}</Text>
               {this.props.actionDate && (
                  <View style={styles.SLI__InfoAction}>
                     <EIcon name="warning" color={colors.warning} size={14} />
                     <View style={styles.SLI__InfoActionText}>
                        <Text style={styles.InfoAction__Main}>
                           Action Requested
                        </Text>
                        <Text style={styles.InfoAction__Sub}>
                           {this.props.actionDate.format("MM/DD - h:mma")}
                        </Text>
                     </View>
                  </View>
               )}
            </View>
            {this.props.actionDate && (
               <View style={styles.SLI__Action}>
                  <TouchableOpacity
                     style={[
                        styles.SLI__ActionButton,
                        styles.ActionButtonSpeak
                     ]}
                     onPress={() => this._onPress(ACTIONS.SPEAK)}
                  >
                     <EIcon name="mic" color={colors.white} size={18} />
                  </TouchableOpacity>
                  <TouchableOpacity
                     style={[
                        styles.SLI__ActionButton,
                        styles.ActionButtonCancel
                     ]}
                     onPress={() => this._onPress(ACTIONS.CANCEL)}
                  >
                     <FIcon name="x" color={colors.white} size={18} />
                  </TouchableOpacity>
               </View>
            )}
         </TouchableOpacity>
      );
   }
}

const styles = StyleSheet.create({
   SLI: {
      flexDirection: "row",
      padding: 20,
      backgroundColor: colors.white,
      borderBottomColor: colors.grey.light,
      borderBottomWidth: 1
   },

   SLI__Info: {
      flex: 1
   },
   SLI__TitleText: {
      fontWeight: "bold",
      fontSize: 20
   },
   SLI__InfoAction: {
      marginTop: 8,
      flexDirection: "row",
      alignItems: "center"
   },
   SLI__InfoActionText: {
      marginLeft: 8
   },
   InfoAction__Main: {
      fontSize: 12
   },
   InfoAction__Sub: {
      fontSize: 10
   },

   SLI__Action: {
      flex: 1,
      flexDirection: "row",
      justifyContent: "flex-end",
      alignItems: "center"
   },
   SLI__ActionButton: {
      height: 50,
      width: 50,
      borderRadius: 25,
      alignItems: "center",
      justifyContent: "center"
   },
   ActionButtonSpeak: {
      backgroundColor: colors.accent.default,
      marginRight: 15
   },
   ActionButtonCancel: {
      backgroundColor: colors.grey.medium
   }
});
