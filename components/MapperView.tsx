import React from 'react';
import { StyleSheet, Text, View, Dimensions } from 'react-native';
import Map from './Map';
import Dock from './Dock';
import MainButton from './MainButton';

function MapperView() {
    return (
        <View style={styles.container}>
            <View style={styles.mapContainer}>
                <Map />
            </View>
            <Dock>
                <MainButton text='Add location' />
            </Dock>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    mapContainer: {
        height: Dimensions.get('window').height - 110,
        width: '100%'
    }
});

export default MapperView;
