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

import FormSelectPicker from '../../../components/FormSelectPicker';
import FormTextArea from '../../../components/FormTextArea';

import {NavigationEvents} from 'react-navigation';

import Api from '../../../provider/Api';
import Dataprovider from '../../../provider/Dataprovider';
import Loader from '../../../provider/Loader';

import {Formik} from 'formik';

import moment from 'moment';

export default class CustomerComplaintForm extends Component {
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
      options.api = 'v_1/customers/complaints/add';
    } else {
      options.api = 'v_1/customers/complaints/edit';
    }

    this.api.callPostApi(options).then(data => {
      this.setState({loading: false});

      if (data.status_code === 200) {
        let responseData = data.response.data;

        this.setState({
          calllog: responseData.calllog,
          orders: responseData.orders,
          orderId:
            typeof responseData.calllog.deliveryorderid !== 'undefined'
              ? parseInt(responseData.calllog.deliveryorderid)
              : '',
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
      this.setState({orderId});
    }
  };

  handleSubmit = values => {
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
      'description',
      typeof values.description === 'undefined' ? '' : values.description,
    );

    let options = {
      api: 'v_1/customers/complaints/store',
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
          this.props.navigation.navigate('CustomerComplaints');
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
        </View>
      </KeyboardAvoidingView>
    );
  }
}


