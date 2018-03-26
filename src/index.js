import React, { Component } from "react";
import { StyleSheet, View } from "react-native";
import { StackNavigator } from "react-navigation";

import { navStyles } from "./constants";
import Home from "./Home";
import Speech from "./Speech";
import Complete from "./Complete";

export default StackNavigator(
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
