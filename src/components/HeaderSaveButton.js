import React from 'react';
import {Button} from 'react-native-elements';

const HeaderSaveButton = ({
  title,
  buttonType,
  buttonColor,
  bgColor,
  color,
  ...rest
}) => (
  <Button
    {...rest}
    type={buttonType}
    title={title}
    buttonStyle={{
      borderColor: buttonColor,
      backgroundColor: bgColor,
      borderRadius: 100,
      margin: 10,
      height: 30,
      paddingTop: 5,
      paddingHorizontal: 15,
    }}
    titleStyle={{
      color: color,
      paddingHorizontal: 4,
      fontSize: 15,
      fontWeight: '100',
    }}
  />
);

export default HeaderSaveButton;
