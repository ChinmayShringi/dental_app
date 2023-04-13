import React, {Component} from 'react';
import {
  Dimensions,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import {Body, Button, Left, ListItem, Right} from 'native-base';

import {common, commonLabelDescription} from '../../../assets/style';

import Api from '../../../provider/Api';
import Dataprovider from '../../../provider/Dataprovider';

import {
  fontColor,
  mainBgColor,
  primaryBlueHexColor,
  primaryHexColor,
} from '../../../constants/themeColors';

import Icon from 'react-native-vector-icons/FontAwesome';

import {skeletonPlaceholderProps} from '../../../constants/defaultValues';
import SkeletonContent from '../../../components/SkeletonContent';

const screenWidth = Dimensions.get('window').width;

export default class CustomerMyAccounts extends Component {
  api = new Api();
  dataProvider = new Dataprovider();

  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      refreshing: false,
    };
  }

  componentDidMount() {}

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
    ];

    return (
      <View style={{flex: 1, backgroundColor: mainBgColor}}>
        <View style={[common.cardContainer, {padding: 15}]}>
          {/* <NavigationEvents onDidFocus={() => this.getFormData() } /> */}
          {/* <Loader loading={this.state.loading}/> */}
          <ScrollView contentContainerStyle={{flexGrow: 1}}>
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
              <View>
                <Text style={commonLabelDescription.blockTitle}>
                  Profile Settings
                </Text>
                <ListItem icon>
                  <Left>
                    <Button
                      style={{backgroundColor: primaryHexColor}}
                      onPress={() => {
                        this.props.navigation.push('CustomerViewProfile', {
                          pageHeading: 'My Profile',
                        });
                      }}>
                      <Icon active name="user" size={18} color={'#fff'} />
                    </Button>
                  </Left>
                  <Body>
                    <TouchableOpacity
                      onPress={() => {
                        this.props.navigation.push('CustomerViewProfile', {
                          pageHeading: 'My Profile',
                        });
                      }}>
                      <Text style={styles.listingItemText}>My Profile</Text>
                    </TouchableOpacity>
                  </Body>
                  <Right>
                    <TouchableOpacity
                      onPress={() => {
                        this.props.navigation.push('CustomerViewProfile', {
                          pageHeading: 'My Profile',
                        });
                      }}>
                      <Icon
                        name="chevron-right"
                        style={styles.listingArrowIcon}
                      />
                    </TouchableOpacity>
                  </Right>
                </ListItem>
                <ListItem icon>
                  <Left>
                    <Button
                      style={{backgroundColor: primaryBlueHexColor}}
                      onPress={() => {
                        this.props.navigation.push('CustomerChangePassword', {
                          pageHeading: 'Change Password',
                        });
                      }}>
                      <Icon active name="key" size={18} color={'#fff'} />
                    </Button>
                  </Left>
                  <Body>
                    <TouchableOpacity
                      onPress={() => {
                        this.props.navigation.push('CustomerChangePassword', {
                          pageHeading: 'Change Password',
                        });
                      }}>
                      <Text style={styles.listingItemText}>
                        Change Password
                      </Text>
                    </TouchableOpacity>
                  </Body>
                  <Right>
                    <TouchableOpacity
                      onPress={() => {
                        this.props.navigation.push('CustomerChangePassword', {
                          pageHeading: 'Change Password',
                        });
                      }}>
                      <Icon
                        name="chevron-right"
                        style={styles.listingArrowIcon}
                      />
                    </TouchableOpacity>
                  </Right>
                </ListItem>
              </View>
            </SkeletonContent>
            {/* </View> */}
          </ScrollView>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  customerName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: primaryHexColor,
    textTransform: 'capitalize',
  },
  listingItemText: {
    fontWeight: 'bold',
    color: fontColor,
    fontSize: 13,
  },
  listingArrowIcon: {
    fontWeight: 'bold',
    color: fontColor,
    fontSize: 13,
  },
});
