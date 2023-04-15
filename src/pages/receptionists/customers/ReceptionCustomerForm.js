import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';

import {
  primaryBlueHexColor,
  primaryHexColor,
  dangerHexColor,
  successHexColor,
  seperator,
  mainBgColor,
  fontColor,
} from '../../../constants/themeColors';

import {common} from '../../../assets/style';

import FormInput from '../../../components/FormInput';
import FormButton from '../../../components/FormButton';
import FormSelectPicker from '../../../components/FormSelectPicker';
import FormRadioButton from '../../../components/FormRadioButton';
import FormDatePicker from '../../../components/FormDatePicker';
import FormTextArea from '../../../components/FormTextArea';

import {NavigationEvents} from 'react-navigation';

import Api from '../../../provider/Api';
import Dataprovider from '../../../provider/Dataprovider';
import Loader from '../../../provider/Loader';

import {Formik} from 'formik';

import moment from 'moment';

export default class ReceptionCustomerForm extends Component {
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
      loading: true,
      customerId:
        typeof this?.props?.navigation?.state?.params?.customerId !== 'undefined'
          ? parseInt(this?.props?.navigation?.state?.params?.customerId)
          : 0,
      customer: null,
      types: [],
      type: null,
      countries: [],
      countryId: null,
      states: [],
      stateId: null,
      cities: [],
      cityId: null,
      salutations: [],
      salutation: null,
      areaDirections: [],
      areaDirection: null,
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
    formData.append('customerid', this.state.customerId);

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

    if (this.state.customerId === 0) {
      options.api = 'v_1/receptionists/customers/add';
    } else {
      options.api = 'v_1/receptionists/customers/edit';
    }

    this.api.callPostApi(options).then(data => {
      this.setState({loading: false});

      if (data.status_code === 200) {
        let responseData = data.response.data;

        this.setState({
          customer: responseData.customer,
          types: responseData.types,
          type: parseInt(responseData.customer.type),
          countries: responseData.countries,
          countryId: responseData.customer.countryid,
          states: responseData.states,
          stateId: responseData.customer.stateid,
          cities: responseData.cities,
          cityId: responseData.customer.cityid,
          salutations: responseData.salutations,
          salutation: parseInt(responseData.customer.salutation),
          areaDirections: responseData.areadirections,
          areaDirection: parseInt(responseData.customer.areadirection),
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

  handleChangeType = type => {
    if (this.state.type !== type) {
      this.setState({type: type});
    }
  };

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

  handleChangeSalutation = salutation => {
    if (this.state.salutation !== salutation) {
      this.setState({salutation});
    }
  };

  handleSubmit = values => {
    const formData = new FormData();
    formData.append(
      'customerid',
      this.state.customerId === null ? '' : this.state.customerId,
    );
    formData.append('type', this.state.type === null ? '' : this.state.type);
    formData.append(
      'name',
      typeof values.name === 'undefined' ? '' : values.name,
    );
    formData.append(
      'email',
      typeof values.email === 'undefined' ? '' : values.email,
    );
    formData.append(
      'phoneno',
      typeof values.phoneno === 'undefined' ? '' : values.phoneno,
    );
    formData.append(
      'address',
      typeof values.address === 'undefined' ? '' : values.address,
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
      'areadirection',
      this.state.areaDirection === null ? '' : this.state.areaDirection,
    );
    formData.append(
      'salutation',
      this.state.salutation === null ? '' : this.state.salutation,
    );
    formData.append(
      'doctorname',
      typeof values.doctorname === 'undefined' ? '' : values.doctorname,
    );
    formData.append(
      'code',
      typeof values.code === 'undefined' ? '' : values.code,
    );
    formData.append(
      'personalcellphoneno',
      typeof values.personalcellphoneno === 'undefined'
        ? ''
        : values.personalcellphoneno,
    );
    formData.append(
      'personalemail',
      typeof values.personalemail === 'undefined' ? '' : values.personalemail,
    );

    let options = {
      api: 'v_1/receptionists/customers/store',
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
          if (this.state.customerId > 0) {
            this.props.navigation.goBack(null);
          } else {
            this.props.navigation.navigate('ReceptionCustomers');
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

    if (
      typeof this.state.type === 'undefined' ||
      this.state.type === '' ||
      this.state.type === null
    ) {
      errors.type = 'Please select type.';
    }

    if (!values.name) {
      errors.name = 'Please enter name.';
    }

    let emailValid = values.email.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
    if (!values.email) {
      errors.email = 'Please enter email address.';
    } else if (!emailValid) {
      errors.email = 'Please enter a valid email address.';
    }

    if (!values.phoneno) {
      errors.phoneno = 'Please enter phone number.';
    }

    if (!values.address) {
      errors.address = 'Please enter address.';
    }

    if (
      typeof this.state.countryId === 'undefined' ||
      this.state.countryId === '' ||
      this.state.countryId === null
    ) {
      errors.countryid = 'Please select country.';
    }

    if (
      typeof this.state.stateId === 'undefined' ||
      this.state.stateId === '' ||
      this.state.stateId === null
    ) {
      errors.stateid = 'Please select state.';
    }

    if (
      typeof this.state.cityId === 'undefined' ||
      this.state.cityId === '' ||
      this.state.cityId === null
    ) {
      errors.cityid = 'Please select city.';
    }

    if (
      typeof this.state.areaDirection === 'undefined' ||
      this.state.areaDirection === '' ||
      this.state.areaDirection === null
    ) {
      errors.areadirection = 'Please select area direction.';
    }

    if (
      typeof this.state.salutation === 'undefined' ||
      this.state.salutation === '' ||
      this.state.salutation === null
    ) {
      errors.salutation = 'Please select salutation.';
    }

    if (!values.doctorname) {
      errors.doctorname = 'Please enter doctor name.';
    }

    if (!values.code) {
      errors.code = 'Please enter code.';
    }

    let personalEmailValid = values.personalemail.match(
      /^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i,
    );
    if (!values.personalemail) {
      errors.personalemail = 'Please enter personal email.';
    } else if (!personalEmailValid) {
      errors.personalemail = 'Please enter a valid personal email.';
    }

    if (!values.personalcellphoneno) {
      errors.personalcellphoneno = 'Please enter personal cell no.';
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
                    name:
                      this.state.customer &&
                      typeof this.state.customer.name !== 'undefined' &&
                      this.state.customer.name !== null
                        ? this.state.customer.name
                        : '',
                    email:
                      this.state.customer &&
                      typeof this.state.customer.email !== 'undefined' &&
                      this.state.customer.email !== null
                        ? this.state.customer.email
                        : '',
                    phoneno:
                      this.state.customer &&
                      typeof this.state.customer.phoneno !== 'undefined' &&
                      this.state.customer.phoneno !== null
                        ? this.state.customer.phoneno
                        : '',
                    address:
                      this.state.customer &&
                      typeof this.state.customer.address !== 'undefined' &&
                      this.state.customer.address !== null
                        ? this.state.customer.address
                        : '',
                    pincode:
                      this.state.customer &&
                      typeof this.state.customer.pincode !== 'undefined' &&
                      this.state.customer.pincode !== null
                        ? this.state.customer.pincode
                        : '',
                    doctorname:
                      this.state.customer &&
                      typeof this.state.customer.doctorname !== 'undefined' &&
                      this.state.customer.doctorname !== null
                        ? this.state.customer.doctorname
                        : '',
                    code:
                      this.state.customer &&
                      typeof this.state.customer.code !== 'undefined' &&
                      this.state.customer.code !== null
                        ? this.state.customer.code
                        : '',
                    personalcellphoneno:
                      this.state.customer &&
                      typeof this.state.customer.personalcellphoneno !==
                        'undefined' &&
                      this.state.customer.personalcellphoneno !== null
                        ? this.state.customer.personalcellphoneno
                        : '',
                    personalemail:
                      this.state.customer &&
                      typeof this.state.customer.personalemail !==
                        'undefined' &&
                      this.state.customer.personalemail !== null
                        ? this.state.customer.personalemail
                        : '',
                  }}
                  onSubmit={this.handleSubmit}>
                  {formikProps => {
                    const {values, handleChange, handleSubmit, errors} =
                      formikProps;

                    // BIND SUBMISSION HANDLER REMOTLY FOR HEADER SAVE BUTTON
                    this.bindSubmitFormToHeaderButton(formikProps.submitForm);

                    return (
                      <View>
                        <Text style={styles.blockTitle}>Customer Details:</Text>
                        <FormSelectPicker
                          label="Type"
                          placeholder={{label: 'Select Type', value: ''}}
                          value={this.state.type}
                          onValueChange={this.handleChangeType}
                          items={this.state.types}
                          errors={errors.type}
                        />
                        <FormInput
                          name="name"
                          value={values.name}
                          onChangeText={handleChange('name')}
                          placeholder="Enter Name"
                          autoCapitalize="none"
                          label="Name"
                          errorMessage={errors.name}
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
                          name="phoneno"
                          value={values.phoneno}
                          onChangeText={handleChange('phoneno')}
                          placeholder="Enter Phone Number"
                          autoCapitalize="none"
                          label="Phone Number"
                          errorMessage={errors.phoneno}
                        />
                        <FormInput
                          name="address"
                          value={values.address}
                          onChangeText={handleChange('address')}
                          placeholder="Enter Address"
                          autoCapitalize="none"
                          label="Address"
                          errorMessage={errors.address}
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

                        <Text style={styles.blockTitle}>Doctor Details:</Text>

                        <View
                          style={{
                            flex: 1,
                            flexDirection: 'row',
                            justifyContent: 'flex-start',
                          }}>
                          <View style={{width: 120, marginRight: -10}}>
                            <FormSelectPicker
                              label="Salutations"
                              placeholder={{
                                label: 'Select Salutation',
                                value: '',
                              }}
                              value={this.state.salutation}
                              onValueChange={this.handleChangeSalutation}
                              items={this.state.salutations}
                              errors={errors.salutation}
                            />
                          </View>
                          <View
                            style={{
                              flex: 1,
                            }}>
                            <FormInput
                              name="doctorname"
                              value={values.doctorname}
                              onChangeText={handleChange('doctorname')}
                              placeholder="Enter Doctor Name"
                              autoCapitalize="none"
                              label="Doctor Name"
                              errorMessage={errors.doctorname}
                            />
                          </View>
                        </View>

                        <View
                          style={{
                            flex: 1,
                            flexDirection: 'row',
                            justifyContent: 'flex-start',
                          }}>
                          <View style={{width: 120, marginRight: -10}}>
                            <FormInput
                              name="code"
                              value={values.code}
                              onChangeText={handleChange('code')}
                              placeholder="Enter Code"
                              autoCapitalize="none"
                              label="Code"
                              errorMessage={errors.code}
                            />
                          </View>
                          <View
                            style={{
                              flex: 1,
                            }}>
                            <FormInput
                              name="personalcellphoneno"
                              value={values.personalcellphoneno}
                              onChangeText={handleChange('personalcellphoneno')}
                              placeholder="Enter Personal Cell Number"
                              autoCapitalize="none"
                              label="Personal Cell Number"
                              errorMessage={errors.personalcellphoneno}
                            />
                          </View>
                        </View>

                        <FormInput
                          name="personalemail"
                          value={values.personalemail}
                          onChangeText={handleChange('personalemail')}
                          placeholder="Enter Personal Email"
                          autoCapitalize="none"
                          label="Personal Email"
                          errorMessage={errors.personalemail}
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
  blockTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 15,
    marginHorizontal: 10,
    paddingVertical: 10,
    color: fontColor,
    borderBottomWidth: 1,
    borderBottomColor: seperator,
  },
});
