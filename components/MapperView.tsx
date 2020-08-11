import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Map from './Map';

function MapperView() {
    return (
        <View style={styles.container}>
            <Map />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
});

export default MapperView;
