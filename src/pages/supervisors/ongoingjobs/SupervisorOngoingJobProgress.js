import React, {Component} from 'react';
import {Dimensions, RefreshControl, StyleSheet, Text, View} from 'react-native';

import {Badge} from 'native-base';

import {badgeCssXs, common} from '../../../assets/style';

import {
  backgroundGrey,
  fontColor,
  mainBgColor,
  seperator,
  textMutedColor,
} from '../../../constants/themeColors';

import Api from '../../../provider/Api';
import Dataprovider from '../../../provider/Dataprovider';

import NoRecordsFound from '../../../components/NoRecordsFound';

import Timeline from 'react-native-timeline-flatlist';

import SkeletonContent from 'react-native-skeleton-content';
import {skeletonPlaceholderProps} from '../../../constants/defaultValues';

const screenWidth = Dimensions.get('window').width;

export default class SupervisorOngoingJobProgress extends Component {
  api = new Api();
  dataProvider = new Dataprovider();

  constructor(props) {
    super(props);

    this.onEventPress = this.onEventPress.bind(this);
    this.renderDetail = this.renderDetail.bind(this);

    this.state = {
      loading: true,
      isRefreshing: false,
      orderDetailId:
        typeof this.props.navigation
          .dangerouslyGetParent()
          .getParam('orderDetailId') !== 'undefined'
          ? parseInt(
              this.props.navigation
                .dangerouslyGetParent()
                .getParam('orderDetailId'),
            )
          : 0,
      orderDetail: null,
      data: [],
    };
  }

  componentDidMount() {
    this.getData();
  }

  reloadPageData = () => {
    this.setState(
      {
        loading: true,
      },
      this.getData,
    );
  };

  onRefresh = () => {
    this.setState(
      {
        isRefreshing: true,
      },
      this.getData,
    );
  };

  getData() {
    const formData = new FormData();
    formData.append('search', '');
    formData.append('orderdetailid', this.state.orderDetailId);

    let options = {
      api: 'v_1/supervisors/jobs/ongoings/job-progress/load',
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
        isRefreshing: false,
      });

      if (data.status_code === 200) {
        let responseData = data.response.data;

        this.setState({
          orderDetail: responseData.orderdetail,
          data: responseData.productionprocess,
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

  onEventPress(data) {
    console.log(data);
  }

  renderDetail(rowData, sectionID, rowID) {
    let title = <Text style={[styles.title]}>{rowData.title}</Text>;
    var desc = null;
    var assignedto = null;
    var estimatedTime = null;
    var usedTime = null;
    var commentsForUser = null;
    var commentsByUser = null;
    if (rowData.task) {
      desc = (
        <View style={styles.descriptionContainer}>
          <Text style={[styles.textDescription]}>{rowData.task}</Text>
        </View>
      );
    }
    if (rowData.assignedto) {
      assignedto = (
        <View style={styles.listContainer}>
          <Text style={[styles.listContainerLable]}>Assigned To: </Text>
          <Text style={[styles.listContainerDescription]}>
            {rowData.assignedto}
          </Text>
        </View>
      );
    }
    if (rowData.estimatedtime) {
      estimatedTime = (
        <View style={styles.listContainer}>
          <Text style={[styles.listContainerLable]}>Estimated Time: </Text>
          <Text style={[styles.listContainerDescription]}>
            {rowData.estimatedtime}
          </Text>
        </View>
      );
    }
    if (rowData.usedtime) {
      usedTime = (
        <View style={styles.listContainer}>
          <Text style={[styles.listContainerLable]}>Used Time: </Text>
          <Text style={[styles.listContainerDescription]}>
            {rowData.usedtime}
          </Text>
        </View>
      );
    }
    if (rowData.commentsforuser) {
      commentsForUser = (
        <View style={styles.listContainer}>
          <Text style={[styles.listContainerLable]}>Comments For User: </Text>
          <Text style={[styles.listContainerDescription]}>
            {rowData.commentsforuser}
          </Text>
        </View>
      );
    }
    if (rowData.commentsbyuser) {
      commentsByUser = (
        <View style={styles.listContainer}>
          <Text style={[styles.listContainerLable]}>Comment By User: </Text>
          <Text style={[styles.listContainerDescription]}>
            {rowData.commentsbyuser}
          </Text>
        </View>
      );
    }

    return (
      <View style={styles.dataContainer}>
        {title}
        {desc}
        {assignedto}
        {estimatedTime}
        {usedTime}
        {commentsForUser}
        {commentsByUser}
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            paddingVertical: 5,
            paddingHorizontal: 10,
          }}>
          <Badge style={badgeCssXs(rowData.statuscolor)}>
            <Text style={common.bagdeTextXs}>{rowData.statustext}</Text>
          </Badge>
        </View>
      </View>
    );
  }

  render() {
    const skeletonLayout = [
      {
        width: 2,
        height: 340,
        borderRadius: 20,
        position: 'absolute',
        top: 20,
        left: 110,
      },
      {
        width: 15,
        height: 15,
        borderRadius: 20,
        position: 'absolute',
        top: 20,
        left: 103,
      },
      {
        width: 15,
        height: 15,
        borderRadius: 20,
        position: 'absolute',
        top: 190,
        left: 103,
      },
      {
        width: 15,
        height: 15,
        borderRadius: 20,
        position: 'absolute',
        top: 350,
        left: 103,
      },
      {
        width: 80,
        height: 35,
        borderRadius: 20,
        marginTop: 20,
        marginLeft: 10,
      },
      {
        width: screenWidth - 145,
        height: 150,
        borderRadius: 20,
        marginTop: -20,
        marginLeft: 130,
      },
      {
        width: 80,
        height: 35,
        borderRadius: 20,
        marginTop: 0,
        marginLeft: 10,
      },
      {
        width: screenWidth - 145,
        height: 150,
        borderRadius: 20,
        marginTop: -20,
        marginLeft: 130,
      },
      {
        width: 80,
        height: 35,
        borderRadius: 20,
        marginTop: 0,
        marginLeft: 10,
      },
      {
        width: screenWidth - 145,
        height: 130,
        borderRadius: 20,
        marginTop: -20,
        marginLeft: 130,
      },
    ];

    return (
      <View style={{flex: 1, backgroundColor: mainBgColor}}>
        <View
          style={[
            common.cardContainer,
            {
              backgroundColor: backgroundGrey,
              overflow: 'hidden',
              paddingTop: 0,
            },
          ]}>
          {/* <Loader loading={this.state.loading}/> */}
          <SkeletonContent
            containerStyle={{flex: 1, width: screenWidth.width}}
            layout={skeletonLayout}
            isLoading={this.state.loading}
            duration={skeletonPlaceholderProps.duration}
            animationType={skeletonPlaceholderProps.animationType}
            animationDirection={skeletonPlaceholderProps.animationDirection}
            boneColor={skeletonPlaceholderProps.boneColor}
            highlightColor={skeletonPlaceholderProps.highlightColor}>
            {!this.state.loading && this.state.data.length !== 0 ? (
              <View style={styles.container}>
                <Timeline
                  style={styles.list}
                  data={this.state.data}
                  circleSize={14}
                  circleColor={seperator}
                  lineColor={seperator}
                  timeContainerStyle={{
                    minWidth: 50,
                    maxWidth: 75,
                    marginTop: 0,
                  }}
                  timeStyle={styles.timeStyle}
                  descriptionStyle={{color: textMutedColor}}
                  options={{
                    style: {paddingTop: 5},
                    refreshControl: (
                      <RefreshControl
                        refreshing={this.state.isRefreshing}
                        onRefresh={this.onRefresh}
                      />
                    ),
                  }}
                  innerCircle={'dot'}
                  onEventPress={this.onEventPress}
                  renderDetail={this.renderDetail}
                />
              </View>
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
  container: {
    flex: 1,
    padding: 15,
    margin: 0,
  },
  list: {
    flex: 1,
    marginTop: 0,
  },
  timeStyle: {
    textAlign: 'center',
    backgroundColor: '#ff9797',
    color: '#fff',
    padding: 2,
    borderRadius: 13,
    fontSize: 12,
  },
  dataContainer: {
    flex: 1,
    backgroundColor: '#fff',
    paddingVertical: 5,
    paddingHorizontal: 0,
    borderRadius: 8,
  },
  title: {
    fontSize: 14,
    fontWeight: 'bold',
    paddingLeft: 10,
  },
  descriptionContainer: {
    flexDirection: 'row',
  },
  textDescription: {
    marginLeft: 10,
    color: textMutedColor,
    fontSize: 12,
  },
  listContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginLeft: 10,
    marginRight: 10,
    width: screenWidth - 165,
  },
  listContainerLable: {
    fontSize: 12,
    fontWeight: 'bold',
    color: fontColor,
  },
  listContainerDescription: {
    flex: 1,
    fontSize: 12,
    width: '100%',
  },
});
