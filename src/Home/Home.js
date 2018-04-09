import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { StyleSheet, View, StatusBar, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/Entypo";

import { registerForPushNotificationsAsync } from "../Notifications";
import { colors, navStyles } from "../constants";
import { site } from "../ducks";
import SiteList from "./SiteList";

const AddSiteButton = () => (
   <TouchableOpacity style={{ marginRight: navStyles.buttonMargin }}>
      <Icon
         name="circle-with-plus"
         color={colors.white}
         size={navStyles.buttonSize}
      />
   </TouchableOpacity>
);

class HomeScreen extends Component {
   static navigationOptions = ({ navigation, navigationOptions }) => {
      return {
         title: "Home",
         headerLeft: null
         // headerRight: <AddSiteButton />
      };
   };

   async componentWillMount() {
      let token = await registerForPushNotificationsAsync();
      console.log("TOKEN:", token);
   }

   _onSpeak = site => {
      this.props.navigation.navigate("Speech", { site });
   };

   _onCancel = site => {
      // TODO: update status with call to API
      let updatedSite = { ...site };
      delete updatedSite.actionDate;
      this.props.updateOneSite(updatedSite);
   };

   render() {
      return (
         <View style={styles.HS}>
            <StatusBar barStyle="light-content" />
            <SiteList
               data={this.props.data}
               onSpeak={this._onSpeak}
               onCancel={this._onCancel}
            />
         </View>
      );
   }
}

function mapStateToProps(state) {
   return {
      data: state.site.data
   };
}

export default connect(mapStateToProps, {
   updateOneSite: site.updateOne
})(HomeScreen);

const styles = StyleSheet.create({
   HS: {
      flex: 1
   }
});
