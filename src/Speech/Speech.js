import React, { Component } from "react";
import PropTypes from "prop-types";
import { Permissions } from "expo";
import { connect } from "react-redux";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import EIcon from "react-native-vector-icons/Entypo";
import FIcon from "react-native-vector-icons/Foundation";
import axios from "axios";

import { api, colors, navStyles, SiteType, STATUS } from "../constants";
import { site } from "../ducks";
import AudioManager from "./audio-setup";

const audioManager = new AudioManager();

const BackButton = ({ onPress }) => (
   <TouchableOpacity
      style={{ marginLeft: navStyles.buttonMargin }}
      onPress={onPress}
   >
      <EIcon
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

   async componentDidMount() {
      const { status: existingStatus } = await Permissions.getAsync(
         Permissions.AUDIO_RECORDING
      );
      let finalStatus = existingStatus;
      console.log("AUDIO STATUS:", existingStatus);

      if (finalStatus !== "granted") {
         let { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
         finalStatus = status;
      }
      console.log("AUDIO STATUS:", finalStatus);

      this.setState({ audioAvailable: finalStatus });
   }

   constructor(props) {
      super(props);
      this.state = {
         audioAvailable: false,
         playing: false,
         status: STATUS.IDLE
      };
   }

   _toggleAudio = async () => {
      if (!audioManager.isInitialized() || !this.state.audioAvailable) {
         return;
      }

      if (!this.state.playing) {
         await audioManager.begin();
         this.setState({ playing: true });
         return;
      }

      const info = await audioManager.end();
      const success = await this._handleAudioUpload(info);
      let status = STATUS.ERROR;
      this.setState({ status: STATUS.BUSY });

      if (success) {
         status = STATUS.SUCCESS;
         let updatedSite = { ...this.props.navigation.state.params.site };
         delete updatedSite.actionDate;
         this.props.updateOneSite(updatedSite);
      }

      this.setState({ status, playing: false });
      this.props.navigation.navigate("Complete", { success });
   };

   _getInfoText() {
      const { playing, status } = this.state;

      if (!this.state.audioAvailable) {
         return "You must enable recording privleges to speak a passphrase.";
      }

      if (playing) {
         return "Tap the microphone again to finish speaking.";
      }

      switch (status) {
         case STATUS.BUSY:
            return "Uploading passphrase for analysis...";
         case STATUS.ERROR:
            return "An error occurred. Please try again later.";
         default:
            return "Tap the microphone to begin speaking.";
      }
   }

   async _handleAudioUpload(info) {
      let formData = new FormData();
      const audioFile = {
         uri: info.uri,
         name: "audio.caf",
         type: "audio/x-caf"
      };

      formData.append("token", this.props.auth.token);
      formData.append("audio", audioFile);

      let res = await axios({
         url: api.buildURL("submit-phrase-audio"),
         method: "POST",
         data: formData,
         headers: {
            Accept: "application/json",
            "Content-Type": "multipart/form-data"
         }
      }).catch(err => {
         this.setState({ status: STATUS.ERROR });
      });

      res = res || {};
      return res.data && res.data.outcome === "successful";
   }

   render() {
      let iconName;
      let iconStyles = [styles.S__Icon];
      let iconOnPress;
      let IconComponent;

      switch (this.state.status) {
         case STATUS.BUSY:
            IconComponent = EIcon;
            iconName = "upload-to-cloud";
            iconStyles.push(styles.S__BusyIcon);
            break;
         case STATUS.ERROR:
            IconComponent = FIcon;
            iconName = "x";
            iconStyles.push(styles.S__ErrorIcon);
            break;
         default:
            IconComponent = EIcon;
            iconName = "mic";
            iconStyles.push(
               this.state.audioAvailable
                  ? styles.S__MicIcon
                  : styles.S__BusyIcon
            );
            iconOnPress = this._toggleAudio;
            break;
      }

      return (
         <View style={styles.S}>
            <TouchableOpacity style={iconStyles} onPress={iconOnPress}>
               <IconComponent name={iconName} color={colors.white} size={32} />
            </TouchableOpacity>
            <Text style={styles.S__Text}>{this._getInfoText()}</Text>
         </View>
      );
   }
}

function mapStateToProps(state) {
   return {
      auth: state.auth
   };
}

export default connect(mapStateToProps, {
   updateOneSite: site.updateOne
})(Speech);

const styles = StyleSheet.create({
   S: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: colors.white
   },
   S__Icon: {
      height: 100,
      width: 100,
      borderRadius: 50,
      alignItems: "center",
      justifyContent: "center"
   },
   S__MicIcon: {
      backgroundColor: colors.accent.default
   },
   S__BusyIcon: {
      backgroundColor: colors.grey.medium
   },
   S__ErrorIcon: {
      backgroundColor: colors.danger
   },
   S__Text: {
      fontSize: 16,
      marginTop: 20,
      textAlign: "center"
   }
});
