import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import { useDispatch } from 'react-redux';
import {
    GooglePlacesAutocomplete,
    GooglePlaceData,
    GooglePlaceDetail,
} from 'react-native-google-places-autocomplete';
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
    const [ value, setValue ] = useState('');

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
    };

    return (
        <GooglePlacesAutocomplete
            placeholder='Add new location'
            placeholderTextColor={Color.MID_LIGHT_GREY}
            query={{
                // TODO: Remove this key from the code somehow, then generate a new one!
                key: '***REMOVED***',
                language: 'en-GB',
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
    );
}

const styles = StyleSheet.create({
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
        // TODO: To get correct styling, need to fork the GooglePlacesAutocomplete
        // library and use TouchableHighlight from react-native-gesture-handler
        // and uncomment the lines below. See discussion:
        // https://github.com/facebook/react-native/issues/22397#issuecomment-523784563
        // position: 'absolute',
        // top: 50,
        backgroundColor: Color.OFF_WHITE,
        borderStyle: 'solid',
        borderColor: Color.DARK_GREY,
        borderWidth: 0.3,
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
    },
});

export default LocationSearchBar;
