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
  primaryHexColor,
  seperator,
  textMutedColor,
} from '../../constants/themeColors';

import {common} from '../../assets/style';

import NoRecordsFound from '../../components/NoRecordsFound';

import Api from '../../provider/Api';
import Dataprovider from '../../provider/Dataprovider';
import Loader from '../../provider/Loader';

import SkeletonContent from 'react-native-skeleton-content';
import {skeletonPlaceholderProps} from '../../constants/defaultValues';

import moment from 'moment';

// import * as TaskManager from 'expo-task-manager';
import {locationTrackingProps} from '../../constants/defaultValues';
const LOCATION_TASK_NAME = locationTrackingProps.LOCATION_TASK_NAME;

const screenWidth = Dimensions.get('window').width;

export default class LocationTrackingTest extends Component {
  api = new Api();
  dataProvider = new Dataprovider();

  constructor(props) {
    super(props);
    this.state = {
      data: [],
      isDataRefreshing: false,
      loading: true,
      transparentLoader: false,
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
    this.dataProvider.getLocationCoordinatesTest().then(dataTest => {
      let objTest = dataTest !== null ? dataTest : [];
      this.setState({
        data: objTest.reverse(),
        transparentLoader: false,
        isDataRefreshing: false,
        loading: false,
      });
    });

    (async () => {
      // let isRegistered = await TaskManager.isTaskRegisteredAsync(
      //   LOCATION_TASK_NAME,
      // );
      // console.log(isRegistered);
    })();
  }

  handleRefreshData = () => {
    this.setState(
      {
        isDataRefreshing: true,
      },
      this.getData,
    );
  };

  renderItem = ({item}) => {
    return (
      <View style={[styles.itemContainer, {backgroundColor: '#fff'}]}>
        <TouchableOpacity
          activeOpacity={0.5}
          onPress={() => {
            this.redirectOnNotificationDetailPage(item);
          }}>
          <Text style={styles.notificationTitle}>{item.message}</Text>
          <Text style={styles.notificationDescription}>
            Latitude: {item.latitude}
          </Text>
          <Text style={styles.notificationDescription}>
            Longitude: {item.longitude}
          </Text>
          <Text style={styles.notificationDescription}>
            Accuracy: {item.accuracy}
          </Text>
          <Text style={styles.notificationTime}>
            {moment(item.time).format('MMMM Do YYYY, h:mm:ss a')}
          </Text>
        </TouchableOpacity>
      </View>
    );
  };

  handleClearNotifications = () => {
    this.setState({transparentLoader: true});
    this.dataProvider.deleteLocationCoordinatesTest().then(isDeleted => {
      if (isDeleted) {
        this.setState({
          data: [],
          isDataRefreshing: false,
          loading: false,
          transparentLoader: false,
        });
      } else {
        this.api.showErrorMessage('Unable to clear', null);
      }
    });
  };

  redirectOnNotificationDetailPage = item => {
    console.log('Do something here');
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
      <View style={{flex: 1}}>
        <View style={[common.listingContainer, {padding: 0}]}>
          <Loader loading={this.state.transparentLoader} />
          <SkeletonContent
            containerStyle={{flex: 1, width: screenWidth - 10}}
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
    paddingVertical: 7,
    paddingHorizontal: 7,
    borderBottomWidth: 1,
    borderBottomColor: seperator,
  },
  notificationTitle: {
    color: primaryHexColor,
    fontWeight: 'bold',
  },
  notificationDescription: {
    fontSize: 13,
    // color: textMutedColor
  },
  notificationTime: {
    color: textMutedColor,
    fontSize: 11,
  },
});
