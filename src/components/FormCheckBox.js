import React, {useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {CheckBox} from 'react-native-elements';
import {
  dangerHexColor,
  fontColor,
  formComponentBorder,
  formComponentDisableBackground,
  primaryHexColor,
  primaryPurpleHexColor,
} from '../constants/themeColors';

const FormCheckBox = ({
  label,
  options,
  onPress,
  disabled,
  value,
  errors,
  ...rest
}) => {
  const [isMultiLine, setIsMultiLine] = useState(false);

  const onLayout = event => {
    const {x, y, height, width} = event.nativeEvent.layout;
    if (height > 47) {
      setIsMultiLine(true);
    } else {
      setIsMultiLine(false);
    }
  };

  return (
    <View style={styles.inputContainer}>
      {/* <Text
                style={styles.label}
            >{label}</Text> */}
      <View
        style={[
          styles.elementContainer,
          {
            backgroundColor:
              typeof disabled !== 'undefined' && disabled === true
                ? formComponentDisableBackground
                : 'transparent',
          },
          isMultiLine
            ? styles.elementContainerBorderRadiusMultiLine
            : styles.elementContainerBorderRadiusSingleLine,
        ]}
        onLayout={onLayout}>
        <Text
          style={{
            fontSize: 13,
            fontWeight: 'bold',
            marginBottom: 0,
            position: 'absolute',
            left: 15,
            top: 5,
            // color: placeHolderColor
            color: fontColor,
            opacity: 0.9,
          }}>
          {label}
        </Text>
        {options.map((option, index) => {
          return (
            <CheckBox
              key={index}
              title={option.label}
              // checked={option.value == value ? true : false }
              checked={
                value.some(enclosure => option.value === enclosure)
                  ? true
                  : false
              }
              checkedIcon="check-square-o"
              uncheckedIcon="square-o"
              containerStyle={styles.containerStyle}
              checkedColor={primaryPurpleHexColor}
              size={14}
              textStyle={{
                fontSize: 13,
                fontWeight: 'normal',
                color: fontColor,
                marginLeft: 2,
                marginRight: 10,
                marginTop: -3,
              }}
              onPress={onPress.bind(this, option.value)}
            />
          );
        })}
      </View>
      <Text style={styles.error}>{errors}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    marginHorizontal: 10,
  },
  elementContainer: {
    borderWidth: 1,
    borderColor: formComponentBorder,
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 15,
    paddingVertical: 5,
    minHeight: 54,
    paddingTop: 30,
  },
  elementContainerBorderRadiusSingleLine: {
    borderRadius: 100,
  },
  elementContainerBorderRadiusMultiLine: {
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
    marginTop: 0,
    // marginBottom: 9,
    marginLeft: 0,
    marginRight: 0,
  },
});

export default FormCheckBox;
