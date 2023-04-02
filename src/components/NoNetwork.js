import React, { Component } from 'react';
import { View, Text, Image, ImageBackground, StyleSheet } from "react-native";

import { primaryHexColor, dangerHexColor, textMutedColor } from '../constants/themeColors';
import { MaterialIcons } from '@expo/vector-icons';
import { abs } from 'react-native-reanimated';

import { Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';

export default class NoNetwork extends Component <{}> {
    
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return(
            <View style={styles.container}>
                <MaterialIcons 
                    name="cloud-off" 
                    size={130} 
                    style={{
                        color: '#ff7972'
                    }} 
                />
                <Text style={styles.errortTitle}>
                    Whoops!
                </Text>
                <Text style={styles.errortDescription}>
                    No internet connection found. Check your connection or try again later.
                </Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 15
    },
    imageCss: {
        width: 150,
        height: 150,
    },  
    errorMessage: {
        textAlign: 'center',
        fontSize: 24,
        fontWeight: 'bold',
        fontStyle: 'italic',
        color: "#555",
    },  
    errortTitle: {
        textAlign: 'center',
        fontSize: 22,
        fontWeight: '600',
        color: "#555",
        marginTop: 15,
    },
    errortDescription: {
        textAlign: 'center',
        fontSize: 16,
        color: textMutedColor,
    },
    reloadButtonContainer: {
        marginTop: 50
    }
});