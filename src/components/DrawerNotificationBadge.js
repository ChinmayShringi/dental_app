import React, {Component} from 'react';
import {Text} from 'react-native';

import {Badge,NativeBaseProvider } from 'native-base';

import {primaryHexColor} from '../constants/themeColors';

import {connect} from 'react-redux';
import {DrawerNotificationBadgeCount} from '../redux/actions/DrawerNotificationBadgeCount';

class DrawerNotificationBadge extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    if (this.props.count === 0) {
      return null;
    }
    return (
      <NativeBaseProvider>
      <Badge
        style={{
          height: 20,
          paddingTop: 1,
          paddingBottom: 2,
          marginRight: 5,
          backgroundColor: this.props.isMenuFocused ? '#fff' : primaryHexColor,
        }}>
        <Text
          style={{
            fontSize: 12,
            color: this.props.isMenuFocused ? primaryHexColor : '#fff',
          }}>
          {this.props.count}
        </Text>
      </Badge>
      </NativeBaseProvider>
    );
  }
}

const mapStateToProps = state => {
  return {
    count: state.DrawerNotificationBadgeCountReducer.count,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onNotificationUpdateCount: count =>
      dispatch(DrawerNotificationBadgeCount(count)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(DrawerNotificationBadge);
