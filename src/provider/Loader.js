import React from 'react';
import {StyleSheet, View, ActivityIndicator} from 'react-native';

import {primaryHexColor} from '../constants/themeColors';

const Loader = props => {
  const {loading} = props;

  if (loading) {
    return (
      <View style={styles.loadView}>
        <ActivityIndicator
          animating={loading}
          size="large"
          color={primaryHexColor}
        />
      </View>
    );
  } else {
    return null;
  }
};

const styles = StyleSheet.create({
  loadView: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    flex: 1,
    justifyContent: 'center',
    paddingTop: 30,
    backgroundColor: '#00000040',
    padding: 8,
    zIndex: 10,
  },
});

export default Loader;
