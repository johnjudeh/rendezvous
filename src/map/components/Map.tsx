import React, { useState, useEffect, useRef, MutableRefObject } from 'react';
import { Dimensions, PixelRatio, Platform, StyleSheet } from 'react-native';
import MapView, {
    PROVIDER_GOOGLE,
    Marker,
    EventUserLocation,
    Circle,
    LatLng,
    Region,
    EdgePadding
} from 'react-native-maps';
import { useDispatch, useSelector } from 'react-redux';
import { useFocusEffect } from '@react-navigation/native';
import { selectLocations, selectCurrLocation, setCurrLocation, addLocation, removeAllLocations } from 'locations/state';
import { calculateCenter, calculateDistance } from 'locations/utils';
import Coordinates from 'locations/constants/cities';
import { requestLocation } from 'common/permissions';
import Color from 'common/constants/colors';
import GooglePlacesAPI from 'common/clients/googlePlaces';
import { SEARCH_RADIUS } from '../constants';

function Map() {
    const INITAL_REGION: Region = {
        ...Coordinates.London,
        latitudeDelta: 0.1000,
        longitudeDelta: 0.1000,
    };
    const LOC_SENSITIVITY = 100;

    const dispatch = useDispatch();
    const [ locationSet, setLocationSet ] = useState(false);
    const [ inFocus, setInFocus ] = useState(false);

    useFocusEffect(() => {
        setInFocus(true);
        return () => { setInFocus(false) };
    });

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

    const currLocation = useSelector(selectCurrLocation);
    const locations = useSelector(selectLocations);
    const showMarkers = locations.length > 1;
    const center: LatLng = showMarkers
        ? calculateCenter(locations.map(loc => loc.latLng))
        : { ...Coordinates.London };

    const getEdgePaddingForPlatform = (padding: number, side: keyof EdgePadding): number => {
        // This is a hack to get the edge padding to work on Android. See issue below:
        // https://github.com/react-native-maps/react-native-maps/issues/3308#issuecomment-592500013
        return (
            Platform.OS === 'android'
                ? padding * PixelRatio.get() - 50
                : padding
        );
    }

    useEffect(requestLocation);
    useEffect(() => {
        if (mapRef.current !== null && showMarkers) {
            mapRef.current.fitToSuppliedMarkers(
                locations.map(loc => loc.id),
                {
                    edgePadding: {
                        top: getEdgePaddingForPlatform(70, 'top'),
                        right: getEdgePaddingForPlatform(30, 'right'),
                        bottom: getEdgePaddingForPlatform(240, 'bottom'),
                        left: getEdgePaddingForPlatform(30, 'left'),
                    }
                }
            );
            setLocationSet(false);
        }
    }, [mapRef, locations]);

    const onUserLocationChange = (e: EventUserLocation): void => {
        if (!showMarkers) {
            const { coordinate } = e.nativeEvent;
            const significantLocationChange = currLocation !== null
                ? calculateDistance(currLocation, coordinate) >= LOC_SENSITIVITY
                : false;

            if (inFocus && (!locationSet || significantLocationChange)) {
                if (mapRef.current !== null) {
                    mapRef.current.animateCamera({ center: coordinate, zoom: 12 });
                    setLocationSet(true);
                }
                const latLng: LatLng = {
                    latitude: coordinate.latitude,
                    longitude: coordinate.longitude,
                }
                GooglePlacesAPI.reverseGeocode(latLng)
                    .then(loc => {
                        if (loc) {
                            dispatch(setCurrLocation(latLng, loc.country));
                            dispatch(removeAllLocations());
                            dispatch(addLocation(loc));
                        }
                    })
                    .catch(err => {
                        // Sets currLocation even when API fails
                        dispatch(setCurrLocation(latLng));
                    });
            }
        }
    };

    return (
        <MapView
            initialRegion={INITAL_REGION}
            provider={PROVIDER_GOOGLE}
            showsUserLocation={!showMarkers}
            onUserLocationChange={onUserLocationChange}
            showsMyLocationButton={true}
            ref={mapRef}
            style={{
                // Placed here so that Dimensions calculates on each render
                height: Dimensions.get('window').height - (Platform.OS === 'ios' ? 110 : 90),
            }}
        >
            {showMarkers
                ? locations.map((location, i) => (
                    <Marker
                        key={location.id}
                        identifier={location.id}
                        title={i === 0 ? 'Your Location' : `Friend ${i}`}
                        description={location.address}
                        coordinate={location.latLng}
                        pinColor={Color.ORANGE}
                    />
                ))
                : null
            }
            {showMarkers
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

export default Map;
