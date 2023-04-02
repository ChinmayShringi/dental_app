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
import {Fab, Card, CardItem, Body, Left, Thumbnail} from 'native-base';

import {
  successHexColor,
  primaryBlueHexColor,
  textMutedColor,
  mainBgColor,
  backgroundGrey,
  fontColor,
  circleBgColor,
} from '../../../../constants/themeColors';

import {common, callLogCardLayout} from '../../../../assets/style';

import NoRecordsFound from '../../../../components/NoRecordsFound';
import ListingSearchBar from '../../../../components/ListingSearchBar';

import {NavigationEvents} from 'react-navigation';

import Api from '../../../../provider/Api';
import Dataprovider from '../../../../provider/Dataprovider';
import Loader from '../../../../provider/Loader';

import Icon from 'react-native-vector-icons/FontAwesome';

import {skeletonPlaceholderProps} from '../../../../constants/defaultValues';
import SkeletonContent from 'react-native-skeleton-content';

const screenWidth = Dimensions.get('window').width;

export default class SalesHeadSalesPersons extends Component {
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
      api: 'v_1/sales/sales-persons/load',
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
            data: responseData.users.data,
            lastPage: responseData.users.last_page,
          });
        } else {
          this.setState({
            data: this.state.data.concat(responseData.users.data),
            lastPage: responseData.users.last_page,
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
      <View style={{marginBottom: -4}}>
        <Card style={callLogCardLayout.cardContainer}>
          <TouchableOpacity
            activeOpacity={0.5}
            onPress={() => {
              this.props.navigation.push('SalesHeadSalesPersonDetails', {
                pageHeading: item.fullname,
                userId: item.userid,
              });
            }}>
            <CardItem>
              <Left>
                <Thumbnail
                  source={{uri: item.imagefilepath}}
                  style={{
                    width: 70,
                    height: 70,
                    borderRadius: 90,
                  }}
                />
                <Body>
                  <Text style={[callLogCardLayout.bodyTitle, {paddingLeft: 5}]}>
                    {item.fullname}
                  </Text>
                  {item.userattendancecount == 0 ? (
                    <Text
                      style={[
                        callLogCardLayout.topLeftRightText,
                        styles.attendanceText,
                        {color: circleBgColor},
                      ]}>
                      Absent
                    </Text>
                  ) : (
                    <Text
                      style={[
                        callLogCardLayout.topLeftRightText,
                        styles.attendanceText,
                        {color: successHexColor},
                      ]}>
                      Present
                    </Text>
                  )}

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
                        style={[
                          callLogCardLayout.textWithIconContainerText,
                          {},
                        ]}>
                        {item.displayfulllocation}
                      </Text>
                    </View>
                  </View>
                </Body>
              </Left>
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
      height: 115,
      borderRadius: 8,
      marginTop: 3,
      marginBottom: 3,
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
                this.props.navigation.push('SalesHeadSalesPersonForm', {
                  pageHeading: 'Add Sales Person',
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
    left: 4,
    top: 3,
    width: 16,
    textAlign: 'center',
    color: circleBgColor,
  },
  textWithIconContainerText: {
    marginLeft: 24,
    fontSize: 12,
    color: fontColor,
  },
  attendanceText: {
    textAlign: 'right',
    marginTop: -20,
    // alignSelf: 'flex-end',
    alignItems: 'flex-end',
    fontSize: 10,
    fontWeight: 'bold',
  },
});
