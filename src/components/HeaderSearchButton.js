import React from 'react';
import {TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const HeaderSearchButton = ({onPress, ...rest}) => (
  <TouchableOpacity
    {...rest}
    onPress={onPress}
    style={{
      margin: 15,
    }}>
    <Icon
      name="search"
      size={20}
      style={{
        color: '#333',
      }}
    />
  </TouchableOpacity>
);

export default HeaderSearchButton;
