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
  callLogCardLayout,
  common,
  commonCard,
  dashBoardStyle,
} from '../../assets/style';

import Api from '../../provider/Api';
import Dataprovider from '../../provider/Dataprovider';

import NotFound from '../../components/NotFound';

import {
  backgroundGrey,
  fontColor,
  mainBgColor,
  primaryHexColor,
  primarywhiteHexColor,
  seperator,
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
// BRAND CAROUSEL
const {width: viewportWidth, height: viewportHeight} = Dimensions.get('window');
const SLIDE_WIDTH = Math.round(viewportWidth / 2.6);
const ITEM_HORIZONTAL_MARGIN = 0;
const ITEM_WIDTH = SLIDE_WIDTH + ITEM_HORIZONTAL_MARGIN * 2;
const SLIDER_WIDTH = viewportWidth;

const CALLLOG_ITEM_WIDTH = SLIDE_WIDTH + ITEM_HORIZONTAL_MARGIN * 2 - 30;
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
      customers: [],
      bands: [],
      products: [],
      salesRepresentative: [],
      activeCarouselIndex: 0,
      showBoxName: [
        {
          label: 'PICKUP REQUEST',
          pageUrl: 'CollectionCalls',
          pageHeading: 'Pickup Request',
        },
        {
          label: 'DELIVERY CALLS',
          pageUrl: 'DeliveryCalls',
          pageHeading: 'Delivery Calls',
        },
        {
          label: 'COMPLAINTS',
          pageUrl: 'Complaints',
          pageHeading: 'Complaints',
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
      api: 'v_1/sales/salesman/dashboard',
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
          products: responseData.products,
          customers: responseData.customers,
          bands: responseData.brands,
          salesRepresentative: responseData.salesrepresentative,
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

  renderSalesRepresentative = ({item, index}) => {
    return (
      <View style={{width: '100%'}}>
        <View
          style={[
            dashBoardStyle.attendanceCircle,
            {backgroundColor: item.backgroundcolor},
          ]}>
          <Text
            style={[
              dashBoardStyle.attendanceShowNo,
              {color: primarywhiteHexColor},
            ]}>
            {item.value}
          </Text>
        </View>
        <Text
          style={[
            dashBoardStyle.attendanceShowText,
            {color: fontColor, width: 80},
          ]}>
          {item.label}
        </Text>
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
              elevation: 4,
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

  renderCarouselItem = ({item, index}) => {
    return (
      <View style={{width: '100%'}}>
        <TouchableOpacity
          style={{marginRight: 5}}
          onPress={() => {
            this.props.navigation.navigate(item.pageUrl, {
              pageHeading: item.pageHeading,
            });
          }}>
          <View style={styles.showSquareBox}>
            <Text style={styles.showSquareBoxTextTop}></Text>
            <Text style={styles.showSquareBoxTextBottom}>{item.label}</Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  };

  renderCarouselBrand = ({item}) => {
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
        height: 144,
        borderRadius: 8,
        marginTop: 15,
        marginBottom: 0,
        marginLeft: 20,
        marginRight: 20,
      },
      {
        width: screenWidth - 40,
        height: 164,
        borderRadius: 8,
        marginTop: 5,
        marginLeft: 20,
      },
      {
        width: CALLLOG_ITEM_WIDTH,
        height: 90,
        borderRadius: 8,
        marginTop: 18,
        marginLeft: 15,
      },
      {
        width: CALLLOG_ITEM_WIDTH,
        height: 90,
        borderRadius: 8,
        marginTop: -90,
        marginLeft: CALLLOG_ITEM_WIDTH + 20,
      },
      {
        width: CALLLOG_ITEM_WIDTH - 10,
        height: 90,
        borderRadius: 8,
        marginTop: -90,
        marginLeft: CALLLOG_ITEM_WIDTH + CALLLOG_ITEM_WIDTH + 26,
      },
      {
        width: screenWidth - 40,
        height: 170,
        borderRadius: 8,
        marginTop: 5,
        marginLeft: 20,
      },
      {
        width: screenWidth - 40,
        height: 170,
        borderRadius: 8,
        marginTop: 5,
        marginLeft: 20,
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
                <View>
                  <View
                    style={[
                      dashBoardStyle.carouselHeader,
                      {marginTop: 0, marginBottom: 0},
                    ]}>
                    <Left>
                      <Text
                        style={dashBoardStyle.carouselWithoutCardDataHeading}>
                        Customers
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
                          itemWidth={carouselWidth - 80}
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
                    {
                      backgroundColor: primarywhiteHexColor,
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
                          this.props.navigation.navigate('SalesBrands', {});
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
                  style={[dashBoardStyle.carouselWithoutCard, {marginTop: 0}]}>
                  <Carousel
                    data={this.state.showBoxName}
                    renderItem={this.renderCarouselItem}
                    sliderWidth={SLIDER_WIDTH}
                    itemWidth={ITEM_WIDTH - 30}
                    activeSlideAlignment={'start'}
                    inactiveSlideScale={1}
                    inactiveSlideOpacity={1}
                  />
                </View>
                <View
                  style={[
                    dashBoardStyle.attendanceCard,
                    {backgroundColor: primarywhiteHexColor},
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
                      {paddingBottom: 5, paddingHorizontal: 20},
                    ]}>
                    <View>
                      <Carousel
                        sliderWidth={SLIDER_WIDTH - 80}
                        sliderHeight={carouselWidth}
                        itemWidth={115}
                        data={
                          this.state.salesRepresentative.length > 0
                            ? this.state.salesRepresentative
                            : []
                        }
                        renderItem={this.renderSalesRepresentative}
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
                    {backgroundColor: primarywhiteHexColor, paddingBottom: 12},
                  ]}>
                  <View style={[dashBoardStyle.carouselHeader, {}]}>
                    <Text
                      style={[
                        dashBoardStyle.carouselHeading,
                        {color: fontColor},
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
    height: 85,
    padding: 10,
    paddingTop: 15,
    borderRadius: 10,
    borderColor: '#e6e7e8',
    borderWidth: 1,
  },
  showSquareBoxTextTop: {
    backgroundColor: mainBgColor,
    width: 24,
    height: 24,
    borderRadius: 100,
    alignSelf: 'center',
    justifyContent: 'center',
  },
  showSquareBoxTextBottom: {
    width: 100,
    marginTop: 5,
    marginBottom: 20,
    justifyContent: 'center',
    alignSelf: 'center',
    textAlign: 'center',
    fontSize: 13,
    color: fontColor,
    fontWeight: 'bold',
  },
});
