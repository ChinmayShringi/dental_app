import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  TouchableOpacity,
} from 'react-native';

export default class Sales extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.signupText}>Welcome to Sales</Text>
        <TouchableOpacity
          onPress={() => this.props.navigation.push('Salesdetail')}>
          <Text style={styles.signupText}>Sales Details</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#455a64',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  signupText: {
    color: 'rgba(255,255,255,0.6)',
    fontSize: 16,
  },
});
