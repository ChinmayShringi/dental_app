import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';

import {common} from '../../../assets/style';

import FormInput from '../../../components/FormInput';
import FormSelectPicker from '../../../components/FormSelectPicker';
import FormRadioButton from '../../../components/FormRadioButton';
import FormDatePicker from '../../../components/FormDatePicker';
import FormTimePicker from '../../../components/FormTimePicker';
import FormTextArea from '../../../components/FormTextArea';

import {NavigationEvents} from 'react-navigation';

import Api from '../../../provider/Api';
import Dataprovider from '../../../provider/Dataprovider';
import Loader from '../../../provider/Loader';

import {Formik} from 'formik';

import moment from 'moment';

import {loggedInUserDetails} from '../../../redux/actions/loggedInUserDetails';
import {connect} from 'react-redux';

class LeadForm extends Component {
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
      salesLeadId:
        typeof this.props.navigation.state.params.salesLeadId !== 'undefined'
          ? parseInt(this.props.navigation.state.params.salesLeadId)
          : 0,
      saleslead: null,
      types: [],
      type: null,
      customers: [],
      customerId: null,
      countries: [],
      countryId: null,
      states: [],
      stateId: null,
      cities: [],
      cityId: null,
      address: '',
      companyName: '',
      slug: '',
      contactPerson: '',
      email: '',
      phoneNo: '',
      gstIn: '',
      leadOn: null,
      leadOnTime: null,
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
    formData.append('salesleadid', this.state.salesLeadId);

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

    if (this.state.salesLeadId === 0) {
      options.api = 'v_1/sales/leads/add';
    } else {
      options.api = 'v_1/sales/leads/edit';
    }

    this.api.callPostApi(options).then(data => {
      this.setState({loading: false});

      if (data.status_code === 200) {
        let responseData = data.response.data;

        let leadOn =
          responseData.saleslead.leadon !== null && this.state.salesLeadId !== 0
            ? moment(responseData.saleslead.leadon)
            : moment();
        let leadOnTime =
          responseData.saleslead.leadon !== null && this.state.salesLeadId !== 0
            ? moment(responseData.saleslead.leadon)
            : moment();

        this.setState({
          saleslead: responseData.saleslead,
          customers: responseData.customers,
          customerId: responseData.saleslead.customerid,
          types: responseData.types,
          type:
            responseData.saleslead.type == null
              ? null
              : parseInt(responseData.saleslead.type),
          leadOn: leadOn,
          leadOnTime: leadOnTime,
          countries: responseData.countries,
          countryId: responseData.saleslead.countryid,
          states: responseData.states,
          stateId: responseData.saleslead.stateid,
          cities: responseData.cities,
          cityId: responseData.saleslead.cityid,
          address:
            responseData.saleslead.address == null
              ? ''
              : responseData.saleslead.address,
          companyName:
            responseData.saleslead.companyname == null
              ? ''
              : responseData.saleslead.companyname,
          slug:
            responseData.saleslead.slug == null
              ? ''
              : responseData.saleslead.slug,
          contactPerson:
            responseData.saleslead.contactperson == null
              ? ''
              : responseData.saleslead.contactperson,
          email:
            responseData.saleslead.email == null
              ? ''
              : responseData.saleslead.email,
          phoneNo:
            responseData.saleslead.phoneno == null
              ? ''
              : responseData.saleslead.phoneno,
          gstIn:
            responseData.saleslead.gstin == null
              ? ''
              : responseData.saleslead.gstin,
          users: responseData.users,
          userId: parseInt(responseData.saleslead.userid),
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
      this.setState({type});
    }
  };

  handleChangeCustomer = customerId => {
    if (this.state.customerId !== customerId) {
      this.setState({
        loading: true,
        customerId: customerId,
        countryId: null,
        states: [],
        stateId: null,
        cities: [],
        cityId: null,
        address: '',
        companyName: '',
        slug: '',
        contactPerson: '',
        email: '',
        phoneNo: '',
        gstIn: '',
        users: [],
      });

      if (parseInt(customerId) > 0) {
        const formData = new FormData();
        formData.append('customerid', parseInt(customerId));

        this.api
          .callPostApi({
            api: 'v_1/sales/leads/get-customer-details',
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
              let customer = responseData.customer;
              this.setState({
                countryId: customer.countryid,
                states: responseData.states,
                stateId: customer.stateid,
                cities: responseData.cities,
                cityId: customer.cityid,
                address: customer.address,
                companyName: customer.name,
                slug: customer.slug,
                contactPerson:
                  customer.doctorname === null ? '' : customer.doctorname,
                email: customer.email === null ? '' : customer.email,
                phoneNo: customer.phoneno === null ? '' : customer.phoneno,
                gstIn: customer.gstin === null ? '' : customer.gstin,
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

  handleChangeUser = userId => {
    if (this.state.userId !== userId) {
      this.setState({userId});
    }
  };

  handleChangeAddress = address => {
    this.setState({
      address: address,
    });
  };

  handleChangeContactPerson = contactPerson => {
    this.setState({
      contactPerson: contactPerson,
    });
  };

  handleChangeEmail = email => {
    this.setState({
      email: email,
    });
  };

  handleChangePhoneNo = phoneNo => {
    this.setState({
      phoneNo: phoneNo,
    });
  };

  handleChangeGstIn = gstIn => {
    this.setState({
      gstIn: gstIn,
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

  handleOnChangeLeadOn = leadOn => {
    this.setState({leadOn});
  };

  handleOnChangeLeadOnTime = leadOnTime => {
    this.setState({leadOnTime});
  };

  handleSubmit = values => {
    let userId = this.props.user !== null ? this.props.user.userid : '';
    if (this.props.user !== null && this.props.user.isdepartmenthead) {
      userId = this.state.userId === null ? '' : this.state.userId;
    }

    const formData = new FormData();
    formData.append(
      'salesleadid',
      this.state.salesLeadId === null ? '' : this.state.salesLeadId,
    );
    formData.append('type', this.state.type === null ? '' : this.state.type);
    formData.append(
      'customerid',
      this.state.customerId === null ? '' : this.state.customerId,
    );
    formData.append('userid', userId);
    formData.append(
      'companyname',
      this.state.companyName === null ? '' : this.state.companyName,
    );
    formData.append('slug', this.state.slug === null ? '' : this.state.slug);
    formData.append(
      'description',
      typeof values.description === 'undefined' ? '' : values.description,
    );
    formData.append(
      'contactperson',
      this.state.contactPerson === null ? '' : this.state.contactPerson,
    );
    formData.append('email', this.state.email === null ? '' : this.state.email);
    formData.append(
      'phoneno',
      this.state.phoneNo === null ? '' : this.state.phoneNo,
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
    formData.append('gstin', this.state.gstIn === null ? '' : this.state.gstIn);
    formData.append(
      'website',
      typeof values.website === 'undefined' ? '' : values.website,
    );
    formData.append(
      'leadon',
      this.state.leadOn === null ? '' : this.state.leadOn.format('YYYY-MM-DD'),
    );
    formData.append(
      'leadontime',
      this.state.leadOnTime === null
        ? ''
        : this.state.leadOnTime.format('HH:mm'),
    );

    let options = {
      api: 'v_1/sales/leads/store',
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
          if (this.state.salesLeadId > 0) {
            // this.props.navigation.push('LeadDetails', { 'salesLeadId': this.state.salesLeadId })
            this.props.navigation.goBack(null);
          } else {
            this.props.navigation.navigate('Leads');
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

    if (
      typeof this.state.customerId === 'undefined' ||
      this.state.customerId === '' ||
      this.state.customerId === null
    ) {
      errors.customerid = 'Please select customer.';
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
      typeof this.state.contactPerson === 'undefined' ||
      this.state.contactPerson === '' ||
      this.state.contactPerson === null
    ) {
      errors.contactperson = 'Please enter contact person.';
    }

    if (
      typeof this.state.email === 'undefined' ||
      this.state.email === '' ||
      this.state.email === null
    ) {
      errors.email = 'Please enter email.';
    }

    if (
      typeof this.state.phoneNo === 'undefined' ||
      this.state.phoneNo === '' ||
      this.state.phoneNo === null
    ) {
      errors.phoneno = 'Please enter phone no.';
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
      typeof this.state.leadOn === 'undefined' ||
      this.state.leadOn === '' ||
      this.state.leadOn === null
    ) {
      errors.leadon = 'Please select scheduled date.';
    }

    if (
      typeof this.state.leadOnTime === 'undefined' ||
      this.state.leadOnTime === '' ||
      this.state.leadOnTime === null
    ) {
      errors.leadontime = 'Please select scheduled time.';
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
                    this.state.saleslead &&
                    typeof this.state.saleslead.description !== 'undefined' &&
                    this.state.saleslead.description !== null
                      ? this.state.saleslead.description
                      : '',
                  website:
                    this.state.saleslead &&
                    typeof this.state.saleslead.website !== 'undefined' &&
                    this.state.saleslead.website !== null
                      ? this.state.saleslead.website
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
                        label="Type"
                        placeholder={{label: 'Select Type', value: ''}}
                        value={this.state.type}
                        onValueChange={this.handleChangeType}
                        items={this.state.types}
                        errors={errors.type}
                      />
                      <FormSelectPicker
                        label="Customer"
                        placeholder={{label: 'Select Customer', value: ''}}
                        value={this.state.customerId}
                        onValueChange={this.handleChangeCustomer}
                        items={this.state.customers}
                        errors={errors.customerid}
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
                        name="leadon"
                        value={this.state.leadOn}
                        onChangeEvent={this.handleOnChangeLeadOn}
                        label="Scheduled Date"
                        errors={errors.leadon}
                        display="spinner"
                      />
                      <FormTimePicker
                        name="leadontime"
                        value={this.state.leadOnTime}
                        onChangeEvent={this.handleOnChangeLeadOnTime}
                        label="Scheduled Time"
                        errors={errors.leadontime}
                        display="spinner"
                      />
                      <FormInput
                        name="contactperson"
                        value={this.state.contactPerson}
                        onChangeText={this.handleChangeContactPerson}
                        placeholder="Enter Contact Person"
                        autoCapitalize="none"
                        label="Contact Person"
                        errorMessage={errors.contactperson}
                      />
                      <FormInput
                        name="email"
                        value={this.state.email}
                        onChangeText={this.handleChangeEmail}
                        placeholder="Enter Email"
                        autoCapitalize="none"
                        label="Email"
                        errorMessage={errors.email}
                      />
                      <FormInput
                        name="phoneno"
                        value={this.state.phoneNo}
                        onChangeText={this.handleChangePhoneNo}
                        placeholder="Enter Phone No."
                        autoCapitalize="none"
                        label="Phone No."
                        errorMessage={errors.phoneno}
                      />
                      <FormInput
                        name="address"
                        value={this.state.address}
                        onChangeText={this.handleChangeAddress}
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
                        name="gstin"
                        value={this.state.gstIn}
                        onChangeText={this.handleChangeGstIn}
                        placeholder="Enter GSTIN"
                        autoCapitalize="none"
                        label="GSTIN"
                        errorMessage={errors.gstin}
                      />
                      <FormInput
                        name="website"
                        value={this.state.website}
                        onChangeText={handleChange('website')}
                        placeholder="Enter Website"
                        autoCapitalize="none"
                        label="Website"
                        errorMessage={errors.website}
                      />
                      <FormTextArea
                        name="description"
                        label="Description"
                        value={values.description}
                        placeholder="Write some description here"
                        rowSpan={3}
                        onChangeText={handleChange('description')}
                        errors={errors.description}
                      />
                    </View>
                  );
                }}
              </Formik>
            </View>
          </ScrollView>
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

export default connect(mapStateToProps, null)(LeadForm);
