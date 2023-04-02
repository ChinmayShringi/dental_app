import React, {Component} from 'react';
import {
  Dimensions,
  Linking,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import {common, commonLabelDescription} from '../../../assets/style';

import Api from '../../../provider/Api';
import Dataprovider from '../../../provider/Dataprovider';

import NotFound from '../../../components/NotFound';

import {primaryHexColor, textMutedColor} from '../../../constants/themeColors';

import Icon from 'react-native-vector-icons/FontAwesome';

import SkeletonContent from 'react-native-skeleton-content';
import {skeletonPlaceholderProps} from '../../../constants/defaultValues';

const screenWidth = Dimensions.get('window').width;

export default class SupervisorCustomerDetails extends Component {
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
      api: 'v_1/supervisors/customers/view',
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
      // {
      //     marginLeft: screenWidth - 74,
      //     width: 24,
      //     height: 20,
      //     borderRadius: 2,
      //     marginTop: 0
      // },
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
        width: 100,
        height: 8,
        borderRadius: 4,
        marginTop: 0,
        marginBottom: 5,
      },
      {
        width: 180,
        height: 14,
        borderRadius: 4,
        marginTop: 0,
        marginBottom: 5,
      },
      {
        width: 120,
        height: 12,
        borderRadius: 4,
        marginTop: 0,
        marginBottom: 2,
      },
      {
        width: screenWidth - 50,
        height: 12,
        borderRadius: 4,
        marginBottom: 5,
      },
      {
        width: screenWidth - 50,
        height: 1,
        marginTop: 15,
        marginBottom: 15,
      },
      {
        width: 130,
        height: 20,
        borderRadius: 4,
        marginTop: 0,
        marginBottom: 20,
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
        width: screenWidth - 50,
        height: 1,
        marginTop: 15,
        marginBottom: 15,
      },
      {
        width: 120,
        height: 20,
        borderRadius: 4,
        marginTop: 0,
        marginBottom: 20,
      },
      {
        width: 200,
        height: 14,
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
      // {
      //     width: screenWidth - 50,
      //     height: 1,
      //     marginTop: 15,
      //     marginBottom: 15,
      // },
      // {
      //     width: 120,
      //     height: 20,
      //     borderRadius: 4,
      //     marginTop: 0,
      //     marginBottom: 20,
      // },
      // {
      //     width: 200,
      //     height: 14,
      //     borderRadius: 4,
      //     marginTop: 0,
      //     marginBottom: 8,
      // },
      // {
      //     width: 220,
      //     height: 14,
      //     borderRadius: 4,
      //     marginBottom: 8,
      // },
      // {
      //     width: 220,
      //     height: 14,
      //     borderRadius: 4,
      //     marginBottom: 8,
      // },
      // {
      //     width: 210,
      //     height: 14,
      //     borderRadius: 4,
      //     marginBottom: 8,
      // },
      // {
      //     width: 190,
      //     height: 14,
      //     borderRadius: 4,
      //     marginBottom: 8,
      // },
      // {
      //     width: 190,
      //     height: 14,
      //     borderRadius: 4,
      //     marginBottom: 8,
      // },
      // {
      //     width: 220,
      //     height: 14,
      //     borderRadius: 4,
      //     marginBottom: 8,
      // },
    ];

    return (
      <View style={common.cardContainer}>
        {/* <NavigationEvents onDidFocus={() => this.getFormData() } /> */}
        {/* <Loader loading={this.state.loading}/> */}
        <ScrollView contentContainerStyle={{flexGrow: 1}}>
          <View style={common.card}>
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
                  <View>
                    <Text style={styles.blockTitle}>Customer Details</Text>
                    <Text style={styles.customerName}>
                      {this.state.customer.name}
                    </Text>
                    <Text style={{color: textMutedColor, fontSize: 12}}>
                      {this.state.customer.typetext}
                    </Text>
                    <View style={commonLabelDescription.textWithIconContainer}>
                      <Icon
                        name="envelope-o"
                        size={14}
                        style={commonLabelDescription.textWithIconContainerIcon}
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
                    <View style={commonLabelDescription.textWithIconContainer}>
                      <Icon
                        name="phone"
                        size={14}
                        style={commonLabelDescription.textWithIconContainerIcon}
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
                    <View style={commonLabelDescription.textWithIconContainer}>
                      <Icon
                        name="map-marker"
                        size={14}
                        style={commonLabelDescription.textWithIconContainerIcon}
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
                    <View style={commonLabelDescription.textWithIconContainer}>
                      <Icon
                        name="user-md"
                        size={14}
                        style={commonLabelDescription.textWithIconContainerIcon}
                      />
                      <View>
                        <Text
                          style={
                            commonLabelDescription.textWithIconContainerText
                          }>
                          {this.state.customer.salutationtext}&nbsp;
                          {this.state.customer.doctorname}{' '}
                          <Text style={{color: textMutedColor}}>
                            ({this.state.customer.code})
                          </Text>
                        </Text>
                      </View>
                    </View>
                    <View style={commonLabelDescription.textWithIconContainer}>
                      <Icon
                        name="envelope-o"
                        size={14}
                        style={commonLabelDescription.textWithIconContainerIcon}
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
                    <View style={commonLabelDescription.textWithIconContainer}>
                      <Icon
                        name="mobile"
                        size={14}
                        style={commonLabelDescription.textWithIconContainerIcon}
                      />
                      <View>
                        <Text
                          style={[
                            commonLabelDescription.textWithIconContainerText,
                            common.linkText,
                          ]}
                          onPress={() =>
                            Linking.openURL(
                              'tel:' + this.state.customer.personalcellphoneno,
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
                    <Text style={styles.blockTitle}>Operations</Text>
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
                        <Text style={commonLabelDescription.labelText}>:</Text>
                      </View>
                      <View>
                        {this.state.customer.category !== '' &&
                        this.state.customer.category !== null ? (
                          <Text>{this.state.customer.categorytext}</Text>
                        ) : (
                          <Text style={common.mutedTextInItalic}>NA</Text>
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
                        <Text style={commonLabelDescription.labelText}>:</Text>
                      </View>
                      <View>
                        {this.state.customer.workingfrom !== '' &&
                        this.state.customer.workingfrom !== null &&
                        this.state.customer.workingto !== '' &&
                        this.state.customer.workingto !== null ? (
                          <Text>
                            {this.state.customer.workingfromtime} to{' '}
                            {this.state.customer.workingtotime}
                          </Text>
                        ) : (
                          <Text style={common.mutedTextInItalic}>NA</Text>
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
                        <Text style={commonLabelDescription.labelText}>:</Text>
                      </View>
                      <View>
                        {this.state.customer.lunchfrom !== '' &&
                        this.state.customer.lunchfrom !== null &&
                        this.state.customer.lunchto !== '' &&
                        this.state.customer.lunchto !== null ? (
                          <Text>
                            {this.state.customer.lunchfromtime} to{' '}
                            {this.state.customer.lunchtotime}
                          </Text>
                        ) : (
                          <Text style={common.mutedTextInItalic}>NA</Text>
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
                        <Text style={commonLabelDescription.labelText}>:</Text>
                      </View>
                      <View>
                        {this.state.customer.deliverymethod !== null &&
                        this.state.customer.deliverymethod !== '' ? (
                          <Text>{this.state.customer.deliverymethodtext}</Text>
                        ) : (
                          <Text style={common.mutedTextInItalic}>NA</Text>
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
                        <Text style={commonLabelDescription.labelText}>:</Text>
                      </View>
                      <View>
                        {this.state.customer.iseligibleforspecialprice !==
                          null &&
                        this.state.customer.iseligibleforspecialprice !== '' ? (
                          <Text>
                            {this.state.customer.iseligibleforspecialpricetext}
                          </Text>
                        ) : (
                          <Text style={common.mutedTextInItalic}>NA</Text>
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
    );
  }
}

const styles = StyleSheet.create({
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
});
