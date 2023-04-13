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
} from '../../../assets/style';

import Api from '../../../provider/Api';
import Dataprovider from '../../../provider/Dataprovider';

import NotFound from '../../../components/NotFound';

import {
  backgroundGrey,
  fontColor,
  mainBgColor,
  primaryBlueHexColor,
  primaryHexColor,
  primaryOrangeHexColor,
  primaryPurpleHexColor,
  primarywarningHexColor,
  primarywhiteHexColor,
  successHexColor,
  textMutedColor,
} from '../../../constants/themeColors';

import Icon from 'react-native-vector-icons/FontAwesome';

import {Body, Card, CardItem, Left, Right} from 'native-base';

import {skeletonPlaceholderProps} from '../../../constants/defaultValues';

import Carousel from 'react-native-snap-carousel';
import SkeletonContent from '../../../components/SkeletonContent';

// BANER CAROUSEL
const screenWidth = Dimensions.get('window').width;
const appScreenWidth = Dimensions.get('window');
const carouselWidth = appScreenWidth.width;
// BRAND CAROUSEL
const {width: viewportWidth, height: viewportHeight} = Dimensions.get('window');
const SLIDE_WIDTH = Math.round(viewportWidth / 2.6);
const ITEM_HORIZONTAL_MARGIN = 0;
const SLIDER_WIDTH = viewportWidth;

const BRAND_ITEM_WIDTH = SLIDE_WIDTH + ITEM_HORIZONTAL_MARGIN * 2 - 80;

export default class CustomerDashboard extends Component {
  api = new Api();
  dataProvider = new Dataprovider();

  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      refreshing: false,
      transparentLoader: false,
      pickupCalls: [],
      deliveryCalls: [],
      complaints: [],
      customers: [],
      bands: [],
      salesRepresentative: [],
      areaWiseSalesIn: [],
      activeCarouselIndex: 0,
      showBoxName: [
        {
          label: 'REJECTION',
        },
        {
          label: 'REWORK',
        },
        {
          label: 'DELAYED JOBS',
        },
      ],
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
      api: 'v_1/sales/saleshead/dashboard',
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

      if (data.status_code === 200) {
        let responseData = data.response.data;

        this.setState({
          pickupCalls: responseData.pickupcalls,
          deliveryCalls: responseData.deliverycalls,
          complaints: responseData.complaints,
          customers: responseData.customers,
          bands: responseData.brands,
          salesRepresentative: responseData.salesrepresentative,
          areaWiseSalesIn: responseData.areawisesalesin,
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

  renderAreaWiseSalesIn = ({item, index}) => {
    return (
      <View style={{width: '100%'}}>
        <View
          style={[
            dashBoardStyle.attendanceSquare,
            {
              backgroundColor: primarywhiteHexColor,
              width: (appScreenWidth.width - 90) / 3,
            },
          ]}>
          <Text style={[dashBoardStyle.SquareShowText, {color: fontColor}]}>
            {item.value}
          </Text>
          <Text style={[dashBoardStyle.SquareShowNo, {color: fontColor}]}>
            {item.label}
          </Text>
        </View>
      </View>
    );
  };

  renderCarouselItem = ({item, index}) => {
    return (
      <View style={{width: '100%'}}>
        <View style={styles.showSquareBox}>
          <Text style={styles.showSquareBoxTextTop}></Text>
          <Text style={styles.showSquareBoxTextBottom}>{item.label}</Text>
        </View>
      </View>
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
              this.props.navigation.push('SalesCustomerDetails', {
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
              this.props.navigation.push('CollectionCallDetails', {
                pageHeading: item.customername,
                callLogId: item.calllogid,
              });
            }}>
            <CardItem style={[callLogCardLayout.cardBody, {}]}>
              <Body>
                <Text
                  style={[
                    callLogCardLayout.bodyTitle,
                    {color: primaryHexColor},
                  ]}>
                  {item.salespersonname}
                </Text>
                <View style={callLogCardLayout.textWithIconContainer}>
                  <Icon
                    name="circle"
                    size={14}
                    style={callLogCardLayout.textWithIconContainerIcon}
                  />
                  <View>
                    <Text style={callLogCardLayout.textWithIconContainerText}>
                      {item.typeofworktext}
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
                      {item.displaypickupdate}
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
                      style={[
                        callLogCardLayout.textWithIconContainerText,
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
      <View style={{width: '100%'}}>
        <Card style={callLogCardLayout.cardContainer}>
          <TouchableOpacity
            activeOpacity={0.5}
            onPress={() => {
              this.props.navigation.push('DeliveryCallDetails', {
                pageHeading: item.customername,
                callLogId: item.calllogid,
              });
            }}>
            <CardItem style={[callLogCardLayout.cardBody, {}]}>
              <Body>
                <Text
                  style={[
                    callLogCardLayout.bodyTitle,
                    {color: primaryHexColor},
                  ]}>
                  {item.salespersonname}
                </Text>
                <View style={callLogCardLayout.textWithIconContainer}>
                  <Icon
                    name="circle"
                    size={14}
                    style={callLogCardLayout.textWithIconContainerIcon}
                  />
                  <View>
                    <Text style={callLogCardLayout.textWithIconContainerText}>
                      {item.typeofworktext}
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
                      {item.displaypickupdate}
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
                      style={[
                        callLogCardLayout.textWithIconContainerText,
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
              this.props.navigation.push('ComplaintDetails', {
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

  renderCarouselBrand = ({item, index}) => {
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
            source={{uri: item.imagefilepath}}
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

  render() {
    const skeletonLayout = [
      {
        width: screenWidth - 40,
        height: 150,
        borderRadius: 8,
        marginTop: 15,
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
        height: 150,
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
                      backgroundColor: primaryOrangeHexColor,
                      marginTop: 12,
                      marginBottom: 0,
                    },
                  ]}>
                  <View style={[dashBoardStyle.carouselHeader, {}]}>
                    <Text
                      style={[
                        dashBoardStyle.attendanceCardHeaderText,
                        {color: primarywhiteHexColor},
                      ]}>
                      AREA WISE SALES IN
                    </Text>
                  </View>
                  <View
                    style={[
                      dashBoardStyle.carouselBody,
                      {paddingBottom: 5, paddingHorizontal: 20},
                    ]}>
                    <View>
                      <Carousel
                        sliderWidth={SLIDER_WIDTH - 80}
                        sliderHeight={carouselWidth}
                        itemWidth={105}
                        data={
                          this.state.areaWiseSalesIn.length > 0
                            ? this.state.areaWiseSalesIn
                            : []
                        }
                        renderItem={this.renderAreaWiseSalesIn}
                        activeSlideAlignment={'start'}
                        inactiveSlideScale={1}
                        inactiveSlideOpacity={1}
                      />
                    </View>
                  </View>
                </View>
                <View
                  style={[
                    dashBoardStyle.attendanceCard,
                    {
                      backgroundColor: primarywhiteHexColor,
                      marginTop: 8,
                      marginBottom: 4,
                      elevation: 2,
                    },
                  ]}>
                  <View
                    style={[dashBoardStyle.carouselHeader, {marginBottom: 5}]}>
                    <Text
                      style={[
                        dashBoardStyle.attendanceCardHeaderText,
                        {color: fontColor},
                      ]}>
                      SALES REPRESENTATIVE
                    </Text>
                  </View>
                  <View
                    style={[
                      dashBoardStyle.carouselBody,
                      {
                        flex: 1,
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        paddingHorizontal: 15,
                        paddingBottom: 10,
                      },
                    ]}>
                    <View>
                      <View
                        style={[
                          dashBoardStyle.attendanceCircle,
                          {backgroundColor: primaryBlueHexColor},
                        ]}>
                        <Text
                          style={[
                            dashBoardStyle.attendanceShowNo,
                            {color: primarywhiteHexColor},
                          ]}>
                          {
                            this.state.salesRepresentative
                              .salesrepresentativefirst_value
                          }
                        </Text>
                      </View>
                      <Text
                        style={[
                          dashBoardStyle.attendanceShowText,
                          {color: fontColor, width: 80},
                        ]}>
                        {
                          this.state.salesRepresentative
                            .salesrepresentativefirst_label
                        }
                      </Text>
                    </View>
                    <View>
                      <View
                        style={[
                          dashBoardStyle.attendanceCircle,
                          {backgroundColor: successHexColor},
                        ]}>
                        <Text
                          style={[
                            dashBoardStyle.attendanceShowNo,
                            {color: primarywhiteHexColor},
                          ]}>
                          {
                            this.state.salesRepresentative
                              .salesrepresentativesecond_value
                          }
                        </Text>
                      </View>
                      <Text
                        style={[
                          dashBoardStyle.attendanceShowText,
                          {color: fontColor, width: 80},
                        ]}>
                        {
                          this.state.salesRepresentative
                            .salesrepresentativesecond_label
                        }
                      </Text>
                    </View>
                    <View>
                      <View
                        style={[
                          dashBoardStyle.attendanceCircle,
                          {backgroundColor: primaryPurpleHexColor},
                        ]}>
                        <Text
                          style={[
                            dashBoardStyle.attendanceShowNo,
                            {color: primarywhiteHexColor},
                          ]}>
                          {
                            this.state.salesRepresentative
                              .salesrepresentativethird_value
                          }
                        </Text>
                      </View>
                      <Text
                        style={[
                          dashBoardStyle.attendanceShowText,
                          {color: fontColor, width: 80},
                        ]}>
                        {
                          this.state.salesRepresentative
                            .salesrepresentativethird_label
                        }
                      </Text>
                    </View>
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
                          this.props.navigation.navigate('SalesCustomers', {
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
                          this.props.navigation.navigate('CollectionCalls', {
                            pageHeading: 'Pickup Request',
                          });
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
                          {textAlign: 'center'},
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
                          this.props.navigation.navigate('DeliveryCalls', {
                            pageHeading: 'Delivery Calls',
                          });
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
                          {textAlign: 'center'},
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
                    {backgroundColor: primaryOrangeHexColor},
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
                          this.props.navigation.navigate('Complaints', {
                            pageHeading: 'Complaints',
                          });
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
                          {textAlign: 'center'},
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
                    {backgroundColor: primarywhiteHexColor, paddingBottom: 12},
                  ]}>
                  <View style={[dashBoardStyle.carouselHeader, {}]}>
                    <Text
                      style={[
                        dashBoardStyle.carouselHeading,
                        {color: fontColor, textTransform: 'capitalize'},
                      ]}>
                      Our Brands
                    </Text>
                  </View>
                  <View
                    style={[
                      dashBoardStyle.carouselBody,
                      {paddingHorizontal: 10},
                    ]}>
                    {this.state.bands.length === 0 ? (
                      <Text
                        style={[
                          common.mutedTextInItalic,
                          {textAlign: 'center'},
                        ]}>
                        No brands added!
                      </Text>
                    ) : (
                      <View>
                        <Carousel
                          layout={'default'}
                          data={
                            this.state.bands.length > 0
                              ? this.state.bands
                              : [
                                  {
                                    imagefilepath:
                                      this.state.bands.imagefilepath,
                                  },
                                ]
                          }
                          renderItem={this.renderCarouselBrand}
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
  showSquareBox: {
    backgroundColor: primarywhiteHexColor,
    width: 112,
    height: '100%',
    padding: 10,
    paddingTop: 15,
    borderRadius: 8,
  },
  showSquareBoxTextTop: {
    backgroundColor: mainBgColor,
    width: 24,
    height: 24,
    maxHeight: 80,
    borderRadius: 100,
    alignSelf: 'center',
  },
  showSquareBoxTextBottom: {
    marginTop: 5,
    textAlign: 'center',
    fontSize: 13,
    color: fontColor,
    fontWeight: 'bold',
  },
});
