import React from 'react';
import { StyleSheet, View } from 'react-native';
import Constants from 'expo-constants';
import { useDispatch, useSelector } from 'react-redux';
import { selectLocations, removeAllLocations } from '../state';
import { NavigationProps } from 'common/types';
import { BackButton, MainButton } from 'common/components';
import Locations from './Locations';
import RecentLocations from './RecentLocations';

function LocationSearch({ navigation }: NavigationProps) {
    const dispatch = useDispatch();
    const locations = useSelector(selectLocations);

    const handleGoBack = () => {
        if (locations.length !== 0) {
            dispatch(removeAllLocations());
        }
        navigation.navigate('map');
    }

    return (
        <View style={styles.container}>
            <BackButton onPress={handleGoBack} />
            <Locations locations={locations} />
            <RecentLocations />
            <View style={styles.buttonContainer}>
                <MainButton
                    text='Rendez Vous'
                    disabled={locations.length === 0}
                    onPress={() => navigation.navigate('map')}
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
        justifyContent: 'center',
        minHeight: 120,
        paddingLeft: 29,
        paddingRight: 29,
    },
});

export default LocationSearch;
