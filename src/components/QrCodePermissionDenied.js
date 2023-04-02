import React, { Component } from 'react';
import { View, Text, Image, ImageBackground, StyleSheet, Dimensions } from "react-native";

import { primaryHexColor, primaryBlueHexColor, dangerHexColor, textMutedColor, backgroundGrey } from '../constants/themeColors';
import { MaterialIcons } from '@expo/vector-icons';
import { abs } from 'react-native-reanimated';

import { Button } from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome';

const screenWidth = Dimensions.get('window').width;

export default class QrCodePermissionDenied extends Component <{}> {
    
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return(
            <View style={styles.noPermissionBody}>
                <View style={styles.noPermissionBodyContent}>
                    <View style={styles.noPermissionContainer}>
                        <Icon 
                            name="ban" 
                            size={130} 
                            style={{
                                color: '#ff7972'
                            }} 
                        />
                        <Text style={styles.noPermissionErrortTitle}>
                            Permission Denied!
                        </Text>
                        <Text style={styles.noPermissionErrortDescription}>
                            Camera permission required to scan qr code. Use below button to allow camera permission or go to your device settings and enable camera permission.
                        </Text>
                        <View style={styles.noPermissionReloadButtonContainer}>
                            <Button 
                                block
                                iconLeft 
                                bordered
                                rounded
                                style={{ width: screenWidth - 30, backgroundColor: primaryBlueHexColor }}
                                onPress={this.props.onPress}
                            >
                                <Icon 
                                    name="check" 
                                    style={{
                                        fontSize: 20,
                                        color: '#fff'
                                    }}
                                />
                                <Text 
                                    style={{
                                        fontWeight: 'bold',
                                        marginLeft: 10,
                                        color: '#fff',
                                    }}
                                >
                                    Allow Camera Permission
                                </Text>
                            </Button>
                        </View>
                    </View>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    noPermissionBody: {
        flex: 1, 
        backgroundColor: backgroundGrey,
        position: 'relative',
        borderRadius: 10
    },
    noPermissionBodyContent: {
        backgroundColor: backgroundGrey,
        flex: 1,
        borderRadius: 10
    },
    noPermissionContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 15
    },
    noPermissionErrortTitle: {
        textAlign: 'center',
        fontSize: 22,
        fontWeight: '600',
        color: "#555",
        marginTop: 15,
    },
    noPermissionErrortDescription: {
        textAlign: 'center',
        fontSize: 14,
        color: textMutedColor,
    },
    noPermissionReloadButtonContainer: {
        marginTop: 50
    }
});