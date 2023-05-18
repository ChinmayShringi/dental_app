import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  RefreshControl,
  Linking,
  Dimensions,
} from 'react-native';

import {common} from '../assets/style';

import Api from '../provider/Api';
import Dataprovider from '../provider/Dataprovider';

import NotFound from '../components/NotFound';

import {mainBgColor, fontColor, circleBgColor} from '../constants/themeColors';

import {Avatar} from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';

import {skeletonPlaceholderProps} from '../constants/defaultValues';
import SkeletonContent from '../components/SkeletonContent';

const screenWidth = Dimensions.get('window').width;

export default class MyProfile extends Component {
  api = new Api();
  dataProvider = new Dataprovider();

  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      refreshing: false,
      user: null,
    };
  }

  componentDidMount() {
    this.props.navigation.setParams({
      handleSave: () => {
        this.props.navigation.push('EditProfile', {
          pageHeading: 'Edit Profile',
        });
      },
    });
    this.getData();
  }

  reloadPageData = () => {
    this.setState({loading: true}, this.getData);
  };

  getData() {
    this.api
      .callPostApi({
        api: 'v_1/get-profile',
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'multipart/form-data',
        },
        data: {},
        refreshOn401: true,
      })
      .then(data => {
        this.setState({
          loading: false,
          refreshing: false,
        });

        if (data?.status_code === 200) {
          let responseData = data?.response.data;
          this.setState({
            user: responseData.user,
          });
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
      });
  }

  onRefreshPageData = () => {
    this.setState({refreshing: true}, this.getData);
  };

  render() {
    const skeletonLayout = [
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
      // {
      //     width: screenWidth - 30,
      //     height: 1,
      //     marginTop: 12,
      //     marginBottom: 15,
      // },
      // {
      //     width: 100,
      //     height: 20,
      //     borderRadius: 4,
      //     marginBottom: 15,
      // },
      // {
      //     width: 250,
      //     height: 14,
      //     borderRadius: 4,
      //     marginBottom: 5,
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
    ];

    return (
      <View style={{flex: 1, backgroundColor: mainBgColor}}>
        <View style={common.cardContainer}>
          {/* <Loader loading={this.state.loading}/> */}
          <ScrollView
            contentContainerStyle={{flexGrow: 1}}
            refreshControl={
              <RefreshControl
                refreshing={this.state.refreshing}
                onRefresh={this.onRefreshPageData}
              />
            }>
            <View style={[common.card, {margin: 0, borderRadius: 0}]}>
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

                      {/* <Text style={styles.blockTitle}>Address:</Text>
                                            <Text>{this.state.user.displayfulllocation}</Text> */}

                      <View
                        style={[styles.textWithIconContainer, common.linkText]}>
                        <Icon
                          name="circle"
                          size={14}
                          style={styles.textWithIconContainerIcon}
                        />
                        <View>
                          <Text
                            style={[
                              styles.textWithIconContainerText,
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
                      <View style={[styles.textWithIconContainer]}>
                        <Icon
                          name="circle"
                          size={14}
                          style={styles.textWithIconContainerIcon}
                        />
                        <View>
                          {this.state.user.phoneno !== '' &&
                          this.state.user.phoneno !== null ? (
                            <Text
                              style={[
                                styles.textWithIconContainerText,
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
                                styles.textWithIconContainerText,
                                common.mutedTextInItalic,
                              ]}>
                              NA
                            </Text>
                          )}
                        </View>
                      </View>
                      <View style={styles.textWithIconContainer}>
                        <Icon
                          name="circle"
                          size={14}
                          style={styles.textWithIconContainerIcon}
                        />
                        <View>
                          <Text style={[styles.textWithIconContainerText, {}]}>
                            {this.state.user.displayfulllocation}
                          </Text>
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
    fontSize: 20,
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
});
