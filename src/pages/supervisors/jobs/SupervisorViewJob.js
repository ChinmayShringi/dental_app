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
  mainBgColor,
  primaryBlueHexColor,
  primaryHexColor,
  successHexColor,
} from '../../../constants/themeColors';

import FormTextArea from '../../../components/FormTextArea';
import ModalSaveButton from '../../../components/ModalSaveButton';

import {Formik} from 'formik';

import FlashMessage from 'react-native-flash-message';
import Modal from 'react-native-modal';

// import {MaterialIcons} from '@expo/vector-icons';
import Icon from 'react-native-vector-icons/FontAwesome';

import {Button} from 'native-base';

import {skeletonPlaceholderProps} from '../../../constants/defaultValues';
import SkeletonContent from '../../../components/SkeletonContent';

const screenWidth = Dimensions.get('window').width;

export default class SupervisorViewJob extends Component {
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
      orderDetailId:
        typeof this?.props?.navigation?.state?.params?.orderDetailId !== 'undefined'
          ? parseInt(this?.props?.navigation?.state?.params?.orderDetailId)
          : 0,
      orderdetail: null,
      toothnumberarr: [],

      isRejectJobModalVisible: false,
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
    formData.append('orderdetailid', this.state.orderDetailId);

    let options = {
      api: 'v_1/supervisors/jobs/view',
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
          orderdetail: responseData.orderdetail,
          toothnumberarr: responseData.orderdetail.toothnumberarr,
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

  sendToProduction = () => {
    Alert.alert(
      'Confirmation Required',
      "Are sure you've verified the parcel and want to send parcel for production?",
      [
        {
          text: 'Cancel',
          onPress: () => {
            console.log('Cancel CLicked');
          },
          style: 'cancel',
        },
        {
          text: 'Sure, Send For Production',
          onPress: () => {
            this.setState({transparentLoader: true});

            let formData = new FormData();
            formData.append(
              'orderdetailid',
              this.state.orderDetailId === null ? '' : this.state.orderDetailId,
            );

            let options = {
              api: 'v_1/supervisors/jobs/send-to-production',
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
                  orderdetail: responseData.orderdetail,
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
    formData.append(
      'orderdetailid',
      this.state.orderDetailId === null ? '' : this.state.orderDetailId,
    );
    formData.append('rejectreason', values.rejectreason);

    let options = {
      api: 'v_1/supervisors/jobs/reject',
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
          orderdetail: responseData?.response.data.orderdetail,
        });
        this.api.showSuccessMessageOnRef(
          this.modalFlashMessageRef,
          responseData?.response.message,
          null,
        );
        setTimeout(() => {
          this.toggleRejectJobFormModal();
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
        marginBottom: 20,
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
        width: 230,
        height: 16,
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
                  borderRadius: 0,
                  marginTop: 10,
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
                {this.state.orderdetail !== null && !this.state.loading ? (
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
                                'SupervisorViewOrderForJob',
                                {
                                  orderId: this.state.orderdetail.orderid,
                                  isOngoingJob: false,
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
                            #{this.state.orderdetail.orderdetailid}
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
                            #{this.state.orderdetail.orderid}
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
                            {this.state.orderdetail.categoryid !== null &&
                            this.state.orderdetail.categoryid !== '' ? (
                              <Text style={commonLabelDescription.labelValue}>
                                {this.state.orderdetail.categoryname}
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
                            {this.state.orderdetail.productid !== null &&
                            this.state.orderdetail.productid !== '' ? (
                              <Text style={commonLabelDescription.labelValue}>
                                {this.state.orderdetail.productname}
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
                            {this.state.orderdetail.toothnumber !== null &&
                            this.state.orderdetail.toothnumber !== '' ? (
                              <Text style={commonLabelDescription.labelValue}>
                                {this.state.orderdetail.toothnumbertext}
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
                            {this.state.orderdetail.brandid !== null &&
                            this.state.orderdetail.brandid !== '' ? (
                              <Text style={commonLabelDescription.labelValue}>
                                {this.state.orderdetail.brandname}
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
                            {this.state.orderdetail.poticdesign !== null &&
                            this.state.orderdetail.poticdesign !== '' ? (
                              <Text style={commonLabelDescription.labelValue}>
                                {this.state.orderdetail.poticdesigntext}
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
                            {this.state.orderdetail.shadeid !== null &&
                            this.state.orderdetail.shadeid !== '' ? (
                              <Text style={commonLabelDescription.labelValue}>
                                {this.state.orderdetail.shadename}
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
                            {this.state.orderdetail.shadenotes !== null &&
                            this.state.orderdetail.shadenotes !== '' ? (
                              <Text style={commonLabelDescription.labelValue}>
                                {this.state.orderdetail.shadenotes}
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
                            {this.state.orderdetail.description !== null &&
                            this.state.orderdetail.description !== '' ? (
                              <Text style={commonLabelDescription.labelValue}>
                                {this.state.orderdetail.description}
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
                                this.state.orderdetail.statuscolor,
                              ),
                            ]}>
                            {this.state.orderdetail.statustext}
                          </Text>
                        </View>
                      </View>

                      {this.state.orderdetail.status === 3 ? (
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
                              Rejection Reason
                            </Text>
                          </View>
                          <View style={commonLabelDescription.listSeperator}>
                            <Text style={commonLabelDescription.labelText}>
                              :
                            </Text>
                          </View>
                          <View style={styles.descriptionContainer}>
                            <View>
                              {this.state.orderdetail.rejectreason !== null &&
                              this.state.orderdetail.rejectreason !== '' ? (
                                <Text style={commonLabelDescription.labelValue}>
                                  {this.state.orderdetail.rejectreason}
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
                      ) : null}
                    </View>

                    <View style={common.seperator} />

                    <View>
                      <Text style={commonLabelDescription.blockTitle}>
                        Payment Details
                      </Text>

                      <View style={commonLabelDescription.listContainer}>
                        <View
                          style={[
                            commonLabelDescription.listLabelContainer,
                            styles.priceLabelConatiner,
                          ]}>
                          <Text
                            style={[
                              commonLabelDescription.labelText,
                              styles.priceLabelText,
                            ]}>
                            No. of Teeths * Price
                          </Text>
                        </View>
                        <View
                          style={[
                            commonLabelDescription.listSeperator,
                            styles.mathSymbolContainer,
                          ]}>
                          <Text style={commonLabelDescription.labelText}>
                            +
                          </Text>
                        </View>
                        <View style={styles.priceContainer}>
                          <Text
                            style={[
                              commonLabelDescription.labelValue,
                              styles.priceText,
                            ]}>
                            {this.state.orderdetail.numberofteeths} *{' '}
                            {this.state.orderdetail.price}
                          </Text>
                        </View>
                      </View>

                      <View style={commonLabelDescription.listContainer}>
                        <View
                          style={[
                            commonLabelDescription.listLabelContainer,
                            styles.priceLabelConatiner,
                          ]}>
                          <Text
                            style={[
                              commonLabelDescription.labelText,
                              styles.priceLabelText,
                            ]}>
                            Discount Percentage
                          </Text>
                        </View>
                        <View
                          style={[
                            commonLabelDescription.listSeperator,
                            styles.mathSymbolContainer,
                          ]}>
                          <Text style={commonLabelDescription.labelText}>
                            -
                          </Text>
                        </View>
                        <View style={styles.priceContainer}>
                          <Text
                            style={[
                              commonLabelDescription.labelValue,
                              styles.priceText,
                            ]}>
                            {this.state.orderdetail.discountpercentage}
                          </Text>
                        </View>
                      </View>

                      <View style={commonLabelDescription.listContainer}>
                        <View
                          style={[
                            commonLabelDescription.listLabelContainer,
                            styles.priceLabelConatiner,
                          ]}>
                          <Text
                            style={[
                              commonLabelDescription.labelText,
                              styles.priceLabelText,
                            ]}>
                            Discount Amount
                          </Text>
                        </View>
                        <View
                          style={[
                            commonLabelDescription.listSeperator,
                            styles.mathSymbolContainer,
                          ]}>
                          <Text style={commonLabelDescription.labelText}>
                            -
                          </Text>
                        </View>
                        <View style={styles.priceContainer}>
                          <Text
                            style={[
                              commonLabelDescription.labelValue,
                              styles.priceText,
                            ]}>
                            {this.state.orderdetail.discountamount}
                          </Text>
                        </View>
                      </View>

                      <View style={commonLabelDescription.listContainer}>
                        <View
                          style={[
                            commonLabelDescription.listLabelContainer,
                            styles.priceLabelConatiner,
                          ]}>
                          <Text
                            style={[
                              commonLabelDescription.labelText,
                              styles.priceLabelText,
                            ]}>
                            Modification Charges
                          </Text>
                        </View>
                        <View
                          style={[
                            commonLabelDescription.listSeperator,
                            styles.mathSymbolContainer,
                          ]}>
                          <Text style={commonLabelDescription.labelText}>
                            +
                          </Text>
                        </View>
                        <View style={styles.priceContainer}>
                          <Text
                            style={[
                              commonLabelDescription.labelValue,
                              styles.priceText,
                            ]}>
                            {this.state.orderdetail.modificationcharges}
                          </Text>
                        </View>
                      </View>

                      <View
                        style={[
                          common.seperator,
                          {
                            width: '100%',
                            marginTop: 5,
                            marginBottom: 0,
                            borderBottomColor: '#333',
                          },
                        ]}
                      />

                      <View style={commonLabelDescription.listContainer}>
                        <View
                          style={[
                            commonLabelDescription.listLabelContainer,
                            styles.priceLabelConatiner,
                          ]}>
                          <Text
                            style={[
                              commonLabelDescription.labelText,
                              styles.priceLabelText,
                            ]}>
                            Total Amount
                          </Text>
                        </View>
                        <View
                          style={[
                            commonLabelDescription.listSeperator,
                            styles.mathSymbolContainer,
                          ]}>
                          <Text style={commonLabelDescription.labelText}>
                            =
                          </Text>
                        </View>
                        <View style={styles.priceContainer}>
                          <Text
                            style={[
                              commonLabelDescription.labelValue,
                              styles.priceText,
                            ]}>
                            {this.state.orderdetail.totalprice}
                          </Text>
                        </View>
                      </View>
                    </View>
                    {this.state.orderdetail.status === 1 ? (
                      <View style={styles.buttonBlock}>
                        <View style={styles.buttonContainer}>
                          <Button
                            block
                            iconLeft
                            rounded
                            style={{backgroundColor: successHexColor}}
                            onPress={this.sendToProduction}>
                            <Icon name="check" style={styles.buttonIconStyle} />
                            <Text style={styles.buttonTextStyle}>
                              Send for Production
                            </Text>
                          </Button>
                        </View>
                        <View style={styles.buttonContainer}>
                          <Button
                            block
                            iconLeft
                            rounded
                            style={{backgroundColor: dangerHexColor}}
                            onPress={this.toggleRejectJobFormModal}>
                            <Icon name="close" style={styles.buttonIconStyle} />
                            <Text style={styles.buttonTextStyle}>Reject</Text>
                          </Button>
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
                                              placeholder="Enter job rejection reason"
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
    width: 110,
  },
  descriptionContainer: {
    width: screenWidth - 160,
  },
  mathSymbolContainer: {
    width: 20,
  },
  priceLabelConatiner: {
    width: 160,
  },
  priceLabelText: {},
  priceContainer: {
    width: screenWidth - 226,
  },
  priceText: {
    textAlign: 'right',
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
