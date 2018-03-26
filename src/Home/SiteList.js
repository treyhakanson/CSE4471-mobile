import React, { Component } from "react";
import PropTypes from "prop-types";
import { StyleSheet, FlatList, View, Text } from "react-native";

import { colors } from "../constants";
import SiteListItem from "./SiteListItem";

export default class SiteList extends Component {
   _renderItem = ({ item }) => {
      return <SiteListItem {...item} />;
   };

   render() {
      return (
         <View style={styles.SL}>
            <FlatList
               style={styles.SL__List}
               data={this.props.data}
               renderItem={this._renderItem}
            />
         </View>
      );
   }
}

const styles = StyleSheet.create({
   SL: {
      flex: 1
   },
   SL__List: {
      flex: 1,
      backgroundColor: colors.grey.extraLight
   }
});
