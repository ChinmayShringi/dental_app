import {Textarea} from 'native-base';
import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {
  dangerHexColor,
  formComponentBorder,
  formComponentDisableBackground,
  placeHolderColor,
  primaryHexColor,
} from '../constants/themeColors';

const FormTextArea = ({
  label,
  name,
  placeholder,
  onChangeText,
  value,
  rowSpan,
  disabled,
  errors,
  ...rest
}) => (
  <View style={styles.inputContainer}>
    <View
      style={[
        styles.elementContainer,
        {
          backgroundColor:
            typeof disabled !== 'undefined' && disabled === true
              ? formComponentDisableBackground
              : 'transparent',
        },
      ]}>
      <Textarea
        rowSpan={rowSpan}
        value={value}
        placeholder={placeholder}
        placeholderTextColor={placeHolderColor}
        onChangeText={onChangeText}
        style={{
          flex: 1,
          fontSize: 13,
          paddingLeft: 10,
          paddingRight: 10,
        }}
      />
    </View>
    <Text style={styles.error}>{errors}</Text>
  </View>
);

const styles = StyleSheet.create({
  inputContainer: {
    marginHorizontal: 10,
  },
  elementContainer: {
    borderWidth: 1,
    borderColor: formComponentBorder,
    flexDirection: 'row',
    paddingHorizontal: 5,
    borderRadius: 16,
  },
  label: {
    fontSize: 12,
    color: primaryHexColor,
    fontWeight: '700',
    marginBottom: 2,
  },
  error: {
    fontSize: 10,
    color: dangerHexColor,
    marginBottom: 2,
    marginLeft: 5,
  },
  containerStyle: {
    backgroundColor: 'transparent',
    borderWidth: 0,
    paddingVertical: 0,
    paddingHorizontal: 0,
    marginTop: 10,
    marginBottom: 8,
    marginLeft: 0,
    marginRight: 0,
  },
});

export default FormTextArea;
