import React, {Component} from 'react';
import {KeyboardAvoidingView, ScrollView, View} from 'react-native';

import {common} from '../../../assets/style';
import Api from '../../../provider/Api';
import Dataprovider from '../../../provider/Dataprovider';
import Loader from '../../../provider/Loader';

import FormInput from '../../../components/FormInput';

import {Formik} from 'formik';

import {mainBgColor} from '../../../constants/themeColors';

export default class CustomerChangePassword extends Component {
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
      loading: false,
    };

    this.validate = this.validate.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    this.props.navigation.setParams({
      handleSave: this.handleSubmitFormForHeaderButton,
    });
  }

  handleSubmit = (values, {setSubmitting, setErrors, setStatus, resetForm}) => {
    const formData = new FormData();
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

    let options = {
      api: 'v_1/customers/change-password/store',
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
        resetForm({});
        setStatus({success: true});
        this.api.showSuccessMessage(responseData.response.message, null);
        setTimeout(() => {
          this.props.navigation.navigate('CustomerDashboard');
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

    if (!values.oldpassword) {
      errors.oldpassword = 'Please enter old password.';
    }

    if (!values.password) {
      errors.password = 'Please enter new password.';
    }

    if (!values.password_confirmation) {
      errors.password_confirmation = 'Please enter confirm password.';
    } else if (values.password !== values.password_confirmation) {
      errors.password_confirmation = 'Password mismatch.';
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
            {/* <NavigationEvents onDidFocus={() => this.getEditProfileData() } /> */}
            <Loader loading={this.state.loading} />
            <ScrollView>
              <View style={common.formElementsContainer}>
                <Formik
                  enableReinitialize={true}
                  validate={this.validate}
                  initialValues={{
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
