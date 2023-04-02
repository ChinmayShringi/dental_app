import React, {Component} from 'react';
import {StyleSheet, Text, View} from 'react-native';

export default class Home extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.signupText}>Welcome to Impression Lab</Text>
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
