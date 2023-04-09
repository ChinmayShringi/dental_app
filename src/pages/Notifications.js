import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  FlatList,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import {Body, Left, List, ListItem} from 'native-base';

import {seperator, textMutedColor, mainBgColor} from '../constants/themeColors';

import {common} from '../assets/style';

import NoRecordsFound from '../components/NoRecordsFound';
import ListingSearchBar from '../components/ListingSearchBar';

import Api from '../provider/Api';
import Dataprovider from '../provider/Dataprovider';
import Loader from '../provider/Loader';

import {DrawerNotificationBadgeCount} from '../redux/actions/DrawerNotificationBadgeCount';
import {connect} from 'react-redux';

import {skeletonPlaceholderProps} from '../constants/defaultValues';
import SkeletonContent from 'react-native-skeleton-content';

import moment from 'moment';

const screenWidth = Dimensions.get('window').width;

class Notifications extends Component {
  api = new Api();
  dataProvider = new Dataprovider();

  constructor(props) {
    super(props);
    this.state = {
      data: [],
      isDataRefreshing: false,
      loading: true,
      transparentLoader: false,
      textSearchLoading: false,
      searchText: '',
      typing: false,
      typingTimeout: 0,
    };
  }

  componentDidMount() {
    this.getData();
    this.props.navigation.setParams({
      handleClearNotifications: this.handleClearNotifications,
    });
  }

  reloadPageData = () => {
    this.setState(
      {
        loading: true,
      },
      this.getData,
    );
  };

  getData() {
    const formData = new FormData();
    formData.append('lastid', 0);
    formData.append('search', this.state.searchText);

    let options = {
      api: 'v_1/notifications/load',
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

        this.props.onNotificationUpdateCount(responseData.notificationcount);
        if (this.state.isDataRefreshing || this.state.textSearchLoading) {
          this.setState({
            data: responseData.notifications,
          });
        } else {
          this.setState({
            data: this.state.data.concat(responseData.notifications),
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
        isDataRefreshing: false,
        loading: false,
        textSearchLoading: false,
      });
    });
  }

  handleRefreshData = () => {
    this.setState(
      {
        isDataRefreshing: true,
      },
      this.getData,
    );
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
      <View
        style={[
          styles.itemContainer,
          {backgroundColor: item.readstatus === 0 ? '#e6e7e8' : '#fff'},
        ]}>
        <TouchableOpacity
          activeOpacity={0.5}
          onPress={() => {
            this.redirectOnNotificationDetailPage(item);
          }}>
          <List>
            <ListItem avatar>
              <Left>
                <TouchableOpacity
                  activeOpacity={0.5}
                  onPress={() => {
                    this.redirectOnNotificationDetailPage(item);
                  }}>
                  <View style={styles.notificationImage}>
                    <Image
                      source={{uri: item.categoryimagefilepath}}
                      style={{
                        width: 24,
                        height: 24,
                      }}
                      resizeMode={'contain'}
                    />
                  </View>
                </TouchableOpacity>
              </Left>
              <Body>
                <TouchableOpacity
                  activeOpacity={0.5}
                  onPress={() => {
                    this.redirectOnNotificationDetailPage(item);
                  }}>
                  <Text style={styles.notificationTitle}>{item.title}</Text>
                  <Text style={styles.notificationDescription}>
                    {item.description}
                  </Text>
                  <Text style={styles.notificationTime}>
                    {moment(item.created_at)
                      .local()
                      .startOf('seconds')
                      .fromNow()}
                  </Text>
                </TouchableOpacity>
              </Body>
            </ListItem>
          </List>
        </TouchableOpacity>
      </View>
    );
  };

  handleClearNotifications = () => {
    this.setState({transparentLoader: true});

    let options = {
      api: 'v_1/notifications/clear',
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'multipart/form-data',
      },
      data: {},
      refreshOn401: true,
    };

    this.api.callPostApi(options).then(data => {
      this.setState({transparentLoader: false});
      if (data.status_code === 200) {
        let responseData = data.response.data;
        this.props.onNotificationUpdateCount(0);
        this.setState({
          data: [],
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
  };

  redirectOnNotificationDetailPage = item => {
    if (item.readstatus === 0) {
      this.setState({transparentLoader: true});
      const formData = new FormData();
      formData.append('notificationid', item.notificationid);

      let options = {
        api: 'v_1/notifications/mark-as-read',
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
          let existingUnreadNotifications = this.props.notificationCount;
          if (existingUnreadNotifications > 0) {
            existingUnreadNotifications =
              parseInt(this.props.notificationCount) - 1;
          }
          this.props.onNotificationUpdateCount(existingUnreadNotifications);
          let responseData = data.response.data;
          this.setState({
            data: responseData.notifications,
          });
          this.redirectByNotificationType(item);
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
    } else {
      this.redirectByNotificationType(item);
    }
  };

  redirectByNotificationType = notification => {
    var notificationType = parseInt(notification.type);
    var notificationData = JSON.parse(notification.data);

    // COMMON
    if (notificationType > 0 && notificationType <= 100) {
      // PROFILE DETAILS UPDATE BY ADMIN
      if (
        notificationType === 1 ||
        notificationType === 2 ||
        notificationType === 3
      ) {
        this.props.navigation.navigate('EditProfile', {});
      }
    }
    // ADMIN QC
    else if (notificationType >= 101 && notificationType <= 200) {
      // USER IS ADMIN QC
      if (
        notificationData.appusertype === 1 ||
        notificationData.appusertype === '1'
      ) {
        // NEW JOB ASSIGNED TO DEPARTMENT (DEPARTMENT HEAD)
        if (notificationType === 101 || notificationType === 103) {
          if (
            notificationData.productionprocess !== null ||
            notificationData.productionprocess !== ''
          ) {
            this.props.navigation.navigate('ProductionUnAssignedJobDetails', {
              productionProcessId:
                notificationData.productionprocess.productionprocessid,
              orderDetailId: notificationData.productionprocess.orderdetailid,
              isFromQrCode: false,
            });
          }
        }
        // NEW TASK ASSIGNED TO USER
        else if (notificationType === 102) {
          if (
            notificationData.productionprocess !== null ||
            notificationData.productionprocess !== ''
          ) {
            this.props.navigation.navigate('ProductionAssignedJobDetails', {
              productionProcessId:
                notificationData.productionprocess.productionprocessid,
              orderDetailId: notificationData.productionprocess.orderdetailid,
              isFromQrCode: false,
            });
          }
        }
      }
    }
    // PACKAGING
    else if (notificationType >= 201 && notificationType <= 300) {
      // USER IS PACKAGING USER
      if (
        notificationData.appusertype === 2 ||
        notificationData.appusertype === '2'
      ) {
        // NEW JOB ASSIGNED TO DEPARTMENT (DEPARTMENT HEAD)
        if (notificationType === 201 || notificationType === 203) {
          if (
            notificationData.productionprocess !== null ||
            notificationData.productionprocess !== ''
          ) {
            this.props.navigation.navigate('ProductionUnAssignedJobDetails', {
              productionProcessId:
                notificationData.productionprocess.productionprocessid,
              orderDetailId: notificationData.productionprocess.orderdetailid,
              isFromQrCode: false,
            });
          }
        }
        // NEW TASK ASSIGNED TO USER
        else if (notificationType === 202) {
          if (
            notificationData.productionprocess !== null ||
            notificationData.productionprocess !== ''
          ) {
            this.props.navigation.navigate('ProductionAssignedJobDetails', {
              productionProcessId:
                notificationData.productionprocess.productionprocessid,
              orderDetailId: notificationData.productionprocess.orderdetailid,
              isFromQrCode: false,
            });
          }
        }
      }
    }
    // PRODUCTION
    else if (notificationType >= 301 && notificationType <= 400) {
      // USER IS PRODUCTION USER
      if (
        notificationData.appusertype === 3 ||
        notificationData.appusertype === '3'
      ) {
        // NEW JOB ASSIGNED TO DEPARTMENT (DEPARTMENT HEAD)
        if (notificationType === 301 || notificationType === 303) {
          if (
            notificationData.productionprocess !== null ||
            notificationData.productionprocess !== ''
          ) {
            this.props.navigation.navigate('ProductionUnAssignedJobDetails', {
              productionProcessId:
                notificationData.productionprocess.productionprocessid,
              orderDetailId: notificationData.productionprocess.orderdetailid,
              isFromQrCode: false,
            });
          }
        }
        // NEW TASK ASSIGNED TO USER
        else if (notificationType === 302) {
          if (
            notificationData.productionprocess !== null ||
            notificationData.productionprocess !== ''
          ) {
            this.props.navigation.navigate('ProductionAssignedJobDetails', {
              productionProcessId:
                notificationData.productionprocess.productionprocessid,
              orderDetailId: notificationData.productionprocess.orderdetailid,
              isFromQrCode: false,
            });
          }
        }
      }
    }
    // RECEPTION
    else if (notificationType >= 401 && notificationType <= 500) {
      // USER IS RECEPTION USER
      if (
        notificationData.appusertype === 4 ||
        notificationData.appusertype === '4'
      ) {
        // JOB REJECTED
        if (notificationType === 401 || notificationType === 402) {
          if (
            notificationData.orderdetail !== null ||
            notificationData.orderdetail !== ''
          ) {
            this.props.navigation.navigate('ReceptionRejectedJob', {
              orderDetailId: notificationData.orderdetail.orderdetailid,
              orderId: notificationData.orderdetail.orderid,
            });
          }
        }
        // JOB COMPLETED
        else if (notificationType === 403) {
          if (
            notificationData.orderdetail !== null ||
            notificationData.orderdetail !== ''
          ) {
            this.props.navigation.navigate('ReceptionCompletedJob', {
              orderDetailId: notificationData.orderdetail.orderdetailid,
              orderId: notificationData.orderdetail.orderid,
            });
          }
        }
      }
    }
    // SALES
    else if (notificationType >= 501 && notificationType <= 600) {
      // USER IS SALES USER
      if (
        notificationData.appusertype === 5 ||
        notificationData.appusertype === '5'
      ) {
        // Pickup request CREATED/UPDATED
        if (notificationType === 501) {
          if (
            notificationData.calllog !== null ||
            notificationData.calllog !== ''
          ) {
            this.props.navigation.navigate('CollectionCallDetails', {
              pageHeading: notificationData.calllog.customername,
              callLogId: notificationData.calllog.calllogid,
            });
          }
        }
        // DELIVERY CALL CREATED/UPDATED
        else if (notificationType === 502) {
          if (
            notificationData.calllog !== null ||
            notificationData.calllog !== ''
          ) {
            this.props.navigation.navigate('DeliveryCallDetails', {
              pageHeading: notificationData.calllog.customername,
              callLogId: notificationData.calllog.calllogid,
            });
          }
        }
        // COMPLAINT CREATED/UPDATED
        else if (notificationType === 503) {
          if (
            notificationData.calllog !== null ||
            notificationData.calllog !== ''
          ) {
            this.props.navigation.navigate('ComplaintDetails', {
              pageHeading: notificationData.calllog.customername,
              callLogId: notificationData.calllog.calllogid,
            });
          }
        }
        // LEAD CREATED/UPDATED
        else if (notificationType === 504) {
          if (
            notificationData.saleslead !== null ||
            notificationData.saleslead !== ''
          ) {
            this.props.navigation.navigate('LeadDetails', {
              salesLeadId: notificationData.saleslead.salesleadid,
            });
          }
        }
        // LEAD INTERACTION CREATED/UPDATED
        else if (notificationType === 505) {
          if (
            notificationData.salesleadinteraction !== null ||
            notificationData.salesleadinteraction !== ''
          ) {
            this.props.navigation.navigate('LeadDetails', {
              salesLeadId: notificationData.salesleadinteraction.salesleadid,
            });
          }
        }
        // LEAD MESSAGES CREATED/UPDATED
        else if (notificationType === 506) {
          if (
            notificationData.salesleadmessage !== null ||
            notificationData.salesleadmessage !== ''
          ) {
            this.props.navigation.navigate('LeadDetails', {
              salesLeadId: notificationData.salesleadmessage.salesleadid,
            });
          }
        }
        // EXPENSE CREATED/UPDATED
        else if (notificationType === 507) {
          if (
            notificationData.expense !== null ||
            notificationData.expense !== ''
          ) {
            this.props.navigation.navigate('SalesExpenseDetails', {
              pageHeading: 'Expense Details',
              expenseId: notificationData.expense.expenseid,
            });
          }
        }
        // EXPENSE APPROVED
        else if (notificationType === 508) {
          if (
            notificationData.expense !== null ||
            notificationData.expense !== ''
          ) {
            this.props.navigation.navigate('SalesExpenseDetails', {
              pageHeading: 'Expense Details',
              expenseId: notificationData.expense.expenseid,
            });
          }
        }
        // EXPENSE REJECTED
        else if (notificationType === 509) {
          if (
            notificationData.expense !== null ||
            notificationData.expense !== ''
          ) {
            this.props.navigation.navigate('SalesExpenseDetails', {
              pageHeading: 'Expense Details',
              expenseId: notificationData.expense.expenseid,
            });
          }
        }
      }
    }
    // SUPERVISOR
    else if (notificationType >= 601 && notificationType <= 700) {
      // USER IS SUPERVISOR USER
      if (
        notificationData.appusertype === 6 ||
        notificationData.appusertype === '6'
      ) {
        // NEW JOB FOR VERIFICATION
        if (notificationType === 601) {
          if (
            notificationData.order !== null ||
            notificationData.order !== ''
          ) {
            this.props.navigation.navigate('SupervisorJobs', {});
          }
        }
        // JOB REWORK
        else if (notificationType === 602) {
          if (
            notificationData.orderdetail !== null ||
            notificationData.orderdetail !== ''
          ) {
            this.props.navigation.navigate('SupervisorViewJobForRework', {
              orderDetailId: notificationData.orderdetail.orderdetailid,
              orderId: notificationData.orderdetail.orderid,
            });
          }
        }
        // JOB REOPENED
        else if (notificationType === 603) {
          if (
            notificationData.orderdetail !== null ||
            notificationData.orderdetail !== ''
          ) {
            this.props.navigation.navigate('SupervisorViewJobForReopen', {
              orderDetailId: notificationData.orderdetail.orderdetailid,
              orderId: notificationData.orderdetail.orderid,
            });
          }
        }
      }
    }
    // CUSTOMER
    else if (notificationType >= 701 && notificationType <= 800) {
      // USER IS SALES USER
      if (
        notificationData.usertype === 4 ||
        notificationData.usertype === '4'
      ) {
        // Pickup request CREATED/UPDATED
        if (notificationType === 701) {
          if (
            notificationData.calllog !== null ||
            notificationData.calllog !== ''
          ) {
            this.props.navigation.navigate('CustomerCollectionCallForm', {
              pageHeading: 'Edit Pickup Request',
              callLogId: notificationData.calllog.calllogid,
            });
          }
        }
        // DELIVERY CALL CREATED/UPDATED
        else if (notificationType === 702) {
          if (
            notificationData.calllog !== null ||
            notificationData.calllog !== ''
          ) {
          }
        }
        // COMPLAINT CREATED/UPDATED
        else if (notificationType === 703) {
          if (
            notificationData.calllog !== null ||
            notificationData.calllog !== ''
          ) {
            this.props.navigation.navigate('CustomerComplaintForm', {
              pageHeading: 'Edit Complaint',
              callLogId: notificationData.calllog.calllogid,
            });
          }
        }
        // LEAD CREATED/UPDATED
        else if (notificationType === 704) {
          if (
            notificationData.saleslead !== null ||
            notificationData.saleslead !== ''
          ) {
          }
        }
        // LEAD INTERACTION CREATED/UPDATED
        else if (notificationType === 705) {
          if (
            notificationData.salesleadinteraction !== null ||
            notificationData.salesleadinteraction !== ''
          ) {
          }
        }
      }
    }
  };

  render() {
    const skeletonLayoutItem = {
      width: screenWidth - 0,
      height: 65,
      borderRadius: 0,
      marginTop: 0,
      marginBottom: 0,
    };
    const skeletonLayoutItemSeperator = {
      width: screenWidth - 10,
      height: 1,
      borderRadius: 0,
      backgroundColor: seperator,
    };
    const skeletonLayout = [
      skeletonLayoutItem,
      skeletonLayoutItemSeperator,
      skeletonLayoutItem,
      skeletonLayoutItemSeperator,
      skeletonLayoutItem,
      skeletonLayoutItemSeperator,
      skeletonLayoutItem,
      skeletonLayoutItemSeperator,
      skeletonLayoutItem,
      skeletonLayoutItemSeperator,
      skeletonLayoutItem,
      skeletonLayoutItemSeperator,
      skeletonLayoutItem,
      skeletonLayoutItemSeperator,
      skeletonLayoutItem,
      skeletonLayoutItemSeperator,
      skeletonLayoutItem,
      skeletonLayoutItemSeperator,
      skeletonLayoutItem,
      skeletonLayoutItemSeperator,
      skeletonLayoutItem,
      skeletonLayoutItemSeperator,
    ];

    return (
      <View style={{flex: 1, backgroundColor: mainBgColor}}>
        <View style={[common.listingContainer]}>
          <Loader loading={this.state.transparentLoader} />
          <ListingSearchBar
            onChangeText={this.updateSearchText}
            onClear={this.updateSearchText}
            value={this.state.searchText}
            showLoading={this.state.textSearchLoading}
          />
          <SkeletonContent
            containerStyle={{flex: 1, width: screenWidth}}
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
                refreshing={this.state.isDataRefreshing}
                onRefresh={this.handleRefreshData}
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
  itemContainer: {
    // paddingVertical: 7,
    paddingHorizontal: 7,
    // borderBottomWidth: 1,
    // borderBottomColor: seperator
  },
  notificationImage: {
    width: 46,
    height: 46,
    borderRadius: 100,
    borderWidth: 1,
    borderColor: seperator,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  notificationTitle: {
    // color: primaryHexColor,
    color: '#58595b',
    fontWeight: 'bold',
  },
  notificationDescription: {
    fontSize: 12,
    color: '#58595b',
    // color: textMutedColor
  },
  notificationTime: {
    color: textMutedColor,
    fontSize: 11,
  },
});

const mapStateToProps = state => {
  return {
    notificationCount: state.DrawerNotificationBadgeCountReducer.count,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onNotificationUpdateCount: count =>
      dispatch(DrawerNotificationBadgeCount(count)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Notifications);
