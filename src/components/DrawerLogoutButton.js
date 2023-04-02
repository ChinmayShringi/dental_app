import React, {Component} from 'react';
import {Platform, StyleSheet, Text, TouchableOpacity, View} from 'react-native';

import Api from '../provider/Api';
import Dataprovider from '../provider/Dataprovider';

import {circleBgColor, fontColor} from '../constants/themeColors';

import {connect} from 'react-redux';
import {loggedInUserDetails} from '../redux/actions/loggedInUserDetails';

import Icon from 'react-native-vector-icons/FontAwesome';

import AnimatedEllipsis from 'react-native-animated-ellipsis';

var api = new Api();
var dataProvider = new Dataprovider();

import * as Location from 'expo-location';
import {locationTrackingProps} from '../constants/defaultValues';
const LOCATION_TASK_NAME = locationTrackingProps.LOCATION_TASK_NAME;

import LocationServicesDialogBox from 'react-native-android-location-services-dialog-box';

class DrawerLogoutButton extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
    };

    dataProvider.getData('user').then(data => {
      this.props.onUserUpdate(data);
    });
  }

  stopTracking = async () => {
    await Location.stopLocationUpdatesAsync(LOCATION_TASK_NAME);
    if (Platform.OS === 'android') {
      LocationServicesDialogBox.stopListener();
    }
  };

  render() {
    return (
      <TouchableOpacity
        style={styles.itemContainer}
        onPress={() => {
          if (!this.state.isLoading) {
            this.setState({
              isLoading: true,
            });
            let options = {
              api: 'v_1/logout',
              method: 'GET',
              headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
              },
              data: {},
              refreshOn401: true,
            };

            api.callPostApi(options).then(responseData => {
              // Customer
              if (
                this.props.user.usertype === 4 ||
                this.props.user.usertype === '4'
              ) {
              }
              // Users
              else {
                // Sales User
                if (this.props.user.appusertype === 5) {
                  if (!this.props.user.isdepartmenthead) {
                    this.stopTracking();
                  }
                }
              }

              if (responseData.status_code === 200) {
                dataProvider.deleteData('user').then(() => {
                  this.props.onUserUpdate(null);
                  dataProvider.deleteData('token').then(() => {
                    dataProvider.deleteData('deviceToken').then(() => {
                      dataProvider.deleteLocationCoordinates().then(() => {
                        this.props.navigation.navigate('Login');
                      });
                    });
                  });
                });
              } else {
                dataProvider.deleteData('user').then(() => {
                  this.props.onUserUpdate(null);
                  dataProvider.deleteData('token').then(() => {
                    dataProvider.deleteData('deviceToken').then(() => {
                      dataProvider.deleteLocationCoordinates().then(() => {
                        this.props.navigation.navigate('Login');
                      });
                    });
                  });
                });
              }
            });
          }
        }}>
        <View style={{justifyContent: 'flex-start'}}>
          {!this.state.isLoading ? (
            <Text style={styles.iconContainer}>
              <Icon size={20} name="circle" style={{color: circleBgColor}} />
            </Text>
          ) : (
            <Text style={[styles.iconContainer, {opacity: 0.4}]}>
              <Icon size={20} name="circle" style={{color: circleBgColor}} />
            </Text>
          )}
        </View>
        {!this.state.isLoading ? (
          <View style={{justifyContent: 'flex-start'}}>
            <Text style={styles.textStyle}>Logout</Text>
          </View>
        ) : (
          <View
            style={{
              justifyContent: 'flex-start',
              flexDirection: 'row',
              opacity: 0.4,
            }}>
            <Text style={[styles.textStyle, {marginRight: 0}]}>
              Logging Out
            </Text>
            <View style={{marginRight: 12}}>
              <AnimatedEllipsis
                style={{
                  marginTop: 8,
                  marginBottom: 8,
                  marginRight: 0,
                  fontSize: 18,
                  fontWeight: 'bold',
                  opacity: 0.92,
                }}
              />
            </View>
          </View>
        )}
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  itemContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  iconContainer: {
    marginLeft: 20,
    marginRight: 20,
    opacity: 0.62,
    marginVertical: 8,
  },
  textStyle: {
    marginVertical: 8,
    color: fontColor,
    fontWeight: 'bold',
    fontSize: 14,
    // opacity: 0.92,
    textTransform: 'uppercase',
  },
});

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

export default connect(mapStateToProps, mapDispatchToProps)(DrawerLogoutButton);
