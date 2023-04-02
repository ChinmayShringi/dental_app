import React, {Component} from 'react';
import {
  View,
  Text,
  Image,
  ImageBackground,
  Button,
  StyleSheet,
} from 'react-native';

import Dataprovider from '../provider/Dataprovider';
import Api from '../provider/Api';

import {primaryBlueHexColor, primaryHexColor} from '../constants/themeColors';

import {loggedInUserDetails} from '../redux/actions/loggedInUserDetails';
import {connect} from 'react-redux';

var api = new Api();
var dataProvider = new Dataprovider();

class DrawerUserDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {};

    dataProvider.getData('user').then(data => {
      this.props.onUserUpdate(data);
    });
  }

  render() {
    return (
      <ImageBackground
        source={require('../images/login-balloon.jpg')}
        style={{width: undefined, padding: 16, paddingTop: 32}}>
        <View style={{alignItems: 'center'}}>
          <Image
            style={styles.profileImage}
            source={
              this.props.user != null
                ? {uri: this.props.user.imagefile}
                : require('../images/placeholders/noimage-user.png')
            }
          />
        </View>
        <Text style={styles.name}>
          {this.props.user != null ? this.props.user.fullname : 'NA'}
        </Text>
        <Text style={styles.email}>
          {this.props.user != null ? this.props.user.email : 'NA'}
        </Text>

        <View style={styles.UserBtnContainerBlock}>
          <View style={styles.UserBtnContainer}>
            <Button
              title="Edit Profile"
              color={primaryBlueHexColor}
              onPress={() => this.props.navigation.navigate('EditProfile')}
            />
          </View>
          <View style={styles.UserBtnContainer}>
            <Button
              title="Log Out"
              color={primaryHexColor}
              onPress={() => {
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
                  if (responseData.status_code === 200) {
                    dataProvider.deleteData('user').then(() => {
                      this.props.onUserUpdate(null);
                      dataProvider.deleteData('token').then(() => {
                        this.props.navigation.navigate('Login');
                      });
                    });
                  } else {
                    dataProvider.deleteData('user').then(() => {
                      this.props.onUserUpdate(null);
                      dataProvider.deleteData('token').then(() => {
                        this.props.navigation.navigate('Login');
                      });
                    });
                  }
                });
              }}
            />
          </View>
        </View>
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 3,
    borderColor: '#fff',
    margin: 'auto',
  },
  name: {
    color: '#fff',
    fontSize: 20,
    fontWeight: '800',
    borderRadius: 40,
    marginVertical: 8,
    marginBottom: 0,
    textAlign: 'center',
  },
  email: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '800',
    borderRadius: 40,
    marginTop: 4,
    marginBottom: 8,
    textAlign: 'center',
  },
  UserBtnContainerBlock: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 6,
  },
  UserBtnContainer: {
    flex: 1,
    marginHorizontal: 5,
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

export default connect(mapStateToProps, mapDispatchToProps)(DrawerUserDetails);
