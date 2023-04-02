import React, {Component} from 'react';
import {StyleSheet} from 'react-native';

import Toast from 'react-native-easy-toast';

export default class Showmessage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      position: 'top',
      type: true,
      style: {},
    };
  }

  errorMessage(msg) {
    this.state = {
      type: false,
    };
    this.refs.toast.show(msg);
  }

  successMessage(msg) {
    this.state = {
      type: true,
    };
    this.refs.toast.show(msg);
  }

  render() {
    return (
      <Toast
        ref="toast"
        style={[!this.state.msgtype ? styles.error : styles.success]}
        position={this.state.position}
      />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  error: {
    backgroundColor: 'red',
  },
  success: {
    backgroundColor: 'green',
  },
});
