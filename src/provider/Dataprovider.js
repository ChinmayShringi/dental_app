import {Component} from 'react';

import {AsyncStorage} from 'react-native';

export default class Dataprovider extends Component {
  constructor(props) {
    super(props);
  }

  saveData = async (key, val) => {
    try {
      await AsyncStorage.setItem(key, JSON.stringify(val));
      return true;
    } catch (error) {
      // Error retrieving data
      console.log(error.message);
      return false;
    }
  };

  getData = async key => {
    let data = '';
    try {
      data = (await AsyncStorage.getItem(key)) || null;
    } catch (error) {
      // Error retrieving data
      console.log(error.message);
    }
    return JSON.parse(data);
  };

  deleteData = async key => {
    try {
      await AsyncStorage.removeItem(key);
      return true;
    } catch (error) {
      // Error retrieving data
      console.log(error.message);
      return false;
    }
  };

  saveLocationCoordinates = async val => {
    try {
      await AsyncStorage.setItem('locationCoordinates', JSON.stringify(val));
      return true;
    } catch (error) {
      // Error retrieving data
      console.log(error.message);
      return false;
    }
  };

  getLocationCoordinates = async () => {
    let data = '';
    try {
      data = (await AsyncStorage.getItem('locationCoordinates')) || null;
    } catch (error) {
      // Error retrieving data
      console.log(error.message);
    }
    return JSON.parse(data);
  };

  deleteLocationCoordinates = async () => {
    try {
      await AsyncStorage.removeItem('locationCoordinates');
      return true;
    } catch (error) {
      // Error retrieving data
      console.log(error.message);
      return false;
    }
  };

  saveLocationCoordinatesTest = async val => {
    try {
      await AsyncStorage.setItem(
        'locationCoordinatesTest',
        JSON.stringify(val),
      );
      return true;
    } catch (error) {
      // Error retrieving data
      console.log(error.message);
      return false;
    }
  };

  getLocationCoordinatesTest = async () => {
    let data = '';
    try {
      data = (await AsyncStorage.getItem('locationCoordinatesTest')) || null;
    } catch (error) {
      // Error retrieving data
      console.log(error.message);
    }
    return JSON.parse(data);
  };

  deleteLocationCoordinatesTest = async () => {
    try {
      await AsyncStorage.removeItem('locationCoordinatesTest');
      return true;
    } catch (error) {
      // Error retrieving data
      console.log(error.message);
      return false;
    }
  };

  // saveToken = async(token) => {
  //     try {
  //         await AsyncStorage.setItem('token', token);
  //     } catch (error) {
  //         // Error retrieving data
  //         console.log(error.message);
  //     }
  // };

  // getToken = async() => {
  //     let token = '';
  //     try {
  //         token = await AsyncStorage.getItem('token') || null;
  //     } catch (error) {
  //         // Error retrieving data
  //         console.log(error.message);
  //     }
  //     return token;
  // };

  // deleteToken = async () => {
  //     try {
  //         await AsyncStorage.removeItem('token');
  //     } catch (error) {
  //         // Error retrieving data
  //         console.log(error.message);
  //     }
  // }
}
