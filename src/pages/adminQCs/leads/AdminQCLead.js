import React, {Component} from 'react';
import {
  Dimensions,
  Linking,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import {
  callLogCardLayout,
  common,
  commonLabelDescription,
} from '../../../assets/style';

import Api from '../../../provider/Api';
import Dataprovider from '../../../provider/Dataprovider';

import NotFound from '../../../components/NotFound';

import {mainBgColor, primaryHexColor} from '../../../constants/themeColors';

import Icon from 'react-native-vector-icons/FontAwesome';

import SkeletonContent from 'react-native-skeleton-content';
import {skeletonPlaceholderProps} from '../../../constants/defaultValues';

const screenWidth = Dimensions.get('window').width;

import {connect} from 'react-redux';

class AdminQCLead extends Component {
  api = new Api();
  dataProvider = new Dataprovider();

  constructor(props) {
    super(props);
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
    formData.append('salesleadid', this.state.salesLeadId);

    let options = {
      api: 'v_1/adminqcs/leads/view',
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
        width: 150,
        height: 26,
        borderRadius: 4,
        marginBottom: 15,
      },
      {
        width: 200,
        height: 20,
        borderRadius: 4,
        marginTop: 0,
        marginBottom: 5,
      },
      {
        width: 200,
        height: 20,
        borderRadius: 4,
        marginTop: 0,
        marginBottom: 5,
      },
      {
        width: 130,
        height: 14,
        borderRadius: 4,
        marginTop: 0,
        marginBottom: 5,
      },
      {
        width: 140,
        height: 14,
        borderRadius: 4,
        marginTop: 0,
        marginBottom: 5,
      },
      {
        width: 160,
        height: 12,
        borderRadius: 4,
        marginTop: 0,
        marginBottom: 5,
      },
      {
        width: screenWidth - 50,
        height: 12,
        borderRadius: 4,
        marginBottom: 5,
      },
      {
        width: 160,
        height: 12,
        borderRadius: 4,
        marginTop: 0,
        marginBottom: 5,
      },
      {
        width: screenWidth - 50,
        height: 1,
        marginTop: 15,
        marginBottom: 20,
      },
      {
        width: 200,
        height: 20,
        borderRadius: 4,
        marginTop: 0,
        marginBottom: 5,
      },
      {
        width: 140,
        height: 12,
        borderRadius: 4,
        marginTop: 0,
        marginBottom: 5,
      },
      {
        width: screenWidth - 50,
        height: 12,
        borderRadius: 4,
        marginBottom: 5,
      },
    ];

    return (
      <View style={{flex: 1, backgroundColor: mainBgColor}}>
        <View
          style={[common.cardContainer, {overflow: 'hidden', paddingTop: 0}]}>
          {/* <NavigationEvents onDidFocus={() => this.getFormData() } /> */}
          {/* <Loader loading={this.state.loading}/> */}
          <ScrollView contentContainerStyle={{flexGrow: 1}}>
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
                {this.state.saleslead !== null && !this.state.loading ? (
                  <View>
                    <View style={styles.detailsBlock}>
                      <Text style={commonLabelDescription.blockTitle}>
                        Customer Details
                      </Text>
                      <Text style={styles.customerName}>
                        {this.state.saleslead.companyname}
                      </Text>
                      <View style={styles.textWithIconContainer}>
                        <Icon
                          name="circle"
                          size={14}
                          style={callLogCardLayout.textWithIconContainerIcon}
                        />
                        <View>
                          <Text
                            style={callLogCardLayout.textWithIconContainerText}>
                            {this.state.saleslead.typetext}
                          </Text>
                        </View>
                      </View>
                      <View style={styles.textWithIconContainer}>
                        <Icon
                          name="circle"
                          size={14}
                          style={callLogCardLayout.textWithIconContainerIcon}
                        />
                        <View>
                          <Text
                            style={callLogCardLayout.textWithIconContainerText}>
                            {this.state.saleslead.contactperson}
                          </Text>
                        </View>
                      </View>
                      <View style={styles.textWithIconContainer}>
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
                              Linking.openURL(
                                'tel:' + this.state.saleslead.phoneno,
                              )
                            }
                            Google>
                            {this.state.saleslead.phoneno}
                          </Text>
                        </View>
                      </View>
                      <View style={styles.textWithIconContainer}>
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
                              Linking.openURL(
                                'mailto:' + this.state.saleslead.email,
                              )
                            }
                            Google>
                            {this.state.saleslead.email}
                          </Text>
                        </View>
                      </View>
                      <View style={styles.textWithIconContainer}>
                        <Icon
                          name="circle"
                          size={14}
                          style={callLogCardLayout.textWithIconContainerIcon}
                        />
                        <View>
                          <Text
                            style={callLogCardLayout.textWithIconContainerText}>
                            {this.state.saleslead.displaylocation}
                          </Text>
                        </View>
                      </View>
                      <View style={styles.textWithIconContainer}>
                        <Icon
                          name="circle"
                          size={14}
                          style={callLogCardLayout.textWithIconContainerIcon}
                        />
                        <View>
                          {this.state.saleslead.website !== null ? (
                            <Text
                              style={[
                                callLogCardLayout.textWithIconContainerText,
                                common.linkText,
                              ]}
                              onPress={() =>
                                Linking.openURL(
                                  'http:' + this.state.saleslead.website,
                                )
                              }
                              Google>
                              {this.state.saleslead.website}
                            </Text>
                          ) : (
                            <Text style={styles.textWithIconContainerText}>
                              <Text style={common.mutedTextInItalic}>NA</Text>
                            </Text>
                          )}
                        </View>
                      </View>
                    </View>

                    <View style={common.seperator} />

                    <View style={styles.detailsBlock}>
                      <Text style={commonLabelDescription.blockTitle}>
                        Lead Details
                      </Text>
                      {this.props.user !== null &&
                      this.props.user.isdepartmenthead ? (
                        <View style={styles.textWithIconContainer}>
                          <Icon
                            name="circle"
                            size={14}
                            style={callLogCardLayout.textWithIconContainerIcon}
                          />
                          <View>
                            <Text
                              style={
                                callLogCardLayout.textWithIconContainerText
                              }>
                              {this.state.saleslead.salespersonname}
                            </Text>
                          </View>
                        </View>
                      ) : null}
                      <View style={styles.textWithIconContainer}>
                        <Icon
                          name="circle"
                          size={14}
                          style={callLogCardLayout.textWithIconContainerIcon}
                        />
                        <View>
                          <Text
                            style={callLogCardLayout.textWithIconContainerText}>
                            {this.state.saleslead.leadondisplaydate}
                          </Text>
                        </View>
                      </View>
                      <View style={styles.textWithIconContainer}>
                        <Icon
                          name="circle"
                          size={14}
                          style={callLogCardLayout.textWithIconContainerIcon}
                        />
                        <View>
                          <Text
                            style={callLogCardLayout.textWithIconContainerText}>
                            {this.state.saleslead.description !== null ? (
                              <Text style={common.mutedText}>
                                {this.state.saleslead.description}{' '}
                              </Text>
                            ) : (
                              <Text style={common.mutedTextInItalic}>NA</Text>
                            )}
                          </Text>
                        </View>
                      </View>
                      {this.state.saleslead.status === 4 ? (
                        <View style={styles.textWithIconContainer}>
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
                              Followed up on
                              <Text style={{fontWeight: 'normal'}}>
                                &nbsp;
                                {this.state.saleslead.followedupondisplaydate}
                              </Text>
                            </Text>
                          </View>
                        </View>
                      ) : null}
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
  detailsBlock: {},
  blockTitle: {
    fontSize: 17,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  customerName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: primaryHexColor,
    textTransform: 'capitalize',
  },
  textWithIconContainer: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    position: 'relative',
    marginTop: 2,
  },
  textWithIconContainerIcon: {
    position: 'absolute',
    left: -1,
  },
  textWithIconContainerText: {
    marginLeft: 24,
  },
});

const mapStateToProps = state => {
  return {
    user: state.loggedInUserDetailsReducer.user,
  };
};

export default connect(mapStateToProps, null)(AdminQCLead);
