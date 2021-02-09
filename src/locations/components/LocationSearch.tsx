import React, { useCallback } from 'react';
import { StyleSheet, View, Platform } from 'react-native';
import Constants from 'expo-constants';
import { useDispatch, useSelector } from 'react-redux';
import { useFocusEffect } from '@react-navigation/native';
import * as Segment from 'expo-analytics-segment';
import { selectLocations, removeAllLocationsExcept } from '../state';
import { NavigationProps } from 'common/types';
import { BackButton, MainButton } from 'common/components';
import Locations from './Locations';
import LocationSearchBar from './LocationSearchBar';

function LocationSearch({ navigation }: NavigationProps) {
    const dispatch = useDispatch();
    const locations = useSelector(selectLocations);

    useFocusEffect(useCallback(() => {
        Segment.screenWithProperties('Location Search', {
            locations,
        });
    }, []));

    const handleGoBack = () => {
        if (locations.length !== 0) {
            dispatch(removeAllLocationsExcept(1));
        }
        navigation.navigate('Map');
    }

    return (
        <View style={styles.container}>
            <BackButton onPress={handleGoBack} />
            <LocationSearchBar />
            <Locations />
            <View style={styles.buttonContainer}>
                <MainButton
                    text='Rendez Vous'
                    disabled={locations.length < 2}
                    onPress={() => navigation.navigate('Map')}
                />
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
        position: 'absolute',
        bottom: 0,
        width: '100%',
        justifyContent: 'center',
        minHeight: Platform.OS === 'ios' ? 110 : 90,
        paddingLeft: 29,
        paddingRight: 29,
    },
});

export default LocationSearch;
