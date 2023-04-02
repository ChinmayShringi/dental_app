import React, {Component} from 'react';
import {Image, Linking, Text, View} from 'react-native';

import Api from '../provider/Api';
import Dataprovider from '../provider/Dataprovider';

import {fontColor, primaryHexColor} from '../constants/themeColors';

import {connect} from 'react-redux';
import {DrawerNotificationBadgeCount} from '../redux/actions/DrawerNotificationBadgeCount';
import {loggedInUserDetails} from '../redux/actions/loggedInUserDetails';

var api = new Api();
var dataProvider = new Dataprovider();

class DrawerUserDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {};

    dataProvider.getData('user').then(data => {
      this.props.onUserUpdate(data);
    });

    let options = {
      api: 'v_1/get-badges-counts',
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'multipart/form-data',
      },
      data: {},
      refreshOn401: true,
    };

    api.callPostApi(options).then(data => {
      if (data.status_code === 200) {
        let responseData = data.response.data;
        this.props.onNotificationUpdateCount(
          parseInt(responseData.notificationcount),
        );
      } else {
        console.log('Failed to get badges count');
      }
    });
  }

  render() {
    return (
      <View>
        <View
          style={{
            backgroundColor: primaryHexColor,
            flex: 1,
            paddingTop: 40,
          }}>
          <View
            style={{
              marginBottom: -65,
              flex: 1,
              alignItems: 'center',
            }}>
            <Image
              style={{
                width: 120,
                height: 120,
                borderRadius: 100,
                margin: 'auto',
                // borderWidth: 1,
                // borderColor: seperator
              }}
              resizeMode={'cover'}
              source={
                this.props.user != null
                  ? {uri: this.props.user.imagefile}
                  : require('../images/placeholders/noimage-user.png')
              }
            />
          </View>
        </View>
        <View
          style={{
            paddingTop: 70,
            paddingBottom: 15,
            alignItems: 'center',
          }}>
          <Text
            style={{
              color: primaryHexColor,
              fontSize: 16,
              fontWeight: 'bold',
              marginVertical: 4,
              marginBottom: 0,
            }}
            numberOfLines={1}
            ellipsizeMode="tail">
            {this.props.user != null ? this.props.user.fullname : 'NA'}
          </Text>
          <Text
            style={{
              color: fontColor,
              fontSize: 12,
              fontWeight: 'bold',
            }}
            numberOfLines={1}
            ellipsizeMode="tail"
            onPress={() => Linking.openURL('mailto:' + this.props.user.email)}
            Google>
            {this.props.user != null ? this.props.user.email : 'NA'}
          </Text>
        </View>
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
    onNotificationUpdateCount: count =>
      dispatch(DrawerNotificationBadgeCount(count)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DrawerUserDetails);
