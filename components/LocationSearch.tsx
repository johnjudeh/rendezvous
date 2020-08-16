import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Constants from 'expo-constants';
import { NavigationProps } from '../common/types';
import BackButton from './BackButton';
import LocationsManager from './LocationsManager';

function LocationSearch({ navigation }: NavigationProps) {
    return (
        <View style={styles.container}>
            <BackButton onPress={navigation.goBack} />
            <LocationsManager />
            <Text>Location Search</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'stretch',
        justifyContent: 'flex-start',
        paddingTop: Constants.statusBarHeight + 15,
    }
});

export default LocationSearch;
