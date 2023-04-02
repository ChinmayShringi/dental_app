import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Linking,
  Dimensions,
  Image,
  RefreshControl,
} from 'react-native';

import {
  common,
  badgeCss,
  commonLabelDescription,
  callLogCardLayout,
  commonCard,
  badgeColorCode,
  dashBoardStyle,
  commonShowCountCarousel,
} from '../../assets/style';

import Api from '../../provider/Api';
import Dataprovider from '../../provider/Dataprovider';
import Loader from '../../provider/Loader';

import NotFound from '../../components/NotFound';

import {
  successHexColor,
  primaryHexColor,
  primaryPurpleHexColor,
  seperator,
  mainBgColor,
  backgroundGrey,
  primaryBlueHexColor,
  fontColor,
  primarywarningHexColor,
  primarywhiteHexColor,
  textMutedColor,
  primaryOrangeHexColor,
} from '../../constants/themeColors';

import {MaterialIcons} from '@expo/vector-icons';
import Icon from 'react-native-vector-icons/FontAwesome';

import {
  Fab,
  Card,
  CardItem,
  Header,
  Body,
  Left,
  Right,
  Badge,
} from 'native-base';

import {skeletonPlaceholderProps} from '../../constants/defaultValues';
import SkeletonContent from 'react-native-skeleton-content';

import Carousel, {Pagination} from 'react-native-snap-carousel';

import {NavigationEvents} from 'react-navigation';
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

export default class PackagingDashboard extends Component {
  api = new Api();
  dataProvider = new Dataprovider();

  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      refreshing: false,
      transparentLoader: false,
      counts: [],
      assignedJobs: [],
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
      api: 'v_1/packagings/packaginguser/dashboard',
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
          assignedJobs: responseData.assignedjobs,
          counts: responseData.counts,
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

  renderAssignedJobs = ({item, index}) => {
    return (
      <View style={{width: '100%'}}>
        <Card style={callLogCardLayout.cardContainer}>
          <TouchableOpacity
            activeOpacity={0.5}
            onPress={() => {
              this.props.navigation.push('ProductionAssignedJobDetails', {
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
                  <View style={commonLabelDescription.listLabelContainer}>
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
                  <View style={commonLabelDescription.listLabelContainer}>
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
                  <View style={commonLabelDescription.listLabelContainer}>
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
                  <View style={commonLabelDescription.listLabelContainer}>
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
        height: 160,
        borderRadius: 8,
        marginTop: 15,
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
                    {backgroundColor: primarywarningHexColor},
                  ]}>
                  <View style={[dashBoardStyle.carouselHeader, {}]}>
                    <Left>
                      <Text
                        style={[
                          dashBoardStyle.carouselHeading,
                          {color: primarywhiteHexColor},
                        ]}>
                        ASSIGNED JOBS
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
                            'PackagingAssignedJobs',
                            {pageHeading: 'Assigned Jobs'},
                          );
                        }}>
                        View All
                      </Text>
                    </Right>
                  </View>
                  <View
                    style={[dashBoardStyle.carouselBody, {paddingBottom: 5}]}>
                    {this.state.assignedJobs.length === 0 ? (
                      <Text
                        style={[
                          common.mutedTextInItalic,
                          {color: primarywhiteHexColor, textAlign: 'center'},
                        ]}>
                        No assigned added!
                      </Text>
                    ) : (
                      <View style={{}}>
                        <Carousel
                          sliderWidth={carouselWidth - 40}
                          sliderHeight={carouselWidth}
                          itemWidth={carouselWidth - 100}
                          data={
                            this.state.assignedJobs.length > 0
                              ? this.state.assignedJobs
                              : []
                          }
                          renderItem={this.renderAssignedJobs}
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
