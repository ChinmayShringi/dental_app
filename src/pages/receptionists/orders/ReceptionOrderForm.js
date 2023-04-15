import React, {Component} from 'react';
import {
  Alert,
  Dimensions,
  FlatList,
  Image,
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import {Body, Button, Card, CardItem, Tab, TabHeading, Tabs} from 'native-base';

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

import {
  callLogCardLayout,
  common,
  commonCard,
  commonLabelDescription,
  modalLayout,
  tabStyle,
} from '../../../assets/style';

import Icon from 'react-native-vector-icons/FontAwesome';

import FormCheckBox from '../../../components/FormCheckBox';
import FormDatePicker from '../../../components/FormDatePicker';
import FormInput from '../../../components/FormInput';
import FormRadioButton from '../../../components/FormRadioButton';
import FormSelectPicker from '../../../components/FormSelectPicker';
import FormTextArea from '../../../components/FormTextArea';

import ModalSaveButton from '../../../components/ModalSaveButton';
import TeethSkeleton from '../../../components/TeethSkeleton';

import Api from '../../../provider/Api';
import Dataprovider from '../../../provider/Dataprovider';
import Loader from '../../../provider/Loader';

import {Formik} from 'formik';

// import {MaterialIcons} from '@expo/vector-icons';
import FlashMessage from 'react-native-flash-message';
import Modal from 'react-native-modal';

import {ActionSheet} from 'native-base';
import Carousel, {Pagination} from 'react-native-snap-carousel';
// import {LinearGradient} from 'expo-linear-gradient';
import ImagePicker from 'react-native-image-crop-picker';

import update from 'immutability-helper';
import moment from 'moment';

const screenWidth = Dimensions.get('window').width;
const appScreenWidth = Dimensions.get('window');
const carouselWidth = appScreenWidth.width - 30;
const imageHeight = Math.round(((carouselWidth - 10) * 10) / 14);
const imageWidth = carouselWidth - 34;
var isOrderFormSubmitted = false;

export default class ReceptionOrderForm extends Component {
  modalFlashMessageRef = null;

  api = new Api();
  dataProvider = new Dataprovider();

  submitForm = null;
  handleSubmitFormForHeaderButton = e => {
    isOrderFormSubmitted = true;
    if (this.submitForm) {
      this.submitForm();
    }
  };
  bindSubmitFormToHeaderButton = submitForm => {
    this.submitForm = submitForm;
  };

  submitModalForm = null;
  handleSubmitFormModalForHeaderButton = e => {
    if (this.submitModalForm) {
      this.submitModalForm();
    }
  };
  bindSubmitFormToModalHeaderButton = submitForm => {
    this.submitModalForm = submitForm;
  };

  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      activeCarouselIndex: 0,
      orderId:
        typeof this?.props?.navigation?.state?.params?.orderId !== 'undefined'
          ? parseInt(this?.props?.navigation?.state?.params?.orderId)
          : 0,
      order: null,
      orderimages: [],
      orderdetails: [],
      orderedtoothnumbers: [],
      calllogs: [],
      calllogId: null,
      customers: [],
      customerId: null,
      genders: [],
      gender: null,
      orderDate: null,
      deliveryDate: null,
      casetypes: [],
      casetype: null,
      restorationtypes: [],
      restorationtype: null,
      casestages: [],
      casestage: null,
      enclosures: [],
      selectedenclosures: [],
      insufficientrooms: [],
      insufficientroom: null,
      occlusalcontacts: [],
      occlusalcontact: null,
      embrassors: [],
      embrassor: null,
      occlusalstains: [],
      occlusalstain: null,
      categories: [],
      brands: [],
      toothnumbers: [],
      shades: [],
      poticdesigns: [],
      totalprice: 0,

      isAskModificationCharges: false,
      isJobModalVisible: false,
      modalTitle: 'Add New Job',
      modalEditModeIndex: null,
      selectedModalObject: null,
    };

    this.validate = this.validate.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

    this.modalFormValidate = this.modalFormValidate.bind(this);
    this.modalFormHandleSubmit = this.modalFormHandleSubmit.bind(this);
  }

  componentDidMount() {
    this.getFormData();
    this.props.navigation.setParams({
      handleSave: this.handleSubmitFormForHeaderButton,
    });
  }

  getFormData() {
    let formData = new FormData();
    formData.append('orderid', this.state.orderId);

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

    if (this.state.orderId === 0) {
      options.api = 'v_1/receptionists/orders/add';
    } else {
      options.api = 'v_1/receptionists/orders/edit';
    }

    this.api.callPostApi(options).then(data => {
      this.setState({loading: false});

      if (data.status_code === 200) {
        let responseData = data.response.data;
        let order = responseData.order;
        let isAskModificationCharges =
          typeof order.casetype !== 'undefined' &&
          order.casetype !== null &&
          order.casetype == 3
            ? true
            : false;

        this.setState({
          order: order,
          orderimages: responseData.orderimages,
          orderdetails: responseData.orderdetails,
          orderedtoothnumbers: responseData.orderedtoothnumbers,
          calllogs: responseData.calllogs,
          calllogId:
            typeof order.calllogid !== 'undefined' && order.calllogid !== null
              ? parseInt(order.calllogid)
              : null,
          customers: responseData.customers,
          customerId:
            typeof order.customerid !== 'undefined' && order.customerid !== null
              ? parseInt(order.customerid)
              : null,
          genders: responseData.genders,
          gender:
            typeof order.gender !== 'undefined' && order.gender !== null
              ? parseInt(order.gender)
              : null,
          orderDate:
            typeof order.orderdate !== 'undefined' && order.orderdate !== null
              ? moment(order.orderdate)
              : null,
          deliveryDate:
            typeof order.deliverydate !== 'undefined' &&
            order.deliverydate !== null
              ? moment(order.deliverydate)
              : null,
          casetypes: responseData.casetypes,
          casetype:
            typeof order.casetype !== 'undefined' && order.casetype !== null
              ? parseInt(order.casetype)
              : null,
          restorationtypes: responseData.restorationtypes,
          restorationtype:
            typeof order.restorationtype !== 'undefined' &&
            order.restorationtype !== null
              ? parseInt(order.restorationtype)
              : null,
          casestages: responseData.casestage,
          casestage:
            typeof order.casestage !== 'undefined' && order.casestage !== null
              ? parseInt(order.casestage)
              : null,
          enclosures: responseData.enclosures,
          selectedenclosures: responseData.selectedenclosures,
          insufficientrooms: responseData.insufficientrooms,
          insufficientroom:
            typeof order.insufficientroom !== 'undefined' &&
            order.insufficientroom !== null
              ? parseInt(order.insufficientroom)
              : null,
          occlusalcontacts: responseData.occlusalcontacts,
          occlusalcontact:
            typeof order.occlusalcontact !== 'undefined' &&
            order.occlusalcontact !== null
              ? parseInt(order.occlusalcontact)
              : null,
          embrassors: responseData.embrassors,
          embrassor:
            typeof order.embrassor !== 'undefined' && order.embrassor !== null
              ? parseInt(order.embrassor)
              : null,
          occlusalstains: responseData.occlusalstains,
          occlusalstain:
            typeof order.occlusalstain !== 'undefined' &&
            order.occlusalstain !== null
              ? parseInt(order.occlusalstain)
              : null,
          categories: responseData.categories,
          brands: responseData.brands,
          toothnumbers: responseData.toothnumbers,
          shades: responseData.shades,
          poticdesigns: responseData.poticdesigns,
          totalprice: this.state.orderId > 0 ? order.totalprice : 0,
          isAskModificationCharges: isAskModificationCharges,
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

  handleChangeCalllog = calllogId => {
    if (this.state.calllogId !== calllogId) {
      this.setState({
        loading: true,
        customerId: null,
        calllogId: calllogId,
      });

      if (parseInt(calllogId) > 0) {
        const formData = new FormData();
        formData.append('calllogid', parseInt(calllogId));

        let options = {
          api: 'v_1/receptionists/orders/get-customer-for-calllog',
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

          if (data.status_code === 200) {
            let responseData = data.response.data;
            this.setState({
              customerId: responseData.customer.customerid,
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
      } else {
        this.setState({loading: false});
      }
    }
  };

  handleChangeCustomer = customerId => {
    if (this.state.customerId !== customerId) {
      this.setState({customerId: customerId});
    }
  };

  handleChangeGender = (gender, event) => {
    this.setState({gender});
  };

  handleOnChangeOrderDate = orderDate => {
    this.setState({orderDate});
  };

  handleOnChangeDeliveryDate = deliveryDate => {
    this.setState({deliveryDate});
  };

  handleChangeCaseType = (casetype, event) => {
    this.setState({casetype});
    if (casetype == 3) {
      this.setState({isAskModificationCharges: true});
    } else {
      this.setState({isAskModificationCharges: false});
    }

    let orderdetails = this.state.orderdetails;
    orderdetails.forEach((orderdetail, index) => {
      orderdetail.modificationcharges = 0;

      let price = parseFloat(orderdetail.price);
      let discountpercentage = parseFloat(orderdetail.discountpercentage);
      let discountpercentage_amount = 0;
      let modificationcharges = 0;

      if (price > 0) {
        discountpercentage_amount = (price * discountpercentage) / 100;
      }
      let discountamount = parseFloat(orderdetail.discountamount);
      let totalPrice =
        price -
        discountpercentage_amount -
        discountamount +
        modificationcharges;
      orderdetail.totalprice = totalPrice;
    });

    this.setState({orderdetails: orderdetails});

    setTimeout(() => {
      this.calculateTotalPrice();
    });
  };

  handleChangeRestorationType = (restorationtype, event) => {
    this.setState({restorationtype});
  };

  handleChangeCaseStage = (casestage, event) => {
    this.setState({casestage});
  };

  handleChangeEnclosure = (value, event) => {
    // VALUE NOT EXIST IN ARRAY (PUSH VALUE IN ARRAY)
    if (!this.state.selectedenclosures.some(enclosure => value === enclosure)) {
      this.setState({
        selectedenclosures: update(this.state.selectedenclosures, {
          $push: [value],
        }),
      });
    }
    // VALUE EXIST IN ARRAY (REMOVE VALUE FROM ARRAY)
    else {
      var oldSelectedEnclosures = [...this.state.selectedenclosures];
      var index = oldSelectedEnclosures.indexOf(value);
      if (index !== -1) {
        oldSelectedEnclosures.splice(index, 1);
        this.setState({selectedenclosures: oldSelectedEnclosures});
      }
    }
  };

  handleChangeInsufficientRoom = (insufficientroom, event) => {
    this.setState({insufficientroom});
  };

  handleChangeEmbrassor = (embrassor, event) => {
    this.setState({embrassor});
  };

  handleChangeOcclusalContact = (occlusalcontact, event) => {
    this.setState({occlusalcontact});
  };

  handleChangeOcclusalStain = (occlusalstain, event) => {
    this.setState({occlusalstain});
  };

  renderCarouselItem = ({item, index}) => {
    return (
      <View
        style={[
          commonCard.imageContainer,
          {width: '100%', position: 'relative'},
        ]}>
        <TouchableOpacity
          onPress={() => {
            this.onClickEditImage(index, item.istobedeleted);
          }}
          activeOpacity={0.9}>
          <Image
            source={{uri: item.imagefilepath}}
            style={{
              height: imageHeight,
              width: '100%',
              flex: 1,
              borderRadius: 2,
            }}
            resizeMode="contain"
          />
          {item.istobedeleted !== 0 ? (
            <></>
          ) : // <LinearGradient
          //   colors={['rgba(255, 255, 255, 0.8)', 'rgba(255, 255, 255, 0.8)']}
          //   style={{
          //     position: 'absolute',
          //     left: 0,
          //     right: 0,
          //     top: 0,
          //     height: imageHeight,
          //   }}
          // />
          null}
          {item.istobedeleted !== 0 ? (
            <Icon
              name="trash"
              size={50}
              style={{
                color: dangerHexColor,
                position: 'absolute',
                left: carouselWidth / 2 - 20,
                top: imageHeight / 2 - 35,
              }}
            />
          ) : null}
          {item.istobedeleted !== 0 ? (
            <Text
              style={{
                fontSize: 16,
                fontWeight: 'bold',
                textAlign: 'center',
                fontStyle: 'italic',
                color: dangerHexColor,
                position: 'absolute',
                left: 0,
                top: imageHeight / 2 + 15,
                width: carouselWidth,
              }}>
              To be deleted
            </Text>
          ) : null}
        </TouchableOpacity>
      </View>
    );
  };

  takePhotoFromCamera = () => {
    ImagePicker.openCamera({
      mediaType: 'photo',
      multiple: true,
      includeBase64: true,
    })
      .then(image => {
        this.onSelectedImage([image]);
      })
      .catch(e => {
        let permissionErrorMessage = 'Error: Required permission missing';
        let selectionCancelledErrorMessage =
          'Error: User cancelled image selection';

        // Permission Missing
        if (e === permissionErrorMessage) {
          this.api.showPermissionRelatedError(
            'Missing Permissions!',
            'Please enable camera and storage permissions to use this feature.',
            'Ok, Got It',
          );
        }
      });
  };

  choosePhotoFromLibrary = () => {
    ImagePicker.openPicker({
      mediaType: 'photo',
      multiple: true,
      includeBase64: true,
    })
      .then(image => {
        this.onSelectedImage(image);
      })
      .catch(e => {
        let permissionErrorMessage = 'Error: Required permission missing';
        let selectionCancelledErrorMessage =
          'Error: User cancelled image selection';

        // Permission Missing
        if (e === permissionErrorMessage) {
          this.api.showPermissionRelatedError(
            'Missing Permissions!',
            'Please enable storage permission to use this feature.',
            'Ok, Got It',
          );
        }
      });
  };

  onSelectedImage = images => {
    this.setState({loading: true});
    let timeOutTime = 2000;
    if (images.length > 2 && images.length <= 5) {
      timeOutTime = 5000;
    } else if (images.length > 5) {
      timeOutTime = 10000;
    }
    images.forEach((image, index) => {
      const source = {uri: image.path};
      let pathParts = image.path.split('/');

      let item = {
        id: Date.now(),
        url: source,
        content: image.data,
        type: image.mime,
        uri: image.path,
        name: pathParts[pathParts.length - 1],
        istobedeleted: 0,
        orderimageid: 0,
        imagefilepath: image.path,
      };
      this.setState({
        orderimages: update(this.state.orderimages, {
          $push: [item],
        }),
      });
    });

    setTimeout(() => {
      this.setState({
        loading: false,
        activeCarouselIndex: this.state.orderimages.length - 1,
      });
    }, timeOutTime);
  };

  onClickEditImage = (index, istobedeleted) => {
    let BUTTONS = [];
    if (istobedeleted === 0) {
      BUTTONS = [
        {text: 'Remove Image', icon: 'trash', iconColor: dangerHexColor},
        {text: 'Cancel', icon: 'close', iconColor: successHexColor},
      ];
    } else {
      BUTTONS = [
        {text: 'Undo Remove', icon: 'undo', iconColor: dangerHexColor},
        {text: 'Cancel', icon: 'close', iconColor: successHexColor},
      ];
    }

    ActionSheet.show(
      {
        options: BUTTONS,
        cancelButtonIndex: 3,
        title: 'Image Options',
      },
      buttonIndex => {
        switch (buttonIndex) {
          case 0:
            this.removeSelectedImage(index, istobedeleted);
            break;
          default:
            break;
        }
      },
    );
  };

  removeSelectedImage = (index, istobedeleted) => {
    let newValue = istobedeleted === 0 ? 1 : 0;
    this.setState({
      orderimages: update(this.state.orderimages, {
        [index]: {
          istobedeleted: {$set: newValue},
        },
      }),
    });
  };

  renderJobItem = ({item, index}) => {
    if (item.orderdetaildeleted != 0) {
      return null;
    } else {
      return (
        <View>
          <Card style={callLogCardLayout.cardContainer}>
            <CardItem
              style={[
                callLogCardLayout.cardBody,
                {
                  paddingBottom: 10,
                  paddingTop: 10,
                  paddingLeft: 10,
                  paddingRight: 10,
                },
              ]}>
              <Body>
                <View
                  style={{
                    flex: 1,
                    flexDirection: 'column',
                    width: '100%',
                  }}>
                  <View
                    style={{
                      flex: 1,
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      position: 'absolute',
                      top: 0,
                      right: 0,
                    }}>
                    <View style={{alignSelf: 'flex-start'}}>
                      <Text></Text>
                    </View>
                    <View style={{alignSelf: 'flex-end'}}>
                      <View style={{flex: 1, flexDirection: 'row'}}>
                        <TouchableOpacity
                          onPress={() => {
                            this.editJob(index);
                          }}>
                          <Text style={{color: primaryHexColor}}>
                            <Icon name="pencil-square-o" size={16} />
                          </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                          onPress={() => {
                            this.removeJob(index);
                          }}
                          style={{marginLeft: 5}}>
                          <Text style={{color: primaryHexColor}}>
                            <Icon name="trash" size={16} />
                          </Text>
                        </TouchableOpacity>
                      </View>
                    </View>
                  </View>
                  <View style={{flex: 1, marginTop: 10}}>
                    <View style={commonLabelDescription.listContainer}>
                      <View
                        style={[
                          commonLabelDescription.listLabelContainer,
                          styles.labelContainer,
                        ]}>
                        <Text style={commonLabelDescription.labelText}>
                          Restoration Type
                        </Text>
                      </View>
                      <View style={commonLabelDescription.listSeperator}>
                        <Text style={commonLabelDescription.labelText}>:</Text>
                      </View>
                      <View style={styles.descriptionContainer}>
                        {item.categoryid !== null && item.categoryid !== '' ? (
                          <Text style={commonLabelDescription.labelValue}>
                            {item.categoryname}
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

                    <View style={commonLabelDescription.listContainer}>
                      <View
                        style={[
                          commonLabelDescription.listLabelContainer,
                          styles.labelContainer,
                        ]}>
                        <Text style={commonLabelDescription.labelText}>
                          Product
                        </Text>
                      </View>
                      <View style={commonLabelDescription.listSeperator}>
                        <Text style={commonLabelDescription.labelText}>:</Text>
                      </View>
                      <View style={styles.descriptionContainer}>
                        {item.productid !== null && item.productid !== '' ? (
                          <Text style={commonLabelDescription.labelValue}>
                            {item.productname}
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

                    <View style={commonLabelDescription.listContainer}>
                      <View
                        style={[
                          commonLabelDescription.listLabelContainer,
                          styles.labelContainer,
                        ]}>
                        <Text style={commonLabelDescription.labelText}>
                          Tooth Number(s)
                        </Text>
                      </View>
                      <View style={commonLabelDescription.listSeperator}>
                        <Text style={commonLabelDescription.labelText}>:</Text>
                      </View>
                      <View style={styles.descriptionContainer}>
                        {item.toothnumber !== null &&
                        item.toothnumber !== '' ? (
                          <Text style={commonLabelDescription.labelValue}>
                            {item.toothnumbertext}
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

                    <View style={commonLabelDescription.listContainer}>
                      <View
                        style={[
                          commonLabelDescription.listLabelContainer,
                          styles.labelContainer,
                        ]}>
                        <Text style={commonLabelDescription.labelText}>
                          Brand
                        </Text>
                      </View>
                      <View style={commonLabelDescription.listSeperator}>
                        <Text style={commonLabelDescription.labelText}>:</Text>
                      </View>
                      <View style={styles.descriptionContainer}>
                        {item.brandid !== null && item.brandid !== '' ? (
                          <Text style={commonLabelDescription.labelValue}>
                            {item.brandname}
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

                    <View style={commonLabelDescription.listContainer}>
                      <View
                        style={[
                          commonLabelDescription.listLabelContainer,
                          styles.labelContainer,
                        ]}>
                        <Text style={commonLabelDescription.labelText}>
                          Portic Design
                        </Text>
                      </View>
                      <View style={commonLabelDescription.listSeperator}>
                        <Text style={commonLabelDescription.labelText}>:</Text>
                      </View>
                      <View style={styles.descriptionContainer}>
                        {item.poticdesign !== null &&
                        item.poticdesign !== '' ? (
                          <Text style={commonLabelDescription.labelValue}>
                            {item.poticdesigntext}
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

                    <View style={commonLabelDescription.listContainer}>
                      <View
                        style={[
                          commonLabelDescription.listLabelContainer,
                          styles.labelContainer,
                        ]}>
                        <Text style={commonLabelDescription.labelText}>
                          Shade
                        </Text>
                      </View>
                      <View style={commonLabelDescription.listSeperator}>
                        <Text style={commonLabelDescription.labelText}>:</Text>
                      </View>
                      <View style={styles.descriptionContainer}>
                        {item.shadeid !== null && item.shadeid !== '' ? (
                          <Text style={commonLabelDescription.labelValue}>
                            {item.shadename}
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

                    <View style={commonLabelDescription.listContainer}>
                      <View
                        style={[
                          commonLabelDescription.listLabelContainer,
                          styles.labelContainer,
                        ]}>
                        <Text style={commonLabelDescription.labelText}>
                          Shade Notes
                        </Text>
                      </View>
                      <View style={commonLabelDescription.listSeperator}>
                        <Text style={commonLabelDescription.labelText}>:</Text>
                      </View>
                      <View style={styles.descriptionContainer}>
                        {item.shadenotes !== null && item.shadenotes !== '' ? (
                          <Text style={commonLabelDescription.labelValue}>
                            {item.shadenotes}
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

                    <View style={commonLabelDescription.listContainer}>
                      <View
                        style={[
                          commonLabelDescription.listLabelContainer,
                          styles.labelContainer,
                        ]}>
                        <Text style={commonLabelDescription.labelText}>
                          Description
                        </Text>
                      </View>
                      <View style={commonLabelDescription.listSeperator}>
                        <Text style={commonLabelDescription.labelText}>:</Text>
                      </View>
                      <View style={styles.descriptionContainer}>
                        {item.description !== null &&
                        item.description !== '' ? (
                          <Text style={commonLabelDescription.labelValue}>
                            {item.description}
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

                    <View style={[common.seperator, {width: '100%'}]}></View>

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
                        <Text style={commonLabelDescription.labelText}>+</Text>
                      </View>
                      <View style={styles.priceContainer}>
                        <Text
                          style={[
                            commonLabelDescription.labelValue,
                            styles.priceText,
                          ]}>
                          {item.toothnumber.length} * {item.price}
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
                        <Text style={commonLabelDescription.labelText}>-</Text>
                      </View>
                      <View style={styles.priceContainer}>
                        <Text
                          style={[
                            commonLabelDescription.labelValue,
                            styles.priceText,
                          ]}>
                          {item.discountpercentage}
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
                        <Text style={commonLabelDescription.labelText}>-</Text>
                      </View>
                      <View style={styles.priceContainer}>
                        <Text
                          style={[
                            commonLabelDescription.labelValue,
                            styles.priceText,
                          ]}>
                          {item.discountamount}
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
                        <Text style={commonLabelDescription.labelText}>+</Text>
                      </View>
                      <View style={styles.priceContainer}>
                        <Text
                          style={[
                            commonLabelDescription.labelValue,
                            styles.priceText,
                          ]}>
                          {item.modificationcharges}
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
                      ]}></View>

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
                        <Text style={commonLabelDescription.labelText}>=</Text>
                      </View>
                      <View style={styles.priceContainer}>
                        <Text
                          style={[
                            commonLabelDescription.labelValue,
                            styles.priceText,
                          ]}>
                          {item.totalprice}
                        </Text>
                      </View>
                    </View>
                  </View>
                </View>
              </Body>
            </CardItem>
          </Card>
        </View>
      );
    }
  };

  addNewJob = () => {
    let newOrderDetail = {
      orderdetailid: 0,
      orderdetaildeleted: 0,
      toothnumber: [],
      toothposition: null,
      categoryid: null,
      categoryname: null,
      selectedcategory: null,
      products: [],
      productid: null,
      productname: null,
      toothnumbertext: null,
      brandid: null,
      brandname: null,
      shadeid: null,
      shadename: null,
      shadenotes: null,
      poticdesign: null,
      poticdesigntext: null,
      price: 0,
      discountpercentage: 0,
      discountamount: 0,
      modificationcharges: 0,
      totalprice: 0,
      description: null,
    };

    this.setState({
      modalTitle: 'Add New Job',
      selectedModalObject: newOrderDetail,
    });
    this.toggleJobFormModal();
  };

  editJob = index => {
    this.setState(prevState => {
      let selectedModalObject = Object.assign(
        {},
        prevState.orderdetails[index],
      ); // creating copy of state variable selectedModalObject
      return {selectedModalObject}; // return new object selectedModalObject object
    });
    this.setState({
      modalEditModeIndex: index,
      modalTitle: 'Edit Job',
    });
    this.toggleJobFormModal();
  };

  toggleJobFormModal = () => {
    // CLOSE MODAL
    if (this.state.isJobModalVisible) {
      this.setState({
        selectedModalObject: null,
        modalEditModeIndex: null,
      });
    }
    this.setState({isJobModalVisible: !this.state.isJobModalVisible});
  };

  removeJob = index => {
    Alert.alert(
      'Confirmation!',
      'Are you sure to delete this job?',
      [
        {
          text: 'Cancel',
          onPress: () => {
            console.log('Cancel Clicked');
          },
          style: 'cancel',
        },
        {
          text: 'Sure, Delete It',
          onPress: () => {
            // MARK ARRAY IS DELETED
            this.setState({
              orderdetails: update(this.state.orderdetails, {
                [index]: {
                  orderdetaildeleted: {$set: 1},
                },
              }),
            });

            setTimeout(() => {
              this.calculateTotalPrice();
              this.reArrangeOrderedToothNumbers();
            }, 10);
          },
        },
      ],
      {cancelable: false},
    );
  };

  calculateTotalPrice = () => {
    let allItemsTotal = 0;
    this.state.orderdetails.forEach((orderdetail, index) => {
      if (orderdetail.orderdetaildeleted == 0) {
        allItemsTotal += parseFloat(orderdetail.totalprice);
      }
    });
    this.setState({totalprice: allItemsTotal});
  };

  reArrangeOrderedToothNumbers = () => {
    let newOrderedToothNumbers = [];
    this.state.orderdetails.forEach((orderdetail, index) => {
      if (orderdetail.orderdetaildeleted === 0) {
        orderdetail.toothnumber.forEach(
          (toothnumber_value, toothnumber_index) => {
            // VALUE NOT EXIST IN ARRAY (PUSH VALUE IN ARRAY)
            if (
              !newOrderedToothNumbers.some(value => toothnumber_value === value)
            ) {
              newOrderedToothNumbers.push(toothnumber_value);
            }
          },
        );
      }
    });

    setTimeout(() => {
      this.setState({
        orderedtoothnumbers: newOrderedToothNumbers,
      });
    });
  };

  toothNumberChangedInModal = number => {
    var oldSelectedModalObject = this.state.selectedModalObject;

    // PRODUCT IS SELECTED
    if (
      typeof oldSelectedModalObject.productid !== 'undefined' &&
      oldSelectedModalObject.productid !== '' &&
      oldSelectedModalObject.productid !== null
    ) {
      let existingToothNumbers = [...oldSelectedModalObject.toothnumber];

      // VALUE NOT EXIST IN ARRAY (PUSH VALUE IN ARRAY)
      if (
        !this.state.selectedModalObject.toothnumber.some(
          toothnumber => number === toothnumber,
        )
      ) {
        existingToothNumbers.push(number);
      }
      // VALUE EXIST IN ARRAY (REMOVE VALUE FROM ARRAY)
      else {
        var toothIndex = existingToothNumbers.indexOf(number);
        if (toothIndex !== -1) {
          existingToothNumbers.splice(toothIndex, 1);
        }
      }

      setTimeout(() => {
        // oldSelectedModalObject.toothnumber  = existingToothNumbers;
        let sortedExistingToothNumbers = existingToothNumbers.sort(function (
          a,
          b,
        ) {
          return a - b;
        });
        let toothnumbertext = '';
        sortedExistingToothNumbers.forEach(value => {
          if (toothnumbertext !== '') {
            toothnumbertext = toothnumbertext + ', ' + value;
          } else {
            toothnumbertext = value;
          }
        });

        oldSelectedModalObject.toothnumber = sortedExistingToothNumbers;
        oldSelectedModalObject.toothnumbertext = toothnumbertext;
        this.setState({
          selectedModalObject: oldSelectedModalObject,
        });

        this.calculateModalItemTotalPrice();
        this.reArrangeOrderedToothNumbers();
      });
    }
    // PRODUCT NOT SELECTED YET
    else {
      this.api.showErrorMessageOnRef(
        this.modalFlashMessageRef,
        'Please select product in order to select tooth number(s).',
        null,
      );
    }
  };

  handleChangeModalCategory = selectedCategoryid => {
    if (
      this.state.selectedModalObject !== null &&
      this.state.selectedModalObject.categoryid !== selectedCategoryid
    ) {
      let categoryid =
        selectedCategoryid !== '' ? parseInt(selectedCategoryid) : null;
      let categoryname = null;
      this.state.categories.forEach((category, index) => {
        if (category.value === categoryid) {
          categoryname = category.label;
        }
      });
      // UPDATE CATEGORY ID
      this.setState({
        selectedModalObject: update(this.state.selectedModalObject, {
          categoryid: {$set: categoryid},
          categoryname: {$set: categoryname},
          products: {$set: []},
          productid: {$set: null},
          productname: {$set: null},
          price: {$set: 0},
          discountpercentage: {$set: 0},
          discountamount: {$set: 0},
          modificationcharges: {$set: 0},
          totalprice: {$set: 0},
        }),
      });

      if (categoryid !== null) {
        let formData = new FormData();
        formData.append('categoryid', categoryid);

        this.setState({loading: true});

        let options = {
          api: 'v_1/receptionists/orders/get-products-for-category',
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

          if (data.status_code === 200) {
            let responseData = data.response.data;
            this.setState({
              selectedModalObject: update(this.state.selectedModalObject, {
                categoryname: {$set: categoryname},
                products: {$set: responseData.products},
              }),
            });

            setTimeout(() => {
              this.calculateModalItemTotalPrice();
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
      }
    }
  };

  handleChangeModalProduct = selectedProductid => {
    if (this.state.calllogId != null) {
      if (
        this.state.selectedModalObject !== null &&
        this.state.selectedModalObject.productid !== selectedProductid
      ) {
        let productid =
          selectedProductid !== '' ? parseInt(selectedProductid) : null;
        let productname = null;
        this.state.selectedModalObject.products.forEach((product, index) => {
          if (product.value === productid) {
            productname = product.label;
          }
        });

        // UPDATE PRODUCT ID
        this.setState({
          selectedModalObject: update(this.state.selectedModalObject, {
            productid: {$set: productid},
            productname: {$set: productname},
            price: {$set: 0},
          }),
        });

        if (productid !== null) {
          let formData = new FormData();
          formData.append('productid', productid);
          formData.append('customerid', this.state.customerId);

          this.setState({loading: true});

          let options = {
            api: 'v_1/receptionists/orders/get-product-price',
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

            if (data.status_code === 200) {
              let responseData = data.response.data;
              this.setState({
                selectedModalObject: update(this.state.selectedModalObject, {
                  productname: {$set: productname},
                  price: {$set: responseData.price},
                }),
              });

              setTimeout(() => {
                this.calculateModalItemTotalPrice();
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
        } else {
          this.calculateModalItemTotalPrice();
        }
      }
    } else {
      this.api.showErrorMessageOnRef(
        this.modalFlashMessageRef,
        'Please select pickup request(in order details tab) to proceed further.',
        null,
      );
    }
  };

  handleChangeModalBrand = selectedBrandid => {
    if (
      this.state.selectedModalObject !== null &&
      this.state.selectedModalObject.brandid !== selectedBrandid
    ) {
      let brandid = selectedBrandid !== '' ? parseInt(selectedBrandid) : null;
      let brandname = null;
      this.state.brands.forEach((brand, index) => {
        if (brand.value === brandid) {
          brandname = brand.label;
        }
      });

      // UPDATE RECORD
      this.setState({
        selectedModalObject: update(this.state.selectedModalObject, {
          brandid: {$set: brandid},
        }),
      });

      setTimeout(() => {
        // UPDATE RECORD
        this.setState({
          selectedModalObject: update(this.state.selectedModalObject, {
            brandname: {$set: brandname},
          }),
        });
      });
    }
  };

  handleChangeModalPoticDesign = selectedPoticdesign => {
    if (
      this.state.selectedModalObject !== null &&
      this.state.selectedModalObject.poticdesign !== selectedPoticdesign
    ) {
      let poticdesign =
        selectedPoticdesign !== '' ? parseInt(selectedPoticdesign) : null;
      let poticdesigntext = null;
      this.state.poticdesigns.forEach((poticdesignObj, index) => {
        if (poticdesignObj.value === poticdesign) {
          poticdesigntext = poticdesignObj.label;
        }
      });

      // UPDATE RECORD
      this.setState({
        selectedModalObject: update(this.state.selectedModalObject, {
          poticdesign: {$set: poticdesign},
        }),
      });

      setTimeout(() => {
        // UPDATE RECORD
        this.setState({
          selectedModalObject: update(this.state.selectedModalObject, {
            poticdesigntext: {$set: poticdesigntext},
          }),
        });
      });
    }
  };

  handleChangeModalShade = selectedShadeid => {
    if (
      this.state.selectedModalObject !== null &&
      this.state.selectedModalObject.shadeid !== selectedShadeid
    ) {
      let shadeid = selectedShadeid !== '' ? parseInt(selectedShadeid) : null;
      let shadename = null;
      this.state.shades.forEach((shade, index) => {
        if (shade.value === shadeid) {
          shadename = shade.label;
        }
      });

      // UPDATE RECORD
      this.setState({
        selectedModalObject: update(this.state.selectedModalObject, {
          shadeid: {$set: shadeid},
        }),
      });

      setTimeout(() => {
        // UPDATE RECORD
        this.setState({
          selectedModalObject: update(this.state.selectedModalObject, {
            shadename: {$set: shadename},
          }),
        });
      });
    }
  };

  onChangeModalDiscountPercentage = enteredValue => {
    let validateValue = enteredValue.replace('.', '');

    // VALID ENTERED VALUE
    if (!isNaN(validateValue)) {
      let value = enteredValue != '' ? enteredValue : 0;

      // UPDATE RECORD
      this.setState({
        selectedModalObject: update(this.state.selectedModalObject, {
          discountpercentage: {$set: parseFloat(value)},
        }),
      });

      setTimeout(() => {
        this.calculateModalItemTotalPrice();
      });
    }
  };

  onChangeModalDiscountAmount = enteredValue => {
    let validateValue = enteredValue.replace('.', '');

    // VALID ENTERED VALUE
    if (!isNaN(validateValue)) {
      let value = enteredValue != '' ? enteredValue : 0;

      // UPDATE RECORD
      this.setState({
        selectedModalObject: update(this.state.selectedModalObject, {
          discountamount: {$set: parseFloat(value)},
        }),
      });

      setTimeout(() => {
        this.calculateModalItemTotalPrice();
      });
    }
  };

  onChangeModalModificationCharge = enteredValue => {
    let validateValue = enteredValue.replace('.', '');

    // VALID ENTERED VALUE
    if (!isNaN(validateValue)) {
      let value = enteredValue != '' ? enteredValue : 0;

      // UPDATE RECORD
      this.setState({
        selectedModalObject: update(this.state.selectedModalObject, {
          modificationcharges: {$set: parseFloat(value)},
        }),
      });

      setTimeout(() => {
        this.calculateModalItemTotalPrice();
      });
    }
  };

  calculateModalItemTotalPrice = () => {
    let oldSelectedModalObject = this.state.selectedModalObject;
    let orderdetail = this.state.selectedModalObject;
    let productPrice = parseFloat(orderdetail.price);
    let price = productPrice * orderdetail.toothnumber.length;
    let discountpercentage = parseFloat(orderdetail.discountpercentage);
    let discountpercentage_amount = 0;
    let modificationcharges = 0;

    if (price > 0) {
      discountpercentage_amount = (price * discountpercentage) / 100;
    }
    let discountamount = parseFloat(orderdetail.discountamount);

    if (this.state.isAskModificationCharges) {
      modificationcharges = parseFloat(orderdetail.modificationcharges);
    }

    let totalPrice =
      price - discountpercentage_amount - discountamount + modificationcharges;

    oldSelectedModalObject.totalprice = totalPrice;
    this.setState({selectedModalObject: oldSelectedModalObject});

    setTimeout(() => {
      this.calculateTotalPrice();
    });
  };

  modalFormHandleSubmit = values => {
    let oldSelectedModalObject = this.state.selectedModalObject;
    oldSelectedModalObject.shadenotes = values.shadenotes;
    oldSelectedModalObject.description = values.description;

    // Edit MODE
    if (this.state.modalEditModeIndex !== null) {
      const selectedIndex = this.state.modalEditModeIndex;
      this.setState({
        orderdetails: update(this.state.orderdetails, {
          [selectedIndex]: {$set: oldSelectedModalObject},
        }),
      });
      this.api.showSuccessMessageOnRef(
        this.modalFlashMessageRef,
        'Job details are updated into the form.',
        null,
      );
    }
    // ADD MODE
    else {
      this.setState(prevState => ({
        orderdetails: [...prevState.orderdetails, oldSelectedModalObject],
      }));
      this.api.showSuccessMessageOnRef(
        this.modalFlashMessageRef,
        'New job is added to the form.',
        null,
      );
    }

    setTimeout(() => {
      this.calculateTotalPrice();
      this.reArrangeOrderedToothNumbers();
    });

    setTimeout(() => {
      this.toggleJobFormModal();
    }, 1500);
  };

  modalFormValidate(values) {
    let errors = {};

    if (this.state.selectedModalObject.toothnumber.length !== 0) {
      let newOrderedToothNumbersExceptCurrentJob = [];
      this.state.orderdetails.forEach((orderdetail, index) => {
        if (
          orderdetail.orderdetailid !==
          this.state.selectedModalObject.orderdetailid
        ) {
          orderdetail.toothnumber.forEach(
            (toothnumber_value, toothnumber_index) => {
              // VALUE NOT EXIST IN ARRAY (PUSH VALUE IN ARRAY)
              if (
                !newOrderedToothNumbersExceptCurrentJob.some(
                  value => toothnumber_value === value,
                )
              ) {
                newOrderedToothNumbersExceptCurrentJob.push(toothnumber_value);
              }
            },
          );
        }
      });

      this.state.selectedModalObject.toothnumber.forEach(toothnumber => {
        if (
          newOrderedToothNumbersExceptCurrentJob.some(
            item => toothnumber === item,
          )
        ) {
          errors.toothnumber =
            'Job already created for the selected tooth number(s). Only one job is allowed for each tooth number.';
          this.api.showErrorMessageOnRef(
            this.modalFlashMessageRef,
            'Job already created for the selected tooth number(s). Only one job is allowed for each tooth number.',
            null,
          );
        }
      });

      if (
        typeof this.state.selectedModalObject.categoryid === 'undefined' ||
        this.state.selectedModalObject.categoryid === '' ||
        this.state.selectedModalObject.categoryid === null
      ) {
        errors.categoryid = 'Please select restoration type.';
      }

      if (
        typeof this.state.selectedModalObject.productid === 'undefined' ||
        this.state.selectedModalObject.productid === '' ||
        this.state.selectedModalObject.productid === null
      ) {
        errors.productid = 'Please select product.';
      }

      if (
        typeof this.state.selectedModalObject.brandid === 'undefined' ||
        this.state.selectedModalObject.brandid === '' ||
        this.state.selectedModalObject.brandid === null
      ) {
        errors.brandid = 'Please select brand.';
      }

      if (
        typeof this.state.selectedModalObject.poticdesign === 'undefined' ||
        this.state.selectedModalObject.poticdesign === '' ||
        this.state.selectedModalObject.poticdesign === null
      ) {
        errors.poticdesign = 'Please select portic design.';
      }

      if (
        typeof this.state.selectedModalObject.shadeid === 'undefined' ||
        this.state.selectedModalObject.shadeid === '' ||
        this.state.selectedModalObject.shadeid === null
      ) {
        errors.shadeid = 'Please select shade.';
      }
    } else {
      errors.toothnumber = 'Please select tooth number(s).';
      this.api.showErrorMessageOnRef(
        this.modalFlashMessageRef,
        'Please select tooth number(s).',
        null,
      );
    }

    return errors;
  }

  handleSubmit = values => {
    // ANY ORDER DETAIL IS ADDED
    if (this.state.orderdetails.length > 0) {
      let errors = [];

      let orderdetailid = [];
      let orderdetaildeleted = [];
      let toothnumber = [];
      let categoryid = [];
      let productid = [];
      let brandid = [];
      let shadeid = [];
      let shadenotes = [];
      let poticdesign = [];
      let price = [];
      let discountpercentage = [];
      let discountamount = [];
      let modificationcharges = [];
      let totalprice = [];
      let description = [];

      let itemsCounter = 0;

      this.state.orderdetails.forEach((orderdetail, index) => {
        let stepno = index + 1;
        let selected_toothnumber =
          typeof orderdetail.toothnumber !== 'undefined' &&
          orderdetail.toothnumber.length !== 0
            ? orderdetail.toothnumber
            : [];

        if (orderdetail.orderdetaildeleted == 0) {
          itemsCounter++;

          // TOOTH NUMBER
          if (selected_toothnumber.length === 0) {
            errors.push(
              'Please select tooth number(s) for job at index #' + itemsCounter,
            );
          }

          // CATEGORY (RESTORATION TYPE)
          if (
            orderdetail.categoryid === null ||
            orderdetail.categoryid === ''
          ) {
            errors.push(
              'Please select restoration type for job at index #' +
                itemsCounter,
            );
          }

          // PRODUCT
          if (orderdetail.productid === null || orderdetail.productid === '') {
            errors.push(
              'Please select product for job at index #' + itemsCounter,
            );
          }

          // BRAND
          if (orderdetail.brandid === null || orderdetail.brandid === '') {
            errors.push(
              'Please select brand for job at index #' + itemsCounter,
            );
          }

          // SHADE
          if (orderdetail.shadeid === null || orderdetail.shadeid === '') {
            errors.push(
              'Please select shade for job at index #' + itemsCounter,
            );
          }

          // POTIC DESIGN
          if (
            orderdetail.poticdesign === null ||
            orderdetail.poticdesign === ''
          ) {
            errors.push(
              'Please select portic design for job at index #' + itemsCounter,
            );
          }

          // PRICE
          if (!orderdetail.price) {
            errors.push(
              'Unable to get price for job at index #' + itemsCounter,
            );
          } else {
            let price_value = orderdetail.price;
            if (isNaN(price_value)) {
              errors.push('Invalid price for job at index #' + itemsCounter);
            }
          }

          // DISCOUNT PERCENTAGE
          let discountpercentage_value = orderdetail.discountpercentage;
          if (isNaN(discountpercentage_value)) {
            errors.push(
              'Please enter a valid discount percentage for job at index #' +
                itemsCounter,
            );
          }

          // DISCOUNT AMOUNT
          if (orderdetail.discountamount === '') {
            errors.push(
              'Please enter discount amount for job at index #' + itemsCounter,
            );
          } else {
            let discountamount_value = orderdetail.discountamount;
            if (isNaN(discountamount_value)) {
              errors.push(
                'Please enter a valid discount amount for job at index #' +
                  itemsCounter,
              );
            }
          }

          // MODIFICATION CHARGES
          if (orderdetail.modificationcharges === '') {
            errors.push(
              'Please enter modification charges for job at index #' +
                itemsCounter,
            );
          } else {
            let modificationcharges_value = orderdetail.modificationcharges;
            if (isNaN(modificationcharges_value)) {
              errors.push(
                'Please enter a valid modification charges for job at index #' +
                  itemsCounter,
              );
            }
          }
        }

        orderdetailid.push(orderdetail.orderdetailid);
        orderdetaildeleted.push(orderdetail.orderdetaildeleted);
        toothnumber.push(selected_toothnumber);
        categoryid.push(orderdetail.categoryid);
        productid.push(orderdetail.productid);
        brandid.push(orderdetail.brandid);
        shadeid.push(orderdetail.shadeid);
        shadenotes.push(orderdetail.shadenotes);
        poticdesign.push(orderdetail.poticdesign);
        price.push(orderdetail.price);
        discountpercentage.push(orderdetail.discountpercentage);
        discountamount.push(orderdetail.discountamount);
        modificationcharges.push(orderdetail.modificationcharges);
        totalprice.push(orderdetail.totalprice);
        description.push(orderdetail.description);
      });

      // HAS ORDER DETAILS
      if (itemsCounter > 0) {
        // VALIDATE DETAILS SUCCESS FOR ALL THE ORDER DETAILS
        if (errors.length === 0) {
          let formData = new FormData();

          formData.append('orderid', this.state.orderId);
          formData.append(
            'calllogid',
            this.state.calllogId === null ? '' : this.state.calllogId,
          );
          formData.append(
            'customerid',
            this.state.customerId === null ? '' : this.state.customerId,
          );
          formData.append(
            'doctorname',
            typeof values.doctorname === 'undefined' ? '' : values.doctorname,
          );
          formData.append(
            'patientname',
            typeof values.patientname === 'undefined' ? '' : values.patientname,
          );
          formData.append(
            'age',
            typeof values.age === 'undefined' ? '' : values.age,
          );
          formData.append(
            'gender',
            this.state.gender === null ? '' : this.state.gender,
          );
          formData.append(
            'orderdate',
            this.state.orderDate === null
              ? ''
              : this.state.orderDate.format('YYYY-MM-DD'),
          );
          formData.append(
            'deliverydate',
            this.state.deliveryDate === null
              ? ''
              : this.state.deliveryDate.format('YYYY-MM-DD'),
          );
          formData.append(
            'casetype',
            this.state.casetype === null ? '' : this.state.casetype,
          );
          formData.append(
            'restorationtype',
            this.state.restorationtype === null
              ? ''
              : this.state.restorationtype,
          );
          formData.append(
            'casestage',
            this.state.casestage === null ? '' : this.state.casestage,
          );
          formData.append(
            'enclosures',
            JSON.stringify(this.state.selectedenclosures),
          );
          formData.append(
            'insufficientroom',
            this.state.insufficientroom === null
              ? ''
              : this.state.insufficientroom,
          );
          formData.append(
            'occlusalcontact',
            this.state.occlusalcontact === null
              ? ''
              : this.state.occlusalcontact,
          );
          formData.append(
            'embrassor',
            this.state.embrassor === null ? '' : this.state.embrassor,
          );
          formData.append(
            'occlusalstain',
            this.state.occlusalstain === null ? '' : this.state.occlusalstain,
          );
          formData.append(
            'totalprice',
            this.state.totalprice === null ? '' : this.state.totalprice,
          );

          formData.append('orderdetailid', JSON.stringify(orderdetailid));
          formData.append(
            'orderdetaildeleted',
            JSON.stringify(orderdetaildeleted),
          );
          formData.append('toothnumber', JSON.stringify(toothnumber));
          formData.append('categoryid', JSON.stringify(categoryid));
          formData.append('productid', JSON.stringify(productid));
          formData.append('brandid', JSON.stringify(brandid));
          formData.append('shadeid', JSON.stringify(shadeid));
          formData.append('shadenotes', JSON.stringify(shadenotes));
          formData.append('poticdesign', JSON.stringify(poticdesign));
          formData.append('price', JSON.stringify(price));
          formData.append(
            'discountpercentage',
            JSON.stringify(discountpercentage),
          );
          formData.append('discountamount', JSON.stringify(discountamount));
          formData.append(
            'modificationcharges',
            JSON.stringify(modificationcharges),
          );
          formData.append('orderdetailtotalprice', JSON.stringify(totalprice));
          formData.append('description', JSON.stringify(description));

          let hasUploadedAnyImage = false;
          let imagestobedeleted = [];
          this.state.orderimages.forEach((orderimage, index) => {
            if (
              orderimage.istobedeleted === 0 &&
              orderimage.orderimageid === 0
            ) {
              hasUploadedAnyImage = true;
              let imagefile = {
                uri: orderimage.uri,
                type: orderimage.type,
                name: orderimage.name,
              };
              formData.append('files[]', imagefile, orderimage.name);
            } else if (
              orderimage.istobedeleted !== 0 &&
              orderimage.orderimageid !== 0
            ) {
              imagestobedeleted.push(orderimage.orderimageid);
            }
          });

          if (!hasUploadedAnyImage) {
            formData.append('files[]', '');
          }
          formData.append(
            'imagestobedeleted',
            JSON.stringify(imagestobedeleted),
          );

          let options = {
            api: 'v_1/receptionists/orders/store',
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
                if (this.state.orderId > 0) {
                  this.props.navigation.goBack(null);
                } else {
                  this.props.navigation.navigate('ReceptionOrders');
                }
              }, 4000);
            } else {
              let errormessage = null;
              if (
                typeof responseData.status_code !== 'undefined' &&
                responseData.status_code === 422
              ) {
                errormessage = responseData.response.data.message;
              }
              this.api.showErrorMessage(
                responseData.response.message,
                errormessage,
              );
            }
          });
        }
        // VALIDATE DETAILS FAILED FOR ALL THE ORDER DETAILS
        else {
          this.api.showErrorMessage(
            'Required fields are missing or incorrect in jobs tab.',
            errors[0],
          );
        }
      }
      // DOES NOT HAS ORDER DETAILS
      else {
        this.api.showErrorMessage(
          'Please add atleast one job in jobs tab.',
          null,
        );
      }
    }
    // NO ORDER DETAIL IS ADDED
    else {
      this.api.showErrorMessage(
        'Please add atleast one job in jobs tab.',
        null,
      );
    }
  };

  validate(values) {
    let errors = {};

    if (
      typeof this.state.calllogId === 'undefined' ||
      this.state.calllogId === '' ||
      this.state.calllogId === null
    ) {
      errors.calllogid = 'Please select pickup request.';
    }

    if (
      typeof this.state.customerId === 'undefined' ||
      this.state.customerId === '' ||
      this.state.customerId === null
    ) {
      errors.customerid = 'Please select customer.';
    }

    if (!values.doctorname) {
      errors.doctorname = 'Please enter doctor name.';
    }

    if (!values.patientname) {
      errors.patientname = 'Please enter patient name.';
    }

    if (!values.age) {
      errors.age = 'Please enter age.';
    } else {
      let age = values.age;
      if (isNaN(age)) {
        errors.age = 'Please enter a valid age.';
      }
    }

    if (this.state.gender === null || this.state.gender === '') {
      errors.gender = 'Please select sex.';
    }

    if (this.state.orderDate === null) {
      errors.orderdate = 'Please select order date.';
    }

    if (this.state.deliveryDate === null) {
      errors.deliverydate = 'Please select delivery date.';
    }

    if (this.state.casetype === null || this.state.casetype === '') {
      errors.casetype = 'Please select case type.';
    }

    if (
      this.state.restorationtype === null ||
      this.state.restorationtype === ''
    ) {
      errors.restorationtype = 'Please select restoration type.';
    }

    if (this.state.casestage === null || this.state.casestage === '') {
      errors.casestage = 'Please select case stage.';
    }

    if (this.state.selectedenclosures.length === 0) {
      errors.enclosures = 'Please select enclosures.';
    }

    if (
      this.state.insufficientroom === null ||
      this.state.insufficientroom === ''
    ) {
      errors.insufficientroom = 'Please select insufficient room.';
    }

    if (this.state.embrassor === null || this.state.embrassor === '') {
      errors.embrassor = 'Please select embrassor.';
    }

    if (
      this.state.occlusalcontact === null ||
      this.state.occlusalcontact === ''
    ) {
      errors.occlusalcontact = 'Please select occlusal contact.';
    }

    if (this.state.occlusalstain === null || this.state.occlusalstain === '') {
      errors.occlusalstain = 'Please select occlusal stain.';
    }

    if (isOrderFormSubmitted && JSON.stringify(errors) !== '{}') {
      this.api.showErrorMessage(
        'Required fields are missing or incorrect in order details tab.',
        null,
      );
    }
    isOrderFormSubmitted = false;

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
          <View style={[common.formContainer, {paddingTop: -10}]}>
            {/* <NavigationEvents onDidFocus={() => this.getFormData() } /> */}
            <Loader loading={this.state.loading} />
            <Formik
              enableReinitialize={true}
              validate={this.validate}
              initialValues={{
                doctorname:
                  this.state.order &&
                  typeof this.state.order.doctorname !== 'undefined' &&
                  this.state.order.doctorname !== null
                    ? this.state.order.doctorname
                    : '',
                patientname:
                  this.state.order &&
                  typeof this.state.order.patientname !== 'undefined' &&
                  this.state.order.patientname !== null
                    ? this.state.order.patientname
                    : '',
                age:
                  this.state.order &&
                  typeof this.state.order.age !== 'undefined' &&
                  this.state.order.age !== null
                    ? this.state.order.age
                    : '',
              }}
              onSubmit={this.handleSubmit}>
              {formikProps => {
                const {values, handleChange, handleSubmit, errors} =
                  formikProps;

                // BIND SUBMISSION HANDLER REMOTLY FOR HEADER SAVE BUTTON
                this.bindSubmitFormToHeaderButton(formikProps.submitForm);

                return (
                  <Tabs
                    initialPage={0}
                    locked={true}
                    tabBarPosition={'top'}
                    tabBarUnderlineStyle={tabStyle.tabBarUnderlineStyle}>
                    <Tab
                      heading={
                        <TabHeading style={tabStyle.tabHeadingStyle}>
                          <Icon
                            style={tabStyle.tabHeadingIcon}
                            name="wpforms"
                          />
                          <Text style={tabStyle.tabHeadingText}>
                            Order Details
                          </Text>
                        </TabHeading>
                      }>
                      <View style={tabStyle.tabContentContainer}>
                        <ScrollView>
                          <View style={common.formElementsContainer}>
                            <View>
                              <Text style={styles.blockTitle}>
                                Basic Details:
                              </Text>
                              <FormSelectPicker
                                label="Pickup Request"
                                placeholder={{
                                  label: 'Select Pickup Request',
                                  value: '',
                                }}
                                value={this.state.calllogId}
                                onValueChange={this.handleChangeCalllog}
                                items={this.state.calllogs}
                                errors={errors.calllogid}
                              />
                              <FormSelectPicker
                                label="Customer"
                                placeholder={{
                                  label: 'Select Customer',
                                  value: '',
                                }}
                                value={this.state.customerId}
                                onValueChange={this.handleChangeCustomer}
                                items={this.state.customers}
                                errors={errors.customerid}
                                disabled={true}
                              />
                              <FormInput
                                name="doctorname"
                                value={values.doctorname}
                                onChangeText={handleChange('doctorname')}
                                placeholder="Enter Doctor Name"
                                autoCapitalize="none"
                                label="Doctor Name"
                                errorMessage={errors.doctorname}
                              />
                              <FormInput
                                name="patientname"
                                value={values.patientname}
                                onChangeText={handleChange('patientname')}
                                placeholder="Enter Patient Name"
                                autoCapitalize="none"
                                label="Patient Name"
                                errorMessage={errors.patientname}
                              />
                              {/* <View style={{
                                                                flex: 1,
                                                                flexDirection: 'row',
                                                                justifyContent: 'flex-start'
                                                            }}>
                                                                <View style={{ width: (screenWidth / 2) - 10 , marginRight: -10 }}> */}
                              <FormInput
                                keyboardType="numeric"
                                name="age"
                                value={values.age}
                                onChangeText={handleChange('age')}
                                placeholder="Enter Age"
                                autoCapitalize="none"
                                label="Age"
                                errorMessage={errors.age}
                              />
                              {/* </View>
                                                                <View style={{
                                                                    flex: 1
                                                                }}> */}
                              <FormRadioButton
                                name="gender"
                                value={this.state.gender}
                                onPress={this.handleChangeGender}
                                label="Sex"
                                errors={errors.gender}
                                options={this.state.genders}
                              />
                              {/* </View>
                                                            </View> */}
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
                                  <FormDatePicker
                                    name="orderdate"
                                    value={this.state.orderDate}
                                    onChangeEvent={this.handleOnChangeOrderDate}
                                    label="Order Date"
                                    errors={errors.orderdate}
                                    display="spinner"
                                  />
                                </View>
                                <View
                                  style={{
                                    flex: 1,
                                  }}>
                                  <FormDatePicker
                                    name="deliverydate"
                                    value={this.state.deliveryDate}
                                    onChangeEvent={
                                      this.handleOnChangeDeliveryDate
                                    }
                                    label="Delivery Date"
                                    errors={errors.deliverydate}
                                    display="spinner"
                                  />
                                </View>
                              </View>

                              <Text style={styles.blockTitle}>
                                Case Details:
                              </Text>
                              <FormRadioButton
                                name="casetype"
                                value={this.state.casetype}
                                onPress={this.handleChangeCaseType}
                                label="Case Type"
                                errors={errors.casetype}
                                options={this.state.casetypes}
                              />
                              <FormRadioButton
                                name="restorationtype"
                                value={this.state.restorationtype}
                                onPress={this.handleChangeRestorationType}
                                label="Restoration Type"
                                errors={errors.restorationtype}
                                options={this.state.restorationtypes}
                              />
                              <FormRadioButton
                                name="casestage"
                                value={this.state.casestage}
                                onPress={this.handleChangeCaseStage}
                                label="Case Stage"
                                errors={errors.casestage}
                                options={this.state.casestages}
                              />
                              <FormCheckBox
                                name="enclosures"
                                value={this.state.selectedenclosures}
                                onPress={this.handleChangeEnclosure}
                                label="Enclosures"
                                errors={errors.enclosures}
                                options={this.state.enclosures}
                              />
                              <FormRadioButton
                                name="insufficientroom"
                                value={this.state.insufficientroom}
                                onPress={this.handleChangeInsufficientRoom}
                                label="Insufficient Room"
                                errors={errors.insufficientroom}
                                options={this.state.insufficientrooms}
                              />
                              <FormRadioButton
                                name="embrassor"
                                value={this.state.embrassor}
                                onPress={this.handleChangeEmbrassor}
                                label="Embrassor"
                                errors={errors.embrassor}
                                options={this.state.embrassors}
                              />
                              <FormRadioButton
                                name="occlusalcontact"
                                value={this.state.occlusalcontact}
                                onPress={this.handleChangeOcclusalContact}
                                label="Occlusal Contact"
                                errors={errors.occlusalcontact}
                                options={this.state.occlusalcontacts}
                              />
                              <FormRadioButton
                                name="occlusalstain"
                                value={this.state.occlusalstain}
                                onPress={this.handleChangeOcclusalStain}
                                label="Occlusal Stain"
                                errors={errors.occlusalstain}
                                options={this.state.occlusalstains}
                              />
                            </View>
                          </View>
                        </ScrollView>
                      </View>
                    </Tab>
                    <Tab
                      heading={
                        <TabHeading style={tabStyle.tabHeadingStyle}>
                          <Icon
                            style={tabStyle.tabHeadingIcon}
                            name="picture-o"
                          />
                          <Text style={tabStyle.tabHeadingText}> Images </Text>
                        </TabHeading>
                      }>
                      <View style={styles.imageTabcontainer}>
                        <ScrollView>
                          <View style={{alignItems: 'center'}}>
                            <Icon
                              name="cloud-upload"
                              size={100}
                              style={{
                                color: textMutedColor,
                              }}
                            />
                            <Text style={styles.imageTaberrortTitle}>
                              Let's Upload Documents
                            </Text>
                            <Text style={styles.imageTaberrortDescription}>
                              Add documents from your phone or Open camera to
                              scan new documents.
                            </Text>
                          </View>
                          <View style={styles.imageButtonBlock}>
                            <View style={styles.imageButtonContainer}>
                              <Button
                                block
                                iconLeft
                                rounded
                                style={{backgroundColor: primaryBlueHexColor}}
                                onPress={this.choosePhotoFromLibrary}>
                                <Icon
                                  name="folder-open"
                                  style={styles.imageButtonIconStyle}
                                />
                                <Text style={styles.imageButtonTextStyle}>
                                  Open Gallery
                                </Text>
                              </Button>
                            </View>
                            <View style={styles.imageButtonContainer}>
                              <Button
                                block
                                iconLeft
                                rounded
                                style={{backgroundColor: primaryHexColor}}
                                onPress={this.takePhotoFromCamera}>
                                <Icon
                                  name="camera"
                                  style={styles.imageButtonIconStyle}
                                />
                                <Text style={styles.imageButtonTextStyle}>
                                  Open Camera
                                </Text>
                              </Button>
                            </View>
                          </View>
                          {/* <View style={common.seperator} /> */}
                          <View>
                            <Text
                              style={[
                                styles.blockTitle,
                                {marginHorizontal: 0},
                              ]}>
                              Images:
                            </Text>
                            {this.state.orderimages.length === 0 ? (
                              <Text
                                style={[
                                  common.mutedTextInItalic,
                                  {textAlign: 'center'},
                                ]}>
                                No images added!
                              </Text>
                            ) : (
                              <View>
                                <Carousel
                                  layout={'default'}
                                  data={
                                    this.state.orderimages.length > 0
                                      ? this.state.orderimages
                                      : [
                                          {
                                            imagefilepath:
                                              this.state.order
                                                .firstimagefilepath,
                                          },
                                        ]
                                  }
                                  renderItem={this.renderCarouselItem}
                                  sliderWidth={carouselWidth}
                                  itemWidth={carouselWidth}
                                  firstItem={this.state.activeCarouselIndex}
                                  onSnapToItem={index =>
                                    this.setState({activeCarouselIndex: index})
                                  }
                                />
                                <Pagination
                                  dotsLength={this.state.orderimages.length}
                                  activeDotIndex={
                                    this.state.activeCarouselIndex
                                  }
                                  containerStyle={{
                                    backgroundColor: 'transparent',
                                    paddingTop: 8,
                                    paddingBottom: 0,
                                    paddingLeft: 8,
                                    paddingRight: 8,
                                    width: screenWidth - 30,
                                    flexWrap: 'wrap',
                                  }}
                                  dotStyle={{
                                    width: 8,
                                    height: 8,
                                    borderRadius: 5,
                                    marginHorizontal: 0,
                                    backgroundColor: primaryHexColor,
                                  }}
                                  inactiveDotStyle={{}}
                                  inactiveDotOpacity={0.4}
                                  inactiveDotScale={0.6}
                                />
                                <Text
                                  style={[
                                    common.mutedTextInItalic,
                                    {fontSize: 10, marginTop: 5},
                                  ]}>
                                  Instructions: Tap on image for image related
                                  more options.
                                </Text>
                              </View>
                            )}
                          </View>
                        </ScrollView>
                      </View>
                    </Tab>
                    <Tab
                      heading={
                        <TabHeading style={tabStyle.tabHeadingStyle}>
                          <Icon style={tabStyle.tabHeadingIcon} name="cubes" />
                          <Text style={tabStyle.tabHeadingText}>Jobs</Text>
                        </TabHeading>
                      }>
                      <View
                        style={[
                          common.cardContainer,
                          {
                            backgroundColor: backgroundGrey,
                            paddingTop: 0,
                            marginTop: 0,
                            borderRadius: 0,
                          },
                        ]}>
                        <TeethSkeleton
                          isClickable={false}
                          selectedTooths={this.state.orderedtoothnumbers}
                          handleToothNumberChange={number => {
                            console.log(number);
                          }}
                        />
                        <View
                          style={[
                            common.listingContainer,
                            {backgroundColor: backgroundGrey, paddingTop: 0},
                          ]}>
                          {this.state.orderdetails.length > 0 ? (
                            <FlatList
                              style={{width: '100%'}}
                              data={this.state.orderdetails}
                              renderItem={this.renderJobItem}
                              keyExtractor={(item, index) => index.toString()}
                            />
                          ) : (
                            <Text
                              style={[
                                common.mutedTextInItalic,
                                {
                                  fontSize: 16,
                                  fontWeight: 'bold',
                                  textAlign: 'center',
                                },
                              ]}>
                              No jobs added!
                            </Text>
                          )}
                        </View>
                        <View
                          style={{
                            flexDirection: 'column',
                            margin: 12,
                            marginTop: 0,
                          }}>
                          <Button
                            full
                            iconLeft
                            rounded
                            style={{backgroundColor: primaryBlueHexColor}}
                            onPress={this.addNewJob}>
                            <Icon
                              name="plus"
                              style={styles.imageButtonIconStyle}
                            />
                            <Text style={styles.imageButtonTextStyle}>
                              Add New Job
                            </Text>
                          </Button>
                        </View>
                      </View>
                    </Tab>
                  </Tabs>
                );
              }}
            </Formik>
            <Modal
              isVisible={this.state.isJobModalVisible}
              onBackButtonPress={this.toggleJobFormModal}
              backdropOpacity={0.5}
              style={modalLayout.modalContainer}
              animationInTiming={500}
              animationOutTiming={500}
              // onModalWillShow={this.getFormData}
              // onModalHide={this.resetFormData}
            >
              <Loader loading={this.state.loading} />
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
                      {this.state.modalTitle}
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
                      <View
                        style={[
                          common.cardContainer,
                          {backgroundColor: backgroundGrey, paddingTop: 0},
                        ]}>
                        <TeethSkeleton
                          isClickable={true}
                          selectedTooths={
                            this.state.selectedModalObject.toothnumber
                          }
                          handleToothNumberChange={number => {
                            this.toothNumberChangedInModal(number);
                          }}
                        />
                        <View style={modalLayout.bodyContent}>
                          <ScrollView>
                            <View style={common.formElementsContainer}>
                              <Formik
                                enableReinitialize={true}
                                validate={this.modalFormValidate}
                                initialValues={{
                                  shadenotes:
                                    this.state.selectedModalObject !== null &&
                                    typeof this.state.selectedModalObject
                                      .shadenotes !== 'undefined' &&
                                    this.state.selectedModalObject
                                      .shadenotes !== null
                                      ? this.state.selectedModalObject
                                          .shadenotes
                                      : '',
                                  description:
                                    this.state.selectedModalObject !== null &&
                                    typeof this.state.selectedModalObject
                                      .description !== 'undefined' &&
                                    this.state.selectedModalObject
                                      .description !== null
                                      ? this.state.selectedModalObject
                                          .description
                                      : '',
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
                                      <FormSelectPicker
                                        label="Restoration Type"
                                        placeholder={{
                                          label: 'Select Restoration Type',
                                          value: '',
                                        }}
                                        value={
                                          this.state.selectedModalObject
                                            .categoryid
                                        }
                                        onValueChange={
                                          this.handleChangeModalCategory
                                        }
                                        items={this.state.categories}
                                        errors={errors.categoryid}
                                      />
                                      <FormSelectPicker
                                        label="Product"
                                        placeholder={{
                                          label: 'Select Product',
                                          value: '',
                                        }}
                                        value={
                                          this.state.selectedModalObject
                                            .productid
                                        }
                                        onValueChange={
                                          this.handleChangeModalProduct
                                        }
                                        items={
                                          this.state.selectedModalObject
                                            .products
                                        }
                                        errors={errors.productid}
                                      />
                                      <FormSelectPicker
                                        label="Brand"
                                        placeholder={{
                                          label: 'Select Brand',
                                          value: '',
                                        }}
                                        value={
                                          this.state.selectedModalObject.brandid
                                        }
                                        onValueChange={
                                          this.handleChangeModalBrand
                                        }
                                        items={this.state.brands}
                                        errors={errors.brandid}
                                      />
                                      <FormSelectPicker
                                        label="Portic Design"
                                        placeholder={{
                                          label: 'Select Portic Design',
                                          value: '',
                                        }}
                                        value={
                                          this.state.selectedModalObject
                                            .poticdesign
                                        }
                                        onValueChange={
                                          this.handleChangeModalPoticDesign
                                        }
                                        items={this.state.poticdesigns}
                                        errors={errors.poticdesign}
                                      />
                                      <FormSelectPicker
                                        label="Shade"
                                        placeholder={{
                                          label: 'Select Shade',
                                          value: '',
                                        }}
                                        value={
                                          this.state.selectedModalObject.shadeid
                                        }
                                        onValueChange={
                                          this.handleChangeModalShade
                                        }
                                        items={this.state.shades}
                                        errors={errors.shadeid}
                                      />
                                      <FormInput
                                        name="shadenotes"
                                        value={values.shadenotes}
                                        onChangeText={handleChange(
                                          'shadenotes',
                                        )}
                                        placeholder="Enter Shade Notes"
                                        autoCapitalize="none"
                                        label="Shade Notes"
                                        errorMessage={errors.shadenotes}
                                      />
                                      <FormTextArea
                                        name="description"
                                        label="Description"
                                        value={values.description}
                                        placeholder="Write some description here"
                                        rowSpan={3}
                                        onChangeText={handleChange(
                                          'description',
                                        )}
                                        errors={errors.description}
                                      />
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
                                            name="priceandnoofteeths"
                                            value={
                                              this.state.selectedModalObject
                                                .price +
                                              ' * ' +
                                              this.state.selectedModalObject
                                                .toothnumber.length
                                            }
                                            // onChangeText={handleChange('age')}
                                            placeholder="Price * No. of Teeths"
                                            autoCapitalize="none"
                                            label="Price * No. of Teeths"
                                            disabled={true}
                                            errorMessage={null}
                                          />
                                        </View>
                                        <View
                                          style={{
                                            flex: 1,
                                          }}>
                                          <FormInput
                                            keyboardType="numeric"
                                            name="discountpercentage"
                                            value={
                                              this.state.selectedModalObject
                                                .discountpercentage + ''
                                            }
                                            onChangeText={
                                              this
                                                .onChangeModalDiscountPercentage
                                            }
                                            placeholder="Discount Percentage"
                                            autoCapitalize="none"
                                            label="Discount Percentage"
                                            errorMessage={
                                              errors.discountpercentage
                                            }
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
                                            keyboardType="numeric"
                                            name="discountamount"
                                            value={
                                              this.state.selectedModalObject
                                                .discountamount + ''
                                            }
                                            onChangeText={
                                              this.onChangeModalDiscountAmount
                                            }
                                            placeholder="Discount Amount"
                                            autoCapitalize="none"
                                            label="Discount Amount"
                                            errorMessage={errors.discountamount}
                                          />
                                        </View>
                                        <View
                                          style={{
                                            flex: 1,
                                          }}>
                                          <FormInput
                                            keyboardType="numeric"
                                            name="modificationcharges"
                                            value={
                                              this.state.selectedModalObject
                                                .modificationcharges + ''
                                            }
                                            onChangeText={
                                              this
                                                .onChangeModalModificationCharge
                                            }
                                            placeholder="Modification Charges"
                                            autoCapitalize="none"
                                            label="Modification Charges"
                                            disabled={
                                              !this.state
                                                .isAskModificationCharges
                                                ? true
                                                : false
                                            }
                                            errorMessage={
                                              errors.modificationcharges
                                            }
                                          />
                                        </View>
                                      </View>
                                      <FormInput
                                        keyboardType="numeric"
                                        name="totalprice"
                                        value={
                                          this.state.selectedModalObject
                                            .totalprice + ''
                                        }
                                        placeholder="Total Price"
                                        autoCapitalize="none"
                                        label="Total Price"
                                        disabled={true}
                                        errorMessage={null}
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
        </View>
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  blockTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 15,
    marginHorizontal: 10,
    paddingVertical: 10,
    color: fontColor,
    borderBottomWidth: 1,
    borderBottomColor: seperator,
  },
  imageTabcontainer: {
    flex: 1,
    // justifyContent: 'center',
    alignItems: 'center',
    padding: 15,
  },
  imageTaberrortTitle: {
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'bold',
    color: '#555',
    marginTop: 0,
  },
  imageTaberrortDescription: {
    textAlign: 'center',
    fontSize: 12,
    color: textMutedColor,
  },
  imageButtonBlock: {
    flex: 1,
    flexDirection: 'row',
    marginTop: 20,
    marginBottom: 10,
  },
  imageButtonContainer: {
    flex: 1,
    marginHorizontal: 5,
  },
  imageButtonStyle: {},
  imageButtonIconStyle: {
    fontSize: 20,
    color: '#fff',
  },
  imageButtonTextStyle: {
    marginLeft: 5,
    color: '#fff',
    fontWeight: 'bold',
  },
  labelContainer: {
    width: 100,
  },
  descriptionContainer: {
    width: screenWidth - 165,
  },
  mathSymbolContainer: {
    width: 20,
  },
  priceLabelConatiner: {
    width: 160,
  },
  priceLabelText: {},
  priceContainer: {
    width: screenWidth - 230,
  },
  priceText: {
    textAlign: 'right',
  },
});
