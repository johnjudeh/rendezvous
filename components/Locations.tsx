import React from 'react';
import { StyleSheet, View } from 'react-native';
import LocationSearchBar from './LocationSearchBar';
import Color from '../constants/colors';
import UserLocation from './UserLocation';

const USER_LOCATIONS = [
    {
        id: 1,
        address: '167 Bermondsey Street',
        postcode: 'SE1 3UW',
    },
    {
        id: 2,
        address: '11 First Street',
        postcode: 'SW3 2LB',
    },
    {
        id: 3,
        address: '22 Greenland Road',
        postcode: 'NW1 0AY',
    },
];

function Locations() {
    return (
        <View style={styles.container}>
            <LocationSearchBar />
            {USER_LOCATIONS.map((location, i) => (
                <UserLocation key={location.id} address={location.address} postcode={location.postcode} index={i} />
            ))}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        minHeight: 80,
        paddingLeft: 45,
        paddingRight: 45,
        borderStyle: 'solid',
        borderBottomColor: Color.LIGHT_GREY,
        borderBottomWidth: 1,
        paddingBottom: 20,
        marginBottom: 20,
    }
});

export default Locations;