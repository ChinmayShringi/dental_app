import {Body, Card, CardItem} from 'native-base';
import React, {Component} from 'react';
import {
  Dimensions,
  FlatList,
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
} from '../../../assets/style';

import Api from '../../../provider/Api';
import Dataprovider from '../../../provider/Dataprovider';

import NoRecordsFound from '../../../components/NoRecordsFound';
import TeethSkeleton from '../../../components/TeethSkeleton';

import {backgroundGrey, mainBgColor} from '../../../constants/themeColors';

import {skeletonPlaceholderProps} from '../../../constants/defaultValues';
import SkeletonContent from '../../../components/SkeletonContent';

const screenWidth = Dimensions.get('window').width;

export default class ReceptionViewCompletedOrderDetails extends Component {
  api = new Api();
  dataProvider = new Dataprovider();

  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      isDataRefreshing: false,
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
      api: 'v_1/receptionists/orders/completed/view',
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

      if (data?.status_code === 200) {
        let responseData = data?.response.data;

        this.setState({
          order: responseData.order,
          orderdetails: responseData.orderdetails,
          orderimages: responseData.orderimages,
          orderedtoothnumbers: responseData.orderedtoothnumbers,
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

  renderItem = ({item}) => {
    return (
      <View>
        <Card style={callLogCardLayout.cardContainer}>
          <TouchableOpacity
            activeOpacity={0.5}
            onPress={() => {
              this.props.navigation.push('ReceptionViewCompletedJob', {
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
                  <View style={{flex: 1}}>
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

  render() {
    const skeletonLayoutItem = {
      width: screenWidth - 20,
      height: 210,
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
