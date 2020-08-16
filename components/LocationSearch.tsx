import React from 'react';
import { StyleSheet, View } from 'react-native';
import Constants from 'expo-constants';
import { NavigationProps } from '../common/types';
import BackButton from './BackButton';
import Locations from './Locations';
import RecentLocations from './RecentLocations';
import MainButton from './MainButton';

const USER_LOCATIONS = [
    {
        id: 1,
        address: '167 Bermondsey Street',
        postcode: 'SE1 3UW',
    },
    {
        id: 2,
        address: '11 First Street',
        postcode: 'SW3 2LB',
    },
    {
        id: 3,
        address: '22 Greenland Road',
        postcode: 'NW1 0AY',
    },
];

function LocationSearch({ navigation }: NavigationProps) {
    return (
        <View style={styles.container}>
            <BackButton onPress={() => navigation.navigate('map', { userLocations: undefined })} />
            <Locations locations={USER_LOCATIONS} />
            <RecentLocations />
            <View style={styles.buttonContainer}>
                <MainButton text='Rendez Vous' onPress={() => navigation.navigate('map', { userLocations: USER_LOCATIONS })} />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'stretch',
        justifyContent: 'flex-start',
        paddingTop: Constants.statusBarHeight + 15,
    },
    buttonContainer: {
        justifyContent: 'center',
        minHeight: 110,
        paddingLeft: 29,
        paddingRight: 29,
    },
});

export default LocationSearch;
