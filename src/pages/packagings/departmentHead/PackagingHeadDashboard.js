import React, {Component} from 'react';
import {
  Dimensions,
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
  commonLabelDescription,
  commonShowCountCarousel,
  dashBoardStyle,
} from '../../../assets/style';

import Api from '../../../provider/Api';
import Dataprovider from '../../../provider/Dataprovider';

import NotFound from '../../../components/NotFound';

import {
  backgroundGrey,
  fontColor,
  primaryBlueHexColor,
  primaryHexColor,
  primaryPurpleHexColor,
  primarywarningHexColor,
  primarywhiteHexColor,
  successHexColor,
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
const imageHeight = Math.round(((carouselWidth - 10) * 10) / 16);
const imageWidth = carouselWidth;
// BRAND CAROUSEL
const {width: viewportWidth, height: viewportHeight} = Dimensions.get('window');
const SLIDE_WIDTH = Math.round(viewportWidth / 2.6);
const ITEM_HORIZONTAL_MARGIN = 0;
const ITEM_WIDTH = SLIDE_WIDTH + ITEM_HORIZONTAL_MARGIN * 2;
const SLIDER_WIDTH = viewportWidth;

const CALLLOG_ITEM_WIDTH = SLIDE_WIDTH + ITEM_HORIZONTAL_MARGIN * 2 - 30;
const BRAND_ITEM_WIDTH = SLIDE_WIDTH + ITEM_HORIZONTAL_MARGIN * 2 - 80;

const cardWidth = (appScreenWidth.width - 38) / 2;
const cardHeight = (appScreenWidth.width - 75) / 2;

export default class PackagingHeadDashboard extends Component {
  api = new Api();
  dataProvider = new Dataprovider();

  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      refreshing: false,
      transparentLoader: false,
      counts: [],
      attendanceCounts: [],
      unassignedJobs: [],
      ongoingJobs: [],
      employees: [],
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
      api: 'v_1/packagings/packaginghead/dashboard',
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
          unassignedJobs: responseData.unassignedjobs,
          ongoingJobs: responseData.ongoingjobs,
          employees: responseData.employees,
          counts: responseData.counts,
          attendanceCounts: responseData.attendancecounts,
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

  renderCounts = ({item, index}) => {
    return (
      <View style={{width: '100%'}}>
        <TouchableOpacity
          style={{marginRight: 5}}
          onPress={() => {
            this.props.navigation.navigate(item.linkname, {
              pageHeading: item.lable,
            });
          }}>
          <View style={commonShowCountCarousel.showSquareBox}>
            <Text style={commonShowCountCarousel.showSquareBoxTextTop}>
              {item.count}
            </Text>
            <Text style={commonShowCountCarousel.showSquareBoxTextBottom}>
              {item.lable}
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  };

  renderUnassignedJobs = ({item, index}) => {
    return (
      <View style={{width: '100%'}}>
        <Card style={callLogCardLayout.cardContainer}>
          <TouchableOpacity
            activeOpacity={0.5}
            onPress={() => {
              this.props.navigation.push('ProductionUnAssignedJobDetails', {
                productionProcessId: item.productionprocessid,
                orderDetailId: item.orderdetailid,
                isFromQrCode: false,
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
                    <Text style={commonLabelDescription.labelText}>
                      Task ID
                    </Text>
                  </View>
                  <View style={commonLabelDescription.listSeperator}>
                    <Text style={commonLabelDescription.labelText}>:</Text>
                  </View>
                  <View style={styles.descriptionContainer}>
                    <Text style={commonLabelDescription.labelValue}>
                      #{item.productionprocessid}
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
                      Restoration Type
                    </Text>
                  </View>
                  <View style={commonLabelDescription.listSeperator}>
                    <Text style={commonLabelDescription.labelText}>:</Text>
                  </View>
                  <View style={styles.descriptionContainer}>
                    <View>
                      {item.orderdetail.categoryid !== null &&
                      item.orderdetail.categoryid !== '' ? (
                        <Text style={commonLabelDescription.labelValue}>
                          {item.orderdetail.categoryname}
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

  renderOngoingJobs = ({item, index}) => {
    return (
      <View style={{width: '100%'}}>
        <Card style={callLogCardLayout.cardContainer}>
          <TouchableOpacity
            activeOpacity={0.5}
            onPress={() => {
              this.props.navigation.push('ProductionUnAssignedJobDetails', {
                productionProcessId: item.productionprocessid,
                orderDetailId: item.orderdetailid,
                isFromQrCode: false,
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
                    <Text style={commonLabelDescription.labelText}>
                      Task ID
                    </Text>
                  </View>
                  <View style={commonLabelDescription.listSeperator}>
                    <Text style={commonLabelDescription.labelText}>:</Text>
                  </View>
                  <View style={styles.descriptionContainer}>
                    <Text style={commonLabelDescription.labelValue}>
                      #{item.productionprocessid}
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
                      Restoration Type
                    </Text>
                  </View>
                  <View style={commonLabelDescription.listSeperator}>
                    <Text style={commonLabelDescription.labelText}>:</Text>
                  </View>
                  <View style={styles.descriptionContainer}>
                    <View>
                      {item.orderdetail.categoryid !== null &&
                      item.orderdetail.categoryid !== '' ? (
                        <Text style={commonLabelDescription.labelValue}>
                          {item.orderdetail.categoryname}
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

  renderEmployees = ({item, index}) => {
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
              this.props.navigation.push('ProductionEmployeeDetails', {
                pageHeading: item.fullname,
                userId: item.userid,
              });
            }}>
            <CardItem style={[callLogCardLayout.cardBody, {}]}>
              <Body>
                <Text
                  style={[
                    callLogCardLayout.bodyTitle,
                    {color: primaryHexColor},
                  ]}>
                  {item.fullname}
                </Text>
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
                    {item.phoneno !== null && item.phoneno !== '' ? (
                      <Text
                        style={[callLogCardLayout.textWithIconContainerText]}
                        // onPress={() => Linking.openURL('tel:' + item.phoneno)}
                        // Google
                      >
                        {item.phoneno}
                      </Text>
                    ) : (
                      <Text
                        style={[
                          callLogCardLayout.textWithIconContainerText,
                          common.mutedTextInItalic,
                        ]}>
                        NA
                      </Text>
                    )}
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

  render() {
    const skeletonLayout = [
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
        width: screenWidth - 40,
        height: 140,
        borderRadius: 8,
        marginTop: 10,
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
        height: 160,
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
                  style={{
                    flex: 1,
                    margin: 12,
                    padding: 5,
                    paddingTop: 0,
                    paddingBottom: 0,
                    marginTop: 15,
                    marginBottom: 10,
                  }}>
                  {this.state.counts.length === 0 ? (
                    <Text
                      style={[
                        common.mutedTextInItalic,
                        {color: primarywhiteHexColor, textAlign: 'center'},
                      ]}>
                      No counts data added!
                    </Text>
                  ) : (
                    <View style={{}}>
                      <Carousel
                        data={
                          this.state.counts.length > 0 ? this.state.counts : []
                        }
                        renderItem={this.renderCounts}
                        sliderWidth={SLIDER_WIDTH}
                        itemWidth={CALLLOG_ITEM_WIDTH}
                        activeSlideAlignment={'start'}
                        inactiveSlideScale={1}
                        inactiveSlideOpacity={1}
                      />
                    </View>
                  )}
                </View>
                <View
                  style={[
                    dashBoardStyle.attendanceCard,
                    {
                      backgroundColor: primarywhiteHexColor,
                      marginTop: 5,
                      marginBottom: 10,
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
                      ATTENDANCES
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
                          {this.state.attendanceCounts.totalpresentvalue}
                        </Text>
                      </View>
                      <Text
                        style={[
                          dashBoardStyle.attendanceShowText,
                          {color: fontColor, width: 80},
                        ]}>
                        {this.state.attendanceCounts.totalpresentlabel}
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
                          {this.state.attendanceCounts.totalonleavevalue}
                        </Text>
                      </View>
                      <Text
                        style={[
                          dashBoardStyle.attendanceShowText,
                          {color: fontColor, width: 80},
                        ]}>
                        {this.state.attendanceCounts.totalonleavelabel}
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
                          {this.state.attendanceCounts.totalabsentvalue}
                        </Text>
                      </View>
                      <Text
                        style={[
                          dashBoardStyle.attendanceShowText,
                          {color: fontColor, width: 80},
                        ]}>
                        {this.state.attendanceCounts.totalabsentlabel}
                      </Text>
                    </View>
                  </View>
                </View>
                <View
                  style={[
                    dashBoardStyle.attendanceCard,
                    {backgroundColor: primaryPurpleHexColor},
                  ]}>
                  <View style={[dashBoardStyle.carouselHeader, {}]}>
                    <Left>
                      <Text
                        style={[
                          dashBoardStyle.carouselHeading,
                          {color: primarywhiteHexColor},
                        ]}>
                        UNASSIGNED JOBS
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
                            'PackagingUnAssignedJobs',
                            {pageHeading: 'Unassigned Jobs'},
                          );
                        }}>
                        View All
                      </Text>
                    </Right>
                  </View>
                  <View
                    style={[dashBoardStyle.carouselBody, {paddingBottom: 5}]}>
                    {this.state.unassignedJobs.length === 0 ? (
                      <Text
                        style={[
                          common.mutedTextInItalic,
                          {color: primarywhiteHexColor, textAlign: 'center'},
                        ]}>
                        No unassigned added!
                      </Text>
                    ) : (
                      <View style={{}}>
                        <Carousel
                          sliderWidth={carouselWidth - 40}
                          sliderHeight={carouselWidth}
                          itemWidth={carouselWidth - 100}
                          data={
                            this.state.unassignedJobs.length > 0
                              ? this.state.unassignedJobs
                              : []
                          }
                          renderItem={this.renderUnassignedJobs}
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
                  <View style={[dashBoardStyle.carouselHeader, {}]}>
                    <Left>
                      <Text
                        style={[
                          dashBoardStyle.carouselHeading,
                          {color: primarywhiteHexColor},
                        ]}>
                        ONGOING JOBS
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
                            'PackagingOngoingJobs',
                            {pageHeading: 'Ongoing Jobs'},
                          );
                        }}>
                        View All
                      </Text>
                    </Right>
                  </View>
                  <View
                    style={[dashBoardStyle.carouselBody, {paddingBottom: 5}]}>
                    {this.state.ongoingJobs.length === 0 ? (
                      <Text
                        style={[
                          common.mutedTextInItalic,
                          {color: primarywhiteHexColor, textAlign: 'center'},
                        ]}>
                        No ongoing jobs added!
                      </Text>
                    ) : (
                      <View style={{}}>
                        <Carousel
                          sliderWidth={carouselWidth - 40}
                          sliderHeight={carouselWidth}
                          itemWidth={carouselWidth - 100}
                          data={
                            this.state.ongoingJobs.length > 0
                              ? this.state.ongoingJobs
                              : []
                          }
                          renderItem={this.renderOngoingJobs}
                          hasParallaxImages={true}
                          inactiveSlideOpacity={1}
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
                        EMPLOYEES
                      </Text>
                    </Left>
                    <Right>
                      <Text
                        style={dashBoardStyle.carouselWithoutCardData}
                        onPress={() => {
                          this.props.navigation.navigate('PackagingEmployees', {
                            pageHeading: 'Employees',
                          });
                        }}>
                        View All
                      </Text>
                    </Right>
                  </View>
                  <View
                    style={[dashBoardStyle.carouselBody, {marginBottom: 4}]}>
                    {this.state.employees.length === 0 ? (
                      <Text
                        style={[
                          common.mutedTextInItalic,
                          {textAlign: 'center'},
                        ]}>
                        No employees added!
                      </Text>
                    ) : (
                      <View>
                        <Carousel
                          sliderWidth={carouselWidth}
                          sliderHeight={carouselWidth}
                          itemWidth={carouselWidth - 70}
                          data={
                            this.state.employees.length > 0
                              ? this.state.employees
                              : []
                          }
                          renderItem={this.renderEmployees}
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
