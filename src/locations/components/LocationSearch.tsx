import React from 'react';
import { StyleSheet, View, Platform } from 'react-native';
import Constants from 'expo-constants';
import { useDispatch, useSelector } from 'react-redux';
import { selectLocations, removeAllLocations } from '../state';
import { NavigationProps } from 'common/types';
import { BackButton, MainButton } from 'common/components';
import FriendLocations from './FriendLocations';
import LocationSearchBar from './LocationSearchBar';

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
            <LocationSearchBar />
            <FriendLocations />
            <View style={styles.buttonContainer}>
                <MainButton
                    text='Rendez Vous'
                    disabled={locations.length < 2}
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
