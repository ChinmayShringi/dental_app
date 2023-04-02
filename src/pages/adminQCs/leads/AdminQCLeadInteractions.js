import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Dimensions,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';

import {Fab, Badge} from 'native-base';

import {common, badgeCssXs, modalLayout} from '../../../assets/style';

import {
  primaryBlueHexColor,
  primaryHexColor,
  seperator,
  textMutedColor,
  mainBgColor,
  backgroundGrey,
  fontColor,
  circleBgColor,
} from '../../../constants/themeColors';

import Api from '../../../provider/Api';
import Dataprovider from '../../../provider/Dataprovider';
import Loader from '../../../provider/Loader';

import NoRecordsFound from '../../../components/NoRecordsFound';
import moment from 'moment';

import Timeline from 'react-native-timeline-flatlist';

import {MaterialIcons} from '@expo/vector-icons';
import Icon from 'react-native-vector-icons/FontAwesome';

import {skeletonPlaceholderProps} from '../../../constants/defaultValues';
import SkeletonContent from 'react-native-skeleton-content';

const screenWidth = Dimensions.get('window').width;

export default class AdminQCLeadInteractions extends Component {
  api = new Api();
  dataProvider = new Dataprovider();

  constructor(props) {
    super(props);

    this.onEventPress = this.onEventPress.bind(this);
    this.renderDetail = this.renderDetail.bind(this);

    this.state = {
      loading: true,
      salesLeadId:
        typeof this.props.navigation
          .dangerouslyGetParent()
          .getParam('salesLeadId') !== 'undefined'
          ? parseInt(
              this.props.navigation
                .dangerouslyGetParent()
                .getParam('salesLeadId'),
            )
          : 0,
      saleslead: null,
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

  getData() {
    const formData = new FormData();
    formData.append('search', '');
    formData.append('salesleadid', this.state.salesLeadId);

    let options = {
      api: 'v_1/adminqcs/leads/lead-interactions/load',
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'multipart/form-data',
      },
      data: formData,
      refreshOn401: true,
    };

    this.api.callPostApi(options).then(data => {
      this.setState({loading: false});

      if (data.status_code === 200) {
        let responseData = data.response.data;

        this.setState({
          saleslead: responseData.saleslead,
          data: responseData.leadinteractions,
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
    if (rowData.description)
      desc = (
        <View style={styles.descriptionContainer}>
          <Text style={[styles.textDescription]}>{rowData.description}</Text>
        </View>
      );

    return (
      <View style={styles.dataContainer}>
        {title}
        {desc}
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            paddingVertical: 5,
            paddingHorizontal: 10,
          }}>
          <Badge style={badgeCssXs(rowData.statustextcolor)}>
            <Text style={common.bagdeTextXs}>{rowData.statustext}</Text>
          </Badge>
          {rowData.status === 4 ? (
            <Text style={{fontSize: 12}}>
              on{' '}
              <Text style={[{color: fontColor}, common.fontBold]}>
                {rowData.followedupondisplaydate}
              </Text>
            </Text>
          ) : null}
        </View>
      </View>
    );
  }

  render() {
    const skeletonLayout = [
      {
        width: 2,
        height: 230,
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
        top: 124,
        left: 103,
      },
      {
        width: 15,
        height: 15,
        borderRadius: 20,
        position: 'absolute',
        top: 234,
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
        height: 70,
        borderRadius: 20,
        marginTop: -20,
        marginLeft: 130,
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
        height: 70,
        borderRadius: 20,
        marginTop: -20,
        marginLeft: 130,
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
        height: 70,
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
    fontSize: 13,
    fontWeight: 'bold',
    paddingLeft: 10,
    color: fontColor,
  },
  descriptionContainer: {
    flexDirection: 'row',
  },
  textDescription: {
    marginLeft: 10,
    color: textMutedColor,
    fontSize: 12,
  },
});
