import React, { useState, useEffect, useRef, MutableRefObject } from 'react';
import { StyleSheet } from 'react-native';
import MapView, { PROVIDER_GOOGLE, Marker, EventUserLocation, Circle, LatLng } from 'react-native-maps';
import { useSelector } from 'react-redux';
import { selectLocations } from 'locations/state';
import { calculateCenter } from 'locations/utils';
import Coordinates from 'locations/constants/cities';
import { requestLocation } from 'common/permissions';
import Color from 'common/constants/colors';
import { SEARCH_RADIUS } from '../constants';

function Map() {
    const INITAL_REGION = {
        ...Coordinates.London,
        latitudeDelta: 0.1000,
        longitudeDelta: 0.1000,
    };

    const [ locationSet, setLocationSet ] = useState(false);
    const mapRef: MutableRefObject<MapView | null> = useRef(null);

    // Added to work around bug on iOS where fillColor is not respected:
    // https://github.com/react-native-community/react-native-maps/issues/3173
    // TODO: Remove after this bug is fixed in the react-native-maps
    const circleRef: MutableRefObject<Circle | null> = useRef(null);
    const forceCircleFillColor = (fillColor: string): void => {
        if (circleRef.current !== null) {
            // TODO: Figure out how to fix the type error here
            circleRef.current.setNativeProps({ fillColor });
        }
    }

    const locations = useSelector(selectLocations);
    const center: LatLng = locations.length !== 0
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
            setLocationSet(false);
        }
    }, [mapRef, locations]);

    const onLocationChange = (e: EventUserLocation): void => {
        if (locationSet === false && locations.length === 0) {
            const { coordinate } = e.nativeEvent;
            if (mapRef.current !== null) {
                mapRef.current.animateCamera({ center: coordinate, zoom: 12 });
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
            showsMyLocationButton={true}
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
                    ref={circleRef}
                    center={center}
                    radius={SEARCH_RADIUS}
                    strokeColor={Color.ORANGE}
                    strokeWidth={1.4}
                    fillColor={Color.ORANGE + '30'}
                    onLayout={() => forceCircleFillColor(Color.ORANGE + '30')}
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
