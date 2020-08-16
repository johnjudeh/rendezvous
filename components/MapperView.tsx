import React from 'react';
import { StyleSheet, View } from 'react-native';
import { NavigationProps } from '../common/types';
import Map from './Map';
import Dock from './Dock';
import MainButton from './MainButton';
import BackButton from './BackButton';
import CategoryList from './CategoryList';

function MapperView({ navigation, route }: NavigationProps) {
    return (
        <View style={styles.container}>
            <View style={styles.mapContainer}>
                {route.params?.userLocations && <BackButton onPress={() => {}}/>}
                <Map />
            </View>
            {route.params?.userLocations
                ? <Dock title='Explore the middle'>
                    <CategoryList />
                </Dock>
                : <Dock>
                    <MainButton text='Add location' onPress={() => navigation.navigate('locations')} />
                </Dock>
            }
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
