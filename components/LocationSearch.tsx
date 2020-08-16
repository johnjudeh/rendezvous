import React from 'react';
import { StyleSheet, View } from 'react-native';
import Constants from 'expo-constants';
import { NavigationProps } from '../common/types';
import BackButton from './BackButton';
import Locations from './Locations';
import RecentLocations from './RecentLocations';
import MainButton from './MainButton';

function LocationSearch({ navigation }: NavigationProps) {
    return (
        <View style={styles.container}>
            <BackButton onPress={navigation.goBack} />
            <Locations />
            <RecentLocations />
            <View style={styles.buttonContainer}>
                <MainButton text='Rendez Vous' onPress={() => {}} />
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
