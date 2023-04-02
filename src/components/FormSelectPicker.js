import React, { useEffect } from 'react';
import RNPickerSelect from 'react-native-picker-select';
import { StyleSheet, View, Text } from 'react-native';
import { 
    primaryHexColor, 
    dangerHexColor, 
    formComponentBorder, 
    placeHolderColor, 
    fontColor,
    formComponentDisableBackground
  } from '../constants/themeColors';
import Icon from 'react-native-vector-icons/FontAwesome';

const FormSelectPicker = ({
    label,
    items,
    onValueChange,
    placeholder,
    disabled,
    value,
    errors,
    ...rest
}) => {

    return (
        <View style={styles.inputContainer}>
            {/* <Text
                style={styles.label}
            >{label}</Text> */}
            <View
                style={[styles.elementContainer, {
                    backgroundColor: typeof disabled !== 'undefined' && disabled === true ? formComponentDisableBackground : 'transparent'
                }]}
            >
                <RNPickerSelect
                    value={value}
                    placeholder={placeholder}
                    onValueChange={onValueChange}
                    disabled={typeof disabled !== 'undefined' && disabled === true ? true : false }
                    items={items}
                    style={pickerSelectStyles}
                    useNativeAndroidPickerStyle={false}
                    Icon={() => {
                        return <Icon 
                                    name="chevron-down" 
                                    size={14} 
                                    style={{
                                        marginRight: 15,
                                        marginTop: 10,
                                        color: formComponentBorder
                                    }}
                                />;
                    }}
                />
            </View>
            <Text
                style={styles.error}
            >{errors}</Text>
        </View>
        )
}

const styles = StyleSheet.create({
    inputContainer: {
        // marginBottom: 10
        marginHorizontal: 10
    },
    elementContainer: {
        borderWidth: 1,
        borderColor: formComponentBorder,
        borderRadius: 100,
        height: 40,
    },
    label: {
        // marginHorizontal: 10,
        fontSize: 12,
        color: primaryHexColor,
        fontWeight: "700",
        marginBottom: 2
    },
    error: {
        fontSize: 10,
        color: dangerHexColor,
        marginBottom: 2,
        marginLeft: 5
  }
})

const pickerSelectStyles = StyleSheet.create({
    placeholder: {
        color: placeHolderColor,
    },
    inputIOS: {
        fontSize: 13,
        paddingVertical: 12,
        // borderBottomWidth: 1,
        // borderBottomColor: primaryHexColor,
        borderBottomWidth: 0,
        borderTopWidth: 0,
        borderLeftWidth: 0,
        borderRightWidth: 0,
        color: fontColor,
        paddingRight: 26, // to ensure the text is never behind the icon
        paddingLeft: 15,
        backgroundColor: 'transparent',
        // marginHorizontal: 10,
    },
    inputAndroid: {
        fontSize: 13,
        paddingVertical: 8,
        // borderBottomWidth: 0.5,
        // borderBottomColor: primaryHexColor,
        borderBottomWidth: 0,
        borderTopWidth: 0,
        borderLeftWidth: 0,
        borderRightWidth: 0,
        color: fontColor,
        paddingRight: 26, // to ensure the text is never behind the icon
        marginLeft: 0,
        paddingLeft: 15,
        backgroundColor: 'transparent',
        // marginHorizontal: 10,
    },
});

export default FormSelectPicker