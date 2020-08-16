import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Color from '../constants/colors';

function RecentLocations() {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Recent Locations</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'stretch',
        flexGrow: 1,
        paddingLeft: 45,
        paddingRight: 45,
        paddingBottom: 10,
        marginBottom: 20,
    },
    title: {
        fontSize: 18,
        fontWeight: '500',
        color: Color.DARK_GREY,
    },
});

export default RecentLocations;
