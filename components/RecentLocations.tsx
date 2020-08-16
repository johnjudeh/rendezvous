import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

function RecentLocations() {
    return (
        <View style={styles.container}>
            <Text>
                Recent Locations
            </Text>
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
    }
});

export default RecentLocations;
