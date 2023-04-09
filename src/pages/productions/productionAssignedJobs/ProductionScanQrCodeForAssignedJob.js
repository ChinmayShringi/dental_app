import React, {Component} from 'react';
import {Dimensions, StyleSheet, Text, View} from 'react-native';

import {
  backgroundGrey,
  mainBgColor,
  primaryBlueHexColor,
} from '../../../constants/themeColors';

import {common} from '../../../assets/style';

import QrCodePermissionDenied from '../../../components/QrCodePermissionDenied';

import {Button} from 'native-base';

// import { BarCodeScanner } from 'expo-barcode-scanner';
import Icon from 'react-native-vector-icons/FontAwesome';

const screenWidth = Dimensions.get('window').width;

export default class ProductionScanQrCodeForAssignedJob extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hasPermission: null,
      scanned: false,
    };
  }

  componentDidMount() {
    this.askCameraPermission();
  }

  askCameraPermission = async () => {
    // const {status} = await BarCodeScanner.requestPermissionsAsync();
    // if (status === 'granted') {
    //   this.setState({
    //     hasPermission: true,
    //   });
    // } else {
    //   this.setState({
    //     hasPermission: false,
    //   });
    // }
  };

  handleBarCodeScanned = ({type, data}) => {
    this.setState({
      scanned: true,
    });
    this.props.navigation.push('ProductionAssignedJobDetails', {
      productionProcessId: null,
      orderDetailId: parseInt(data),
      isFromQrCode: true,
    });
  };

  render() {
    if (this.state.hasPermission === null) {
      return null;
    }
    if (this.state.hasPermission === false) {
      return <QrCodePermissionDenied onPress={this.askCameraPermission} />;
    }

    return (
      <View style={{flex: 1, backgroundColor: mainBgColor}}>
        <View
          style={[common.listingContainer, {backgroundColor: backgroundGrey}]}>
          {/* <BarCodeScanner
            onBarCodeScanned={
              this.state.scanned ? undefined : this.handleBarCodeScanned
            }
            barCodeTypes={[BarCodeScanner.Constants.BarCodeType.qr]}
            style={StyleSheet.absoluteFillObject}
          /> */}
          {this.state.scanned && (
            <Button
              block
              iconLeft
              bordered
              rounded
              style={{
                width: screenWidth - 30,
                backgroundColor: primaryBlueHexColor,
              }}
              onPress={() => {
                this.setState({scanned: false});
              }}>
              <Icon
                name="refresh"
                style={{
                  fontSize: 20,
                  color: '#fff',
                }}
              />
              <Text
                style={{
                  fontWeight: 'bold',
                  marginLeft: 10,
                  color: '#fff',
                }}>
                Scan Again
              </Text>
            </Button>
          )}
        </View>
      </View>
    );
  }
}
