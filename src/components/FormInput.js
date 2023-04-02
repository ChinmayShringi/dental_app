import React from 'react';
import { Input } from 'react-native-elements';
import { StyleSheet, View } from 'react-native';
import { 
  primaryHexColor, 
  dangerHexColor, 
  formComponentBorder, 
  placeHolderColor, 
  fontColor,
  formComponentDisableBackground
} from '../constants/themeColors';

const FormInput = ({
  returnKeyType,
  keyboardType,
  name,
  placeholder,
  value,
  label,
  disabled,
  containerStyle,
  errorMessage,
  ...rest
}) => (
  <View style={styles.inputContainer}>
    <Input
      {...rest}
      placeholderTextColor={placeHolderColor}
      placeholder={placeholder}
      name={name}
      value={value}
      // label={label}
      // labelStyle={{ color: primaryHexColor, fontSize: 12, marginBottom: 2 }}
      style={styles.input}
      disabled={typeof disabled !== 'undefined' && disabled === true ? true : false }
      keyboardType={typeof keyboardType !== 'undefined' ? keyboardType : "default" }
      containerStyle={typeof containerStyle !== 'undefined'? containerStyle : { marginBottom: -4 } }
      inputContainerStyle={{ 
        borderColor: formComponentBorder, 
        borderWidth: 1, 
        height: 40,
        borderRadius: 100,
        backgroundColor: typeof disabled !== 'undefined' && disabled === true ? formComponentDisableBackground : 'transparent'
      }}
      inputStyle={{ fontSize: 13, paddingHorizontal: 15, color: fontColor}}
      errorMessage={errorMessage}
      errorStyle={{marginLeft: 5, marginTop: 0, fontSize: 10, color: dangerHexColor}}
    />
  </View>
)

const styles = StyleSheet.create({
  input: {}
})

export default FormInput