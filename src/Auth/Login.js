import React, { Component } from "react";
import PropTypes from "prop-types";
import {
   StyleSheet,
   View,
   Text,
   TouchableOpacity,
   TextInput
} from "react-native";
import Icon from "react-native-vector-icons/Entypo";

import { colors } from "../constants";

export default class Login extends Component {
   constructor(props) {
      super(props);
      this.state = {
         username: "",
         password: ""
      };
   }

   _handleSubmit = () => {
      const { username, password } = this.state;
      console.log("Submiting form with values:", username, password);
   };

   _onChangeText = (text, key) => {
      this.setState({ [key]: text });
   };

   render() {
      return (
         <View style={styles.L}>
            <View style={styles.L__Inner}>
               <Text style={styles.Header}>Welcome</Text>
               <View style={styles.Content}>
                  <View style={[styles.TextInputWrapper, { marginBottom: 10 }]}>
                     <Icon
                        style={styles.TextInputIcon}
                        name="user"
                        size={18}
                        color={colors.grey.medium}
                     />
                     <TextInput
                        style={styles.TextInput}
                        value={this.state.username}
                        placeholder="Username"
                        onChangeText={text =>
                           this._onChangeText(text, "username")
                        }
                     />
                  </View>
                  <View style={styles.TextInputWrapper}>
                     <Icon
                        style={styles.TextInputIcon}
                        name="lock"
                        size={18}
                        color={colors.grey.medium}
                     />
                     <TextInput
                        secureTextEntry
                        style={styles.TextInput}
                        value={this.state.password}
                        placeholder="Password"
                        onChangeText={text =>
                           this._onChangeText(text, "password")
                        }
                     />
                  </View>
               </View>
               <TouchableOpacity
                  style={styles.SubmitButton}
                  onPress={this._handleSubmit}
               >
                  <Text style={styles.SubmitButtonText}>Submit</Text>
               </TouchableOpacity>
            </View>
         </View>
      );
   }
}

const styles = StyleSheet.create({
   L: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
      paddingHorizontal: 50,
      backgroundColor: colors.primary.default
   },
   L__Inner: {
      padding: 15,
      alignSelf: "stretch",
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: colors.white
   },
   Header: {
      fontSize: 20
   },
   Content: {
      alignSelf: "stretch",
      marginVertical: 15
   },
   TextInputWrapper: {
      flexDirection: "row",
      alignSelf: "stretch",
      padding: 5,
      backgroundColor: colors.grey.extraLight,
      alignItems: "center",
      justifyContent: "flex-start"
   },
   TextInput: {
      flex: 1
   },
   TextInputIcon: {
      width: 30
   },
   SubmitButton: {
      backgroundColor: colors.primary.dark,
      paddingVertical: 8,
      alignSelf: "stretch"
   },
   SubmitButtonText: {
      color: colors.white,
      textAlign: "center",
      fontSize: 14
   }
});
