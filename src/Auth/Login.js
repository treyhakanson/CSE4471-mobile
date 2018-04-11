import React, { Component } from "react";
import PropTypes from "prop-types";
import {
   StyleSheet,
   View,
   Text,
   TouchableOpacity,
   TextInput
} from "react-native";
import { connect } from "react-redux";
import Icon from "react-native-vector-icons/Entypo";

import { colors, api, STATUS } from "../constants";
import { auth } from "../ducks";

class Login extends Component {
   static navigationOptions = {
      header: null
   };

   componentWillReceiveProps(nextProps) {
      if (nextProps.auth.error) {
         this.setState({ status: STATUS.ERROR });
      } else if (nextProps.auth.token) {
         this.props.navigation.navigate("Home");
      }
   }

   constructor(props) {
      super(props);
      this.state = {
         username: "",
         password: "",
         status: STATUS.IDLE
      };
   }

   _handleSubmit = () => {
      const { username, password } = this.state;
      this.setState({ status: STATUS.BUSY });
      this.props.login(username, password);
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
                        autoCapitalize="none"
                        autoCorrect={false}
                        style={styles.TextInput}
                        value={this.state.username}
                        placeholder="Username"
                        underlineColorAndroid="rgba(0,0,0,0)"
                        tintColor={colors.primary.default}
                        selectionColor={colors.primary.faded}
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
                        underlineColorAndroid="rgba(0,0,0,0)"
                        tintColor={colors.primary.default}
                        selectionColor={colors.primary.faded}
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
               {this.state.status === STATUS.ERROR && (
                  <View style={styles.ErrorBlock}>
                     <Text style={styles.ErrorText}>
                        {this.props.auth.error}
                     </Text>
                  </View>
               )}
            </View>
         </View>
      );
   }
}

function mapStateToProps(state) {
   return {
      auth: state.auth
   };
}

export default connect(mapStateToProps, {
   login: auth.login
})(Login);

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
      marginTop: 15,
      marginBottom: 10
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
   },
   ErrorBlock: {
      backgroundColor: colors.danger,
      marginTop: 10,
      alignSelf: "stretch"
   },
   ErrorText: {
      color: colors.white,
      paddingVertical: 10,
      textAlign: "center"
   }
});
