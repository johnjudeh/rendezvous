import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Constants from 'expo-constants';
import { useAppDispatch, useAppSelector } from 'common/hooks';
import {
    GooglePlacesAutocomplete,
    GooglePlaceData,
    GooglePlaceDetail,
} from 'react-native-google-places-autocomplete';
import 'react-native-get-random-values';
import { v4 as createUUID } from 'uuid';
import { selectLocations, selectCurrLocation } from 'locations/state';
import { LocationData } from 'locations/types';
import Color from 'common/constants/colors';
import FontFamily from 'common/constants/fonts';
import { addLocation } from '../state';
import {
    getPostcodeFromGoogleAddressComponents,
    getCountryFromGoogleAddressComponents,
    latLngToString,
} from '../utils';

type GooglePlacesAutocompleteOnPress = (data: GooglePlaceData, detail: GooglePlaceDetail | null) => void;

function LocationSearchBar() {
    const dispatch = useAppDispatch();
    const locations = useAppSelector(selectLocations);
    const currLocation = useAppSelector(selectCurrLocation);
    const [value, setValue] = useState('');
    const [sessionToken, setSessionToken] = useState('');
    const [hasError, setHasError] = useState(false);

    const setNewUUID = () => {
        setSessionToken(createUUID());
    };

    const addAutocompleteLocation: GooglePlacesAutocompleteOnPress = (data, details = null) => {
        if (!details) {
            throw new Error('GooglePlaces details object was not provided');
        }

        const place_id: string = details.place_id;
        const placeCoords: { lat: number, lng: number } = details.geometry.location;
        const addressComponents = details.address_components;

        const address: string = details.formatted_address;
        const postcode: string = getPostcodeFromGoogleAddressComponents(addressComponents) || '';
        const country: string = getCountryFromGoogleAddressComponents(addressComponents) || '';

        const location: LocationData = {
            id: place_id,
            address,
            postcode,
            country,
            latLng: {
                latitude: placeCoords.lat,
                longitude: placeCoords.lng,
            }
        }

        dispatch(addLocation(location));
        setValue('');
        setNewUUID();
    };

    useEffect(setNewUUID, []);

    const EmptyComponent = (
        <View style={styles.errorMsgContainer}>
            <Text style={styles.errorMsgText}>
                {hasError
                    ? 'Something went wrong. Contact the team'
                    : 'No results returned'
                }
            </Text>
        </View>
    );

    return (
        <View style={styles.topContainer}>
            <GooglePlacesAutocomplete
                placeholder={locations.length === 0 ? "Add your location" : "Add a friend's location"}
                query={{
                    key: Constants.expoConfig?.extra?.googlePlacesApiKey,
                    sessiontoken: sessionToken,
                    location: currLocation ? latLngToString(currLocation) : undefined,
                    radius: 5000,
                }}
                fetchDetails={true}
                onPress={addAutocompleteLocation}
                onFail={(error) => { setHasError(true); console.error(error) }}
                minLength={2}
                debounce={500}
                suppressDefaultStyles={true}
                styles={{ ...styles }}
                textInputProps={{
                    value,
                    onChangeText: text => { setValue(text); setHasError(false) },
                    placeholderTextColor: Color.MID_LIGHT_GREY,
                }}
                listEmptyComponent={EmptyComponent}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    topContainer: {
        height: 210,
        paddingLeft: 45,
        paddingRight: 45,
        borderStyle: 'solid',
        borderBottomColor: Color.LIGHT_GREY,
        borderBottomWidth: 1,
        paddingBottom: 20,
        marginBottom: 20,
        zIndex: 1,
    },
    container: {
        zIndex: 1,
    },
    textInput: {
        height: 50,
        color: Color.DARK_GREY,
        fontFamily: FontFamily.BODY,
        backgroundColor: Color.OFF_WHITE,
        borderStyle: 'solid',
        borderColor: Color.DARK_GREY,
        borderWidth: 1,
        borderRadius: 3,
        padding: 15,
        marginLeft: 12,
    },
    listView: {
        height: 140,
        marginBottom: 20,
    },
    row: {
        padding: 15,
        height: 50,
        flexDirection: 'row',
        color: Color.DARK_GREY,
    },
    separator: {
        height: StyleSheet.hairlineWidth,
        backgroundColor: Color.LIGHT_GREY,
    },
    description: {
        color: Color.DARK_GREY,
        fontFamily: FontFamily.BODY,
    },
    poweredContainer: {
        backgroundColor: null,
    },
    errorMsgContainer: {
        alignItems: 'center',
        marginTop: 22,
    },
    errorMsgText: {
        fontFamily: FontFamily.BODY,
        color: Color.DARK_GREY,
    },
});

export default LocationSearchBar;
