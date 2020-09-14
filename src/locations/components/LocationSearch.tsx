import React from 'react';
import { StyleSheet, View } from 'react-native';
import Constants from 'expo-constants';
import { useSelector } from 'react-redux';
import { selectLocations } from '../state';
import { NavigationProps } from 'common/types';
import { BackButton, MainButton } from 'common/components';
import Locations from './Locations';
import RecentLocations from './RecentLocations';

function LocationSearch({ navigation }: NavigationProps) {
    const locations = useSelector(selectLocations);

    return (
        <View style={styles.container}>
            <BackButton onPress={() => navigation.navigate('map', { userLocations: undefined })} />
            <Locations locations={locations} />
            <RecentLocations />
            <View style={styles.buttonContainer}>
                <MainButton text='Rendez Vous' onPress={() => navigation.navigate('map', { userLocations: locations })} />
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
        minHeight: 120,
        paddingLeft: 29,
        paddingRight: 29,
    },
});

export default LocationSearch;
