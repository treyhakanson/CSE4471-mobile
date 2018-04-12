import React, { Component } from "react";
import { StyleSheet, View } from "react-native";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { StackNavigator } from "react-navigation";

import { navStyles } from "./constants";
import { store, persistor } from "./ducks";
import { Login, SignUp } from "./Auth";
import Home from "./Home";
import Speech from "./Speech";
import Complete from "./Complete";

let navigationConfig = [
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
];

export default class ApplicationWrapper extends Component {
   render() {
      return (
         <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
               {() => {
                  if (store.getState().auth.token) {
                     navigationConfig[1].initialRouteName = "Home";
                  }
                  const Navigator = StackNavigator(...navigationConfig);
                  return <Navigator />;
               }}
            </PersistGate>
         </Provider>
      );
   }
}
