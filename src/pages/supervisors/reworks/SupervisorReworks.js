import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import {Card, CardItem, Body} from 'native-base';

import {mainBgColor, backgroundGrey} from '../../../constants/themeColors';

import {
  common,
  callLogCardLayout,
  commonLabelDescription,
  badgeColorCode,
} from '../../../assets/style';

import NoRecordsFound from '../../../components/NoRecordsFound';
import ListingSearchBar from '../../../components/ListingSearchBar';

import Api from '../../../provider/Api';
import Dataprovider from '../../../provider/Dataprovider';

import {skeletonPlaceholderProps} from '../../../constants/defaultValues';
import SkeletonContent from '../../../components/SkeletonContent';

const screenWidth = Dimensions.get('window').width;

export default class SupervisorReworks extends Component {
  api = new Api();
  dataProvider = new Dataprovider();

  constructor(props) {
    super(props);
    this.state = {
      data: [],
      currentPage: 1,
      lastPage: 1,
      isLoadMore: false,
      isDataRefreshing: false,
      loading: true,
      textSearchLoading: false,
      searchText: '',
      typing: false,
      typingTimeout: 0,
    };
  }

  componentDidMount() {
    this.getData();
  }

  reloadPageData = () => {
    this.setState(
      {
        loading: true,
        currentPage: 1,
        lastPage: 1,
      },
      this.getData,
    );
  };

  // getInitialData = () => {
  //     this.setState({
  //         loading: true,
  //         currentPage: 1,
  //         data: []
  //     });
  //     this.getData();
  // }

  getData() {
    const formData = new FormData();
    formData.append('search', this.state.searchText);
    formData.append('page', this.state.currentPage);

    let options = {
      api: 'v_1/supervisors/reworks/load',
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'multipart/form-data',
      },
      data: formData,
      refreshOn401: true,
    };

    this.api.callPostApi(options).then(data => {
      if (data.status_code === 200) {
        let responseData = data.response.data;

        if (this.state.isDataRefreshing || this.state.textSearchLoading) {
          this.setState({
            data: responseData.orderdetails.data,
            lastPage: responseData.orderdetails.last_page,
          });
        } else {
          this.setState({
            data: this.state.data.concat(responseData.orderdetails.data),
            lastPage: responseData.orderdetails.last_page,
          });
        }
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

      this.setState({
        isLoadMore: false,
        isDataRefreshing: false,
        loading: false,
        textSearchLoading: false,
      });
    });
  }

  handleRefreshData = () => {
    this.setState(
      {
        currentPage: 1,
        isLoadMore: false,
        isDataRefreshing: true,
      },
      this.getData,
    );
  };

  handleLoadMoreData = () => {
    if (
      this.state.lastPage === 0 ||
      this.state.lastPage >= this.state.currentPage + 1
    ) {
      if (!this.state.isLoadMore) {
        this.setState(
          {
            currentPage: this.state.currentPage + 1,
            isLoadMore: true,
          },
          this.getData,
        );
      }
    }
  };

  footerLoader = () => {
    return this.state.isLoadMore ? (
      <View style={common.footerLoaderForLoadMore}>
        <ActivityIndicator size="large" />
      </View>
    ) : null;
  };

  updateSearchText = searchText => {
    if (typeof searchText !== 'undefined') {
      const self = this;
      if (self.state.typingTimeout) {
        clearTimeout(self.state.typingTimeout);
      }

      self.setState({
        searchText: typeof searchText !== 'undefined' ? searchText : '',
        typing: false,
        typingTimeout: setTimeout(function () {
          self.setState(
            {
              textSearchLoading: true,
              currentPage: 1,
              lastPage: 1,
            },
            self.getData,
          );
        }, 1000),
      });
    }
  };

  renderItem = ({item}) => {
    return (
      <View>
        <Card style={callLogCardLayout.cardContainer}>
          <TouchableOpacity
            activeOpacity={0.5}
            onPress={() => {
              this.props.navigation.push('SupervisorViewJobForRework', {
                orderDetailId: item.orderdetailid,
                orderId: item.orderid,
              });
            }}>
            <CardItem style={[callLogCardLayout.cardBody, {}]}>
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
                          Order ID
                        </Text>
                      </View>
                      <View style={commonLabelDescription.listSeperator}>
                        <Text style={commonLabelDescription.labelText}>:</Text>
                      </View>
                      <View style={styles.descriptionContainer}>
                        <Text style={commonLabelDescription.labelValue}>
                          #{item.orderid}
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
      width: screenWidth - 30,
      height: 210,
      borderRadius: 8,
      marginTop: 5,
      marginBottom: 5,
    };
    const skeletonLayout = [skeletonLayoutItem, skeletonLayoutItem];

    return (
      <View style={{flex: 1, backgroundColor: mainBgColor}}>
        <View
          style={[common.listingContainer, {backgroundColor: backgroundGrey}]}>
          {/* <NavigationEvents onDidFocus={() => this.getInitialData() } /> */}
          {/* <Loader loading={this.state.loading}/> */}
          <ListingSearchBar
            onChangeText={this.updateSearchText}
            onClear={this.updateSearchText}
            value={this.state.searchText}
            showLoading={this.state.textSearchLoading}
          />
          <SkeletonContent
            containerStyle={{flex: 1, width: screenWidth - 30}}
            layout={skeletonLayout}
            isLoading={this.state.loading}
            duration={skeletonPlaceholderProps.duration}
            animationType={skeletonPlaceholderProps.animationType}
            animationDirection={skeletonPlaceholderProps.animationDirection}
            boneColor={skeletonPlaceholderProps.boneColor}
            highlightColor={skeletonPlaceholderProps.highlightColor}>
            {this.state.data.length > 0 ? (
              <FlatList
                style={{width: '100%'}}
                data={this.state.data}
                renderItem={this.renderItem}
                keyExtractor={(item, index) => index.toString()}
                onEndReached={this.handleLoadMoreData}
                onEndReachedThreshold={0.001}
                refreshing={this.state.isDataRefreshing}
                onRefresh={this.handleRefreshData}
                ListFooterComponent={this.footerLoader}
              />
            ) : null}
            {!this.state.loading && this.state.data.length === 0 ? (
              <NoRecordsFound onPress={this.reloadPageData} />
            ) : null}
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
    width: 100,
  },
  descriptionContainer: {
    width: screenWidth - 175,
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
