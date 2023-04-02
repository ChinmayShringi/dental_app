import React from 'react';
import {StyleSheet, View} from 'react-native';
import {SearchBar} from 'react-native-elements';
import {fontColor, seperator, textMutedColor} from '../constants/themeColors';

import Icon from 'react-native-vector-icons/FontAwesome';

const ListingSearchBar = ({
  placeholder,
  onChangeText,
  onClear,
  value,
  showLoading,
  ...rest
}) => (
  <View style={{width: '100%', paddingHorizontal: 10, paddingBottom: 0}}>
    <SearchBar
      placeholder={
        typeof placeholder !== 'undefined' && placeholder !== ''
          ? placeholder
          : 'Type Here...'
      }
      placeholderTextColor={textMutedColor}
      onChangeText={onChangeText}
      onClear={onClear}
      value={value}
      containerStyle={styles.containerStyle}
      inputContainerStyle={styles.inputContainerStyle}
      searchIcon={() => <Icon name="search" size={18} color={fontColor} />}
      leftIconContainerStyle={{paddingLeft: 10}}
      inputStyle={styles.inputStyle}
      lightTheme={true}
      round={true}
      showLoading={showLoading}
    />
  </View>
);

const styles = StyleSheet.create({
  containerStyle: {
    width: '100%',
    // backgroundColor: backgroundGrey,
    backgroundColor: 'transparent',
    padding: 0,
    paddingTop: 8,
    borderTopWidth: 0,
    paddingBottom: 15,
    marginBottom: 5,
  },
  inputContainerStyle: {
    borderRadius: 25,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderBottomWidth: 1,
    borderColor: seperator,
    height: 40,
  },
  inputStyle: {
    fontSize: 13,
    marginLeft: 0,
  },
});

export default ListingSearchBar;
