import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment';
import React, {useState} from 'react';
import {Platform, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {
  dangerHexColor,
  fontColor,
  formComponentBorder,
  formComponentDisableBackground,
  placeHolderColor,
  primaryHexColor,
} from '../constants/themeColors';

const FormTimePicker = ({
  label,
  value,
  errors,
  display,
  maximumDate,
  minimumDate,
  onChangeEvent,
  disabled,
  ...rest
}) => {
  let initialDate = new Date();
  if (value !== null) {
    initialDate = new Date(value);
  }
  const [date, setDate] = useState(initialDate);
  const [mode, setMode] = useState('time');
  const [show, setShow] = useState(false);

  const onChange = (event, selectedDate) => {
    setShow(Platform.OS === 'ios');

    if (event.type === 'set') {
      const currentDate = selectedDate || date;
      setDate(currentDate);
      onChangeEvent(moment(selectedDate));
    } else if (event.type === 'dismissed') {
      // console.log(date);
    }
  };

  const showMode = currentMode => {
    if (
      typeof disabled === 'undefined' ||
      (typeof disabled !== 'undefined' && !disabled)
    ) {
      setShow(true);
      setMode(currentMode);
    }
  };

  const showDatepicker = () => {
    showMode('time');
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
        ]}>
        <Text
          style={{
            fontSize: 13,
            fontWeight: 'bold',
            marginBottom: 0,
            position: 'absolute',
            left: 15,
            top: 5,
            color: fontColor,
            opacity: 0.9,
          }}>
          {label}
        </Text>
        <TouchableOpacity onPress={showDatepicker} style={styles.datePickerBtn}>
          <Text style={styles.datePickerText}>
            {value !== null ? (
              moment(value).format('HH:mm')
            ) : (
              <Text style={{color: placeHolderColor}}>HH:MM</Text>
            )}
          </Text>
        </TouchableOpacity>
        {show && (
          <DateTimePicker
            testID="dateTimePicker"
            timeZoneOffsetInMinutes={0}
            value={date}
            mode={mode}
            is24Hour={true}
            display="default"
            onChange={onChange}
          />
        )}
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
    flexDirection: 'column',
    height: 54,
    borderRadius: 16,
    paddingLeft: 4,
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
  buttonStyle: {
    borderRadius: 0,
    margin: 0,
    paddingHorizontal: 0,
    width: '100%',
    backgroundColor: 'transparent',
    justifyContent: 'flex-start',
  },
  datePickerBtn: {
    paddingTop: 10,
    paddingBottom: 8,
    paddingHorizontal: 10,
  },
  datePickerText: {
    fontSize: 13,
    color: fontColor,
    marginTop: 15,
  },
});

export default FormTimePicker;
