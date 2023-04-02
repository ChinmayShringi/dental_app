import React from 'react';
import { Input } from 'react-native-elements';
import { StyleSheet, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { 
  primaryHexColor, 
  dangerHexColor, 
  formComponentBorder, 
  placeHolderColor, 
  fontColor,
  textMutedColor,
  formComponentDisableBackground
} from '../constants/themeColors';

import Icon from 'react-native-vector-icons/FontAwesome';

const FormIconInput = ({
  iconName,
  iconColor,
  returnKeyType,
  keyboardType,
  name,
  placeholder,
  value,
  label,
  disabled,
  onBlur,
  errorMessage,
  ...rest
}) => (
  <View style={styles.inputContainer}>
    <Input
      {...rest}
      // leftIcon={<Icon name={iconName} size={16} color={textMutedColor} />}
      // leftIconContainerStyle={styles.iconStyle}
      placeholderTextColor={placeHolderColor}
      placeholder={placeholder}
      name={name}
      value={value}
      label={label}
      labelStyle={{ color: primaryHexColor, fontSize: 12, marginBottom: 2 }}
      disabled={typeof disabled !== 'undefined' && disabled === true ? true : false }
      keyboardType={typeof keyboardType !== 'undefined' ? keyboardType : "default" }
      style={styles.input}
      containerStyle={typeof containerStyle !== 'undefined'? containerStyle : { marginBottom: -4 } }
      inputContainerStyle={{ 
        borderColor: formComponentBorder, 
        borderWidth: 1, 
        height: 40,
        borderRadius: 100,
        backgroundColor: typeof disabled !== 'undefined' && disabled === true ? formComponentDisableBackground : 'transparent'
      }}
      // inputStyle={{ fontSize: 14, paddingHorizontal: 10, color: fontColor, paddingLeft: 6}}
      inputStyle={{ fontSize: 13, paddingHorizontal: 15, color: fontColor}}
      onBlur={onBlur}
      errorMessage={errorMessage}
      errorStyle={{marginLeft: 5, marginTop: 0, fontSize: 10, color: dangerHexColor}}
    />
  </View>
)

const styles = StyleSheet.create({
  inputContainer: {},
  iconStyle: {
    width: 20,
    alignItems: 'center',
    marginRight: 0,
    marginLeft: 10,
  }
})

export default FormIconInput