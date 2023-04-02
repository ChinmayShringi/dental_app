import {AsyncStorage} from 'react-native';

export const onSignOut = () => {
  AsyncStorage.removeItem('user');
  AsyncStorage.removeItem('token');
};

export const isSignedIn = () => {
  return new Promise((resolve, reject) => {
    AsyncStorage.getItem('user')
      .then(res => {
        if (res !== null) {
          let loggedInUser = JSON.parse(res);
          resolve({
            status: true,
            userType: loggedInUser.usertype,
            appUserType: loggedInUser.appusertype,
            isDepartmentHead: loggedInUser.isdepartmenthead,
          });
        } else {
          resolve({
            status: false,
            userType: null,
            appUserType: null,
            isDepartmentHead: false,
          });
        }
      })
      .catch(err => reject(err));
  });
};
