import React from 'react';
import { StyleSheet, View } from 'react-native';
import LocationSearchBar from './LocationSearchBar';
import Color from '../constants/colors';

function LocationsManager() {
    return (
        <View style={styles.container}>
            <LocationSearchBar />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        height: 80,
        borderStyle: 'solid',
        borderBottomColor: Color.LIGHT_GREY,
        borderBottomWidth: 1,
        marginBottom: 20,
    }
});

export default LocationsManager;