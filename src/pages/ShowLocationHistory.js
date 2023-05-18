import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Platform,
  Button,
  ScrollView,
} from 'react-native';

import Api from '../provider/Api';

// import MapView, { Polyline } from 'react-native-maps';

let MapView, Polyline;

if (Platform.OS !== 'web') {
  MapView = require('react-native-maps').default;
  Polyline = require('react-native-maps').Polyline;
}

export default class ShowLocationHistory extends Component {
  api = new Api();

  constructor(props) {
    super(props);
    this.state = {
      locations: [],
      coordinates: [],
      region: {
        latitude: 20.6879327,
        longitude: 72.9511871,
        latitudeDelta: 0.02,
        longitudeDelta: 0.02,
      },
    };
  }

  componentDidMount() {
    this.getLocationHistory();
  }

  getLocationHistory = () => {
    let options = {
      api: 'v_1/sales/get-locations',
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
      if (responseData?.status_code === 200) {
        alert('Location history fetched successfully.');
        let resposeCoordinates = responseData?.response.data.coordinates;
        let coordinates = [];
        let region = {};
        resposeCoordinates.forEach((coordinate, index) => {
          coordinates.push({
            latitude: parseFloat(coordinate.latitude),
            longitude: parseFloat(coordinate.longitude),
          });
          if (index === 0) {
            region = {
              latitude: coordinate.latitude,
              longitude: coordinate.longitude,
              latitudeDelta: 0.015,
              longitudeDelta: 0.0121,
            };
          }
        });
        this.setState({
          locations: resposeCoordinates,
          coordinates: coordinates,
          // region: region
        });
      } else {
        alert('Failed to fetch location history.');
      }
    });
  };

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.signupText}>Location History</Text>

        <Button
          onPress={this.getLocationHistory}
          title="Refresh Data"
          color="#841584"
        />
        <ScrollView>
          {this.state.locations.map((location, index) => (
            <TouchableOpacity
              key={index}
              style={styles.item}
              onPress={() => this.showSelectedLocation(location)}>
              <Text style={styles.text}>
                {index} | Lat: {location.latitude} | Lng: {location.longitude}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
        {Platform.OS !== 'web' ? (
          <View style={styles.mapcontainer}>
            <MapView style={styles.map} region={this.state.region}>
              <Polyline
                coordinates={this.state.coordinates}
                strokeWidth={4}
                strokeColor="rgba(255,140,0,0.8)"
              />
            </MapView>
          </View>
        ) : (
          <React.Fragment />
        )}
      </View>
    );
  }
}

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
  mapcontainer: {
    ...StyleSheet.absoluteFillObject,
    height: 400,
    width: 400,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});
