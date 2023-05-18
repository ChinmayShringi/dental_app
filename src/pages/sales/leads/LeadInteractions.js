import React, {Component} from 'react';
import {
  Dimensions,
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import {Badge, Fab} from 'native-base';

import {badgeCssXs, common, modalLayout} from '../../../assets/style';

import {
  backgroundGrey,
  fontColor,
  mainBgColor,
  primaryBlueHexColor,
  seperator,
  textMutedColor,
} from '../../../constants/themeColors';

import Api from '../../../provider/Api';
import Dataprovider from '../../../provider/Dataprovider';
import Loader from '../../../provider/Loader';

import ModalSaveButton from '../../../components/ModalSaveButton';
import NoRecordsFound from '../../../components/NoRecordsFound';

import FormDatePicker from '../../../components/FormDatePicker';
import FormRadioButton from '../../../components/FormRadioButton';
import FormSelectPicker from '../../../components/FormSelectPicker';
import FormTextArea from '../../../components/FormTextArea';
import FormTimePicker from '../../../components/FormTimePicker';

import {Formik} from 'formik';
import moment from 'moment';

import Timeline from 'react-native-timeline-flatlist';

import Modal from 'react-native-modal';

// import {MaterialIcons} from '@expo/vector-icons';

import FlashMessage from 'react-native-flash-message';

import Icon from 'react-native-vector-icons/FontAwesome';

import {skeletonPlaceholderProps} from '../../../constants/defaultValues';
import SkeletonContent from '../../../components/SkeletonContent';

const screenWidth = Dimensions.get('window').width;

export default class LeadInteractions extends Component {
  modalFlashMessageRef = null;

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

    this.onEventPress = this.onEventPress.bind(this);
    this.renderDetail = this.renderDetail.bind(this);

    this.state = {
      loading: true,
      salesLeadId:
        typeof this.props.navigation
          .dangerouslyGetParent()
          .getParam('salesLeadId') !== 'undefined'
          ? parseInt(
              this.props.navigation
                .dangerouslyGetParent()
                .getParam('salesLeadId'),
            )
          : 0,
      saleslead: null,
      data: [],

      // MODAL AND FORM RELATED STATES
      isInteractionFormModalVisible: false,
      salesLeadInteraction: null,
      interactionModes: [],
      interactionMode: null,
      interactionOn: null,
      interactionOnTime: null,
      followedUpOn: null,
      followedUpOnTime: null,
      status: [],
      selectedStatus: null,
      isFollowUpDisabled: true,
    };

    this.validate = this.validate.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    this.getData();
  }

  reloadPageData = () => {
    this.setState(
      {
        loading: true,
      },
      this.getData,
    );
  };

  getData() {
    const formData = new FormData();
    formData.append('search', '');
    formData.append('salesleadid', this.state.salesLeadId);

    let options = {
      api: 'v_1/sales/lead-interactions/load',
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'multipart/form-data',
      },
      data: formData,
      refreshOn401: true,
    };

    this.api.callPostApi(options).then(data => {
      this.setState({loading: false});

      if (data?.status_code === 200) {
        let responseData = data?.response.data;

        this.setState({
          saleslead: responseData.saleslead,
          data: responseData.leadinteractions,
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

  toggleInteractionFormModal = () => {
    this.setState({
      isInteractionFormModalVisible: !this.state.isInteractionFormModalVisible,
    });
  };

  onEventPress(data) {
    console.log(data);
  }

  renderDetail(rowData, sectionID, rowID) {
    let title = <Text style={[styles.title]}>{rowData.title}</Text>;
    var desc = null;
    if (rowData.description)
      desc = (
        <View style={styles.descriptionContainer}>
          <Text style={[styles.textDescription]}>{rowData.description}</Text>
        </View>
      );

    return (
      <View style={styles.dataContainer}>
        {title}
        {desc}
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            paddingVertical: 5,
            paddingHorizontal: 10,
          }}>
          <Badge style={badgeCssXs(rowData.statustextcolor)}>
            <Text style={common.bagdeTextXs}>{rowData.statustext}</Text>
          </Badge>
          {rowData.status === 4 ? (
            <Text style={{fontSize: 12}}>
              on{' '}
              <Text style={[{color: fontColor}, common.fontBold]}>
                {rowData.followedupondisplaydate}
              </Text>
            </Text>
          ) : null}
        </View>
      </View>
    );
  }

  getFormData = () => {
    setTimeout(() => {
      this.setState({loading: true});

      const formData = new FormData();
      formData.append('salesleadid', this.state.salesLeadId);

      let options = {
        api: 'v_1/sales/lead-interactions/add',
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'multipart/form-data',
        },
        data: formData,
        refreshOn401: true,
      };

      this.api.callPostApi(options).then(data => {
        this.setState({loading: false});

        if (data?.status_code === 200) {
          let responseData = data?.response.data;

          let interactionOn =
            typeof responseData.salesleadinteraction.interactionon !==
              'undefined' &&
            responseData.salesleadinteraction.interactionon !== null
              ? moment(responseData.salesleadinteraction.interactionon)
              : moment();
          let interactionOnTime =
            typeof responseData.salesleadinteraction.interactionon !==
              'undefined' &&
            responseData.salesleadinteraction.interactionon !== null
              ? moment(responseData.salesleadinteraction.interactionon)
              : moment();

          let followedUpOn =
            typeof responseData.salesleadinteraction.followedupon !==
              'undefined' &&
            responseData.salesleadinteraction.followedupon !== null
              ? moment(responseData.salesleadinteraction.followedupon)
              : moment();
          let followedUpOnTime =
            typeof responseData.salesleadinteraction.followedupon !==
              'undefined' &&
            responseData.salesleadinteraction.followedupon !== null
              ? moment(responseData.salesleadinteraction.followedupon)
              : moment();

          this.setState({
            salesLeadInteraction: responseData.salesleadinteraction,
            interactionModes: responseData.salesleadintercationmode,
            interactionMode: null,
            interactionOn: interactionOn,
            interactionOnTime: interactionOnTime,
            followedUpOn: followedUpOn,
            followedUpOnTime: followedUpOnTime,
            status: responseData.salesleadintercationstatus,
            selectedStatus:
              typeof responseData.salesleadinteraction.status !== 'undefinded'
                ? responseData.salesleadinteraction.status
                : null,
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
    });
  };

  resetFormData = () => {
    this.setState({
      salesLeadInteraction: null,
      interactionModes: [],
      interactionMode: null,
      interactionOn: null,
      interactionOnTime: null,
      followedUpOn: null,
      followedUpOnTime: null,
      status: [],
      selectedStatus: null,
    });
  };

  handleChangeInteractionMode = (interactionMode, event) => {
    // if(this.state.gender !== gender) {
    //     this.setState({
    //         gender: gender
    //     });
    // }
    this.setState({interactionMode});
  };

  handleChangeInteractionStatus = selectedStatus => {
    if (this.state.selectedStatus !== selectedStatus) {
      this.setState({selectedStatus});
      if (selectedStatus === 4) {
        this.setState({
          isFollowUpDisabled: false,
        });
      } else {
        this.setState({
          isFollowUpDisabled: true,
          followedUpOn: null,
          followedUpOnTime: null,
        });
      }
    }
  };

  handleOnChangeInteractionOn = interactionOn => {
    this.setState({interactionOn});
  };

  handleOnChangeInteractionOnTime = interactionOnTime => {
    this.setState({interactionOnTime});
  };

  handleOnChangeFollowUpOn = followedUpOn => {
    this.setState({followedUpOn});
  };

  handleOnChangeFollowUpOnTime = followedUpOnTime => {
    this.setState({followedUpOnTime});
  };

  handleSubmit = values => {
    const formData = new FormData();
    formData.append(
      'salesleadid',
      this.state.salesLeadId === null ? '' : this.state.salesLeadId,
    );
    formData.append('salesleadinteractionid', 0);
    formData.append(
      'description',
      typeof values.description === 'undefined' ? '' : values.description,
    );
    formData.append(
      'interactionmode',
      this.state.interactionMode === null ? '' : this.state.interactionMode,
    );
    formData.append(
      'interactionon',
      this.state.interactionOn === null
        ? ''
        : this.state.interactionOn.format('YYYY-MM-DD'),
    );
    formData.append(
      'interactionontime',
      this.state.interactionOnTime === null
        ? ''
        : this.state.interactionOnTime.format('HH:mm'),
    );
    formData.append(
      'followedupon',
      this.state.followedUpOn === null
        ? ''
        : this.state.followedUpOn.format('YYYY-MM-DD'),
    );
    formData.append(
      'followedupontime',
      this.state.followedUpOnTime === null
        ? ''
        : this.state.followedUpOnTime.format('HH:mm'),
    );
    formData.append(
      'status',
      this.state.selectedStatus === null ? '' : this.state.selectedStatus,
    );

    let options = {
      api: 'v_1/sales/lead-interactions/store',
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
        this.api.showSuccessMessageOnRef(
          this.modalFlashMessageRef,
          responseData?.response.message,
          null,
        );
        setTimeout(() => {
          this.toggleInteractionFormModal();
          this.reloadPageData();
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

  validate(values) {
    let errors = {};

    if (
      typeof this.state.interactionMode === 'undefined' ||
      this.state.interactionMode === '' ||
      this.state.interactionMode === null
    ) {
      errors.interactionmode = 'Please select status.';
    }

    if (
      typeof this.state.selectedStatus === 'undefined' ||
      this.state.selectedStatus === '' ||
      this.state.selectedStatus === null
    ) {
      errors.status = 'Please select status.';
    }

    if (
      typeof this.state.interactionOn === 'undefined' ||
      this.state.interactionOn === '' ||
      this.state.interactionOn === null
    ) {
      errors.interactionon = 'Please select interaction date.';
    }

    if (
      typeof this.state.interactionOnTime === 'undefined' ||
      this.state.interactionOnTime === '' ||
      this.state.interactionOnTime === null
    ) {
      errors.interactionontime = 'Please select interaction time.';
    }

    if (
      typeof this.state.selectedStatus !== 'undefined' &&
      this.state.selectedStatus === '' &&
      this.state.selectedStatus === null
    ) {
      if (
        typeof this.state.followedUpOn === 'undefined' ||
        this.state.followedUpOn === '' ||
        this.state.followedUpOn === null
      ) {
        errors.followedupon = 'Please select follow up date.';
      }

      if (
        typeof this.state.followedUpOnTime === 'undefined' ||
        this.state.followedUpOnTime === '' ||
        this.state.followedUpOnTime === null
      ) {
        errors.followedupdatetime = 'Please select follow up time.';
      }
    }

    if (!values.description) {
      errors.description = 'Please enter notes.';
    }

    return errors;
  }

  render() {
    const skeletonLayout = [
      {
        width: 2,
        height: 230,
        borderRadius: 20,
        position: 'absolute',
        top: 20,
        left: 110,
      },
      {
        width: 15,
        height: 15,
        borderRadius: 20,
        position: 'absolute',
        top: 20,
        left: 103,
      },
      {
        width: 15,
        height: 15,
        borderRadius: 20,
        position: 'absolute',
        top: 124,
        left: 103,
      },
      {
        width: 15,
        height: 15,
        borderRadius: 20,
        position: 'absolute',
        top: 234,
        left: 103,
      },
      {
        width: 80,
        height: 35,
        borderRadius: 20,
        marginTop: 20,
        marginLeft: 10,
      },
      {
        width: screenWidth - 145,
        height: 70,
        borderRadius: 20,
        marginTop: -20,
        marginLeft: 130,
      },
      {
        width: 80,
        height: 35,
        borderRadius: 20,
        marginTop: 20,
        marginLeft: 10,
      },
      {
        width: screenWidth - 145,
        height: 70,
        borderRadius: 20,
        marginTop: -20,
        marginLeft: 130,
      },
      {
        width: 80,
        height: 35,
        borderRadius: 20,
        marginTop: 20,
        marginLeft: 10,
      },
      {
        width: screenWidth - 145,
        height: 70,
        borderRadius: 20,
        marginTop: -20,
        marginLeft: 130,
      },
    ];

    return (
      <View style={{flex: 1, backgroundColor: mainBgColor}}>
        <View
          style={[
            common.cardContainer,
            {
              backgroundColor: backgroundGrey,
              overflow: 'hidden',
              paddingTop: 0,
            },
          ]}>
          {/* <Loader loading={this.state.loading}/> */}
          <SkeletonContent
            containerStyle={{flex: 1, width: screenWidth.width}}
            layout={skeletonLayout}
            isLoading={this.state.loading}
            duration={skeletonPlaceholderProps.duration}
            animationType={skeletonPlaceholderProps.animationType}
            animationDirection={skeletonPlaceholderProps.animationDirection}
            boneColor={skeletonPlaceholderProps.boneColor}
            highlightColor={skeletonPlaceholderProps.highlightColor}>
            {!this.state.loading && this.state.data.length !== 0 ? (
              <View style={styles.container}>
                <Timeline
                  style={styles.list}
                  data={this.state.data}
                  circleSize={14}
                  circleColor={seperator}
                  lineColor={seperator}
                  timeContainerStyle={{
                    minWidth: 50,
                    maxWidth: 75,
                    marginTop: 0,
                  }}
                  timeStyle={styles.timeStyle}
                  descriptionStyle={{color: textMutedColor}}
                  options={{
                    style: {paddingTop: 5},
                  }}
                  innerCircle={'dot'}
                  onEventPress={this.onEventPress}
                  renderDetail={this.renderDetail}
                />
              </View>
            ) : null}

            {!this.state.loading && this.state.data.length === 0 ? (
              <NoRecordsFound onPress={this.reloadPageData} />
            ) : null}
            <Fab
              active={false}
              direction="up"
              containerStyle={{}}
              style={{backgroundColor: primaryBlueHexColor}}
              position="bottomRight"
              onPress={this.toggleInteractionFormModal}>
              <Icon name="plus" />
            </Fab>
          </SkeletonContent>

          {/* {!this.state.loading && this.state.data.length !== 0 ? 
                        <View style={styles.container}>
                            <Timeline 
                                style={styles.list}
                                data={this.state.data}
                                circleSize={14}
                                circleColor={seperator}
                                lineColor={seperator}
                                timeContainerStyle={{minWidth:50, maxWidth: 75, marginTop: 0}}
                                timeStyle={styles.timeStyle}
                                descriptionStyle={{color:'gray'}}
                                options={{
                                    style:{paddingTop:5}
                                }}
                                innerCircle={'dot'}
                                onEventPress={this.onEventPress}
                                renderDetail={this.renderDetail}
                            />
                        </View>
                    : null }
                    {!this.state.loading && this.state.data.length === 0 ? <NoRecordsFound onPress={this.reloadPageData} /> : null}
                    <Fab
                        active={false}
                        direction="up"
                        containerStyle={{ }}
                        style={{ backgroundColor: primaryBlueHexColor }}
                        position="bottomRight"
                        onPress={this.toggleInteractionFormModal}
                    >
                        <Icon name="plus" />
                    </Fab> */}

          <Modal
            isVisible={this.state.isInteractionFormModalVisible}
            onBackButtonPress={this.toggleInteractionFormModal}
            backdropOpacity={0.5}
            style={modalLayout.modalContainer}
            animationInTiming={500}
            animationOutTiming={500}
            onModalWillShow={this.getFormData}
            onModalHide={this.resetFormData}>
            <Loader loading={this.state.loading} />
            <View style={modalLayout.body}>
              <View style={modalLayout.header}>
                {/* <MaterialIcons
                  name="close"
                  size={28}
                  style={modalLayout.headerMenuicon}
                  onPress={this.toggleInteractionFormModal}
                /> */}
                <View>
                  <Text style={modalLayout.headertext}>Add Interaction</Text>
                </View>
                <ModalSaveButton
                  buttonType="solid"
                  onPress={this.handleSubmitFormForHeaderButton}
                  title="Save"
                  buttonColor={primaryBlueHexColor}
                  bgColor={primaryBlueHexColor}
                  color="#ffffff"
                />
              </View>
              <View style={modalLayout.bodyContent}>
                <KeyboardAvoidingView
                  style={{flex: 1, flexDirection: 'column'}}
                  behavior={'padding'}
                  enabled
                  keyboardVerticalOffset={100}>
                  <ScrollView>
                    <View style={common.formElementsContainer}>
                      <Formik
                        enableReinitialize={true}
                        validate={this.validate}
                        initialValues={{
                          description:
                            this.state.salesLeadInteraction &&
                            typeof this.state.salesLeadInteraction
                              .description !== 'undefined' &&
                            this.state.salesLeadInteraction.description !== null
                              ? this.state.salesLeadInteraction.description
                              : '',
                        }}
                        onSubmit={this.handleSubmit}>
                        {formikProps => {
                          const {values, handleChange, handleSubmit, errors} =
                            formikProps;

                          // BIND SUBMISSION HANDLER REMOTLY FOR HEADER SAVE BUTTON
                          this.bindSubmitFormToHeaderButton(
                            formikProps.submitForm,
                          );

                          return (
                            <View>
                              <FormRadioButton
                                name="interactionmode"
                                value={this.state.interactionMode}
                                onPress={this.handleChangeInteractionMode}
                                label="Mode"
                                errors={errors.interactionmode}
                                options={this.state.interactionModes}
                              />
                              <FormSelectPicker
                                label="Status"
                                placeholder={{
                                  label: 'Select Status',
                                  value: '',
                                }}
                                value={this.state.selectedStatus}
                                onValueChange={
                                  this.handleChangeInteractionStatus
                                }
                                items={this.state.status}
                                errors={errors.status}
                              />
                              <FormDatePicker
                                name="interactionon"
                                value={this.state.interactionOn}
                                onChangeEvent={this.handleOnChangeInteractionOn}
                                label="Interaction Date"
                                errors={errors.interactionon}
                                display="spinner"
                              />
                              <FormTimePicker
                                name="interactionontime"
                                value={this.state.interactionOnTime}
                                onChangeEvent={
                                  this.handleOnChangeInteractionOnTime
                                }
                                label="Interaction Time"
                                errors={errors.interactionontime}
                                display="spinner"
                              />
                              {!this.state.isFollowUpDisabled ? (
                                <FormDatePicker
                                  name="followupon"
                                  value={this.state.followedUpOn}
                                  onChangeEvent={this.handleOnChangeFollowUpOn}
                                  label="Follow Up Date"
                                  errors={errors.followedupdate}
                                  display="spinner"
                                  disabled={this.state.isFollowUpDisabled}
                                />
                              ) : null}
                              {!this.state.isFollowUpDisabled ? (
                                <FormTimePicker
                                  name="followupontime"
                                  value={this.state.followedUpOnTime}
                                  onChangeEvent={
                                    this.handleOnChangeFollowUpOnTime
                                  }
                                  label="Follow Up Time"
                                  errors={errors.followedupdatetime}
                                  display="spinner"
                                  disabled={this.state.isFollowUpDisabled}
                                />
                              ) : null}
                              <FormTextArea
                                name="description"
                                label="Notes"
                                value={values.description}
                                placeholder="Write notes here"
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
                </KeyboardAvoidingView>
              </View>
            </View>
            <FlashMessage
              ref={modalFlashMessageRef =>
                (this.modalFlashMessageRef = modalFlashMessageRef)
              }
              position="top"
            />
          </Modal>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    margin: 0,
  },
  list: {
    flex: 1,
    marginTop: 0,
  },
  timeStyle: {
    textAlign: 'center',
    backgroundColor: '#ff9797',
    color: '#fff',
    padding: 2,
    borderRadius: 13,
    fontSize: 12,
  },
  dataContainer: {
    flex: 1,
    backgroundColor: '#fff',
    paddingVertical: 5,
    paddingHorizontal: 0,
    borderRadius: 8,
  },
  title: {
    fontSize: 13,
    fontWeight: 'bold',
    paddingLeft: 10,
    color: fontColor,
  },
  descriptionContainer: {
    flexDirection: 'row',
  },
  textDescription: {
    marginLeft: 10,
    color: textMutedColor,
    fontSize: 12,
  },
});
