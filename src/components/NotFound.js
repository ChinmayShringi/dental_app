import React, { Component } from 'react';
import { View, Text, Image, ImageBackground, StyleSheet } from "react-native";

import { primaryHexColor, dangerHexColor, textMutedColor, primaryBlueHexColor } from '../constants/themeColors';
import { MaterialIcons } from '@expo/vector-icons';
import { abs } from 'react-native-reanimated';

import { Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';

export default class NotFound extends Component <{}> {
    
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return(
            <View style={styles.container}>
                <Image style={styles.imageCss} source={require('../images/404.png')} />
                <Text style={styles.errortTitle}>
                    SORRY, THE PAGE NOT FOUND
                </Text>
                <Text style={styles.errortDescription}>
                    We can't find the page you're looking for.
                    You can use the below button to reload the data.
                </Text>
                <View style={styles.reloadButtonContainer}>
                    <Button
                        onPress={this.props.onPress}
                        icon={
                            <Icon
                                name="repeat"
                                size={15}
                                color="white"
                                style={{marginRight: 10, marginTop: 2}}
                            />
                        }
                        title="Reload"
                        buttonStyle={{
                            minWidth: 150,
                            backgroundColor: primaryBlueHexColor,
                            borderRadius: 4
                        }}
                    />
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    imageCss: {
        width: 150,
        height: 150,
    },  
    errortTitle: {
        textAlign: 'center',
        fontSize: 18,
        fontWeight: '600',
        color: "#555",
        marginTop: 15,
    },
    errortDescription: {
        textAlign: 'center',
        fontSize: 12,
        // fontWeight: '600',
        color: textMutedColor,
        // marginTop: 10
    },
    errorMessage: {
        textAlign: 'center',
        fontSize: 18,
        fontWeight: '600',
        fontStyle: 'italic',
        color: "#555",
    },
    reloadButtonContainer: {
        marginTop: 50
    }
});