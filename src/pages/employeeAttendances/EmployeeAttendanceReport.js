import React, {Component, useState, Fragment} from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  RefreshControl,
} from 'react-native';

import {Button, ListItem, Left, Body, Right} from 'native-base';
import {Badge} from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome';

import {common, callLogCardLayout} from '../../assets/style';

import {
  successHexColor,
  primaryHexColor,
  textMutedColor,
  primaryBlueHexColor,
  dangerHexColor,
  seperator,
  primaryPurpleHexColor,
  warningHexColor,
  fontColor,
  mainBgColor,
  backgroundGrey,
  circleBgColor,
} from '../../constants/themeColors';

import Api from '../../provider/Api';
import Dataprovider from '../../provider/Dataprovider';
import Loader from '../../provider/Loader';

import moment from 'moment';

import {Calendar} from 'react-native-calendars';

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

export default class EmployeeAttendanceReport extends Component {
  api = new Api();
  dataProvider = new Dataprovider();

  constructor(props) {
    var currentDate = moment().format('YYYY-MM-DD');
    super(props);
    this.state = {
      loading: true,
      isDataRefreshing: false,
      currentDate: currentDate,
      markedDates: {[currentDate]: {selected: true}},
      totalPresent: 0,
      totalOnLeave: 0,
      totalOnHalfDay: 0,
      totalAbsent: 0,
    };
  }

  componentDidMount() {
    this.getData();
  }

  getData() {
    const formData = new FormData();
    formData.append('attendancedate', this.state.currentDate);

    this.api
      .callPostApi({
        api: 'v_1/employees/attendances',
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
            totalPresent: responseData.totalpresent,
            totalOnLeave: responseData.totalonleave,
            totalOnHalfDay: responseData.totalonhalfday,
            totalAbsent: responseData.totalabsent,
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
            <View style={styles.attendanceCard}>
              <View style={{marginBottom: 10}}>
                <Text
                  style={{fontSize: 14, color: fontColor, fontWeight: 'bold'}}>
                  TOTAL ATTENDANCES
                </Text>
              </View>
              <View
                style={{
                  flex: 1,
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}>
                <View>
                  <View
                    style={[
                      styles.attendanceShowCircle,
                      {backgroundColor: successHexColor},
                    ]}>
                    <Text style={styles.attendanceShowNo}>
                      {this.state.totalPresent}
                    </Text>
                  </View>
                  <Text style={styles.attendanceShowText}>
                    Total No{'\n'}Presents
                  </Text>
                </View>
                <View style={{}}>
                  <View
                    style={[
                      styles.attendanceShowCircle,
                      {backgroundColor: primaryPurpleHexColor},
                    ]}>
                    <Text style={styles.attendanceShowNo}>
                      {this.state.totalOnLeave}
                    </Text>
                  </View>
                  <Text style={styles.attendanceShowText}>On{'\n'}Leave</Text>
                </View>
                <View style={{}}>
                  <View
                    style={[
                      styles.attendanceShowCircle,
                      {backgroundColor: warningHexColor},
                    ]}>
                    <Text style={styles.attendanceShowNo}>
                      {this.state.totalOnHalfDay}
                    </Text>
                  </View>
                  <Text style={styles.attendanceShowText}>On{'\n'}Halfday</Text>
                </View>
                <View style={{}}>
                  <View
                    style={[
                      styles.attendanceShowCircle,
                      {backgroundColor: dangerHexColor},
                    ]}>
                    <Text style={styles.attendanceShowNo}>
                      {this.state.totalAbsent}
                    </Text>
                  </View>
                  <Text style={styles.attendanceShowText}>
                    Total{'\n'}Absent
                  </Text>
                </View>
              </View>
            </View>

            <Calendar
              style={styles.calendar}
              current={this.state.currentDate}
              hideExtraDays
              disableAllTouchEventsForDisabledDays
              firstDay={1}
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
                    markedDates: {[month.dateString]: {selected: true}},
                    loading: true,
                  },
                  this.getData,
                );
              }}
              onDayPress={day => {
                this.setState(
                  {
                    currentDate: day.dateString,
                    markedDates: {[day.dateString]: {selected: true}},
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
                selectedDayBackgroundColor: primaryBlueHexColor,
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
  attendanceCard: {
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
  attendanceShowCircle: {
    marginBottom: 5,
    width: 72,
    height: 72,
    borderRadius: 100,
  },
  attendanceShowNo: {
    width: '100%',
    marginTop: 20,
    textAlign: 'center',
    fontSize: 22,
    color: '#fff',
    fontWeight: 'normal',
  },
  attendanceShowText: {
    fontSize: 13,
    color: fontColor,
    textAlign: 'center',
    justifyContent: 'center',
  },
});
