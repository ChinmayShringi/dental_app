import React, {Component} from 'react';
import {
  Alert,
  Dimensions,
  KeyboardAvoidingView,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import {Button} from 'native-base';

import {
  badgeColorCode,
  common,
  commonLabelDescription,
  modalLayout,
} from '../../../assets/style';

import Api from '../../../provider/Api';
import Dataprovider from '../../../provider/Dataprovider';
import Loader from '../../../provider/Loader';

import NotFound from '../../../components/NotFound';
import TeethSkeleton from '../../../components/TeethSkeleton';

import {
  backgroundGrey,
  dangerHexColor,
  fontColor,
  mainBgColor,
  primaryBlueHexColor,
  primaryHexColor,
  seperator,
  successHexColor,
  textMutedColor,
} from '../../../constants/themeColors';

import FormInput from '../../../components/FormInput';
import FormTextArea from '../../../components/FormTextArea';
import ModalSaveButton from '../../../components/ModalSaveButton';

import {Formik} from 'formik';

import FlashMessage from 'react-native-flash-message';
import Modal from 'react-native-modal';

// import {MaterialIcons} from '@expo/vector-icons';
import Icon from 'react-native-vector-icons/FontAwesome';

import {skeletonPlaceholderProps} from '../../../constants/defaultValues';

import {SwipeableFlatList} from 'react-native-swipeable-flat-list';

import update from 'immutability-helper';
import moment from 'moment';
import SkeletonContent from '../../../components/SkeletonContent';

const screenWidth = Dimensions.get('window').width;

export default class ProductionAssignedJobDetails extends Component {
  modalFlashMessageRef = null;
  modalStopTaskFlashMessageRef = null;

  submitModalForm = null;
  handleSubmitFormModalForHeaderButton = e => {
    if (this.submitModalForm) {
      this.submitModalForm();
    }
  };
  bindSubmitFormToModalHeaderButton = submitForm => {
    this.submitModalForm = submitForm;
  };

  submitModalUpdateQtyForm = null;
  handleSubmitUpdateQtyFormModalForHeaderButton = e => {
    if (this.submitModalUpdateQtyForm) {
      this.submitModalUpdateQtyForm();
    }
  };
  bindSubmitUpdateQtyFormToModalHeaderButton = submitForm => {
    this.submitModalUpdateQtyForm = submitForm;
  };

  submitModalStopTaskForm = null;
  handleSubmitStopTaskFormModalForHeaderButton = e => {
    if (this.submitModalStopTaskForm) {
      this.submitModalStopTaskForm();
    }
  };
  bindSubmitStopTaskFormToModalHeaderButton = submitForm => {
    this.submitModalStopTaskForm = submitForm;
  };

  api = new Api();
  dataProvider = new Dataprovider();

  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      refreshing: false,
      transparentLoader: false,
      productionProcessId:
        typeof this?.props?.navigation?.state?.params?.productionProcessId !==
        'undefined'
          ? parseInt(this?.props?.navigation?.state?.params?.productionProcessId)
          : 0,
      orderDetailId:
        typeof this?.props?.navigation?.state?.params?.orderDetailId !== 'undefined'
          ? parseInt(this?.props?.navigation?.state?.params?.orderDetailId)
          : 0,
      isFromQrCode:
        typeof this?.props?.navigation?.state?.params?.isFromQrCode !== 'undefined'
          ? this?.props?.navigation?.state?.params?.isFromQrCode
          : false,
      productionProcess: null,
      toothnumberarr: [],
      productSpecificationItemConsumptions: [],
      isItemsAvailableToStartProduction: false,
      inventoryConsumptions: [],

      isRejectJobModalVisible: false,

      isUpdateQtyModalVisible: false,
      selectedModalObjectIndex: null,
      selectedModalObject: null,

      isStopTaskModalVisible: false,

      taskWorkingTime: moment.duration(),
      taskTakenDays: '00',
      taskTakenHours: '00',
      taskTakenMins: '00',
      taskTakenSecs: '00',
      isTimeExceeded: false,
    };

    this.modalFormValidate = this.modalFormValidate.bind(this);
    this.modalFormHandleSubmit = this.modalFormHandleSubmit.bind(this);

    this.modalUpdateQtyFormValidate =
      this.modalUpdateQtyFormValidate.bind(this);
    this.modalUpdateQtyFormHandleSubmit =
      this.modalUpdateQtyFormHandleSubmit.bind(this);

    this.modalStopTaskFormValidate = this.modalStopTaskFormValidate.bind(this);
    this.modalStopTaskFormHandleSubmit =
      this.modalStopTaskFormHandleSubmit.bind(this);
  }

  componentDidMount() {
    this.getData();
    this.updateTaskTimer();
  }

  reloadPageData = () => {
    this.setState({loading: true}, this.getData);
  };

  onRefreshPageData = () => {
    this.setState({refreshing: true}, this.getData);
  };

  getData() {
    let formData = new FormData();
    formData.append('productionprocessid', this.state.productionProcessId);
    formData.append('orderdetailid', this.state.orderDetailId);

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

    if (this.state.isFromQrCode) {
      options.api = 'v_1/productions/jobs/assigned/view-by-qrcode';
    } else {
      options.api = 'v_1/productions/jobs/assigned/view';
    }

    this.api.callPostApi(options).then(data => {
      this.setState({
        loading: false,
        refreshing: false,
      });

      if (data?.status_code === 200) {
        let responseData = data?.response.data;
        let productionProcess = responseData.productionprocess;

        this.setState({
          productionProcessId: productionProcess.productionprocessid,
          productionProcess: productionProcess,
          toothnumberarr: productionProcess.orderdetail.toothnumberarr,
          productSpecificationItemConsumptions:
            responseData.productspecificationitemconsumptions,
          isItemsAvailableToStartProduction:
            responseData.isitemsavailabletostartproduction,
          inventoryConsumptions: responseData.inventoryconsumptions,
        });

        if (productionProcess.isjobinprocess) {
          var startedAt = moment(productionProcess.started_at);
          var currentTime = moment();
          var duration = moment.duration(currentTime.diff(startedAt));
          // var hours       = duration.asHours();
          // var minutes     = duration.asMinutes();
          var seconds = duration.asSeconds();

          this.setState({
            taskWorkingTime: moment
              .duration()
              .add({days: 0, hours: 0, minutes: 0, seconds: seconds}),
          });
        }
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

  approveJob = () => {
    Alert.alert(
      'Confirmation Required',
      "Are sure you've verified the parcel and want to approve job to start the task assigned to you?",
      [
        {
          text: 'Cancel',
          onPress: () => {
            console.log('Cancel CLicked');
          },
          style: 'cancel',
        },
        {
          text: 'Approve',
          onPress: () => {
            this.setState({transparentLoader: true});

            let formData = new FormData();
            formData.append(
              'productionprocessid',
              this.state.productionProcessId,
            );
            formData.append('status', 1); // 1: APPROVE, 0: REJECT
            formData.append('comments', '');

            let options = {
              api: 'v_1/productions/jobs/assigned/confirmation',
              method: 'POST',
              headers: {
                Accept: 'application/json',
                'Content-Type': 'multipart/form-data',
              },
              data: formData,
              refreshOn401: true,
            };

            this.api.callPostApi(options).then(data => {
              this.setState({transparentLoader: false});

              if (data?.status_code === 200) {
                let responseData = data?.response.data;
                this.setState({
                  productionProcess: responseData.productionprocess,
                  toothnumberarr:
                    responseData.productionprocess.orderdetail.toothnumberarr,
                  productSpecificationItemConsumptions:
                    responseData.productspecificationitemconsumptions,
                  isItemsAvailableToStartProduction:
                    responseData.isitemsavailabletostartproduction,
                  inventoryConsumptions: responseData.inventoryconsumptions,
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
          },
        },
      ],
      {cancelable: false},
    );
  };

  toggleRejectJobFormModal = () => {
    this.setState({
      isRejectJobModalVisible: !this.state.isRejectJobModalVisible,
    });
  };

  modalFormHandleSubmit = values => {
    const formData = new FormData();
    formData.append('productionprocessid', this.state.productionProcessId);
    formData.append('status', 0); // 1: APPROVE, 0: REJECT
    formData.append(
      'comments',
      values.comments === null || values.comments === '' ? '' : values.comments,
    );

    let options = {
      api: 'v_1/productions/jobs/assigned/confirmation',
      method: 'POST',
      headers: {
        Accept: 'application/json',
      },
      data: formData,
      refreshOn401: true,
    };

    this.setState({transparentLoader: true});

    this.api.callPostApi(options).then(data => {
      this.setState({transparentLoader: false});

      if (data?.status_code === 200) {
        let responseData = data?.response.data;

        this.setState({
          productionProcess: responseData.productionprocess,
          toothnumberarr:
            responseData.productionprocess.orderdetail.toothnumberarr,
          productSpecificationItemConsumptions:
            responseData.productspecificationitemconsumptions,
          isItemsAvailableToStartProduction:
            responseData.isitemsavailabletostartproduction,
          inventoryConsumptions: responseData.inventoryconsumptions,
        });
        this.api.showSuccessMessageOnRef(
          this.modalFlashMessageRef,
          data?.response.message,
          null,
        );
        setTimeout(() => {
          this.toggleRejectJobFormModal();
        }, 4500);
      } else {
        let errormessage = null;
        if (
          typeof data?.status_code !== 'undefined' &&
          data?.status_code === 422
        ) {
          errormessage = data?.response.data.message;
        }
        this.api.showErrorMessageOnRef(
          this.modalFlashMessageRef,
          data?.response.message,
          errormessage,
        );
      }
    });
  };

  modalFormValidate(values) {
    let errors = {};
    // if(!values.comments) {
    //     errors.comments = "Please enter comments.";
    // }
    return errors;
  }

  updateQty = productSpecificationItemConsumptionId => {
    var index = this.state.productSpecificationItemConsumptions.findIndex(
      productSpecificationItemConsumption =>
        productSpecificationItemConsumption.productspecificationitemconsumptionid ===
        productSpecificationItemConsumptionId,
    );
    setTimeout(() => {
      if (index !== -1) {
        this.setState(prevState => {
          let selectedModalObject = Object.assign(
            {},
            prevState.productSpecificationItemConsumptions[index],
          ); // creating copy of state variable selectedModalObject
          return {selectedModalObject}; // return new object selectedModalObject object
        });
        this.setState({
          selectedModalObjectIndex: index,
        });
        console.log(this.state.selectedModalObject);
        this.toggleUpdateQtyFormModal();
      }
    });
  };

  toggleUpdateQtyFormModal = () => {
    // CLOSE MODAL
    if (this.state.isUpdateQtyModalVisible) {
      this.setState({
        selectedModalObjectIndex: null,
        selectedModalObject: null,
      });
    }
    this.setState({
      isUpdateQtyModalVisible: !this.state.isUpdateQtyModalVisible,
    });
  };

  onChangeModalQtyToBeUsed = enteredValue => {
    let validateValue = enteredValue.replace('.', '');

    // VALID ENTERED VALUE
    if (!isNaN(validateValue)) {
      let value = enteredValue != '' ? enteredValue : 0;

      // UPDATE RECORD
      this.setState({
        selectedModalObject: update(this.state.selectedModalObject, {
          qtytobeused: {$set: parseFloat(value)},
        }),
      });
    }
  };

  modalUpdateQtyFormHandleSubmit = values => {
    let oldSelectedModalObject = this.state.selectedModalObject;
    const selectedIndex = this.state.selectedModalObjectIndex;

    this.setState({
      productSpecificationItemConsumptions: update(
        this.state.productSpecificationItemConsumptions,
        {[selectedIndex]: {$set: oldSelectedModalObject}},
      ),
    });
    this.toggleUpdateQtyFormModal();
  };

  modalUpdateQtyFormValidate(values) {
    let errors = {};
    if (
      this.state.selectedModalObject.qtytobeused >
      this.state.selectedModalObject.availableqty
    ) {
      errors.qtytobeused = 'Entered qty is insufficient.';
    }
    return errors;
  }

  startTask = () => {
    if (this.state.isItemsAvailableToStartProduction) {
      Alert.alert(
        'Confirmation Required',
        'Are sure you wanna start working on this task?',
        [
          {
            text: 'Cancel',
            onPress: () => {
              console.log('Cancel CLicked');
            },
            style: 'cancel',
          },
          {
            text: 'Yes, Start',
            onPress: () => {
              this.setState({transparentLoader: true});

              let formData = new FormData();
              formData.append(
                'productionprocessid',
                this.state.productionProcessId,
              );

              let options = {
                api: 'v_1/productions/jobs/assigned/start',
                method: 'POST',
                headers: {
                  Accept: 'application/json',
                  'Content-Type': 'multipart/form-data',
                },
                data: formData,
                refreshOn401: true,
              };

              this.api.callPostApi(options).then(data => {
                this.setState({transparentLoader: false});

                if (data?.status_code === 200) {
                  let responseData = data?.response.data;
                  let productionProcess = responseData.productionprocess;

                  var startedAt = moment(productionProcess.started_at);
                  var currentTime = moment();
                  var duration = moment.duration(currentTime.diff(startedAt));
                  var seconds = duration.asSeconds();

                  this.setState({
                    productionProcess: productionProcess,
                    toothnumberarr:
                      productionProcess.orderdetail.toothnumberarr,
                    productSpecificationItemConsumptions:
                      responseData.productspecificationitemconsumptions,
                    isItemsAvailableToStartProduction:
                      responseData.isitemsavailabletostartproduction,
                    inventoryConsumptions: responseData.inventoryconsumptions,
                    taskWorkingTime: moment
                      .duration()
                      .add({days: 0, hours: 0, minutes: 0, seconds: seconds}),
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
    } else {
      this.api.showErrorMessage(
        'Unable to start the task as required item(s) are out of stock.',
        null,
      );
    }
  };

  updateTaskTimer = () => {
    const x = setInterval(() => {
      let {taskWorkingTime} = this.state;

      // if(taskWorkingTime <=0) {
      //     clearInterval(x)
      // }
      // else {

      //     taskWorkingTime          = taskWorkingTime.add(1,"s");
      //     const taskTakenDays      = taskWorkingTime.days() > 9 ? taskWorkingTime.days() : "0" + taskWorkingTime.days();
      //     const taskTakenHours     = taskWorkingTime.hours() > 9 ? taskWorkingTime.hours() : "0" + taskWorkingTime.hours();
      //     const taskTakenMins      = taskWorkingTime.minutes() > 9 ? taskWorkingTime.minutes() : "0" + taskWorkingTime.minutes();
      //     const taskTakenSecs      = taskWorkingTime.seconds() > 9 ? taskWorkingTime.seconds() : "0" + taskWorkingTime.seconds();

      //     this.setState({
      //         taskTakenDays,
      //         taskTakenHours,
      //         taskTakenMins,
      //         taskTakenSecs,
      //         taskWorkingTime
      //     });
      // }
      taskWorkingTime = taskWorkingTime.add(1, 's');
      const taskTakenDays =
        taskWorkingTime.days() > 9
          ? taskWorkingTime.days()
          : '0' + taskWorkingTime.days();
      const taskTakenHours =
        taskWorkingTime.hours() > 9
          ? taskWorkingTime.hours()
          : '0' + taskWorkingTime.hours();
      const taskTakenMins =
        taskWorkingTime.minutes() > 9
          ? taskWorkingTime.minutes()
          : '0' + taskWorkingTime.minutes();
      const taskTakenSecs =
        taskWorkingTime.seconds() > 9
          ? taskWorkingTime.seconds()
          : '0' + taskWorkingTime.seconds();

      if (this.state.productionProcess !== null) {
        const started_at = moment(this.state.productionProcess.started_at);
        const estimated_complete_at = moment(
          this.state.productionProcess.started_at,
        )
          .add(this.state.productionProcess.estimatedhours, 'h')
          .add(this.state.productionProcess.estimatedminutes, 'm');
        const used_time = moment(this.state.productionProcess.started_at)
          .add(taskTakenDays, 'd')
          .add(taskTakenHours, 'h')
          .add(taskTakenMins, 'm')
          .add(taskTakenSecs, 's');

        var duration = moment.duration(estimated_complete_at.diff(used_time));
        // var hours                = duration.asHours();
        // var minutes                 = duration.asMinutes();
        var seconds = duration.asSeconds();

        if (seconds <= 0) {
          this.setState({
            isTimeExceeded: true,
          });
        }
      }

      this.setState({
        taskTakenDays,
        taskTakenHours,
        taskTakenMins,
        taskTakenSecs,
        taskWorkingTime,
      });
    }, 1000);
  };

  toggleStopTaskFormModal = () => {
    this.setState({isStopTaskModalVisible: !this.state.isStopTaskModalVisible});
  };

  modalStopTaskFormHandleSubmit = values => {
    let errors = [];

    let productspecificationitemconsumptionid = [];
    let itemid = [];
    let estimatedqty = [];
    let usedqty = [];

    this.state.productSpecificationItemConsumptions.forEach(
      (productSpecificationItemConsumption, index) => {
        let stepno = index + 1;

        // CATEGORY (RESTORATION TYPE)
        if (
          productSpecificationItemConsumption.qtytobeused >
          productSpecificationItemConsumption.availableqty
        ) {
          errors.push(
            'Ensufficient qty entered for ' +
              productSpecificationItemConsumption.itemname,
          );
        }

        productspecificationitemconsumptionid.push(
          productSpecificationItemConsumption.productspecificationitemconsumptionid,
        );
        itemid.push(productSpecificationItemConsumption.itemid);
        estimatedqty.push(productSpecificationItemConsumption.qty);
        usedqty.push(productSpecificationItemConsumption.qtytobeused);
      },
    );

    setTimeout(() => {
      // VALIDATE DETAILS SUCCESS
      if (errors.length === 0) {
        let formData = new FormData();

        formData.append('productionprocessid', this.state.productionProcessId);
        formData.append(
          'comments',
          typeof values.comments === 'undefined' ? '' : values.comments,
        );
        formData.append(
          'productspecificationitemconsumptionid',
          JSON.stringify(productspecificationitemconsumptionid),
        );
        formData.append('itemid', JSON.stringify(itemid));
        formData.append('estimatedqty', JSON.stringify(estimatedqty));
        formData.append('usedqty', JSON.stringify(usedqty));

        let options = {
          api: 'v_1/productions/jobs/assigned/finish',
          method: 'POST',
          headers: {
            Accept: 'application/json',
          },
          data: formData,
          refreshOn401: true,
        };

        this.setState({transparentLoader: true});

        this.api.callPostApi(options).then(data => {
          this.setState({transparentLoader: false});

          if (data?.status_code === 200) {
            let responseData = data?.response.data;

            this.setState({
              productionProcess: responseData.productionprocess,
              toothnumberarr:
                responseData.productionprocess.orderdetail.toothnumberarr,
              isItemsAvailableToStartProduction: false,
              inventoryConsumptions: responseData.inventoryconsumptions,
            });
            this.api.showSuccessMessageOnRef(
              this.modalStopTaskFlashMessageRef,
              data?.response.message,
              null,
            );
            setTimeout(() => {
              this.toggleStopTaskFormModal();
            }, 4500);
          } else {
            let errormessage = null;
            if (
              typeof data?.status_code !== 'undefined' &&
              data?.status_code === 422
            ) {
              errormessage = data?.response.data.message;
            }
            this.api.showErrorMessageOnRef(
              this.modalStopTaskFlashMessageRef,
              data?.response.message,
              errormessage,
            );
          }
        });
      }
      // VALIDATE DETAILS FAILED
      else {
        this.api.showErrorMessageOnRef(
          this.modalStopTaskFlashMessageRef,
          'Ensufficent qty is entered.',
          errors[0],
        );
      }
    });
  };

  modalStopTaskFormValidate(values) {
    let errors = {};
    // if(!values.comments) {
    //     errors.comments = "Please enter comments.";
    // }
    return errors;
  }

  render() {
    const skeletonLayout = [
      {
        marginLeft: screenWidth - 100,
        width: 70,
        height: 18,
        borderRadius: 2,
        marginTop: 0,
      },
      {
        width: 150,
        height: 26,
        borderRadius: 4,
        marginBottom: 15,
      },
      {
        width: 200,
        height: 17,
        borderRadius: 4,
        marginTop: 0,
        marginBottom: 5,
      },
      {
        width: 230,
        height: 17,
        borderRadius: 4,
        marginTop: 0,
        marginBottom: 5,
      },
      {
        width: 240,
        height: 16,
        borderRadius: 4,
        marginTop: 0,
        marginBottom: 5,
      },
      {
        width: 240,
        height: 16,
        borderRadius: 4,
        marginTop: 0,
        marginBottom: 5,
      },
      {
        width: 260,
        height: 16,
        borderRadius: 4,
        marginTop: 0,
        marginBottom: 5,
      },
      {
        width: 260,
        height: 16,
        borderRadius: 4,
        marginTop: 0,
        marginBottom: 5,
      },
      {
        width: 240,
        height: 17,
        borderRadius: 4,
        marginTop: 0,
        marginBottom: 5,
      },
      {
        width: 260,
        height: 18,
        borderRadius: 4,
        marginTop: 0,
        marginBottom: 5,
      },
      {
        width: 260,
        height: 16,
        borderRadius: 4,
        marginTop: 0,
        marginBottom: 5,
      },
      {
        width: 260,
        height: 16,
        borderRadius: 4,
        marginTop: 0,
        marginBottom: 5,
      },
      {
        width: 260,
        height: 16,
        borderRadius: 4,
        marginTop: 0,
        marginBottom: 5,
      },
      {
        width: screenWidth - 30,
        height: 1,
        marginTop: 10,
        marginBottom: 15,
      },
      {
        width: 150,
        height: 26,
        borderRadius: 4,
        marginBottom: 15,
      },
      {
        width: 200,
        height: 17,
        borderRadius: 4,
        marginTop: 0,
        marginBottom: 5,
      },
      {
        width: 230,
        height: 17,
        borderRadius: 4,
        marginTop: 0,
        marginBottom: 5,
      },
      {
        width: 260,
        height: 16,
        borderRadius: 4,
        marginTop: 0,
        marginBottom: 5,
      },
      {
        width: 240,
        height: 16,
        borderRadius: 4,
        marginTop: 0,
        marginBottom: 5,
      },
      {
        width: 280,
        height: 16,
        borderRadius: 4,
        marginTop: 0,
        marginBottom: 5,
      },
      {
        width: screenWidth - 30,
        height: 1,
        marginTop: 5,
        marginBottom: 15,
      },
      {
        width: 150,
        height: 26,
        borderRadius: 4,
        marginBottom: 5,
      },
      {
        width: screenWidth - 50,
        height: 10,
        borderRadius: 4,
        marginTop: 0,
        marginBottom: 5,
      },
    ];

    return (
      <View style={{flex: 1, backgroundColor: mainBgColor}}>
        <View
          style={[
            common.cardContainer,
            {backgroundColor: backgroundGrey, paddingTop: 0},
          ]}>
          <Loader loading={this.state.transparentLoader} />
          <ScrollView
            contentContainerStyle={{flexGrow: 1}}
            refreshControl={
              <RefreshControl
                refreshing={this.state.refreshing}
                onRefresh={this.onRefreshPageData}
              />
            }>
            <TeethSkeleton
              isClickable={false}
              selectedTooths={this.state.toothnumberarr}
              handleToothNumberChange={number => {
                console.log(number);
              }}
            />
            <View
              style={[
                common.card,
                {
                  margin: 0,
                  marginTop: 10,
                  borderRadius: 0,
                  paddingHorizontal: 20,
                },
              ]}>
              <SkeletonContent
                containerStyle={{flex: 1, width: screenWidth.width}}
                layout={skeletonLayout}
                isLoading={this.state.loading}
                duration={skeletonPlaceholderProps.duration}
                animationType={skeletonPlaceholderProps.animationType}
                animationDirection={skeletonPlaceholderProps.animationDirection}
                boneColor={skeletonPlaceholderProps.boneColor}
                highlightColor={skeletonPlaceholderProps.highlightColor}>
                {this.state.productionProcess !== null &&
                !this.state.loading ? (
                  <View>
                    <View
                      style={{
                        flex: 1,
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                      }}>
                      <View style={{alignSelf: 'flex-start'}}>
                        <Text></Text>
                      </View>
                      <View style={{alignSelf: 'flex-end'}}>
                        <View style={{flex: 1, flexDirection: 'row'}}>
                          <TouchableOpacity
                            onPress={() => {
                              this.props.navigation.push(
                                'ProductionOrderViewForAssignedJobs',
                                {
                                  orderId:
                                    this.state.productionProcess.orderdetail
                                      .orderid,
                                },
                              );
                            }}
                            style={{}}>
                            <Text
                              style={{
                                color: primaryHexColor,
                                fontWeight: 'bold',
                              }}>
                              Order Info.
                            </Text>
                          </TouchableOpacity>
                        </View>
                      </View>
                    </View>
                    <View>
                      <Text style={commonLabelDescription.blockTitle}>
                        Basic Details
                      </Text>

                      <View
                        style={[
                          commonLabelDescription.listContainer,
                          styles.listContainer,
                        ]}>
                        <View
                          style={[
                            commonLabelDescription.listLabelContainer,
                            styles.listLabelContainer,
                          ]}>
                          <Text style={commonLabelDescription.labelText}>
                            Job ID
                          </Text>
                        </View>
                        <View style={commonLabelDescription.listSeperator}>
                          <Text style={commonLabelDescription.labelText}>
                            :
                          </Text>
                        </View>
                        <View style={styles.descriptionContainer}>
                          <Text style={commonLabelDescription.labelValue}>
                            #
                            {
                              this.state.productionProcess.orderdetail
                                .orderdetailid
                            }
                          </Text>
                        </View>
                      </View>

                      <View
                        style={[
                          commonLabelDescription.listContainer,
                          styles.listContainer,
                        ]}>
                        <View
                          style={[
                            commonLabelDescription.listLabelContainer,
                            styles.listLabelContainer,
                          ]}>
                          <Text style={commonLabelDescription.labelText}>
                            Order ID
                          </Text>
                        </View>
                        <View style={commonLabelDescription.listSeperator}>
                          <Text style={commonLabelDescription.labelText}>
                            :
                          </Text>
                        </View>
                        <View style={styles.descriptionContainer}>
                          <Text style={commonLabelDescription.labelValue}>
                            #{this.state.productionProcess.orderdetail.orderid}
                          </Text>
                        </View>
                      </View>

                      <View
                        style={[
                          commonLabelDescription.listContainer,
                          styles.listContainer,
                        ]}>
                        <View
                          style={[
                            commonLabelDescription.listLabelContainer,
                            styles.listLabelContainer,
                          ]}>
                          <Text style={commonLabelDescription.labelText}>
                            Restoration Type
                          </Text>
                        </View>
                        <View style={commonLabelDescription.listSeperator}>
                          <Text style={commonLabelDescription.labelText}>
                            :
                          </Text>
                        </View>
                        <View style={styles.descriptionContainer}>
                          <View>
                            {this.state.productionProcess.orderdetail
                              .categoryid !== null &&
                            this.state.productionProcess.orderdetail
                              .categoryid !== '' ? (
                              <Text style={commonLabelDescription.labelValue}>
                                {
                                  this.state.productionProcess.orderdetail
                                    .categoryname
                                }
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
                      </View>

                      <View
                        style={[
                          commonLabelDescription.listContainer,
                          styles.listContainer,
                        ]}>
                        <View
                          style={[
                            commonLabelDescription.listLabelContainer,
                            styles.listLabelContainer,
                          ]}>
                          <Text style={commonLabelDescription.labelText}>
                            Product
                          </Text>
                        </View>
                        <View style={commonLabelDescription.listSeperator}>
                          <Text style={commonLabelDescription.labelText}>
                            :
                          </Text>
                        </View>
                        <View style={styles.descriptionContainer}>
                          <View>
                            {this.state.productionProcess.orderdetail
                              .productid !== null &&
                            this.state.productionProcess.orderdetail
                              .productid !== '' ? (
                              <Text style={commonLabelDescription.labelValue}>
                                {
                                  this.state.productionProcess.orderdetail
                                    .productname
                                }
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
                      </View>

                      <View
                        style={[
                          commonLabelDescription.listContainer,
                          styles.listContainer,
                        ]}>
                        <View
                          style={[
                            commonLabelDescription.listLabelContainer,
                            styles.listLabelContainer,
                          ]}>
                          <Text style={commonLabelDescription.labelText}>
                            Tooth Number(s)
                          </Text>
                        </View>
                        <View style={commonLabelDescription.listSeperator}>
                          <Text style={commonLabelDescription.labelText}>
                            :
                          </Text>
                        </View>
                        <View style={styles.descriptionContainer}>
                          <View>
                            {this.state.productionProcess.orderdetail
                              .toothnumber !== null &&
                            this.state.productionProcess.orderdetail
                              .toothnumber !== '' ? (
                              <Text style={commonLabelDescription.labelValue}>
                                {
                                  this.state.productionProcess.orderdetail
                                    .toothnumbertext
                                }
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
                      </View>

                      <View
                        style={[
                          commonLabelDescription.listContainer,
                          styles.listContainer,
                        ]}>
                        <View
                          style={[
                            commonLabelDescription.listLabelContainer,
                            styles.listLabelContainer,
                          ]}>
                          <Text style={commonLabelDescription.labelText}>
                            Brand
                          </Text>
                        </View>
                        <View style={commonLabelDescription.listSeperator}>
                          <Text style={commonLabelDescription.labelText}>
                            :
                          </Text>
                        </View>
                        <View style={styles.descriptionContainer}>
                          <View>
                            {this.state.productionProcess.orderdetail
                              .brandid !== null &&
                            this.state.productionProcess.orderdetail.brandid !==
                              '' ? (
                              <Text style={commonLabelDescription.labelValue}>
                                {
                                  this.state.productionProcess.orderdetail
                                    .brandname
                                }
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
                      </View>

                      <View
                        style={[
                          commonLabelDescription.listContainer,
                          styles.listContainer,
                        ]}>
                        <View
                          style={[
                            commonLabelDescription.listLabelContainer,
                            styles.listLabelContainer,
                          ]}>
                          <Text style={commonLabelDescription.labelText}>
                            Portic Design
                          </Text>
                        </View>
                        <View style={commonLabelDescription.listSeperator}>
                          <Text style={commonLabelDescription.labelText}>
                            :
                          </Text>
                        </View>
                        <View style={styles.descriptionContainer}>
                          <View>
                            {this.state.productionProcess.orderdetail
                              .poticdesign !== null &&
                            this.state.productionProcess.orderdetail
                              .poticdesign !== '' ? (
                              <Text style={commonLabelDescription.labelValue}>
                                {
                                  this.state.productionProcess.orderdetail
                                    .poticdesigntext
                                }
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
                      </View>

                      <View
                        style={[
                          commonLabelDescription.listContainer,
                          styles.listContainer,
                        ]}>
                        <View
                          style={[
                            commonLabelDescription.listLabelContainer,
                            styles.listLabelContainer,
                          ]}>
                          <Text style={commonLabelDescription.labelText}>
                            Shade
                          </Text>
                        </View>
                        <View style={commonLabelDescription.listSeperator}>
                          <Text style={commonLabelDescription.labelText}>
                            :
                          </Text>
                        </View>
                        <View style={styles.descriptionContainer}>
                          <View>
                            {this.state.productionProcess.orderdetail
                              .shadeid !== null &&
                            this.state.productionProcess.orderdetail.shadeid !==
                              '' ? (
                              <Text style={commonLabelDescription.labelValue}>
                                {
                                  this.state.productionProcess.orderdetail
                                    .shadename
                                }
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
                      </View>

                      <View
                        style={[
                          commonLabelDescription.listContainer,
                          styles.listContainer,
                        ]}>
                        <View
                          style={[
                            commonLabelDescription.listLabelContainer,
                            styles.listLabelContainer,
                          ]}>
                          <Text style={commonLabelDescription.labelText}>
                            Shade Notes
                          </Text>
                        </View>
                        <View style={commonLabelDescription.listSeperator}>
                          <Text style={commonLabelDescription.labelText}>
                            :
                          </Text>
                        </View>
                        <View style={styles.descriptionContainer}>
                          <View>
                            {this.state.productionProcess.orderdetail
                              .shadenotes !== null &&
                            this.state.productionProcess.orderdetail
                              .shadenotes !== '' ? (
                              <Text style={commonLabelDescription.labelValue}>
                                {
                                  this.state.productionProcess.orderdetail
                                    .shadenotes
                                }
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
                      </View>

                      <View
                        style={[
                          commonLabelDescription.listContainer,
                          styles.listContainer,
                        ]}>
                        <View
                          style={[
                            commonLabelDescription.listLabelContainer,
                            styles.listLabelContainer,
                          ]}>
                          <Text style={commonLabelDescription.labelText}>
                            Description
                          </Text>
                        </View>
                        <View style={commonLabelDescription.listSeperator}>
                          <Text style={commonLabelDescription.labelText}>
                            :
                          </Text>
                        </View>
                        <View style={styles.descriptionContainer}>
                          <View>
                            {this.state.productionProcess.orderdetail
                              .description !== null &&
                            this.state.productionProcess.orderdetail
                              .description !== '' ? (
                              <Text style={commonLabelDescription.labelValue}>
                                {
                                  this.state.productionProcess.orderdetail
                                    .description
                                }
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
                      </View>

                      <View
                        style={[
                          commonLabelDescription.listContainer,
                          styles.listContainer,
                        ]}>
                        <View
                          style={[
                            commonLabelDescription.listLabelContainer,
                            styles.listLabelContainer,
                          ]}>
                          <Text style={commonLabelDescription.labelText}>
                            Status
                          </Text>
                        </View>
                        <View style={commonLabelDescription.listSeperator}>
                          <Text style={commonLabelDescription.labelText}>
                            :
                          </Text>
                        </View>
                        <View style={styles.descriptionContainer}>
                          <Text
                            style={[
                              commonLabelDescription.labelValue,
                              badgeColorCode(
                                this.state.productionProcess.orderdetail
                                  .statuscolor,
                              ),
                            ]}>
                            {
                              this.state.productionProcess.orderdetail
                                .statustext
                            }
                          </Text>
                        </View>
                      </View>
                    </View>

                    <View style={common.seperator} />

                    <View>
                      <Text style={commonLabelDescription.blockTitle}>
                        Task Details
                      </Text>

                      <View
                        style={[
                          commonLabelDescription.listContainer,
                          styles.listContainer,
                        ]}>
                        <View
                          style={[
                            commonLabelDescription.listLabelContainer,
                            styles.listLabelContainer,
                          ]}>
                          <Text style={commonLabelDescription.labelText}>
                            Task
                          </Text>
                        </View>
                        <View style={commonLabelDescription.listSeperator}>
                          <Text style={commonLabelDescription.labelText}>
                            :
                          </Text>
                        </View>
                        <View style={styles.descriptionContainer}>
                          <View>
                            {this.state.productionProcess.task !== null &&
                            this.state.productionProcess.task !== '' ? (
                              <Text
                                numberOfLines={3}
                                ellipsizeMode="tail"
                                style={commonLabelDescription.labelValue}>
                                {this.state.productionProcess.task}
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
                      </View>

                      <View
                        style={[
                          commonLabelDescription.listContainer,
                          styles.listContainer,
                        ]}>
                        <View
                          style={[
                            commonLabelDescription.listLabelContainer,
                            styles.listLabelContainer,
                          ]}>
                          <Text style={commonLabelDescription.labelText}>
                            Additional Notes
                          </Text>
                        </View>
                        <View style={commonLabelDescription.listSeperator}>
                          <Text style={commonLabelDescription.labelText}>
                            :
                          </Text>
                        </View>
                        <View style={styles.descriptionContainer}>
                          <View>
                            {this.state.productionProcess.commentsforuser !==
                              null &&
                            this.state.productionProcess.commentsforuser !==
                              '' ? (
                              <Text style={commonLabelDescription.labelValue}>
                                {this.state.productionProcess.commentsforuser}
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
                      </View>

                      <View
                        style={[
                          commonLabelDescription.listContainer,
                          styles.listContainer,
                        ]}>
                        <View
                          style={[
                            commonLabelDescription.listLabelContainer,
                            styles.listLabelContainer,
                          ]}>
                          <Text style={commonLabelDescription.labelText}>
                            Estimated Time
                          </Text>
                        </View>
                        <View style={commonLabelDescription.listSeperator}>
                          <Text style={commonLabelDescription.labelText}>
                            :
                          </Text>
                        </View>
                        <View style={styles.descriptionContainer}>
                          <View>
                            <Text style={commonLabelDescription.labelValue}>
                              {
                                this.state.productionProcess
                                  .displayestimatedtime
                              }
                            </Text>
                          </View>
                        </View>
                      </View>

                      <View
                        style={[
                          commonLabelDescription.listContainer,
                          styles.listContainer,
                        ]}>
                        <View
                          style={[
                            commonLabelDescription.listLabelContainer,
                            styles.listLabelContainer,
                          ]}>
                          <Text style={commonLabelDescription.labelText}>
                            Used Time
                          </Text>
                        </View>
                        <View style={commonLabelDescription.listSeperator}>
                          <Text style={commonLabelDescription.labelText}>
                            :
                          </Text>
                        </View>
                        <View style={styles.descriptionContainer}>
                          <View>
                            <Text style={commonLabelDescription.labelValue}>
                              {this.state.productionProcess.displayusedtime}
                            </Text>
                          </View>
                        </View>
                      </View>

                      <View
                        style={[
                          commonLabelDescription.listContainer,
                          styles.listContainer,
                        ]}>
                        <View
                          style={[
                            commonLabelDescription.listLabelContainer,
                            styles.listLabelContainer,
                          ]}>
                          <Text style={commonLabelDescription.labelText}>
                            Status
                          </Text>
                        </View>
                        <View style={commonLabelDescription.listSeperator}>
                          <Text style={commonLabelDescription.labelText}>
                            :
                          </Text>
                        </View>
                        <View style={styles.descriptionContainer}>
                          <Text
                            style={[
                              commonLabelDescription.labelValue,
                              badgeColorCode(
                                this.state.productionProcess.statuscolor,
                              ),
                            ]}>
                            {this.state.productionProcess.statustext}
                          </Text>
                        </View>
                      </View>
                    </View>

                    <View style={common.seperator} />

                    <View>
                      <Text
                        style={[
                          commonLabelDescription.blockTitle,
                          {marginBottom: 0},
                        ]}>
                        List of Items
                      </Text>

                      {this.state.productionProcess.status != 5 ? (
                        <View>
                          {this.state.productSpecificationItemConsumptions
                            .length > 0 ? (
                            <View>
                              <Text
                                style={[
                                  common.mutedText,
                                  {
                                    fontSize: 10,
                                    marginTop: -2,
                                    marginBottom: 10,
                                  },
                                ]}>
                                Swipe right on any item if you wish to change
                                the used qty of any item.
                              </Text>
                              <SwipeableFlatList
                                data={
                                  this.state
                                    .productSpecificationItemConsumptions
                                }
                                keyExtractor={item => `${item.itemname}`}
                                renderItem={({item}) => (
                                  <TouchableOpacity
                                    onPress={() => {
                                      // this.updateQty(item.productspecificationitemconsumptionid);
                                    }}
                                    style={styles.swipableItemContainer}>
                                    <View
                                      style={
                                        styles.swipableItemDetailContainer
                                      }>
                                      <Text style={styles.swipableItemName}>
                                        {item.itemname}
                                      </Text>

                                      <Text
                                        style={[
                                          common.mutedText,
                                          {fontSize: 11, marginBottom: -2},
                                        ]}>
                                        Estimated Qty: {item.qty}
                                        {item.unitshortname}
                                      </Text>

                                      {item.availablitystatus === 1 ||
                                      item.availablitystatus === '1' ? (
                                        <Text
                                          style={[
                                            common.mutedText,
                                            {fontSize: 11},
                                          ]}>
                                          {item.availablitytext}
                                        </Text>
                                      ) : (
                                        <View>
                                          {item.availableqty > 0 ? (
                                            <Text
                                              style={[
                                                {
                                                  color: dangerHexColor,
                                                  fontSize: 11,
                                                },
                                              ]}>
                                              Only {item.availableqty}
                                              {item.unitshortname} qty left in
                                              stock
                                            </Text>
                                          ) : (
                                            <Text
                                              style={[
                                                {
                                                  color: dangerHexColor,
                                                  fontSize: 11,
                                                },
                                              ]}>
                                              {item.availablitytext}
                                            </Text>
                                          )}
                                        </View>
                                      )}
                                    </View>
                                    <View style={styles.swipableQtyContainer}>
                                      <Text
                                        style={{
                                          textAlign: 'right',
                                          padding: 8,
                                          color: fontColor,
                                          fontSize: 13,
                                        }}>
                                        {item.qtytobeused}
                                        {item.unitshortname}
                                      </Text>
                                    </View>
                                  </TouchableOpacity>
                                )}
                                renderRight={({item}) => (
                                  <TouchableOpacity
                                    style={{width: 50, height: 60}}
                                    onPress={() => {
                                      this.updateQty(
                                        item.productspecificationitemconsumptionid,
                                      );
                                    }}>
                                    <View
                                      style={{
                                        flex: 1,
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        backgroundColor: primaryHexColor,
                                        borderRadius: 8,
                                      }}>
                                      <Icon
                                        style={[
                                          {
                                            fontSize: 20,
                                            fontWeight: 'bold',
                                            color: '#fff',
                                          },
                                        ]}
                                        name="pencil-square-o"
                                      />
                                    </View>
                                  </TouchableOpacity>
                                )}
                                backgroundColor={'white'}
                              />
                            </View>
                          ) : (
                            <Text
                              style={[
                                common.mutedTextInItalic,
                                {textAlign: 'center'},
                              ]}>
                              No items specified to be use with the assigned
                              task!
                            </Text>
                          )}
                        </View>
                      ) : null}

                      {this.state.productionProcess.status === 5 ? (
                        <View>
                          {this.state.inventoryConsumptions.length > 0 ? (
                            <SwipeableFlatList
                              data={this.state.inventoryConsumptions}
                              keyExtractor={item => `${item.itemname}`}
                              renderItem={({item}) => (
                                <TouchableOpacity
                                  onPress={() => {
                                    console.log('here');
                                  }}
                                  style={[
                                    styles.swipableItemContainer,
                                    {height: 55},
                                  ]}>
                                  <View
                                    style={styles.swipableItemDetailContainer}>
                                    <Text style={styles.swipableItemName}>
                                      {item.itemname}
                                    </Text>

                                    <Text
                                      style={[
                                        common.mutedText,
                                        {fontSize: 11},
                                      ]}>
                                      Estimated Qty: {item.estimatedqty}
                                      {item.unitshortname}
                                    </Text>
                                  </View>
                                  <View
                                    style={[
                                      styles.swipableQtyContainer,
                                      {height: 55},
                                    ]}>
                                    <Text
                                      style={{
                                        textAlign: 'right',
                                        padding: 8,
                                        color: fontColor,
                                        fontSize: 13,
                                      }}>
                                      {item.usedqty}
                                      {item.unitshortname}
                                    </Text>
                                  </View>
                                </TouchableOpacity>
                              )}
                              renderRight={({item}) => (
                                <TouchableOpacity
                                  style={{width: 0, height: 55}}
                                  onPress={() => {
                                    console.log('here');
                                  }}>
                                  <View
                                    style={{
                                      flex: 1,
                                      justifyContent: 'center',
                                      alignItems: 'center',
                                      backgroundColor: textMutedColor,
                                      borderRadius: 8,
                                    }}>
                                    <Icon
                                      style={[
                                        {
                                          fontSize: 20,
                                          fontWeight: 'bold',
                                          color: '#fff',
                                        },
                                      ]}
                                      name="pencil-square-o"
                                    />
                                  </View>
                                </TouchableOpacity>
                              )}
                              backgroundColor={'white'}
                            />
                          ) : (
                            <Text
                              style={[
                                common.mutedTextInItalic,
                                {textAlign: 'center'},
                              ]}>
                              No items are used with this task!
                            </Text>
                          )}
                        </View>
                      ) : null}
                    </View>
                    {this.state.productionProcess.status === 1 ||
                    this.state.productionProcess.status === '1' ? (
                      <View style={styles.buttonBlock}>
                        <View style={styles.buttonContainer}>
                          <Button
                            block
                            iconLeft
                            rounded
                            style={{backgroundColor: successHexColor}}
                            onPress={this.approveJob}>
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
                            onPress={this.toggleRejectJobFormModal}>
                            <Icon name="times" style={styles.buttonIconStyle} />
                            <Text style={styles.buttonTextStyle}>Reject</Text>
                          </Button>
                        </View>
                      </View>
                    ) : null}

                    {this.state.productionProcess.status === 2 ||
                    this.state.productionProcess.status === '2' ? (
                      <View style={styles.buttonBlock}>
                        <View style={styles.buttonContainer}>
                          <Button
                            block
                            iconLeft
                            rounded
                            style={{
                              backgroundColor: this.state
                                .isItemsAvailableToStartProduction
                                ? successHexColor
                                : textMutedColor,
                            }}
                            onPress={this.startTask}>
                            <Icon
                              name="hourglass-start"
                              style={styles.buttonIconStyle}
                            />
                            <Text style={styles.buttonTextStyle}>
                              Start Task
                            </Text>
                          </Button>
                        </View>
                      </View>
                    ) : null}

                    {this.state.productionProcess.status === 4 ||
                    this.state.productionProcess.status === '4' ? (
                      <View>
                        <View
                          style={[
                            styles.timerContainer,
                            {
                              backgroundColor: this.state.isTimeExceeded
                                ? '#c70b00'
                                : '#2a2a2a',
                            },
                          ]}>
                          <View
                            style={[
                              styles.timerBlock,
                              {
                                backgroundColor: this.state.isTimeExceeded
                                  ? dangerHexColor
                                  : '#444',
                              },
                            ]}>
                            <Text style={styles.timerTimeText}>
                              {this.state.taskTakenDays}
                            </Text>
                            <Text style={styles.timerCaptionText}>DAYS</Text>
                          </View>
                          <Text style={styles.timerSeperator}>:</Text>
                          <View
                            style={[
                              styles.timerBlock,
                              {
                                backgroundColor: this.state.isTimeExceeded
                                  ? dangerHexColor
                                  : '#444',
                              },
                            ]}>
                            <Text style={styles.timerTimeText}>
                              {this.state.taskTakenHours}
                            </Text>
                            <Text style={styles.timerCaptionText}>HRS</Text>
                          </View>
                          <Text style={styles.timerSeperator}>:</Text>
                          <View
                            style={[
                              styles.timerBlock,
                              {
                                backgroundColor: this.state.isTimeExceeded
                                  ? dangerHexColor
                                  : '#444',
                              },
                            ]}>
                            <Text style={styles.timerTimeText}>
                              {this.state.taskTakenMins}
                            </Text>
                            <Text style={styles.timerCaptionText}>MINS</Text>
                          </View>
                          <Text style={styles.timerSeperator}>:</Text>
                          <View
                            style={[
                              styles.timerBlock,
                              {
                                backgroundColor: this.state.isTimeExceeded
                                  ? dangerHexColor
                                  : '#444',
                              },
                            ]}>
                            <Text style={styles.timerTimeText}>
                              {this.state.taskTakenSecs}
                            </Text>
                            <Text style={styles.timerCaptionText}>SECS</Text>
                          </View>
                        </View>
                        {this.state.isTimeExceeded ? (
                          <Text
                            style={{
                              color: dangerHexColor,
                              paddingTop: 15,
                              fontSize: 16,
                              fontWeight: 'bold',
                              textAlign: 'center',
                            }}>
                            You have exceeded the estimated time.
                          </Text>
                        ) : null}

                        <View style={styles.buttonBlock}>
                          <View style={styles.buttonContainer}>
                            <Button
                              block
                              iconLeft
                              rounded
                              style={{backgroundColor: dangerHexColor}}
                              onPress={this.toggleStopTaskFormModal}>
                              <Icon
                                name="hourglass-end"
                                style={styles.buttonIconStyle}
                              />
                              <Text style={styles.buttonTextStyle}>
                                Complete Task
                              </Text>
                            </Button>
                          </View>
                        </View>
                      </View>
                    ) : null}
                    <Modal
                      isVisible={this.state.isRejectJobModalVisible}
                      onBackButtonPress={this.toggleRejectJobFormModal}
                      backdropOpacity={0.5}
                      style={modalLayout.modalContainer}
                      animationInTiming={500}
                      animationOutTiming={500}
                      // onModalWillShow={this.getModalFormData}
                      // onModalHide={this.resetModalFormData}
                    >
                      <Loader loading={this.state.transparentLoader} />
                      <View style={modalLayout.body}>
                        <View style={modalLayout.header}>
                          {/* <MaterialIcons
                            name="close"
                            size={28}
                            style={modalLayout.headerMenuicon}
                            onPress={this.toggleRejectJobFormModal}
                          /> */}
                          <View>
                            <Text style={modalLayout.headertext}>
                              Reject Job
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
                        <View style={{flex: 1, backgroundColor: mainBgColor}}>
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
                                      comments: '',
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
                                            name="comments"
                                            label="Comments"
                                            value={values.comments}
                                            placeholder="Enter comments"
                                            rowSpan={8}
                                            onChangeText={handleChange(
                                              'comments',
                                            )}
                                            errors={errors.comments}
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
                      </View>
                      <FlashMessage
                        ref={modalFlashMessageRef =>
                          (this.modalFlashMessageRef = modalFlashMessageRef)
                        }
                        position="top"
                      />
                    </Modal>
                    <Modal
                      isVisible={this.state.isUpdateQtyModalVisible}
                      onBackButtonPress={this.toggleUpdateQtyFormModal}
                      backdropOpacity={0.5}
                      style={modalLayout.modalContainer}
                      animationInTiming={500}
                      animationOutTiming={500}>
                      <View style={modalLayout.body}>
                        <View style={modalLayout.header}>
                          {/* <MaterialIcons
                            name="close"
                            size={28}
                            style={modalLayout.headerMenuicon}
                            onPress={this.toggleUpdateQtyFormModal}
                          /> */}
                          <View>
                            <Text style={modalLayout.headertext}>
                              Update Item's Quantity
                            </Text>
                          </View>
                          <ModalSaveButton
                            buttonType="solid"
                            onPress={
                              this.handleSubmitUpdateQtyFormModalForHeaderButton
                            }
                            title="Save"
                            buttonColor={primaryHexColor}
                            bgColor={primaryHexColor}
                            color="#ffffff"
                          />
                        </View>
                        {this.state.selectedModalObject !== null ? (
                          <View style={{flex: 1, backgroundColor: mainBgColor}}>
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
                                      validate={this.modalUpdateQtyFormValidate}
                                      initialValues={{
                                        itemname:
                                          this.state.selectedModalObject !==
                                            null &&
                                          typeof this.state.selectedModalObject
                                            .itemname !== 'undefined' &&
                                          this.state.selectedModalObject
                                            .itemname !== null
                                            ? this.state.selectedModalObject
                                                .itemname
                                            : '',
                                        unitshortname:
                                          this.state.selectedModalObject !==
                                            null &&
                                          typeof this.state.selectedModalObject
                                            .unitshortname !== 'undefined' &&
                                          this.state.selectedModalObject
                                            .unitshortname !== null
                                            ? this.state.selectedModalObject
                                                .unitshortname
                                            : '',
                                        availableqty:
                                          this.state.selectedModalObject !==
                                            null &&
                                          typeof this.state.selectedModalObject
                                            .availableqty !== 'undefined' &&
                                          this.state.selectedModalObject
                                            .availableqty !== null
                                            ? this.state.selectedModalObject.availableqty.toString()
                                            : '0.00',
                                        qty:
                                          this.state.selectedModalObject !==
                                            null &&
                                          typeof this.state.selectedModalObject
                                            .qty !== 'undefined' &&
                                          this.state.selectedModalObject.qty !==
                                            null
                                            ? this.state.selectedModalObject.qty
                                            : '',
                                      }}
                                      onSubmit={
                                        this.modalUpdateQtyFormHandleSubmit
                                      }>
                                      {formikProps => {
                                        const {
                                          values,
                                          handleChange,
                                          handleSubmit,
                                          errors,
                                        } = formikProps;

                                        // BIND SUBMISSION HANDLER REMOTLY FOR HEADER SAVE BUTTON
                                        this.bindSubmitUpdateQtyFormToModalHeaderButton(
                                          formikProps.submitForm,
                                        );

                                        return (
                                          <View>
                                            <View
                                              style={{
                                                flex: 1,
                                                flexDirection: 'row',
                                                justifyContent: 'flex-start',
                                              }}>
                                              <View
                                                style={{
                                                  width: screenWidth - 120,
                                                  marginRight: -10,
                                                }}>
                                                <FormInput
                                                  name="itemname"
                                                  value={values.itemname}
                                                  onChangeText={handleChange(
                                                    'itemname',
                                                  )}
                                                  placeholder="Item"
                                                  autoCapitalize="none"
                                                  label="Item"
                                                  disabled={true}
                                                  errorMessage={null}
                                                />
                                              </View>
                                              <View
                                                style={{
                                                  flex: 1,
                                                }}>
                                                <FormInput
                                                  name="unitshortname"
                                                  value={values.unitshortname}
                                                  onChangeText={handleChange(
                                                    'unitshortname',
                                                  )}
                                                  placeholder="Unit"
                                                  autoCapitalize="none"
                                                  label="Unit"
                                                  disabled={true}
                                                  errorMessage={null}
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
                                                style={{
                                                  width: screenWidth / 2 - 10,
                                                  marginRight: -10,
                                                }}>
                                                <FormInput
                                                  name="availableqty"
                                                  value={values.availableqty}
                                                  onChangeText={handleChange(
                                                    'availableqty',
                                                  )}
                                                  placeholder="Availble Qty."
                                                  autoCapitalize="none"
                                                  label="Available Qty."
                                                  disabled={true}
                                                  errorMessage={null}
                                                />
                                              </View>
                                              <View
                                                style={{
                                                  flex: 1,
                                                }}>
                                                <FormInput
                                                  name="qty"
                                                  value={values.qty}
                                                  onChangeText={handleChange(
                                                    'qty',
                                                  )}
                                                  placeholder="Estimated Qty."
                                                  autoCapitalize="none"
                                                  label="Estimated Qty."
                                                  disabled={true}
                                                  errorMessage={null}
                                                />
                                              </View>
                                            </View>
                                            <FormInput
                                              keyboardType="numeric"
                                              name="qtytobeused"
                                              value={
                                                this.state.selectedModalObject
                                                  .qtytobeused + ''
                                              }
                                              onChangeText={
                                                this.onChangeModalQtyToBeUsed
                                              }
                                              placeholder="Used Qty."
                                              autoCapitalize="none"
                                              label="Used Qty."
                                              errorMessage={errors.qtytobeused}
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
                    </Modal>
                    <Modal
                      isVisible={this.state.isStopTaskModalVisible}
                      onBackButtonPress={this.toggleStopTaskFormModal}
                      backdropOpacity={0.5}
                      style={modalLayout.modalContainer}
                      animationInTiming={500}
                      animationOutTiming={500}>
                      <Loader loading={this.state.transparentLoader} />
                      <View style={modalLayout.body}>
                        <View style={modalLayout.header}>
                          {/* <MaterialIcons
                            name="close"
                            size={28}
                            style={modalLayout.headerMenuicon}
                            onPress={this.toggleStopTaskFormModal}
                          /> */}
                          <View>
                            <Text style={modalLayout.headertext}>
                              Complete Task
                            </Text>
                          </View>
                          <ModalSaveButton
                            buttonType="solid"
                            onPress={
                              this.handleSubmitStopTaskFormModalForHeaderButton
                            }
                            title="Save"
                            buttonColor={primaryBlueHexColor}
                            bgColor={primaryBlueHexColor}
                            color="#ffffff"
                          />
                        </View>
                        <View style={{flex: 1, backgroundColor: mainBgColor}}>
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
                                    validate={this.modalStopTaskFormValidate}
                                    initialValues={{
                                      comments: '',
                                    }}
                                    onSubmit={
                                      this.modalStopTaskFormHandleSubmit
                                    }>
                                    {formikProps => {
                                      const {
                                        values,
                                        handleChange,
                                        handleSubmit,
                                        errors,
                                      } = formikProps;

                                      // BIND SUBMISSION HANDLER REMOTLY FOR HEADER SAVE BUTTON
                                      this.bindSubmitStopTaskFormToModalHeaderButton(
                                        formikProps.submitForm,
                                      );

                                      return (
                                        <View>
                                          <FormTextArea
                                            name="comments"
                                            label="Comments"
                                            value={values.comments}
                                            placeholder="Enter comments"
                                            rowSpan={8}
                                            onChangeText={handleChange(
                                              'comments',
                                            )}
                                            errors={errors.comments}
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
                      </View>
                      <FlashMessage
                        ref={modalStopTaskFlashMessageRef =>
                          (this.modalStopTaskFlashMessageRef =
                            modalStopTaskFlashMessageRef)
                        }
                        position="top"
                      />
                    </Modal>
                  </View>
                ) : (
                  <NotFound onPress={this.reloadPageData} />
                )}
              </SkeletonContent>
            </View>
          </ScrollView>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  listContainer: {
    // paddingLeft: 10
  },
  listLabelContainer: {
    width: 100,
  },
  descriptionContainer: {
    width: screenWidth - 150,
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
    marginHorizontal: 4,
  },
  buttonStyle: {},
  buttonIconStyle: {
    fontSize: 20,
    color: '#fff',
  },
  buttonTextStyle: {
    marginLeft: 10,
    color: '#fff',
    fontWeight: 'bold',
  },
  swipableItemContainer: {
    height: 60,
    paddingRight: 80,
    position: 'relative',
    borderColor: seperator,
    borderBottomWidth: 1,
  },
  swipableItemDetailContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  swipableItemName: {
    fontWeight: 'bold',
    color: fontColor,
    fontSize: 13,
  },
  swipableQtyContainer: {
    width: 80,
    height: 60,
    position: 'absolute',
    right: 0,
    justifyContent: 'center',
  },
  timerContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
    marginBottom: -15,
    borderRadius: 4,
    backgroundColor: '#2a2a2a',
    paddingVertical: 10,
    paddingHorizontal: 10,
  },
  timerBlock: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
    backgroundColor: '#444',
    padding: 2,
  },
  timerSeperator: {
    fontWeight: 'bold',
    fontSize: 22,
    color: '#fff',
    paddingHorizontal: 4,
  },
  timerTimeText: {
    fontWeight: 'bold',
    fontSize: 20,
    color: '#fff',
  },
  timerCaptionText: {
    fontWeight: 'bold',
    fontSize: 10,
    color: '#fff',
  },
});
