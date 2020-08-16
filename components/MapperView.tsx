import React from 'react';
import { StyleSheet, View } from 'react-native';
import { NavigationProps } from '../common/types';
import Map from './Map';
import Dock from './Dock';
import MainButton from './MainButton';

function MapperView({ navigation }: NavigationProps) {
    return (
        <View style={styles.container}>
            <View style={styles.mapContainer}>
                <Map />
            </View>
            <Dock>
                <MainButton text='Add location' onPress={() => navigation.navigate('locations')} />
            </Dock>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
    },
    mapContainer: {
        flexGrow: 1,
    }
});

export default MapperView;
