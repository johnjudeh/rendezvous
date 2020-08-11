import React from 'react';
import { StyleSheet } from 'react-native';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';

function Map() {
    return (
        <MapView style={styles.mapStyle}
            initialRegion={{
                latitude: 51.5027,
                longitude: -0.1173,
                latitudeDelta: 0.1000,
                longitudeDelta: 0.1000,
            }}
            provider={PROVIDER_GOOGLE}
        />
    );
}

const styles = StyleSheet.create({
    mapStyle: {
        height: '100%',
        width: '100%',
    },
});

export default Map;
