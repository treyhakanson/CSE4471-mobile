import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/Entypo";

import { colors, navStyles, SiteType } from "../constants";
import { site } from "../ducks";
import AudioManager from "./audio-setup";

const audioManager = new AudioManager();

const BackButton = ({ onPress }) => (
   <TouchableOpacity
      style={{ marginLeft: navStyles.buttonMargin }}
      onPress={onPress}
   >
      <Icon
         name="chevron-left"
         color={colors.white}
         size={navStyles.buttonSize}
      />
   </TouchableOpacity>
);

class Speech extends Component {
   static propTypes = {
      navigation: PropTypes.shape({
         state: PropTypes.shape({
            params: PropTypes.shape({
               site: SiteType.isRequired
            }).isRequired
         }).isRequired
      }).isRequired
   };

   static navigationOptions = ({ navigation, navigationOptions }) => {
      return {
         title: "Speak Passphrase",
         headerLeft: <BackButton onPress={() => navigation.goBack()} />
      };
   };

   async componentWillMount() {
      await audioManager.init();
   }

   constructor(props) {
      super(props);
      this.state = {
         playing: false
      };
   }

   _toggleAudio = async () => {
      if (!audioManager.isInitialized()) {
         return;
      }
      if (!this.state.playing) {
         await audioManager.begin();
         this.setState({ playing: true });
         return;
      }
      // TODO: actually send this audio up to the API before sending to the
      // complete screen, and mark this notification as handled based on result
      const info = await audioManager.end();
      let updatedSite = { ...this.props.navigation.state.params.site };
      delete updatedSite.actionDate;
      this.props.updateOneSite(updatedSite);
      this.props.navigation.navigate("Complete", { success: true });
      this.setState({ playing: false });
   };

   render() {
      return (
         <View style={styles.S}>
            <TouchableOpacity style={styles.S__Mic} onPress={this._toggleAudio}>
               <Icon name="mic" color={colors.white} size={32} />
            </TouchableOpacity>
            <Text style={styles.S__Text}>
               {this.state.playing
                  ? "Tap the microphone again to finish speaking."
                  : "Tap the microphone to begin speaking."}
            </Text>
         </View>
      );
   }
}

export default connect(null, {
   updateOneSite: site.updateOne
})(Speech);

const styles = StyleSheet.create({
   S: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: colors.white
   },
   S__Mic: {
      height: 100,
      width: 100,
      borderRadius: 50,
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: colors.accent.default
   },
   S__Text: {
      fontSize: 16,
      marginTop: 20,
      textAlign: "center"
   }
});
