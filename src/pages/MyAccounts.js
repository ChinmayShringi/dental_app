import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Dimensions,
} from 'react-native';

import {Button, ListItem, Left, Body, Right} from 'native-base';

import {common, commonLabelDescription} from '../assets/style';

import Api from '../provider/Api';
import Dataprovider from '../provider/Dataprovider';

import {primaryHexColor} from '../constants/themeColors';

import Icon from 'react-native-vector-icons/FontAwesome';

import {skeletonPlaceholderProps} from '../constants/defaultValues';
import SkeletonContent from '../components/SkeletonContent';
const screenWidth = Dimensions.get('window').width;

export default class MyAccounts extends Component {
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
              <View>
                <Text style={commonLabelDescription.blockTitle}>
                  Profile Settings
                </Text>
                <ListItem icon>
                  <Left>
                    <Button
                      style={{backgroundColor: primaryHexColor}}
                      onPress={() => {
                        this.props.navigation.push('EditProfile', {
                          pageHeading: 'Edit Profile',
                        });
                      }}>
                      <Icon
                        active
                        name="pencil-square-o"
                        size={18}
                        color={'#fff'}
                      />
                    </Button>
                  </Left>
                  <Body>
                    <TouchableOpacity
                      onPress={() => {
                        this.props.navigation.push('EditProfile', {
                          pageHeading: 'Edit Profile',
                        });
                      }}>
                      <Text style={common.fontBold}>Edit Profile</Text>
                    </TouchableOpacity>
                  </Body>
                  <Right>
                    <TouchableOpacity
                      onPress={() => {
                        this.props.navigation.push('EditProfile', {
                          pageHeading: 'Edit Profile',
                        });
                      }}>
                      <Icon name="chevron-right" />
                    </TouchableOpacity>
                  </Right>
                </ListItem>
              </View>
            </SkeletonContent>
          </View>
        </ScrollView>
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
});
