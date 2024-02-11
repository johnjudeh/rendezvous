import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useAppSelector } from 'common/hooks';
import { selectLocations } from 'locations/state';
import Color from 'common/constants/colors';
import FontFamily from 'common/constants/fonts';
import LocationCards from './LocationCards';

function Locations() {
    const locations = useAppSelector(selectLocations);
    const showHelpText = locations.length < 2;

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Locations to Use</Text>
            <LocationCards />
            {showHelpText
                ? <View style={styles.emptyContainer}>
                    <Text style={styles.emptyText}>Add at least {2 - locations.length} more location to activate the Rendez Vous button</Text>
                </View>
                : null
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
        marginTop: 30,
    },
    emptyText: {
        fontFamily: FontFamily.BODY,
        color: Color.DARK_GREY,
    },
});

export default Locations;
