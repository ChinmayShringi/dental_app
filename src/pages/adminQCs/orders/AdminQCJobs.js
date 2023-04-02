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
  FlatList,
  ActivityIndicator,
  KeyboardAvoidingView,
} from 'react-native';
import {Card, CardItem, Body, Left, Right, Badge, Button} from 'native-base';

import {
  common,
  badgeCss,
  commonLabelDescription,
  commonCard,
  callLogCardLayout,
  modalLayout,
  badgeColorCode,
} from '../../../assets/style';

import Api from '../../../provider/Api';
import Dataprovider from '../../../provider/Dataprovider';
import Loader from '../../../provider/Loader';

import NoRecordsFound from '../../../components/NoRecordsFound';
import TeethSkeleton from '../../../components/TeethSkeleton';

import {
  primaryHexColor,
  seperator,
  primaryBlueHexColor,
  textMutedColor,
  mainBgColor,
  backgroundGrey,
  fontColor,
  circleBgColor,
} from '../../../constants/themeColors';

import Icon from 'react-native-vector-icons/FontAwesome';
import {MaterialIcons} from '@expo/vector-icons';
import Modal from 'react-native-modal';
import FlashMessage from 'react-native-flash-message';
import QRCode from 'react-native-qrcode-svg';
import * as Print from 'expo-print';

import {skeletonPlaceholderProps} from '../../../constants/defaultValues';
import SkeletonContent from 'react-native-skeleton-content';

const screenWidth = Dimensions.get('window').width;

export default class AdminQCJobs extends Component {
  modalFlashMessageRef = null;

  api = new Api();
  dataProvider = new Dataprovider();

  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      isDataRefreshing: false,
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

      modalLoader: false,
      isQrCodeModalVisible: false,
      isqrcodegenerated: false,
      orderdetailidforqrcode: null,
      hasqrcode: false,
      qrcodefilepath: null,
      qrcodeimage: null,
    };
  }

  componentDidMount() {
    this.getData();
  }

  reloadPageData = () => {
    this.setState({loading: true}, this.getData);
  };

  handleRefreshData = () => {
    this.setState(
      {
        isDataRefreshing: true,
      },
      this.getData,
    );
  };

  getData() {
    let formData = new FormData();
    formData.append('orderid', this.state.orderId);

    let options = {
      api: 'v_1/adminqcs/orders/view',
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'multipart/form-data',
      },
      data: formData,
      refreshOn401: true,
    };

    this.api.callPostApi(options).then(data => {
      this.setState({loading: false, isDataRefreshing: false});

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

  renderItem = ({item}) => {
    return (
      <View>
        <Card style={callLogCardLayout.cardContainer}>
          <TouchableOpacity
            activeOpacity={0.5}
            onPress={() => {
              this.props.navigation.push('AdminQCJob', {
                orderDetailId: item.orderdetailid,
                orderId: item.orderid,
              });
            }}>
            <CardItem
              style={[
                callLogCardLayout.cardBody,
                {paddingBottom: 5, paddingTop: 10},
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
                      right: -5,
                    }}>
                    <View style={{alignSelf: 'flex-start'}}>
                      <Text></Text>
                    </View>
                    <View style={{alignSelf: 'flex-end'}}>
                      <View style={{flex: 1, flexDirection: 'row'}}>
                        <TouchableOpacity
                          onPress={() => {
                            this.displayOrGenerateOrCode(
                              item.orderdetailid,
                              item.hasqrcode,
                              item.qrcodefilepath,
                            );
                          }}>
                          <Text style={{color: primaryHexColor}}>
                            <Icon name="qrcode" size={28} />
                          </Text>
                        </TouchableOpacity>
                      </View>
                    </View>
                  </View>
                  <View style={{flex: 1, marginTop: 10}}>
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
                        <Text style={commonLabelDescription.labelText}>:</Text>
                      </View>
                      <View style={styles.descriptionContainer}>
                        <Text style={commonLabelDescription.labelValue}>
                          #{item.orderdetailid}
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
                        <Text style={commonLabelDescription.labelText}>:</Text>
                      </View>
                      <View style={styles.descriptionContainer}>
                        <View>
                          {item.categoryid !== null &&
                          item.categoryid !== '' ? (
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
                          styles.listLabelContainer,
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
                        <Text style={commonLabelDescription.labelText}>:</Text>
                      </View>
                      <View style={styles.descriptionContainer}>
                        <View>
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
                        <Text style={commonLabelDescription.labelText}>:</Text>
                      </View>
                      <View style={styles.descriptionContainer}>
                        <View>
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
                        <Text style={commonLabelDescription.labelText}>:</Text>
                      </View>
                      <View style={styles.descriptionContainer}>
                        <View>
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
                        <Text style={commonLabelDescription.labelText}>:</Text>
                      </View>
                      <View style={styles.descriptionContainer}>
                        <View>
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
                        <Text style={commonLabelDescription.labelText}>:</Text>
                      </View>
                      <View style={styles.descriptionContainer}>
                        <View>
                          {item.shadenotes !== null &&
                          item.shadenotes !== '' ? (
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
                  </View>
                </View>
              </Body>
            </CardItem>
          </TouchableOpacity>
        </Card>
      </View>
    );
  };

  toggleQrCodeModal = () => {
    // CLOSE MODAL
    if (this.state.isQrCodeModalVisible) {
      setTimeout(() => {
        this.setState({
          orderdetailidforqrcode: null,
          // modalEditModeIndex: null,
        });
      }, 100);
    }
    this.setState({isQrCodeModalVisible: !this.state.isQrCodeModalVisible});
  };

  displayOrGenerateOrCode = (orderdetailid, hasqrcode, qrcodefilepath) => {
    this.setState({
      orderdetailidforqrcode: orderdetailid,
      qrcodeimage: null,
      hasqrcode: hasqrcode,
      qrcodefilepath: qrcodefilepath,
    });
    this.toggleQrCodeModal();
  };

  resetQrCodeModalData = () => {
    this.setState({
      orderdetailidforqrcode: null,
      isqrcodegenerated: false,
      hasqrcode: false,
      qrcodefilepath: null,
      qrcodeimage: null,
    });
  };

  printQrCode = () => {
    Print.printAsync({
      html: `
                <div style="text-align: center;">
                    <h3 style="text-align: center; font-size: 40px">Job ID #${this.state.orderdetailidforqrcode}</h3>
                    <img src="${this.state.qrcodefilepath}" style="width: 500px; height: auto" align="center"/>
                </div>
            `,
      orientation: Print.Orientation.portrait,
    });
  };

  render() {
    const skeletonLayoutItem = {
      width: screenWidth - 20,
      height: 240,
      borderRadius: 8,
      marginTop: 10,
      marginBottom: 0,
      marginLeft: 10,
      marginRight: 10,
    };
    const skeletonLayout = [
      {
        width: screenWidth - 20,
        height: 70,
        borderRadius: 8,
        marginTop: 10,
        marginBottom: 0,
        marginLeft: 10,
        marginRight: 10,
      },
      skeletonLayoutItem,
      skeletonLayoutItem,
    ];

    return (
      <View style={{flex: 1, backgroundColor: mainBgColor}}>
        <View
          style={[
            common.cardContainer,
            {backgroundColor: backgroundGrey, paddingTop: 0},
          ]}>
          <SkeletonContent
            containerStyle={{flex: 1, width: screenWidth}}
            layout={skeletonLayout}
            isLoading={this.state.loading}
            duration={skeletonPlaceholderProps.duration}
            animationType={skeletonPlaceholderProps.animationType}
            animationDirection={skeletonPlaceholderProps.animationDirection}
            boneColor={skeletonPlaceholderProps.boneColor}
            highlightColor={skeletonPlaceholderProps.highlightColor}>
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
                {
                  backgroundColor: backgroundGrey,
                  paddingTop: 0,
                  paddingBottom: 10,
                },
              ]}>
              {this.state.orderdetails.length > 0 ? (
                <FlatList
                  style={{width: '100%'}}
                  data={this.state.orderdetails}
                  renderItem={this.renderItem}
                  keyExtractor={(item, index) => index.toString()}
                  refreshing={this.state.isDataRefreshing}
                  onRefresh={this.handleRefreshData}
                />
              ) : null}
              {!this.state.loading && this.state.orderdetails.length === 0 ? (
                <NoRecordsFound onPress={this.reloadPageData} />
              ) : null}
            </View>
            <Modal
              isVisible={this.state.isQrCodeModalVisible}
              onBackButtonPress={this.toggleQrCodeModal}
              backdropOpacity={0.5}
              style={modalLayout.modalContainer}
              animationInTiming={500}
              animationOutTiming={500}
              // onModalWillShow={this.getFormData}
              onModalHide={this.resetQrCodeModalData}>
              <Loader loading={this.state.modalLoader} />
              <View style={modalLayout.body}>
                <View style={modalLayout.header}>
                  <MaterialIcons
                    name="close"
                    size={28}
                    style={modalLayout.headerMenuicon}
                    onPress={this.toggleQrCodeModal}
                  />
                  <View>
                    <Text style={modalLayout.headertext}>QR Code</Text>
                  </View>
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
                          {
                            backgroundColor: backgroundGrey,
                            flex: 1,
                            justifyContent: 'center',
                          },
                        ]}>
                        {!this.state.hasqrcode ? (
                          <View
                            style={{
                              flex: 1,
                              justifyContent: 'center',
                              alignItems: 'center',
                              margin: 10,
                            }}>
                            <Image
                              style={{width: 150, height: 150}}
                              source={require('../../../images/404.png')}
                            />
                            <Text
                              style={{
                                textAlign: 'center',
                                fontSize: 18,
                                fontWeight: '600',
                                color: '#555',
                                marginTop: 15,
                              }}>
                              SORRY, QR CODE NOT FOUND
                            </Text>
                            <Text
                              style={{
                                textAlign: 'center',
                                fontSize: 12,
                                color: textMutedColor,
                              }}>
                              We can't find the qr code for the selected job.
                            </Text>
                          </View>
                        ) : (
                          <View>
                            <View
                              style={{
                                backgroundColor: '#fff',
                                borderRadius: 8,
                                margin: 40,
                                marginBottom: 30,
                                padding: 40,
                                shadowColor: '#000',
                                shadowOffset: {width: 0, height: 1},
                                shadowOpacity: 0.8,
                                shadowRadius: 2,
                                elevation: 5,
                                // flex: 1,
                                alignItems: 'center',
                                justifyContent: 'center',
                              }}>
                              <Text style={{fontSize: 18, fontWeight: 'bold'}}>
                                Job ID #{this.state.orderdetailidforqrcode}
                              </Text>
                              <Image
                                source={{uri: this.state.qrcodefilepath}}
                                style={{
                                  height: 240,
                                  width: 240,
                                  marginTop: 10,
                                }}
                                resizeMode="contain"
                              />
                            </View>
                            <Button
                              block
                              iconLeft
                              bordered
                              rounded
                              style={{
                                width: screenWidth - 80,
                                marginLeft: 40,
                                backgroundColor: primaryBlueHexColor,
                              }}
                              onPress={this.printQrCode}>
                              <Icon
                                name="print"
                                style={{
                                  fontSize: 20,
                                  // color: '#555'
                                  // color: primaryBlueHexColor
                                  color: '#fff',
                                }}
                              />
                              <Text
                                style={{
                                  fontWeight: 'bold',
                                  marginLeft: 10,
                                  // color: '#555',
                                  // color: primaryBlueHexColor,
                                  color: '#fff',
                                }}>
                                Print Qr Code
                              </Text>
                            </Button>
                          </View>
                        )}
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
          </SkeletonContent>
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
    width: 120,
  },
  descriptionContainer: {
    width: screenWidth - 184,
  },
  mathSymbolContainer: {
    width: 20,
  },
  priceLabelConatiner: {
    width: 160,
  },
  priceLabelText: {},
  priceContainer: {
    width: screenWidth - 250,
  },
  priceText: {
    textAlign: 'right',
  },
});
