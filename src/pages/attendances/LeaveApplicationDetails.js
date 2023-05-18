import React, {Component} from 'react';
import {
  Dimensions,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import {
  badgeColorCode,
  common,
  commonLabelDescription,
} from '../../assets/style';

import Api from '../../provider/Api';
import Dataprovider from '../../provider/Dataprovider';

import NotFound from '../../components/NotFound';

import {mainBgColor, primaryHexColor} from '../../constants/themeColors';

import Icon from 'react-native-vector-icons/FontAwesome';

import {skeletonPlaceholderProps} from '../../constants/defaultValues';
import SkeletonContent from '../../components/SkeletonContent';

const screenWidth = Dimensions.get('window').width;

export default class LeaveApplicationDetails extends Component {
  api = new Api();
  dataProvider = new Dataprovider();

  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      refreshing: false,
      leaveApplicationId:
        typeof this?.props?.navigation?.state?.params?.leaveApplicationId !==
        'undefined'
          ? parseInt(this?.props?.navigation?.state?.params?.leaveApplicationId)
          : 0,
      leaveApplication: null,
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
    formData.append('leaveapplicationid', this.state.leaveApplicationId);

    let options = {
      api: 'v_1/leaveapplications/view',
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
        refreshing: false,
      });

      if (data?.status_code === 200) {
        let responseData = data?.response.data;

        this.setState({
          leaveApplication: responseData.leaveapplication,
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
        marginLeft: screenWidth - 74,
        width: 24,
        height: 20,
        borderRadius: 2,
        marginTop: 0,
      },
      {
        width: 150,
        height: 26,
        borderRadius: 4,
        marginBottom: 15,
      },
      {
        width: 200,
        height: 14,
        borderRadius: 4,
        marginTop: 0,
        marginBottom: 8,
      },
      {
        width: screenWidth - 50,
        height: 14,
        borderRadius: 4,
        marginBottom: 8,
      },
      {
        width: screenWidth - 50,
        height: 14,
        borderRadius: 4,
        marginBottom: 8,
      },
      {
        width: screenWidth - 50,
        height: 14,
        borderRadius: 4,
        marginBottom: 8,
      },
      {
        width: screenWidth - 60,
        height: 14,
        borderRadius: 4,
        marginBottom: 8,
      },
      {
        width: screenWidth - 50,
        height: 14,
        borderRadius: 4,
        marginBottom: 8,
      },
      {
        width: screenWidth - 50,
        height: 14,
        borderRadius: 4,
        marginBottom: 8,
      },
    ];

    return (
      <View style={{flex: 1, backgroundColor: mainBgColor}}>
        <View style={[common.cardContainer, {padding: 20}]}>
          {/* <NavigationEvents onDidFocus={() => this.getFormData() } /> */}
          {/* <Loader loading={this.state.loading}/> */}
          <ScrollView
            contentContainerStyle={{flexGrow: 1}}
            refreshControl={
              <RefreshControl
                refreshing={this.state.refreshing}
                onRefresh={this.onRefreshPageData}
              />
            }>
            {/* <View style={common.card}> */}
            <SkeletonContent
              containerStyle={{flex: 1, width: screenWidth.width}}
              layout={skeletonLayout}
              isLoading={this.state.loading}
              duration={skeletonPlaceholderProps.duration}
              animationType={skeletonPlaceholderProps.animationType}
              animationDirection={skeletonPlaceholderProps.animationDirection}
              boneColor={skeletonPlaceholderProps.boneColor}
              highlightColor={skeletonPlaceholderProps.highlightColor}>
              {this.state.leaveApplication !== null && !this.state.loading ? (
                <View>
                  {this.state.leaveApplication !== null &&
                  this.state.leaveApplication.status === 2 ? (
                    <View
                      style={{
                        flex: 1,
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                      }}>
                      <View style={{alignSelf: 'flex-start'}}>
                        <Text />
                      </View>
                      <View style={{alignSelf: 'flex-end'}}>
                        <View style={{flex: 1, flexDirection: 'row'}}>
                          <TouchableOpacity
                            onPress={() => {
                              this.props.navigation.push(
                                'LeaveApplicationForm',
                                {
                                  pageHeading: 'Edit Leave Details',
                                  leaveApplicationId:
                                    this.state.leaveApplicationId,
                                },
                              );
                            }}
                            style={{}}>
                            <Text style={{color: primaryHexColor}}>
                              <Icon name="pencil-square-o" size={20} />
                            </Text>
                          </TouchableOpacity>
                        </View>
                      </View>
                    </View>
                  ) : null}

                  <View>
                    <Text style={commonLabelDescription.blockTitle}>
                      Leave Details
                    </Text>
                    <View
                      style={[
                        commonLabelDescription.listContainer,
                        {marginTop: 5},
                      ]}>
                      <View
                        style={[
                          commonLabelDescription.listLabelContainer,
                          styles.labelContainer,
                        ]}>
                        <Text style={commonLabelDescription.labelText}>
                          Leave Type
                        </Text>
                      </View>
                      <View style={commonLabelDescription.listSeperator}>
                        <Text style={commonLabelDescription.labelText}>:</Text>
                      </View>
                      <View style={styles.descriptionContainer}>
                        {this.state.leaveApplication.type !== '' &&
                        this.state.leaveApplication.type !== null ? (
                          <Text style={commonLabelDescription.labelValue}>
                            {this.state.leaveApplication.typetext}
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
                    <View
                      style={[
                        commonLabelDescription.listContainer,
                        {marginTop: 5},
                      ]}>
                      <View
                        style={[
                          commonLabelDescription.listLabelContainer,
                          styles.labelContainer,
                        ]}>
                        <Text style={commonLabelDescription.labelText}>
                          Leave From
                        </Text>
                      </View>
                      <View style={commonLabelDescription.listSeperator}>
                        <Text style={commonLabelDescription.labelText}>:</Text>
                      </View>
                      <View style={styles.descriptionContainer}>
                        {this.state.leaveApplication.leavefrom !== '' &&
                        this.state.leaveApplication.leavefrom !== null ? (
                          <Text style={commonLabelDescription.labelValue}>
                            {this.state.leaveApplication.displayleavefrom}
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
                    <View
                      style={[
                        commonLabelDescription.listContainer,
                        {marginTop: 5},
                      ]}>
                      <View
                        style={[
                          commonLabelDescription.listLabelContainer,
                          styles.labelContainer,
                        ]}>
                        <Text style={commonLabelDescription.labelText}>
                          Leave To
                        </Text>
                      </View>
                      <View style={commonLabelDescription.listSeperator}>
                        <Text style={commonLabelDescription.labelText}>:</Text>
                      </View>
                      <View style={styles.descriptionContainer}>
                        {this.state.leaveApplication.leaveto !== '' &&
                        this.state.leaveApplication.leaveto !== null ? (
                          <Text style={commonLabelDescription.labelValue}>
                            {this.state.leaveApplication.displayleaveto}
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
                    <View style={[commonLabelDescription.listContainer]}>
                      <View
                        style={[
                          commonLabelDescription.listLabelContainer,
                          styles.labelContainer,
                        ]}>
                        <Text style={commonLabelDescription.labelText}>
                          Reason
                        </Text>
                      </View>
                      <View style={commonLabelDescription.listSeperator}>
                        <Text style={commonLabelDescription.labelText}>:</Text>
                      </View>
                      <View style={styles.descriptionContainer}>
                        {this.state.leaveApplication.reason !== null &&
                        this.state.leaveApplication.reason !== '' ? (
                          <Text style={commonLabelDescription.labelValue}>
                            {this.state.leaveApplication.reason}
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
                    <View
                      style={[
                        commonLabelDescription.listContainer,
                        {marginTop: 5},
                      ]}>
                      <View
                        style={[
                          commonLabelDescription.listLabelContainer,
                          styles.labelContainer,
                        ]}>
                        <Text style={commonLabelDescription.labelText}>
                          Status
                        </Text>
                      </View>
                      <View style={commonLabelDescription.listSeperator}>
                        <Text style={commonLabelDescription.labelText}>:</Text>
                      </View>
                      <View style={styles.descriptionContainer}>
                        <Text
                          style={[
                            commonLabelDescription.labelValue,
                            badgeColorCode(
                              this.state.leaveApplication.statuscolor,
                            ),
                          ]}>
                          {this.state.leaveApplication.statustext}
                        </Text>
                      </View>
                    </View>
                    {this.state.leaveApplication.status === 0 ? (
                      <View style={commonLabelDescription.listContainer}>
                        <View
                          style={[
                            commonLabelDescription.listLabelContainer,
                            styles.labelContainer,
                          ]}>
                          <Text style={commonLabelDescription.labelText}>
                            Rejection Reason
                          </Text>
                        </View>
                        <View style={commonLabelDescription.listSeperator}>
                          <Text style={commonLabelDescription.labelText}>
                            :
                          </Text>
                        </View>
                        <View style={styles.descriptionContainer}>
                          {this.state.leaveApplication.rejectreason !== null &&
                          this.state.leaveApplication.rejectreason !== '' ? (
                            <Text style={commonLabelDescription.labelValue}>
                              {this.state.leaveApplication.rejectreason}
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
                  </View>
                </View>
              ) : (
                <NotFound onPress={this.reloadPageData} />
              )}
            </SkeletonContent>
            {/* </View> */}
          </ScrollView>
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
  labelContainer: {
    width: 120,
  },
  descriptionContainer: {
    width: screenWidth - 180,
  },
});
