import React, {Component} from 'react';
import {
  Dimensions,
  Image,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import {
  badgeColorCode,
  callLogCardLayout,
  common,
  commonCard,
  commonLabelDescription,
  dashBoardStyle,
} from '../../assets/style';

import Api from '../../provider/Api';
import Dataprovider from '../../provider/Dataprovider';

import NotFound from '../../components/NotFound';

import {
  backgroundGrey,
  fontColor,
  primaryBlueHexColor,
  primaryHexColor,
  primaryPurpleHexColor,
  primarywarningHexColor,
  primarywhiteHexColor,
  seperator,
  successHexColor,
  textMutedColor,
} from '../../constants/themeColors';

import Icon from 'react-native-vector-icons/FontAwesome';

import {Body, Card, CardItem, Left, Right} from 'native-base';

import {skeletonPlaceholderProps} from '../../constants/defaultValues';

import Carousel from 'react-native-snap-carousel';
import SkeletonContent from '../../components/SkeletonContent';

// BANER CAROUSEL
const screenWidth = Dimensions.get('window').width;
const appScreenWidth = Dimensions.get('window');
const carouselWidth = appScreenWidth.width;
const imageHeight = Math.round(((carouselWidth - 10) * 10) / 16);
const imageWidth = carouselWidth;
// BRAND CAROUSEL
const {width: viewportWidth, height: viewportHeight} = Dimensions.get('window');
const SLIDE_WIDTH = Math.round(viewportWidth / 2.6);
const ITEM_HORIZONTAL_MARGIN = 0;
const ITEM_WIDTH = SLIDE_WIDTH + ITEM_HORIZONTAL_MARGIN * 2;
const SLIDER_WIDTH = viewportWidth;

const BRAND_ITEM_WIDTH = SLIDE_WIDTH + ITEM_HORIZONTAL_MARGIN * 2 - 80;

const cardWidth = (appScreenWidth.width - 38) / 2;
const cardHeight = (appScreenWidth.width - 75) / 2;

export default class CustomerDashboard extends Component {
  api = new Api();
  dataProvider = new Dataprovider();

  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      refreshing: false,
      transparentLoader: false,
      brandProducts: [],
      complaints: [],
      completedJobs: [],
      completedOrders: [],
      customers: [],
      deliveryCalls: [],
      orders: [],
      pickupCalls: [],
      products: [],
      rejectedJobs: [],
      activeCarouselIndex: 0,
    };
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
    let options = {
      api: 'v_1/receptionists/dashboard',
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'multipart/form-data',
      },
      data: {},
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
          brandProducts: responseData.brandproducts,
          complaints: responseData.complaints,
          completedJobs: responseData.completedjobs,
          completedOrders: responseData.completedorders,
          customers: responseData.customers,
          deliveryCalls: responseData.deliverycalls,
          orders: responseData.orders,
          pickupCalls: responseData.pickupcalls,
          products: responseData.products,
          rejectedJobs: responseData.rejectedjobs,
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

  renderCarouselProduct = ({item, index}) => {
    return (
      <TouchableOpacity
        activeOpacity={0.5}
        onPress={() => {
          this.props.navigation.push('BrandProductDetails', {
            pageHeading: item.brandname,
            brandProductId: item.brandproductid,
          });
        }}>
        <View style={{width: '100%'}}>
          <Image
            source={{uri: item.firstimagefilepath}}
            style={{width: 100, height: 100, borderRadius: 8}}
          />
        </View>
      </TouchableOpacity>
    );
  };

  renderCarouselBrandProducts = ({item, index}) => {
    return (
      <TouchableOpacity
        activeOpacity={0.5}
        onPress={() => {
          this.props.navigation.push('BrandProducts', {
            pageHeading: item.name,
            brandId: item.brandid,
          });
        }}>
        <View style={[commonCard.imageContainer, {width: '100%'}]}>
          <Image
            source={{uri: item.brandimagefilepath}}
            style={{
              height: 60,
              width: 60,
              overflow: 'hidden',
            }}
            resizeMode="contain"
          />
        </View>
      </TouchableOpacity>
    );
  };

  renderCustomers = ({item, index}) => {
    return (
      <View style={{width: '100%'}}>
        <Card
          style={[
            callLogCardLayout.cardContainer,
            {
              shadowColor: '#000',
              shadowOffset: {width: 0, height: 1},
              shadowOpacity: 0.8,
              shadowRadius: 2,
              elevation: 2,
              paddingVertical: 15,
            },
          ]}>
          <TouchableOpacity
            activeOpacity={0.5}
            onPress={() => {
              this.props.navigation.push('ReceptionCustomerDetails', {
                pageHeading: item.name,
                customerId: item.customerid,
              });
            }}>
            <CardItem style={[callLogCardLayout.cardBody, {}]}>
              <Body>
                <Text
                  style={[
                    callLogCardLayout.bodyTitle,
                    {color: primaryHexColor},
                  ]}>
                  {item.name}
                </Text>
                <View style={callLogCardLayout.textWithIconContainer}>
                  <Icon
                    name="circle"
                    size={14}
                    style={callLogCardLayout.textWithIconContainerIcon}
                  />
                  <View>
                    <Text
                      style={[
                        callLogCardLayout.textWithIconContainerText,
                        {fontWeight: 'bold'},
                      ]}>
                      {item.salutationtext}&nbsp;{item.doctorname}{' '}
                      <Text style={{color: textMutedColor}}>({item.code})</Text>
                    </Text>
                  </View>
                </View>
                <View style={callLogCardLayout.textWithIconContainer}>
                  <Icon
                    name="circle"
                    size={14}
                    style={callLogCardLayout.textWithIconContainerIcon}
                  />
                  <View>
                    <Text style={[callLogCardLayout.textWithIconContainerText]}>
                      {item.email}
                    </Text>
                  </View>
                </View>
                <View style={callLogCardLayout.textWithIconContainer}>
                  <Icon
                    name="circle"
                    size={14}
                    style={callLogCardLayout.textWithIconContainerIcon}
                  />
                  <View>
                    <Text style={[callLogCardLayout.textWithIconContainerText]}>
                      {item.phoneno}
                    </Text>
                  </View>
                </View>
                <View style={callLogCardLayout.textWithIconContainer}>
                  <Icon
                    name="circle"
                    size={14}
                    style={callLogCardLayout.textWithIconContainerIcon}
                  />
                  <View>
                    <Text
                      numberOfLines={1}
                      ellipsizeMode={'tail'}
                      style={[callLogCardLayout.textWithIconContainerText, {}]}>
                      {item.displaylocation}
                    </Text>
                  </View>
                </View>
              </Body>
            </CardItem>
          </TouchableOpacity>
        </Card>
      </View>
    );
  };

  renderPickupCallLogDetails = ({item, index}) => {
    return (
      <View style={{width: '100%'}}>
        <Card style={callLogCardLayout.cardContainer}>
          <TouchableOpacity
            activeOpacity={0.5}
            onPress={() => {
              this.props.navigation.push('CustomerCollectionCallForm', {
                pageHeading: 'Edit Pickup Request',
                callLogId: item.calllogid,
              });
            }}>
            <CardItem style={callLogCardLayout.cardHeader}>
              <Left>
                <Text style={callLogCardLayout.topLeftRightText}>
                  #{item.calllogid}
                </Text>
              </Left>
              <Right>
                <Text
                  style={[
                    callLogCardLayout.topLeftRightText,
                    {marginLeft: -50},
                  ]}>
                  {item.displaycalldatetime}
                </Text>
              </Right>
            </CardItem>
            <CardItem style={[callLogCardLayout.cardBodyWithOutFooter]}>
              <Body>
                <View style={commonLabelDescription.listContainer}>
                  <View
                    style={[
                      commonLabelDescription.listLabelContainer,
                      styles.labelContainer,
                    ]}>
                    <Text style={commonLabelDescription.labelText}>
                      Sales Person
                    </Text>
                  </View>
                  <View style={commonLabelDescription.listSeperator}>
                    <Text style={commonLabelDescription.labelText}>:</Text>
                  </View>
                  <View style={styles.descriptionContainer}>
                    <Text style={commonLabelDescription.labelValue}>
                      {item.salespersonname}
                    </Text>
                  </View>
                </View>
                <View style={commonLabelDescription.listContainer}>
                  <View
                    style={[
                      commonLabelDescription.listLabelContainer,
                      styles.labelContainer,
                    ]}>
                    <Text style={commonLabelDescription.labelText}>
                      Type of Work
                    </Text>
                  </View>
                  <View style={commonLabelDescription.listSeperator}>
                    <Text style={commonLabelDescription.labelText}>:</Text>
                  </View>
                  <View style={styles.descriptionContainer}>
                    <Text style={commonLabelDescription.labelValue}>
                      {item.typeofworktext}
                    </Text>
                  </View>
                </View>
                <View style={commonLabelDescription.listContainer}>
                  <View
                    style={[
                      commonLabelDescription.listLabelContainer,
                      styles.labelContainer,
                    ]}>
                    <Text style={commonLabelDescription.labelText}>
                      Pickup On
                    </Text>
                  </View>
                  <View style={commonLabelDescription.listSeperator}>
                    <Text style={commonLabelDescription.labelText}>:</Text>
                  </View>
                  <View style={styles.descriptionContainer}>
                    <Text style={commonLabelDescription.labelValue}>
                      {item.displaypickupdate}
                    </Text>
                  </View>
                </View>
                <View style={commonLabelDescription.listContainer}>
                  <View
                    style={[
                      commonLabelDescription.listLabelContainer,
                      styles.labelContainer,
                    ]}>
                    <Text style={commonLabelDescription.labelText}>
                      Pickup Time
                    </Text>
                  </View>
                  <View style={commonLabelDescription.listSeperator}>
                    <Text style={commonLabelDescription.labelText}>:</Text>
                  </View>
                  <View style={styles.descriptionContainer}>
                    {item.pickuptime !== '' && item.pickuptime !== null ? (
                      <Text style={commonLabelDescription.labelValue}>
                        {item.displaypickuptime}
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
                    <Text style={commonLabelDescription.labelText}>Status</Text>
                  </View>
                  <View style={commonLabelDescription.listSeperator}>
                    <Text style={commonLabelDescription.labelText}>:</Text>
                  </View>
                  <View style={styles.descriptionContainer}>
                    <Text
                      style={[
                        commonLabelDescription.labelValue,
                        badgeColorCode(item.statuscolor),
                      ]}>
                      {item.statustext}
                    </Text>
                  </View>
                </View>
              </Body>
            </CardItem>
          </TouchableOpacity>
        </Card>
      </View>
    );
  };

  renderDeliveryCallLogDetails = ({item, index}) => {
    return (
      <View>
        <Card style={callLogCardLayout.cardContainer}>
          <TouchableOpacity
            activeOpacity={0.5}
            onPress={() => {
              this.props.navigation.push('ReceptionDeliveryCallDetails', {
                pageHeading: item.customername,
                callLogId: item.calllogid,
              });
            }}>
            <CardItem style={callLogCardLayout.cardHeader}>
              <Left>
                <Text style={callLogCardLayout.topLeftRightText}>
                  #{item.calllogid}
                </Text>
              </Left>
              <Right>
                <Text style={callLogCardLayout.topLeftRightText}>
                  {item.displaycalldatetime}
                </Text>
              </Right>
            </CardItem>
            <CardItem style={[callLogCardLayout.cardBodyWithOutFooter]}>
              <Body>
                <Text
                  style={[
                    callLogCardLayout.bodyTitle,
                    {color: primaryHexColor},
                  ]}>
                  {item.customername}
                </Text>

                <View style={commonLabelDescription.listContainer}>
                  <View
                    style={[
                      commonLabelDescription.listLabelContainer,
                      styles.labelContainer,
                    ]}>
                    <Text style={commonLabelDescription.labelText}>
                      Sales Person
                    </Text>
                  </View>
                  <View style={commonLabelDescription.listSeperator}>
                    <Text style={commonLabelDescription.labelText}>:</Text>
                  </View>
                  <View style={styles.descriptionContainer}>
                    <Text style={commonLabelDescription.labelValue}>
                      {item.salespersonname}
                    </Text>
                  </View>
                </View>
                <View style={commonLabelDescription.listContainer}>
                  <View
                    style={[
                      commonLabelDescription.listLabelContainer,
                      styles.labelContainer,
                    ]}>
                    <Text style={commonLabelDescription.labelText}>
                      Address
                    </Text>
                  </View>
                  <View style={commonLabelDescription.listSeperator}>
                    <Text style={commonLabelDescription.labelText}>:</Text>
                  </View>
                  <View style={styles.descriptionContainer}>
                    <Text
                      numberOfLines={1}
                      ellipsesMode={'tail'}
                      style={commonLabelDescription.labelValue}>
                      {item.displaylocation}
                    </Text>
                  </View>
                </View>
                <View style={commonLabelDescription.listContainer}>
                  <View
                    style={[
                      commonLabelDescription.listLabelContainer,
                      styles.labelContainer,
                    ]}>
                    <Text style={commonLabelDescription.labelText}>Order</Text>
                  </View>
                  <View style={commonLabelDescription.listSeperator}>
                    <Text style={commonLabelDescription.labelText}>:</Text>
                  </View>
                  <View style={styles.descriptionContainer}>
                    <Text
                      numberOfLines={1}
                      ellipsesMode={'tail'}
                      style={commonLabelDescription.labelValue}>
                      {item.ordertext}
                    </Text>
                  </View>
                </View>
                <View style={commonLabelDescription.listContainer}>
                  <View
                    style={[
                      commonLabelDescription.listLabelContainer,
                      styles.labelContainer,
                    ]}>
                    <Text style={commonLabelDescription.labelText}>
                      Deliver On
                    </Text>
                  </View>
                  <View style={commonLabelDescription.listSeperator}>
                    <Text style={commonLabelDescription.labelText}>:</Text>
                  </View>
                  <View style={styles.descriptionContainer}>
                    <Text style={commonLabelDescription.labelValue}>
                      {item.displaypickupdate}
                    </Text>
                  </View>
                </View>
                <View style={commonLabelDescription.listContainer}>
                  <View
                    style={[
                      commonLabelDescription.listLabelContainer,
                      styles.labelContainer,
                    ]}>
                    <Text style={commonLabelDescription.labelText}>Status</Text>
                  </View>
                  <View style={commonLabelDescription.listSeperator}>
                    <Text style={commonLabelDescription.labelText}>:</Text>
                  </View>
                  <View style={styles.descriptionContainer}>
                    <Text
                      style={[
                        commonLabelDescription.labelValue,
                        badgeColorCode(item.statuscolor),
                      ]}>
                      {item.statustext}
                    </Text>
                  </View>
                </View>
              </Body>
            </CardItem>
          </TouchableOpacity>
        </Card>
      </View>
    );
  };

  renderComplaintLogDetails = ({item, index}) => {
    return (
      <View style={{width: '100%'}}>
        <Card style={callLogCardLayout.cardContainer}>
          <TouchableOpacity
            activeOpacity={0.5}
            onPress={() => {
              this.props.navigation.push('ReceptionComplaintDetails', {
                pageHeading: item.customername,
                callLogId: item.calllogid,
              });
            }}>
            <CardItem style={[callLogCardLayout.cardBody]}>
              <Body>
                <Text
                  style={[
                    callLogCardLayout.bodyTitle,
                    {color: primaryHexColor},
                  ]}>
                  {item.customername}
                </Text>
                <View style={callLogCardLayout.textWithIconContainer}>
                  <Icon
                    name="circle"
                    size={14}
                    style={callLogCardLayout.textWithIconContainerIcon}
                  />
                  <View>
                    <Text
                      style={[
                        callLogCardLayout.textWithIconContainerText,
                        {fontWeight: 'bold'},
                      ]}>
                      {item.doctorname}
                    </Text>
                  </View>
                </View>
                <View style={callLogCardLayout.textWithIconContainer}>
                  <Icon
                    name="circle"
                    size={14}
                    style={callLogCardLayout.textWithIconContainerIcon}
                  />
                  <View>
                    <Text style={[callLogCardLayout.textWithIconContainerText]}>
                      {item.customeremail}
                    </Text>
                  </View>
                </View>
                <View style={callLogCardLayout.textWithIconContainer}>
                  <Icon
                    name="circle"
                    size={14}
                    style={callLogCardLayout.textWithIconContainerIcon}
                  />
                  <View>
                    <Text style={[callLogCardLayout.textWithIconContainerText]}>
                      {item.customerphoneno}
                    </Text>
                  </View>
                </View>
                <View style={callLogCardLayout.textWithIconContainer}>
                  <Icon
                    name="circle"
                    size={14}
                    style={callLogCardLayout.textWithIconContainerIcon}
                  />
                  <View>
                    <Text
                      numberOfLines={1}
                      ellipsizeMode={'tail'}
                      style={[callLogCardLayout.textWithIconContainerText]}>
                      {item.displaylocation}
                    </Text>
                  </View>
                </View>
              </Body>
            </CardItem>
          </TouchableOpacity>
        </Card>
      </View>
    );
  };

  renderOrderDetails = ({item, index}) => {
    return (
      <View style={{width: '100%'}}>
        <Card style={callLogCardLayout.cardContainer}>
          <TouchableOpacity
            activeOpacity={0.5}
            onPress={() => {
              this.props.navigation.push('AdminQCOrder', {
                orderId: item.orderid,
              });
            }}>
            <CardItem style={callLogCardLayout.cardHeader}>
              <Left>
                <Text style={callLogCardLayout.topLeftRightText}>
                  #{item.orderid}
                </Text>
              </Left>
              <Right>
                <Text
                  style={[
                    callLogCardLayout.topLeftRightText,
                    {marginLeft: -50},
                  ]}>
                  {item.displayorderdate}
                </Text>
              </Right>
            </CardItem>
            <CardItem style={[callLogCardLayout.cardBody]}>
              <Body>
                <View style={commonLabelDescription.listContainer}>
                  <View
                    style={[
                      commonLabelDescription.listLabelContainer,
                      styles.labelContainer,
                    ]}>
                    <Text style={commonLabelDescription.labelText}>
                      Customer
                    </Text>
                  </View>
                  <View style={commonLabelDescription.listSeperator}>
                    <Text style={commonLabelDescription.labelText}>:</Text>
                  </View>
                  <View style={styles.descriptionContainer}>
                    <Text
                      style={[
                        commonLabelDescription.labelValue,
                        common.linkText,
                        {fontWeight: 'bold'},
                      ]}>
                      {item.customername}
                    </Text>
                  </View>
                </View>
                <View
                  style={[
                    commonLabelDescription.listContainer,
                    styles.labelContainer,
                  ]}>
                  <View
                    style={[
                      commonLabelDescription.listLabelContainer,
                      styles.labelContainer,
                    ]}>
                    <Text style={commonLabelDescription.labelText}>Doctor</Text>
                  </View>
                  <View style={commonLabelDescription.listSeperator}>
                    <Text style={commonLabelDescription.labelText}>:</Text>
                  </View>
                  <View style={styles.descriptionContainer}>
                    <Text style={commonLabelDescription.labelValue}>
                      {item.doctorname}
                    </Text>
                  </View>
                </View>
                <View
                  style={[
                    commonLabelDescription.listContainer,
                    styles.labelContainer,
                  ]}>
                  <View
                    style={[
                      commonLabelDescription.listLabelContainer,
                      styles.labelContainer,
                    ]}>
                    <Text style={commonLabelDescription.labelText}>
                      Patient
                    </Text>
                  </View>
                  <View style={commonLabelDescription.listSeperator}>
                    <Text style={commonLabelDescription.labelText}>:</Text>
                  </View>
                  <View style={styles.descriptionContainer}>
                    <Text style={commonLabelDescription.labelValue}>
                      {item.patientname}
                    </Text>
                  </View>
                </View>
                <View
                  style={[
                    commonLabelDescription.listContainer,
                    styles.labelContainer,
                  ]}>
                  <View
                    style={[
                      commonLabelDescription.listLabelContainer,
                      styles.labelContainer,
                    ]}>
                    <Text style={commonLabelDescription.labelText}>
                      Gender / Age
                    </Text>
                  </View>
                  <View style={commonLabelDescription.listSeperator}>
                    <Text style={commonLabelDescription.labelText}>:</Text>
                  </View>
                  <View style={styles.descriptionContainer}>
                    <Text style={commonLabelDescription.labelValue}>
                      {item.gendertext} / {item.agewithyears}
                    </Text>
                  </View>
                </View>
                <View
                  style={[
                    commonLabelDescription.listContainer,
                    styles.labelContainer,
                  ]}>
                  <View
                    style={[
                      commonLabelDescription.listLabelContainer,
                      styles.labelContainer,
                    ]}>
                    <Text style={commonLabelDescription.labelText}>
                      Delivery Date
                    </Text>
                  </View>
                  <View style={commonLabelDescription.listSeperator}>
                    <Text style={commonLabelDescription.labelText}>:</Text>
                  </View>
                  <View style={styles.descriptionContainer}>
                    <Text style={commonLabelDescription.labelValue}>
                      {item.displaydeliverydate}
                    </Text>
                  </View>
                </View>
                <View
                  style={[
                    commonLabelDescription.listContainer,
                    styles.labelContainer,
                  ]}>
                  <View
                    style={[
                      commonLabelDescription.listLabelContainer,
                      styles.labelContainer,
                    ]}>
                    <Text style={commonLabelDescription.labelText}>
                      Total Price
                    </Text>
                  </View>
                  <View style={commonLabelDescription.listSeperator}>
                    <Text style={commonLabelDescription.labelText}>:</Text>
                  </View>
                  <View style={styles.descriptionContainer}>
                    <Text style={commonLabelDescription.labelValue}>
                      {item.displaytotalprice}
                    </Text>
                  </View>
                </View>
                <View
                  style={[
                    commonLabelDescription.listContainer,
                    styles.labelContainer,
                  ]}>
                  <View
                    style={[
                      commonLabelDescription.listLabelContainer,
                      styles.labelContainer,
                    ]}>
                    <Text style={commonLabelDescription.labelText}>Status</Text>
                  </View>
                  <View style={commonLabelDescription.listSeperator}>
                    <Text style={commonLabelDescription.labelText}>:</Text>
                  </View>
                  <View style={styles.descriptionContainer}>
                    <Text
                      style={[
                        commonLabelDescription.labelValue,
                        badgeColorCode(item.statuscolor),
                      ]}>
                      {item.statustext}
                    </Text>
                  </View>
                </View>
              </Body>
            </CardItem>
          </TouchableOpacity>
        </Card>
      </View>
    );
  };

  renderCompletedOrders = ({item, index}) => {
    return (
      <View style={{width: '100%'}}>
        <Card style={callLogCardLayout.cardContainer}>
          <TouchableOpacity
            activeOpacity={0.5}
            onPress={() => {
              this.props.navigation.push('AdminQCOrder', {
                orderId: item.orderid,
              });
            }}>
            <CardItem
              style={[
                callLogCardLayout.cardBodyWithOutFooter,
                {paddingBottom: 0},
              ]}>
              <Body>
                <View style={commonLabelDescription.listContainer}>
                  <View
                    style={[
                      commonLabelDescription.listLabelContainer,
                      styles.labelContainer,
                    ]}>
                    <Text style={commonLabelDescription.labelText}>Job ID</Text>
                  </View>
                  <View style={commonLabelDescription.listSeperator}>
                    <Text style={commonLabelDescription.labelText}>:</Text>
                  </View>
                  <View style={styles.descriptionContainer}>
                    <Text style={commonLabelDescription.labelValue}>
                      #{item.orderdetailid}
                    </Text>
                  </View>
                </View>
                <View style={commonLabelDescription.listContainer}>
                  <View
                    style={[
                      commonLabelDescription.listLabelContainer,
                      styles.labelContainer,
                    ]}>
                    <Text style={commonLabelDescription.labelText}>
                      Order ID
                    </Text>
                  </View>
                  <View style={commonLabelDescription.listSeperator}>
                    <Text style={commonLabelDescription.labelText}>:</Text>
                  </View>
                  <View style={styles.descriptionContainer}>
                    <Text style={commonLabelDescription.labelValue}>
                      #{item.orderid}
                    </Text>
                  </View>
                </View>
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
                    <View>
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
                    <View>
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
                </View>
                <View style={commonLabelDescription.listContainer}>
                  <View
                    style={[
                      commonLabelDescription.listLabelContainer,
                      styles.labelContainer,
                    ]}>
                    <Text style={commonLabelDescription.labelText}>Status</Text>
                  </View>
                  <View style={commonLabelDescription.listSeperator}>
                    <Text style={commonLabelDescription.labelText}>:</Text>
                  </View>
                  <View style={styles.descriptionContainer}>
                    <Text
                      style={[
                        commonLabelDescription.labelValue,
                        badgeColorCode(item.statuscolor),
                      ]}>
                      {item.statustext}
                    </Text>
                  </View>
                </View>
              </Body>
            </CardItem>
          </TouchableOpacity>
        </Card>
      </View>
    );
  };

  renderCompletedJobs = ({item, index}) => {
    return (
      <View style={{width: '100%'}}>
        <Card style={callLogCardLayout.cardContainer}>
          <TouchableOpacity
            activeOpacity={0.5}
            onPress={() => {
              this.props.navigation.push('ReceptionCompletedJob', {
                orderDetailId: item.orderdetailid,
                orderId: item.orderid,
              });
            }}>
            <CardItem
              style={[
                callLogCardLayout.cardBodyWithOutFooter,
                {paddingBottom: 0},
              ]}>
              <Body>
                <View style={commonLabelDescription.listContainer}>
                  <View
                    style={[
                      commonLabelDescription.listLabelContainer,
                      styles.labelContainer,
                    ]}>
                    <Text style={commonLabelDescription.labelText}>Job ID</Text>
                  </View>
                  <View style={commonLabelDescription.listSeperator}>
                    <Text style={commonLabelDescription.labelText}>:</Text>
                  </View>
                  <View style={styles.descriptionContainer}>
                    <Text style={commonLabelDescription.labelValue}>
                      #{item.orderdetailid}
                    </Text>
                  </View>
                </View>
                <View style={commonLabelDescription.listContainer}>
                  <View
                    style={[
                      commonLabelDescription.listLabelContainer,
                      styles.labelContainer,
                    ]}>
                    <Text style={commonLabelDescription.labelText}>
                      Order ID
                    </Text>
                  </View>
                  <View style={commonLabelDescription.listSeperator}>
                    <Text style={commonLabelDescription.labelText}>:</Text>
                  </View>
                  <View style={styles.descriptionContainer}>
                    <Text style={commonLabelDescription.labelValue}>
                      #{item.orderid}
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
                    <View>
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
                </View>
                <View
                  style={[
                    commonLabelDescription.listContainer,
                    styles.listContainer,
                  ]}>
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
                    <View>
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
                </View>
                <View style={commonLabelDescription.listContainer}>
                  <View
                    style={[
                      commonLabelDescription.listLabelContainer,
                      styles.labelContainer,
                    ]}>
                    <Text style={commonLabelDescription.labelText}>Status</Text>
                  </View>
                  <View style={commonLabelDescription.listSeperator}>
                    <Text style={commonLabelDescription.labelText}>:</Text>
                  </View>
                  <View style={styles.descriptionContainer}>
                    <Text
                      style={[
                        commonLabelDescription.labelValue,
                        badgeColorCode(item.statuscolor),
                      ]}>
                      {item.statustext}
                    </Text>
                  </View>
                </View>
              </Body>
            </CardItem>
          </TouchableOpacity>
        </Card>
      </View>
    );
  };

  renderRejectedOrders = ({item, index}) => {
    return (
      <View style={{width: '100%'}}>
        <Card style={callLogCardLayout.cardContainer}>
          <TouchableOpacity
            activeOpacity={0.5}
            onPress={() => {
              this.props.navigation.push('ReceptionRejectedJob', {
                orderDetailId: item.orderdetailid,
                orderId: item.orderid,
              });
            }}>
            <CardItem
              style={[
                callLogCardLayout.cardBodyWithOutFooter,
                {paddingBottom: 0},
              ]}>
              <Body>
                <View style={commonLabelDescription.listContainer}>
                  <View
                    style={[
                      commonLabelDescription.listLabelContainer,
                      styles.labelContainer,
                    ]}>
                    <Text style={commonLabelDescription.labelText}>Job ID</Text>
                  </View>
                  <View style={commonLabelDescription.listSeperator}>
                    <Text style={commonLabelDescription.labelText}>:</Text>
                  </View>
                  <View style={styles.descriptionContainer}>
                    <Text style={commonLabelDescription.labelValue}>
                      #{item.orderdetailid}
                    </Text>
                  </View>
                </View>
                <View style={commonLabelDescription.listContainer}>
                  <View
                    style={[
                      commonLabelDescription.listLabelContainer,
                      styles.labelContainer,
                    ]}>
                    <Text style={commonLabelDescription.labelText}>
                      Order ID
                    </Text>
                  </View>
                  <View style={commonLabelDescription.listSeperator}>
                    <Text style={commonLabelDescription.labelText}>:</Text>
                  </View>
                  <View style={styles.descriptionContainer}>
                    <Text style={commonLabelDescription.labelValue}>
                      #{item.orderid}
                    </Text>
                  </View>
                </View>
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
                    <View>
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
                    <View>
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
                </View>
                <View style={commonLabelDescription.listContainer}>
                  <View
                    style={[
                      commonLabelDescription.listLabelContainer,
                      styles.labelContainer,
                    ]}>
                    <Text style={commonLabelDescription.labelText}>Status</Text>
                  </View>
                  <View style={commonLabelDescription.listSeperator}>
                    <Text style={commonLabelDescription.labelText}>:</Text>
                  </View>
                  <View style={styles.descriptionContainer}>
                    <Text
                      style={[
                        commonLabelDescription.labelValue,
                        badgeColorCode(item.statuscolor),
                      ]}>
                      {item.statustext}
                    </Text>
                  </View>
                </View>
              </Body>
            </CardItem>
          </TouchableOpacity>
        </Card>
      </View>
    );
  };

  render() {
    const skeletonLayout = [
      {
        width: screenWidth - 40,
        height: 160,
        borderRadius: 8,
        marginTop: 15,
        marginBottom: 5,
        marginLeft: 20,
        marginRight: 20,
      },
      {
        width: screenWidth - 40,
        height: 120,
        borderRadius: 8,
        marginTop: 5,
        marginBottom: 5,
        marginLeft: 20,
        marginRight: 20,
      },
      {
        width: screenWidth - 40,
        height: 140,
        borderRadius: 8,
        marginTop: 5,
        marginBottom: 5,
        marginLeft: 20,
        marginRight: 20,
      },
      {
        width: screenWidth - 40,
        height: 170,
        borderRadius: 8,
        marginTop: 5,
        marginBottom: 5,
        marginLeft: 20,
        marginRight: 20,
      },
      {
        width: screenWidth - 40,
        height: 170,
        borderRadius: 8,
        marginTop: 5,
        marginBottom: 5,
        marginLeft: 20,
        marginRight: 20,
      },
    ];

    return (
      <View style={{flex: 1, backgroundColor: backgroundGrey}}>
        <SkeletonContent
          containerStyle={{flex: 1, width: screenWidth.width}}
          layout={skeletonLayout}
          isLoading={this.state.loading}
          duration={skeletonPlaceholderProps.duration}
          animationType={skeletonPlaceholderProps.animationType}
          animationDirection={skeletonPlaceholderProps.animationDirection}
          boneColor={skeletonPlaceholderProps.boneColor}
          highlightColor={skeletonPlaceholderProps.highlightColor}>
          <ScrollView
            contentContainerStyle={{flexGrow: 1}}
            refreshControl={
              <RefreshControl
                refreshing={this.state.refreshing}
                onRefresh={this.onRefreshPageData}
              />
            }>
            {!this.state.loading ? (
              <View>
                <View
                  style={[
                    dashBoardStyle.attendanceCard,
                    {
                      backgroundColor: primarywhiteHexColor,
                      marginTop: 15,
                      marginBottom: 8,
                      shadowColor: '#000',
                      shadowOffset: {width: 0, height: 1},
                      shadowOpacity: 0.8,
                      shadowRadius: 2,
                      elevation: 2,
                    },
                  ]}>
                  <View
                    style={[
                      dashBoardStyle.carouselHeader,
                      {
                        marginBottom: 10,
                        borderBottomWidth: 1,
                        borderBottomColor: seperator,
                        paddingHorizontal: 0,
                        marginHorizontal: 20,
                      },
                    ]}>
                    <Left>
                      <Text
                        style={[
                          dashBoardStyle.carouselHeading,
                          {color: fontColor, marginBottom: 5},
                        ]}>
                        PRODUCTS
                      </Text>
                    </Left>
                    <Right>
                      <Text
                        style={[
                          dashBoardStyle.carouselHeadingLink,
                          {color: fontColor, marginBottom: 5},
                        ]}
                        onPress={() => {
                          this.props.navigation.navigate('ReceptionBrands', {});
                        }}>
                        View All
                      </Text>
                    </Right>
                  </View>
                  <View
                    style={[
                      dashBoardStyle.carouselBody,
                      {paddingBottom: 20, paddingHorizontal: 20},
                    ]}>
                    {this.state.products.length === 0 ? (
                      <Text
                        style={[
                          common.mutedTextInItalic,
                          {textAlign: 'center'},
                        ]}>
                        No products added!
                      </Text>
                    ) : (
                      <View>
                        <Carousel
                          sliderWidth={SLIDER_WIDTH - 80}
                          sliderHeight={carouselWidth}
                          itemWidth={105}
                          data={
                            this.state.products.length > 0
                              ? this.state.products
                              : []
                          }
                          renderItem={this.renderCarouselProduct}
                          activeSlideAlignment={'start'}
                          inactiveSlideScale={1}
                          inactiveSlideOpacity={1}
                        />
                      </View>
                    )}
                  </View>
                </View>
                <View
                  style={[
                    dashBoardStyle.attendanceCard,
                    {backgroundColor: primarywhiteHexColor, paddingBottom: 12},
                  ]}>
                  <View style={[dashBoardStyle.carouselHeader, {}]}>
                    <Text
                      style={[
                        dashBoardStyle.carouselHeading,
                        {color: fontColor, textTransform: 'capitalize'},
                      ]}>
                      Our Brand Products
                    </Text>
                  </View>
                  <View
                    style={[
                      dashBoardStyle.carouselBody,
                      {paddingHorizontal: 10},
                    ]}>
                    {this.state.brandProducts.length === 0 ? (
                      <Text
                        style={[
                          common.mutedTextInItalic,
                          {textAlign: 'center'},
                        ]}>
                        No brand products added!
                      </Text>
                    ) : (
                      <View>
                        <Carousel
                          layout={'default'}
                          data={
                            this.state.brandProducts.length > 0
                              ? this.state.brandProducts
                              : [
                                  {
                                    brandimagefilepath:
                                      this.state.brandProducts
                                        .brandimagefilepath,
                                  },
                                ]
                          }
                          renderItem={this.renderCarouselBrandProducts}
                          sliderWidth={SLIDER_WIDTH - 40}
                          itemWidth={BRAND_ITEM_WIDTH}
                          activeSlideAlignment={'start'}
                          inactiveSlideScale={1}
                          inactiveSlideOpacity={1}
                          scrollEnabled={true}
                        />
                      </View>
                    )}
                  </View>
                </View>
                <View>
                  <View
                    style={[
                      dashBoardStyle.carouselHeader,
                      {marginTop: 0, marginBottom: 0},
                    ]}>
                    <Left>
                      <Text
                        style={dashBoardStyle.carouselWithoutCardDataHeading}>
                        CUSTOMERS
                      </Text>
                    </Left>
                    <Right>
                      <Text
                        style={dashBoardStyle.carouselWithoutCardData}
                        onPress={() => {
                          this.props.navigation.navigate('ReceptionCustomers', {
                            pageHeading: 'Customers',
                          });
                        }}>
                        View All
                      </Text>
                    </Right>
                  </View>
                  <View
                    style={[dashBoardStyle.carouselBody, {marginBottom: 4}]}>
                    {this.state.customers.length === 0 ? (
                      <Text
                        style={[
                          common.mutedTextInItalic,
                          {textAlign: 'center'},
                        ]}>
                        No customers added!
                      </Text>
                    ) : (
                      <View>
                        <Carousel
                          sliderWidth={carouselWidth}
                          sliderHeight={carouselWidth}
                          itemWidth={carouselWidth - 70}
                          data={
                            this.state.customers.length > 0
                              ? this.state.customers
                              : []
                          }
                          renderItem={this.renderCustomers}
                          hasParallaxImages={true}
                          inactiveSlideOpacity={1}
                        />
                      </View>
                    )}
                  </View>
                </View>
                <View
                  style={[
                    dashBoardStyle.attendanceCard,
                    {backgroundColor: primarywarningHexColor},
                  ]}>
                  <View style={dashBoardStyle.carouselHeader}>
                    <Left>
                      <Text
                        style={[
                          dashBoardStyle.carouselHeading,
                          {color: primarywhiteHexColor},
                        ]}>
                        Pickup Requests
                      </Text>
                    </Left>
                    <Right>
                      <Text
                        style={[
                          dashBoardStyle.carouselHeadingLink,
                          {color: primarywhiteHexColor},
                        ]}
                        onPress={() => {
                          this.props.navigation.navigate(
                            'ReceptionCollectionCalls',
                            {pageHeading: 'Pickup Request'},
                          );
                        }}>
                        View All
                      </Text>
                    </Right>
                  </View>
                  <View
                    style={[dashBoardStyle.carouselBody, {paddingBottom: 5}]}>
                    {this.state.pickupCalls.length === 0 ? (
                      <Text
                        style={[
                          common.mutedTextInItalic,
                          {color: primarywhiteHexColor, textAlign: 'center'},
                        ]}>
                        No pickup calls added!
                      </Text>
                    ) : (
                      <View>
                        <Carousel
                          sliderWidth={carouselWidth - 40}
                          sliderHeight={carouselWidth}
                          // firstItem={2}
                          itemWidth={carouselWidth - 100}
                          data={
                            this.state.pickupCalls.length > 0
                              ? this.state.pickupCalls
                              : []
                          }
                          renderItem={this.renderPickupCallLogDetails}
                          hasParallaxImages={true}
                          inactiveSlideOpacity={1}
                        />
                      </View>
                    )}
                  </View>
                </View>
                <View
                  style={[
                    dashBoardStyle.attendanceCard,
                    {backgroundColor: successHexColor},
                  ]}>
                  <View style={dashBoardStyle.carouselHeader}>
                    <Left>
                      <Text
                        style={[
                          dashBoardStyle.carouselHeading,
                          {color: primarywhiteHexColor},
                        ]}>
                        DELIVERY CALLS
                      </Text>
                    </Left>
                    <Right>
                      <Text
                        style={[
                          dashBoardStyle.carouselHeadingLink,
                          {color: primarywhiteHexColor},
                        ]}
                        onPress={() => {
                          this.props.navigation.navigate(
                            'ReceptionDeliveryCalls',
                            {pageHeading: 'Delivery Calls'},
                          );
                        }}>
                        View All
                      </Text>
                    </Right>
                  </View>
                  <View
                    style={[dashBoardStyle.carouselBody, {paddingBottom: 5}]}>
                    {this.state.deliveryCalls.length === 0 ? (
                      <Text
                        style={[
                          common.mutedTextInItalic,
                          {color: primarywhiteHexColor, textAlign: 'center'},
                        ]}>
                        No delivery calls added!
                      </Text>
                    ) : (
                      <View>
                        <Carousel
                          sliderWidth={carouselWidth - 40}
                          sliderHeight={carouselWidth}
                          // firstItem={2}
                          itemWidth={carouselWidth - 100}
                          data={
                            this.state.deliveryCalls.length > 0
                              ? this.state.deliveryCalls
                              : []
                          }
                          renderItem={this.renderDeliveryCallLogDetails}
                          hasParallaxImages={true}
                          inactiveSlideOpacity={1}
                        />
                      </View>
                    )}
                  </View>
                </View>
                <View
                  style={[
                    dashBoardStyle.attendanceCard,
                    {backgroundColor: primaryPurpleHexColor},
                  ]}>
                  <View style={dashBoardStyle.carouselHeader}>
                    <Left>
                      <Text
                        style={[
                          dashBoardStyle.carouselHeading,
                          {color: primarywhiteHexColor},
                        ]}>
                        COMPLANITS
                      </Text>
                    </Left>
                    <Right>
                      <Text
                        style={[
                          dashBoardStyle.carouselHeadingLink,
                          {color: primarywhiteHexColor},
                        ]}
                        onPress={() => {
                          this.props.navigation.navigate(
                            'ReceptionComplaints',
                            {pageHeading: 'Complaints'},
                          );
                        }}>
                        View All
                      </Text>
                    </Right>
                  </View>
                  <View
                    style={[dashBoardStyle.carouselBody, {paddingBottom: 5}]}>
                    {this.state.complaints.length === 0 ? (
                      <Text
                        style={[
                          common.mutedTextInItalic,
                          {color: primarywhiteHexColor, textAlign: 'center'},
                        ]}>
                        No complaints added!
                      </Text>
                    ) : (
                      <View>
                        <Carousel
                          sliderWidth={carouselWidth - 40}
                          sliderHeight={carouselWidth}
                          // firstItem={2}
                          itemWidth={carouselWidth - 100}
                          data={
                            this.state.complaints.length > 0
                              ? this.state.complaints
                              : []
                          }
                          renderItem={this.renderComplaintLogDetails}
                          hasParallaxImages={true}
                          inactiveSlideOpacity={1}
                        />
                      </View>
                    )}
                  </View>
                </View>
                <View
                  style={[
                    dashBoardStyle.attendanceCard,
                    {backgroundColor: primaryBlueHexColor},
                  ]}>
                  <View style={dashBoardStyle.carouselHeader}>
                    <Left>
                      <Text
                        style={[
                          dashBoardStyle.carouselHeading,
                          {color: primarywhiteHexColor},
                        ]}>
                        ORDERS
                      </Text>
                    </Left>
                    <Right>
                      <Text
                        style={[
                          dashBoardStyle.carouselHeadingLink,
                          {color: primarywhiteHexColor},
                        ]}
                        onPress={() => {
                          this.props.navigation.navigate('ReceptionOrders', {
                            pageHeading: 'Orders',
                          });
                        }}>
                        View All
                      </Text>
                    </Right>
                  </View>
                  <View
                    style={[dashBoardStyle.carouselBody, {paddingBottom: 5}]}>
                    {this.state.orders.length === 0 ? (
                      <Text
                        style={[
                          common.mutedTextInItalic,
                          {color: primarywhiteHexColor, textAlign: 'center'},
                        ]}>
                        No orders added!
                      </Text>
                    ) : (
                      <View>
                        <Carousel
                          sliderWidth={carouselWidth - 40}
                          sliderHeight={carouselWidth}
                          // firstItem={2}
                          itemWidth={carouselWidth - 100}
                          data={
                            this.state.orders.length > 0
                              ? this.state.orders
                              : []
                          }
                          renderItem={this.renderOrderDetails}
                          hasParallaxImages={true}
                          inactiveSlideOpacity={1}
                        />
                      </View>
                    )}
                  </View>
                </View>
                <View
                  style={[
                    dashBoardStyle.attendanceCard,
                    {backgroundColor: successHexColor},
                  ]}>
                  <View style={dashBoardStyle.carouselHeader}>
                    <Left>
                      <Text
                        style={[
                          dashBoardStyle.carouselHeading,
                          {color: primarywhiteHexColor},
                        ]}>
                        COMPLETED ORDERS
                      </Text>
                    </Left>
                    <Right>
                      <Text
                        style={[
                          dashBoardStyle.carouselHeadingLink,
                          {color: primarywhiteHexColor},
                        ]}
                        onPress={() => {
                          this.props.navigation.navigate(
                            'ReceptionCompletedOrders',
                            {pageHeading: 'Completed Orders'},
                          );
                        }}>
                        View All
                      </Text>
                    </Right>
                  </View>
                  <View
                    style={[dashBoardStyle.carouselBody, {paddingBottom: 5}]}>
                    {this.state.completedOrders.length === 0 ? (
                      <Text
                        style={[
                          common.mutedTextInItalic,
                          {color: primarywhiteHexColor, textAlign: 'center'},
                        ]}>
                        No completed orders added!
                      </Text>
                    ) : (
                      <View>
                        <Carousel
                          sliderWidth={carouselWidth - 40}
                          sliderHeight={carouselWidth}
                          // firstItem={2}
                          itemWidth={carouselWidth - 100}
                          data={
                            this.state.completedOrders.length > 0
                              ? this.state.completedOrders
                              : []
                          }
                          renderItem={this.renderCompletedOrders}
                          hasParallaxImages={true}
                          inactiveSlideOpacity={1}
                        />
                      </View>
                    )}
                  </View>
                </View>
                <View
                  style={[
                    dashBoardStyle.attendanceCard,
                    {backgroundColor: successHexColor},
                  ]}>
                  <View style={[dashBoardStyle.carouselHeader, {}]}>
                    <Left>
                      <Text
                        style={[
                          dashBoardStyle.carouselHeading,
                          {color: primarywhiteHexColor},
                        ]}>
                        COMPLETED JOBS
                      </Text>
                    </Left>
                    <Right>
                      <Text
                        style={[
                          dashBoardStyle.carouselHeadingLink,
                          {color: primarywhiteHexColor},
                        ]}
                        onPress={() => {
                          this.props.navigation.navigate(
                            'ReceptionCompletedJobs',
                            {pageHeading: 'Completed Jobs'},
                          );
                        }}>
                        View All
                      </Text>
                    </Right>
                  </View>
                  <View
                    style={[dashBoardStyle.carouselBody, {paddingBottom: 5}]}>
                    {this.state.completedJobs.length === 0 ? (
                      <Text
                        style={[
                          common.mutedTextInItalic,
                          {color: primarywhiteHexColor, textAlign: 'center'},
                        ]}>
                        No completed jobs added!
                      </Text>
                    ) : (
                      <View style={{}}>
                        <Carousel
                          sliderWidth={carouselWidth - 40}
                          sliderHeight={carouselWidth}
                          itemWidth={carouselWidth - 100}
                          data={
                            this.state.completedJobs.length > 0
                              ? this.state.completedJobs
                              : []
                          }
                          renderItem={this.renderCompletedJobs}
                          hasParallaxImages={true}
                          inactiveSlideOpacity={1}
                        />
                      </View>
                    )}
                  </View>
                </View>
                <View
                  style={[
                    dashBoardStyle.attendanceCard,
                    {backgroundColor: primarywarningHexColor},
                  ]}>
                  <View style={dashBoardStyle.carouselHeader}>
                    <Left>
                      <Text
                        style={[
                          dashBoardStyle.carouselHeading,
                          {color: primarywhiteHexColor},
                        ]}>
                        Rejected Jobs
                      </Text>
                    </Left>
                    <Right>
                      <Text
                        style={[
                          dashBoardStyle.carouselHeadingLink,
                          {color: primarywhiteHexColor},
                        ]}
                        onPress={() => {
                          this.props.navigation.navigate(
                            'ReceptionRejectedJobs',
                            {pageHeading: 'Rejected Jobs'},
                          );
                        }}>
                        View All
                      </Text>
                    </Right>
                  </View>
                  <View
                    style={[dashBoardStyle.carouselBody, {paddingBottom: 5}]}>
                    {this.state.rejectedJobs.length === 0 ? (
                      <Text
                        style={[
                          common.mutedTextInItalic,
                          {color: primarywhiteHexColor, textAlign: 'center'},
                        ]}>
                        No rejected jobs added!
                      </Text>
                    ) : (
                      <View>
                        <Carousel
                          sliderWidth={carouselWidth - 40}
                          sliderHeight={carouselWidth}
                          // firstItem={2}
                          itemWidth={carouselWidth - 100}
                          data={
                            this.state.rejectedJobs.length > 0
                              ? this.state.rejectedJobs
                              : []
                          }
                          renderItem={this.renderRejectedOrders}
                          hasParallaxImages={true}
                          inactiveSlideOpacity={1}
                        />
                      </View>
                    )}
                  </View>
                </View>
              </View>
            ) : (
              <NotFound onPress={this.reloadPageData} />
            )}
          </ScrollView>
        </SkeletonContent>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  labelContainer: {
    width: 100,
  },
  descriptionContainer: {
    width: screenWidth - 230,
  },
});
