import React, {Component} from 'react';
import {
  ImageBackground,
  Text,
  View,
  TouchableOpacity,
  Alert,
  Platform,
  KeyboardAvoidingView,
} from 'react-native';
import Logo from '../components/Logo';
import Api from '../provider/Api';
import Dataprovider from '../provider/Dataprovider';
// import { withNavigation } from 'react-navigation';
import Loader from '../provider/Loader';
import {login, common} from '../assets/style';

import {Formik} from 'formik';
import FormIconInput from '../components/FormIconInput';
import FormButton from '../components/FormButton';

import {primaryPurpleHexColor} from '../constants/themeColors';

import {loggedInUserDetails} from '../redux/actions/loggedInUserDetails';
import {DrawerNotificationBadgeCount} from '../redux/actions/DrawerNotificationBadgeCount';
import {connect} from 'react-redux';

import * as Permissions from 'expo-permissions';
//
import * as Location from 'expo-location';
// import { EventEmitter } from 'fbemitter';
import * as TaskManager from 'expo-task-manager';

import {locationTrackingProps} from '../constants/defaultValues';

const LOCATION_TASK_NAME = locationTrackingProps.LOCATION_TASK_NAME;
const taskEventName = locationTrackingProps.TASK_EVENT_NAME;
// const eventEmitter = new EventEmitter();

// import LocationServicesDialogBox from 'react-native-android-location-services-dialog-box';

var api = new Api();
var dataProvider = new Dataprovider();

class Login extends Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      loading: false,
      locationTrackingOptions: null,
    };

    this.validate = this.validate.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  showLocationPermissionDeniedModal = () => {
    Alert.alert(
      'Permission Denied!',
      'Need location permission access to track your daily activities of the places you visit, Please enable location permission.',
      [
        {
          text: 'Cancel',
          onPress: () => {
            this.makeUserLogout(
              'Location Permission Required!',
              'Please enable location permission to login in to the app.',
            );
          },
          style: 'cancel',
        },
        {
          text: 'Ask Permission',
          onPress: () => {
            (async () => {
              const {status, permissions} = await Permissions.askAsync(
                Permissions.LOCATION,
              );
              if (status === 'granted') {
                // Start tracking user location
                this.startTracking();
              } else {
                // Restrict Login
                this.makeUserLogout(
                  'Location Permission Required!',
                  'Please enable location permission to login in to the app.',
                );
              }
            })();
          },
        },
      ],
      {cancelable: false},
    );
  };

  startTracking = async () => {
    try {
        const {status, permissions} = await Permissions.askAsync(
        Permissions.LOCATION,
      );
      if (status === 'granted') {
      let checkGPSEnabled = {
        alreadyEnabled: true,
        enabled: true,
        status: 'enabled',
      };

      if (Platform.OS === 'android') {
        // checkGPSEnabled =
        //   await LocationServicesDialogBox.checkLocationServicesIsEnabled({
        //     message:
        //       '<h2>Use Location?</h2> \
        //     This app wants to change your device settings:<br/><br/>\
        //     Use GPS, Wi-Fi, and cell network for location<br/>',
        //     ok: 'YES',
        //     cancel: 'NO',
        //     style: {},
        //     enableHighAccuracy: true,
        //     showDialog: true,
        //     openLocationServices: true,
        //     preventOutSideTouch: true,
        //     preventBackClick: true,
        //     providerListener: true,
        //   }).catch(error => error);
      }

      if (typeof checkGPSEnabled === 'object' && checkGPSEnabled.enabled) {
        const {
          timeInterval,
          distanceInterval,
          deferredUpdatesInterval,
          deferredUpdatesDistance,
        } = this.state.locationTrackingOptions || {};

        await Location.startLocationUpdatesAsync(LOCATION_TASK_NAME, {
          accuracy: Location.Accuracy.BestForNavigation,
          timeInterval: timeInterval || 5000,
          distanceInterval: distanceInterval || 10,
          deferredUpdatesInterval: deferredUpdatesInterval || 5000,
          deferredUpdatesDistance: deferredUpdatesDistance || 10,
          showsBackgroundLocationIndicator: true,
          foregroundService: {
            notificationTitle: 'Location Tracker',
            notificationBody:
              'Your location is used to track your daily activities for the places you visit.',
          },
        });

        const isRegistered = await TaskManager.isTaskRegisteredAsync(
          LOCATION_TASK_NAME,
        );

        if (isRegistered) {
          
          this.props.navigation.navigate('SalesUserRoutes', { screen: 'SalesDashboard' });
        } else {
          this.makeUserLogout(
            'Some error occurred!',
            'Something went wrong with location tracking feature. Make sure all the settings are correct and try again.',
          );
        }
      } else {
        this.makeUserLogout(
          'Please enable Location Services',
          'You currently have all Location Services for this device or application disabled. Please enable them in Settings.',
        );
      }
    }
    // Location permission denied
    else {
      this.showLocationPermissionDeniedModal();
    }
    } catch (error) {
      console.error('Error starting location tracking:', error);
    }
  };
  makeUserLogout = (title:any, description:any) => {
    dataProvider.deleteData('user').then(() => {
      this.props.onUserUpdate(null);
      dataProvider.deleteData('token').then(() => {
        Alert.alert(
          title,
          description,
          [
            {
              text: 'Cancel',
              onPress: () => {
                console.log('Cancel Pressed!');
              },
              style: 'cancel',
            },
            {
              text: 'Ok',
              onPress: () => {
                console.log('OK Pressed!');
              },
            },
          ],
          {cancelable: false},
        );
      });
    });
  };

  handleSubmit = (values:any) => {
    setTimeout(() => {
      this.setState({loading: true});

      dataProvider.getData('deviceToken').then(deviceToken => {
        const formData = new FormData();
        formData.append(
          'email',
          typeof values.email === 'undefined' ? '' : values.email,
        );
        formData.append(
          'password',
          typeof values.password === 'undefined' ? '' : values.password,
        );
        formData.append('devicetoken', deviceToken !== null ? deviceToken : '');

        let options = {
          api: 'v_1/login',
          method: 'POST',
          headers: {
            Accept: 'application/json',
          },
          data: formData,
        };

        api.callApi(options).then(responseData => {
          if (responseData?.status_code === 200) {
            let data = responseData?.response.data;
            let loggedInUser = data.user;
            let locationTrackingOptions = data.locationTrackingOptions;
            let access_token = data.access_token;
            let notificationcount = data.notificationcount;

            this.setState({locationTrackingOptions: locationTrackingOptions});

            dataProvider.saveData('user', loggedInUser).then(() => {
              dataProvider.saveData('token', access_token).then(() => {
                this.props.onUserUpdate(loggedInUser);
                this.props.onNotificationUpdateCount(
                  parseInt(notificationcount),
                );
                // Customer
                if (
                  loggedInUser.usertype === 4 ||
                  loggedInUser.usertype === '4'
                ) {
                  this.props.navigation.navigate('CustomerDashboard');
                }
                // Users
                else {
                  // Admin QC User
                  if (loggedInUser.appusertype == 1) {
                    // Head of the Department
                    if (loggedInUser.isdepartmenthead) {
                      this.props.navigation.navigate('AdminQCHeadDashboard');
                    }
                    // Common Admin QC User
                    else {
                      this.props.navigation.navigate('AdminQCDashboard');
                    }
                  }
                  // Packaging User
                  else if (loggedInUser.appusertype == 2) {
                    // Head of the Department
                    if (loggedInUser.isdepartmenthead) {
                      this.props.navigation.navigate('PackagingHeadDashboard');
                    }
                    // Common Packaging User
                    else {
                      this.props.navigation.navigate('PackagingDashboard');
                    }
                  }
                  // Reception User
                  else if (loggedInUser.appusertype == 3) {
                    // Head of the Department
                    if (loggedInUser.isdepartmenthead) {
                      this.props.navigation.navigate('ProductionHeadDashboard');
                    }
                    // Common Production User
                    else {
                      this.props.navigation.navigate('ProductionDashboard');
                    }
                  }
                  // Reception User
                  else if (loggedInUser.appusertype == 4) {
                    // Head of the Department
                    if (loggedInUser.isdepartmenthead) {
                      this.props.navigation.navigate('ReceptionDashboard');
                    }
                    // Common Receptionists
                    else {
                      this.props.navigation.navigate('ReceptionDashboard');
                    }
                  }
                  // Sales User
                  else if (loggedInUser.appusertype === 5) {
                    // Head of the Department
                    if (loggedInUser.isdepartmenthead) {
                      this.props.navigation.navigate('SalesHeadUserRoutes');
                    }
                    // Common Sales Person
                    else {
                      this.startTracking();
                    }
                  }
                  // Supervisor User
                  else if (loggedInUser.appusertype == 6) {
                    // Head of the Department
                    if (loggedInUser.isdepartmenthead) {
                      this.props.navigation.navigate('SupervisorDashboard');
                    }
                    // Common Supervisor
                    else {
                      this.props.navigation.navigate('SupervisorDashboard');
                    }
                  } else {
                    this.props.navigation.navigate('Home');
                  }
                }
              });
            });

            dataProvider.saveData('user', loggedInUser).then(() => {
              dataProvider.saveData('token', access_token).then(() => {
                this.props.onUserUpdate(loggedInUser);
                this.props.onNotificationUpdateCount(
                  parseInt(notificationcount),
                );

                // Customer
                if (
                  loggedInUser.usertype === 4 ||
                  loggedInUser.usertype === '4'
                ) {
                  this.setState({loading: false});
                  this.props.navigation.navigate('CustomerDashboard');
                }
                // Users
                else {
                  (async () => {
                    this.setState({loading: true});
                    try {
                      const {status} = await Location.requestPermissionsAsync();

                      if (status !== 'granted') {
                        this.showLocationPermissionDeniedModal();
                        return;
                      }

                      const {coords} = await Location.getCurrentPositionAsync();
                      const {latitude, longitude, accuracy} = coords;

                      const formData = new FormData();
                      formData.append('latitude', latitude);
                      formData.append('longitude', longitude);
                      formData.append('accuracy', accuracy);

                      const options = {
                        api: 'v_1/attendances/checkin',
                        method: 'POST',
                        headers: {
                          Accept: 'application/json',
                          'Content-Type': 'multipart/form-data',
                        },
                        data: formData,
                        refreshOn401: true,
                      };

                      const {data} = await api.callPostApi(options);

                      if (data?.status_code === 200) {
                        let screenName = 'Home';

                        switch (loggedInUser.appusertype) {
                          case 1: // Admin QC User
                            screenName = loggedInUser.isdepartmenthead
                              ? 'AdminQCHeadDashboard'
                              : 'AdminQCDashboard';
                            break;
                          case 2: // Packaging User
                            screenName = loggedInUser.isdepartmenthead
                              ? 'PackagingHeadDashboard'
                              : 'PackagingDashboard';
                            break;
                          case 3: // Production User
                            screenName = loggedInUser.isdepartmenthead
                              ? 'ProductionHeadDashboard'
                              : 'ProductionDashboard';
                            break;
                          case 4: // Reception User
                            screenName = loggedInUser.isdepartmenthead
                              ? 'ReceptionDashboard'
                              : 'ReceptionDashboard';
                            break;
                          case 5: // Sales User
                            screenName = loggedInUser.isdepartmenthead
                              ? 'SalesHeadDashboard'
                              : 'SalesDashboard';
                            break;
                          case 6: // Supervisor User
                            screenName = loggedInUser.isdepartmenthead
                              ? 'SupervisorDashboard'
                              : 'SupervisorDashboard';
                            break;
                        }

                        if (
                          loggedInUser.appusertype === 5 &&
                          !loggedInUser.isdepartmenthead
                        ) {
                          this.startTracking();
                        } else {
                          this.props.navigation.navigate(screenName);
                        }
                      } else {
                        const errorMessage =
                          data?.status_code === 422
                            ? data?.response.data.message
                            : null;

                        api.showErrorMessage(
                          data?.response.message,
                          errorMessage,
                        );
                      }
                    } catch (error:any) {
                      console.error('Error during checkin:', error);
                      api.showErrorMessage(
                        'Error during checkin',
                        error.message,
                      );
                    } finally {
                      this.setState({loading: false});
                    }
                  })();
                }
              });
            });
          } else {
            this.setState({loading: false});
            let errormessage = null;
            if (
              typeof responseData?.status_code !== 'undefined' &&
              responseData?.status_code === 422
            ) {
              errormessage = responseData?.response.data.message;
            }
            api.showErrorMessage(responseData?.response.message, errormessage);
          }
        });
      });
    });
  };

  showLocationPermissionDeniedModalNotUsed = () => {
    Alert.alert(
      'Permission Denied!',
      'Need location permission access to get your current location, Please enable location permission.',
      [
        {
          text: 'Cancel',
          onPress: () => {
            this.makeUserLogout(
              'Location Permission Required!',
              'Please enable location permission to login in to the app.',
            );
          },
          style: 'cancel',
        },
        {
          text: 'Ask Permission',
          onPress: () => {
            (async () => {
              const {status, permissions} = await Permissions.askAsync(
                Permissions.LOCATION,
              );
              dataProvider.deleteData('user').then(() => {
                this.props.onUserUpdate(null);
                dataProvider.deleteData('token').then(() => {});
              });
              if (status === 'granted') {
              } else {
                // Restrict to put attendance
                this.showUnableToAccessLocationErrorMessage();
              }
            })();
          },
        },
      ],
      {cancelable: false},
    );
  };

  showUnableToAccessLocationErrorMessage = () => {
    Alert.alert(
      'Location Permission Required!',
      'Please enable location permission to make you present as we need your current location.',
      [
        {
          text: 'Cancel',
          onPress: () => {
            console.log('Cancel Pressed!');
          },
          style: 'cancel',
        },
        {
          text: 'Ok',
          onPress: () => {
            console.log('OK Pressed!');
          },
        },
      ],
      {cancelable: false},
    );
  };

  validate(values:any) {
    let errors:any = {};

    let emailValid = values.email.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
    if (!values.email) {
      errors.email = 'Please enter your email address.';
    } else if (!emailValid) {
      errors.email = 'Please enter a valid email address.';
    }

    if (!values.password) {
      errors.password = 'Please enter password.';
    }

    return errors;
  }

  render() {
    return (
      <KeyboardAvoidingView
        style={{flex: 1, flexDirection: 'column'}}
        behavior={Platform.OS == 'ios' ? 'padding' : 'padding'}
        enabled
        // keyboardVerticalOffset={Platform.OS == "ios" ? "40" : "0"}
        keyboardVerticalOffset={0}>
        <View style={common.container}>
          <ImageBackground
            source={require('../images/bg-images/bg-1.png')}
            style={login.imageBg}>
            <Loader loading={this.state.loading} />
            <View style={login.formwrap}>
              <Logo />
              {/* <Text style={[login.logoText, {}]}>Login</Text> */}
              <View style={{width: 260, marginTop: 30}}>
                <Formik
                  enableReinitialize={true}
                  validate={this.validate}
                  initialValues={{
                    email: '',
                    password: '',
                  }}
                  onSubmit={this.handleSubmit}>
                  {({
                    errors,
                    touched,
                    setFieldTouched,
                    handleChange,
                    values,
                    handleSubmit,
                  }) => (
                    <View>
                      <View
                        style={
                          {
                            // marginBottom: 5,
                          }
                        }>
                        <FormIconInput
                          name="email"
                          value={values.email}
                          onChangeText={handleChange('email')}
                          placeholder="Email"
                          autoCapitalize="none"
                          iconName="envelope"
                          onBlur={() => setFieldTouched('email')}
                          errorMessage={
                            errors.email && touched.email ? errors.email : null
                          }
                        />
                      </View>
                      <View
                        style={{
                          marginBottom: 5,
                        }}>
                        <FormIconInput
                          name="password"
                          value={values.password}
                          onChangeText={handleChange('password')}
                          placeholder="Password"
                          iconName="lock"
                          secureTextEntry
                          onBlur={() => setFieldTouched('password')}
                          errorMessage={
                            errors.password && touched.password
                              ? errors.password
                              : null
                          }
                        />
                      </View>
                      <View style={{}}>
                        <FormButton
                          buttonType="solid"
                          onPress={handleSubmit}
                          title="Log In"
                          buttonColor={primaryPurpleHexColor}
                          bgColor={primaryPurpleHexColor}
                          color="#ffffff"
                        />
                      </View>
                    </View>
                  )}
                </Formik>
                <View>
                  <TouchableOpacity
                    onPress={() => {
                      this.props.navigation.navigate('ForgotPassword');
                    }}>
                    <Text
                      style={[
                        {
                          fontSize: 12,
                          textAlign: 'center',
                          marginTop: 8,
                          marginBottom: 8,
                          // color: 'textMutedColor',
                        },
                      ]}>
                      Forgot your password?
                      <Text style={[common.linkText]}>&nbsp;Reset Now</Text>
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </ImageBackground>
        </View>
      </KeyboardAvoidingView>
    );
  }
}

const mapStateToProps = (state: any) => {
  return {
    user: state.loggedInUserDetailsReducer.user,
    notificationCount: state.DrawerNotificationBadgeCountReducer.count,
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    onUserUpdate: (user: any) => dispatch(loggedInUserDetails(user)),
    onNotificationUpdateCount: (count: any) =>
      dispatch(DrawerNotificationBadgeCount(count)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
