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
  primaryHexColor,
  primaryOrangeHexColor,
  primarywarningHexColor,
  primarywhiteHexColor,
  seperator,
} from '../../constants/themeColors';

import {Body, Card, CardItem, Left, Right} from 'native-base';

import {skeletonPlaceholderProps} from '../../constants/defaultValues';

import Carousel, {Pagination} from 'react-native-snap-carousel';
import SkeletonContent from '../../components/SkeletonContent';

// BANER CAROUSEL
const screenWidth = Dimensions.get('window').width;
const appScreenWidth = Dimensions.get('window');
const carouselWidth = appScreenWidth.width;
// BRAND CAROUSEL
const {width: viewportWidth, height: viewportHeight} = Dimensions.get('window');
const SLIDE_WIDTH = Math.round(viewportWidth / 2.6);
const ITEM_HORIZONTAL_MARGIN = 0;
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
      carouselImages: [],
      bands: [],
      pickupCalls: [],
      complaints: [],
      products: [],
      activeCarouselIndex: 0,
      showBoxName: [
        {
          firstTitle: 'MY PICKUP',
          secondTitle: 'REQUEST',
          pageUrl: 'CustomerCollectionCalls',
          pageHeading: 'Pickup Request',
        },
        {
          firstTitle: 'MY',
          secondTitle: 'COMPLAINTS',
          pageUrl: 'CustomerComplaints',
          pageHeading: 'My Complaints',
        },
        {
          firstTitle: 'MY',
          secondTitle: 'ORDERS',
          pageUrl: 'CustomerOrders',
          pageHeading: 'My Orders',
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
      api: 'v_1/customers/dashboard',
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
          carouselImages: responseData.dashborad_images,
          bands: responseData.brands,
          pickupCalls: responseData.pickupcalls,
          complaints: responseData.complaints,
          products: responseData.products,
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

  renderCarouselImage = ({item, index}) => {
    return (
      <View
        resizeMode="contain"
        style={[commonCard.imageContainer, {width: '100%'}]}>
        <Image
          source={{uri: item.imagefilepath}}
          style={{
            height: 180,
            // height: imageHeight - 60,
            flex: 1,
          }}
        />
      </View>
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
            <Text style={styles.showSquareBoxTextTop}>{item.firstTitle}</Text>
            <Text style={styles.showSquareBoxTextBottom}>
              {item.secondTitle}
            </Text>
          </View>
        </TouchableOpacity>
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

  renderComplaintDetails = ({item, index}) => {
    return (
      <View style={{width: '100%'}}>
        <Card style={callLogCardLayout.cardContainer}>
          <TouchableOpacity
            activeOpacity={0.5}
            onPress={() => {
              this.props.navigation.push('CustomerComplaintForm', {
                pageHeading: 'Edit Complaint',
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
                    <Text style={commonLabelDescription.labelText}>Order</Text>
                  </View>
                  <View style={commonLabelDescription.listSeperator}>
                    <Text style={commonLabelDescription.labelText}>:</Text>
                  </View>
                  <View style={styles.descriptionContainer}>
                    <Text style={commonLabelDescription.labelValue}>
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

  render() {
    const skeletonLayout = [
      {
        width: screenWidth,
        height: 180,
        borderRadius: 8,
        marginBottom: 5,
      },
      {
        width: CALLLOG_ITEM_WIDTH,
        height: 80,
        borderRadius: 8,
        marginTop: 18,
        marginLeft: 15,
      },
      {
        width: CALLLOG_ITEM_WIDTH,
        height: 80,
        borderRadius: 8,
        marginTop: -80,
        marginLeft: CALLLOG_ITEM_WIDTH + 20,
      },
      {
        width: CALLLOG_ITEM_WIDTH - 10,
        height: 80,
        borderRadius: 8,
        marginTop: -80,
        marginLeft: CALLLOG_ITEM_WIDTH + CALLLOG_ITEM_WIDTH + 26,
      },
      {
        width: screenWidth - 36,
        height: 110,
        borderRadius: 8,
        marginTop: 12,
        marginLeft: 18,
      },
      {
        width: screenWidth - 36,
        height: 200,
        borderRadius: 8,
        marginTop: 12,
        marginLeft: 18,
      },
      {
        width: screenWidth - 36,
        height: 200,
        borderRadius: 8,
        marginTop: 12,
        marginLeft: 18,
      },
    ];

    return (
      <View style={{flex: 1, backgroundColor: backgroundGrey}}>
        <View
          style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: 15,
            backgroundColor: backgroundGrey,
          }}>
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
                    {this.state.carouselImages.length === 0 ? null : (
                      <View style={{marginBottom: 10}}>
                        <Carousel
                          layout={'default'}
                          data={
                            this.state.carouselImages.length > 0
                              ? this.state.carouselImages
                              : [
                                  {
                                    imagefilepath:
                                      this.state.carouselImages.imagefilepath,
                                  },
                                ]
                          }
                          renderItem={this.renderCarouselImage}
                          sliderWidth={carouselWidth}
                          itemWidth={carouselWidth}
                          onSnapToItem={index =>
                            this.setState({activeCarouselIndex: index})
                          }
                        />
                        <Pagination
                          dotsLength={this.state.carouselImages.length}
                          activeDotIndex={this.state.activeCarouselIndex}
                          containerStyle={{
                            backgroundColor: 'transparent',
                            paddingTop: 8,
                            paddingBottom: 0,
                            paddingLeft: 8,
                            paddingRight: 8,
                          }}
                          dotContainerStyle={{
                            marginHorizontal: 1,
                          }}
                          dotStyle={{
                            width: 5,
                            height: 5,
                            borderRadius: 5,
                            marginHorizontal: 0,
                            backgroundColor: fontColor,
                          }}
                          inactiveDotStyle={{}}
                          inactiveDotOpacity={0.4}
                          inactiveDotScale={0.6}
                        />
                      </View>
                    )}
                  </View>
                  <View
                    style={{
                      flex: 1,
                      // backgroundColor: backgroundGrey,
                      margin: 12,
                      padding: 5,
                      paddingTop: 0,
                      paddingBottom: 0,
                      marginTop: 0,
                      marginBottom: 10,
                    }}>
                    <Carousel
                      data={this.state.showBoxName}
                      renderItem={this.renderCarouselItem}
                      sliderWidth={SLIDER_WIDTH}
                      itemWidth={CALLLOG_ITEM_WIDTH}
                      activeSlideAlignment={'start'}
                      inactiveSlideScale={1}
                      inactiveSlideOpacity={1}
                      // loop={true}
                    />
                  </View>
                  <View
                    style={[
                      dashBoardStyle.attendanceCard,
                      {
                        backgroundColor: primarywhiteHexColor,
                        paddingBottom: 12,
                      },
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
                  <View
                    style={[
                      dashBoardStyle.attendanceCard,
                      {backgroundColor: primarywarningHexColor},
                    ]}>
                    <View style={[dashBoardStyle.carouselHeader, {}]}>
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
                              'CustomerCollectionCalls',
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
                          No pickup requests added!
                        </Text>
                      ) : (
                        <View style={{}}>
                          <Carousel
                            sliderWidth={carouselWidth - 40}
                            sliderHeight={carouselWidth}
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
                      {backgroundColor: primaryOrangeHexColor},
                    ]}>
                    <View style={[dashBoardStyle.carouselHeader, {}]}>
                      <Left>
                        <Text
                          style={[
                            dashBoardStyle.carouselHeading,
                            {color: primarywhiteHexColor},
                          ]}>
                          Complaints
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
                              'CustomerComplaints',
                              {pageHeading: 'My Complaints'},
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
                        <View style={{}}>
                          <Carousel
                            sliderWidth={carouselWidth - 40}
                            sliderHeight={carouselWidth}
                            itemWidth={carouselWidth - 100}
                            data={
                              this.state.complaints.length > 0
                                ? this.state.complaints
                                : []
                            }
                            renderItem={this.renderComplaintDetails}
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
                      {backgroundColor: primarywhiteHexColor},
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
                            this.props.navigation.navigate(
                              'CustomerBrands',
                              {},
                            );
                          }}>
                          View All
                        </Text>
                      </Right>
                    </View>
                    <View
                      style={[
                        dashBoardStyle.carouselBody,
                        {paddingBottom: 15, paddingHorizontal: 20},
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
                </View>
              ) : (
                <NotFound onPress={this.reloadPageData} />
              )}
            </ScrollView>
          </SkeletonContent>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  showSquareBox: {
    backgroundColor: primaryHexColor,
    width: '100%',
    height: 80,
    borderRadius: 10,
  },
  showSquareBoxTextTop: {
    marginTop: 18,
    textAlign: 'center',
    fontSize: 16,
    color: '#fff',
    fontWeight: 'normal',
  },
  showSquareBoxTextBottom: {
    marginTop: -5,
    marginBottom: 20,
    textAlign: 'center',
    fontSize: 16,
    color: '#fff',
    fontWeight: 'normal',
  },
  labelContainer: {
    width: 80,
  },
  descriptionContainer: {
    width: screenWidth - 230,
  },
});
