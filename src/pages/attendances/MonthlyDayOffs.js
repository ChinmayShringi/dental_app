import React, {Component, useState, Fragment} from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  RefreshControl,
  Dimensions,
} from 'react-native';

import {Button, ListItem, Left, Body, Right} from 'native-base';

import Icon from 'react-native-vector-icons/FontAwesome';

import {common} from '../../assets/style';

import {
  successHexColor,
  primaryHexColor,
  textMutedColor,
  fontColor,
  primaryBlueHexColor,
  dangerHexColor,
  seperator,
  mainBgColor,
  backgroundGrey,
  circleBgColor,
} from '../../constants/themeColors';

import Api from '../../provider/Api';
import Dataprovider from '../../provider/Dataprovider';
import Loader from '../../provider/Loader';

import moment from 'moment';

import {Calendar} from 'react-native-calendars';

const screenWidth = Dimensions.get('window').width;

const testIDs = {
  menu: {
    CONTAINER: 'menu',
    CALENDARS: 'calendars_btn',
    CALENDAR_LIST: 'calendar_list_btn',
    HORIZONTAL_LIST: 'horizontal_list_btn',
    AGENDA: 'agenda_btn',
    EXPANDABLE_CALENDAR: 'expandable_calendar_btn',
    WEEK_CALENDAR: 'week_calendar_btn',
  },
  calendars: {
    CONTAINER: 'calendars',
    FIRST: 'first_calendar',
    LAST: 'last_calendar',
  },
  calendarList: {
    CONTAINER: 'calendarList',
  },
  horizontalList: {
    CONTAINER: 'horizontalList',
  },
  agenda: {
    CONTAINER: 'agenda',
    ITEM: 'item',
  },
  expandableCalendar: {
    CONTAINER: 'expandableCalendar',
  },
  weekCalendar: {
    CONTAINER: 'weekCalendar',
  },
};

export default class MonthlyDayOffs extends Component {
  api = new Api();
  dataProvider = new Dataprovider();

  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      isDataRefreshing: false,
      currentDate: moment().format('YYYY-MM-DD'),
      markedDates: {},
    };
  }

  componentDidMount() {
    this.getData();
  }

  getData() {
    const formData = new FormData();
    formData.append('currentday', this.state.currentDate);

    this.api
      .callPostApi({
        api: 'v_1/attendances/month-dayoffs',
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'multipart/form-data',
        },
        data: formData,
        refreshOn401: true,
      })
      .then(data => {
        this.setState({
          loading: false,
          isDataRefreshing: false,
        });

        if (data.status_code === 200) {
          let responseData = data.response.data;
          this.setState({
            markedDates: responseData.monthlydayoffs,
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

  onRefreshPageData = () => {
    this.setState({isDataRefreshing: true}, this.getData);
  };

  render() {
    const screenLayout = {
      width: screenWidth / 2,
    };

    return (
      <View style={{flex: 1, backgroundColor: mainBgColor}}>
        <View
          style={[
            common.cardContainer,
            {backgroundColor: backgroundGrey, overflow: 'hidden', padding: 12},
          ]}>
          <Loader loading={this.state.loading} />
          <ScrollView
            contentContainerStyle={{flexGrow: 1}}
            refreshControl={
              <RefreshControl
                refreshing={this.state.isDataRefreshing}
                onRefresh={this.onRefreshPageData}
              />
            }>
            <View style={styles.legendCard}>
              <View style={[styles.legendRow, {marginBottom: 10}]}>
                <View style={styles.legendLeftSection}>
                  <View style={styles.legendLeftIcon}>
                    <Icon
                      active
                      name="circle"
                      size={8}
                      color={successHexColor}
                    />
                  </View>
                  <View style={styles.legendRightText}>
                    <Text style={styles.legendLabel}>Full Day Present</Text>
                  </View>
                </View>
                <View style={styles.legendRightSection}>
                  <View style={styles.legendLeftIcon}>
                    <Icon
                      active
                      name="circle"
                      size={8}
                      color={primaryBlueHexColor}
                    />
                  </View>
                  <View style={styles.legendRightText}>
                    <Text style={styles.legendLabel}>
                      Half Day (Present / Leave)
                    </Text>
                  </View>
                </View>
              </View>
              <View style={styles.legendRow}>
                <View style={styles.legendLeftSection}>
                  <View style={styles.legendLeftIcon}>
                    <Icon
                      active
                      name="circle-o"
                      size={18}
                      color={dangerHexColor}
                    />
                  </View>
                  <View style={styles.legendRightText}>
                    <Text style={styles.legendLabel}>Full Day Absent</Text>
                  </View>
                </View>
                <View style={styles.legendRightSection}>
                  <View style={styles.legendLeftIcon}>
                    <Icon
                      active
                      name="circle"
                      size={8}
                      color={dangerHexColor}
                    />
                  </View>
                  <View style={styles.legendRightText}>
                    <Text style={styles.legendLabel}>Full Day Leave</Text>
                  </View>
                </View>
              </View>
            </View>
            <Calendar
              style={styles.calendar}
              current={this.state.currentDate}
              hideExtraDays
              disableAllTouchEventsForDisabledDays
              firstDay={1}
              // markedDates={{
              //     '2021-01-23': {selected: true, marked: false, dotColor: primaryBlueHexColor },
              //     '2021-01-24': {selected: false, marked: true, dotColor: primaryBlueHexColor },
              //     '2021-01-25': {selected: false, marked: true, dotColor: successHexColor},
              // }}
              markedDates={this.state.markedDates}
              hideArrows={false}
              renderArrow={direction =>
                direction === 'left' ? (
                  <Icon
                    style={[{color: fontColor, marginLeft: 60}]}
                    name="chevron-left"
                    size={18}
                  />
                ) : (
                  <Icon
                    style={[{color: fontColor, marginRight: 60}]}
                    name="chevron-right"
                    size={18}
                  />
                )
              }
              onMonthChange={month => {
                this.setState(
                  {
                    currentDate: month.dateString,
                    loading: true,
                  },
                  this.getData,
                );
              }}
              theme={{
                dayTextColor: fontColor,
                textDayFontSize: 14,
                monthTextColor: fontColor,
                textMonthFontSize: 16,
                // calendarBackground: '#333248',
                // textSectionTitleColor: 'white',
                // textSectionTitleDisabledColor: 'gray',
                // dayTextColor: 'red',
                // todayTextColor: 'white',
                // selectedDayTextColor: 'white',
                // monthTextColor: 'white',
                // indicatorColor: 'white',
                selectedDayBackgroundColor: dangerHexColor,
                arrowColor: primaryBlueHexColor,
                // textDisabledColor: 'red',
                // 'stylesheet.calendar.header': {
                //     week: {
                //         marginTop: 30,
                //         marginHorizontal: 12,
                //         flexDirection: 'row',
                //         justifyContent: 'space-between'
                //     }
                // }
              }}
            />
            {/* <View>
                            <ListItem icon>
                                <Left style={styles.legendIconContainer} >
                                    <View>
                                        <Icon active  name="circle" size={8} color={successHexColor} />
                                    </View>
                                </Left>
                                <Body>
                                    <View >
                                        <Text style={[common.fontBold]}>Full Day Present</Text>
                                    </View>
                                </Body>
                            </ListItem>
                            <ListItem icon>
                                <Left style={styles.legendIconContainer} >
                                    <View>
                                        <Icon active  name="circle" size={8} color={primaryBlueHexColor} />
                                    </View>
                                </Left>
                                <Body>
                                    <View >
                                        <Text style={[common.fontBold]}>Half Day (Present / Leave)</Text>
                                    </View>
                                </Body>
                            </ListItem>
                            <ListItem icon>
                                <Left style={styles.legendIconContainer} >
                                    <View>
                                        <Icon active  name="circle" size={8} color={dangerHexColor} />
                                    </View>
                                </Left>
                                <Body>
                                    <View >
                                        <Text style={[common.fontBold]}>Full Day Leave</Text>
                                    </View>
                                </Body>
                            </ListItem>
                            <ListItem icon>
                                <Left style={styles.legendIconContainer} >
                                    <View>
                                        <Icon active  name="circle-o" size={18} color={dangerHexColor} />
                                    </View>
                                </Left>
                                <Body>
                                    <View>
                                        <Text style={common.fontBold}>Full Day Absent</Text>
                                    </View>
                                </Body>
                            </ListItem>
                        </View> */}
          </ScrollView>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  calendar: {
    marginBottom: 10,
    backgroundColor: primaryBlueHexColor,
    backgroundColor: '#fff',
    paddingBottom: 5,
    // borderBottomWidth: 1,
    // borderBottomColor: seperator
    flex: 1,
    backgroundColor: '#fff',
    margin: 10,
    padding: 15,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
  },
  legendIconContainer: {
    width: 36,
    alignItems: 'center',
    justifyContent: 'center',
  },
  legendCard: {
    backgroundColor: '#fff',
    color: '#333',
    margin: 10,
    padding: 15,
    borderRadius: 8,
    fontSize: 16,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
  },
  legendRow: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  legendLeftSection: {
    width: screenWidth / 2,
    marginRight: -10,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  legendRightSection: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  legendLeftIcon: {
    width: 30,
    alignItems: 'center',
    textAlign: 'center',
  },
  legendRightText: {
    flex: 1,
  },
  legendLabel: {
    color: fontColor,
    fontSize: 12,
    fontWeight: 'bold',
  },
});
