import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import MapView, { PROVIDER_GOOGLE, EventUserLocation } from 'react-native-maps';
import * as Location from 'expo-location';
import Coordinates from 'locations/constants/cities';

class Map extends Component {
    state = {
        userLocation: {
            ...Coordinates.London,
        }
    }

    componentDidMount() {
        this.requestLocationPermission();
    }

    requestLocationPermission() {
        Location.requestPermissionsAsync();
    }

    onUserLocationChange = (e: EventUserLocation) => {
        const { coordinate } = e.nativeEvent;

        this.setState({
            userLocation: {
                latitude: coordinate.latitude,
                longitude: coordinate.longitude,
            }
        })
    }

    render() {
        const { userLocation } = this.state;

        return (
            <MapView style={styles.mapStyle}
                initialRegion={{
                    ...Coordinates.London,
                    latitudeDelta: 0.1000,
                    longitudeDelta: 0.1000,
                }}
                region={{
                    ...userLocation,
                    latitudeDelta: 0.1000,
                    longitudeDelta: 0.1000,
                }}
                provider={PROVIDER_GOOGLE}
                // TODO: Need to add config before deploying this see intructions in the repo:
                // https://github.com/react-native-community/react-native-maps/blob/master/docs/mapview.md
                showsUserLocation={true}
                showsMyLocationButton={true}
                onUserLocationChange={this.onUserLocationChange}
            />
        );
    }
}

const styles = StyleSheet.create({
    mapStyle: {
        flex: 1,
    },
});

export default Map;
