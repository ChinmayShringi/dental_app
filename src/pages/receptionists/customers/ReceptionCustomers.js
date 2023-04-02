import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
  Linking,
  Dimensions,
} from 'react-native';
import {Fab, Card, CardItem, Body} from 'native-base';

import {
  primaryHexColor,
  primaryBlueHexColor,
  textMutedColor,
  mainBgColor,
  backgroundGrey,
  fontColor,
  circleBgColor,
} from '../../../constants/themeColors';

import {common, callLogCardLayout} from '../../../assets/style';

import NoRecordsFound from '../../../components/NoRecordsFound';
import ListingSearchBar from '../../../components/ListingSearchBar';

import {NavigationEvents} from 'react-navigation';

import Api from '../../../provider/Api';
import Dataprovider from '../../../provider/Dataprovider';
import Loader from '../../../provider/Loader';

import Icon from 'react-native-vector-icons/FontAwesome';

import {skeletonPlaceholderProps} from '../../../constants/defaultValues';
import SkeletonContent from 'react-native-skeleton-content';

const screenWidth = Dimensions.get('window').width;

export default class ReceptionCustomers extends Component {
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
      api: 'v_1/receptionists/customers/load',
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
            data: responseData.customers.data,
            lastPage: responseData.customers.last_page,
          });
        } else {
          this.setState({
            data: this.state.data.concat(responseData.customers.data),
            lastPage: responseData.customers.last_page,
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

  renderCallLogDetails = ({item}) => {
    return (
      <View>
        <Card style={callLogCardLayout.cardContainer}>
          <TouchableOpacity
            activeOpacity={0.5}
            onPress={() => {
              this.props.navigation.push('ReceptionCustomerDetails', {
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
                {/* <Text style={{color: textMutedColor, fontSize: 12}}>
                                    {item.typetext}
                                </Text> */}
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
                    size={14}
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

  render() {
    const skeletonLayoutItem = {
      width: screenWidth - 30,
      height: 110,
      borderRadius: 8,
      marginTop: 5,
      marginBottom: 5,
    };
    const skeletonLayout = [
      skeletonLayoutItem,
      skeletonLayoutItem,
      skeletonLayoutItem,
    ];

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
                renderItem={this.renderCallLogDetails}
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
            <Fab
              active={false}
              direction="up"
              containerStyle={{}}
              style={{backgroundColor: primaryBlueHexColor}}
              position="bottomRight"
              onPress={() => {
                this.props.navigation.push('ReceptionCustomerForm', {
                  pageHeading: 'Add Customer',
                });
              }}>
              <Icon name="plus" />
            </Fab>
          </SkeletonContent>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  textWithIconContainer: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    position: 'relative',
    marginTop: 2,
  },
  textWithIconContainerIcon: {
    position: 'absolute',
    left: -1,
    width: 16,
    textAlign: 'center',
  },
  textWithIconContainerText: {
    marginLeft: 20,
  },
});
