import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Color from 'common/constants/colors';
import FontFamily from 'common/constants/fonts';
import LocationCards from './LocationCards';

function FriendLocations() {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Friend Locations</Text>
            <LocationCards />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'stretch',
        paddingLeft: 45,
        paddingRight: 45,
        paddingBottom: 10,
        marginBottom: 360,
    },
    title: {
        fontSize: 18,
        fontFamily: FontFamily.TITLE,
        color: Color.DARK_GREY,
        marginBottom: 12,
    },
});

export default FriendLocations;
