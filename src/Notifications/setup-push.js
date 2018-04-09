import { Permissions, Notifications } from "expo";

export async function registerForPushNotificationsAsync() {
   let { status: existingStatus } = await Permissions.getAsync(
      Permissions.NOTIFICATIONS
   );
   let finalStatus = existingStatus;

   if (finalStatus !== "granted") {
      let { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
      finalStatus = status;
   }

   if (finalStatus !== "granted") {
      return;
   }

   let pushToken = await Notifications.getExpoPushTokenAsync();

   return pushToken;
}
