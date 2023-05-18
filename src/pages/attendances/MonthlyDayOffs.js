import React, {Component} from 'react';
import {
  Dimensions,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';

import {common} from '../../assets/style';

import {
  backgroundGrey,
  dangerHexColor,
  fontColor,
  mainBgColor,
  primaryBlueHexColor,
  successHexColor,
} from '../../constants/themeColors';

import Api from '../../provider/Api';
import Dataprovider from '../../provider/Dataprovider';
import Loader from '../../provider/Loader';

import moment from 'moment';

import {Calendar} from 'react-native-calendars';

const screenWidth = Dimensions.get('window').width;

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

        if (data?.status_code === 200) {
          let responseData = data?.response.data;
          this.setState({
            markedDates: responseData.monthlydayoffs,
          });
        } else {
          let errormessage = null;
          if (
            typeof data?.status_code !== 'undefined' &&
            data?.status_code === 422
          ) {
            errormessage = data?.response.data.message;
          }
          this.api.showErrorMessage(data?.response.message, errormessage);
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
                selectedDayBackgroundColor: dangerHexColor,
                arrowColor: primaryBlueHexColor,
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
    backgroundColor: primaryBlueHexColor || '#fff',
    paddingBottom: 5,
    flex: 1,
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
