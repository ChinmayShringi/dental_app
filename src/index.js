import React from 'react';
import {Root} from 'native-base';
import {View, StyleSheet, Platform, StatusBar, Alert} from 'react-native';
import {createRootNavigator} from './routes';
import {isSignedIn} from './auth';

import Loader from './provider/Loader';
import Api from './provider/Api';
import Dataprovider from './provider/Dataprovider';
import FlashMessage from 'react-native-flash-message';

import {backgroundGrey} from './constants/themeColors';

import Modal from 'react-native-modal';
import NoNetwork from './components/NoNetwork';
// import {MaterialIcons} from '@expo/vector-icons';

import {Provider} from 'react-redux';
import {createStore} from 'redux';
import allReducers from './redux/stores/stores';

const store = createStore(allReducers);

import NetInfo from '@react-native-community/netinfo';
import SplashScreen from 'react-native-splash-screen';

// import {fcmService} from './provider/FCMService';

// import * as Location from 'expo-location';
// import * as TaskManager from 'expo-task-manager';
import {locationTrackingProps} from './constants/defaultValues';
const LOCATION_TASK_NAME = locationTrackingProps.LOCATION_TASK_NAME;
import LocationServicesDialogBox from 'react-native-android-location-services-dialog-box';

import {DeviceEventEmitter} from 'react-native';

import moment from 'moment';

var api = new Api();
var dataProvider = new Dataprovider();

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      signedIn: false,
      checkedSignIn: false,
      userType: null,
      appUserType: null,
      isDepartmentHead: false,
      isAppHasNetwork: false,
      isUpdatingCoordinatesOnServer: false,
      isLoggingOut: false,
    };

    StatusBar.setBarStyle('dark-content');
    // if (Platform.OS === "android") {
    //   StatusBar.setBackgroundColor("rgba(0,0,0,0)");
    //   StatusBar.setTranslucent(true);
    // }

    this.onRegister = this.onRegister.bind(this);
  }

  componentDidMount() {
    dataProvider.getData('user').then(loggedInUser => {
      // USER IS LOGGED IN
      if (loggedInUser !== null) {
        // CHECK IN AND CHECKOUT TIMES ADDED
        if (
          loggedInUser.checkintime !== null &&
          loggedInUser.checkintime !== '' &&
          loggedInUser.checkouttime !== null &&
          loggedInUser.checkouttime !== ''
        ) {
          var checkInTimeObj = moment(loggedInUser.checkintime, 'H:mm:ss');
          var checkOutTimeObj = moment(loggedInUser.checkouttime, 'H:mm:ss');
          var currentDateTime = moment();
          var currentDate = moment().format('YYYY-MM-DD');

          // CHECKIN TIME IS BEFORE CHECKOUT AS PER 24 HOUR FORMAT
          if (checkInTimeObj.isBefore(checkOutTimeObj)) {
            var checkOutDateTime = moment(
              currentDate + ' ' + loggedInUser.checkouttime,
              'YYYY-MM-DD H:mm:ss',
            );
            if (checkOutDateTime.isBefore(currentDateTime)) {
              this.makeUserLogout(loggedInUser);
            }
          }
          // CHECKOUT TIME IS BEFORE CHECKIN AS PER 24 HOUR FORMAT
          else {
            var lastLoginAt = moment(
              loggedInUser.lastlogin_at,
              'YYYY-MM-DD H:mm:ss',
            );

            // LOGGED IN TODAY
            if (currentDateTime.isSame(lastLoginAt, 'day')) {
              // NO NEED TO MAKE USER LOGOUT
            }
            // LOGGED IN BEFORE TODAY
            else {
              var logOutDateTime = moment(
                lastLoginAt.format('YYYY-MM-DD') +
                  ' ' +
                  loggedInUser.checkouttime,
                'YYYY-MM-DD H:mm:ss',
              ).add(1, 'days');
              if (logOutDateTime.isBefore(currentDateTime)) {
                this.makeUserLogout(loggedInUser);
              }
            }
          }
        }
      }
    });

    // WILL LISTEN EVENT WHEN DEVICE NETWORK GETS CHANGED
    NetInfo.addEventListener(state => {
      this.setState({
        isAppHasNetwork: state.isConnected,
      });

      // Connected to the internet
      if (state.isConnected) {
        // SIGEN IN
        // USER
        // SALES USER
        if (
          this.state.signedIn &&
          this.state.userType !== null &&
          (this.state.userType === 3 || this.state.userType === '3') &&
          this.state.appUserType !== null &&
          (this.state.appUserType === 5 || this.state.appUserType === '5')
        ) {
          setTimeout(() => {
            this.updateCoordinatesOnServer();
          }, 3000);
        }
      }
    });

    if (Platform.OS === 'android') {
      DeviceEventEmitter.addListener(
        'locationProviderStatusChange',
        function (status) {
          // only trigger when "providerListener" is enabled
          // console.log('locationProviderStatusChange');
          // console.log(status.enabled); //  status => {enabled: false, status: "disabled"} or {enabled: true, status: "enabled"}
          if (!status.enabled) {
            Alert.alert(
              'Please enable Location Services',
              'You currently have all Location Services for this device or application disabled. Please enable them in Settings.',
              [
                {
                  text: 'Ok',
                  onPress: () => {
                    console.log('OK Pressed!');
                  },
                },
              ],
              {cancelable: false},
            );
          }
        },
      );
    }

    this.prepareResources();
  }

  makeUserLogout = loggedInUser => {
    this.setState({isLoggingOut: true});
    api
      .callPostApi({
        api: 'v_1/logout',
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        data: {},
        refreshOn401: true,
      })
      .then(responseData => {
        // USER
        if (loggedInUser.usertype === 3 || loggedInUser.usertype === '3') {
          // Sales User
          if (loggedInUser.appusertype === 5) {
            if (!loggedInUser.isdepartmenthead) {
              (async () => {
                // await Location.stopLocationUpdatesAsync(LOCATION_TASK_NAME);
                if (Platform.OS === 'android') {
                  LocationServicesDialogBox.stopListener();
                }
              })();
            }
          }
        }

        if (responseData.status_code === 200) {
        } else {
        }

        dataProvider.deleteData('user').then(() => {
          dataProvider.deleteData('token').then(() => {
            dataProvider.deleteData('deviceToken').then(() => {
              dataProvider.deleteLocationCoordinates().then(() => {
                this.setState({
                  signedIn: false,
                  checkedSignIn: true,
                  userType: null,
                  appUserType: null,
                  isDepartmentHead: false,
                  isLoggingOut: false,
                });
              });
            });
          });
        });
      });
  };

  prepareResources = async () => {
    await isSignedIn()
      .then(res => {
        this.setState({
          signedIn: res.status,
          userType: res.userType,
          appUserType: res.appUserType,
          isDepartmentHead: res.isDepartmentHead,
          checkedSignIn: true,
        });
      })
      .catch(() => alert('An error occurred'));

    if (Platform.OS === 'ios' || Platform.OS === 'android') {
      await NetInfo.fetch().then(state => {
        this.setState({
          isAppHasNetwork: state.isConnected,
        });
      });

      // REGISTER FOR FCM(PUSH NOTIFICATIONS)
      // await fcmService.register(
      //   this.onRegister,
      //   this.onNotification,
      //   this.onOpenNotification,
      // );
    } else {
      this.setState({isAppHasNetwork: false});
      this.hideSplashScreen(true);
    }
  };

  toggleNetworkModal = () => {
    this.setState({isAppHasNetwork: !this.state.isAppHasNetwork});
  };

  onRegister(token) {
    console.log('[NotificationFCM] onRegister: ', token);

    dataProvider.getData('deviceToken').then(deviceToken => {
      // USER IS LOGGED IN
      if (this.state.signedIn) {
        // Device token in NULL in local storage
        if (deviceToken === null) {
          this.updateDeviceTokenOnServer(token);
        }
        // Device token NOT NULL in local storage
        else {
          // Device token got refreshed
          if (deviceToken !== token) {
            this.updateDeviceTokenOnServer(token);
          } else {
            this.hideSplashScreen(true);
          }
        }
      }
      // USER NOT LOGGED IN
      else {
        // Update device token in local storage
        dataProvider.saveData('deviceToken', token).then(() => {
          console.log('deviceToken updated in local storage.');
          this.hideSplashScreen(true);
        });
      }
    });
  }

  onNotification(notify) {
    console.log('[NotificationFCM] onNotification: ', notify);

    // For Android
    // const channelObj = {
    //   channelId: 'SampleChannelID',
    //   channelName: 'SampleChannelName',
    //   channelDes: 'SampleChannelDes',
    // };
    // const channel = fcmService.buildChannel(channelObj);

    // const buildNotify = {
    //   dataId: notify._notificationId,
    //   title: notify._title,
    //   content: notify._body,
    //   sound: 'default',
    //   channel: channel,
    //   data: {},
    //   colorBgIcon: '#1A243B',
    //   largeIcon: 'ic_launcher',
    //   smallIcon: 'ic_action_name',
    //   vibrate: true,
    // };

    // const notification = fcmService.buildNotification(buildNotify);
    // fcmService.displayNotification(notification);
  }

  onOpenNotification(notify) {
    console.log('[NotificationFCM] onOpenNotification: ', notify);
  }

  updateDeviceTokenOnServer = deviceToken => {
    if (deviceToken !== null) {
      // Update device token in local storage
      dataProvider.saveData('deviceToken', deviceToken).then(() => {
        const formData = new FormData();
        formData.append('devicetoken', deviceToken);

        let options = {
          api: 'v_1/update-devicetoken',
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'multipart/form-data',
          },
          data: formData,
          refreshOn401: true,
        };

        api.callPostApi(options).then(responseData => {
          this.hideSplashScreen(false);

          if (responseData.status_code === 200) {
            console.log('Device token updated on server');
          } else {
            dataProvider.deleteData('deviceToken').then(() => {
              console.log('Failed to update device token');
            });
          }
        });
      });
    } else {
      this.hideSplashScreen(true);
    }
  };

  hideSplashScreen = isSetTimeout => {
    if (isSetTimeout) {
      setTimeout(() => {
        SplashScreen.hide();
      }, 2000);
    } else {
      SplashScreen.hide();
    }
  };

  updateCoordinatesOnServer = () => {
    if (
      this.state.isAppHasNetwork &&
      !this.state.isUpdatingCoordinatesOnServer
    ) {
      this.setState({isUpdatingCoordinatesOnServer: true});

      dataProvider.getLocationCoordinates().then(data => {
        if (data !== null) {
          const formData = new FormData();
          formData.append('coordinatesobject', JSON.stringify(data));

          let options = {
            api: 'v_1/location-tracking/add-locations-object',
            method: 'POST',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'multipart/form-data',
            },
            data: formData,
            refreshOn401: true,
          };

          api.callPostApi(options).then(responseData => {
            this.setState({isUpdatingCoordinatesOnServer: false});
            if (responseData.status_code === 200) {
              // api.showSuccessMessage(responseData.response.message, null);
              // console.log(responseData.response.message);
              dataProvider.deleteLocationCoordinates().then(() => {
                console.log('Coordinates deleted from local storage');
              });
            } else {
              // let errormessage = null;
              // if(typeof responseData.status_code !== 'undefined' && responseData.status_code === 422) {
              //     errormessage = responseData.response.data.message;
              // }
              // api.showErrorMessage(responseData.response.message, errormessage);
            }
          });
        }
      });
    }
  };

  render() {
    const {
      checkedSignIn,
      signedIn,
      userType,
      appUserType,
      isDepartmentHead,
      isLoggingOut,
    } = this.state;
    // console.log("checkedSignIn---" + checkedSignIn);

    // If we haven't checked AsyncStorage yet, don't render anything (better ways to do this)
    if (!checkedSignIn) {
      return null;
    }

    if (isLoggingOut) {
      return <Loader loading={this.state.isLoggingOut} />;
    }

    const Layout = createRootNavigator(
      signedIn,
      userType,
      appUserType,
      isDepartmentHead,
    );
    return (
      <Provider store={store}>
        <Root style={{flex: 1}}>
          <View style={styles.container}>
            <Layout />

            <Modal
              isVisible={!this.state.isAppHasNetwork}
              onBackButtonPress={this.toggleNetworkModal}
              backdropOpacity={0.5}
              style={styles.modalContainer}
              animationInTiming={500}
              animationOutTiming={500}>
              <View style={styles.modalBody}>
                {/* <MaterialIcons
                  name="close"
                  size={28}
                  style={styles.closeButton}
                  onPress={this.toggleNetworkModal}
                /> */}
                <View style={styles.bodyContent}>
                  <NoNetwork />
                </View>
              </View>
            </Modal>

            {/* GLOBAL FLASH MESSAGE COMPONENT INSTANCE */}
            <FlashMessage position="top" animated={true} />
          </View>
        </Root>
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    ...Platform.select({
      android: {
        marginTop: StatusBar.currentHeight,
      },
    }),
  },
  modalContainer: {
    margin: 15,
    backgroundColor: backgroundGrey,
    // ...Platform.select({
    //     android: {
    //         marginTop: StatusBar.currentHeight
    //     }
    // }),
    position: 'relative',
    borderRadius: 10,
  },
  modalBody: {
    flex: 1,
    backgroundColor: backgroundGrey,
    position: 'relative',
    borderRadius: 10,
  },
  bodyContent: {
    backgroundColor: backgroundGrey,
    flex: 1,
    borderRadius: 10,
  },
  closeButton: {
    // position: 'absolute',
    // top: 0,
    // right: 0
    textAlign: 'right',
  },
});

// TaskManager.defineTask(LOCATION_TASK_NAME, ({data, error}) => {
//   if (error) {
//     // console.log(error);
//     return;
//   }
//   if (data) {
//     const {locations} = data;

//     let latitude = locations[0].coords.latitude;
//     let longitude = locations[0].coords.longitude;
//     let accuracy = locations[0].coords.accuracy;
//     let coordinates = {
//       latitude: latitude,
//       longitude: longitude,
//       accuracy: accuracy,
//     };

//     let coordinatesTest = {
//       latitude: latitude,
//       longitude: longitude,
//       accuracy: accuracy,
//       time: new Date(),
//     };

//     (async () => {
//       await NetInfo.fetch().then(state => {
//         // Connected with internet
//         if (state.isConnected) {
//           dataProvider
//             .getLocationCoordinates()
//             .then(coordinatesStoredInLocalStorage => {
//               var coordinatesobject =
//                 coordinatesStoredInLocalStorage === null ||
//                 coordinatesStoredInLocalStorage === 'null'
//                   ? []
//                   : coordinatesStoredInLocalStorage;

//               const formData = new FormData();
//               formData.append('latitude', latitude);
//               formData.append('longitude', longitude);
//               formData.append('accuracy', accuracy);
//               formData.append(
//                 'coordinatesobject',
//                 JSON.stringify(coordinatesobject),
//               );

//               let options = {
//                 api: 'v_1/location-tracking/add-location',
//                 method: 'POST',
//                 headers: {
//                   Accept: 'application/json',
//                   'Content-Type': 'multipart/form-data',
//                 },
//                 data: formData,
//                 refreshOn401: true,
//               };

//               api.callPostApi(options).then(responseData => {
//                 if (responseData.status_code === 200) {
//                   // api.showSuccessMessage(responseData.response.message, null);
//                   console.log(responseData.response.message);

//                   dataProvider.deleteLocationCoordinates().then(() => {
//                     console.log('Coordinates deleted from local storage');
//                   });

//                   coordinatesTest.message = 'updated on server';
//                   dataProvider.getLocationCoordinatesTest().then(dataTest => {
//                     let objTest = dataTest !== null ? dataTest : [];
//                     // console.log(objTest);
//                     objTest.push(coordinatesTest);
//                     dataProvider
//                       .saveLocationCoordinatesTest(objTest)
//                       .then(() => {
//                         console.log('Coordinates Test store in local storage');
//                       });
//                   });
//                 } else {
//                   dataProvider
//                     .getLocationCoordinates()
//                     .then(locationCordinate => {
//                       let obj =
//                         locationCordinate !== null ? locationCordinate : [];
//                       obj.push(coordinates);
//                       dataProvider.saveLocationCoordinates(obj).then(() => {
//                         console.log('Coordinates store in local storage');
//                       });
//                     });

//                   coordinatesTest.message = 'failed to update on server';
//                   dataProvider.getLocationCoordinatesTest().then(dataTest => {
//                     let objTest = dataTest !== null ? dataTest : [];
//                     objTest.push(coordinatesTest);
//                     dataProvider
//                       .saveLocationCoordinatesTest(objTest)
//                       .then(() => {
//                         console.log('Coordinates Test store in local storage');
//                       });
//                   });

//                   let errormessage = null;
//                   if (
//                     typeof responseData.status_code !== 'undefined' &&
//                     responseData.status_code === 422
//                   ) {
//                     errormessage = responseData.response.data.message;
//                   }
//                   api.showErrorMessage(
//                     responseData.response.message,
//                     errormessage,
//                   );
//                 }
//               });
//             });
//         }
//         // Not connected with internet
//         else {
//           dataProvider.getLocationCoordinates().then(locationCordinate => {
//             let obj = locationCordinate !== null ? locationCordinate : [];
//             obj.push(coordinates);
//             dataProvider.saveLocationCoordinates(obj).then(() => {
//               console.log('Coordinates store in local storage');
//             });
//           });

//           coordinatesTest.message = 'updated on local storage';
//           dataProvider.getLocationCoordinatesTest().then(dataTest => {
//             let objTest = dataTest !== null ? dataTest : [];
//             objTest.push(coordinatesTest);
//             dataProvider.saveLocationCoordinatesTest(objTest).then(() => {
//               console.log('Coordinates Test store in local storage');
//             });
//           });
//         }
//       });
//     })();
//   }
// });