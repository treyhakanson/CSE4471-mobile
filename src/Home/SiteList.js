import React, { Component } from "react";
import PropTypes from "prop-types";
import { StyleSheet, FlatList, View, Text } from "react-native";

import { colors, SiteType } from "../constants";
import SiteListItem from "./SiteListItem";

export default class SiteList extends Component {
   static propTypes = {
      data: PropTypes.arrayOf(SiteType),
      onSpeak: PropTypes.func.isRequired,
      onCancel: PropTypes.func.isRequired
   };

   static defaultProps = {
      data: [],
      onSpeak: () => {},
      onCancel: () => {}
   };

   _renderItem = ({ item }) => {
      return (
         <SiteListItem
            item={item}
            onSpeak={this.props.onSpeak}
            onCancel={this.props.onCancel}
         />
      );
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
