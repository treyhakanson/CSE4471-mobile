import React, { Component } from "react";
import { StyleSheet, View } from "react-native";
import { Provider } from "react-redux";
import { StackNavigator } from "react-navigation";

import { navStyles } from "./constants";
import store from "./ducks";
import { Login, SignUp } from "./Auth";
import Home from "./Home";
import Speech from "./Speech";
import Complete from "./Complete";

const Navigator = StackNavigator(
   {
      Login: {
         screen: Login
      },
      SignUp: {
         screen: SignUp
      },
      Home: {
         screen: Home
      },
      Speech: {
         screen: Speech
      },
      Complete: {
         screen: Complete
      }
   },
   {
      initialRouteName: "SignUp",
      navigationOptions: {
         ...navStyles.primary
      }
   }
);

const ApplicationWrapper = () => (
   <Provider store={store}>
      <Navigator />
   </Provider>
);

export default ApplicationWrapper;
