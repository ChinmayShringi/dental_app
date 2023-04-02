import React from 'react';
import { Button } from 'react-native-elements';

const FormButton = ({ title, buttonType, buttonColor, bgColor, color, ...rest }) => (
  <Button
    {...rest}
    type={buttonType}
    title={title}
    buttonStyle={{ borderColor: buttonColor, backgroundColor: bgColor, borderRadius: 20, margin: 8, marginTop: 5 }}
    titleStyle={{ color: color }}
  />
)

export default FormButton