import {Component} from 'react';

import {Alert} from 'react-native';

import Dataprovider from '../provider/Dataprovider';

import {showMessage} from 'react-native-flash-message';

import NetInfo from '@react-native-community/netinfo';

let url = 'https://ilmsapi.tcvtech.com/api/';
// let url = 'http://localhost/dentalProject/dentalapi/public/api/';

export default class Api extends Component {
  dataProvider = new Dataprovider();

  constructor(props) {
    super(props);
  }

  callApi(option) {
    let method = option.method;

    let endpoint = url + option.api;
    let headers = option.headers;
    let data = option.data;

    let options = null;
    if (method.toLowerCase() === 'post') {
      options = {
        method: method,
        headers: headers,
        body: data,
      };
    } else {
      options = {
        method: method,
      };
    }

    return new Promise((resolve, reject) => {
      // CHECK DEVICE HAS NETWORK AVAILABLE OR NOT
      NetInfo.fetch().then(state => {
        // DEVICE NETWORK ENABLED
        if (state.isConnected) {
          fetch(endpoint, options)
            .then(response => response.json())
            .then(json => {
              resolve(json);
            })
            .catch(error => {
              console.error(error);
            });
        }
        // DEVICE NETWORK DISABLED
        else {
          reject(new Error('Whoops!'));
          this.showNoNetworkMessage();
        }
      });
    });
  }

  async callPostApi(option) {
    let method = option.method;
    let endpoint = url + option.api;
    let headers = option.headers;
    let data = option.data;
    let options = null;
    if (method.toLowerCase() === 'post') {
      options = {
        method: method,
        headers: headers,
        body: data,
      };
    } else {
      options = {
        method: method,
        headers: {},
      };
    }
console.log('object');
    // try {
    //   const token = await this.dataProvider.getData('token');
    //   options.headers.Authorization = 'bearer ' + token;
      
    //   // CHECK DEVICE HAS NETWORK AVAILABLE OR NOT
    //   const state = await NetInfo.fetch();
    
    //   if (state.isConnected) {
    //     const response = await fetch(endpoint, options);
    //     const json = await response.json();
    
    //     // ACCESS TOKEN EXPIRED
    //     if (json !== null && typeof json.status_code !== 'undefined' && json.status_code === 401) {
    //       // REFRESH TOKEN SET TO TRUE
    //       if (typeof option.refreshOn401 !== 'undefined' && option.refreshOn401 === true) {
    //         let refreshTokenHeaders = headers;
    //         refreshTokenHeaders.Authorization = 'bearer ' + token;
    //         let refreshTokenEndpoint = url + 'v_1/refresh-token';
    //         let refreshTokenOptions = {
    //           method: 'GET',
    //           headers: refreshTokenHeaders,
    //         };
    //         try {
    //           const refreshResponse = await fetch(refreshTokenEndpoint, refreshTokenOptions);
    //           const refreshJson = await refreshResponse.json();
    
    //           // TOKEN REFRESHED
    //           if (refreshJson !== null && typeof refreshJson.status_code !== 'undefined' && refreshJson.status_code === 200) {
    //             await this.dataProvider.saveData('token', refreshJson.response.data.access_token);
    //             option.refreshOn401 = false;
    //             const postApiResponse = await this.callPostApi(option);
    //             return postApiResponse;
    //           }
    //           // REFRESH TOKEN EXPIRED
    //           else if (refreshJson !== null && typeof refreshJson.status_code !== 'undefined' && refreshJson.status_code === 401) {
    //             // HERE REMOVE USER AND ACCESS TOKEN FROM LOCAL STORAGE
    //             // RETURN RESPONSE
    //             return json;
    //           }
    //           // TOKEN REFRESH SOME ERROR
    //           else {
    //             // RETURN RESPONSE
    //             return json;
    //           }
    //         } catch (error) {
    //           console.log(error);
    //         }
    //       }
    //       // REFRESH TOKEN SET TO FALSE
    //       else {
    //         // RETURN RESPONSE
    //         return json;
    //       }
    //     }
    //     // ACCESS TOKEN NOT EXPIRED
    //     else {
    //       // RETURN RESPONSE
    //       return json;
    //     }
    //   }
    //   // DEVICE NETWORK DISABLED
    //   else {
    //     throw new Error('Whoops!');
    //     this.showNoNetworkMessage();
    //   }
    // } catch (error) {
    //   console.error(error);
    // }
    
  }

  showNoNetworkMessage() {
    Alert.alert(
      'Whoops!',
      'No internet connection found. Check your connection or try again later.',
      [{text: 'OK', onPress: () => console.log('OK Pressed')}],
      {cancelable: false},
    );
  }

  showPermissionRelatedError(title, message, okBtnText) {
    Alert.alert(
      title,
      message,
      [
        {
          text: 'Cancel',
          onPress: () => {
            console.log('Cancel Clicked');
          },
          style: 'cancel',
        },
        {
          text: okBtnText,
          onPress: () => {
            console.log('OK Clicked');
          },
        },
      ],
      {cancelable: false},
    );
  }

  showSuccessMessage(caption, message) {
    if (message !== null && message !== '') {
      // title = caption;
      // successMessage = message;

      showMessage({
        type: 'default',
        message: caption,
        description: message,
        duration: 4000,
        backgroundColor: '#333',
        color: '#fff',
        icon: {icon: 'success', position: 'left'},
        floating: true,
      });
    } else {
      // title = "Success";
      // successMessage = caption;

      showMessage({
        type: 'default',
        message: caption,
        duration: 4000,
        backgroundColor: '#333',
        color: '#fff',
        icon: {icon: 'success', position: 'left'},
        floating: true,
      });
    }

    // showMessage({
    //     type: "default",
    //     message: title,
    //     description: successMessage,
    //     icon: { icon: "auto", position: "left" },
    //     duration: 4000,
    //     floating: true
    // });
  }

  showErrorMessage(caption, message) {
    if (message !== null && message !== '') {
      // title = caption;
      // errorMessage = message;

      showMessage({
        type: 'danger',
        message: caption,
        description: message,
        duration: 4000,
        icon: {icon: 'warning', position: 'left'},
        floating: true,
      });
    } else {
      // title = "Error";
      // errorMessage = caption;

      showMessage({
        type: 'danger',
        message: caption,
        duration: 4000,
        icon: {icon: 'warning', position: 'left'},
        floating: true,
      });
    }

    // showMessage({
    //     type: "danger",
    //     message: title,
    //     description: errorMessage,
    //     // icon: { icon: "auto", position: "left" },
    //     duration: 4000,
    //     floating: true
    // });
  }

  showSuccessMessageOnRef(ref, caption, message) {
    if (message !== null && message !== '') {
      ref.showMessage({
        type: 'default',
        message: caption,
        description: message,
        duration: 4000,
        backgroundColor: '#333',
        color: '#fff',
        icon: {icon: 'success', position: 'left'},
        floating: true,
      });
    } else {
      ref.showMessage({
        type: 'default',
        message: caption,
        duration: 4000,
        backgroundColor: '#333',
        color: '#fff',
        icon: {icon: 'success', position: 'left'},
        floating: true,
      });
    }
  }

  showErrorMessageOnRef(ref, caption, message) {
    if (message !== null && message !== '') {
      ref.showMessage({
        type: 'danger',
        message: caption,
        description: message,
        duration: 4000,
        icon: {icon: 'warning', position: 'left'},
        floating: true,
      });
    } else {
      ref.showMessage({
        type: 'danger',
        message: caption,
        duration: 4000,
        icon: {icon: 'warning', position: 'left'},
        floating: true,
      });
    }
  }
}
