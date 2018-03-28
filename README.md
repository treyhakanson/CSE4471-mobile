# CSE 4471 Mobile Application

## Overview

The mobile application for the CSE 4471 project. The most recent publish of the Expo application can be found here:

[https://exp.host/@treyhakanson/cse4471-project](https://exp.host/@treyhakanson/cse4471-project)

The above will be updated periodically, but the link will not change.

## Setup

Prerequisites:

1. Install [Node.js](https://nodejs.org/en/)
2. Install [Yarn](https://yarnpkg.com/en/)

Do one of the following:

* (**Recommended**) Install the [Expo App](https://expo.io/) on your phone
* Install [XCode](https://developer.apple.com/xcode/downloads/) (Mac only, provides iOS simulators)
* Install [Geny Motion](https://www.genymotion.com/) (Mac or Windows, provides Android simulators)

Run the following command:

```sh
yarn install
```

Once this is complete, you're ready to run the project

## Running

To start the project packager, run the following command:

```sh
yarn start
```

Now, following the corresponding set of instructions, based on which option you installed earlier:

* **Expo App:** Scan the QR Code with the expo app, and you're ready to go
* **XCode:** Press the `i` key in the command line to start the iOS simulator
* **Geny Motion:** Start the Geny Motion program, and run one of the simulators. You may need to create one. Then, return to the terminal and hit the `a` key to send the app over.

No matter which method you choose, the application will auto-reload upon changing any files.

**IMPORTANT:** Expo requires that your phone is on the same network as your computer. This does not work on OSU Wireless, since even though the network name is the same, the IP is dynamic and changing. When working on OSU Wireless, you'll need to use on of the simulator options.
