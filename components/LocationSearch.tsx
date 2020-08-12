import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

function LocationSearch() {
    return (
        <View style={styles.container}>
            <Text>Location Search</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    }
});

export default LocationSearch;
