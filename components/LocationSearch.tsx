import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationProps } from '../common/types';
import BackButton from './BackButton';

function LocationSearch({ navigation }: NavigationProps) {
    return (
        <View style={styles.container}>
            <BackButton onPress={navigation.goBack} />
            <Text>Location Search</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    }
});

export default LocationSearch;
