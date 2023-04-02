import React, { Component } from 'react';
import { View, Text, StyleSheet } from "react-native";

import { Badge } from 'native-base';

import Dataprovider from '../provider/Dataprovider';
import Api from '../provider/Api';

import { common } from '../assets/style';

import { primaryBlueHexColor, primaryHexColor } from '../constants/themeColors';

import { DrawerNotificationBadgeCount } from '../redux/actions/DrawerNotificationBadgeCount';
import {connect} from "react-redux";

import Icon from 'react-native-vector-icons/FontAwesome';

var api = new Api();
var dataProvider = new Dataprovider();

class DrawerNotificationBadge extends Component {
    
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        if(this.props.count == 0) {
            return null;
        }
        return(
            <Badge style={{
                height: 20,
                paddingTop: 1, 
                paddingBottom: 2, 
                marginRight: 5, 
                backgroundColor: this.props.isMenuFocused ? '#fff' : primaryHexColor
            }}>
                <Text style={{
                    fontSize: 12,
                    color: this.props.isMenuFocused ? primaryHexColor : '#fff'
                }}>{this.props.count}</Text>
            </Badge>
        );
    }
}



const mapStateToProps = (state) => {
    return {
        count: state.DrawerNotificationBadgeCountReducer.count
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onNotificationUpdateCount: (count) => dispatch(DrawerNotificationBadgeCount(count))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(DrawerNotificationBadge)