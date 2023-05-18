import React, {Component} from 'react';
import {KeyboardAvoidingView, ScrollView, View} from 'react-native';

import {mainBgColor} from '../../../constants/themeColors';

import {common} from '../../../assets/style';

import FormDatePicker from '../../../components/FormDatePicker';
import FormSelectPicker from '../../../components/FormSelectPicker';
import FormTextArea from '../../../components/FormTextArea';
import FormTimePicker from '../../../components/FormTimePicker';

import Api from '../../../provider/Api';
import Dataprovider from '../../../provider/Dataprovider';
import Loader from '../../../provider/Loader';

import {Formik} from 'formik';

import moment from 'moment';

export default class CustomerCollectionCallForm extends Component {
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
        typeof this?.props?.navigation?.state?.params?.callLogId !== 'undefined'
          ? parseInt(this?.props?.navigation?.state?.params?.callLogId)
          : 0,
      calllog: null,
      typeOfWorks: [],
      typeOfWork: null,
      pickupDate: null,
      pickupTime: null,
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
      options.api = 'v_1/customers/collection-calls/add';
    } else {
      options.api = 'v_1/customers/collection-calls/edit';
    }

    this.api.callPostApi(options).then(data => {
      this.setState({loading: false});

      if (data?.status_code === 200) {
        let responseData = data?.response.data;

        let pickupDate =
          responseData.calllog.pickupdate !== null && this.state.calllogId !== 0
            ? moment(responseData.calllog.pickupdate)
            : null;
        let pickupTime =
          responseData.calllog.pickuptime !== null && this.state.callLogId !== 0
            ? moment(responseData.calllog.pickuptime)
            : moment();

        this.setState({
          calllog: responseData.calllog,
          pickupDate: pickupDate,
          pickupTime: pickupTime,
          typeOfWorks: responseData.typeofworks,
          typeOfWork:
            responseData.calllog.typeofwork == null
              ? null
              : parseInt(responseData.calllog.typeofwork),
        });
      } else {
        let errormessage = null;
        if (
          typeof data?.status_code !== 'undefined' &&
          data?.status_code === 422
        ) {
          errormessage = data?.response.data.message;
        }
        this.api.showErrorMessage(data?.response.message, errormessage);
      }
    });
  }

  handleChangeTypeOfWork = typeOfWork => {
    if (this.state.typeOfWork !== typeOfWork) {
      this.setState({typeOfWork});
    }
  };

  handleOnChangePickUpDate = pickupDate => {
    this.setState({pickupDate});
  };

  handleOnChangePickupTime = pickupTime => {
    this.setState({pickupTime});
  };

  handleSubmit = values => {
    const formData = new FormData();
    formData.append(
      'calllogid',
      this.state.callLogId === null ? '' : this.state.callLogId,
    );
    formData.append(
      'typeofwork',
      this.state.typeOfWork === null ? '' : this.state.typeOfWork,
    );
    formData.append(
      'pickupdate',
      this.state.pickupDate === null
        ? ''
        : this.state.pickupDate.format('YYYY-MM-DD'),
    );
    formData.append(
      'pickuptime',
      this.state.pickupTime === null
        ? ''
        : this.state.pickupTime.format('HH:mm'),
    );
    formData.append(
      'description',
      typeof values.description === 'undefined' ? '' : values.description,
    );

    let options = {
      api: 'v_1/customers/collection-calls/store',
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

      if (responseData?.status_code === 200) {
        this.api.showSuccessMessage(responseData?.response.message, null);
        setTimeout(() => {
          this.props.navigation.navigate('CustomerCollectionCalls');
        }, 4500);
      } else {
        let errormessage = null;
        if (
          typeof responseData?.status_code !== 'undefined' &&
          responseData?.status_code === 422
        ) {
          errormessage = responseData?.response.data.message;
        }
        this.api.showErrorMessage(responseData?.response.message, errormessage);
      }
    });
  };

  validate(values) {
    let errors = {};

    if (
      typeof this.state.typeOfWork === 'undefined' ||
      this.state.typeOfWork === '' ||
      this.state.typeOfWork === null
    ) {
      errors.typeofwork = 'Please select type of work.';
    }

    if (
      typeof this.state.pickupDate === 'undefined' ||
      this.state.pickupDate === '' ||
      this.state.pickupDate === null
    ) {
      errors.userid = 'Please select pickup date.';
    }

    if (
      typeof this.state.pickupTime === 'undefined' ||
      this.state.pickupTime === '' ||
      this.state.pickupTime === null
    ) {
      errors.pickuptime = 'Please select pickup time.';
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
                          label="Type of Work"
                          placeholder={{
                            label: 'Select Type of Work',
                            value: '',
                          }}
                          value={this.state.typeOfWork}
                          onValueChange={this.handleChangeTypeOfWork}
                          items={this.state.typeOfWorks}
                          errors={errors.typeofwork}
                        />
                        <FormDatePicker
                          name="pickupdate"
                          value={this.state.pickupDate}
                          onChangeEvent={this.handleOnChangePickUpDate}
                          label="Pickup Date"
                          errors={errors.pickupdate}
                          display="spinner"
                        />
                        <FormTimePicker
                          name="pickuptime"
                          value={this.state.pickupTime}
                          onChangeEvent={this.handleOnChangePickupTime}
                          label="Pickup Time"
                          errors={errors.pickuptime}
                          display="spinner"
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
