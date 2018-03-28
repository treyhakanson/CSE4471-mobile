import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { StyleSheet, View, StatusBar, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/Entypo";

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
         headerRight: <AddSiteButton />
      };
   };

   _onSpeak = item => {
      this.props.navigation.navigate("Speech", { ...item });
   };

   _onCancel = item => {
      // TODO: update status with call to API
      let updatedItem = { ...item };
      delete updatedItem.actionDate;
      this.props.updateOneSite(updatedItem);
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

export default connect(
   state => {
      return {
         data: state.site.data
      };
   },
   {
      updateOneSite: site.updateOne
   }
)(HomeScreen);

const styles = StyleSheet.create({
   HS: {
      flex: 1
   }
});
