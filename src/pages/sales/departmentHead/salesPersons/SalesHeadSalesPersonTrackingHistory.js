import React, {Component} from 'react';
import {Dimensions, Platform, StyleSheet, Text, View} from 'react-native';

import {common} from '../../../../assets/style';

import {
  mainBgColor,
  primaryBlueHexColor,
  seperator,
  textMutedColor,
} from '../../../../constants/themeColors';

import Api from '../../../../provider/Api';
import Dataprovider from '../../../../provider/Dataprovider';
import Loader from '../../../../provider/Loader';

import NoRecordsFound from '../../../../components/NoRecordsFound';

import moment from 'moment';

import {
  mapStyle,
  skeletonPlaceholderProps,
} from '../../../../constants/defaultValues';

import CalendarStrip from 'react-native-calendar-strip';
import SkeletonContent from '../../../../components/SkeletonContent';

let MapView, Polyline, Marker, PROVIDER_GOOGLE;

if (Platform.OS !== 'web') {
  MapView = require('react-native-maps').default;
  Polyline = require('react-native-maps').Polyline;
  Marker = require('react-native-maps').Marker;
  PROVIDER_GOOGLE = require('react-native-maps').PROVIDER_GOOGLE;
}

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

export default class SalesHeadSalesPersonTrackingHistory extends Component {
  api = new Api();
  dataProvider = new Dataprovider();

  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      transparentLoader: false,
      userId:
        typeof this.props.navigation
          .dangerouslyGetParent()
          .getParam('userId') !== 'undefined'
          ? parseInt(
              this.props.navigation.dangerouslyGetParent().getParam('userId'),
            )
          : 0,
      selectedDate: moment(),
      coordinates: [],
      region: [],
      statingpointformarker: [],
      endingpointformarker: [],
      markers: [],
    };
  }

  componentDidMount() {
    this.getData();
  }

  reloadPageData = () => {
    this.setState(
      {
        transparentLoader: true,
      },
      this.getData,
    );
  };

  getData() {
    let formData = new FormData();
    formData.append('userid', this.state.userId);
    formData.append(
      'date',
      moment(this.state.selectedDate).format('YYYY-MM-DD'),
    );

    let options = {
      api: 'v_1/location-tracking/get-coordinates',
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
        transparentLoader: false,
      });

      if (data.status_code === 200) {
        let responseData = data.response.data;

        this.setState({
          coordinates: responseData.coordinates,
          region: responseData.region,
          statingpointformarker: responseData.statingpointformarker,
          endingpointformarker: responseData.endingpointformarker,
          markers: responseData.markers,
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

  onDateSelected = date => {
    this.setState(
      {
        transparentLoader: true,
        selectedDate: date,
      },
      this.getData,
    );
  };

  render() {
    const skeletonLayout = [
      {
        width: screenWidth,
        height: 100,
        borderBottomWidth: 1,
        borderBottomColor: seperator,
        marginTop: -12,
      },
      {
        // margin: 10,
        width: screenWidth,
        height: screenHeight - 210,
      },
    ];

    return (
      <View style={{flex: 1, backgroundColor: mainBgColor}}>
        <View style={[common.cardContainer, {overflow: 'hidden'}]}>
          <Loader loading={this.state.transparentLoader} />
          <SkeletonContent
            containerStyle={{flex: 1, width: screenWidth.width}}
            layout={skeletonLayout}
            isLoading={this.state.loading}
            duration={skeletonPlaceholderProps.duration}
            animationType={skeletonPlaceholderProps.animationType}
            animationDirection={skeletonPlaceholderProps.animationDirection}
            boneColor={skeletonPlaceholderProps.boneColor}
            highlightColor={skeletonPlaceholderProps.highlightColor}>
            <CalendarStrip
              calendarAnimation={{type: 'sequence', duration: 100}}
              daySelectionAnimation={{
                type: 'border',
                duration: 200,
                borderWidth: 1,
                borderHighlightColor: 'white',
              }}
              style={{
                height: 100,
                paddingTop: 10,
                paddingBottom: 10,
                marginTop: -12,
              }}
              calendarHeaderStyle={{color: 'white'}}
              calendarColor={primaryBlueHexColor}
              dateNumberStyle={{color: 'white'}}
              dateNameStyle={{color: 'white'}}
              highlightDateNumberStyle={{color: 'yellow'}}
              highlightDateNameStyle={{color: 'yellow'}}
              disabledDateNameStyle={{color: 'grey'}}
              disabledDateNumberStyle={{color: 'grey'}}
              iconContainer={{flex: 0.1}}
              selectedDate={this.state.selectedDate}
              onDateSelected={this.onDateSelected}
            />

            {!this.state.loading && this.state.coordinates.length !== 0 ? (
              <View>
                <View style={styles.mapcontainer}>
                  {Platform.OS !== 'web' ? (
                    <MapView
                      style={styles.map}
                      region={this.state.region}
                      provider={PROVIDER_GOOGLE}
                      customMapStyle={mapStyle}>
                      {this.state.markers.map((marker, index) => {
                        return (
                          <Marker
                            coordinate={marker.coordinate}
                            title={marker.title}
                            description={marker.description}
                            pinColor={marker.pincolor}
                            key={index}
                          />
                        );
                      })}
                      <Polyline
                        coordinates={this.state.coordinates}
                        strokeWidth={4}
                        strokeColor="rgba(255,140,0,0.8)"
                      />
                    </MapView>
                  ) : (
                    <Text style={{color: textMutedColor}}>
                      Map can only be loaded in android / ios device.
                    </Text>
                  )}
                </View>
              </View>
            ) : null}
            {!this.state.loading && this.state.coordinates.length === 0 ? (
              <NoRecordsFound onPress={this.reloadPageData} />
            ) : null}
          </SkeletonContent>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  mapcontainer: {
    ...StyleSheet.absoluteFillObject,
    height: screenHeight - 210,
    width: screenWidth,
    justifyContent: 'center',
    alignItems: 'center',
    // margin: 10,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});
