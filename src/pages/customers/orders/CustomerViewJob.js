import React, {Component} from 'react';
import {
  Dimensions,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import {
  badgeColorCode,
  common,
  commonLabelDescription,
} from '../../../assets/style';

import Api from '../../../provider/Api';
import Dataprovider from '../../../provider/Dataprovider';

import NotFound from '../../../components/NotFound';
import TeethSkeleton from '../../../components/TeethSkeleton';

import {backgroundGrey, mainBgColor} from '../../../constants/themeColors';

import SkeletonContent from 'react-native-skeleton-content';
import {skeletonPlaceholderProps} from '../../../constants/defaultValues';

const screenWidth = Dimensions.get('window').width;

export default class CustomerViewJob extends Component {
  api = new Api();
  dataProvider = new Dataprovider();

  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      refreshing: false,
      orderDetailId:
        typeof this.props.navigation.state.params.orderDetailId !== 'undefined'
          ? parseInt(this.props.navigation.state.params.orderDetailId)
          : 0,
      orderdetail: null,
      toothnumberarr: [],
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
    formData.append('orderdetailid', this.state.orderDetailId);

    let options = {
      api: 'v_1/customers/orders/jobs/view',
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
          orderdetail: responseData.orderdetail,
          toothnumberarr: responseData.orderdetail.toothnumberarr,
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

  render() {
    const skeletonLayout = [
      // {
      //     marginLeft: screenWidth - 55,
      //     width: 24,
      //     height: 20,
      //     borderRadius: 2,
      //     marginTop: 0
      // },
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
    ];

    return (
      <View style={{flex: 1, backgroundColor: mainBgColor}}>
        <View
          style={[
            common.cardContainer,
            {backgroundColor: backgroundGrey, paddingTop: 0},
          ]}>
          <ScrollView
            contentContainerStyle={{flexGrow: 1}}
            refreshControl={
              <RefreshControl
                refreshing={this.state.refreshing}
                onRefresh={this.onRefreshPageData}
              />
            }>
            <TeethSkeleton
              isClickable={false}
              selectedTooths={this.state.toothnumberarr}
              handleToothNumberChange={number => {
                console.log(number);
              }}
            />
            <View
              style={[
                common.card,
                {margin: 0, borderRadius: 0, marginTop: 10},
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
                {this.state.orderdetail !== null && !this.state.loading ? (
                  <View>
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
                            Job ID
                          </Text>
                        </View>
                        <View style={commonLabelDescription.listSeperator}>
                          <Text style={commonLabelDescription.labelText}>
                            :
                          </Text>
                        </View>
                        <View style={styles.descriptionContainer}>
                          <Text style={commonLabelDescription.labelValue}>
                            #{this.state.orderdetail.orderdetailid}
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
                            #{this.state.orderdetail.orderid}
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
                          <Text style={commonLabelDescription.labelText}>
                            :
                          </Text>
                        </View>
                        <View style={styles.descriptionContainer}>
                          <View>
                            {this.state.orderdetail.categoryid !== null &&
                            this.state.orderdetail.categoryid !== '' ? (
                              <Text style={commonLabelDescription.labelValue}>
                                {this.state.orderdetail.categoryname}
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
                          <Text style={commonLabelDescription.labelText}>
                            :
                          </Text>
                        </View>
                        <View style={styles.descriptionContainer}>
                          <View>
                            {this.state.orderdetail.productid !== null &&
                            this.state.orderdetail.productid !== '' ? (
                              <Text style={commonLabelDescription.labelValue}>
                                {this.state.orderdetail.productname}
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
                          <Text style={commonLabelDescription.labelText}>
                            :
                          </Text>
                        </View>
                        <View style={styles.descriptionContainer}>
                          <View>
                            {this.state.orderdetail.toothnumber !== null &&
                            this.state.orderdetail.toothnumber !== '' ? (
                              <Text style={commonLabelDescription.labelValue}>
                                {this.state.orderdetail.toothnumbertext}
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
                          <Text style={commonLabelDescription.labelText}>
                            :
                          </Text>
                        </View>
                        <View style={styles.descriptionContainer}>
                          <View>
                            {this.state.orderdetail.brandid !== null &&
                            this.state.orderdetail.brandid !== '' ? (
                              <Text style={commonLabelDescription.labelValue}>
                                {this.state.orderdetail.brandname}
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
                          <Text style={commonLabelDescription.labelText}>
                            :
                          </Text>
                        </View>
                        <View style={styles.descriptionContainer}>
                          <View>
                            {this.state.orderdetail.poticdesign !== null &&
                            this.state.orderdetail.poticdesign !== '' ? (
                              <Text style={commonLabelDescription.labelValue}>
                                {this.state.orderdetail.poticdesigntext}
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
                          <Text style={commonLabelDescription.labelText}>
                            :
                          </Text>
                        </View>
                        <View style={styles.descriptionContainer}>
                          <View>
                            {this.state.orderdetail.shadeid !== null &&
                            this.state.orderdetail.shadeid !== '' ? (
                              <Text style={commonLabelDescription.labelValue}>
                                {this.state.orderdetail.shadename}
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
                          <Text style={commonLabelDescription.labelText}>
                            :
                          </Text>
                        </View>
                        <View style={styles.descriptionContainer}>
                          <View>
                            {this.state.orderdetail.shadenotes !== null &&
                            this.state.orderdetail.shadenotes !== '' ? (
                              <Text style={commonLabelDescription.labelValue}>
                                {this.state.orderdetail.shadenotes}
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
                            Description
                          </Text>
                        </View>
                        <View style={commonLabelDescription.listSeperator}>
                          <Text style={commonLabelDescription.labelText}>
                            :
                          </Text>
                        </View>
                        <View style={styles.descriptionContainer}>
                          <View>
                            {this.state.orderdetail.description !== null &&
                            this.state.orderdetail.description !== '' ? (
                              <Text style={commonLabelDescription.labelValue}>
                                {this.state.orderdetail.description}
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
                          <Text style={commonLabelDescription.labelText}>
                            :
                          </Text>
                        </View>
                        <View style={styles.descriptionContainer}>
                          <Text
                            style={[
                              commonLabelDescription.labelValue,
                              badgeColorCode(
                                this.state.orderdetail.statuscolor,
                              ),
                            ]}>
                            {this.state.orderdetail.statustext}
                          </Text>
                        </View>
                      </View>
                    </View>

                    <View style={common.seperator} />

                    <View>
                      <Text style={commonLabelDescription.blockTitle}>
                        Payment Details
                      </Text>

                      <View style={commonLabelDescription.listContainer}>
                        <View
                          style={[
                            commonLabelDescription.listLabelContainer,
                            styles.priceLabelConatiner,
                          ]}>
                          <Text
                            style={[
                              commonLabelDescription.labelText,
                              styles.priceLabelText,
                            ]}>
                            No. of Teeths * Price
                          </Text>
                        </View>
                        <View
                          style={[
                            commonLabelDescription.listSeperator,
                            styles.mathSymbolContainer,
                          ]}>
                          <Text style={commonLabelDescription.labelText}>
                            +
                          </Text>
                        </View>
                        <View style={styles.priceContainer}>
                          <Text
                            style={[
                              commonLabelDescription.labelValue,
                              styles.priceText,
                            ]}>
                            {this.state.orderdetail.numberofteeths} *{' '}
                            {this.state.orderdetail.price}
                          </Text>
                        </View>
                      </View>

                      <View style={commonLabelDescription.listContainer}>
                        <View
                          style={[
                            commonLabelDescription.listLabelContainer,
                            styles.priceLabelConatiner,
                          ]}>
                          <Text
                            style={[
                              commonLabelDescription.labelText,
                              styles.priceLabelText,
                            ]}>
                            Discount Percentage
                          </Text>
                        </View>
                        <View
                          style={[
                            commonLabelDescription.listSeperator,
                            styles.mathSymbolContainer,
                          ]}>
                          <Text style={commonLabelDescription.labelText}>
                            -
                          </Text>
                        </View>
                        <View style={styles.priceContainer}>
                          <Text
                            style={[
                              commonLabelDescription.labelValue,
                              styles.priceText,
                            ]}>
                            {this.state.orderdetail.discountpercentage}
                          </Text>
                        </View>
                      </View>

                      <View style={commonLabelDescription.listContainer}>
                        <View
                          style={[
                            commonLabelDescription.listLabelContainer,
                            styles.priceLabelConatiner,
                          ]}>
                          <Text
                            style={[
                              commonLabelDescription.labelText,
                              styles.priceLabelText,
                            ]}>
                            Discount Amount
                          </Text>
                        </View>
                        <View
                          style={[
                            commonLabelDescription.listSeperator,
                            styles.mathSymbolContainer,
                          ]}>
                          <Text style={commonLabelDescription.labelText}>
                            -
                          </Text>
                        </View>
                        <View style={styles.priceContainer}>
                          <Text
                            style={[
                              commonLabelDescription.labelValue,
                              styles.priceText,
                            ]}>
                            {this.state.orderdetail.discountamount}
                          </Text>
                        </View>
                      </View>

                      <View style={commonLabelDescription.listContainer}>
                        <View
                          style={[
                            commonLabelDescription.listLabelContainer,
                            styles.priceLabelConatiner,
                          ]}>
                          <Text
                            style={[
                              commonLabelDescription.labelText,
                              styles.priceLabelText,
                            ]}>
                            Modification Charges
                          </Text>
                        </View>
                        <View
                          style={[
                            commonLabelDescription.listSeperator,
                            styles.mathSymbolContainer,
                          ]}>
                          <Text style={commonLabelDescription.labelText}>
                            +
                          </Text>
                        </View>
                        <View style={styles.priceContainer}>
                          <Text
                            style={[
                              commonLabelDescription.labelValue,
                              styles.priceText,
                            ]}>
                            {this.state.orderdetail.modificationcharges}
                          </Text>
                        </View>
                      </View>

                      <View
                        style={[
                          common.seperator,
                          {
                            width: '100%',
                            marginTop: 5,
                            marginBottom: 0,
                            borderBottomColor: '#333',
                          },
                        ]}></View>

                      <View style={commonLabelDescription.listContainer}>
                        <View
                          style={[
                            commonLabelDescription.listLabelContainer,
                            styles.priceLabelConatiner,
                          ]}>
                          <Text
                            style={[
                              commonLabelDescription.labelText,
                              styles.priceLabelText,
                            ]}>
                            Total Amount
                          </Text>
                        </View>
                        <View
                          style={[
                            commonLabelDescription.listSeperator,
                            styles.mathSymbolContainer,
                          ]}>
                          <Text style={commonLabelDescription.labelText}>
                            =
                          </Text>
                        </View>
                        <View style={styles.priceContainer}>
                          <Text
                            style={[
                              commonLabelDescription.labelValue,
                              styles.priceText,
                            ]}>
                            {this.state.orderdetail.totalprice}
                          </Text>
                        </View>
                      </View>
                    </View>
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
    width: 100,
  },
  descriptionContainer: {
    width: screenWidth - 140,
  },
  mathSymbolContainer: {
    width: 20,
  },
  priceLabelConatiner: {
    width: 160,
  },
  priceLabelText: {},
  priceContainer: {
    width: screenWidth - 210,
  },
  priceText: {
    textAlign: 'right',
  },
});
