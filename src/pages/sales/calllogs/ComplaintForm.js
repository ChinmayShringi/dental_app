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
  mainBgColor,
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

import {loggedInUserDetails} from '../../../redux/actions/loggedInUserDetails';
import {connect} from 'react-redux';

class ComplaintForm extends Component {
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
      callLogId:
        typeof this.props.navigation.state.params.callLogId !== 'undefined'
          ? parseInt(this.props.navigation.state.params.callLogId)
          : 0,
      calllog: null,
      orders: [],
      orderId: null,
      customers: [],
      customerId: null,
      // parcelcollecationstatus: [],
      // selectedparcelcollecationstatus: null,
      status: [],
      selectedstatus: null,
      callDateTime: null,
      countries: [],
      countryId: null,
      states: [],
      stateId: null,
      cities: [],
      cityId: null,
      address: '',
      pincode: '',
      users: [],
      userId: null,
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
    formData.append('calllogid', this.state.callLogId);

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

    if (this.state.callLogId === 0) {
      options.api = 'v_1/sales/complaints/add';
    } else {
      options.api = 'v_1/sales/complaints/edit';
    }

    this.api.callPostApi(options).then(data => {
      this.setState({loading: false});

      if (data.status_code === 200) {
        let responseData = data.response.data;

        let callDateTime =
          responseData.calllog.calldatetime !== null &&
          this.state.calllogId !== 0
            ? moment(responseData.calllog.calldatetime)
            : null;

        this.setState({
          calllog: responseData.calllog,
          orders: responseData.orders,
          orderId:
            typeof responseData.calllog.deliveryorderid !== 'undefined'
              ? parseInt(responseData.calllog.deliveryorderid)
              : '',
          customers: responseData.customers,
          customerId: responseData.calllog.customerid,
          // parcelcollecationstatus: responseData.parcelcollecationstatus,
          // selectedparcelcollecationstatus: responseData.calllog.parcelcollecationstatus,
          status: responseData.status,
          selectedstatus: responseData.calllog.status,
          callDateTime: callDateTime,
          countries: responseData.countries,
          countryId: responseData.calllog.countryid,
          states: responseData.states,
          stateId: responseData.calllog.stateid,
          cities: responseData.cities,
          cityId: responseData.calllog.cityid,
          address:
            responseData.calllog.address == null
              ? ''
              : responseData.calllog.address,
          pincode:
            responseData.calllog.pincode == null
              ? ''
              : responseData.calllog.pincode,
          users: responseData.users,
          userId: parseInt(responseData.calllog.userid),
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

  handleChangeOrder = orderId => {
    if (this.state.orderId !== orderId) {
      this.setState({
        loading: true,
        orderId: orderId,
        customerId: null,
        countryId: null,
        states: [],
        stateId: null,
        cities: [],
        cityId: null,
        address: '',
        pincode: '',
        users: [],
      });

      if (parseInt(orderId) > 0) {
        const formData = new FormData();
        formData.append('orderid', parseInt(orderId));

        this.api
          .callPostApi({
            api: 'v_1/sales/complaints/get-order-details',
            method: 'POST',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'multipart/form-data',
            },
            data: formData,
            refreshOn401: true,
          })
          .then(data => {
            this.setState({loading: false});

            if (data.status_code === 200) {
              let responseData = data.response.data;
              this.setState({
                customerId: responseData.customerid,
                countryId: responseData.countryid,
                states: responseData.states,
                stateId: responseData.stateid,
                cities: responseData.cities,
                cityId: responseData.cityid,
                address: responseData.address,
                pincode: responseData.pincode,
                users: responseData.users,
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

  handleChangeCustomer = customerId => {
    if (this.state.customerId !== customerId) {
      this.setState({customerId: customerId});
    }
  };

  handleChangeAddress = address => {
    this.setState({
      address: address,
    });
  };

  handleChangePincode = pincode => {
    this.setState({
      pincode: pincode,
    });
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

  handleChangeUser = userId => {
    if (this.state.userId !== userId) {
      this.setState({userId});
    }
  };

  handleOnChangeCallDateTime = callDateTime => {
    this.setState({callDateTime});
  };

  // handleChangeparcelcollecationstatus = (selectedparcelcollecationstatus, event) => {
  //     this.setState({ selectedparcelcollecationstatus });
  // }

  handleChangestatus = (selectedstatus, event) => {
    this.setState({selectedstatus});
  };

  handleSubmit = values => {
    let userId = this.props.user !== null ? this.props.user.userid : '';
    if (this.props.user !== null && this.props.user.isdepartmenthead) {
      userId = this.state.userId === null ? '' : this.state.userId;
    }

    const formData = new FormData();
    formData.append(
      'calllogid',
      this.state.callLogId === null ? '' : this.state.callLogId,
    );
    formData.append(
      'orderid',
      this.state.orderId === null ? '' : this.state.orderId,
    );
    formData.append(
      'customerid',
      this.state.customerId === null ? '' : this.state.customerId,
    );
    formData.append(
      'address',
      this.state.address === null ? '' : this.state.address,
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
      this.state.pincode === null ? '' : this.state.pincode,
    );
    formData.append('userid', userId);
    formData.append(
      'calldatetime',
      this.state.callDateTime === null
        ? ''
        : this.state.callDateTime.format('YYYY-MM-DD'),
    );
    formData.append(
      'description',
      typeof values.description === 'undefined' ? '' : values.description,
    );
    // formData.append('parcelcollecationstatus', (this.state.selectedparcelcollecationstatus === null) ? 1 : this.state.selectedparcelcollecationstatus);
    formData.append(
      'status',
      this.state.selectedstatus === null ? 1 : this.state.selectedstatus,
    );

    let options = {
      api: 'v_1/sales/complaints/store',
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
          if (this.state.callLogId > 0) {
            this.props.navigation.goBack(null);
          } else {
            this.props.navigation.navigate('Complaints');
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
      typeof this.state.orderId === 'undefined' ||
      this.state.orderId === '' ||
      this.state.orderId === null
    ) {
      errors.orderid = 'Please select order.';
    }

    if (
      typeof this.state.customerId === 'undefined' ||
      this.state.customerId === '' ||
      this.state.customerId === null
    ) {
      errors.customerid = 'Please select customer.';
    }

    if (
      typeof this.state.address === 'undefined' ||
      this.state.address === '' ||
      this.state.address === null
    ) {
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
      typeof this.state.pincode === 'undefined' ||
      this.state.pincode === '' ||
      this.state.pincode === null
    ) {
      errors.pincode = 'Please enter pincode.';
    }

    if (
      this.props.user !== null &&
      this.props.user.isdepartmenthead &&
      (typeof this.state.userId === 'undefined' ||
        this.state.userId === '' ||
        this.state.userId === null)
    ) {
      errors.userid = 'Please select sales person.';
    }

    if (
      typeof this.state.callDateTime === 'undefined' ||
      this.state.callDateTime === '' ||
      this.state.callDateTime === null
    ) {
      errors.userid = 'Please select call date.';
    }

    // if(typeof this.state.selectedparcelcollecationstatus === 'undefined' || this.state.selectedparcelcollecationstatus === '' || this.state.selectedparcelcollecationstatus === null) {
    //     errors.parcelcollecationstatus = 'Please select parcel collection status.';
    // }

    if (
      typeof this.state.selectedstatus === 'undefined' ||
      this.state.selectedstatus === '' ||
      this.state.selectedstatus === null
    ) {
      errors.status = 'Please select status.';
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
                    description:
                      this.state.calllog &&
                      typeof this.state.calllog.description !== 'undefined' &&
                      this.state.calllog.description !== null
                        ? this.state.calllog.description
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
                        <FormSelectPicker
                          label="Order"
                          placeholder={{label: 'Select Order', value: ''}}
                          value={this.state.orderId}
                          onValueChange={this.handleChangeOrder}
                          items={this.state.orders}
                          errors={errors.orderid}
                        />
                        <FormSelectPicker
                          label="Customer"
                          placeholder={{label: 'Select Customer', value: ''}}
                          value={this.state.customerId}
                          onValueChange={this.handleChangeCustomer}
                          items={this.state.customers}
                          disabled={true}
                          errors={errors.customerid}
                        />
                        <FormInput
                          label="Address"
                          placeholder="Enter Address"
                          name="address"
                          value={this.state.address}
                          onChangeText={this.handleChangeAddress}
                          autoCapitalize="none"
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
                          label="Pincode"
                          placeholder="Enter Pincode"
                          name="pincode"
                          value={this.state.pincode}
                          onChangeText={this.handleChangePincode}
                          autoCapitalize="none"
                          errorMessage={errors.pincode}
                        />
                        {this.props.user !== null &&
                        this.props.user.isdepartmenthead ? (
                          <FormSelectPicker
                            label="Sales Person"
                            placeholder={{
                              label: 'Select Sales Person',
                              value: '',
                            }}
                            value={this.state.userId}
                            onValueChange={this.handleChangeUser}
                            items={this.state.users}
                            errors={errors.userid}
                          />
                        ) : null}
                        <FormDatePicker
                          label="Call Date"
                          name="calldatetime"
                          value={this.state.callDateTime}
                          onChangeEvent={this.handleOnChangeCallDateTime}
                          errors={errors.calldatetime}
                          display="spinner"
                        />
                        <FormTextArea
                          label="Description"
                          name="description"
                          value={values.description}
                          placeholder="Write some description here"
                          rowSpan={3}
                          onChangeText={handleChange('description')}
                          errors={errors.description}
                        />
                        {/* <FormRadioButton
                                                    name='parcelcollecationstatus'
                                                    value={this.state.selectedparcelcollecationstatus}
                                                    onPress={this.handleChangeparcelcollecationstatus}
                                                    label="Parcel Collection Status"
                                                    errors={errors.parcelcollecationstatus}
                                                    options={this.state.parcelcollecationstatus}
                                                /> */}
                        <FormRadioButton
                          label="Status"
                          name="status"
                          value={this.state.selectedstatus}
                          onPress={this.handleChangestatus}
                          errors={errors.status}
                          options={this.state.status}
                        />
                      </View>
                    );
                  }}

                  {/* {({ errors, handleChange, values, handleSubmit }) => (
                                        <View style={{margin: 15}}>
                                            <FormSelectPicker
                                                label="Order"
                                                placeholder={{ label: "Select Order", value: ''}}
                                                value={this.state.orderId}
                                                onValueChange={this.handleChangeOrder}
                                                items={this.state.orders}
                                                errors={errors.orderid}
                                            />
                                            <FormSelectPicker
                                                label="Customer"
                                                placeholder={{ label: "Select Customer", value: ''}}
                                                value={this.state.customerId}
                                                onValueChange={this.handleChangeCustomer}
                                                items={this.state.customers}
                                                disabled={true}
                                                errors={errors.customerid}
                                            />
                                            <FormInput
                                                name='address'
                                                value={this.state.address}
                                                onChangeText={this.handleChangeAddress}
                                                placeholder='Enter Address'
                                                autoCapitalize='none'
                                                label="Address"
                                                errorMessage={errors.address}
                                            />
                                            <FormSelectPicker
                                                label="Country"
                                                placeholder={{ label: "Select Country", value: ''}}
                                                value={this.state.countryId}
                                                onValueChange={this.handleChangeCountry}
                                                items={this.state.countries}
                                                errors={errors.countryid}
                                            />
                                            <FormSelectPicker
                                                label="State"
                                                placeholder={{ label: "Select State", value: ''}}
                                                value={this.state.stateId}
                                                onValueChange={this.handleChangeState}
                                                items={this.state.states}
                                                errors={errors.stateid}
                                            />
                                            <FormSelectPicker
                                                label="City"
                                                placeholder={{ label: "Select City", value: ''}}
                                                value={this.state.cityId}
                                                onValueChange={this.handleChangeCity}
                                                items={this.state.cities}
                                                errors={errors.cityid}
                                            />
                                            <FormInput
                                                name='pincode'
                                                value={this.state.pincode}
                                                onChangeText={this.handleChangePincode}
                                                placeholder='Enter Pincode'
                                                autoCapitalize='none'
                                                label="Pincode"
                                                errorMessage={errors.pincode}
                                            />
                                            <FormSelectPicker
                                                label="Sales Person"
                                                placeholder={{ label: "Select Sales Person", value: ''}}
                                                value={this.state.userId}
                                                onValueChange={this.handleChangeUser}
                                                items={this.state.users}
                                                errors={errors.userid}
                                            />
                                            <FormDatePicker
                                                name='calldatetime'
                                                value={this.state.callDateTime}
                                                onChangeEvent={this.handleOnChangeCallDateTime}
                                                label="Call Date"
                                                errors={errors.calldatetime}
                                                display="spinner"
                                            />
                                            <FormTextArea
                                                name='description'
                                                label="Description"
                                                value={values.description}
                                                placeholder="Write some description here"
                                                rowSpan={3}
                                                onChangeText={handleChange('description')}
                                                errors={errors.description}
                                            />
                                            <FormRadioButton
                                                name='parcelcollecationstatus'
                                                value={this.state.selectedparcelcollecationstatus}
                                                onPress={this.handleChangeparcelcollecationstatus}
                                                label="Parcel Collection Status"
                                                errors={errors.parcelcollecationstatus}
                                                options={this.state.parcelcollecationstatus}
                                            />
                                            <View style={styles.buttonContainer}>
                                                <FormButton
                                                    buttonType='solid'
                                                    onPress={handleSubmit}
                                                    title='Save'
                                                    buttonColor={primaryHexColor}
                                                    bgColor={primaryHexColor}
                                                    color='#ffffff'
                                                />
                                            </View>
                                        </View>
                                    )} */}
                </Formik>
              </View>
            </ScrollView>
          </View>
        </View>
      </KeyboardAvoidingView>
    );
  }
}



const mapStateToProps = state => {
  return {
    user: state.loggedInUserDetailsReducer.user,
  };
};

export default connect(mapStateToProps, null)(ComplaintForm);
