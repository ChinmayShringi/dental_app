// // // import firebase from 'react-native-firebase';
// // import firebase from '@react-native-firebase/messaging';
// // import type {Notification, NotificationOpen} from 'react-native-firebase';

// // class FCMService {
// //   register = (
// //     onRegister: any,
// //     onNotification: any,
// //     onOpenNotification: any,
// //   ) => {
// //     this.checkPermission(onRegister);
// //     this.createNotificationListeners(
// //       onRegister,
// //       onNotification,
// //       onOpenNotification,
// //     );
// //   };
// //   checkPermission = onRegister:any => {
// //     firebase
// //       .messaging()
// //       .hasPermission()
// //       .then((enabled):any => {
// //         // USER HAS PERMISSIONS
// //         if (enabled) {
// //           this.getToken(onRegister);
// //         }
// //         // USER DOESN'T HAVE PERMISSIONS
// //         else {
// //           this.requestPermission(onRegister);
// //         }
// //       })
// //       .catch(error => {
// //         console.log('Permission rejected ', error);
// //       });
// //   };
// //   getToken = onRegister => {
// //     firebase
// //       .messaging()
// //       .getToken()
// //       .then(fcmToken => {
// //         if (fcmToken) {
// //           onRegister(fcmToken);
// //         } else {
// //           console.log('User does not have device token');
// //         }
// //       })
// //       .catch(error => {
// //         console.log('getToken rejected ', error);
// //       });
// //   };
// //   requestPermission = onRegister => {
// //     firebase
// //       .messaging()
// //       .requestPermission()
// //       .then(() => {
// //         this.getToken(onRegister);
// //       })
// //       .catch(error => {
// //         console.log('Request Permission rejected ', error);
// //       });
// //   };
// //   deleteToken = () => {
// //     firebase
// //       .messaging()
// //       .deleteToken()
// //       .catch(error => {
// //         console.log('Delete token for ', error);
// //       });
// //   };
// //   createNotificationListeners = (
// //     onRegister,
// //     onNotification,
// //     onOpenNotification,
// //   ) => {
// //     // Triggered when a particular notification has been received in foreground
// //     this.notificationListener = firebase
// //       .notifications()
// //       .onNotification((notification: Notification) => {
// //         console.log('[FCMService] notificationListener: ', notification);
// //         onNotification(notification);
// //       });
// //     // If your app is in background, you can listen for when a notification
// //     // is clicked / tapped / opened as follows
// //     this.notificationOpenedListener = firebase
// //       .notifications()
// //       .onNotificationOpened((notificationOpen: NotificationOpen) => {
// //         console.log('[FCMService] onNotificationOpened: ', notificationOpen);
// //         if (notificationOpen) {
// //           const notification: Notification = notificationOpen.notification;
// //           onOpenNotification(notification);
// //           this.removeDeliveredNotification(notification);
// //         }
// //       });
// //     // If your app is closed, you can check if it was opened by a notification
// //     // being clicked / tapped / open as follows
// //     firebase
// //       .notifications()
// //       .getInitialNotification()
// //       .then(notificationOpen => {
// //         console.log('[FCMService] getInitialNotification: ', notificationOpen);
// //         if (notificationOpen) {
// //           const notification: Notification = notificationOpen.notification;
// //           onOpenNotification(notification);
// //           this.removeDeliveredNotification(notification);
// //         }
// //       });
// //     // Trigerred for data only payload in foreground
// //     this.messageListener = firebase.messaging().onMessage(message => {
// //       console.log('[FCMService] messageListener: ', message);
// //       onNotification(message);
// //     });
// //     // Trigerred when have new token
// //     this.onTokenRefreshListener = firebase
// //       .messaging()
// //       .onTokenRefresh(fcmToken => {
// //         console.log('New Token refresh: ', fcmToken);
// //         onRegister(fcmToken);
// //       });
// //   };
// //   unRegister = () => {
// //     this.notificationListener();
// //     this.notificationOpenedListener();
// //     this.messageListener();
// //     this.onTokenRefreshListener();
// //   };
// //   buildChannel = obj => {
// //     console.log('[FCMService] buildChannel: ', obj);
// //     return new firebase.notifications.Android.Channel(
// //       obj.channelId,
// //       obj.channelName,
// //       firebase.notifications.Android.Importance.High,
// //     ).setDescription(obj.channelDes);
// //   };
// //   buildNotification = obj => {
// //     console.log('[FCMService] buildNotification: ', obj);
// //     // For Android
// //     firebase.notifications().android.createChannel(obj.channel);
// //     // For Android and IOS
// //     return (
// //       new firebase.notifications.Notification()
// //         .setSound(obj.sound)
// //         .setNotificationId(obj.dataId)
// //         .setTitle(obj.title)
// //         .setBody(obj.content)
// //         .setData(obj.data)
// //         // For Android
// //         .android.setChannelId(obj.channel.channelId)
// //         .android.setLargeIcon(obj.largeIcon) // create this icon in android studio (app/res/mipmap)
// //         .android.setSmallIcon(obj.smallIcon) // create this icon in android studio (app/res/drawable)
// //         .android.setColor(obj.colorBgIcon)
// //         .android.setPriority(firebase.notifications.Android.Priority.High)
// //         .android.setVibrate(obj.vibrate)
// //     );
// //     // .android.setAutoCancel(true) // Auto cancel after receive notification
// //   };
// //   scheduleNotification = (notification, days, minutes) => {
// //     const date = new Date();
// //     if (days) {
// //       date.setDate(date.getDate() + days);
// //     }
// //     if (minutes) {
// //       date.setMinutes(date.getMinutes() + minutes);
// //     }
// //     firebase
// //       .notifications()
// //       .scheduleNotification(notification, {fireDate: date.getTime()});
// //   };
// //   displayNotification = notification => {
// //     console.log('[FCMService] displayNotification: ', notification);
// //     firebase
// //       .notifications()
// //       .displayNotification(notification)
// //       .catch(error => {
// //         console.log('Display Notification error: ', error);
// //       });
// //   };
// //   removeDeliveredNotification = notification => {
// //     firebase
// //       .notifications()
// //       .removeDeliveredNotification(notification.notificationId);
// //   };
// // }

// // export const fcmService = new FCMService();
// import firebase from '@react-native-firebase/app';
// import notifications from '@react-native-firebase/app';
// import messaging, {
//   FirebaseMessagingTypes,
// } from '@react-native-firebase/messaging';
// // import Notification from '@react-native-firebase/app';
// import Notification from '@react-native-firebase/messaging';
// // import Android from '@react-native-firebase/app';
// import {Platform} from 'react-native';
// const {Android} = messaging;

// // Initialize Firebase App
// firebase.initializeApp({
//   // Your Firebase Config
// });

// // Register FCM Token
// const register = async () => {
//   try {
//     await messaging().registerDeviceForRemoteMessages();
//     const fcmToken = await messaging().getToken();
//     console.log('FCM Token:', fcmToken);
//     return fcmToken;
//   } catch (error) {
//     console.log('Failed to register device for remote messages:', error);
//   }
// };

// // Check FCM Permission
// const checkPermission = async () => {
//   const enabled = await messaging().hasPermission();
//   if (enabled) {
//     console.log('FCM permission granted');
//     return true;
//   } else {
//     console.log('FCM permission not granted');
//     return false;
//   }
// };

// // Request FCM Permission
// const requestPermission = async () => {
//   try {
//     await messaging().requestPermission();
//     console.log('FCM permission granted');
//     return true;
//   } catch (error) {
//     console.log('FCM permission not granted:', error);
//     return false;
//   }
// };

// // Delete FCM Token
// const deleteToken = async () => {
//   try {
//     await messaging().deleteToken();
//     console.log('FCM Token deleted');
//   } catch (error) {
//     console.log('Failed to delete FCM Token:', error);
//   }
// };

// // Create Notification Listeners
// const createNotificationListeners = async () => {
//   // Foreground Notification Handler
//   messaging().onMessage(async (remoteMessage: any) => {
//     console.log('Foreground Notification:', remoteMessage);
//     // Display notification in foreground
//     displayNotification(remoteMessage);
//   });

//   // Background Notification Handler
//   messaging().setBackgroundMessageHandler(async (remoteMessage: any) => {
//     console.log('Background Notification:', remoteMessage);
//     // Schedule notification for display
//     scheduleNotification(remoteMessage);
//   });

//   // App Opened from Notification
//   messaging().onNotificationOpenedApp((remoteMessage: any) => {
//     console.log('App Opened from Notification:', remoteMessage);
//   });

//   // Notification Opened while App is Closed
//   messaging()
//     .getInitialNotification()
//     .then((remoteMessage: any) => {
//       if (remoteMessage) {
//         console.log(
//           'App Opened from Notification while closed:',
//           remoteMessage,
//         );
//       }
//     });
// };

// // Unregister Notification Listeners
// const unRegister = async () => {
//   try {
//     await messaging().deleteToken();
//     console.log('Device unregistered from FCM');
//   } catch (error) {
//     console.log('Error while unregistering device from FCM', error);
//   }
// };

// // Build Notification Channel
// const buildChannel = () => {
//   if (Platform.OS === 'android') {
//     const channel = new Android.Channel(
//       'default',
//       'Default Channel',
//       Android.Importance.High,
//     ).setDescription('Default Notification Channel');
//     (messaging() as any).android.createChannel(channel);
//   }
// };

// // Build Notification
// // const buildNotification = (remoteMessage: any) => {
// //   const notification = new firebase.notifications.Notification()
// //     .setNotificationId(remoteMessage.messageId)
// //     .setTitle(remoteMessage.notification.title)
// //     .setBody(remoteMessage.notification.body)
// //     .setData(remoteMessage.data)
// //     .android.setChannelId('default')
// //     .android.setSmallIcon('@drawable/ic_notification')
// //     .android.setPriority(firebase.notifications.Android.Priority.High);

// //   return notification;
// // };
// const buildNotification = (remoteMessage: any) => {
//   const notification: any = {
//     notificationId: remoteMessage.messageId,
//     title: remoteMessage.notification.title,
//     body: remoteMessage.notification.body,
//     data: remoteMessage.data,
//     android: {
//       channelId: 'default',
//       smallIcon: '@drawable/ic_notification',
//       priority: 'high',
//     },
//   };

//   if (Platform.OS === 'android') {
//     notification['android']['autoCancel'] = true;
//   }

//   return notification;
// };

// // Schedule Notification
// const scheduleNotification = async (remoteMessage: any) => {
//   const notification = buildNotification(remoteMessage);

//   const now = Date.now();
//   const schedule = new Date(now + 60000);

//   const message = {
//     notification: {
//       title: remoteMessage.notification.title,
//       body: remoteMessage.notification.body,
//     },
//     data: remoteMessage.data,
//     android: {
//       notification: {
//         channelId: 'default',
//         smallIcon: '@drawable/ic_notification',
//         priority: 'high',
//       },
//     },
//     sendTime: schedule.getTime(),
//   };

//   await messaging().scheduleMessage(message);
// };
// // Display Notification
// const displayNotification = async (remoteMessage: any) => {
//   const notification = buildNotification(remoteMessage);

//   await firebase.notifications().displayNotification(notification);
// };

// // Export Functions
// export default {
//   register,
//   checkPermission,
//   requestPermission,
//   deleteToken,
//   createNotificationListeners,
//   unRegister,
//   buildChannel,
//   buildNotification,
//   scheduleNotification,
//   displayNotification,
// };
