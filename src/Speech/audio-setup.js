import { Audio, FileSystem } from "expo";

export default class AudioManager {
   constructor() {
      this._recording = null;
      this._initialized = false;
   }

   isInitialized() {
      return this._initialized;
   }

   init() {
      Audio.setAudioModeAsync({
         allowsRecordingIOS: true,
         playsInSilentModeIOS: true,
         shouldDuckAndroid: true,
         interruptionModeIOS: Audio.INTERRUPTION_MODE_IOS_DO_NOT_MIX,
         interruptionModeAndroid: Audio.INTERRUPTION_MODE_ANDROID_DO_NOT_MIX
      });
      this._initialized = true;
   }

   async begin() {
      console.log("BEGINNING AUDIO");
      this._recording = new Audio.Recording();
      try {
         const common = {
            sampleRate: 16e3,
            numberOfChannels: 1,
            bitRate: 128000
         };
         await this._recording.prepareToRecordAsync({
            android: {
               ...common,
               extension: ".m4a",
               outputFormat:
                  Audio._recording_OPTION_ANDROID_OUTPUT_FORMAT_MPEG_4,
               audioEncoder: Audio._recording_OPTION_ANDROID_AUDIO_ENCODER_AAC
            },
            ios: {
               ...common,
               extension: ".caf",
               audioQuality: Audio._recording_OPTION_IOS_AUDIO_QUALITY_MAX,
               linearPCMBitDepth: 16,
               linearPCMIsBigEndian: false,
               linearPCMIsFloat: false
            }
         });
         await this._recording.startAsync();
      } catch (error) {
         console.log(error);
      }
   }

   async end() {
      console.log("ENDING AUDIO");
      try {
         await this._recording.stopAndUnloadAsync();
      } catch (error) {
         console.log(error);
      }

      return await FileSystem.getInfoAsync(this._recording.getURI());
   }
}
