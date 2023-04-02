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
} from '../../../assets/style';

import Api from '../../../provider/Api';
import Dataprovider from '../../../provider/Dataprovider';
import Loader from '../../../provider/Loader';

import NotFound from '../../../components/NotFound';

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
} from '../../../constants/themeColors';

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

import {skeletonPlaceholderProps} from '../../../constants/defaultValues';
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

export default class CustomerDashboard extends Component {
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
      salesPersons: [],
      leads: [],
      orders: [],
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
      api: 'v_1/adminqcs/adminqchead/dashboard',
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
          unassignedJobs: responseData.unassignedjobs,
          ongoingJobs: responseData.ongoingjobs,
          employees: responseData.employees,
          salesPersons: responseData.salespersons,
          leads: responseData.leads,
          orders: responseData.orders,
          counts: responseData.counts,
          attendanceCounts: responseData.attendancecounts,
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
              this.props.navigation.push('ProductionOngoingJobDetails', {
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

  renderSalesPersons = ({item, index}) => {
    return (
      <View>
        <Card style={callLogCardLayout.cardContainer}>
          <TouchableOpacity
            activeOpacity={0.5}
            onPress={() => {
              this.props.navigation.push('AdminQCSalesPerson', {
                pageHeading: item.fullname,
                userId: item.userid,
              });
            }}>
            <CardItem>
              <Body>
                <Text style={[callLogCardLayout.bodyTitle, {paddingLeft: 5}]}>
                  {item.fullname}
                </Text>
                <View style={callLogCardLayout.textWithIconContainer}>
                  <Icon
                    name="circle"
                    size={12}
                    style={callLogCardLayout.textWithIconContainerIcon}
                  />
                  <View>
                    <Text
                      style={[callLogCardLayout.textWithIconContainerText]}
                      // onPress={() => Linking.openURL('mailto:' + item.email)}
                      // Google
                    >
                      {item.email}
                    </Text>
                  </View>
                </View>
                <View style={callLogCardLayout.textWithIconContainer}>
                  <Icon
                    name="circle"
                    size={12}
                    style={callLogCardLayout.textWithIconContainerIcon}
                  />
                  <View>
                    <Text
                      style={[callLogCardLayout.textWithIconContainerText]}
                      // onPress={() => Linking.openURL('tel:' + item.phoneno)}
                      // Google
                    >
                      {item.phoneno}
                    </Text>
                  </View>
                </View>
                <View style={callLogCardLayout.textWithIconContainer}>
                  <Icon
                    name="circle"
                    size={12}
                    style={callLogCardLayout.textWithIconContainerIcon}
                  />
                  <View>
                    <Text
                      numberOfLines={1}
                      ellipsizeMode={'tail'}
                      style={[callLogCardLayout.textWithIconContainerText, {}]}>
                      {item.displayfulllocation}
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

  renderLeads = ({item, index}) => {
    return (
      <View>
        <Card style={callLogCardLayout.cardContainer}>
          <TouchableOpacity
            activeOpacity={0.5}
            onPress={() => {
              this.props.navigation.push('AdminQCLead', {
                salesLeadId: item.salesleadid,
              });
            }}>
            <CardItem style={callLogCardLayout.cardBody}>
              <Body>
                <Text
                  style={[
                    callLogCardLayout.bodyTitle,
                    {color: primaryHexColor},
                  ]}>
                  {item.companyname}
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
                    {item.salespersonname !== null &&
                    item.salespersonname !== '' ? (
                      <Text style={commonLabelDescription.labelValue}>
                        {item.salespersonname}
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
                <View style={commonLabelDescription.listContainer}>
                  <View
                    style={[
                      commonLabelDescription.listLabelContainer,
                      styles.labelContainer,
                    ]}>
                    <Text style={commonLabelDescription.labelText}>Type</Text>
                  </View>
                  <View style={commonLabelDescription.listSeperator}>
                    <Text style={commonLabelDescription.labelText}>:</Text>
                  </View>
                  <View style={styles.descriptionContainer}>
                    <Text style={commonLabelDescription.labelValue}>
                      {item.typetext}
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
                      Scheduled On
                    </Text>
                  </View>
                  <View style={commonLabelDescription.listSeperator}>
                    <Text style={commonLabelDescription.labelText}>:</Text>
                  </View>
                  <View style={styles.descriptionContainer}>
                    <Text style={commonLabelDescription.labelValue}>
                      {item.leadondisplaydate}
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
                      Contact Person
                    </Text>
                  </View>
                  <View style={commonLabelDescription.listSeperator}>
                    <Text style={commonLabelDescription.labelText}>:</Text>
                  </View>
                  <View style={styles.descriptionContainer}>
                    <Text style={commonLabelDescription.labelValue}>
                      {item.contactperson}
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
                      Phone No.
                    </Text>
                  </View>
                  <View style={commonLabelDescription.listSeperator}>
                    <Text style={commonLabelDescription.labelText}>:</Text>
                  </View>
                  <View style={styles.descriptionContainer}>
                    <Text
                      // style={[common.linkText]}
                      style={[
                        commonLabelDescription.labelValue,
                        common.linkText,
                      ]}
                      // onPress={() => Linking.openURL('tel:' + item.phoneno)}
                      // Google
                    >
                      {item.phoneno}
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
                  <View style={[styles.descriptionContainer]}>
                    <Text
                      style={[
                        commonLabelDescription.labelValue,
                        badgeColorCode(item.statustextcolor),
                      ]}>
                      {item.statustext}
                    </Text>
                    {item.status === 4 ? (
                      <Text style={commonLabelDescription.labelValue}>
                        On{' '}
                        <Text style={common.fontBold}>
                          {item.followedupondisplaydate}
                        </Text>
                      </Text>
                    ) : null}
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
        marginTop: 10,
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
                      marginBottom: 15,
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
                            'AdminQCUnAssignedJobs',
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
                          this.props.navigation.navigate('AdminQCOngoingJobs', {
                            pageHeading: 'Ongoing Jobs',
                          });
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
                          this.props.navigation.navigate('AdminQCEmployees', {
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
                        SALES PERSONS
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
                            'AdminQCSalesPersons',
                            {pageHeading: 'Sales Persons'},
                          );
                        }}>
                        View All
                      </Text>
                    </Right>
                  </View>
                  <View
                    style={[dashBoardStyle.carouselBody, {paddingBottom: 5}]}>
                    {this.state.salesPersons.length === 0 ? (
                      <Text
                        style={[
                          common.mutedTextInItalic,
                          {color: primarywhiteHexColor, textAlign: 'center'},
                        ]}>
                        No sales persons added!
                      </Text>
                    ) : (
                      <View>
                        <Carousel
                          sliderWidth={carouselWidth - 40}
                          sliderHeight={carouselWidth}
                          // firstItem={2}
                          itemWidth={carouselWidth - 100}
                          data={
                            this.state.salesPersons.length > 0
                              ? this.state.salesPersons
                              : []
                          }
                          renderItem={this.renderSalesPersons}
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
                        LEADS
                      </Text>
                    </Left>
                    <Right>
                      <Text
                        style={[
                          dashBoardStyle.carouselHeadingLink,
                          {color: primarywhiteHexColor},
                        ]}
                        onPress={() => {
                          this.props.navigation.navigate('AdminQCLeads', {
                            pageHeading: 'Leads',
                          });
                        }}>
                        View All
                      </Text>
                    </Right>
                  </View>
                  <View
                    style={[dashBoardStyle.carouselBody, {paddingBottom: 5}]}>
                    {this.state.leads.length === 0 ? (
                      <Text
                        style={[
                          common.mutedTextInItalic,
                          {color: primarywhiteHexColor, textAlign: 'center'},
                        ]}>
                        No leads added!
                      </Text>
                    ) : (
                      <View>
                        <Carousel
                          sliderWidth={carouselWidth - 40}
                          sliderHeight={carouselWidth}
                          // firstItem={2}
                          itemWidth={carouselWidth - 100}
                          data={
                            this.state.leads.length > 0 ? this.state.leads : []
                          }
                          renderItem={this.renderLeads}
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
                          this.props.navigation.navigate('AdminQCOrders', {
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
