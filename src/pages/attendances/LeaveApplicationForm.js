import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Dimensions,
} from 'react-native';

import {
  primaryBlueHexColor,
  primaryHexColor,
  dangerHexColor,
  successHexColor,
  mainBgColor,
} from '../../constants/themeColors';

import {common} from '../../assets/style';

import FormInput from '../../components/FormInput';
import FormButton from '../../components/FormButton';
import FormSelectPicker from '../../components/FormSelectPicker';
import FormRadioButton from '../../components/FormRadioButton';
import FormDatePicker from '../../components/FormDatePicker';
import FormTextArea from '../../components/FormTextArea';
import FormTimePicker from '../../components/FormTimePicker';

import {NavigationEvents} from 'react-navigation';

import Api from '../../provider/Api';
import Dataprovider from '../../provider/Dataprovider';
import Loader from '../../provider/Loader';

import {Formik} from 'formik';

import moment from 'moment';

const screenWidth = Dimensions.get('window').width;

export default class LeaveApplicationForm extends Component {
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
      leaveApplicationId:
        typeof this.props.navigation.state.params.leaveApplicationId !==
        'undefined'
          ? parseInt(this.props.navigation.state.params.leaveApplicationId)
          : 0,
      leaveApplication: null,
      types: [],
      type: null,
      leaveFromDate: null,
      leaveFromTime: null,
      leaveToDate: null,
      leaveToTime: null,
      defaultAttendanceTimes: [],
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
    formData.append('leaveapplicationid', this.state.leaveApplicationId);

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

    if (this.state.leaveApplicationId === 0) {
      options.api = 'v_1/leaveapplications/add';
    } else {
      options.api = 'v_1/leaveapplications/edit';
    }

    this.api.callPostApi(options).then(data => {
      this.setState({loading: false});

      if (data.status_code === 200) {
        let responseData = data.response.data;

        let defaultAttendanceTimes = responseData.defaultattendancetimes;

        let leaveFromDate =
          responseData.leaveapplication.leavefrom !== null &&
          this.state.leaveApplicationId !== 0
            ? moment(
                responseData.leaveapplication.leavefrom,
                'YYYY-MM-DD HH:mm:ss',
              )
            : moment();
        let leaveFromTime =
          responseData.leaveapplication.leavefrom !== null &&
          this.state.leaveApplicationId !== 0
            ? moment(
                responseData.leaveapplication.leavefrom,
                'YYYY-MM-DD HH:mm:ss',
              )
            : moment(defaultAttendanceTimes.checkin, 'HH:mm:ss');

        let leaveToDate =
          responseData.leaveapplication.leaveto !== null &&
          this.state.leaveApplicationId !== 0
            ? moment(
                responseData.leaveapplication.leaveto,
                'YYYY-MM-DD HH:mm:ss',
              )
            : moment();
        let leaveToTime =
          responseData.leaveapplication.leaveto !== null &&
          this.state.leaveApplicationId !== 0
            ? moment(
                responseData.leaveapplication.leaveto,
                'YYYY-MM-DD HH:mm:ss',
              )
            : moment(defaultAttendanceTimes.checkout, 'HH:mm:ss');

        this.setState({
          leaveApplication: responseData.leaveapplication,
          types: responseData.leaveapplicationtypes,
          type:
            responseData.leaveapplication.type == null
              ? null
              : parseInt(responseData.leaveapplication.type),
          leaveFromDate: leaveFromDate,
          leaveFromTime: leaveFromTime,
          leaveToDate: leaveToDate,
          leaveToTime: leaveToTime,
          defaultAttendanceTimes: defaultAttendanceTimes,
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

  handleOnChangeLeaveFromDate = leaveFromDate => {
    this.setState({leaveFromDate});
  };

  handleOnChangeLeaveFromTime = leaveFromTime => {
    this.setState({leaveFromTime});
  };

  handleOnChangeLeaveToDate = leaveFromTo => {
    this.setState({leaveFromTo});
  };

  handleOnChangeLeaveToTime = leaveToTime => {
    this.setState({leaveToTime});
  };

  handleSubmit = values => {
    var leaveFromDate =
      this.state.leaveFromDate === null
        ? ''
        : this.state.leaveFromDate.format('YYYY-MM-DD');
    var leaveFromTime =
      this.state.leaveFromTime === null
        ? ''
        : this.state.leaveFromTime.format('HH:mm:ss');
    var leaveFromDateTime = leaveFromDate + ' ' + leaveFromTime;

    var leaveToDate =
      this.state.leaveToDate === null
        ? ''
        : this.state.leaveToDate.format('YYYY-MM-DD');
    var leaveToTime =
      this.state.leaveToTime === null
        ? ''
        : this.state.leaveToTime.format('HH:mm:ss');
    var leaveToDateTime = leaveToDate + ' ' + leaveToTime;

    const formData = new FormData();
    formData.append(
      'leaveapplicationid',
      this.state.leaveApplicationId === null
        ? ''
        : this.state.leaveApplicationId,
    );
    formData.append('type', this.state.type === null ? '' : this.state.type);
    formData.append('leavefrom', leaveFromDateTime);
    formData.append('leaveto', leaveToDateTime);
    formData.append(
      'reason',
      typeof values.reason === 'undefined' ? '' : values.reason,
    );

    let options = {
      api: 'v_1/leaveapplications/store',
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
          this.props.navigation.goBack(null);
          // if(this.state.leaveApplicationId > 0) {
          //     this.props.navigation.goBack(null);
          // }
          // else {
          //     this.props.navigation.navigate('CollectionCalls');
          // }
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
      errors.type = 'Please select leave type.';
    }

    if (
      typeof this.state.leaveFromDate === 'undefined' ||
      this.state.leaveFromDate === '' ||
      this.state.leaveFromDate === null
    ) {
      errors.leavefromdate = 'Please select leave from date.';
    }

    if (
      typeof this.state.leaveFromTime === 'undefined' ||
      this.state.leaveFromTime === '' ||
      this.state.leaveFromTime === null
    ) {
      errors.leavefromtime = 'Please select leave from time.';
    }

    if (
      typeof this.state.leaveToDate === 'undefined' ||
      this.state.leaveToDate === '' ||
      this.state.leaveToDate === null
    ) {
      errors.leavetodate = 'Please select leave to date.';
    }

    if (
      typeof this.state.leaveToTime === 'undefined' ||
      this.state.leaveToTime === '' ||
      this.state.leaveToTime === null
    ) {
      errors.leavetotime = 'Please select leave to time.';
    }

    if (
      typeof values.reason === 'undefined' ||
      values.reason === '' ||
      values.reason === null
    ) {
      errors.reason = 'Please enter reason.';
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
                    reason:
                      this.state.leaveApplication &&
                      typeof this.state.leaveApplication.reason !==
                        'undefined' &&
                      this.state.leaveApplication.reason !== null
                        ? this.state.leaveApplication.reason
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
                          label="Leave Type"
                          placeholder={{label: 'Select Leave Type', value: ''}}
                          value={this.state.type}
                          onValueChange={this.handleChangeType}
                          items={this.state.types}
                          errors={errors.type}
                        />
                        <View
                          style={{
                            flex: 1,
                            flexDirection: 'row',
                            justifyContent: 'flex-start',
                          }}>
                          <View
                            style={{width: screenWidth / 2, marginRight: -10}}>
                            <FormDatePicker
                              name="leavefromdate"
                              value={this.state.leaveFromDate}
                              onChangeEvent={this.handleOnChangeLeaveFromDate}
                              label="Leave From Date"
                              errors={errors.leavefromdate}
                              display="spinner"
                            />
                          </View>
                          <View
                            style={{
                              flex: 1,
                            }}>
                            <FormTimePicker
                              name="leavefromtime"
                              value={this.state.leaveFromTime}
                              onChangeEvent={this.handleOnChangeLeaveFromTime}
                              label="Leave From Time"
                              errors={errors.leavefromtime}
                              display="spinner"
                            />
                          </View>
                        </View>
                        <View
                          style={{
                            flex: 1,
                            flexDirection: 'row',
                            justifyContent: 'flex-start',
                          }}>
                          <View
                            style={{width: screenWidth / 2, marginRight: -10}}>
                            <FormDatePicker
                              name="leavetodate"
                              value={this.state.leaveToDate}
                              onChangeEvent={this.handleOnChangeLeaveToDate}
                              label="Leave To Date"
                              errors={errors.leavetodate}
                              display="spinner"
                            />
                          </View>
                          <View
                            style={{
                              flex: 1,
                            }}>
                            <FormTimePicker
                              name="leavetotime"
                              value={this.state.leaveToTime}
                              onChangeEvent={this.handleOnChangeLeaveToTime}
                              label="Leave To Time"
                              errors={errors.leavetotime}
                              display="spinner"
                            />
                          </View>
                        </View>
                        <FormTextArea
                          name="reason"
                          label="Reason"
                          value={values.reason}
                          placeholder="Write reason"
                          rowSpan={6}
                          onChangeText={handleChange('reason')}
                          errors={errors.reason}
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


