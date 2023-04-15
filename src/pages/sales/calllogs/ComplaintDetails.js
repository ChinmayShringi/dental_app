import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Linking,
  Dimensions,
} from 'react-native';

import {
  common,
  commonLabelDescription,
  badgeColorCode,
  mapWithDetailsLayout,
} from '../../../assets/style';

import Api from '../../../provider/Api';
import Dataprovider from '../../../provider/Dataprovider';
import Loader from '../../../provider/Loader';

import NotFound from '../../../components/NotFound';

import {
  primaryHexColor,
  textMutedColor,
  successHexColor,
  primaryBlueHexColor,
  seperator,
  mainBgColor,
  backgroundGrey,
  fontColor,
  circleBgColor,
} from '../../../constants/themeColors';

import Icon from 'react-native-vector-icons/FontAwesome';

import {
  skeletonPlaceholderProps,
  regionCoordinates,
  regionCoordinatesDeltas,
  mapStyle,
} from '../../../constants/defaultValues';

import {loggedInUserDetails} from '../../../redux/actions/loggedInUserDetails';
import {connect} from 'react-redux';
import SkeletonContent from '../../../components/SkeletonContent';

let MapView, Marker, PROVIDER_GOOGLE;

if (Platform.OS !== 'web') {
  MapView = require('react-native-maps').default;
  Marker = require('react-native-maps').Marker;
  PROVIDER_GOOGLE = require('react-native-maps').PROVIDER_GOOGLE;
}

// import getDirections from 'react-native-google-maps-directions';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

class ComplaintDetails extends Component {
  api = new Api();
  dataProvider = new Dataprovider();

  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      callLogId:
        typeof this?.props?.navigation?.state?.params?.callLogId !== 'undefined'
          ? parseInt(this?.props?.navigation?.state?.params?.callLogId)
          : 0,
      calllog: null,
      region: regionCoordinates,
      markerPosition: null,
    };
  }

  componentDidMount() {
    this.getData();
  }

  reloadPageData = () => {
    this.setState({loading: true}, this.getData);
  };

  getData() {
    let formData = new FormData();
    formData.append('calllogid', this.state.callLogId);

    let options = {
      api: 'v_1/sales/complaints/view',
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
        let calllog = responseData.calllog;
        let latitude = null;
        let longitude = null;

        if (calllog !== null) {
          if (
            typeof calllog.latitude !== 'undefined' &&
            calllog.latitude !== null
          ) {
            latitude = parseFloat(calllog.latitude);
          }
          if (
            typeof calllog.longitude !== 'undefined' &&
            calllog.longitude !== null
          ) {
            longitude = parseFloat(calllog.longitude);
          }
        }

        this.setState({
          calllog: calllog,
        });

        if (latitude !== null && longitude !== null) {
          this.setState({
            region: {
              latitude: latitude,
              longitude: longitude,
              latitudeDelta: regionCoordinatesDeltas.latitudeDelta,
              longitudeDelta: regionCoordinatesDeltas.longitudeDelta,
            },
            markerPosition: {
              latitude: latitude,
              longitude: longitude,
            },
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
    });
  }

  handleGetDirections = () => {
    // if(this.state.markerPosition !== null) {

    //     const data = {
    //         source: {},
    //         destination: this.state.markerPosition,
    //         params: [
    //             {
    //                 key: "travelmode",
    //                 value: "driving"        // may be "walking", "bicycling" or "transit" as well
    //             },
    //             {
    //                 key: "dir_action",
    //                 value: "navigate"       // this instantly initializes navigation using the given travel mode
    //             }
    //         ],
    //     }

    //     getDirections(data)
    // }
    // else {

    //     this.api.showPermissionRelatedError(
    //             "Request Failed!",
    //             "Required data are missing. Please try after sometime.",
    //             "Ok"
    //         );
    // }

    const url = this.state.calllog.googlemapdirectionurl;
    return Linking.canOpenURL(url).then(supported => {
      if (!supported) {
        this.api.showPermissionRelatedError(
          'Request Failed!',
          'Required data are missing. Please try after some time.',
          'Ok',
        );
      } else {
        return Linking.openURL(url);
      }
    });
  };

  render() {
    const skeletonLayout = [
      {
        width: screenWidth,
        height: screenHeight / 2 - 100,
        borderBottomWidth: 1,
        borderBottomColor: seperator,
      },
      {
        width: screenWidth,
        height: 90,
        borderBottomWidth: 1,
        borderBottomColor: seperator,
      },
      {
        width: screenWidth,
        height: 70,
        borderBottomWidth: 1,
        borderBottomColor: seperator,
      },
      {
        marginTop: 15,
        width: 150,
        height: 22,
        borderRadius: 4,
        marginBottom: 15,
        marginLeft: 15,
      },
      {
        width: 200,
        height: 16,
        borderRadius: 4,
        marginTop: 0,
        marginBottom: 8,
        marginLeft: 15,
      },
      {
        width: 240,
        height: 16,
        borderRadius: 4,
        marginTop: 0,
        marginBottom: 8,
        marginLeft: 15,
      },
      {
        width: 250,
        height: 16,
        borderRadius: 4,
        marginTop: 0,
        marginBottom: 8,
        marginLeft: 15,
      },
      {
        width: 260,
        height: 16,
        borderRadius: 4,
        marginTop: 0,
        marginBottom: 8,
        marginLeft: 15,
      },
      // {
      //     width: 240,
      //     height: 16,
      //     borderRadius: 4,
      //     marginTop: 0,
      //     marginBottom: 8,
      //     marginLeft: 15
      // },
      // {
      //     width: 200,
      //     height: 16,
      //     borderRadius: 4,
      //     marginTop: 0,
      //     marginBottom: 8,
      //     marginLeft: 15
      // },
    ];

    return (
      <View style={{flex: 1, backgroundColor: mainBgColor}}>
        <View
          style={[common.cardContainer, {overflow: 'hidden', paddingTop: 0}]}>
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
            {this.state.calllog !== null && !this.state.loading ? (
              <ScrollView>
                <View style={{flex: 1, flexDirection: 'row'}}>
                  <View style={mapWithDetailsLayout.mapcontainer}>
                    {Platform.OS !== 'web' ? (
                      <MapView
                        style={mapWithDetailsLayout.map}
                        region={this.state.region}
                        provider={PROVIDER_GOOGLE}
                        customMapStyle={mapStyle}>
                        {this.state.markerPosition !== null ? (
                          <Marker
                            coordinate={this.state.markerPosition}
                            title={
                              this.state.calllog !== null
                                ? this.state.calllog.customername
                                : 'Customer name'
                            }
                            pinColor={successHexColor}
                          />
                        ) : null}
                      </MapView>
                    ) : (
                      <Text style={{color: textMutedColor}}>
                        Map can only be loaded in android / ios device.
                      </Text>
                    )}
                  </View>
                  <View style={mapWithDetailsLayout.detailsContainer}>
                    <View style={mapWithDetailsLayout.customerDetailsBlock}>
                      <Text style={mapWithDetailsLayout.customerName}>
                        {this.state.calllog.customername}
                      </Text>
                      <View
                        style={mapWithDetailsLayout.addressWithIconContainer}>
                        <Icon
                          name="phone"
                          size={16}
                          style={[
                            mapWithDetailsLayout.addressWithIconContainerIcon,
                          ]}
                        />
                        <View>
                          <Text
                            style={[
                              mapWithDetailsLayout.addressWithIconContainerText,
                            ]}>
                            {this.state.calllog.customerphoneno}
                          </Text>
                        </View>
                      </View>
                      <View
                        style={mapWithDetailsLayout.addressWithIconContainer}>
                        <Icon
                          name="map-marker"
                          size={16}
                          style={[
                            mapWithDetailsLayout.addressWithIconContainerIcon,
                          ]}
                        />
                        <View>
                          <Text
                            style={[
                              mapWithDetailsLayout.addressWithIconContainerText,
                            ]}>
                            {this.state.calllog.displaylocation}
                          </Text>
                        </View>
                      </View>
                    </View>
                    <View style={mapWithDetailsLayout.buttonsBlockContainer}>
                      <TouchableOpacity
                        style={mapWithDetailsLayout.buttonContainer}
                        onPress={() =>
                          Linking.openURL(
                            'tel:' + this.state.calllog.customerphoneno,
                          )
                        }
                        Google>
                        <Icon
                          name="phone"
                          size={30}
                          style={mapWithDetailsLayout.buttonIcon}
                        />
                        <Text style={mapWithDetailsLayout.buttonText}>
                          Call
                        </Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        style={mapWithDetailsLayout.buttonContainer}
                        onPress={this.handleGetDirections}>
                        <Icon
                          name="location-arrow"
                          size={30}
                          style={mapWithDetailsLayout.buttonIcon}
                        />
                        <Text style={mapWithDetailsLayout.buttonText}>
                          Directions
                        </Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        style={mapWithDetailsLayout.buttonContainer}
                        onPress={() => {
                          this.props.navigation.push('ComplaintForm', {
                            pageHeading: 'Edit Complaint',
                            callLogId: this.state.callLogId,
                          });
                        }}>
                        <Icon
                          name="pencil"
                          size={30}
                          style={mapWithDetailsLayout.buttonIcon}
                        />
                        <Text style={mapWithDetailsLayout.buttonText}>
                          Edit
                        </Text>
                      </TouchableOpacity>
                    </View>
                    <View
                      style={{
                        flex: 1,
                        paddingHorizontal: 15,
                        paddingVertical: 10,
                      }}>
                      <Text style={commonLabelDescription.blockTitle}>
                        Complaint Details
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
                            Id
                          </Text>
                        </View>
                        <View style={commonLabelDescription.listSeperator}>
                          <Text style={commonLabelDescription.labelText}>
                            :
                          </Text>
                        </View>
                        <View style={styles.descriptionContainer}>
                          <Text style={commonLabelDescription.labelValue}>
                            #{this.state.calllog.calllogid}
                          </Text>
                        </View>
                      </View>
                      {this.props.user !== null &&
                      this.props.user.isdepartmenthead ? (
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
                              Sales Person
                            </Text>
                          </View>
                          <View style={commonLabelDescription.listSeperator}>
                            <Text style={commonLabelDescription.labelText}>
                              :
                            </Text>
                          </View>
                          <View style={styles.descriptionContainer}>
                            {this.state.calllog.salespersonname !== '' &&
                            this.state.calllog.salespersonname !== null ? (
                              <Text style={commonLabelDescription.labelValue}>
                                {this.state.calllog.salespersonname}
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
                      ) : null}
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
                            Call Date
                          </Text>
                        </View>
                        <View style={commonLabelDescription.listSeperator}>
                          <Text style={commonLabelDescription.labelText}>
                            :
                          </Text>
                        </View>
                        <View style={styles.descriptionContainer}>
                          <Text style={commonLabelDescription.labelValue}>
                            {this.state.calllog.displaycalldatetime}
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
                              badgeColorCode(this.state.calllog.statuscolor),
                            ]}>
                            {this.state.calllog.statustext}
                          </Text>
                        </View>
                      </View>
                      {/* <View style={[commonLabelDescription.listContainer, styles.listContainer]}>
                                                <View style={[commonLabelDescription.listLabelContainer, styles.listLabelContainer]}>
                                                    <Text style={commonLabelDescription.labelText}>Parcel Collection Status</Text> 
                                                </View>
                                                <View style={commonLabelDescription.listSeperator}>
                                                    <Text style={commonLabelDescription.labelText}>:</Text> 
                                                </View>
                                                <View style={styles.descriptionContainer}>
                                                    <Text style={badgeColorCode(this.state.calllog.statuscolor)}>{this.state.calllog.parcelcollecationstatustext}</Text>
                                                </View>
                                            </View> */}
                    </View>
                  </View>
                </View>
              </ScrollView>
            ) : (
              <View style={{flex: 1, padding: 10}}>
                <NotFound onPress={this.reloadPageData} />
              </View>
            )}
          </SkeletonContent>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  blockTitle: {
    fontSize: 17,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  listContainer: {
    paddingLeft: 10,
  },
  listLabelContainer: {
    width: 80,
  },
  descriptionContainer: {
    width: screenWidth - 130,
  },
});

const mapStateToProps = state => {
  return {
    user: state.loggedInUserDetailsReducer.user,
  };
};

export default connect(mapStateToProps, null)(ComplaintDetails);
