import React, { Component } from 'react';
import { View, Text, Image, ImageBackground, Button, StyleSheet, TouchableOpacity, Linking } from "react-native";

import Dataprovider from '../provider/Dataprovider';
import Api from '../provider/Api';

import { common } from '../assets/style';

import { primaryBlueHexColor, primaryHexColor, seperator, fontColor } from '../constants/themeColors';

import { loggedInUserDetails } from '../redux/actions/loggedInUserDetails';
import { DrawerNotificationBadgeCount } from '../redux/actions/DrawerNotificationBadgeCount';
import {connect} from "react-redux";

import Icon from 'react-native-vector-icons/FontAwesome';

var api = new Api();
var dataProvider = new Dataprovider();

class DrawerUserDetails extends Component {
    
    constructor(props) {
        super(props);
        this.state = {};

        dataProvider.getData('user').then((data)=>{
            this.props.onUserUpdate(data);
        });

        let options = {
          'api': 'v_1/get-badges-counts',
          'method': 'POST',
          'headers': {
              'Accept': 'application/json',
              "Content-Type": "multipart/form-data"
          },
          'data': {},
          'refreshOn401': true
        };

        api.callPostApi(options).then(data => {
          if(data.status_code === 200){
            let responseData = data.response.data;
            this.props.onNotificationUpdateCount(parseInt(responseData.notificationcount));
          }
          else {
            console.log('Failed to get badges count');
          }
        });
    }

    render() {
        return(
            // <ImageBackground source={require('../images/login-balloon.jpg')} style={{padding: 15, paddingTop: 20}}>
            //     <View
            //         style={{
            //             flex: 1,
            //             flexDirection: 'row',
            //             justifyContent : 'flex-start',
            //         }}
            //     >
            //         <View style={{
            //             alignItems: 'flex-start',
            //             width: 70,
            //             height: 60
            //         }}>
            //             <Image style={styles.profileImage} source={this.props.user != null ? {"uri": this.props.user.imagefile} : require('../images/placeholders/noimage-user.png')} />
            //         </View>
            //         <View
            //             style={{
            //                 flexDirection: 'column',
            //                 justifyContent: 'center',
            //                 width: 170
            //             }}
            //         >
            //             <Text 
            //                 style={[styles.name, { textAlign:'left' }]}
            //                 numberOfLines={1}
            //                 ellipsizeMode="tail"
            //             >
            //                 {this.props.user != null ? this.props.user.fullname : 'NA' }
            //             </Text>
            //             <Text 
            //                 style={[styles.email, { textAlign:'left', width: "100%" }]}
            //                 numberOfLines={1}
            //                 ellipsizeMode="tail"
            //                 onPress={() => Linking.openURL('mailto:' + this.props.user.email)}
            //                 Google
            //             >
            //                 {this.props.user != null ? this.props.user.email : 'NA' }
            //             </Text>
            //         </View>
            //     </View>
            // </ImageBackground>
            <View>
                <View
                    style={{
                        backgroundColor: primaryHexColor,
                        flex: 1,
                        paddingTop: 40
                    }}
                >
                    <View 
                        style={{
                            marginBottom: -65,
                            flex: 1,
                            alignItems: 'center'
                        }}
                    >
                        <Image 
                            style={{
                                width: 120,
                                height: 120,
                                borderRadius: 100,
                                margin: 'auto',
                                // borderWidth: 1,
                                // borderColor: seperator
                            }}
                            resizeMode={'cover'}
                            source={
                                this.props.user != null ? 
                                    {"uri": this.props.user.imagefile} 
                                    : 
                                    require('../images/placeholders/noimage-user.png')
                            } 
                        />
                    </View>
                </View>
                <View
                    style={{
                        paddingTop: 70,
                        paddingBottom: 15,
                        alignItems: 'center'
                    }}
                >
                    <Text 
                        style={{ 
                            color: primaryHexColor,
                            fontSize: 16,
                            fontWeight: 'bold',
                            marginVertical: 4,
                            marginBottom: 0,
                        }}
                        numberOfLines={1}
                        ellipsizeMode="tail"
                    >
                        {this.props.user != null ? this.props.user.fullname : 'NA' }
                    </Text>
                    <Text 
                        style={{
                            color: fontColor,
                            fontSize: 12,
                            fontWeight: 'bold',
                        }}
                        numberOfLines={1}
                        ellipsizeMode="tail"
                        onPress={() => Linking.openURL('mailto:' + this.props.user.email)}
                        Google
                    >
                        {this.props.user != null ? this.props.user.email : 'NA' }
                    </Text>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    profileImage: {
        width: 60,
        height: 60,
        borderRadius: 40,
        borderWidth: 3,
        borderColor: '#fff',
        margin: 'auto'
    },
    name: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
        fontWeight: '800',
        borderRadius: 40,
        marginVertical: 4,
        marginBottom: 0,
        // textAlign: 'center'
    },
    email: {
      color: '#fff',
      fontSize: 14,
      fontWeight: '800',
      borderRadius: 40,
      marginTop: 0,
      marginBottom: 12,
    //   textAlign: 'center'
    },
    UserBtnContainerBlock: {
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      marginVertical: 0
    },
    UserBtnContainer: {
      flex: 1,
      marginHorizontal: 5
    }
});

const mapStateToProps = (state) => {
    return {
        user: state.loggedInUserDetailsReducer.user
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onUserUpdate: (user) => dispatch(loggedInUserDetails(user)),
        onNotificationUpdateCount: (count) => dispatch(DrawerNotificationBadgeCount(count))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(DrawerUserDetails)