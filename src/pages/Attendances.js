import React, {Component} from 'react';
import {View, ScrollView, Alert} from 'react-native';

import Api from '../provider/Api';
import Dataprovider from '../provider/Dataprovider';
import Loader from '../provider/Loader';

import {common} from '../assets/style';

import FormButton from '../components/FormButton';

import {primaryHexColor, textMutedColor} from '../constants/themeColors';

import {NavigationEvents} from 'react-navigation';

import {loggedInUserDetails} from '../redux/actions/loggedInUserDetails';
import {connect} from 'react-redux';

// import * as Permissions from 'expo-permissions';
// import * as Location from 'expo-location';

class Attendances extends Component {
  api = new Api();
  dataProvider = new Dataprovider();

  constructor(props) {
    super(props);
    this.state = {
      userattendance: null,
      hasattendancerecord: false,
      // loading: true,
      loading: false,
    };
  }

  componentDidMount() {
    // this.getPageData();
  }

  getPageData() {
    this.setState({loading: true});

    let options = {
      api: 'v_1/attendances/check-my-present-status',
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'multipart/form-data',
      },
      data: {},
      refreshOn401: true,
    };

    this.api.callPostApi(options).then(data => {
      this.setState({loading: false});

      if (data.status_code === 200) {
        let responseData = data.response.data;

        this.setState({
          userattendance: responseData.userattendance,
          hasattendancerecord: responseData.hasattendancerecord,
        });
      } else {
        let errormessage = null;
        if (
          typeof data.status_code !== 'undefined' &&
          data.status_code === 422
        ) {
          errormessage = data.response.data.message;
        }
        this.api.showErrorMessage(data.response.message, errormessage);
      }
    });
  }

  requestToMakeMePresent = () => {
    if (!this.state.hasattendancerecord) {
      (async () => {
        // let {status} = await Location.requestPermissionsAsync();
        // if (status === 'granted') {
        //   let location = await Location.getCurrentPositionAsync({});
        //   let latitude = location.coords.latitude;
        //   let longitude = location.coords.longitude;
        //   let accuracy = location.coords.accuracy;
        //   this.setState({loading: true});
        //   const formData = new FormData();
        //   formData.append('latitude', latitude);
        //   formData.append('longitude', longitude);
        //   formData.append('accuracy', accuracy);
        //   let options = {
        //     api: 'v_1/attendances/make-me-present',
        //     method: 'POST',
        //     headers: {
        //       Accept: 'application/json',
        //       'Content-Type': 'multipart/form-data',
        //     },
        //     data: formData,
        //     refreshOn401: true,
        //   };
        //   this.api.callPostApi(options).then(data => {
        //     this.setState({loading: false});
        //     if (data.status_code === 200) {
        //       let responseData = data.response.data;
        //       this.api.showSuccessMessage(data.response.message, null);
        //       this.setState({
        //         userattendance: responseData.userattendance,
        //         hasattendancerecord: responseData.hasattendancerecord,
        //       });
        //     } else {
        //       let errormessage = null;
        //       if (
        //         typeof data.status_code !== 'undefined' &&
        //         data.status_code === 422
        //       ) {
        //         errormessage = data.response.data.message;
        //       }
        //       this.api.showErrorMessage(data.response.message, errormessage);
        //     }
        //   });
        // } else {
        //   this.showLocationPermissionDeniedModal();
        // }
      })();
    } else {
      Alert.alert(
        'Attendance Submitted!',
        "Your today's attendance is already submitted.",
        [
          {
            text: 'Ok',
            onPress: () => {
              console.log('Ok Clicked');
            },
          },
        ],
        {cancelable: false},
      );
    }
  };

  showLocationPermissionDeniedModal = () => {
    Alert.alert(
      'Permission Denied!',
      'Need location permission access to get your current location, Please enable location permission.',
      [
        {
          text: 'Cancel',
          onPress: () => {
            this.makeUserLogout();
          },
          style: 'cancel',
        },
        {
          text: 'Ask Permission',
          onPress: () => {
            (async () => {
              // const {status, permissions} = await Permissions.askAsync(
              //   Permissions.LOCATION,
              // );
              // if (status === 'granted') {
              //   // Start tracking user location
              //   this.requestToMakeMePresent();
              // } else {
              //   // Restrict to put attendance
              //   this.showUnableToAccessLocationErrorMessage();
              // }
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

  render() {
    return (
      <View style={common.cardContainer}>
        <NavigationEvents onDidFocus={() => this.getPageData()} />
        <Loader loading={this.state.loading} />
        <ScrollView contentContainerStyle={{flexGrow: 1}}>
          <View style={[common.card, {margin: 0, borderRadius: 0}]}>
            <View style={{margin: -8, marginTop: 5}}>
              <FormButton
                buttonType="solid"
                onPress={this.requestToMakeMePresent}
                title="Make Me Present"
                buttonColor={
                  !this.state.hasattendancerecord
                    ? primaryHexColor
                    : textMutedColor
                }
                bgColor={
                  !this.state.hasattendancerecord
                    ? primaryHexColor
                    : textMutedColor
                }
                color="#ffffff"
              />
            </View>
          </View>
        </ScrollView>
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.loggedInUserDetailsReducer.user,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onUserUpdate: user => dispatch(loggedInUserDetails(user)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Attendances);
