import React from 'react';
import { StyleSheet, TextInput, Dimensions } from 'react-native';
import Color from 'common/constants/colors';

function LocationSearchBar() {
    return (
        <TextInput style={styles.input} placeholder='Add new location' />
    )
}

const styles = StyleSheet.create({
    input: {
        height: 50,
        borderStyle: 'solid',
        borderColor: Color.DARK_GREY,
        borderWidth: 1,
        borderRadius: 3,
        padding: 15,
    }
});

export default LocationSearchBar;