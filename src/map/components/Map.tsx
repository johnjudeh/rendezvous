import React, { useState, useEffect, useRef, MutableRefObject } from 'react';
import { StyleSheet } from 'react-native';
import MapView, { PROVIDER_GOOGLE, EventUserLocation, Region } from 'react-native-maps';
import Coordinates from 'locations/constants/cities';
import { requestLocation } from 'common/permissions';

function Map() {
    const INITAL_REGION = {
        ...Coordinates.London,
        latitudeDelta: 0.1000,
        longitudeDelta: 0.1000,
    };

    const [ locationSet, setLocationSet ] = useState(false);
    const mapRef: MutableRefObject<MapView | null> = useRef(null);

    useEffect(requestLocation);

    const onLocationChange = (e: EventUserLocation): void => {
        if (locationSet === false) {
            const { coordinate } = e.nativeEvent;
            if (mapRef.current !== null) {
                mapRef.current.animateToRegion({
                    ...INITAL_REGION,
                    latitude: coordinate.latitude,
                    longitude: coordinate.longitude,
                });
                setLocationSet(true);
            }
        }
    };

    return (
        <MapView style={styles.mapStyle}
            initialRegion={INITAL_REGION}
            provider={PROVIDER_GOOGLE}
            // TODO: Need to add config before deploying this see intructions in the repo:
            // https://github.com/react-native-community/react-native-maps/blob/master/docs/mapview.md
            showsUserLocation={true}
            onUserLocationChange={onLocationChange}
            ref={mapRef}
            mapPadding={{
                top: 0,
                bottom: 80,
                left: 0,
                right: 0,
            }}
        />
    );
}

const styles = StyleSheet.create({
    mapStyle: {
        flex: 1,
    },
});

export default Map;
