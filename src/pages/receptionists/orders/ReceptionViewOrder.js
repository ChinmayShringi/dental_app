import React, {Component} from 'react';
import {
  Alert,
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
  common,
  commonCard,
  commonLabelDescription,
} from '../../../assets/style';

import Api from '../../../provider/Api';
import Dataprovider from '../../../provider/Dataprovider';
import Loader from '../../../provider/Loader';

import NotFound from '../../../components/NotFound';

import {
  mainBgColor,
  primaryBlueHexColor,
  primaryHexColor,
} from '../../../constants/themeColors';

import Icon from 'react-native-vector-icons/FontAwesome';

import {Button} from 'native-base';

import SkeletonContent from 'react-native-skeleton-content';
import {skeletonPlaceholderProps} from '../../../constants/defaultValues';

import Carousel, {Pagination} from 'react-native-snap-carousel';

const screenWidth = Dimensions.get('window').width;
const appScreenWidth = Dimensions.get('window');
const carouselWidth = appScreenWidth.width - 30;
const imageHeight = Math.round(((carouselWidth - 10) * 10) / 16);
const imageWidth = carouselWidth - 34;

export default class ReceptionViewOrder extends Component {
  api = new Api();
  dataProvider = new Dataprovider();

  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      refreshing: false,
      transparentLoader: false,
      salesLeadId: 1,
      saleslead: null,
      orderId:
        typeof this.props.navigation
          .dangerouslyGetParent()
          .getParam('orderId') !== 'undefined'
          ? parseInt(
              this.props.navigation.dangerouslyGetParent().getParam('orderId'),
            )
          : 0,
      order: null,
      orderdetails: [],
      orderimages: [],
      orderedtoothnumbers: [],
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
    let formData = new FormData();
    formData.append('orderid', this.state.orderId);

    let options = {
      api: 'v_1/receptionists/orders/view',
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

      if (data.status_code === 200) {
        let responseData = data.response.data;

        this.setState({
          order: responseData.order,
          orderdetails: responseData.orderdetails,
          orderimages: responseData.orderimages,
          orderedtoothnumbers: responseData.orderedtoothnumbers,
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

  renderCarouselItem = ({item, index}) => {
    return (
      <View style={[commonCard.imageContainer, {width: '100%'}]}>
        <Image
          source={{uri: item.imagefilepath}}
          style={{
            height: imageHeight,
            width: '100%',
            flex: 1,
            borderRadius: 8,
          }}
          // resizeMode='cover'
          resizeMode="contain"
        />
      </View>
    );
  };

  sendToProduction = () => {
    Alert.alert(
      'Confirmation Required',
      "Are sure you've verified the parcel and want to send parcel to the supervisor for further process?",
      [
        {
          text: 'Cancel',
          onPress: () => {
            console.log('Cancel CLicked');
          },
          style: 'cancel',
        },
        {
          text: 'Sure, Send to Supervisor',
          onPress: () => {
            this.setState({transparentLoader: true});

            let formData = new FormData();
            formData.append('orderid', this.state.orderId);

            let options = {
              api: 'v_1/receptionists/orders/send-to-production',
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
                  order: responseData.order,
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
          },
        },
      ],
      {cancelable: false},
    );
  };

  render() {
    const skeletonLayout = [
      {
        marginLeft: screenWidth - 55,
        width: 24,
        height: 20,
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
      {
        width: 260,
        height: 16,
        borderRadius: 4,
        marginTop: 0,
        marginBottom: 5,
      },
      {
        width: 200,
        height: 16,
        borderRadius: 4,
        marginTop: 0,
        marginBottom: 5,
      },
      {
        width: screenWidth - 50,
        height: 1,
        marginTop: 15,
        marginBottom: 20,
      },
      {
        width: 150,
        height: 26,
        borderRadius: 4,
        marginBottom: 15,
      },
      {
        width: carouselWidth,
        height: imageHeight,
        borderRadius: 8,
      },
    ];

    return (
      <View style={{flex: 1, backgroundColor: mainBgColor}}>
        <View
          style={[common.cardContainer, {overflow: 'hidden', paddingTop: 0}]}>
          <Loader loading={this.state.transparentLoader} />
          <ScrollView
            contentContainerStyle={{flexGrow: 1}}
            refreshControl={
              <RefreshControl
                refreshing={this.state.refreshing}
                onRefresh={this.onRefreshPageData}
              />
            }>
            <View
              style={[
                common.card,
                {paddingHorizontal: 20, margin: 0, borderRadius: 0},
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
                {this.state.order !== null && !this.state.loading ? (
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
                              this.props.navigation.push('ReceptionOrderForm', {
                                pageHeading: 'Edit Order',
                                orderId: this.state.orderId,
                              });
                            }}
                            style={{}}>
                            <Text style={{color: primaryHexColor}}>
                              <Icon name="pencil-square-o" size={20} />
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
                            #{this.state.order.orderid}
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
                            Pickup Request ID
                          </Text>
                        </View>
                        <View style={commonLabelDescription.listSeperator}>
                          <Text style={commonLabelDescription.labelText}>
                            :
                          </Text>
                        </View>
                        <View style={styles.descriptionContainer}>
                          <Text style={commonLabelDescription.labelValue}>
                            #{this.state.order.calllogid}
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
                            Customer
                          </Text>
                        </View>
                        <View style={commonLabelDescription.listSeperator}>
                          <Text style={commonLabelDescription.labelText}>
                            :
                          </Text>
                        </View>
                        <View style={styles.descriptionContainer}>
                          <TouchableOpacity
                            onPress={() => {
                              this.props.navigation.push(
                                'ReceptionCustomerDetails',
                                {
                                  pageHeading: this.state.order.customername,
                                  customerId: this.state.order.customerid,
                                },
                              );
                            }}>
                            <Text
                              style={[
                                commonLabelDescription.labelValue,
                                common.linkText,
                                {fontWeight: 'bold'},
                              ]}>
                              {this.state.order.customername}
                            </Text>
                          </TouchableOpacity>
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
                            Doctor Name
                          </Text>
                        </View>
                        <View style={commonLabelDescription.listSeperator}>
                          <Text style={commonLabelDescription.labelText}>
                            :
                          </Text>
                        </View>
                        <View style={styles.descriptionContainer}>
                          {this.state.order.doctorname !== '' &&
                          this.state.order.doctorname !== null ? (
                            <Text style={commonLabelDescription.labelValue}>
                              {this.state.order.doctorname}
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
                            Patient Name
                          </Text>
                        </View>
                        <View style={commonLabelDescription.listSeperator}>
                          <Text style={commonLabelDescription.labelText}>
                            :
                          </Text>
                        </View>
                        <View style={styles.descriptionContainer}>
                          {this.state.order.patientname !== '' &&
                          this.state.order.patientname !== null ? (
                            <Text style={commonLabelDescription.labelValue}>
                              {this.state.order.patientname}
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
                            Gender / Age
                          </Text>
                        </View>
                        <View style={commonLabelDescription.listSeperator}>
                          <Text style={commonLabelDescription.labelText}>
                            :
                          </Text>
                        </View>
                        <View style={styles.descriptionContainer}>
                          <Text style={commonLabelDescription.labelValue}>
                            {this.state.order.gendertext} /{' '}
                            {this.state.order.agewithyears}
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
                            Order Date
                          </Text>
                        </View>
                        <View style={commonLabelDescription.listSeperator}>
                          <Text style={commonLabelDescription.labelText}>
                            :
                          </Text>
                        </View>
                        <View style={styles.descriptionContainer}>
                          {this.state.order.orderdate !== null &&
                          this.state.order.orderdate !== '' ? (
                            <Text style={commonLabelDescription.labelValue}>
                              {this.state.order.displayorderdate}
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
                            Delivery Date
                          </Text>
                        </View>
                        <View style={commonLabelDescription.listSeperator}>
                          <Text style={commonLabelDescription.labelText}>
                            :
                          </Text>
                        </View>
                        <View style={styles.descriptionContainer}>
                          {this.state.order.deliverydate !== null &&
                          this.state.order.deliverydate !== '' ? (
                            <Text style={commonLabelDescription.labelValue}>
                              {this.state.order.displaydeliverydate}
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
                            Total Price
                          </Text>
                        </View>
                        <View style={commonLabelDescription.listSeperator}>
                          <Text style={commonLabelDescription.labelText}>
                            :
                          </Text>
                        </View>
                        <View style={styles.descriptionContainer}>
                          <Text style={commonLabelDescription.labelValue}>
                            {this.state.order.displaytotalprice}
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
                              badgeColorCode(this.state.order.statuscolor),
                            ]}>
                            {this.state.order.statustext}
                          </Text>
                        </View>
                      </View>
                    </View>

                    <View style={common.seperator} />

                    <View>
                      <Text style={commonLabelDescription.blockTitle}>
                        Case Details
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
                            Case Type
                          </Text>
                        </View>
                        <View style={commonLabelDescription.listSeperator}>
                          <Text style={commonLabelDescription.labelText}>
                            :
                          </Text>
                        </View>
                        <View style={styles.descriptionContainer}>
                          {this.state.order.casetype !== null &&
                          this.state.order.casetype !== '' ? (
                            <Text style={commonLabelDescription.labelValue}>
                              {this.state.order.casetypetext}
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
                          {this.state.order.restorationtype !== null &&
                          this.state.order.restorationtype !== '' ? (
                            <Text style={commonLabelDescription.labelValue}>
                              {this.state.order.restorationtypetext}
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
                            Case Stage
                          </Text>
                        </View>
                        <View style={commonLabelDescription.listSeperator}>
                          <Text style={commonLabelDescription.labelText}>
                            :
                          </Text>
                        </View>
                        <View style={styles.descriptionContainer}>
                          {this.state.order.casestage !== null &&
                          this.state.order.casestage !== '' ? (
                            <Text style={commonLabelDescription.labelValue}>
                              {this.state.order.casestagetext}
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
                            Enclosures
                          </Text>
                        </View>
                        <View style={commonLabelDescription.listSeperator}>
                          <Text style={commonLabelDescription.labelText}>
                            :
                          </Text>
                        </View>
                        <View style={styles.descriptionContainer}>
                          {this.state.order.enclosures !== null &&
                          this.state.order.enclosures !== '' ? (
                            <Text style={commonLabelDescription.labelValue}>
                              {this.state.order.enclosurestext}
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
                            Insufficient Room
                          </Text>
                        </View>
                        <View style={commonLabelDescription.listSeperator}>
                          <Text style={commonLabelDescription.labelText}>
                            :
                          </Text>
                        </View>
                        <View style={styles.descriptionContainer}>
                          {this.state.order.insufficientroom !== null &&
                          this.state.order.insufficientroom !== '' ? (
                            <Text style={commonLabelDescription.labelValue}>
                              {this.state.order.insufficientroomtext}
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
                            Embrassor
                          </Text>
                        </View>
                        <View style={commonLabelDescription.listSeperator}>
                          <Text style={commonLabelDescription.labelText}>
                            :
                          </Text>
                        </View>
                        <View style={styles.descriptionContainer}>
                          {this.state.order.embrassor !== null &&
                          this.state.order.embrassor !== '' ? (
                            <Text style={commonLabelDescription.labelValue}>
                              {this.state.order.embrassortext}
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
                            Occlusal Contact
                          </Text>
                        </View>
                        <View style={commonLabelDescription.listSeperator}>
                          <Text style={commonLabelDescription.labelText}>
                            :
                          </Text>
                        </View>
                        <View style={styles.descriptionContainer}>
                          {this.state.order.occlusalcontact !== null &&
                          this.state.order.occlusalcontact !== '' ? (
                            <Text style={commonLabelDescription.labelValue}>
                              {this.state.order.occlusalcontacttext}
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
                            Occlusal Stain
                          </Text>
                        </View>
                        <View style={commonLabelDescription.listSeperator}>
                          <Text style={commonLabelDescription.labelText}>
                            :
                          </Text>
                        </View>
                        <View style={styles.descriptionContainer}>
                          {this.state.order.occlusalstain !== null &&
                          this.state.order.occlusalstain !== '' ? (
                            <Text style={commonLabelDescription.labelValue}>
                              {this.state.order.occlusalstaintext}
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

                    <View style={common.seperator} />

                    <View>
                      <Text style={commonLabelDescription.blockTitle}>
                        Images
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
                                        this.state.order.firstimagefilepath,
                                    },
                                  ]
                            }
                            renderItem={this.renderCarouselItem}
                            sliderWidth={carouselWidth}
                            itemWidth={carouselWidth}
                            onSnapToItem={index =>
                              this.setState({activeCarouselIndex: index})
                            }
                          />
                          <Pagination
                            dotsLength={this.state.orderimages.length}
                            activeDotIndex={this.state.activeCarouselIndex}
                            containerStyle={{
                              backgroundColor: 'transparent',
                              paddingTop: 8,
                              paddingBottom: 0,
                              paddingLeft: 8,
                              paddingRight: 8,
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
                        </View>
                      )}
                    </View>
                    {this.state.order.status === 1 ? (
                      <Button
                        block
                        iconLeft
                        bordered
                        rounded
                        style={{
                          marginTop: 20,
                          backgroundColor: primaryBlueHexColor,
                        }}
                        onPress={this.sendToProduction}>
                        <Icon
                          name="check"
                          style={{
                            fontSize: 20,
                            color: '#fff',
                          }}
                        />
                        <Text
                          style={{
                            fontWeight: 'bold',
                            marginLeft: 10,
                            color: '#fff',
                          }}>
                          Send to Supervisor
                        </Text>
                      </Button>
                    ) : null}
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
});
