import React, {Component} from 'react';
import {
  Dimensions,
  KeyboardAvoidingView,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import {
  badgeColorCode,
  common,
  commonLabelDescription,
  modalLayout,
} from '../../../../assets/style';

import Api from '../../../../provider/Api';
import Dataprovider from '../../../../provider/Dataprovider';
import Loader from '../../../../provider/Loader';

import NotFound from '../../../../components/NotFound';
import TeethSkeleton from '../../../../components/TeethSkeleton';

import {
  backgroundGrey,
  mainBgColor,
  primaryBlueHexColor,
  primaryHexColor,
  successHexColor,
} from '../../../../constants/themeColors';

import FormRadioButton from '../../../../components/FormRadioButton';
import FormSelectPicker from '../../../../components/FormSelectPicker';
import ModalSaveButton from '../../../../components/ModalSaveButton';

import {Formik} from 'formik';

import FlashMessage from 'react-native-flash-message';
import Modal from 'react-native-modal';

// import {MaterialIcons} from '@expo/vector-icons';
import Icon from 'react-native-vector-icons/FontAwesome';

import {Button} from 'native-base';

import {skeletonPlaceholderProps} from '../../../../constants/defaultValues';
import SkeletonContent from '../../../../components/SkeletonContent';

const screenWidth = Dimensions.get('window').width;
const appScreenWidth = Dimensions.get('window');
const carouselWidth = appScreenWidth.width - 30;
const imageHeight = Math.round(((carouselWidth - 10) * 10) / 16);
const imageWidth = carouselWidth - 34;

export default class ProductionUnAssignedJobDetails extends Component {
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
      productionProcessId:
        typeof this.props.navigation.state.params.productionProcessId !==
        'undefined'
          ? parseInt(this.props.navigation.state.params.productionProcessId)
          : 0,
      orderDetailId:
        typeof this.props.navigation.state.params.orderDetailId !== 'undefined'
          ? parseInt(this.props.navigation.state.params.orderDetailId)
          : 0,
      isFromQrCode:
        typeof this.props.navigation.state.params.isFromQrCode !== 'undefined'
          ? this.props.navigation.state.params.isFromQrCode
          : false,
      productionProcess: null,
      toothnumberarr: [],

      isAssignTaskModalVisible: false,
      userTypes: [
        {value: 1, label: 'All Employees'},
        {value: 2, label: 'Only Today Present Employees'},
        {value: 3, label: 'Un Occupied For Any Task(s)'},
      ],
      usertype: 1,
      users: [],
      userId: null,
    };

    this.modalFormValidate = this.modalFormValidate.bind(this);
    this.modalFormHandleSubmit = this.modalFormHandleSubmit.bind(this);
  }

  componentDidMount() {
    this.getData();
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
      options.api = 'v_1/productions/jobs/unassigned/view-by-qrcode';
    } else {
      options.api = 'v_1/productions/jobs/unassigned/view';
    }

    this.api.callPostApi(options).then(data => {
      this.setState({
        loading: false,
        refreshing: false,
      });

      if (data.status_code === 200) {
        let responseData = data.response.data;

        this.setState({
          productionProcessId:
            responseData.productionprocess.productionprocessid,
          productionProcess: responseData.productionprocess,
          toothnumberarr:
            responseData.productionprocess.orderdetail.toothnumberarr,
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

  toggleAssignTaskFormModal = () => {
    this.setState({
      isAssignTaskModalVisible: !this.state.isAssignTaskModalVisible,
    });
  };

  getModalFormData = () => {
    let formData = new FormData();
    formData.append('usertype', this.state.usertype);

    this.setState({
      transparentLoader: true,
    });

    let options = {
      api: 'v_1/productions/jobs/unassigned/assign-user/get-data',
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

      if (data.status_code === 200) {
        let responseData = data.response.data;
        this.setState({
          users: responseData.users,
          userId: null,
        });
      } else {
        let errormessage = null;
        if (
          typeof data.status_code !== 'undefined' &&
          data.status_code === 422
        ) {
          errormessage = data.response.data.message;
        }
        this.api.showErrorMessageOnRef(
          this.modalFlashMessageRef,
          data.response.message,
          errormessage,
        );
      }
    });
  };

  resetModalFormData = () => {
    this.setState({
      usertype: 1,
      users: [],
      userId: null,
    });
  };

  handleChangeUserType = (usertype, event) => {
    this.setState({usertype});

    this.setState(
      {
        usertype,
      },
      this.getModalFormData,
    );
  };

  handleChangeUser = userId => {
    if (this.state.userId !== userId) {
      this.setState({userId: userId});
    }
  };

  modalFormHandleSubmit = values => {
    const formData = new FormData();
    formData.append('productionprocessid', this.state.productionProcessId);
    formData.append('userid', this.state.userId);

    let options = {
      api: 'v_1/productions/jobs/unassigned/assign-user/store',
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

      if (responseData.status_code === 200) {
        this.setState({
          productionProcess: responseData.response.data.productionprocess,
          usertype: 1,
          users: [],
          userId: null,
        });
        this.api.showSuccessMessageOnRef(
          this.modalFlashMessageRef,
          responseData.response.message,
          null,
        );
        setTimeout(() => {
          this.toggleAssignTaskFormModal();
          this.props.navigation.push('ProductionOngoingJobDetails', {
            productionProcessId: this.state.productionProcessId,
            orderDetailId: this.state.orderDetailId,
            isFromQrCode: false,
          });
        }, 4500);
      } else {
        let errormessage = null;
        if (
          typeof responseData.status_code !== 'undefined' &&
          responseData.status_code === 422
        ) {
          errormessage = responseData.response.data.message;
        }
        this.api.showErrorMessageOnRef(
          this.modalFlashMessageRef,
          responseData.response.message,
          errormessage,
        );
      }
    });
  };

  modalFormValidate(values) {
    let errors = {};
    if (
      typeof this.state.userId === 'undefined' ||
      this.state.userId === '' ||
      this.state.userId === null
    ) {
      errors.userid = 'Please select assigned to.';
    }
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
        height: 45,
        borderRadius: 30,
        marginTop: 26,
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
                {margin: 0, borderRadius: 0, paddingHorizontal: 20},
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
                                'ProductionHeadOrderView',
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
                            Assigned To
                          </Text>
                        </View>
                        <View style={commonLabelDescription.listSeperator}>
                          <Text style={commonLabelDescription.labelText}>
                            :
                          </Text>
                        </View>
                        <View style={styles.descriptionContainer}>
                          {this.state.productionProcess.userid !== null &&
                          this.state.productionProcess.userid !== '' ? (
                            <Text style={commonLabelDescription.labelValue}>
                              {this.state.productionProcess.username}
                            </Text>
                          ) : (
                            <Text
                              style={[
                                commonLabelDescription.labelValue,
                                common.mutedText,
                              ]}>
                              {this.state.productionProcess.username}
                            </Text>
                          )}
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
                              <Text style={commonLabelDescription.labelValue}>
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
                    {this.state.productionProcess.userid === null ||
                    this.state.productionProcess.userid == '' ? (
                      <View style={styles.buttonBlock}>
                        <View style={styles.buttonContainer}>
                          <Button
                            block
                            iconLeft
                            rounded
                            style={{backgroundColor: successHexColor}}
                            onPress={this.toggleAssignTaskFormModal}>
                            <Icon name="user" style={styles.buttonIconStyle} />
                            <Text style={styles.buttonTextStyle}>
                              Assign Employee For The Task
                            </Text>
                          </Button>
                        </View>
                      </View>
                    ) : null}
                    <Modal
                      isVisible={this.state.isAssignTaskModalVisible}
                      onBackButtonPress={this.toggleAssignTaskFormModal}
                      backdropOpacity={0.5}
                      style={modalLayout.modalContainer}
                      animationInTiming={500}
                      animationOutTiming={500}
                      onModalWillShow={this.getModalFormData}
                      onModalHide={this.resetModalFormData}>
                      <Loader loading={this.state.transparentLoader} />
                      <View style={modalLayout.body}>
                        <View style={modalLayout.header}>
                          {/* <MaterialIcons
                            name="close"
                            size={28}
                            style={modalLayout.headerMenuicon}
                            onPress={this.toggleAssignTaskFormModal}
                          /> */}
                          <View>
                            <Text style={modalLayout.headertext}>
                              Assign Employee
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
                                      initialValues={{}}
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
                                            <FormRadioButton
                                              name="usertype"
                                              value={this.state.usertype}
                                              onPress={
                                                this.handleChangeUserType
                                              }
                                              label="Filter by Availability"
                                              errors={errors.usertype}
                                              options={this.state.userTypes}
                                            />
                                            <FormSelectPicker
                                              label="Assigned To"
                                              placeholder={{
                                                label: 'Select Employee',
                                                value: '',
                                              }}
                                              value={this.state.userId}
                                              onValueChange={
                                                this.handleChangeUser
                                              }
                                              items={this.state.users}
                                              errors={errors.userid}
                                              disabled={false}
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
});
