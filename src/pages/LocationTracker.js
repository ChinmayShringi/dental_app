import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Button,
  ScrollView,
  PermissionsAndroid,
} from 'react-native';
import Geolocation from 'react-native-geolocation-service';
import Api from '../provider/Api';
import {EventEmitter} from 'fbemitter';
import { locationTrackingProps } from '../constants/defaultValues';
const LOCATION_TASK_NAME = locationTrackingProps.LOCATION_TASK_NAME;

const taskEventName = 'new-location-detected';
const eventEmitter = new EventEmitter();

export default class LocationTracker extends Component {
  api = new Api();

  constructor(props) {
    super(props);
    this.state = {
      isTrackingOn: false,
      locations: [],
    };
  }

  componentDidMount() {
    // ... restore data captured in the background
    this.eventSubscription = eventEmitter.addListener(taskEventName, data => {
      let latitude = data[0].coords.latitude;
      let longitude = data[0].coords.longitude;
      let accuracy = data[0].coords.accuracy;

      this.setState(prevState => ({
        locations: [
          ...prevState.locations,
          {
            lat: latitude,
            lng: longitude,
            accuracy: accuracy,
          },
        ],
      }));

      let options = {
        api: 'v_1/sales/add-location',
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        data: {
          userid: 1,
          latitude: latitude,
          longitude: longitude,
        },
      };

      this.api.callApi(options).then(responseData => {
        if (responseData.status_code === 200) {
          console.log('updated');
        } else {
          console.log('failed');
        }
      });
    });
  }

  componentWillUnmount() {
    this.eventSubscription.remove();
  }

  askLocationPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'Location Permission Needed',
          message:
            'This app needs location permission to track your location in the background.',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        alert('Permission granted');
      } else {
        alert('Permission denied');
      }
    } catch (err) {
      console.warn(err);
    }
  };

  startTracking = async () => {
    await this.askLocationPermission();

    if (
      await PermissionsAndroid.check(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      )
    ) {
      this.setState({
        isTrackingOn: true,
      });
      Geolocation.watchPosition(
        position => {
          eventEmitter.emit(taskEventName, [position]);
        },
        error => {
          console.warn(error);
        },
        {
          enableHighAccuracy: true,
          distanceFilter: 1,
          interval: 1000,
          fastestInterval: 1000,
          showLocationDialog: true,
        },
      );
    } else {
      alert('Location permission needed');
    }
  };

  stopTracking = async () => {
    this.setState({
      isTrackingOn: false,
    });
    await Geolocation.stopObserving(LOCATION_TASK_NAME);
  };

  clearLocations = () => {
    this.setState({
      locations: [],
    });
  };

  showSelectedLocation = location => {
    alert(location);
  };

  clearLocationsOnServer = () => {
    let options = {
      api: 'v_1/sales/clear-location-history',
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      data: {
        userid: 1,
      },
    };

    this.api.callApi(options).then(responseData => {
      if (responseData.status_code === 200) {
        alert('Location history deleted successfully.');
      } else {
        alert('Failed to delete location history.');
      }
    });
  };

  showTodaysHistory = () => {
    this.props.navigation.navigate('ShowLocationHistory');
  };

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.signupText}>Welcome to Impression Lab</Text>

        <View style={login.signupTextCont}>
          <TouchableOpacity onPress={this.askLocationPermission}>
            <Text style={login.signupButton}> Ask Permission</Text>
          </TouchableOpacity>
        </View>

        {!this.state.isTrackingOn ? (
          <Button
            onPress={this.startTracking}
            title="Start Tracking"
            color="#841584"
          />
        ) : (
          <Button
            onPress={this.stopTracking}
            title="Stop Tracking"
            color="#c43d4b"
          />
        )}
        <Button
          onPress={this.showTodaysHistory}
          title="Show Today's History"
          color="#841584"
        />
        <Button
          onPress={this.clearLocationsOnServer}
          title="Clear Locations On Server"
          color="#c43d4b"
        />
        <Button
          onPress={this.clearLocations}
          title="Clear Locations from Below Listing"
          color="#c43d4b"
        />
        <ScrollView>
          {this.state.locations.map((location, index) => (
            <TouchableOpacity
              key={index}
              style={styles.item}
              onPress={() => this.showSelectedLocation(location)}>
              <Text style={styles.text}>
                {index} | Lat: {location.lat} | Lng: {location.lng} | accuracy:{' '}
                {location.accuracy}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
    );
  }
}

// TaskManager.defineTask(LOCATION_TASK_NAME, ({data, error}) => {
//   if (error) {
//     alert(error);
//     return;
//   }
//   if (data) {
//     const {locations} = data;
//     eventEmitter.emit(taskEventName, locations);
//   }
// });

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#455a64',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  signupText: {
    color: 'rgba(255,255,255,0.6)',
    fontSize: 16,
  },
  item: {
    padding: 10,
    marginTop: 3,
    backgroundColor: '#d9f9b1',
    alignItems: 'center',
  },
  text: {
    color: '#4f603c',
  },
});
