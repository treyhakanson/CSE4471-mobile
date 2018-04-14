import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { StyleSheet, View, StatusBar, TouchableOpacity } from "react-native";
import { Notifications } from "expo";
import moment from "moment";
import Icon from "react-native-vector-icons/Entypo";

import { colors, navStyles } from "../constants";
import { site, auth } from "../ducks";
import SiteList from "./SiteList";

const LogoutButton = props => (
   <TouchableOpacity
      style={{ marginRight: navStyles.buttonMargin }}
      onPress={props.onPress}
   >
      <Icon name="log-out" color={colors.white} size={navStyles.buttonSize} />
   </TouchableOpacity>
);

class HomeScreen extends Component {
   static navigationOptions = ({ navigation }) => {
      return {
         title: "Home",
         headerLeft: null,
         headerRight: (
            <LogoutButton
               onPress={() => {
                  navigation.state.params.logout();
                  navigation.navigate("Login");
               }}
            />
         )
      };
   };

   componentDidMount() {
      this.props.navigation.setParams({
         logout: this.props.logout
      });
      this._notificationSubscription = Notifications.addListener(
         this._handleNotification
      );
   }

   componentWillUnmount() {
      this._notificationSubscription.remove();
   }

   _handleNotification = notification => {
      let site = notification.data;
      site.actionDate = moment(site.actionDate);
      console.log(site);
      this.props.addOne(site);
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
   updateOneSite: site.updateOne,
   addOne: site.addOne,
   logout: auth.logout
})(HomeScreen);

const styles = StyleSheet.create({
   HS: {
      flex: 1
   }
});
