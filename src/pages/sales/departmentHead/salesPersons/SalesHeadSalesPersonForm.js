import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Alert,
  Dimensions,
} from 'react-native';

import {common} from '../../../../assets/style';

import FormInput from '../../../../components/FormInput';
import FormSelectPicker from '../../../../components/FormSelectPicker';
import FormRadioButton from '../../../../components/FormRadioButton';
import FormDatePicker from '../../../../components/FormDatePicker';
import FormTimePicker from '../../../../components/FormTimePicker';

import {NavigationEvents} from 'react-navigation';

import Api from '../../../../provider/Api';
import Dataprovider from '../../../../provider/Dataprovider';
import Loader from '../../../../provider/Loader';

import {Avatar} from 'react-native-elements';
import {Formik} from 'formik';

import {
  primaryHexColor,
  dangerHexColor,
  successHexColor,
  mainBgColor,
} from '../../../../constants/themeColors';

import moment from 'moment';

import {ActionSheet} from 'native-base';
import ImagePicker from 'react-native-image-crop-picker';

import {loggedInUserDetails} from '../../../../redux/actions/loggedInUserDetails';
import {connect} from 'react-redux';

const screenWidth = Dimensions.get('window').width;
const timeComponentWidth = screenWidth / 2 - 15;

class SalesHeadSalesPersonForm extends Component {
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
      userId:
        typeof this.props.navigation.state.params.userId !== 'undefined'
          ? parseInt(this.props.navigation.state.params.userId)
          : 0,
      user: null,
      countries: [],
      countryId: '',
      states: [],
      stateId: '',
      cities: [],
      cityId: '',
      areaDirections: [],
      areaDirection: null,
      genders: [],
      gender: null,
      dateOfBirth: null,
      defaultAttendanceTimes: [],
      checkInTime: null,
      checkOutTime: null,

      isExistingImageToBeDeleted: false,
      isCurrentImageToBeDeleted: false,
      isUserHasImage: false,
      userImageHeight: 500,
      userImageWidth: 500,
      userImagePlaceholder: require('../../../../images/placeholders/noimage-user.png'),
      userImageUrl: require('../../../../images/placeholders/noimage-user.png'),
      useSelectedImage: null,

      loading: true,
    };

    this.validate = this.validate.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    this.getFormData();
    this.props.navigation.setParams({
      handleSave: this.handleSubmitFormForHeaderButton,
    });
  }

  getFormData() {
    let formData = new FormData();
    formData.append('userid', this.state.userId);

    let options = {
      api: '',
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'multipart/form-data',
      },
      data: formData,
      refreshOn401: true,
    };

    if (this.state.userId === 0) {
      options.api = 'v_1/sales/sales-persons/add';
    } else {
      options.api = 'v_1/sales/sales-persons/edit';
    }

    this.api.callPostApi(options).then(data => {
      this.setState({loading: false});

      if (data.status_code === 200) {
        let responseData = data.response.data;

        let defaultAttendanceTimes = responseData.defaultattendancetimes;
        let checkInTime =
          responseData.user.checkintime !== null && this.state.userId !== 0
            ? responseData.user.checkintime
            : moment(defaultAttendanceTimes.checkin, 'HH:mm:ss');
        let checkOutTime =
          responseData.user.checkouttime !== null && this.state.userId !== 0
            ? responseData.user.checkouttime
            : moment(defaultAttendanceTimes.checkout, 'HH:mm:ss');

        this.setState({
          user: responseData.user,
          countries: responseData.countries,
          countryId: responseData.user.countryid,
          states: responseData.states,
          stateId: responseData.user.stateid,
          cities: responseData.cities,
          cityId: responseData.user.cityid,
          areaDirections: responseData.areadirections,
          areaDirection: responseData.user.areadirection,
          genders: responseData.genders,
          gender: responseData.user.gender,
          dateOfBirth:
            typeof responseData.user.dateofbirth !== 'undefined' &&
            responseData.user.dateofbirth !== null
              ? moment(responseData.user.dateofbirth)
              : null,
          defaultAttendanceTimes: defaultAttendanceTimes,
          checkInTime: checkInTime,
          checkOutTime: checkOutTime,
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

  handleChangeAreaDirection = areaDirection => {
    if (this.state.areaDirection !== areaDirection) {
      this.setState({areaDirection});
    }
  };

  handleChangeGender = (gender, event) => {
    this.setState({gender});
  };

  handleOnChangeDateOfBirth = dateOfBirth => {
    this.setState({dateOfBirth});
  };

  handleOnChangeCheckInTime = checkInTime => {
    this.setState({checkInTime});
  };

  handleOnChangeCheckOutTime = checkOutTime => {
    this.setState({checkOutTime});
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

  takePhotoFromCamera = async () => {
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
        if (e == permissionErrorMessage) {
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
        if (e == permissionErrorMessage) {
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
    const formData = new FormData();
    formData.append(
      'userid',
      this.state.userId === null ? 0 : this.state.userId,
    );
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
      'areadirection',
      this.state.areaDirection === null ? '' : this.state.areaDirection,
    );
    formData.append(
      'checkintime',
      this.state.checkInTime === null
        ? ''
        : this.state.checkInTime.format('HH:mm'),
    );
    formData.append(
      'checkouttime',
      this.state.checkOutTime === null
        ? ''
        : this.state.checkOutTime.format('HH:mm'),
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
      api: 'v_1/sales/sales-persons/store',
      method: 'POST',
      headers: {
        Accept: 'application/json',
      },
      data: formData,
      refreshOn401: true,
    };

    this.setState({loading: true});

    this.api.callPostApi(options).then(responseData => {
      this.setState({loading: false});

      if (responseData.status_code === 200) {
        this.api.showSuccessMessage(responseData.response.message, null);

        setTimeout(() => {
          if (this.state.userId > 0) {
            this.props.navigation.goBack(null);
          } else {
            this.props.navigation.navigate('SalesHeadSalesPersons');
          }
        }, 4500);
      } else {
        let errormessage = null;
        if (
          typeof responseData.status_code !== 'undefined' &&
          responseData.status_code === 422
        ) {
          errormessage = responseData.response.data.message;
        }
        this.api.showErrorMessage(responseData.response.message, errormessage);
      }
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

    // ADD
    if (this.state.userId === 0) {
      if (!values.password) {
        errors.password = 'Please enter new password.';
      }

      if (!values.password_confirmation) {
        errors.password_confirmation = 'Please enter confirm password.';
      } else if (values.password !== values.password_confirmation) {
        errors.password_confirmation = 'Password mismatch.';
      }
    }
    // EDIT
    else {
      if (values.password !== values.password_confirmation) {
        errors.password_confirmation = 'Password mismatch.';
      }
    }

    if (this.state.dateOfBirth === null) {
      errors.dateofbirth = 'Please select date of birth.';
    }

    if (
      this.state.countryId === '' ||
      this.state.countryId === null ||
      this.state.countryId === undefined
    ) {
      errors.countryid = 'Please select country.';
    }

    if (
      this.state.stateId === '' ||
      this.state.stateId === null ||
      this.state.stateId === undefined
    ) {
      errors.stateid = 'Please select state.';
    }

    if (
      this.state.cityId === '' ||
      this.state.cityId === null ||
      this.state.cityId === undefined
    ) {
      errors.cityid = 'Please select city.';
    }

    if (
      this.state.areaDirection === '' ||
      this.state.areaDirection === null ||
      this.state.areaDirection === undefined
    ) {
      errors.areadirection = 'Please select area direction.';
    }

    if (
      typeof this.state.checkInTime === 'undefined' ||
      this.state.checkInTime === '' ||
      this.state.checkInTime === null
    ) {
      errors.checkintime = 'Please select checkin time.';
    }

    if (
      typeof this.state.checkOutTime === 'undefined' ||
      this.state.checkOutTime === '' ||
      this.state.checkOutTime === null
    ) {
      errors.checkouttime = 'Please select checkout time.';
    }

    if (
      this.state.gender === null ||
      this.state.gender === '' ||
      this.state.gender === undefined
    ) {
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
            {/* <NavigationEvents onDidFocus={() => this.getFormData() } /> */}
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
                          name="firstname"
                          value={values.firstname}
                          onChangeText={handleChange('firstname')}
                          placeholder="Enter First Name"
                          autoCapitalize="none"
                          label="First Name"
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
                        <FormSelectPicker
                          label="Area Direction"
                          placeholder={{
                            label: 'Select Area Direction',
                            value: '',
                          }}
                          value={this.state.areaDirection}
                          onValueChange={this.handleChangeAreaDirection}
                          items={this.state.areaDirections}
                          errors={errors.areadirection}
                        />
                        <View
                          style={{
                            flex: 1,
                            flexDirection: 'row',
                            justifyContent: 'flex-start',
                          }}>
                          <View
                            style={{
                              width: timeComponentWidth,
                              marginRight: -10,
                            }}>
                            <FormTimePicker
                              name="checkintime"
                              value={this.state.checkInTime}
                              onChangeEvent={this.handleOnChangeCheckInTime}
                              label="Checkin Time"
                              errors={errors.checkintime}
                              display="spinner"
                            />
                          </View>
                          <View
                            style={{
                              flex: 1,
                            }}>
                            <FormTimePicker
                              name="checkouttime"
                              value={this.state.checkOutTime}
                              onChangeEvent={this.handleOnChangeCheckOutTime}
                              label="Checkout Time"
                              errors={errors.checkouttime}
                              display="spinner"
                            />
                          </View>
                        </View>
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

export default connect(mapStateToProps, null)(SalesHeadSalesPersonForm);
