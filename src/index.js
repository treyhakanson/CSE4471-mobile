import React, { Component } from "react";
import { StyleSheet, View } from "react-native";
import { Provider } from "react-redux";
import { StackNavigator } from "react-navigation";

import { navStyles } from "./constants";
import Home from "./Home";
import Speech from "./Speech";
import Complete from "./Complete";
import store from "./ducks";

const Navigator = StackNavigator(
   {
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
      initialRouteName: "Home",
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
