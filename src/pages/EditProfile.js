import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import Api from '../provider/Api';
import Dataprovider from '../provider/Dataprovider';
import Loader from '../provider/Loader';
import {common} from '../assets/style';

import FormInput from '../components/FormInput';
import FormSelectPicker from '../components/FormSelectPicker';
import FormRadioButton from '../components/FormRadioButton';
import FormDatePicker from '../components/FormDatePicker';

import {Avatar} from 'react-native-elements';
import {Formik} from 'formik';

import {
  dangerHexColor,
  successHexColor,
  mainBgColor,
} from '../constants/themeColors';

import moment from 'moment';

import {NavigationEvents} from 'react-navigation';

import {ActionSheet} from 'native-base';
import ImagePicker from 'react-native-image-crop-picker';

import {loggedInUserDetails} from '../redux/actions/loggedInUserDetails';
import {connect} from 'react-redux';

class EditProfile extends Component {
  api = new Api();
  dataProvider = new Dataprovider();

  submitForm = null;
  handleSubmitFormForHeaderButton = e => {
    if (this.submitForm) {
      this.submitForm();
    }
  };
  bindSubmitFormToHeaderButton = submitForm => {
    this.submitForm = submitForm;
  };

  constructor(props) {
    super(props);
    this.state = {
      user: null,
      countries: [],
      countryId: '',
      states: [],
      stateId: '',
      cities: [],
      cityId: '',
      genders: [],
      gender: null,
      dateOfBirth: null,

      isExistingImageToBeDeleted: false,
      isCurrentImageToBeDeleted: false,
      isUserHasImage: false,
      userImageHeight: 500,
      userImageWidth: 500,
      userImagePlaceholder: require('../images/placeholders/noimage-user.png'),
      userImageUrl: require('../images/placeholders/noimage-user.png'),
      useSelectedImage: null,

      loading: true,
    };

    this.validate = this.validate.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    // this.getEditProfileData();
    this.props.navigation.setParams({
      handleSave: this.handleSubmitFormForHeaderButton,
    });
  }

  getEditProfileData() {
    this.setState({loading: true});

    let options = {
      api: 'v_1/get-profile',
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      data: {},
      refreshOn401: true,
    };

    this.api.callPostApi(options).then(data => {
      this.setState({loading: false});

      if (data.status_code === 200) {
        let responseData = data.response.data;
        this.setState({
          user: responseData.user,
          countries: responseData.countries,
          countryId: responseData.user.countryid,
          states: responseData.states,
          stateId: responseData.user.stateid,
          cities: responseData.cities,
          cityId: responseData.user.cityid,
          genders: responseData.genders,
          gender: responseData.user.gender,
          dateOfBirth:
            responseData.user.dateofbirth !== null
              ? moment(responseData.user.dateofbirth)
              : null,
          isUserHasImage: responseData.user.hasimage,
          userImageHeight: responseData.user.userimageheight,
          userImageWidth: responseData.user.userimagewidth,
          userImagePlaceholder: {uri: responseData.user.userimageplaceholder},
          userImageUrl: {uri: responseData.user.imagefilepath},
        });
      } else {
        let errormessage = null;
        if (
          typeof data.status_code !== 'undefined' &&
          data.status_code === 422
        ) {
          errormessage = data.response.data.message;
        }
        this.api.showErrorMessage(data.response.message, errormessage);
      }
    });
  }

  handleChangeCountry = countryId => {
    if (this.state.countryId !== countryId) {
      this.setState({
        loading: true,
        cities: [],
        cityId: null,
        states: [],
        stateId: null,
        countryId: countryId,
      });

      if (parseInt(countryId) > 0) {
        const formData = new FormData();
        formData.append('countryid', parseInt(countryId));

        this.api
          .callApi({
            api: 'v_1/getstates',
            method: 'POST',
            headers: {
              Accept: 'application/json',
            },
            data: formData,
            refreshOn401: true,
          })
          .then(data => {
            this.setState({loading: false});

            if (data.status_code === 200) {
              let responseData = data.response.data;
              this.setState({
                states: responseData.states,
              });
            } else {
              let errormessage = null;
              if (
                typeof data.status_code !== 'undefined' &&
                data.status_code === 422
              ) {
                errormessage = data.response.data.message;
              }
              this.api.showErrorMessage(data.response.message, errormessage);
            }
          });
      } else {
        this.setState({loading: false});
      }
    }
  };

  handleChangeState = stateId => {
    if (this.state.stateId !== stateId) {
      this.setState({
        loading: true,
        cities: [],
        cityId: null,
        stateId: stateId,
      });

      if (parseInt(stateId) > 0) {
        const formData = new FormData();
        formData.append('stateid', parseInt(stateId));

        this.api
          .callApi({
            api: 'v_1/getcities',
            method: 'POST',
            headers: {
              Accept: 'application/json',
            },
            data: formData,
            refreshOn401: true,
          })
          .then(data => {
            this.setState({loading: false});

            if (data.status_code === 200) {
              let responseData = data.response.data;
              this.setState({
                cities: responseData.cities,
              });
            } else {
              let errormessage = null;
              if (
                typeof data.status_code !== 'undefined' &&
                data.status_code === 422
              ) {
                errormessage = data.response.data.message;
              }
              this.api.showErrorMessage(data.response.message, errormessage);
            }
          });
      } else {
        this.setState({loading: false});
      }
    }
  };

  handleChangeCity = cityId => {
    if (this.state.cityId !== cityId) {
      this.setState({cityId});
    }
  };

  handleChangeGender = (gender, event) => {
    // if(this.state.gender !== gender) {
    //     this.setState({
    //         gender: gender
    //     });
    // }
    this.setState({gender});
  };

  handleOnChangeDateOfBirth = dateOfBirth => {
    this.setState({dateOfBirth});
  };

  onClickEditImage = () => {
    const BUTTONS = [
      {text: 'Take Photo', icon: 'camera', iconColor: '#555'},
      {text: 'Choose Photo Library', icon: 'photos', iconColor: '#1a73e8'},
      {text: 'Remove Photo', icon: 'trash', iconColor: dangerHexColor},
      {text: 'Cancel', icon: 'close', iconColor: successHexColor},
    ];

    ActionSheet.show(
      {
        options: BUTTONS,
        cancelButtonIndex: 3,
        title: 'Select a Profile Picture',
      },
      buttonIndex => {
        switch (buttonIndex) {
          case 0:
            this.takePhotoFromCamera();
            break;
          case 1:
            this.choosePhotoFromLibrary();
            break;
          case 2:
            this.removePhoto();
            break;
          default:
            break;
        }
      },
    );
  };

  takePhotoFromCamera = () => {
    ImagePicker.openCamera({
      mediaType: 'photo',
      compressImageMaxWidth: this.state.userImageWidth,
      compressImageMaxHeight: this.state.userImageHeight,
      compressImageQuality: 0.7,
      width: this.state.userImageWidth,
      height: this.state.userImageHeight,
      cropping: true,
      includeBase64: true,
    })
      .then(image => {
        this.onSelectedImage(image);
      })
      .catch(e => {
        let permissionErrorMessage = 'Error: Required permission missing';
        let selectionCancelledErrorMessage =
          'Error: User cancelled image selection';

        // Permission Missing
        if (e === permissionErrorMessage) {
          this.api.showPermissionRelatedError(
            'Missing Permissions!',
            'Please enable camera and storage permissions to use this feature.',
            'Ok, Got It',
          );
        }
      });
  };

  choosePhotoFromLibrary = () => {
    ImagePicker.openPicker({
      mediaType: 'photo',
      compressImageMaxWidth: this.state.userImageWidth,
      compressImageMaxHeight: this.state.userImageHeight,
      compressImageQuality: 0.7,
      width: this.state.userImageWidth,
      height: this.state.userImageHeight,
      cropping: true,
      includeBase64: true,
    })
      .then(image => {
        this.onSelectedImage(image);
      })
      .catch(e => {
        let permissionErrorMessage = 'Error: Required permission missing';
        let selectionCancelledErrorMessage =
          'Error: User cancelled image selection';

        // Permission Missing
        if (e === permissionErrorMessage) {
          this.api.showPermissionRelatedError(
            'Missing Permissions!',
            'Please enable storage permission to use this feature.',
            'Ok, Got It',
          );
        }
      });
  };

  removePhoto = () => {
    let placeholder = this.state.userImagePlaceholder;
    if (this.state.isUserHasImage && !this.state.isExistingImageToBeDeleted) {
      this.setState({isExistingImageToBeDeleted: true});
    }
    this.setState({
      isCurrentImageToBeDeleted: true,
      userImageUrl: placeholder,
      useSelectedImage: null,
    });
  };

  onSelectedImage = image => {
    const source = {uri: image.path};
    let pathParts = image.path.split('/');

    let item = {
      id: Date.now(),
      url: source,
      content: image.data,
      type: image.mime,
      uri: image.path,
      name: pathParts[pathParts.length - 1],
    };
    if (this.state.isUserHasImage && !this.state.isExistingImageToBeDeleted) {
      this.setState({isExistingImageToBeDeleted: true});
    }
    this.setState({
      isCurrentImageToBeDeleted: false,
      userImageUrl: source,
      useSelectedImage: item,
    });
  };

  handleSubmit = values => {
    setTimeout(() => {
      const formData = new FormData();
      formData.append(
        'firstname',
        typeof values.firstname === 'undefined' ? '' : values.firstname,
      );
      formData.append(
        'lastname',
        typeof values.lastname === 'undefined' ? '' : values.lastname,
      );
      formData.append(
        'email',
        typeof values.email === 'undefined' ? '' : values.email,
      );
      formData.append(
        'oldpassword',
        typeof values.oldpassword === 'undefined' ? '' : values.oldpassword,
      );
      formData.append(
        'password',
        typeof values.password === 'undefined' ? '' : values.password,
      );
      formData.append(
        'password_confirmation',
        typeof values.password_confirmation === 'undefined'
          ? ''
          : values.password_confirmation,
      );
      formData.append(
        'dateofbirth',
        this.state.dateOfBirth === null
          ? ''
          : this.state.dateOfBirth.format('YYYY-MM-DD'),
      );
      formData.append(
        'phoneno',
        typeof values.phoneno === 'undefined' ? '' : values.phoneno,
      );
      formData.append(
        'address1',
        typeof values.address1 === 'undefined' ? '' : values.address1,
      );
      formData.append(
        'address2',
        typeof values.address2 === 'undefined' ? '' : values.address2,
      );
      formData.append(
        'countryid',
        this.state.countryId === null ? '' : this.state.countryId,
      );
      formData.append(
        'stateid',
        this.state.stateId === null ? '' : this.state.stateId,
      );
      formData.append(
        'cityid',
        this.state.cityId === null ? '' : this.state.cityId,
      );
      formData.append(
        'pincode',
        typeof values.pincode === 'undefined' ? '' : values.pincode,
      );
      formData.append(
        'gender',
        this.state.gender === null ? 1 : this.state.gender,
      );

      formData.append(
        'deleteimage',
        this.state.isExistingImageToBeDeleted ? 1 : 0,
      );

      if (this.state.useSelectedImage !== null) {
        let imagefile = {
          uri: this.state.useSelectedImage.uri,
          type: this.state.useSelectedImage.type,
          name: this.state.useSelectedImage.name,
        };
        formData.append('imagefile', imagefile);
      }

      let options = {
        api: 'v_1/profile/store',
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'multipart/form-data',
        },
        data: formData,
        refreshOn401: true,
      };

      this.setState({loading: true});

      this.api.callPostApi(options).then(responseData => {
        this.setState({loading: false});

        if (responseData.status_code === 200) {
          this.dataProvider
            .saveData('user', responseData.response.data.transformeduser)
            .then(() => {
              this.api.showSuccessMessage(responseData.response.message, null);
              this.props.onUserUpdate(
                responseData.response.data.transformeduser,
              );

              setTimeout(() => {
                // if(this.state.user.appusertype == 1) {
                //     if(this.state.user.isdepartmenthead) {
                //         this.props.navigation.navigate('AdminQCHeadDashboard');
                //     }
                //     else {
                //         this.props.navigation.navigate('AdminQCDashboard');
                //     }
                // }
                // else if(this.state.user.appusertype == 2) {
                //     if(this.state.user.isdepartmenthead) {
                //         this.props.navigation.navigate('PackagingHeadDashboard');
                //     }
                //     else {
                //         this.props.navigation.navigate('PackagingDashboard');
                //     }
                // }
                // else if(this.state.user.appusertype == 3) {
                //     if(this.state.user.isdepartmenthead) {
                //         this.props.navigation.navigate('ProductionHeadDashboard');
                //     }
                //     else {
                //         this.props.navigation.navigate('ProductionDashboard');
                //     }
                // }
                // else if(this.state.user.appusertype == 4) {
                //     this.props.navigation.navigate('ReceptionDashboard');
                // }
                // else if(this.state.user.appusertype === 5) {
                //     if(this.state.user.isdepartmenthead) {
                //         this.props.navigation.navigate('SalesHeadDashboard');
                //     }
                //     else {
                //         this.props.navigation.navigate('SalesDashboard');
                //     }
                // }
                // else if(this.state.user.appusertype == 6) {
                //     this.props.navigation.navigate('SupervisorDashboard');
                // }
                this.props.navigation.goBack(null);
              }, 4500);
            });
        } else {
          let errormessage = null;
          if (
            typeof responseData.status_code !== 'undefined' &&
            responseData.status_code === 422
          ) {
            errormessage = responseData.response.data.message;
          }
          this.api.showErrorMessage(
            responseData.response.message,
            errormessage,
          );
        }
      });
    });
  };

  validate(values) {
    let errors = {};

    if (!values.firstname) {
      errors.firstname = 'Please enter first name.';
    }

    if (!values.lastname) {
      errors.lastname = 'Please enter last name.';
    }

    let emailValid = values.email.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
    if (!values.email) {
      errors.email = 'Please enter your email address.';
    } else if (!emailValid) {
      errors.email = 'Please enter a valid email address.';
    }

    if (values.password || values.password_confirmation) {
      if (!values.oldpassword) {
        errors.oldpassword = 'Please enter old password.';
      }
    }

    if (values.oldpassword || values.password_confirmation) {
      if (!values.password) {
        errors.password = 'Please enter new password.';
      }
    }

    if (values.password || values.password_confirmation) {
      if (!values.password_confirmation) {
        errors.password_confirmation = 'Please enter confirm password.';
      } else if (values.password !== values.password_confirmation) {
        errors.password_confirmation = 'Password mismatch.';
      }
    }

    if (this.state.dateOfBirth === null) {
      errors.dateofbirth = 'Please select date of birth.';
    }

    if (this.state.countryId === '') {
      errors.countryid = 'Please select country.';
    }

    if (this.state.stateId === '') {
      errors.stateid = 'Please select state.';
    }

    if (this.state.cityId === '') {
      errors.cityid = 'Please select city.';
    }

    if (this.state.gender === null || this.state.gender === '') {
      errors.gender = 'Please select gender.';
    }

    return errors;
  }

  render() {
    return (
      <KeyboardAvoidingView
        style={{flex: 1, flexDirection: 'column'}}
        behavior={'padding'}
        enabled
        keyboardVerticalOffset={100}>
        <View style={{flex: 1, backgroundColor: mainBgColor}}>
          <View style={common.formContainer}>
            <NavigationEvents onDidFocus={() => this.getEditProfileData()} />
            <Loader loading={this.state.loading} />
            <ScrollView>
              <View style={common.formElementsContainer}>
                <Formik
                  enableReinitialize={true}
                  validate={this.validate}
                  initialValues={{
                    firstname:
                      this.state.user &&
                      typeof this.state.user.firstname !== 'undefined' &&
                      this.state.user.firstname !== null
                        ? this.state.user.firstname
                        : '',
                    lastname:
                      this.state.user &&
                      typeof this.state.user.lastname !== 'undefined' &&
                      this.state.user.lastname !== null
                        ? this.state.user.lastname
                        : '',
                    email:
                      this.state.user &&
                      typeof this.state.user.email !== 'undefined' &&
                      this.state.user.email !== null
                        ? this.state.user.email
                        : '',
                    phoneno:
                      this.state.user &&
                      typeof this.state.user.phoneno !== 'undefined' &&
                      this.state.user.phoneno !== null
                        ? this.state.user.phoneno
                        : '',
                    address1:
                      this.state.user &&
                      typeof this.state.user.address1 !== 'undefined' &&
                      this.state.user.address1 !== null
                        ? this.state.user.address1
                        : '',
                    address2:
                      this.state.user &&
                      typeof this.state.user.address2 !== 'undefined' &&
                      this.state.user.address2 !== null
                        ? this.state.user.address2
                        : '',
                    pincode:
                      this.state.user &&
                      typeof this.state.user.pincode !== 'undefined' &&
                      this.state.user.pincode !== null
                        ? this.state.user.pincode
                        : '',
                    oldpassword: '',
                    password: '',
                    password_confirmation: '',
                  }}
                  onSubmit={this.handleSubmit}>
                  {formikProps => {
                    const {values, handleChange, handleSubmit, errors} =
                      formikProps;

                    // BIND SUBMISSION HANDLER REMOTLY FOR HEADER SAVE BUTTON
                    this.bindSubmitFormToHeaderButton(formikProps.submitForm);

                    return (
                      <View>
                        <View style={styles.userProfileContainer}>
                          <Avatar
                            rounded
                            source={this.state.userImageUrl}
                            size="xlarge"
                            showAccessory={true}
                            accessory={{
                              name: 'mode-edit',
                              type: 'material',
                              color: '#fff',
                              underlayColor: '#000',
                              // size: 42,
                              iconStyle: {
                                fontSize: 32,
                              },
                            }}
                            onAccessoryPress={this.onClickEditImage}
                            avatarStyle={{}}
                          />
                        </View>
                        <FormInput
                          // label="First Name"
                          // placeholder='Enter First Name'
                          placeholder="First Name"
                          name="firstname"
                          value={values.firstname}
                          onChangeText={handleChange('firstname')}
                          autoCapitalize="none"
                          errorMessage={errors.firstname}
                        />
                        <FormInput
                          name="lastname"
                          value={values.lastname}
                          onChangeText={handleChange('lastname')}
                          placeholder="Enter Last Name"
                          autoCapitalize="none"
                          label="Last Name"
                          errorMessage={errors.lastname}
                        />
                        <FormInput
                          name="email"
                          value={values.email}
                          onChangeText={handleChange('email')}
                          placeholder="Enter Email Address"
                          autoCapitalize="none"
                          label="Email"
                          errorMessage={errors.email}
                        />
                        <FormInput
                          name="oldpassword"
                          value={values.oldpassword}
                          onChangeText={handleChange('oldpassword')}
                          placeholder="Enter Old Password"
                          secureTextEntry
                          label="Old Password"
                          errorMessage={errors.oldpassword}
                        />
                        <FormInput
                          name="password"
                          value={values.password}
                          onChangeText={handleChange('password')}
                          placeholder="Enter New Password"
                          secureTextEntry
                          label="Password"
                          errorMessage={errors.password}
                        />
                        <FormInput
                          name="password_confirmation"
                          value={values.password_confirmation}
                          onChangeText={handleChange('password_confirmation')}
                          placeholder="Enter Confirm Password"
                          secureTextEntry
                          label="Confirm Password"
                          errorMessage={errors.password_confirmation}
                        />
                        <FormDatePicker
                          name="dateofbirth"
                          value={this.state.dateOfBirth}
                          onChangeEvent={this.handleOnChangeDateOfBirth}
                          label="Date of Birth"
                          errors={errors.dateofbirth}
                          display="spinner"
                          maximumDate={new Date()}
                        />
                        <FormInput
                          name="phoneno"
                          value={values.phoneno}
                          onChangeText={handleChange('phoneno')}
                          placeholder="Enter Phone Number"
                          autoCapitalize="none"
                          label="Phone Number"
                          errorMessage={errors.phoneno}
                        />
                        <FormInput
                          name="address1"
                          value={values.address1}
                          onChangeText={handleChange('address1')}
                          placeholder="Enter Address 1"
                          autoCapitalize="none"
                          label="Address 1"
                          errorMessage={errors.address1}
                        />
                        <FormInput
                          name="address2"
                          value={values.address2}
                          onChangeText={handleChange('address2')}
                          placeholder="Enter Address 1"
                          autoCapitalize="none"
                          label="Address 2"
                          errorMessage={errors.address2}
                        />
                        <FormSelectPicker
                          label="Country"
                          placeholder={{label: 'Select Country', value: ''}}
                          value={this.state.countryId}
                          onValueChange={this.handleChangeCountry}
                          items={this.state.countries}
                          errors={errors.countryid}
                        />
                        <FormSelectPicker
                          label="State"
                          placeholder={{label: 'Select State', value: ''}}
                          value={this.state.stateId}
                          onValueChange={this.handleChangeState}
                          items={this.state.states}
                          errors={errors.stateid}
                        />
                        <FormSelectPicker
                          label="City"
                          placeholder={{label: 'Select City', value: ''}}
                          value={this.state.cityId}
                          onValueChange={this.handleChangeCity}
                          items={this.state.cities}
                          errors={errors.cityid}
                        />
                        <FormInput
                          name="pincode"
                          value={values.pincode}
                          onChangeText={handleChange('pincode')}
                          placeholder="Enter Pincode"
                          autoCapitalize="none"
                          label="Pincode"
                          errorMessage={errors.pincode}
                        />
                        <FormRadioButton
                          name="gender"
                          value={this.state.gender}
                          onPress={this.handleChangeGender}
                          label="Gender"
                          errors={errors.gender}
                          options={this.state.genders}
                        />
                      </View>
                    );
                  }}
                </Formik>
              </View>
            </ScrollView>
          </View>
        </View>
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  userProfileContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 30,
  },
});

const mapStateToProps = state => {
  return {
    user: state.loggedInUserDetailsReducer.user,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onUserUpdate: user => dispatch(loggedInUserDetails(user)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(EditProfile);
