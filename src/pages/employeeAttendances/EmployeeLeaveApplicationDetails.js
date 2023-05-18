import React, {Component} from 'react';
import {
  Alert,
  Dimensions,
  KeyboardAvoidingView,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import {
  badgeColorCode,
  common,
  commonLabelDescription,
  modalLayout,
} from '../../assets/style';

import Api from '../../provider/Api';
import Dataprovider from '../../provider/Dataprovider';
import Loader from '../../provider/Loader';

import NotFound from '../../components/NotFound';

import {
  dangerHexColor,
  mainBgColor,
  primaryBlueHexColor,
  successHexColor,
} from '../../constants/themeColors';

// import {MaterialIcons} from '@expo/vector-icons';
import Icon from 'react-native-vector-icons/FontAwesome';

import {Button} from 'native-base';

import {Formik} from 'formik';

import FormTextArea from '../../components/FormTextArea';
import ModalSaveButton from '../../components/ModalSaveButton';

import FlashMessage from 'react-native-flash-message';
import Modal from 'react-native-modal';

import {skeletonPlaceholderProps} from '../../constants/defaultValues';
import SkeletonContent from '../../components/SkeletonContent';

const screenWidth = Dimensions.get('window').width;

export default class EmployeeLeaveApplicationDetails extends Component {
  modalFlashMessageRef = null;

  submitModalForm = null;
  handleSubmitFormModalForHeaderButton = e => {
    if (this.submitModalForm) {
      this.submitModalForm();
    }
  };
  bindSubmitFormToModalHeaderButton = submitForm => {
    this.submitModalForm = submitForm;
  };

  api = new Api();
  dataProvider = new Dataprovider();

  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      refreshing: false,
      transparentLoader: false,
      leaveApplicationId:
        typeof this?.props?.navigation?.state?.params?.leaveApplicationId !==
        'undefined'
          ? parseInt(this?.props?.navigation?.state?.params?.leaveApplicationId)
          : 0,
      leaveApplication: null,

      isRejectModalVisible: false,
    };
  }

  componentDidMount() {
    this.getData();
  }

  reloadPageData = () => {
    this.setState({loading: true}, this.getData);
  };

  getData() {
    let formData = new FormData();
    formData.append('leaveapplicationid', this.state.leaveApplicationId);

    let options = {
      api: 'v_1/employees/leaveapplications/view',
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'multipart/form-data',
      },
      data: formData,
      refreshOn401: true,
    };

    this.api.callPostApi(options).then(data => {
      this.setState({
        loading: false,
        refreshing: false,
      });

      if (data?.status_code === 200) {
        let responseData = data?.response.data;

        this.setState({
          leaveApplication: responseData.leaveapplication,
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

  onRefreshPageData = () => {
    this.setState({refreshing: true}, this.getData);
  };

  approveLeave = () => {
    Alert.alert(
      'Confirmation Required',
      "Are sure you've reviewed details and wanna approve leave request?",
      [
        {
          text: 'Cancel',
          onPress: () => {
            console.log('Cancel CLicked');
          },
          style: 'cancel',
        },
        {
          text: 'Sure, Approve',
          onPress: () => {
            this.setState({transparentLoader: true});

            let formData = new FormData();
            formData.append(
              'leaveapplicationid',
              this.state.leaveApplicationId === null
                ? ''
                : this.state.leaveApplicationId,
            );

            this.api
              .callPostApi({
                api: 'v_1/employees/leaveapplications/approve',
                method: 'POST',
                headers: {
                  Accept: 'application/json',
                  'Content-Type': 'multipart/form-data',
                },
                data: formData,
                refreshOn401: true,
              })
              .then(data => {
                this.setState({transparentLoader: false});

                if (data?.status_code === 200) {
                  let responseData = data?.response.data;
                  this.api.showSuccessMessage(data?.response.message, null);
                  this.setState({
                    leaveApplication: responseData.leaveapplication,
                  });
                } else {
                  let errormessage = null;
                  if (
                    typeof data?.status_code !== 'undefined' &&
                    data?.status_code === 422
                  ) {
                    errormessage = data?.response.data.message;
                  }
                  this.api.showErrorMessage(
                    data?.response.message,
                    errormessage,
                  );
                }
              });
          },
        },
      ],
      {cancelable: false},
    );
  };

  toggleRejectFormModal = () => {
    this.setState({isRejectModalVisible: !this.state.isRejectModalVisible});
  };

  modalFormHandleSubmit = values => {
    const formData = new FormData();
    formData.append(
      'leaveapplicationid',
      this.state.leaveApplicationId === null
        ? ''
        : this.state.leaveApplicationId,
    );
    formData.append('rejectreason', values.rejectreason);

    let options = {
      api: 'v_1/employees/leaveapplications/reject',
      method: 'POST',
      headers: {
        Accept: 'application/json',
      },
      data: formData,
      refreshOn401: true,
    };

    this.setState({transparentLoader: true});

    this.api.callPostApi(options).then(responseData => {
      this.setState({transparentLoader: false});

      if (responseData?.status_code === 200) {
        this.setState({
          leaveApplication: responseData?.response.data.leaveapplication,
        });
        this.api.showSuccessMessageOnRef(
          this.modalFlashMessageRef,
          responseData?.response.message,
          null,
        );
        setTimeout(() => {
          this.toggleRejectFormModal();
        }, 4500);
      } else {
        let errormessage = null;
        if (
          typeof responseData?.status_code !== 'undefined' &&
          responseData?.status_code === 422
        ) {
          errormessage = responseData?.response.data.message;
        }
        this.api.showErrorMessageOnRef(
          this.modalFlashMessageRef,
          responseData?.response.message,
          errormessage,
        );
      }
    });
  };

  modalFormValidate(values) {
    let errors = {};

    if (!values.rejectreason) {
      errors.rejectreason = 'Please enter reason.';
    }

    return errors;
  }

  render() {
    const skeletonLayout = [
      {
        width: 150,
        height: 26,
        borderRadius: 4,
        marginBottom: 15,
      },
      {
        width: 200,
        height: 14,
        borderRadius: 4,
        marginTop: 0,
        marginBottom: 8,
      },
      {
        width: 200,
        height: 14,
        borderRadius: 4,
        marginTop: 0,
        marginBottom: 8,
      },
      {
        width: screenWidth - 50,
        height: 14,
        borderRadius: 4,
        marginBottom: 8,
      },
      {
        width: screenWidth - 50,
        height: 14,
        borderRadius: 4,
        marginBottom: 8,
      },
      {
        width: screenWidth - 50,
        height: 14,
        borderRadius: 4,
        marginBottom: 8,
      },
      {
        width: screenWidth - 60,
        height: 14,
        borderRadius: 4,
        marginBottom: 8,
      },
      {
        width: screenWidth - 50,
        height: 14,
        borderRadius: 4,
        marginBottom: 8,
      },
      {
        width: screenWidth - 50,
        height: 14,
        borderRadius: 4,
        marginBottom: 8,
      },
    ];

    return (
      <View style={{flex: 1, backgroundColor: mainBgColor}}>
        <View style={[common.cardContainer, {padding: 15}]}>
          {/* <NavigationEvents onDidFocus={() => this.getFormData() } /> */}
          <Loader loading={this.state.transparentLoader} />
          <ScrollView
            contentContainerStyle={{flexGrow: 1}}
            refreshControl={
              <RefreshControl
                refreshing={this.state.refreshing}
                onRefresh={this.onRefreshPageData}
              />
            }>
            {/* <View style={common.card}> */}
            <SkeletonContent
              containerStyle={{flex: 1, width: screenWidth.width}}
              layout={skeletonLayout}
              isLoading={this.state.loading}
              duration={skeletonPlaceholderProps.duration}
              animationType={skeletonPlaceholderProps.animationType}
              animationDirection={skeletonPlaceholderProps.animationDirection}
              boneColor={skeletonPlaceholderProps.boneColor}
              highlightColor={skeletonPlaceholderProps.highlightColor}>
              {this.state.leaveApplication !== null && !this.state.loading ? (
                <View>
                  <View>
                    <Text style={commonLabelDescription.blockTitle}>
                      Leave Details
                    </Text>
                    <View
                      style={[
                        commonLabelDescription.listContainer,
                        {marginTop: 5},
                      ]}>
                      <View
                        style={[
                          commonLabelDescription.listLabelContainer,
                          styles.labelContainer,
                        ]}>
                        <Text style={commonLabelDescription.labelText}>
                          Requested By
                        </Text>
                      </View>
                      <View style={commonLabelDescription.listSeperator}>
                        <Text style={commonLabelDescription.labelText}>:</Text>
                      </View>
                      <View style={styles.descriptionContainer}>
                        {this.state.leaveApplication.userid !== '' &&
                        this.state.leaveApplication.userid !== null ? (
                          <Text style={commonLabelDescription.labelValue}>
                            {this.state.leaveApplication.username}
                          </Text>
                        ) : (
                          <Text
                            style={[
                              commonLabelDescription.labelValue,
                              common.mutedTextInItalic,
                            ]}>
                            NA
                          </Text>
                        )}
                      </View>
                    </View>
                    <View
                      style={[
                        commonLabelDescription.listContainer,
                        {marginTop: 5},
                      ]}>
                      <View
                        style={[
                          commonLabelDescription.listLabelContainer,
                          styles.labelContainer,
                        ]}>
                        <Text style={commonLabelDescription.labelText}>
                          Leave Type
                        </Text>
                      </View>
                      <View style={commonLabelDescription.listSeperator}>
                        <Text style={commonLabelDescription.labelText}>:</Text>
                      </View>
                      <View style={styles.descriptionContainer}>
                        {this.state.leaveApplication.type !== '' &&
                        this.state.leaveApplication.type !== null ? (
                          <Text style={commonLabelDescription.labelValue}>
                            {this.state.leaveApplication.typetext}
                          </Text>
                        ) : (
                          <Text
                            style={[
                              commonLabelDescription.labelValue,
                              common.mutedTextInItalic,
                            ]}>
                            NA
                          </Text>
                        )}
                      </View>
                    </View>
                    <View
                      style={[
                        commonLabelDescription.listContainer,
                        {marginTop: 5},
                      ]}>
                      <View
                        style={[
                          commonLabelDescription.listLabelContainer,
                          styles.labelContainer,
                        ]}>
                        <Text style={commonLabelDescription.labelText}>
                          Leave From
                        </Text>
                      </View>
                      <View style={commonLabelDescription.listSeperator}>
                        <Text style={commonLabelDescription.labelText}>:</Text>
                      </View>
                      <View style={styles.descriptionContainer}>
                        {this.state.leaveApplication.leavefrom !== '' &&
                        this.state.leaveApplication.leavefrom !== null ? (
                          <Text style={commonLabelDescription.labelValue}>
                            {this.state.leaveApplication.displayleavefrom}
                          </Text>
                        ) : (
                          <Text
                            style={[
                              commonLabelDescription.labelValue,
                              common.mutedTextInItalic,
                            ]}>
                            NA
                          </Text>
                        )}
                      </View>
                    </View>
                    <View
                      style={[
                        commonLabelDescription.listContainer,
                        {marginTop: 5},
                      ]}>
                      <View
                        style={[
                          commonLabelDescription.listLabelContainer,
                          styles.labelContainer,
                        ]}>
                        <Text style={commonLabelDescription.labelText}>
                          Leave To
                        </Text>
                      </View>
                      <View style={commonLabelDescription.listSeperator}>
                        <Text style={commonLabelDescription.labelText}>:</Text>
                      </View>
                      <View style={styles.descriptionContainer}>
                        {this.state.leaveApplication.leaveto !== '' &&
                        this.state.leaveApplication.leaveto !== null ? (
                          <Text style={commonLabelDescription.labelValue}>
                            {this.state.leaveApplication.displayleaveto}
                          </Text>
                        ) : (
                          <Text
                            style={[
                              commonLabelDescription.labelValue,
                              common.mutedTextInItalic,
                            ]}>
                            NA
                          </Text>
                        )}
                      </View>
                    </View>
                    <View style={[commonLabelDescription.listContainer]}>
                      <View
                        style={[
                          commonLabelDescription.listLabelContainer,
                          styles.labelContainer,
                        ]}>
                        <Text style={commonLabelDescription.labelText}>
                          Reason
                        </Text>
                      </View>
                      <View style={commonLabelDescription.listSeperator}>
                        <Text style={commonLabelDescription.labelText}>:</Text>
                      </View>
                      <View style={styles.descriptionContainer}>
                        {this.state.leaveApplication.reason !== null &&
                        this.state.leaveApplication.reason !== '' ? (
                          <Text style={commonLabelDescription.labelValue}>
                            {this.state.leaveApplication.reason}
                          </Text>
                        ) : (
                          <Text
                            style={[
                              commonLabelDescription.labelValue,
                              common.mutedTextInItalic,
                            ]}>
                            NA
                          </Text>
                        )}
                      </View>
                    </View>
                    <View
                      style={[
                        commonLabelDescription.listContainer,
                        {marginTop: 5},
                      ]}>
                      <View
                        style={[
                          commonLabelDescription.listLabelContainer,
                          styles.labelContainer,
                        ]}>
                        <Text style={commonLabelDescription.labelText}>
                          Status
                        </Text>
                      </View>
                      <View style={commonLabelDescription.listSeperator}>
                        <Text style={commonLabelDescription.labelText}>:</Text>
                      </View>
                      <View style={styles.descriptionContainer}>
                        <Text
                          style={[
                            commonLabelDescription.labelValue,
                            badgeColorCode(
                              this.state.leaveApplication.statuscolor,
                            ),
                          ]}>
                          {this.state.leaveApplication.statustext}
                        </Text>
                      </View>
                    </View>
                    {this.state.leaveApplication.status === 0 ? (
                      <View style={commonLabelDescription.listContainer}>
                        <View
                          style={[
                            commonLabelDescription.listLabelContainer,
                            styles.labelContainer,
                          ]}>
                          <Text style={commonLabelDescription.labelText}>
                            Rejection Reason
                          </Text>
                        </View>
                        <View style={commonLabelDescription.listSeperator}>
                          <Text style={commonLabelDescription.labelText}>
                            :
                          </Text>
                        </View>
                        <View style={styles.descriptionContainer}>
                          {this.state.leaveApplication.rejectreason !== null &&
                          this.state.leaveApplication.rejectreason !== '' ? (
                            <Text style={commonLabelDescription.labelValue}>
                              {this.state.leaveApplication.rejectreason}
                            </Text>
                          ) : (
                            <Text
                              style={[
                                commonLabelDescription.labelValue,
                                common.mutedTextInItalic,
                              ]}>
                              NA
                            </Text>
                          )}
                        </View>
                      </View>
                    ) : null}
                    {this.state.leaveApplication.status === 2 ? (
                      <View style={styles.buttonBlock}>
                        <View style={styles.buttonContainer}>
                          <Button
                            block
                            iconLeft
                            rounded
                            style={{backgroundColor: successHexColor}}
                            onPress={this.approveLeave}>
                            <Icon name="check" style={styles.buttonIconStyle} />
                            <Text style={styles.buttonTextStyle}>Approve</Text>
                          </Button>
                        </View>
                        <View style={styles.buttonContainer}>
                          <Button
                            block
                            iconLeft
                            rounded
                            style={{backgroundColor: dangerHexColor}}
                            onPress={this.toggleRejectFormModal}>
                            <Icon name="close" style={styles.buttonIconStyle} />
                            <Text style={styles.buttonTextStyle}>Reject</Text>
                          </Button>
                        </View>
                      </View>
                    ) : null}
                  </View>
                  <Modal
                    isVisible={this.state.isRejectModalVisible}
                    onBackButtonPress={this.toggleRejectFormModal}
                    backdropOpacity={0.5}
                    style={modalLayout.modalContainer}
                    animationInTiming={500}
                    animationOutTiming={500}
                    // onModalWillShow={this.getFormData}
                    // onModalHide={this.resetFormData}
                  >
                    <Loader loading={this.state.transparentLoader} />
                    <View style={modalLayout.body}>
                      <View style={modalLayout.header}>
                        {/* <MaterialIcons
                          name="close"
                          size={28}
                          style={modalLayout.headerMenuicon}
                          onPress={this.toggleJobFormModal}
                        /> */}
                        <View>
                          <Text style={modalLayout.headertext}>
                            Reject Leave Request
                          </Text>
                        </View>
                        <ModalSaveButton
                          buttonType="solid"
                          onPress={this.handleSubmitFormModalForHeaderButton}
                          title="Save"
                          buttonColor={primaryBlueHexColor}
                          bgColor={primaryBlueHexColor}
                          color="#ffffff"
                        />
                      </View>
                      {this.state.selectedModalObject !== null ? (
                        <View style={{flex: 1}}>
                          <KeyboardAvoidingView
                            style={{flex: 1, flexDirection: 'column'}}
                            behavior={'padding'}
                            enabled
                            keyboardVerticalOffset={100}>
                            <View style={modalLayout.bodyContent}>
                              <ScrollView>
                                <View style={common.formElementsContainer}>
                                  <Formik
                                    enableReinitialize={true}
                                    validate={this.modalFormValidate}
                                    initialValues={{
                                      rejectreason: '',
                                    }}
                                    onSubmit={this.modalFormHandleSubmit}>
                                    {formikProps => {
                                      const {
                                        values,
                                        handleChange,
                                        handleSubmit,
                                        errors,
                                      } = formikProps;

                                      // BIND SUBMISSION HANDLER REMOTLY FOR HEADER SAVE BUTTON
                                      this.bindSubmitFormToModalHeaderButton(
                                        formikProps.submitForm,
                                      );

                                      return (
                                        <View>
                                          <FormTextArea
                                            name="rejectreason"
                                            label="Reason"
                                            value={values.rejectreason}
                                            placeholder="Enter rejection reason"
                                            rowSpan={8}
                                            onChangeText={handleChange(
                                              'rejectreason',
                                            )}
                                            errors={errors.rejectreason}
                                          />
                                        </View>
                                      );
                                    }}
                                  </Formik>
                                </View>
                              </ScrollView>
                            </View>
                          </KeyboardAvoidingView>
                        </View>
                      ) : null}
                    </View>
                    <FlashMessage
                      ref={modalFlashMessageRef =>
                        (this.modalFlashMessageRef = modalFlashMessageRef)
                      }
                      position="top"
                    />
                  </Modal>
                </View>
              ) : (
                <NotFound onPress={this.reloadPageData} />
              )}
            </SkeletonContent>
            {/* </View> */}
          </ScrollView>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  blockTitle: {
    fontSize: 17,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  labelContainer: {
    width: 100,
  },
  descriptionContainer: {
    width: screenWidth - 140,
  },
  buttonBlock: {
    flex: 1,
    flexDirection: 'row',
    marginTop: 30,
    marginBottom: 10,
    marginLeft: -5,
    marginRight: -5,
  },
  buttonContainer: {
    flex: 1,
    marginHorizontal: 5,
  },
  buttonStyle: {},
  buttonIconStyle: {
    fontSize: 20,
    color: '#fff',
  },
  buttonTextStyle: {
    marginLeft: 5,
    color: '#fff',
    fontWeight: 'bold',
  },
});
