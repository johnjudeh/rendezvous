import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useSelector } from 'react-redux';
import { selectLocations } from 'locations/state';
import Color from 'common/constants/colors';
import FontFamily from 'common/constants/fonts';
import LocationCards from './LocationCards';

function FriendLocations() {
    const locations = useSelector(selectLocations);

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Friend Locations</Text>
            {locations.length > 0
                ? <LocationCards />
                : <View style={styles.emptyContainer}>
                    <Text style={styles.emptyText}>Add at least 2 locations to Rendez Vous</Text>
                </View>
            }
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
    emptyContainer: {
        marginTop: 10,
    },
    emptyText: {
        fontFamily: FontFamily.BODY,
        color: Color.DARK_GREY,
    },
});

export default FriendLocations;
