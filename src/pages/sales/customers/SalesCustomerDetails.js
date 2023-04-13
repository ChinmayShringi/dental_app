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

import {common, commonLabelDescription} from '../../../assets/style';

import Api from '../../../provider/Api';
import Dataprovider from '../../../provider/Dataprovider';
import Loader from '../../../provider/Loader';

import NotFound from '../../../components/NotFound';

import {
  primaryHexColor,
  textMutedColor,
  mainBgColor,
  backgroundGrey,
  fontColor,
  circleBgColor,
} from '../../../constants/themeColors';

import Icon from 'react-native-vector-icons/FontAwesome';

import {skeletonPlaceholderProps} from '../../../constants/defaultValues';

import {loggedInUserDetails} from '../../../redux/actions/loggedInUserDetails';
import {connect} from 'react-redux';
import SkeletonContent from '../../../components/SkeletonContent';

const screenWidth = Dimensions.get('window').width;

// export default class SalesCustomerDetails extends Component < {} > {
class SalesCustomerDetails extends Component {
  api = new Api();
  dataProvider = new Dataprovider();

  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      customerId:
        typeof this.props.navigation.state.params.customerId !== 'undefined'
          ? parseInt(this.props.navigation.state.params.customerId)
          : 0,
      customer: null,
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
    formData.append('customerid', this.state.customerId);

    let options = {
      api: 'v_1/sales/customers/view',
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
          customer: responseData.customer,
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
        marginLeft: screenWidth - 54,
        width: 24,
        height:
          this.props.user !== null && this.props.user.isdepartmenthead ? 20 : 0,
        borderRadius: 2,
        marginTop: 0,
      },
      {
        width: 150,
        height: 16,
        borderRadius: 4,
        marginBottom: 15,
      },
      {
        width: 200,
        height: 16,
        borderRadius: 4,
        marginTop: 0,
        marginBottom: 5,
      },
      {
        width: 100,
        height: 13,
        borderRadius: 4,
        marginTop: 0,
        marginBottom: 5,
      },
      {
        width: 180,
        height: 13,
        borderRadius: 4,
        marginTop: 0,
        marginBottom: 5,
      },
      {
        width: 120,
        height: 13,
        borderRadius: 4,
        marginTop: 0,
        marginBottom: 5,
      },
      {
        width: screenWidth - 50,
        height: 13,
        borderRadius: 4,
        marginBottom: 5,
      },
      {
        width: screenWidth - 30,
        height: 1,
        marginTop: 5,
        marginBottom: 15,
      },
      {
        width: 130,
        height: 16,
        borderRadius: 4,
        marginTop: 0,
        marginBottom: 15,
      },
      {
        width: 170,
        height: 12,
        borderRadius: 4,
        marginTop: 0,
        marginBottom: 5,
      },
      {
        width: 180,
        height: 12,
        borderRadius: 4,
        marginBottom: 5,
      },
      {
        width: 140,
        height: 12,
        borderRadius: 4,
        marginBottom: 0,
      },
      {
        width: screenWidth - 30,
        height: 1,
        marginTop: 10,
        marginBottom: 15,
      },
      {
        width: 120,
        height: 16,
        borderRadius: 4,
        marginTop: 0,
        marginBottom: 15,
      },
      {
        width: 200,
        height: 12,
        borderRadius: 4,
        marginTop: 0,
        marginBottom: 8,
      },
      {
        width: 220,
        height: 14,
        borderRadius: 4,
        marginBottom: 8,
      },
      {
        width: 220,
        height: 14,
        borderRadius: 4,
        marginBottom: 8,
      },
      {
        width: 210,
        height: 14,
        borderRadius: 4,
        marginBottom: 8,
      },
      {
        width: 190,
        height: 14,
        borderRadius: 4,
        marginBottom: 8,
      },
    ];

    return (
      <View style={{flex: 1, backgroundColor: mainBgColor}}>
        <View style={[common.cardContainer, {padding: 15}]}>
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
                {this.state.customer !== null && !this.state.loading ? (
                  <View>
                    {this.props.user !== null &&
                    this.props.user.isdepartmenthead ? (
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
                                  'SalesCustomerForm',
                                  {
                                    pageHeading: 'Edit Customer',
                                    customerId: this.state.customerId,
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
                        Customer Details
                      </Text>
                      <Text style={styles.customerName}>
                        {this.state.customer.name}
                      </Text>
                      {/* <Text style={{color: textMutedColor, fontSize: 12}}>
                                                {this.state.customer.typetext}
                                            </Text> */}
                      <View
                        style={commonLabelDescription.textWithIconContainer}>
                        <Icon
                          name="circle"
                          size={14}
                          style={
                            commonLabelDescription.textWithIconContainerIcon
                          }
                        />
                        <View>
                          <Text
                            style={[
                              commonLabelDescription.textWithIconContainerText,
                            ]}>
                            {this.state.customer.typetext}
                          </Text>
                        </View>
                      </View>
                      <View
                        style={commonLabelDescription.textWithIconContainer}>
                        <Icon
                          name="circle"
                          size={14}
                          style={
                            commonLabelDescription.textWithIconContainerIcon
                          }
                        />
                        <View>
                          <Text
                            style={[
                              commonLabelDescription.textWithIconContainerText,
                              common.linkText,
                            ]}
                            onPress={() =>
                              Linking.openURL(
                                'mailto:' + this.state.customer.email,
                              )
                            }
                            Google>
                            {this.state.customer.email}
                          </Text>
                        </View>
                      </View>
                      <View
                        style={commonLabelDescription.textWithIconContainer}>
                        <Icon
                          name="circle"
                          size={14}
                          style={
                            commonLabelDescription.textWithIconContainerIcon
                          }
                        />
                        <View>
                          <Text
                            style={[
                              commonLabelDescription.textWithIconContainerText,
                              common.linkText,
                            ]}
                            onPress={() =>
                              Linking.openURL(
                                'tel:' + this.state.customer.phoneno,
                              )
                            }
                            Google>
                            {this.state.customer.phoneno}
                          </Text>
                        </View>
                      </View>
                      <View
                        style={commonLabelDescription.textWithIconContainer}>
                        <Icon
                          name="circle"
                          size={14}
                          style={
                            commonLabelDescription.textWithIconContainerIcon
                          }
                        />
                        <View>
                          <Text
                            style={
                              commonLabelDescription.textWithIconContainerText
                            }>
                            {this.state.customer.displaylocation}
                          </Text>
                        </View>
                      </View>
                    </View>

                    <View style={common.seperator} />

                    <View>
                      <Text style={commonLabelDescription.blockTitle}>
                        Doctor Details
                      </Text>
                      <View
                        style={commonLabelDescription.textWithIconContainer}>
                        <Icon
                          name="circle"
                          size={14}
                          style={
                            commonLabelDescription.textWithIconContainerIcon
                          }
                        />
                        <View>
                          <Text
                            style={[
                              commonLabelDescription.textWithIconContainerText,
                              {fontWeight: 'bold'},
                            ]}>
                            {this.state.customer.salutationtext}&nbsp;
                            {this.state.customer.doctorname}{' '}
                            <Text style={{color: textMutedColor}}>
                              ({this.state.customer.code})
                            </Text>
                          </Text>
                        </View>
                      </View>
                      <View
                        style={commonLabelDescription.textWithIconContainer}>
                        <Icon
                          name="circle"
                          size={14}
                          style={
                            commonLabelDescription.textWithIconContainerIcon
                          }
                        />
                        <View>
                          <Text
                            style={[
                              commonLabelDescription.textWithIconContainerText,
                              common.linkText,
                            ]}
                            onPress={() =>
                              Linking.openURL(
                                'mailto:' + this.state.customer.personalemail,
                              )
                            }
                            Google>
                            {this.state.customer.personalemail}
                          </Text>
                        </View>
                      </View>
                      <View
                        style={commonLabelDescription.textWithIconContainer}>
                        <Icon
                          name="circle"
                          size={14}
                          style={
                            commonLabelDescription.textWithIconContainerIcon
                          }
                        />
                        <View>
                          <Text
                            style={[
                              commonLabelDescription.textWithIconContainerText,
                              common.linkText,
                            ]}
                            onPress={() =>
                              Linking.openURL(
                                'tel:' +
                                  this.state.customer.personalcellphoneno,
                              )
                            }
                            Google>
                            {this.state.customer.personalcellphoneno}
                          </Text>
                        </View>
                      </View>
                    </View>

                    <View style={common.seperator} />

                    <View>
                      <Text style={commonLabelDescription.blockTitle}>
                        Operations
                      </Text>
                      <View
                        style={[
                          commonLabelDescription.listContainer,
                          {marginTop: 5},
                        ]}>
                        <View style={commonLabelDescription.listLabelContainer}>
                          <Text style={commonLabelDescription.labelText}>
                            Category
                          </Text>
                        </View>
                        <View style={commonLabelDescription.listSeperator}>
                          <Text style={commonLabelDescription.labelText}>
                            :
                          </Text>
                        </View>
                        <View>
                          {this.state.customer.category !== '' &&
                          this.state.customer.category !== null ? (
                            <Text style={commonLabelDescription.labelValue}>
                              {this.state.customer.categorytext}
                            </Text>
                          ) : (
                            <Text
                              style={[
                                common.mutedTextInItalic,
                                commonLabelDescription.labelValue,
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
                        <View style={commonLabelDescription.listLabelContainer}>
                          <Text style={commonLabelDescription.labelText}>
                            Working Hours
                          </Text>
                        </View>
                        <View style={commonLabelDescription.listSeperator}>
                          <Text style={commonLabelDescription.labelText}>
                            :
                          </Text>
                        </View>
                        <View>
                          {this.state.customer.workingfrom !== '' &&
                          this.state.customer.workingfrom !== null &&
                          this.state.customer.workingto !== '' &&
                          this.state.customer.workingto !== null ? (
                            <Text style={commonLabelDescription.labelValue}>
                              {this.state.customer.workingfromtime} to{' '}
                              {this.state.customer.workingtotime}
                            </Text>
                          ) : (
                            <Text
                              style={[
                                common.mutedTextInItalic,
                                commonLabelDescription.labelValue,
                              ]}>
                              NA
                            </Text>
                          )}
                        </View>
                      </View>
                      <View style={[commonLabelDescription.listContainer]}>
                        <View style={commonLabelDescription.listLabelContainer}>
                          <Text style={commonLabelDescription.labelText}>
                            Lunch
                          </Text>
                        </View>
                        <View style={commonLabelDescription.listSeperator}>
                          <Text style={commonLabelDescription.labelText}>
                            :
                          </Text>
                        </View>
                        <View>
                          {this.state.customer.lunchfrom !== '' &&
                          this.state.customer.lunchfrom !== null &&
                          this.state.customer.lunchto !== '' &&
                          this.state.customer.lunchto !== null ? (
                            <Text style={commonLabelDescription.labelValue}>
                              {this.state.customer.lunchfromtime} to{' '}
                              {this.state.customer.lunchtotime}
                            </Text>
                          ) : (
                            <Text
                              style={[
                                common.mutedTextInItalic,
                                commonLabelDescription.labelValue,
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
                        <View style={commonLabelDescription.listLabelContainer}>
                          <Text style={commonLabelDescription.labelText}>
                            Delivery Method
                          </Text>
                        </View>
                        <View style={commonLabelDescription.listSeperator}>
                          <Text style={commonLabelDescription.labelText}>
                            :
                          </Text>
                        </View>
                        <View>
                          {this.state.customer.deliverymethod !== null &&
                          this.state.customer.deliverymethod !== '' ? (
                            <Text style={commonLabelDescription.labelValue}>
                              {this.state.customer.deliverymethodtext}
                            </Text>
                          ) : (
                            <Text
                              style={[
                                common.mutedTextInItalic,
                                commonLabelDescription.labelValue,
                              ]}>
                              NA
                            </Text>
                          )}
                        </View>
                      </View>
                      <View style={commonLabelDescription.listContainer}>
                        <View style={commonLabelDescription.listLabelContainer}>
                          <Text style={commonLabelDescription.labelText}>
                            Has Special Price
                          </Text>
                        </View>
                        <View style={commonLabelDescription.listSeperator}>
                          <Text style={commonLabelDescription.labelText}>
                            :
                          </Text>
                        </View>
                        <View>
                          {this.state.customer.iseligibleforspecialprice !==
                            null &&
                          this.state.customer.iseligibleforspecialprice !==
                            '' ? (
                            <Text style={commonLabelDescription.labelValue}>
                              {
                                this.state.customer
                                  .iseligibleforspecialpricetext
                              }
                            </Text>
                          ) : (
                            <Text
                              style={[
                                common.mutedTextInItalic,
                                commonLabelDescription.labelValue,
                              ]}>
                              NA
                            </Text>
                          )}
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
  blockTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
    color: fontColor,
  },
  customerName: {
    fontSize: 15,
    fontWeight: 'bold',
    color: primaryHexColor,
    textTransform: 'capitalize',
  },
});

const mapStateToProps = state => {
  return {
    user: state.loggedInUserDetailsReducer.user,
  };
};

export default connect(mapStateToProps, null)(SalesCustomerDetails);
