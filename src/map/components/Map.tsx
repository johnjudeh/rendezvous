import React, { useState, useEffect, useRef, MutableRefObject } from 'react';
import { Platform } from 'react-native';
import MapView, {
    PROVIDER_GOOGLE,
    Marker,
    Circle,
    LatLng,
    Region,
    UserLocationChangeEvent,
    MapCircle
} from 'react-native-maps';
import { useAppDispatch, useAppSelector } from 'common/hooks';
import { useFocusEffect } from '@react-navigation/native';
import { useSafeAreaFrame } from 'react-native-safe-area-context';
import { selectLocations, selectCurrLocation, setCurrLocation, addLocation, removeAllLocations } from 'locations/state';
import { calculateCenter, calculateDistance } from 'locations/utils';
import Coordinates from 'locations/constants/cities';
import { requestLocation } from 'common/permissions';
import Color from 'common/constants/colors';
import GooglePlacesAPI from 'common/clients/googlePlaces';
import { SEARCH_RADIUS } from '../constants';

interface MapProps {
    mapRef: MutableRefObject<MapView | null>,
}

function Map({ mapRef }: MapProps) {
    const INITAL_REGION: Region = {
        ...Coordinates.London,
        latitudeDelta: 0.1000,
        longitudeDelta: 0.1000,
    };
    const LOC_SENSITIVITY = 100;

    const dispatch = useAppDispatch();

    // This needs to be used instead of Dimensions.get('window') as
    // the behaviour is inconsistent across Android devices
    const frame = useSafeAreaFrame();

    const [locationSet, setLocationSet] = useState(false);
    const [inFocus, setInFocus] = useState(false);

    useFocusEffect(() => {
        setInFocus(true);
        return () => { setInFocus(false) };
    });

    // Added to work around bug on iOS where fillColor is not respected:
    // https://github.com/react-native-community/react-native-maps/issues/3173
    // TODO: Remove after this bug is fixed in the react-native-maps
    const circleRef: MutableRefObject<MapCircle | null> = useRef(null);
    const forceCircleFillColor = (fillColor: string): void => {
        if (circleRef.current !== null) {
            // TODO: Figure out how to fix the type error here
            circleRef.current.setNativeProps({ fillColor });
        }
    }

    const currLocation = useAppSelector(selectCurrLocation);
    const locations = useAppSelector(selectLocations);
    const showMarkers = locations.length > 1;
    const center: LatLng = showMarkers
        ? calculateCenter(locations.map(loc => loc.latLng))
        : { ...Coordinates.London };

    useEffect(() => {
        setLocationSet(locations.length > 0)
    }, [locations]);

    useEffect(requestLocation);
    useEffect(() => {
        if (mapRef.current !== null && showMarkers) {
            // More quirks with different behaviour across Android and iOS
            // with react-native-maps. Issues came up with the Google logo
            Platform.OS === 'ios'
                ? mapRef.current.fitToSuppliedMarkers(
                    locations.map(loc => loc.id),
                    {
                        edgePadding: {
                            top: 70,
                            right: 30,
                            bottom: 200,
                            left: 30,
                        }
                    }
                )
                : mapRef.current.fitToElements(true);

            setLocationSet(false);
        }
    }, [mapRef, locations]);

    const onUserLocationChange = (e: UserLocationChangeEvent): void => {
        if (!showMarkers) {
            const { coordinate } = e.nativeEvent;
            if (!coordinate) return
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
                            dispatch(setCurrLocation(latLng));
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
            showsMyLocationButton={false}
            ref={mapRef}
            style={{
                // Placed here so that frame height calculates on each render
                height: frame.height - (Platform.OS === 'ios' ? 102 : 92),
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
