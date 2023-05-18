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
import {Fab, Card, CardItem, Body, Left, Right, Badge} from 'native-base';

import {
  primaryHexColor,
  primaryBlueHexColor,
  mainBgColor,
  backgroundGrey,
  fontColor,
  circleBgColor,
} from '../../../constants/themeColors';

import {
  badgeCss,
  badgeColorCode,
  common,
  callLogCardLayout,
  commonLabelDescription,
} from '../../../assets/style';

import NoRecordsFound from '../../../components/NoRecordsFound';
import ListingSearchBar from '../../../components/ListingSearchBar';

import {NavigationEvents} from 'react-navigation';

import Api from '../../../provider/Api';
import Dataprovider from '../../../provider/Dataprovider';
import Loader from '../../../provider/Loader';

import Icon from 'react-native-vector-icons/FontAwesome';

import {skeletonPlaceholderProps} from '../../../constants/defaultValues';

import {loggedInUserDetails} from '../../../redux/actions/loggedInUserDetails';
import {connect} from 'react-redux';
import SkeletonContent from '../../../components/SkeletonContent';

const screenWidth = Dimensions.get('window').width;

class Complaints extends Component {
  api = new Api();
  dataProvider = new Dataprovider();

  constructor(props) {
    super(props);
    this.state = {
      data: [],
      currentPage: 1,
      lastPage: 0,
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
      api: 'v_1/sales/complaints/load',
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'multipart/form-data',
      },
      data: formData,
      refreshOn401: true,
    };

    this.api.callPostApi(options).then(data => {
      if (data?.status_code === 200) {
        let responseData = data?.response.data;
        if (this.state.isDataRefreshing) {
          this.setState({
            data: responseData.calllogs.data,
            lastPage: responseData.calllogs.last_page,
          });
        } else {
          this.setState({
            data: this.state.data.concat(responseData.calllogs.data),
            lastPage: responseData.calllogs.last_page,
          });
        }
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
              this.props.navigation.push('ComplaintDetails', {
                pageHeading: item.customername,
                callLogId: item.calllogid,
              });
            }}>
            {/* <CardItem style={callLogCardLayout.cardHeader}>
                            <Left>
                                <Text style={common.fontBold}>#{item.calllogid}</Text>
                            </Left>
                            <Right>
                                <Text>{item.displaycalldatetime}</Text>
                            </Right>
                        </CardItem> */}
            <CardItem style={[callLogCardLayout.cardBody]}>
              <Body>
                <Text
                  style={[
                    callLogCardLayout.bodyTitle,
                    {color: primaryHexColor},
                  ]}>
                  {item.customername}
                </Text>
                {/* <Text style={{marginTop: 2}}>
                                    <Text style={common.fontBold}>Address:</Text> {item.displaylocation}
                                </Text>
                                <Text style={{marginTop: 2}}>
                                    <Text style={common.fontBold}>Order:</Text> {item.ordertext}
                                </Text>
                                <Text style={{marginTop: 2}}>
                                    <Text style={common.fontBold}>Parcel Collection Status:</Text> {item.parcelcollecationstatustext}
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
                      {item.doctorname}
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
                    <Text style={[callLogCardLayout.textWithIconContainerText]}>
                      {item.customeremail}
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
                    <Text style={[callLogCardLayout.textWithIconContainerText]}>
                      {item.customerphoneno}
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
                      style={[callLogCardLayout.textWithIconContainerText]}>
                      {item.displaylocation}
                    </Text>
                  </View>
                </View>

                {/* {(this.props.user !== null && this.props.user.isdepartmenthead) ? 
                                    <View style={commonLabelDescription.listContainer}>
                                        <View style={[commonLabelDescription.listLabelContainer, styles.labelContainer]}>
                                            <Text style={commonLabelDescription.labelText}>Sales Person</Text> 
                                        </View>
                                        <View style={commonLabelDescription.listSeperator}>
                                            <Text style={commonLabelDescription.labelText}>:</Text> 
                                        </View>
                                        <View style={styles.descriptionContainer}>
                                            <Text>{item.salespersonname}</Text>
                                        </View>
                                    </View>
                                    : null
                                }

                                <View style={commonLabelDescription.listContainer}>
                                    <View style={[commonLabelDescription.listLabelContainer, styles.labelContainer]}>
                                        <Text style={commonLabelDescription.labelText}>Address</Text> 
                                    </View>
                                    <View style={commonLabelDescription.listSeperator}>
                                        <Text style={commonLabelDescription.labelText}>:</Text> 
                                    </View>
                                    <View style={styles.descriptionContainer}>
                                        <Text>{item.displaylocation}</Text>
                                    </View>
                                </View>
                                <View style={commonLabelDescription.listContainer}>
                                    <View style={[commonLabelDescription.listLabelContainer, styles.labelContainer]}>
                                        <Text style={commonLabelDescription.labelText}>Order</Text> 
                                    </View>
                                    <View style={commonLabelDescription.listSeperator}>
                                        <Text style={commonLabelDescription.labelText}>:</Text> 
                                    </View>
                                    <View style={styles.descriptionContainer}>
                                        <Text>{item.ordertext}</Text>
                                    </View>
                                </View>
                                <View style={commonLabelDescription.listContainer}>
                                    <View style={[commonLabelDescription.listLabelContainer, styles.labelContainer]}>
                                        <Text style={commonLabelDescription.labelText}>Status</Text> 
                                    </View>
                                    <View style={commonLabelDescription.listSeperator}>
                                        <Text style={commonLabelDescription.labelText}>:</Text> 
                                    </View>
                                    <View style={styles.descriptionContainer}>
                                        <Text style={badgeColorCode(item.statuscolor)}>{item.statustext}</Text>
                                    </View>
                                </View> */}
                {/* <View style={commonLabelDescription.listContainer}>
                                    <View style={[commonLabelDescription.listLabelContainer, styles.labelContainer]}>
                                        <Text style={commonLabelDescription.labelText}>Parcel Collection Status</Text> 
                                    </View>
                                    <View style={commonLabelDescription.listSeperator}>
                                        <Text style={commonLabelDescription.labelText}>:</Text> 
                                    </View>
                                    <View style={styles.descriptionContainer}>
                                        <Text style={badgeColorCode(item.parcelcollecationstatuscolor)}>{item.parcelcollecationstatustext}</Text>
                                    </View>
                                </View> */}
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
      // height: (this.props.user !== null && this.props.user.isdepartmenthead) ? 185 : 160,
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
                this.props.navigation.push('ComplaintForm', {
                  pageHeading: 'Add Complaint',
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
  labelContainer: {
    width: 100,
  },
  descriptionContainer: {
    width: screenWidth - 165,
  },
});

const mapStateToProps = state => {
  return {
    user: state.loggedInUserDetailsReducer.user,
  };
};

export default connect(mapStateToProps, null)(Complaints);
