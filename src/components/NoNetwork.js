import React, {Component} from 'react';
import {StyleSheet, Text, View} from 'react-native';

// import {MaterialIcons} from '@expo/vector-icons';
import {textMutedColor} from '../constants/themeColors';

export default class NoNetwork extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <View style={styles.container}>
        {/* <MaterialIcons
          name="cloud-off"
          size={130}
          style={{
            color: '#ff7972',
          }}
        /> */}
        <Text style={styles.errortTitle}>Whoops!</Text>
        <Text style={styles.errortDescription}>
          No internet connection found. Check your connection or try again
          later.
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 15,
  },
  imageCss: {
    width: 150,
    height: 150,
  },
  errorMessage: {
    textAlign: 'center',
    fontSize: 24,
    fontWeight: 'bold',
    fontStyle: 'italic',
    color: '#555',
  },
  errortTitle: {
    textAlign: 'center',
    fontSize: 22,
    fontWeight: '600',
    color: '#555',
    marginTop: 15,
  },
  errortDescription: {
    textAlign: 'center',
    fontSize: 16,
    color: textMutedColor,
  },
  reloadButtonContainer: {
    marginTop: 50,
  },
});
