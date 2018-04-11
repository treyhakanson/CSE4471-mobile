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

import {
   colors,
   api,
   STATUS,
   commonPasswords,
   validations
} from "../constants";
import { auth } from "../ducks";
import { registerForPushNotificationsAsync } from "../Notifications";

const Segment = props => {
   let finalStyles = [styles.PSM__Segment];
   if (props.active) {
      finalStyles.push({ backgroundColor: props.activeColor });
   }
   return <View style={finalStyles} />;
};

class SignUp extends Component {
   static navigationOptions = {
      header: null
   };

   componentWillReceiveProps(nextProps) {
      if (nextProps.auth.error) {
         this.setState({ status: STATUS.ERROR });
      }
   }

   async componentDidMount() {
      let token = await registerForPushNotificationsAsync();
      this.setState({ pushToken: token });
   }

   constructor(props) {
      super(props);
      this.state = {
         username: "",
         password: "",
         pushToken: "",
         ready: false,
         passwordInfo: this._evaluateStrength(""),
         status: STATUS.IDLE
      };
   }

   _handleSubmit = () => {
      const { username, password, pushToken } = this.state;
      this.setState({ status: STATUS.BUSY });
      this.props.signup(username, password, pushToken);
   };

   _onChangeText = (text, key) => {
      let state = { [key]: text };
      if (key === "password") {
         state.passwordInfo = this._evaluateStrength(text);
         state.ready =
            state.passwordInfo.score >= 3 &&
            validations.email(this.state.username);
      } else {
         state.ready =
            this.state.passwordInfo.score >= 3 && validations.email(text);
      }
      this.setState(state);
   };

   _evaluateStrength(password) {
      let info = { score: 0 };
      let needs = [];

      if (commonPasswords.has(password)) {
         info.score = 0;
         info.text = "Weak Sauce";
         info.message = "Your password is too common, please be more creative.";
         return info;
      }

      info.score += password.length === 8; // check length

      if (password.length > 8) {
         info.score++;
      } else {
         needs.push("length");
      }

      if (info.score < 1) {
         info.score = 0;
         info.text = "Weak Sauce";
         info.message = "Your password must be at least 8 characters.";
         return info;
      }

      if (/\d/.test(password)) {
         info.score++;
      } else {
         needs.push("a digit");
      }

      if (/[A-Z]/.test(password)) {
         info.score++;
      } else {
         needs.push("a capital");
      }

      if (/\W/.test(password)) {
         info.score++;
      } else {
         needs.push("a special");
      }

      let needsStr =
         needs.length > 1
            ? `${needs.slice(0, needs.length - 1).join(", ")} or ${
                 needs[needs.length - 1]
              }`
            : needs[0];

      switch (info.score) {
         case 1:
            info.text = "Bad";
            info.message = `Try adding ${needsStr}`;
            break;
         case 2:
            info.text = "Fair";
            info.message = `Try adding ${needsStr}`;
            break;
         case 3:
            info.text = "Good";
            info.message = `Not bad! Try adding ${needsStr} for more security.`;
            break;
         default:
            info.text = "Great";
            info.message = "Great password!";
            break;
      }

      return info;
   }

   render() {
      const { score, text, message } = this.state.passwordInfo;
      let segments = [
         <Segment key={1} activeColor={colors.danger} />,
         <Segment key={2} activeColor={colors.warning} />,
         <Segment key={3} activeColor={colors.success} />,
         <Segment key={4} activeColor={colors.primary.default} />
      ];

      for (let i = 0; i < score; i++) {
         segments[i] = React.cloneElement(segments[i], { active: true });
      }

      return (
         <View style={styles.L}>
            <View style={styles.L__Inner}>
               <Text style={styles.Header}>Sign Up</Text>
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
                        placeholder="Email"
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
                  <View style={styles.PSM}>
                     <Text style={styles.PSM__HeaderText}>
                        Password Strength:
                     </Text>
                     <View style={styles.PSM__Segments}>{segments}</View>
                     <Text style={styles.PSM__StrengthText}>{text}</Text>
                     <Text>{message}</Text>
                  </View>
               </View>
               <TouchableOpacity
                  style={[
                     styles.SubmitButton,
                     !this.state.ready && styles.SubmitButtonDisabled
                  ]}
                  onPress={this._handleSubmit}
                  disabled={!this.state.ready}
               >
                  <Text style={styles.SubmitButtonText}>Submit</Text>
               </TouchableOpacity>
               <TouchableOpacity
                  onPress={() => this.props.navigation.navigate("Login")}
                  style={{ alignSelf: "stretch" }}
               >
                  <Text style={styles.LinkText}>
                     Already have an account? Login
                  </Text>
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
   signup: auth.signup
})(SignUp);

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
   SubmitButtonDisabled: {
      backgroundColor: colors.grey.light
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
   },
   PSM: {
      marginTop: 10
   },
   PSM__HeaderText: {
      fontWeight: "bold",
      fontSize: 16
   },
   PSM__Segments: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      marginVertical: 8
   },
   PSM__Segment: {
      width: 55,
      height: 10,
      borderRadius: 5,
      backgroundColor: colors.grey.extraLight
   },
   PSM__StrengthText: {
      fontWeight: "bold",
      marginBottom: 5
   },
   LinkText: {
      color: colors.primary.default,
      marginTop: 15,
      fontWeight: "bold",
      textAlign: "left"
   }
});
