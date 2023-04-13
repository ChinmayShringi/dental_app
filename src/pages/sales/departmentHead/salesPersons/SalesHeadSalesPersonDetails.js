import React, {Component} from 'react';
import {
  Dimensions,
  Linking,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import {callLogCardLayout, common} from '../../../../assets/style';

import Api from '../../../../provider/Api';
import Dataprovider from '../../../../provider/Dataprovider';

import NotFound from '../../../../components/NotFound';

import {
  backgroundGrey,
  circleBgColor,
  fontColor,
  mainBgColor,
  primaryBlueHexColor,
  primaryHexColor,
  primaryPurpleHexColor,
  successHexColor,
} from '../../../../constants/themeColors';

// import {MaterialIcons} from '@expo/vector-icons';

import {Avatar} from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';

import {skeletonPlaceholderProps} from '../../../../constants/defaultValues';

const screenWidth = Dimensions.get('window').width;

import {connect} from 'react-redux';
import SkeletonContent from '../../../../components/SkeletonContent';

class SalesHeadSalesPersonDetails extends Component {
  api = new Api();
  dataProvider = new Dataprovider();

  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      userId:
        typeof this.props.navigation
          .dangerouslyGetParent()
          .getParam('userId') !== 'undefined'
          ? parseInt(
              this.props.navigation.dangerouslyGetParent().getParam('userId'),
            )
          : 0,
      user: null,
      salescall: 0,
      totalabsent: 0,
      totalpresent: 0,
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
    formData.append('userid', this.state.userId);

    let options = {
      api: 'v_1/sales/sales-persons/view',
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
          user: responseData.user,
          salescall: responseData.salescall,
          totalabsent: responseData.totalabsent,
          totalpresent: responseData.totalpresent,
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

  render() {
    const skeletonLayout = [
      {
        marginLeft: screenWidth - 55,
        width: 25,
        height: 24,
        borderRadius: 4,
        marginTop: -4,
      },
      {
        width: 150,
        height: 150,
        borderRadius: 150,
        marginLeft: screenWidth / 2 - 90,
        marginBottom: 15,
      },
      {
        width: 150,
        height: 20,
        borderRadius: 4,
        marginLeft: screenWidth / 2 - 90,
        marginBottom: 5,
      },
      {
        width: 130,
        height: 14,
        marginLeft: screenWidth / 2 - 80,
        borderRadius: 4,
        marginTop: 0,
        marginBottom: 5,
      },
      // {
      //     width: 200,
      //     height: 14,
      //     marginLeft: (screenWidth / 2) - 110,
      //     borderRadius: 4,
      //     marginBottom: 5,
      // },
      // {
      //     width: 120,
      //     height: 14,
      //     borderRadius: 4,
      //     marginLeft: (screenWidth / 2) - 70,
      //     marginBottom: 0,
      // },
      {
        width: screenWidth - 30,
        height: 1,
        marginTop: 12,
        marginBottom: 15,
      },
      {
        width: screenWidth - 150,
        height: 16,
        marginLeft: 10,
        borderRadius: 4,
        marginBottom: 5,
      },
      {
        width: screenWidth - 250,
        height: 16,
        marginLeft: 10,
        borderRadius: 4,
        marginBottom: 5,
      },
      {
        width: screenWidth - 50,
        height: 16,
        marginLeft: 10,
        borderRadius: 4,
        marginBottom: 15,
      },
      {
        width: screenWidth - 50,
        height: 190,
        marginTop: 5,
        marginLeft: 10,
        borderRadius: 8,
        marginBottom: 15,
      },
    ];

    return (
      <View style={{flex: 1, backgroundColor: mainBgColor}}>
        <View style={[common.cardContainer]}>
          {/* <NavigationEvents onDidFocus={() => this.getFormData() } /> */}
          {/* <Loader loading={this.state.loading}/> */}
          <ScrollView contentContainerStyle={{flexGrow: 1}}>
            <View
              style={[
                common.card,
                {margin: 0, borderRadius: 0, paddingTop: 5},
              ]}>
              <SkeletonContent
                containerStyle={{flex: 1, width: screenWidth.width}}
                layout={skeletonLayout}
                isLoading={this.state.loading}
                duration={skeletonPlaceholderProps.duration}
                animationType={skeletonPlaceholderProps.animationType}
                animationDirection={skeletonPlaceholderProps.animationDirection}
                boneColor={skeletonPlaceholderProps.boneColor}
                highlightColor={skeletonPlaceholderProps.highlightColor}>
                {this.state.user !== null && !this.state.loading ? (
                  <View>
                    <View
                      style={{
                        flex: 1,
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                      }}>
                      <View style={{alignSelf: 'flex-start'}}>
                        <Text></Text>
                      </View>
                      <View style={{alignSelf: 'flex-end'}}>
                        <View style={{flex: 1, flexDirection: 'row'}}>
                          <TouchableOpacity
                            onPress={() => {
                              this.props.navigation.push(
                                'SalesHeadSalesPersonForm',
                                {
                                  pageHeading: 'Edit Sales Person',
                                  userId: this.state.userId,
                                },
                              );
                            }}
                            style={{
                              borderColor: primaryHexColor,
                              borderWidth: 1,
                              padding: 1,
                              marginTop: -3,
                              marginLeft: 4,
                              borderRadius: 4,
                            }}>
                            <Text style={{color: primaryHexColor}}>
                              {/* <MaterialIcons name="edit" size={18} /> */}
                            </Text>
                          </TouchableOpacity>
                        </View>
                      </View>
                    </View>
                    <View style={styles.detailsBlock}>
                      <View style={styles.userProfileContainer}>
                        <Avatar
                          rounded
                          source={{uri: this.state.user.imagefilepath}}
                          size="xlarge"
                        />
                      </View>

                      <Text style={styles.customerName}>
                        {this.state.user.fullname}
                      </Text>

                      <View>
                        <Text
                          style={[
                            {
                              textAlign: 'center',
                              fontSize: 14,
                              color: fontColor,
                            },
                          ]}>
                          {this.state.user.gendertext} /{' '}
                          {this.state.user.agewithyears}
                        </Text>
                      </View>

                      {/* <View>
                                                <Text 
                                                    style={[common.linkText, { textAlign: 'center' }]}
                                                    onPress={() => Linking.openURL('mailto:' + this.state.user.email)}
                                                    Google
                                                >
                                                    <Icon name="envelope-o" size={14} />
                                                    &nbsp;{this.state.user.email}
                                                </Text>
                                            </View>

                                            <View>
                                                <Text 
                                                    style={[common.linkText, { textAlign: 'center' }]}
                                                    onPress={() => Linking.openURL('tel:' + this.state.user.phoneno)}
                                                    Google
                                                >
                                                    <Icon name="phone" size={14} />
                                                    &nbsp;{this.state.user.phoneno}
                                                </Text>
                                            </View> */}

                      <View style={common.seperator} />

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
                              common.linkText,
                            ]}
                            onPress={() =>
                              Linking.openURL('mailto:' + this.state.user.email)
                            }
                            Google>
                            {this.state.user.email}
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
                          {this.state.user.phoneno !== '' &&
                          this.state.user.phoneno !== null ? (
                            <Text
                              style={[
                                callLogCardLayout.textWithIconContainerText,
                                common.linkText,
                              ]}
                              onPress={() =>
                                Linking.openURL(
                                  'tel:' + this.state.user.phoneno,
                                )
                              }
                              Google>
                              {this.state.user.phoneno}
                            </Text>
                          ) : (
                            <Text
                              style={[
                                callLogCardLayout.textWithIconContainerText,
                                common.mutedTextInItalic,
                              ]}>
                              NA
                            </Text>
                          )}
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
                            style={[
                              callLogCardLayout.textWithIconContainerText,
                              {},
                            ]}>
                            {this.state.user.displayfulllocation}
                          </Text>
                        </View>
                      </View>

                      {/* <Text style={styles.blockTitle}>Address:</Text>
                                            <Text>{this.state.user.displayfulllocation}</Text> */}

                      <View style={styles.attendanceCard}>
                        <View style={{marginBottom: 10}}>
                          <Text
                            style={{
                              fontSize: 15,
                              color: fontColor,
                              fontWeight: 'bold',
                              marginBottom: 5,
                            }}>
                            PERFORMANCE
                          </Text>
                        </View>
                        <View
                          style={{
                            flex: 1,
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                          }}>
                          <View>
                            <View
                              style={[
                                styles.attendanceCircle,
                                {backgroundColor: primaryBlueHexColor},
                              ]}>
                              <Text style={styles.attendanceShowNo}>
                                {this.state.salescall}
                              </Text>
                            </View>
                            <Text style={styles.attendanceShowText}>
                              Total Sales{'\n'}Call
                            </Text>
                          </View>
                          <View>
                            <View
                              style={[
                                styles.attendanceCircle,
                                {backgroundColor: successHexColor},
                              ]}>
                              <Text style={styles.attendanceShowNo}>
                                {this.state.totalpresent}
                              </Text>
                            </View>
                            <Text style={styles.attendanceShowText}>
                              Total{'\n'}Present
                            </Text>
                          </View>
                          <View>
                            <View
                              style={[
                                styles.attendanceCircle,
                                {backgroundColor: primaryPurpleHexColor},
                              ]}>
                              <Text style={styles.attendanceShowNo}>
                                {this.state.totalabsent}
                              </Text>
                            </View>
                            <Text style={styles.attendanceShowText}>
                              Total{'\n'}Absent
                            </Text>
                          </View>
                        </View>
                      </View>
                    </View>
                  </View>
                ) : (
                  <NotFound onPress={this.reloadPageData} />
                )}
              </SkeletonContent>
            </View>
          </ScrollView>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  userProfileContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  blockTitle: {
    fontSize: 17,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  customerName: {
    fontSize: 22,
    fontWeight: 'bold',
    // color: primaryHexColor,
    textTransform: 'capitalize',
    textAlign: 'center',
    color: fontColor,
  },
  textWithIconContainer: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    position: 'relative',
    marginTop: 2,
    marginBottom: 4,
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
    marginLeft: 28,
    fontSize: 12,
    color: fontColor,
  },

  attendanceCard: {
    flex: 1,
    backgroundColor: backgroundGrey,
    margin: 10,
    marginTop: 15,
    padding: 20,
    borderRadius: 8,
  },
  attendanceCircle: {
    marginRight: 7,
    marginBottom: 5,
    backgroundColor: successHexColor,
    width: 80,
    height: 80,
    borderRadius: 100,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  attendanceShowNo: {
    width: '100%',
    textAlign: 'center',
    fontSize: 22,
    color: '#fff',
    fontWeight: 'normal',
  },
  attendanceShowText: {
    fontSize: 13,
    color: fontColor,
    textAlign: 'center',
    justifyContent: 'center',
  },
});

const mapStateToProps = state => {
  return {
    user: state.loggedInUserDetailsReducer.user,
  };
};

export default connect(mapStateToProps, null)(SalesHeadSalesPersonDetails);
