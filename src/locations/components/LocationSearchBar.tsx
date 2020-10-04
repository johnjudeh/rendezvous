import React, { useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import {
    GooglePlacesAutocomplete,
    GooglePlaceData,
    GooglePlaceDetail,
} from 'react-native-google-places-autocomplete';
import 'react-native-get-random-values';
import { v4 as createUUID } from 'uuid';
import { selectLocations } from 'locations/state';
import Color from 'common/constants/colors';
import FontFamily from 'common/constants/fonts';
import { LocationData } from 'common/types';
import { addLocation } from '../state';
import {
    getAdressFromGooglePlaceDetails,
    getPostcodeFromGooglePlaceDetails,
} from '../utils';

type GooglePlacesAutocompleteOnPress = (data: GooglePlaceData, detail: GooglePlaceDetail | null) => void;

function LocationSearchBar() {
    const dispatch = useDispatch();
    const locations = useSelector(selectLocations);
    const [ value, setValue ] = useState('');
    const [ sessionToken, setSessionToken ] = useState('');

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

        const address: string = getAdressFromGooglePlaceDetails(addressComponents);
        const postcode: string = getPostcodeFromGooglePlaceDetails(addressComponents) || '';

        const location: LocationData = {
            id: place_id,
            address,
            postcode,
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

    return (
        <View style={styles.topContainer}>
            <GooglePlacesAutocomplete
                placeholder={locations.length === 0 ? "Add your location" : "Add a friend's location"}
                placeholderTextColor={Color.MID_LIGHT_GREY}
                query={{
                    // TODO: Remove this key from the code somehow, then generate a new one!
                    key: '***REMOVED***',
                    sessiontoken: sessionToken,
                }}
                currentLocation={true}
                fetchDetails={true}
                onPress={addAutocompleteLocation}
                onFail={(error) => console.error(error)}
                minLength={2}
                debounce={500}
                suppressDefaultStyles={true}
                styles={{ ...styles }}
                textInputProps={{
                    value,
                    onChangeText: text => setValue(text),
                }}
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
});

export default LocationSearchBar;
