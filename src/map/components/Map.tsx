import React, { useState, useEffect, useRef, MutableRefObject } from 'react';
import { StyleSheet } from 'react-native';
import MapView, { PROVIDER_GOOGLE, Marker, EventUserLocation, Circle, LatLng } from 'react-native-maps';
import { useSelector } from 'react-redux';
import { selectLocations } from 'locations/state';
import { calculateCenter } from 'locations/utils';
import Coordinates from 'locations/constants/cities';
import { requestLocation } from 'common/permissions';
import Color from 'common/constants/colors';

function Map() {
    const INITAL_REGION = {
        ...Coordinates.London,
        latitudeDelta: 0.1000,
        longitudeDelta: 0.1000,
    };

    const [ locationSet, setLocationSet ] = useState(false);
    const mapRef: MutableRefObject<MapView | null> = useRef(null);
    const locations = useSelector(selectLocations);
    let center: LatLng = locations.length !== 0
        ? calculateCenter(locations.map(loc => loc.latLng))
        : { ...Coordinates.London };

    useEffect(requestLocation);
    useEffect(() => {
        if (mapRef.current !== null && locations.length !== 0) {
            mapRef.current.fitToSuppliedMarkers(
                locations.map(loc => loc.id),
                {
                    edgePadding: {
                        top: 30,
                        right: 30,
                        bottom: 30,
                        left: 30,
                    }
                }
            );
        }
    });

    const onLocationChange = (e: EventUserLocation): void => {
        if (locationSet === false) {
            const { coordinate } = e.nativeEvent;
            if (mapRef.current !== null) {
                mapRef.current.animateCamera({ center: coordinate });
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
            showsUserLocation={locations.length === 0 ? true : false}
            onUserLocationChange={onLocationChange}
            ref={mapRef}
            mapPadding={{
                top: 0,
                bottom: 80,
                left: 0,
                right: 0,
            }}
        >
            {locations.map(location => (
                <Marker
                    key={location.id}
                    identifier={location.id}
                    title={'Your Location'}
                    description={location.address}
                    coordinate={location.latLng}
                />
            ))}
            {locations.length !== 0
                ? <Circle
                    center={center}
                    radius={1000}
                    strokeColor={Color.ORANGE}
                    strokeWidth={1.4}
                    fillColor={Color.ORANGE + '30'}
                />
                : null
            }
        </MapView>
    );
}

const styles = StyleSheet.create({
    mapStyle: {
        flex: 1,
    },
});

export default Map;
