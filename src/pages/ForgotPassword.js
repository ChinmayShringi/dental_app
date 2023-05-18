import React, {Component} from 'react';
import {
  ImageBackground,
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  Platform,
  KeyboardAvoidingView,
} from 'react-native';

import Logo from '../components/Logo';
import Api from '../provider/Api';
import Dataprovider from '../provider/Dataprovider';
// import { withNavigation } from 'react-navigation';
import Loader from '../provider/Loader';
import Modal from 'react-native-modal';
import {login, common} from '../assets/style';
// import {MaterialIcons} from '@expo/vector-icons';
import Icon from 'react-native-vector-icons/FontAwesome';

import {Formik} from 'formik';
import FormIconInput from '../components/FormIconInput';
import FormButton from '../components/FormButton';

import {Button} from 'react-native-elements';

import {
  textMutedColor,
  backgroundGrey,
  primaryPurpleHexColor,
} from '../constants/themeColors';

export default class ForgotPassword extends Component {
  api = new Api();
  dataProvider = new Dataprovider();

  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      isShowSuccessModal: false,
    };

    this.validate = this.validate.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  toggleSuccessModal = () => {
    this.setState({isShowSuccessModal: !this.state.isShowSuccessModal});
  };

  handleSubmit = values => {
    setTimeout(() => {
      const formData = new FormData();
      formData.append(
        'email',
        typeof values.email === 'undefined' ? '' : values.email,
      );

      let options = {
        api: 'v_1/forgot-password',
        method: 'POST',
        headers: {
          Accept: 'application/json',
        },
        data: formData,
      };

      this.setState({loading: true});

      this.api.callApi(options).then(responseData => {
        this.setState({loading: false});

        if (responseData?.status_code === 200) {
          this.setState({
            isShowSuccessModal: true,
          });
        } else {
          let errormessage = null;
          if (
            typeof responseData?.status_code !== 'undefined' &&
            responseData?.status_code === 422
          ) {
            errormessage = responseData?.response.data.message;
          }
          this.api.showErrorMessage(
            responseData?.response.message,
            errormessage,
          );
        }
      });
    });
  };

  validate(values) {
    let errors = {};

    let emailValid = values.email.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
    if (!values.email) {
      errors.email = 'Please enter your email address.';
    } else if (!emailValid) {
      errors.email = 'Please enter a valid email address.';
    }

    return errors;
  }

  render() {
    return (
      <KeyboardAvoidingView
        style={{flex: 1, flexDirection: 'column'}}
        behavior={Platform.OS == 'ios' ? 'padding' : 'padding'}
        enabled
        keyboardVerticalOffset={0}>
        <View style={common.container}>
          <ImageBackground
            source={require('../images/bg-images/bg-1.png')}
            style={login.imageBg}>
            <Loader loading={this.state.loading} />
            <View style={login.formwrap}>
              <Logo />
              <Text style={login.logoText}>Forgot Your Password?</Text>
              <Text
                style={{
                  fontSize: 12,
                  textAlign: 'center',
                  color: textMutedColor,
                  paddingHorizontal: 0,
                }}>
                Enter your email address and we will send you new password.
              </Text>

              <View style={{width: 260, marginTop: 30}}>
                <Formik
                  enableReinitialize={true}
                  validate={this.validate}
                  initialValues={{
                    email: '',
                  }}
                  onSubmit={this.handleSubmit}>
                  {({errors, handleChange, values, handleSubmit}) => (
                    <View>
                      <View
                        style={
                          {
                            // marginBottom: 5
                          }
                        }>
                        <FormIconInput
                          name="email"
                          value={values.email}
                          onChangeText={handleChange('email')}
                          placeholder="Email"
                          autoCapitalize="none"
                          iconName="envelope"
                          errorMessage={errors.email}
                        />
                      </View>
                      <View style={{}}>
                        <FormButton
                          buttonType="solid"
                          onPress={handleSubmit}
                          title="Send New Password"
                          buttonColor={primaryPurpleHexColor}
                          bgColor={primaryPurpleHexColor}
                          color="#ffffff"
                        />
                      </View>
                    </View>
                  )}
                </Formik>
                <View>
                  <TouchableOpacity
                    onPress={() => {
                      this.props.navigation.navigate('Login');
                    }}>
                    {/* <Text style={[{ fontSize: 12, textAlign: 'center', marginTop: 8, marginBottom: 8, color: textMutedColor}]}> 
                                            Back to login page
                                        </Text> */}
                    <Text
                      style={[
                        {
                          fontSize: 12,
                          textAlign: 'center',
                          marginTop: 8,
                          marginBottom: 8,
                          color: textMutedColor,
                        },
                      ]}>
                      Remember password?
                      <Text style={[common.linkText]}>&nbsp;Back to Login</Text>
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
            <Modal
              isVisible={this.state.isShowSuccessModal}
              onBackButtonPress={this.toggleSuccessModal}
              backdropOpacity={0.5}
              style={styles.modalContainer}
              animationInTiming={500}
              animationOutTiming={500}>
              <View style={styles.modalBody}>
                {/* <MaterialIcons
                  name="close"
                  size={28}
                  style={styles.closeButton}
                  onPress={this.toggleSuccessModal}
                /> */}
                <View style={styles.bodyContent}>
                  <View style={styles.contentContainer}>
                    <Icon
                      name="check-circle-o"
                      size={130}
                      style={{
                        color: '#57b36c',
                      }}
                    />
                    <Text style={styles.errortTitle}>Request Success!</Text>
                    <Text style={styles.errortDescription}>
                      We've generated a new password regarding your request and
                      sent you in an email.
                    </Text>
                    <Text style={styles.errortDescription}>
                      You can use that password to login in to the app.
                    </Text>
                    <Text style={styles.errortDescription}>
                      You can also set the password of your choice using "Edit
                      Profile / Change Password" feature from the app after
                      logging in to the app using the newly generated password.
                    </Text>
                    <View style={styles.reloadButtonContainer}>
                      <Button
                        onPress={() => {
                          this.toggleSuccessModal();
                          this.props.navigation.navigate('Login');
                        }}
                        icon={
                          <Icon
                            name="arrow-left"
                            size={15}
                            color="white"
                            style={{marginRight: 10, marginTop: 2}}
                          />
                        }
                        title="Back to login screen"
                        buttonStyle={{
                          minWidth: 200,
                          backgroundColor: primaryPurpleHexColor,
                          borderRadius: 4,
                        }}
                      />
                    </View>
                  </View>
                </View>
              </View>
            </Modal>
          </ImageBackground>
        </View>
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  modalContainer: {
    margin: 15,
    backgroundColor: backgroundGrey,
    position: 'relative',
    borderRadius: 10,
  },
  modalBody: {
    flex: 1,
    backgroundColor: backgroundGrey,
    position: 'relative',
    borderRadius: 10,
  },
  bodyContent: {
    backgroundColor: backgroundGrey,
    flex: 1,
    borderRadius: 10,
  },
  closeButton: {
    textAlign: 'right',
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 15,
  },
  errortTitle: {
    textAlign: 'center',
    fontSize: 22,
    fontWeight: '600',
    color: '#555',
    marginTop: 15,
  },
  errortDescription: {
    textAlign: 'center',
    fontSize: 14,
    color: textMutedColor,
    marginVertical: 10,
  },
  reloadButtonContainer: {
    marginTop: 50,
  },
});
