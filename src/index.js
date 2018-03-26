import React, { Component } from "react";
import { StyleSheet, View } from "react-native";
import { StackNavigator } from "react-navigation";

import Home from "./Home";
import Speech from "./Speech";
import Success from "./Success";

export default StackNavigator({
   Home: {
      screen: Home
   },
   Speech: {
      screen: Speech
   },
   Success: {
      screen: Success
   }
});
