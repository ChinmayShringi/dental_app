import React, {Component} from 'react';
import {Dimensions, StyleSheet, Text, View} from 'react-native';

import {
  backgroundGrey,
  primaryBlueHexColor,
} from '../../../constants/themeColors';

import QrCodePermissionDenied from '../../../components/QrCodePermissionDenied';

// import { Button } from 'react-native-elements';
import {Button} from 'native-base';

// import {BarCodeScanner} from 'expo-barcode-scanner';
import Icon from 'react-native-vector-icons/FontAwesome';

const screenWidth = Dimensions.get('window').width;

export default class SupervisorScanQrCodeOrSearchUsingJobId extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hasPermission: null,
      scanned: false,
    };
  }

  componentDidMount() {
    // (async () => {
    //   const { status } = await BarCodeScanner.requestPermissionsAsync();
    //   if(status === 'granted') {
    //     this.setState({
    //       hasPermission: true
    //     });
    //   }
    //   else {
    //     this.setState({
    //       hasPermission: false
    //     });
    //   }
    // })();

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
    // alert(`Bar code with type ${type} and data ${data} has been scanned!`);
    this.props.navigation.push('SupervisorViewJob', {
      orderDetailId: parseInt(data),
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
      <View
        style={{
          flex: 1,
          flexDirection: 'column',
          justifyContent: 'flex-end',
          padding: 15,
          backgroundColor: backgroundGrey,
        }}>
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
    );
  }
}
